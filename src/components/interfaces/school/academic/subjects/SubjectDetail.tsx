'use client';

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Divider,
  Chip,
} from "@nextui-org/react";

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

interface SubjectDetailProps {
  subject: Subject;
  isOpen: boolean;
  onClose: () => void;
}

export default function SubjectDetail({ subject, isOpen, onClose }: SubjectDetailProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="2xl"
    >
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          <h3 className="text-xl font-bold">{subject.name}</h3>
          <p className="text-small text-default-500">
            {subject.code}
          </p>
        </ModalHeader>
        <ModalBody className="space-y-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="text-medium font-semibold">Basic Information</h4>
              <Chip
                size="sm"
                variant="flat"
                color={subject.status === "active" ? "success" : "warning"}
              >
                {subject.status}
              </Chip>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-small text-default-500">Class</p>
                <p>Class {subject.class}</p>
              </div>
              <div>
                <p className="text-small text-default-500">Credit Hours</p>
                <p>{subject.creditHours} Hours</p>
              </div>
            </div>
          </div>

          <Divider />

          <div className="space-y-4">
            <h4 className="text-medium font-semibold">Teacher Information</h4>
            <div>
              <p className="text-small text-default-500">Assigned Teacher</p>
              <p>{subject.teacher}</p>
            </div>
          </div>

          <Divider />

          <div className="space-y-4">
            <h4 className="text-medium font-semibold">Description</h4>
            <p className="text-default-500">
              {subject.description}
            </p>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
