import { signOut } from "~/server/auth.server";

export const action = async () => {
  return signOut({ redirectPath: "/login" });
};
