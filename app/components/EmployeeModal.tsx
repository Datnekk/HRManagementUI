import {
  Modal,
  Button,
  Stepper,
  TextInput,
  PasswordInput,
} from "@mantine/core";
import { DateTimePicker } from "@mantine/dates";
import { useFetcher } from "@remix-run/react";
import { useState, useEffect, useRef } from "react";
import { notifySuccess, notifyError } from "~/utils/notif";

export function EmployeeModal({
  opened,
  onClose,
}: {
  opened: boolean;
  onClose: () => void;
}) {
  const fetcher = useFetcher();
  const [active, setActive] = useState(0);
  const [createdUserId, setCreatedUserId] = useState<number | null>(null);
  const hasNotified = useRef(false);

  const isSubmitting = fetcher.state === "submitting";

  useEffect(() => {
    if (!opened) {
      setActive(0);
      hasNotified.current = false;
      setCreatedUserId(null);
    }
  }, [opened]);

  useEffect(() => {
    if (!fetcher.data || hasNotified.current) return;

    hasNotified.current = true;

    if (fetcher.data.success) {
      notifySuccess(fetcher.data.message ?? "Employee created!");
      if (fetcher.data.Id) {
        setCreatedUserId(fetcher.data.Id);
      }
      setActive((prev) => prev + 1);
    } else {
      notifyError(fetcher.data.message ?? "Error creating employee");
    }
  }, [fetcher.data]);

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title="Create Employee & Salary"
      size="lg"
      centered
    >
      <Stepper
        active={active}
        onStepClick={setActive}
        allowNextStepsSelect={false}
      >
        <Stepper.Step label="Employee" description="Create account">
          <fetcher.Form
            method="post"
            className="space-y-4"
            onSubmit={() => {
              hasNotified.current = false;
            }}
          >
            <input type="hidden" name="actionType" value="createEmployee" />
            <TextInput name="FirstName" label="First Name" required />
            <TextInput name="LastName" label="Last Name" required />
            <TextInput name="Email" label="Email" type="email" required />
            <TextInput name="UserName" label="Username" required />
            <PasswordInput name="Password" label="Password" required />
            <Button type="submit" loading={isSubmitting} fullWidth>
              Create Employee
            </Button>
          </fetcher.Form>
        </Stepper.Step>

        <Stepper.Step label="Salary" description="Add salary info">
          <fetcher.Form
            method="post"
            className="space-y-4"
            onSubmit={() => {
              hasNotified.current = false;
            }}
          >
            <input type="hidden" name="actionType" value="createSalary" />
            <input type="hidden" name="UserID" value={createdUserId ?? ""} />

            <TextInput
              name="BaseSalary"
              label="Base Salary"
              type="number"
              required
            />
            <TextInput name="Allowances" label="Allowances" type="number" />
            <TextInput name="Bonus" label="Bonus" type="number" />
            <TextInput name="Deduction" label="Deduction" type="number" />
            <DateTimePicker
              name="SalaryPeriod"
              label="Salary Period"
              required
            />

            <Button type="submit" fullWidth>
              Create Salary
            </Button>
          </fetcher.Form>
        </Stepper.Step>

        <Stepper.Completed>
          Employee and Salary Created Successfully
          <Button fullWidth mt="md" onClick={onClose}>
            Close
          </Button>
        </Stepper.Completed>
      </Stepper>
    </Modal>
  );
}
