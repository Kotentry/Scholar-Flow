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
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import { Class } from "@/lib/types/academics";
import { HiOutlineEye, HiOutlinePencil } from "react-icons/hi";
import ClassDetail from "./ClassDetail";
import CreateClassForm from "./CreateClassForm";

interface ClassListProps {
  classes: Class[];
  showCreateModal: boolean;
  onCloseCreateModal: () => void;
}

const statusColorMap = {
  active: "success",
  inactive: "warning",
  archived: "default",
} as const;

export default function ClassList({ 
  classes,
  showCreateModal,
  onCloseCreateModal,
}: ClassListProps) {
  const [selectedClass, setSelectedClass] = useState<Class | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const { isOpen: isViewOpen, onOpen: onViewOpen, onClose: onViewClose } = useDisclosure();

  const handleViewDetails = (cls: Class) => {
    setSelectedClass(cls);
    onViewOpen();
  };

  const handleEdit = (cls: Class) => {
    setSelectedClass(cls);
    setShowEditModal(true);
  };

  const renderCell = (cls: Class, columnKey: string) => {
    switch (columnKey) {
      case 'name':
        return cls.name;
      case 'academicYear':
        return cls.academicYear;
      case 'sections':
        return cls.sections.length;
      case 'students':
        return cls.sections.reduce((sum, section) => sum + section.currentStrength, 0);
      case 'subjects':
        return cls.subjects.length;
      case 'status':
        return (
          <Chip
            size="sm"
            variant="flat"
            color={statusColorMap[cls.status]}
          >
            {cls.status.charAt(0).toUpperCase() + cls.status.slice(1)}
          </Chip>
        );
      case 'actions':
        return (
          <div className="flex gap-2">
            <Button
              isIconOnly
              size="sm"
              className="bg-black text-white"
              onPress={() => handleViewDetails(cls)}
            >
              <HiOutlineEye className="text-xl" />
            </Button>
            <Button
              isIconOnly
              size="sm"
              className="bg-black text-white"
              onPress={() => handleEdit(cls)}
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
      <Table
        aria-label="Classes table"
        classNames={{
          wrapper: "shadow-none",
        }}
      >
        <TableHeader>
          <TableColumn key="name">Name</TableColumn>
          <TableColumn key="academicYear">Academic Year</TableColumn>
          <TableColumn key="sections">Sections</TableColumn>
          <TableColumn key="students">Students</TableColumn>
          <TableColumn key="subjects">Subjects</TableColumn>
          <TableColumn key="status">Status</TableColumn>
          <TableColumn key="actions" align="center">Actions</TableColumn>
        </TableHeader>
        <TableBody emptyContent="No classes found">
          {classes.map((cls) => (
            <TableRow key={cls.id}>
              {(columnKey) => (
                <TableCell>{renderCell(cls, columnKey)}</TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* View Details Modal */}
      <Modal
        isOpen={isViewOpen}
        onClose={onViewClose}
        size="3xl"
        scrollBehavior="inside"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Class Details</ModalHeader>
              <ModalBody>
                {selectedClass && <ClassDetail class={selectedClass} />}
              </ModalBody>
              <ModalFooter>
                <Button 
                  className="bg-default-100" 
                  onPress={onClose}
                >
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      {/* Edit Class Modal */}
      <Modal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        size="4xl"
        scrollBehavior="inside"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Edit Class</ModalHeader>
              <ModalBody>
                <CreateClassForm
                  initialData={selectedClass}
                  onSubmit={(data) => {
                    console.log('Edit class:', data);
                    onClose();
                  }}
                  onCancel={onClose}
                />
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>

      {/* Create Class Modal */}
      <Modal
        isOpen={showCreateModal}
        onClose={onCloseCreateModal}
        size="4xl"
        scrollBehavior="inside"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Create New Class</ModalHeader>
              <ModalBody>
                <CreateClassForm
                  onSubmit={(data) => {
                    console.log('Create class:', data);
                    onClose();
                  }}
                  onCancel={onClose}
                />
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
