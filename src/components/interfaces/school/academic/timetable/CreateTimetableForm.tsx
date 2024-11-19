'use client';

import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Select, SelectItem, Input } from "@nextui-org/react";
import { useState } from "react";

interface CreateTimetableFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const classes = ["9", "10", "11", "12"];
const sections = ["A", "B", "C", "D"];
const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const timeSlots = [
  "8:00 AM - 9:00 AM",
  "9:00 AM - 10:00 AM",
  "10:00 AM - 11:00 AM",
  "11:30 AM - 12:30 PM",
  "12:30 PM - 1:30 PM"
];

export default function CreateTimetableForm({ isOpen, onClose }: CreateTimetableFormProps) {
  const [formData, setFormData] = useState({
    class: "",
    section: "",
    selectedDays: [] as string[],
    periodsPerDay: 5,
  });

  const handleSubmit = () => {
    // TODO: Handle form submission
    onClose();
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose}
      size="2xl"
    >
      <ModalContent>
        <ModalHeader>Create New Timetable</ModalHeader>
        <ModalBody>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Select
                label="Class"
                placeholder="Select class"
                selectedKeys={formData.class ? [formData.class] : []}
                onChange={(e) => setFormData({ ...formData, class: e.target.value })}
              >
                {classes.map((cls) => (
                  <SelectItem key={cls} value={cls}>
                    Class {cls}
                  </SelectItem>
                ))}
              </Select>

              <Select
                label="Section"
                placeholder="Select section"
                selectedKeys={formData.section ? [formData.section] : []}
                onChange={(e) => setFormData({ ...formData, section: e.target.value })}
              >
                {sections.map((section) => (
                  <SelectItem key={section} value={section}>
                    Section {section}
                  </SelectItem>
                ))}
              </Select>
            </div>

            <Select
              label="Working Days"
              placeholder="Select working days"
              selectedKeys={formData.selectedDays}
              onChange={(e) => setFormData({ ...formData, selectedDays: Array.from(e.target.selectedOptions, option => option.value) })}
              selectionMode="multiple"
            >
              {days.map((day) => (
                <SelectItem key={day} value={day}>
                  {day}
                </SelectItem>
              ))}
            </Select>

            <Input
              type="number"
              label="Periods per Day"
              value={formData.periodsPerDay.toString()}
              onChange={(e) => setFormData({ ...formData, periodsPerDay: parseInt(e.target.value) })}
              min={1}
              max={10}
            />
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" variant="light" onPress={onClose}>
            Cancel
          </Button>
          <Button className="bg-black text-white" onPress={handleSubmit}>
            Create Timetable
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
