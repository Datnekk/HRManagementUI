import { showNotification } from "@mantine/notifications";

export const notifyInfo = (message: string) =>
  showNotification({
    message,
    color: "blue",
  });

export const notifyError = (message: string) =>
  showNotification({
    message,
    color: "red",
  });

export const notifySuccess = (message: string) =>
  showNotification({
    message,
    color: "green",
  });

export const notifyWarning = (message: string) =>
  showNotification({
    message,
    color: "yellow",
  });
