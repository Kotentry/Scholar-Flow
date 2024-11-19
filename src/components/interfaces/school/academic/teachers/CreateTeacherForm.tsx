'use client';

import { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Select,
  SelectItem,
  Divider,
} from "@nextui-org/react";
import { Teacher, TeacherRole } from "@/lib/types/academics";

interface CreateTeacherFormProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: Teacher;
  isEditing?: boolean;
}

const roleOptions: TeacherRole[] = ["class_teacher", "subject_teacher", "assistant_teacher"];
const subjectOptions = ["Mathematics", "Physics", "Chemistry", "Biology", "English", "History"]; // Mock subjects

export default function CreateTeacherForm({ 
  isOpen, 
  onClose, 
  initialData,
  isEditing = false 
}: CreateTeacherFormProps) {
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    email: initialData?.email || "",
    phone: initialData?.phone || "",
    role: initialData?.role || "subject_teacher",
    subjects: initialData?.subjects || [],
    status: initialData?.status || "active",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, we would submit the form data here
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="2xl"
    >
      <ModalContent>
        <form onSubmit={handleSubmit}>
          <ModalHeader>
            <h3 className="text-xl font-bold">
              {isEditing ? "Edit" : "Add"} Teacher
            </h3>
          </ModalHeader>
          <ModalBody className="space-y-6">
            <div className="space-y-4">
              <h4 className="text-medium font-semibold">Basic Information</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Full Name"
                  placeholder="Enter full name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  isRequired
                />
                <Input
                  label="Email"
                  type="email"
                  placeholder="Enter email address"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  isRequired
                />
                <Input
                  label="Phone"
                  type="tel"
                  placeholder="Enter phone number"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  isRequired
                />
                <Select
                  label="Role"
                  placeholder="Select role"
                  selectedKeys={[formData.role]}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value as TeacherRole })}
                  isRequired
                >
                  {roleOptions.map((role) => (
                    <SelectItem key={role} value={role} className="capitalize">
                      {role.split('_').join(' ')}
                    </SelectItem>
                  ))}
                </Select>
              </div>
            </div>

            <Divider />

            <div className="space-y-4">
              <h4 className="text-medium font-semibold">Teaching Information</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Select
                  label="Subjects"
                  placeholder="Select subjects"
                  selectionMode="multiple"
                  selectedKeys={new Set(formData.subjects)}
                  onChange={(e) => setFormData({ ...formData, subjects: Array.from(e.target.value as Set<string>) })}
                  isRequired
                >
                  {subjectOptions.map((subject) => (
                    <SelectItem key={subject} value={subject}>
                      {subject}
                    </SelectItem>
                  ))}
                </Select>
                <Select
                  label="Status"
                  placeholder="Select status"
                  selectedKeys={[formData.status]}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as "active" | "inactive" })}
                  isRequired
                >
                  <SelectItem key="active" value="active">Active</SelectItem>
                  <SelectItem key="inactive" value="inactive">Inactive</SelectItem>
                </Select>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              variant="flat"
              onPress={onClose}
            >
              Cancel
            </Button>
            <Button
              className="bg-black text-white"
              type="submit"
            >
              Save
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}
