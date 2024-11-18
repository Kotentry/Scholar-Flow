'use client';

import { useState } from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Chip, Button, useDisclosure, Progress } from "@nextui-org/react";
import { Enrollment } from "@/lib/types/enrollments";
import { format } from "date-fns";
import { HiOutlineAcademicCap, HiOutlineCash, HiOutlineUser } from "react-icons/hi";
import EnrollmentDetail from "./EnrollmentDetail";

interface EnrollmentListProps {
  enrollments: Enrollment[];
}

const statusColorMap = {
  pending: "warning",
  active: "success",
  withdrawn: "danger",
  graduated: "primary",
  suspended: "default",
} as const;

const paymentStatusColorMap = {
  pending: "warning",
  partial: "primary",
  paid: "success",
  overdue: "danger",
  waived: "default",
} as const;

export default function EnrollmentList({ enrollments }: EnrollmentListProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedEnrollment, setSelectedEnrollment] = useState<Enrollment | null>(null);

  const handleEnrollmentClick = (enrollment: Enrollment) => {
    setSelectedEnrollment(enrollment);
    onOpen();
  };

  const columns = [
    { name: "STUDENT", uid: "student" },
    { name: "GRADE & SECTION", uid: "grade" },
    { name: "GUARDIAN", uid: "guardian" },
    { name: "PAYMENT", uid: "payment" },
    { name: "STATUS", uid: "status" },
    { name: "ACTIONS", uid: "actions" },
  ];

  const renderCell = (enrollment: Enrollment, columnKey: React.Key) => {
    switch (columnKey) {
      case "student":
        return (
          <div className="flex items-center gap-2">
            <HiOutlineUser className="text-default-400" />
            <div>
              <p className="font-medium">{enrollment.studentName}</p>
              <p className="text-small text-default-500">{enrollment.studentId}</p>
            </div>
          </div>
        );
      case "grade":
        return (
          <div className="flex items-center gap-2">
            <HiOutlineAcademicCap className="text-default-400" />
            <div>
              <p className="font-medium">{enrollment.gradeLevel}</p>
              <p className="text-small text-default-500">Section {enrollment.section}</p>
            </div>
          </div>
        );
      case "guardian":
        return (
          <div>
            <p className="font-medium">{enrollment.guardian.name}</p>
            <p className="text-small text-default-500">{enrollment.guardian.relationship}</p>
          </div>
        );
      case "payment":
        return (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <HiOutlineCash className="text-default-400" />
              <div>
                <p className="font-medium">
                  {new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'USD',
                    minimumFractionDigits: 0,
                  }).format(enrollment.paidAmount)}
                  <span className="text-small text-default-500">
                    /{new Intl.NumberFormat('en-US', {
                      style: 'currency',
                      currency: 'USD',
                      minimumFractionDigits: 0,
                    }).format(enrollment.tuitionFee)}
                  </span>
                </p>
              </div>
            </div>
            <Progress 
              size="sm"
              value={(enrollment.paidAmount / enrollment.tuitionFee) * 100}
              color={paymentStatusColorMap[enrollment.paymentStatus]}
            />
            <Chip
              className="capitalize"
              color={paymentStatusColorMap[enrollment.paymentStatus]}
              size="sm"
              variant="flat"
            >
              {enrollment.paymentStatus}
            </Chip>
          </div>
        );
      case "status":
        return (
          <Chip
            className="capitalize"
            color={statusColorMap[enrollment.status]}
            size="sm"
            variant="flat"
          >
            {enrollment.status}
          </Chip>
        );
      case "actions":
        return (
          <Button
            size="sm"
            variant="flat"
            color="default"
            className="bg-black text-white"
            onPress={() => handleEnrollmentClick(enrollment)}
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
      <Table aria-label="Enrollment list table">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.uid}>
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={enrollments}>
          {(enrollment) => (
            <TableRow key={enrollment.id}>
              {(columnKey) => (
                <TableCell>{renderCell(enrollment, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>

      {selectedEnrollment && (
        <EnrollmentDetail
          enrollment={selectedEnrollment}
          isOpen={isOpen}
          onClose={onClose}
        />
      )}
    </>
  );
}
