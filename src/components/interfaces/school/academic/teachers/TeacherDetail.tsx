'use client';

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Divider,
  Chip,
} from "@nextui-org/react";
import { Teacher } from "@/lib/types/academics";

interface TeacherDetailProps {
  teacher: Teacher;
  isOpen: boolean;
  onClose: () => void;
}

export default function TeacherDetail({ teacher, isOpen, onClose }: TeacherDetailProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="2xl"
    >
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          <h3 className="text-xl font-bold">{teacher.name}</h3>
          <p className="text-small text-default-500 capitalize">
            {teacher.role.split('_').join(' ')}
          </p>
        </ModalHeader>
        <ModalBody className="space-y-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="text-medium font-semibold">Contact Information</h4>
              <Chip
                size="sm"
                variant="flat"
                color={teacher.status === "active" ? "success" : "warning"}
              >
                {teacher.status}
              </Chip>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-small text-default-500">Email</p>
                <p>{teacher.email}</p>
              </div>
              <div>
                <p className="text-small text-default-500">Phone</p>
                <p>{teacher.phone}</p>
              </div>
            </div>
          </div>

          <Divider />

          <div className="space-y-4">
            <h4 className="text-medium font-semibold">Teaching Information</h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-small text-default-500">Joined Date</p>
                <p>{new Date(teacher.joinedAt).toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-small text-default-500">Subjects</p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {teacher.subjects.map((subject) => (
                    <Chip key={subject} size="sm" variant="flat">
                      {subject}
                    </Chip>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Additional sections can be added here */}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
