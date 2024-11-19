import { AcademicStudent } from '@/lib/types/academics';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Select,
  SelectItem
} from '@nextui-org/react';
import { useState, useEffect } from 'react';

interface CreateStudentFormProps {
  student?: AcademicStudent | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function CreateStudentForm({ student, isOpen, onClose }: CreateStudentFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    rollNumber: '',
    email: '',
    phone: '',
    gender: '',
    dateOfBirth: '',
    currentClass: '',
    currentSection: '',
    guardianName: '',
    guardianPhone: '',
    guardianEmail: '',
    status: 'active'
  });

  useEffect(() => {
    if (student) {
      setFormData({
        name: student.name,
        rollNumber: student.rollNumber,
        email: student.email || '',
        phone: student.phone || '',
        gender: student.gender,
        dateOfBirth: student.dateOfBirth,
        currentClass: student.currentClass,
        currentSection: student.currentSection,
        guardianName: student.guardianName,
        guardianPhone: student.guardianPhone,
        guardianEmail: student.guardianEmail || '',
        status: student.status
      });
    }
  }, [student]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    onClose();
  };

  const handleChange = (field: string) => (value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="3xl"
      scrollBehavior="inside"
    >
      <ModalContent>
        <form onSubmit={handleSubmit}>
          <ModalHeader>
            {student ? 'Edit Student' : 'Add New Student'}
          </ModalHeader>
          <ModalBody>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Full Name"
                placeholder="Enter student's full name"
                value={formData.name}
                onChange={(e) => handleChange('name')(e.target.value)}
                isRequired
              />
              <Input
                label="Roll Number"
                placeholder="Enter roll number"
                value={formData.rollNumber}
                onChange={(e) => handleChange('rollNumber')(e.target.value)}
                isRequired
              />
              <Input
                label="Email"
                placeholder="Enter email address"
                value={formData.email}
                onChange={(e) => handleChange('email')(e.target.value)}
                type="email"
              />
              <Input
                label="Phone"
                placeholder="Enter phone number"
                value={formData.phone}
                onChange={(e) => handleChange('phone')(e.target.value)}
              />
              <Select
                label="Gender"
                placeholder="Select gender"
                selectedKeys={[formData.gender]}
                onChange={(e) => handleChange('gender')(e.target.value)}
                isRequired
              >
                <SelectItem key="male" value="male">Male</SelectItem>
                <SelectItem key="female" value="female">Female</SelectItem>
                <SelectItem key="other" value="other">Other</SelectItem>
              </Select>
              <Input
                label="Date of Birth"
                placeholder="Enter date of birth"
                value={formData.dateOfBirth}
                onChange={(e) => handleChange('dateOfBirth')(e.target.value)}
                type="date"
                isRequired
              />
              <Select
                label="Class"
                placeholder="Select class"
                selectedKeys={[formData.currentClass]}
                onChange={(e) => handleChange('currentClass')(e.target.value)}
                isRequired
              >
                {Array.from({ length: 12 }, (_, i) => i + 1).map((cls) => (
                  <SelectItem key={cls.toString()} value={cls.toString()}>
                    Class {cls}
                  </SelectItem>
                ))}
              </Select>
              <Select
                label="Section"
                placeholder="Select section"
                selectedKeys={[formData.currentSection]}
                onChange={(e) => handleChange('currentSection')(e.target.value)}
                isRequired
              >
                {['A', 'B', 'C', 'D'].map((section) => (
                  <SelectItem key={section} value={section}>
                    Section {section}
                  </SelectItem>
                ))}
              </Select>
              <Input
                label="Guardian Name"
                placeholder="Enter guardian's name"
                value={formData.guardianName}
                onChange={(e) => handleChange('guardianName')(e.target.value)}
                isRequired
              />
              <Input
                label="Guardian Phone"
                placeholder="Enter guardian's phone"
                value={formData.guardianPhone}
                onChange={(e) => handleChange('guardianPhone')(e.target.value)}
                isRequired
              />
              <Input
                label="Guardian Email"
                placeholder="Enter guardian's email"
                value={formData.guardianEmail}
                onChange={(e) => handleChange('guardianEmail')(e.target.value)}
                type="email"
              />
              <Select
                label="Status"
                placeholder="Select status"
                selectedKeys={[formData.status]}
                onChange={(e) => handleChange('status')(e.target.value)}
                isRequired
              >
                <SelectItem key="active" value="active">Active</SelectItem>
                <SelectItem key="inactive" value="inactive">Inactive</SelectItem>
                <SelectItem key="transferred" value="transferred">Transferred</SelectItem>
                <SelectItem key="graduated" value="graduated">Graduated</SelectItem>
              </Select>
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
              {student ? 'Update' : 'Create'}
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}
