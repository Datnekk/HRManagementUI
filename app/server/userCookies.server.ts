import { createCookie } from "@remix-run/node";
import * as v from "valibot";

export const userCookie = createCookie("_user_c_u", {
  httpOnly: true,
  path: "/",
  maxAge: 60 * 60 * 24 * 7,
  sameSite: "lax",
  secrets: ["jsjkjasfjbasfkjakjsf"],
});

export const userCookieSchema = v.object({
  id: v.number(),
  email: v.pipe(v.string(), v.nonEmpty(), v.email()),
  roles: v.array(v.string()),
  accessToken: v.pipe(v.string(), v.nonEmpty()),
  refreshToken: v.pipe(v.string(), v.nonEmpty()),
});

export type UserCookie = v.InferOutput<typeof userCookieSchema>;
