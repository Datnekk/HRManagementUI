/* eslint-disable @typescript-eslint/no-explicit-any */
import { Modal, Button, Text } from "@mantine/core";
import { useFetcher } from "@remix-run/react";
import { useEffect, useRef, useCallback } from "react";
import { notifyError, notifySuccess } from "~/utils/notif";

interface DeleteModalProps {
  opened: boolean;
  onClose: () => void;
  title?: string;
  message?: string;
  hiddenFields?: Record<string, string | number>;
  isSuccess?: (data: any) => boolean;
  getError?: (data: any) => string | null;
}

const defaultIsSuccess = (data: any): boolean =>
  !!data && !data.ErrorMessage && data.success !== false;

const defaultGetError = (data: any): string | null =>
  !data
    ? "An unexpected error occurred"
    : data.ErrorMessage || data.message || null;

export function DeleteModal({
  opened,
  onClose,
  title = "Confirm Delete",
  message = "Are you sure you want to delete this item?",
  hiddenFields = {},
  isSuccess = defaultIsSuccess,
  getError = defaultGetError,
}: DeleteModalProps) {
  const fetcher = useFetcher();
  const wasSubmitting = useRef(false);

  const isSubmitting = fetcher.state === "submitting";
  const isIdle = fetcher.state === "idle";

  useEffect(() => {
    if (isSubmitting) {
      wasSubmitting.current = true;
    }
  }, [isSubmitting]);

  useEffect(() => {
    if (opened) {
      wasSubmitting.current = false;
    }
  }, [opened]);

  useEffect(() => {
    if (!opened || !isIdle || !fetcher.data || !wasSubmitting.current) {
      return;
    }

    wasSubmitting.current = false;

    if (isSuccess(fetcher.data)) {
      notifySuccess(fetcher.data.message || "Item deleted successfully");
      onClose();
    } else {
      const errorMessage = getError(fetcher.data);
      if (errorMessage) notifyError(errorMessage);
    }
  }, [fetcher.data, isIdle, opened, isSuccess, getError, onClose]);

  const handleClose = useCallback(() => {
    wasSubmitting.current = false;
    onClose();
  }, [onClose]);

  return (
    <Modal opened={opened} onClose={handleClose} title={title} centered>
      <fetcher.Form method="post" className="space-y-4">
        {Object.entries(hiddenFields).map(([key, value]) => (
          <input key={key} type="hidden" name={key} value={value} />
        ))}

        <Text>{message}</Text>

        <Button
          type="submit"
          color="red"
          fullWidth
          loading={isSubmitting}
          disabled={isSubmitting}
        >
          Delete
        </Button>
      </fetcher.Form>
    </Modal>
  );
}
