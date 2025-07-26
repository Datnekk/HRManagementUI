/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Button,
  Menu,
  Select,
  Switch,
  TextInput,
  Modal,
  LoadingOverlay,
} from "@mantine/core";
import { DateInput } from "@mantine/dates";
import {
  IconDownload,
  IconEyeBolt,
  IconWindmillFilled,
  IconX,
} from "@tabler/icons-react";
import { useState } from "react";
import { AddModal } from "~/components/AddModal";
import { TableWithActions } from "~/components/TableWithActions";
import { MetaData, PayslipDTO, UserDTO } from "~/types/type";
import { serviceClient } from "~/services/axios";

export interface PaySlipTabProps {
  accessToken: string;
  users: UserDTO[];
  paySlips: PayslipDTO[];
  meta: MetaData;
  isValid: boolean;
}

export default function PaySlipTab({
  accessToken,
  users,
  paySlips,
  meta,
  isValid,
}: PaySlipTabProps) {
  const [addOpen, setAddOpen] = useState(false);
  const [regeneratePdf, setRegeneratePdf] = useState(false);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [pdfModalOpen, setPdfModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAdd = () => setAddOpen(true);

  const handleView = async (payslipID: number) => {
    setLoading(true);
    setError(null);

    try {
      const response = await serviceClient.get(`/PaySlip/${payslipID}/pdf`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        responseType: "blob",
      });

      const pdfBlob = new Blob([response.data], { type: "application/pdf" });
      const url = URL.createObjectURL(pdfBlob);
      setPdfUrl(url);
      setPdfModalOpen(true);
    } catch (err: any) {
      setError(err?.response?.data?.message || "Failed to load PDF");
      console.error("Error fetching PDF:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async (payslipID: number) => {
    setLoading(true);
    setError(null);

    try {
      const response = await serviceClient.get(`/PaySlip/${payslipID}/pdf`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        responseType: "blob",
      });

      const pdfBlob = new Blob([response.data], { type: "application/pdf" });
      const url = URL.createObjectURL(pdfBlob);

      const link = document.createElement("a");
      link.href = url;
      link.download = `payslip-${payslipID}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      URL.revokeObjectURL(url);
    } catch (err: any) {
      setError(err?.response?.data?.message || "Failed to download PDF");
      console.error("Error downloading PDF:", err);
    } finally {
      setLoading(false);
    }
  };

  const closePdfModal = () => {
    if (pdfUrl) {
      URL.revokeObjectURL(pdfUrl);
      setPdfUrl(null);
    }
    setPdfModalOpen(false);
  };

  const isSuccess = (data: any) => data?.success === true;
  const getError = (data: any) =>
    data?.success === false ? data?.message : null;

  return (
    <>
      <div className="relative">
        <LoadingOverlay
          visible={loading}
          overlayProps={{ radius: "sm", blur: 2 }}
        />

        <TableWithActions<PayslipDTO>
          data={paySlips}
          meta={meta}
          menuActions={(row) => (
            <>
              <Menu.Item
                leftSection={<IconEyeBolt size={16} />}
                onClick={() => handleView(row.PayslipID)}
              >
                View
              </Menu.Item>
              <Menu.Item
                leftSection={<IconDownload size={16} />}
                onClick={() => handleDownload(row.PayslipID)}
              >
                Download
              </Menu.Item>
            </>
          )}
          headerActions={
            <>
              {isValid && (
                <Button
                  leftSection={<IconWindmillFilled size={16} />}
                  onClick={handleAdd}
                >
                  Generate
                </Button>
              )}
            </>
          }
          columns={[
            { label: "Name", key: "UserName" },
            { label: "IssueDate", key: "IssueDate" },
            { label: "FilePath", key: "FilePath" },
            { label: "Status", key: "Status" },
          ]}
        />

        {error && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}
      </div>

      <Modal
        opened={pdfModalOpen}
        onClose={closePdfModal}
        title="Payslip PDF"
        size="xl"
        classNames={{
          content: "max-w-4xl",
          body: "p-0",
        }}
        closeButtonProps={{
          icon: <IconX size={20} />,
        }}
      >
        {pdfUrl && (
          <div className="w-full h-[80vh]">
            <iframe
              src={pdfUrl}
              className="w-full h-full border-0"
              title="Payslip PDF"
            />
          </div>
        )}
      </Modal>

      <AddModal
        opened={addOpen}
        onClose={() => setAddOpen(false)}
        title="Generate Payslip"
        submitLabel="Generate"
        isSuccess={isSuccess}
        getError={getError}
      >
        <input type="hidden" name="actionType" value="generate" />
        <Select
          label="User"
          name="UserID"
          data={users.map((u) => ({
            value: u.Id.toString(),
            label: `${u.FirstName} ${u.LastName}`,
          }))}
          placeholder="Select a user"
          required
          onChange={setSelectedUserId}
        />

        <TextInput
          name="SalaryID"
          label="Salary ID"
          value={
            users
              .find((u) => u.Id.toString() === selectedUserId)
              ?.SalaryID?.toString() || ""
          }
          placeholder="Salary ID"
          readOnly
        />

        <DateInput
          label="Issue Date"
          name="IssueDate"
          placeholder="Pick a date"
          required
        />

        <input
          type="hidden"
          name="Status"
          value={regeneratePdf ? "Regenerated" : "Generated"}
        />

        <Switch
          label="Regenerate PDF"
          name="RegeneratePdf"
          checked={regeneratePdf}
          onChange={(e) => setRegeneratePdf(e.currentTarget.checked)}
        />
      </AddModal>
    </>
  );
}
