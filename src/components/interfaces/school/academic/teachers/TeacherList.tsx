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
  useDisclosure,
} from "@nextui-org/react";
import { Teacher } from "@/lib/types/academics";
import { HiOutlineEye, HiOutlinePencil } from "react-icons/hi";
import TeacherDetail from "./TeacherDetail";
import CreateTeacherForm from "./CreateTeacherForm";

interface TeacherListProps {
  teachers: Teacher[];
}

const columns = [
  { name: "NAME", uid: "name" },
  { name: "EMAIL", uid: "email" },
  { name: "ROLE", uid: "role" },
  { name: "SUBJECTS", uid: "subjects" },
  { name: "STATUS", uid: "status" },
  { name: "ACTIONS", uid: "actions" },
];

export default function TeacherList({ teachers }: TeacherListProps) {
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const { isOpen: isViewOpen, onOpen: onViewOpen, onClose: onViewClose } = useDisclosure();

  const handleViewDetails = (teacher: Teacher) => {
    setSelectedTeacher(teacher);
    onViewOpen();
  };

  const handleEdit = (teacher: Teacher) => {
    setSelectedTeacher(teacher);
    setShowEditModal(true);
  };

  const renderCell = (teacher: Teacher, columnKey: string) => {
    switch (columnKey) {
      case "name":
        return teacher.name;
      case "email":
        return teacher.email;
      case "role":
        return (
          <span className="capitalize">
            {teacher.role.split('_').join(' ')}
          </span>
        );
      case "subjects":
        return (
          <div className="flex flex-wrap gap-1">
            {teacher.subjects.map((subject) => (
              <Chip key={subject} size="sm" variant="flat">
                {subject}
              </Chip>
            ))}
          </div>
        );
      case "status":
        return (
          <Chip
            size="sm"
            variant="flat"
            color={teacher.status === "active" ? "success" : "warning"}
          >
            {teacher.status}
          </Chip>
        );
      case "actions":
        return (
          <div className="flex gap-2">
            <Button
              isIconOnly
              size="sm"
              className="bg-black text-white"
              onPress={() => handleViewDetails(teacher)}
            >
              <HiOutlineEye className="text-xl" />
            </Button>
            <Button
              isIconOnly
              size="sm"
              className="bg-black text-white"
              onPress={() => handleEdit(teacher)}
            >
              <HiOutlinePencil className="text-xl" />
            </Button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <Table aria-label="Teachers table">
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
        <TableBody items={teachers}>
          {(teacher) => (
            <TableRow key={teacher.id}>
              {(columnKey) => (
                <TableCell>{renderCell(teacher, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>

      {selectedTeacher && (
        <>
          <TeacherDetail
            teacher={selectedTeacher}
            isOpen={isViewOpen}
            onClose={onViewClose}
          />
          <CreateTeacherForm
            isOpen={showEditModal}
            onClose={() => setShowEditModal(false)}
            initialData={selectedTeacher}
            isEditing
          />
        </>
      )}
    </>
  );
}
