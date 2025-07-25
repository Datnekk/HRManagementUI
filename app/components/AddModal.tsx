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

const defaultIsSuccess = (data: any): boolean => !!data && !data.ErrorMessage;

const defaultGetError = (data: any): string | null =>
  data?.ErrorMessage ?? null;

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
  const hasNotified = useRef(false);

  const isSubmitting = fetcher.state === "submitting";

  useEffect(() => {
    if (!opened || isSubmitting) {
      hasNotified.current = false;
    }
  }, [opened, isSubmitting]);

  useEffect(() => {
    if (!opened && fetcher.data) {
      fetcher.data = undefined;
    }
  }, [opened, fetcher]);

  useEffect(() => {
    if (!fetcher.data || !opened || hasNotified.current) {
      return;
    }

    hasNotified.current = true;

    if (isSuccess(fetcher.data)) {
      notifySuccess(fetcher.data.message ?? "Success");
      onClose();
    } else {
      const errorMessage = getError(fetcher.data);
      if (errorMessage) {
        notifyError(errorMessage);
      }
    }
  }, [fetcher.data, isSuccess, getError, onClose, opened]);

  const handleClose = useCallback(() => {
    hasNotified.current = false;
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
