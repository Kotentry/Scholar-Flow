'use client';

import { useState } from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Chip, Button, useDisclosure } from "@nextui-org/react";
import { Interview } from "@/lib/types/interviews";
import { format } from "date-fns";
import { HiOutlineCalendar, HiOutlineVideoCamera, HiOutlineLocationMarker } from "react-icons/hi";
import InterviewDetail from "./InterviewDetail";

interface InterviewListProps {
  interviews: Interview[];
}

const statusColorMap = {
  scheduled: "primary",
  completed: "success",
  cancelled: "danger",
  no_show: "warning",
} as const;

export default function InterviewList({ interviews }: InterviewListProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedInterview, setSelectedInterview] = useState<Interview | null>(null);

  const handleInterviewClick = (interview: Interview) => {
    setSelectedInterview(interview);
    onOpen();
  };

  const columns = [
    { name: "STUDENT", uid: "student" },
    { name: "DATE & TIME", uid: "datetime" },
    { name: "INTERVIEWER", uid: "interviewer" },
    { name: "LOCATION", uid: "location" },
    { name: "STATUS", uid: "status" },
    { name: "ACTIONS", uid: "actions" },
  ];

  const renderCell = (interview: Interview, columnKey: React.Key) => {
    switch (columnKey) {
      case "student":
        return (
          <div>
            <p className="font-medium">{interview.studentName}</p>
            <p className="text-small text-default-500">{interview.gradeLevel}</p>
          </div>
        );
      case "datetime":
        return (
          <div className="flex items-center gap-2">
            <HiOutlineCalendar className="text-default-400" />
            <div>
              <p className="font-medium">{format(new Date(interview.dateTime), "MMM d, yyyy")}</p>
              <p className="text-small text-default-500">{format(new Date(interview.dateTime), "h:mm a")}</p>
            </div>
          </div>
        );
      case "interviewer":
        return (
          <div>
            <p className="font-medium">{interview.interviewerName}</p>
            <p className="text-small text-default-500">{interview.duration} mins</p>
          </div>
        );
      case "location":
        return (
          <div className="flex items-center gap-2">
            {interview.isOnline ? (
              <HiOutlineVideoCamera className="text-default-400" />
            ) : (
              <HiOutlineLocationMarker className="text-default-400" />
            )}
            <span>{interview.location}</span>
          </div>
        );
      case "status":
        return (
          <Chip
            className="capitalize"
            color={statusColorMap[interview.status]}
            size="sm"
            variant="flat"
          >
            {interview.status.replace("_", " ")}
          </Chip>
        );
      case "actions":
        return (
          <Button
            size="sm"
            variant="flat"
            color="default"
            className="bg-black text-white"
            onPress={() => handleInterviewClick(interview)}
          >
            View Details
          </Button>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <Table aria-label="Interview schedule table">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.uid}>
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={interviews}>
          {(interview) => (
            <TableRow key={interview.id}>
              {(columnKey) => (
                <TableCell>{renderCell(interview, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>

      {selectedInterview && (
        <InterviewDetail
          interview={selectedInterview}
          isOpen={isOpen}
          onClose={onClose}
        />
      )}
    </>
  );
}
