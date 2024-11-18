'use client';

import { useState } from "react";
import { 
  Table, 
  TableHeader, 
  TableColumn, 
  TableBody, 
  TableRow, 
  TableCell,
  Chip,
  Tooltip,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { format } from "date-fns";
import { Application } from "@/lib/types/admissions";
import ApplicationDetail from "./ApplicationDetail";
import { HiOutlineEye } from "react-icons/hi";

const statusColorMap = {
  pending: "default",
  under_review: "primary",
  accepted: "success",
  rejected: "danger",
} as const;

const priorityColorMap = {
  high: "danger",
  medium: "warning",
  low: "success",
} as const;

interface ApplicationListProps {
  applications: Application[];
}

export default function ApplicationList({ applications }: ApplicationListProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);

  const handleView = (application: Application) => {
    setSelectedApplication(application);
    onOpen();
  };

  return (
    <>
      <Table aria-label="Applications table">
        <TableHeader>
          <TableColumn>APPLICATION</TableColumn>
          <TableColumn>STUDENT</TableColumn>
          <TableColumn>GRADE</TableColumn>
          <TableColumn>STATUS</TableColumn>
          <TableColumn>PRIORITY</TableColumn>
          <TableColumn>APPLIED ON</TableColumn>
          <TableColumn>ACTIONS</TableColumn>
        </TableHeader>
        <TableBody>
          {applications.map((application) => (
            <TableRow key={application.id}>
              <TableCell>
                <div className="flex flex-col">
                  <span className="text-bold">{application.applicationNumber}</span>
                  <span className="text-sm text-default-500">{application.email}</span>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex flex-col">
                  <span className="text-bold">{application.firstName} {application.lastName}</span>
                  <span className="text-sm text-default-500">{application.phone}</span>
                </div>
              </TableCell>
              <TableCell>{application.gradeLevel}</TableCell>
              <TableCell>
                <Chip
                  className="capitalize"
                  color={statusColorMap[application.status]}
                  size="sm"
                  variant="flat"
                >
                  {application.status.replace("_", " ")}
                </Chip>
              </TableCell>
              <TableCell>
                <Chip
                  className="capitalize"
                  color={priorityColorMap[application.priority]}
                  size="sm"
                  variant="flat"
                >
                  {application.priority}
                </Chip>
              </TableCell>
              <TableCell>
                <div className="flex flex-col">
                  <span>{format(new Date(application.appliedAt), "MMM d, yyyy")}</span>
                  <span className="text-sm text-default-500">
                    {format(new Date(application.appliedAt), "h:mm a")}
                  </span>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Tooltip content="View Details">
                    <Button
                      isIconOnly
                      className="bg-black text-white"
                      size="sm"
                      onPress={() => handleView(application)}
                    >
                      <HiOutlineEye className="text-lg" />
                    </Button>
                  </Tooltip>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {selectedApplication && (
        <ApplicationDetail
          application={selectedApplication}
          isOpen={isOpen}
          onClose={onClose}
        />
      )}
    </>
  );
}
