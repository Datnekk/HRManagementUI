import { Modal, Button } from "@mantine/core";
import { useFetcher } from "@remix-run/react";
import { ReactNode, useEffect, useRef, useCallback } from "react";
import { notifyError, notifySuccess } from "~/utils/notif";

interface AddModalProps {
  opened: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  submitLabel?: string;
  isSuccess?: (data: any) => boolean;
  getError?: (data: any) => string | null;
}

const defaultIsSuccess = (data: any): boolean => {
  if (!data) return false;
  return !data.ErrorMessage && data.success !== false;
};

const defaultGetError = (data: any): string | null => {
  if (!data) return "An unexpected error occurred";
  return data.ErrorMessage || data.message || null;
};

export function AddModal({
  opened,
  onClose,
  title,
  children,
  submitLabel = "Submit",
  isSuccess = defaultIsSuccess,
  getError = defaultGetError,
}: AddModalProps) {
  const fetcher = useFetcher();
  const hasProcessedResponse = useRef(false);

  const isSubmitting = fetcher.state === "submitting";
  const isIdle = fetcher.state === "idle";

  useEffect(() => {
    if (!opened || isSubmitting) {
      hasProcessedResponse.current = false;
    }
  }, [opened, isSubmitting]);

  useEffect(() => {
    if (!fetcher.data || !opened || !isIdle || hasProcessedResponse.current) {
      return;
    }

    hasProcessedResponse.current = true;

    console.log("Processing response:", fetcher.data);

    if (isSuccess(fetcher.data)) {
      const successMessage =
        fetcher.data.message || "Operation completed successfully";
      notifySuccess(successMessage);
      onClose();
    } else {
      const errorMessage = getError(fetcher.data);
      if (errorMessage) {
        notifyError(errorMessage);
      }
    }
  }, [
    fetcher.data,
    fetcher.state,
    isSuccess,
    getError,
    onClose,
    opened,
    isIdle,
  ]);

  const handleClose = useCallback(() => {
    hasProcessedResponse.current = false;
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
