'use client';

import { useState } from "react";
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableColumn, 
  TableRow, 
  TableCell,
  Chip,
  Button,
  Tooltip,
  useDisclosure,
} from "@nextui-org/react";
import { HiOutlineEye, HiOutlinePencil } from "react-icons/hi";
import SubjectDetail from "./SubjectDetail";
import CreateSubjectForm from "./CreateSubjectForm";

interface Subject {
  id: string;
  name: string;
  code: string;
  description: string;
  creditHours: number;
  class: string;
  teacher: string;
  status: string;
}

interface SubjectListProps {
  subjects: Subject[];
}

const columns = [
  { name: "CODE", uid: "code" },
  { name: "NAME", uid: "name" },
  { name: "CLASS", uid: "class" },
  { name: "TEACHER", uid: "teacher" },
  { name: "CREDIT HOURS", uid: "creditHours" },
  { name: "STATUS", uid: "status" },
  { name: "ACTIONS", uid: "actions" },
];

export default function SubjectList({ subjects }: SubjectListProps) {
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const { isOpen: isViewOpen, onOpen: onViewOpen, onClose: onViewClose } = useDisclosure();

  const handleViewDetails = (subject: Subject) => {
    setSelectedSubject(subject);
    onViewOpen();
  };

  const handleEdit = (subject: Subject) => {
    setSelectedSubject(subject);
    setShowEditModal(true);
  };

  const renderCell = (subject: Subject, columnKey: string) => {
    switch (columnKey) {
      case "code":
        return <span className="font-medium">{subject.code}</span>;
      case "name":
        return subject.name;
      case "class":
        return `Class ${subject.class}`;
      case "teacher":
        return subject.teacher;
      case "creditHours":
        return (
          <Chip size="sm" variant="flat">
            {subject.creditHours} Hours
          </Chip>
        );
      case "status":
        return (
          <Chip
            size="sm"
            variant="flat"
            color={subject.status === "active" ? "success" : "warning"}
          >
            {subject.status}
          </Chip>
        );
      case "actions":
        return (
          <div className="flex gap-2">
            <Tooltip content="View Details">
              <Button
                isIconOnly
                size="sm"
                className="bg-black text-white"
                onPress={() => handleViewDetails(subject)}
              >
                <HiOutlineEye className="text-xl" />
              </Button>
            </Tooltip>
            <Tooltip content="Edit">
              <Button
                isIconOnly
                size="sm"
                className="bg-black text-white"
                onPress={() => handleEdit(subject)}
              >
                <HiOutlinePencil className="text-xl" />
              </Button>
            </Tooltip>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <Table aria-label="Subjects table">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn 
              key={column.uid}
              align={column.uid === "actions" ? "center" : "start"}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={subjects}>
          {(subject) => (
            <TableRow key={subject.id}>
              {(columnKey) => (
                <TableCell>{renderCell(subject, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>

      {selectedSubject && (
        <>
          <SubjectDetail
            subject={selectedSubject}
            isOpen={isViewOpen}
            onClose={onViewClose}
          />
          <CreateSubjectForm
            isOpen={showEditModal}
            onClose={() => setShowEditModal(false)}
            initialData={selectedSubject}
            isEditing
          />
        </>
      )}
    </>
  );
}
