/* eslint-disable @typescript-eslint/no-explicit-any */
import { Modal, Button } from "@mantine/core";
import { useFetcher } from "@remix-run/react";
import { ReactNode, useEffect, useRef, useCallback } from "react";
import { notifyError, notifySuccess } from "~/utils/notif";

interface EditModalProps {
  opened: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  submitLabel?: string;
  isSuccess?: (data: any) => boolean;
  getError?: (data: any) => string | null;
}

const defaultIsSuccess = (data: any): boolean =>
  !!data && !data.ErrorMessage && data.success !== false;

const defaultGetError = (data: any): string | null =>
  !data
    ? "An unexpected error occurred"
    : data.ErrorMessage || data.message || null;

export function EditModal({
  opened,
  onClose,
  title,
  children,
  submitLabel = "Save Changes",
  isSuccess = defaultIsSuccess,
  getError = defaultGetError,
}: EditModalProps) {
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
      notifySuccess(fetcher.data.message || "Changes saved successfully");
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
        {children}
        <Button
          type="submit"
          disabled={isSubmitting}
          fullWidth
          loading={isSubmitting}
        >
          {submitLabel}
        </Button>
      </fetcher.Form>
    </Modal>
  );
}
