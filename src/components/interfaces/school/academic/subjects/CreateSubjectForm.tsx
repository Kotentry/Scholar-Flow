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
  Textarea,
  Divider,
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

interface CreateSubjectFormProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: Subject;
  isEditing?: boolean;
}

const classOptions = ["9", "10", "11", "12"];
const teacherOptions = ["John Doe", "Jane Smith", "Bob Wilson", "Alice Brown"];

export default function CreateSubjectForm({ 
  isOpen, 
  onClose, 
  initialData,
  isEditing = false 
}: CreateSubjectFormProps) {
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    code: initialData?.code || "",
    description: initialData?.description || "",
    creditHours: initialData?.creditHours || 1,
    class: initialData?.class || "",
    teacher: initialData?.teacher || "",
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
              {isEditing ? "Edit" : "Add"} Subject
            </h3>
          </ModalHeader>
          <ModalBody className="space-y-6">
            <div className="space-y-4">
              <h4 className="text-medium font-semibold">Basic Information</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Subject Name"
                  placeholder="Enter subject name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  isRequired
                />
                <Input
                  label="Subject Code"
                  placeholder="Enter subject code"
                  value={formData.code}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                  isRequired
                />
                <Input
                  type="number"
                  label="Credit Hours"
                  placeholder="Enter credit hours"
                  value={formData.creditHours.toString()}
                  onChange={(e) => setFormData({ ...formData, creditHours: parseInt(e.target.value) })}
                  min={1}
                  max={6}
                  isRequired
                />
                <Select
                  label="Class"
                  placeholder="Select class"
                  selectedKeys={formData.class ? [formData.class] : []}
                  onChange={(e) => setFormData({ ...formData, class: e.target.value })}
                  isRequired
                >
                  {classOptions.map((classNum) => (
                    <SelectItem key={classNum} value={classNum}>
                      Class {classNum}
                    </SelectItem>
                  ))}
                </Select>
              </div>
            </div>

            <Divider />

            <div className="space-y-4">
              <h4 className="text-medium font-semibold">Additional Information</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Select
                  label="Teacher"
                  placeholder="Select teacher"
                  selectedKeys={formData.teacher ? [formData.teacher] : []}
                  onChange={(e) => setFormData({ ...formData, teacher: e.target.value })}
                  isRequired
                >
                  {teacherOptions.map((teacher) => (
                    <SelectItem key={teacher} value={teacher}>
                      {teacher}
                    </SelectItem>
                  ))}
                </Select>
                <Select
                  label="Status"
                  placeholder="Select status"
                  selectedKeys={[formData.status]}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  isRequired
                >
                  <SelectItem key="active" value="active">Active</SelectItem>
                  <SelectItem key="inactive" value="inactive">Inactive</SelectItem>
                </Select>
              </div>
              <Textarea
                label="Description"
                placeholder="Enter subject description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                minRows={3}
              />
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
              {isEditing ? "Update" : "Create"}
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}
