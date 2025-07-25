import {
  Text,
  Anchor,
  Button,
  Divider,
  PasswordInput,
  TextInput,
  Title,
} from "@mantine/core";
import { Form, useActionData, useNavigation } from "@remix-run/react";
import { IconBrandGoogleFilled } from "@tabler/icons-react";
import { LocaleLink } from "../components/shared/core/LocaleLink";
import { ActionFunctionArgs, redirect } from "@remix-run/node";
import { asyncRunSafe } from "~/utils/other";
import { serviceClient } from "~/services/axios";
import { safeParseAsync } from "valibot";
import { userCookie, userCookieSchema } from "~/server/userCookies.server";
import { localizePathServer } from "~/server/utils.server";
import { LoginResponse } from "~/types/type";

type ActionResult = {
  message?: string;
};

export async function action({ request }: ActionFunctionArgs) {
  const formData = Object.fromEntries(await request.formData());
  const email = formData.email as string;
  const password = formData.password as string;

  const [error, result] = await asyncRunSafe(
    serviceClient.post<LoginResponse>("/Auth/login", {
      email,
      password,
    })
  );

  if (error) {
    console.log(error);
    return {
      message: result?.data?.ErrorMessage ?? "Đăng nhập thất bại.",
    } as const;
  }

  const {
    Email,
    AccessToken: accessToken,
    RefreshToken: refreshToken,
    Id: id,
    Roles,
  } = result.data;
  const { success, issues, output } = await safeParseAsync(userCookieSchema, {
    id: Number(id),
    email: Email,
    roles: Roles ?? [],
    accessToken,
    refreshToken,
  });
  if (!success) {
    console.log("Invalid user cookie data", issues);
    return {
      message: "Có lỗi xảy ra khi đăng nhập. Vui lòng thử lại sau.",
    } as const;
  }
  const redirectPath = "/dashboard";

  throw redirect(localizePathServer(redirectPath), {
    headers: {
      "Set-Cookie": await userCookie.serialize(output),
    },
  });
}

export default function SignInPage() {
  const actionData = useActionData<ActionResult>();
  const navigation = useNavigation();
  const isSubmitting = navigation.formAction === "submitting";

  const errorMessage = actionData?.message;

  return (
    <div className="px-4 py-8 mx-auto border-solid md:px-14">
      <div className="mx-auto w-full md:w-1/2 lg:w-1/3 space-y-8">
        <Title
          order={1}
          className="text-center text-xl md:text-2xl lg:text-3xl"
        >
          Đăng nhập
        </Title>

        <Button
          className="h-12"
          variant="outline"
          fullWidth
          disabled={isSubmitting}
        >
          <IconBrandGoogleFilled className="mr-4" />
          Đăng nhập bằng Google
        </Button>

        <Divider my="xs" label="HOẶC" labelPosition="center" />

        <Form method="POST">
          <fieldset className="space-y-4" disabled={isSubmitting}>
            <TextInput
              name="email"
              type="email"
              label={"Email"}
              required
              size="md"
            />

            <PasswordInput
              name="password"
              type="password"
              label={"Mật khẩu"}
              required
              size="md"
            />

            {errorMessage && (
              <Text className="text-[--mantine-color-red-5] font-semibold text-center mt-2.5">
                {errorMessage}
              </Text>
            )}

            <Button type="submit" fullWidth>
              Đăng nhập
            </Button>

            <div className="w-full flex justify-between">
              <Anchor component={LocaleLink} to="/forgot-password">
                Quên mật khẩu?
              </Anchor>
            </div>
          </fieldset>
        </Form>
      </div>
    </div>
  );
}
