import { decodeJwt } from "jose";
import { redirect } from "react-router";
import { safeParseAsync } from "valibot";

import { asyncRunSafe } from "~/utils/other";
import { userCookie, userCookieSchema } from "./userCookies.server";
import { localizePathServer } from "./utils.server";
import { serviceClient } from "~/services/axios";

type RequireAuthOptions = {
  role?: string;
} & SignOutOptions;
export async function requireAuth(
  request: Request,
  options?: RequireAuthOptions
) {
  const cookieInfo = await getUserCookieInfo(request);

  if (!cookieInfo) throw await signOut({ redirectPath: options?.redirectPath });

  if (options?.role) {
    throw new Response(JSON.stringify({ message: "Permission denied" }), {
      status: 403,
      headers: { "Content-Type": "application/json" },
    });
  }

  return cookieInfo;
}

export async function getUserCookieInfo(request: Request) {
  const cookieHeader = request.headers.get("Cookie");
  const cookie = await userCookie.parse(cookieHeader);

  const { success, issues, output } = await safeParseAsync(
    userCookieSchema,
    cookie
  );

  if (!success) {
    console.error("Invalid user cookie data", issues);
    return undefined;
  }

  return output;
}

export async function getCurrentUser(request: Request) {
  const cookieInfo = await getUserCookieInfo(request);

  return cookieInfo;
}

type SignOutOptions = {
  redirectPath?: string;
};
export const signOut = async (options?: SignOutOptions) => {
  return redirect(localizePathServer(options?.redirectPath ?? "/login"), {
    headers: {
      "Set-Cookie": await userCookie.serialize("", {
        maxAge: -1,
      }),
    },
  });
};

export const checkAndRefreshToken = async (
  request: Request,
  options?: {
    signOutOptions?: SignOutOptions;
  }
) => {
  const cookieInfo = await requireAuth(request);

  const jwtPayload = decodeJwt(cookieInfo.accessToken);

  if ((jwtPayload.exp || 0) * 1000 < Date.now() + 1000 * 60) {
    const [error, result] = await asyncRunSafe(
      serviceClient.post("/auth/refresh", {
        token: cookieInfo.refreshToken,
      })
    );

    if (error || result?.data?.error) {
      console.error(error || result?.data?.error);
      throw await signOut(options?.signOutOptions);
    }

    const {
      guid,
      email,
      refresh_token: refreshToken,
      token: accessToken,
    } = result.data.data ?? {};

    const { success, issues, output } = await safeParseAsync(userCookieSchema, {
      guid,
      email,
      accessToken,
      refreshToken,
    });

    if (success) {
      // Redirect to the same page
      const redirectPath = new URL(request.url).pathname;

      throw redirect(localizePathServer(redirectPath), {
        headers: {
          "Set-Cookie": await userCookie.serialize(output),
        },
      });
    } else {
      console.error("Invalid user cookie data", issues);
    }
  }

  return cookieInfo;
};
