'use client';

import { useState } from "react";
import { 
  Input,
  Select,
  SelectItem,
  Button,
  Divider,
} from "@nextui-org/react";
import { Class, ClassStatus, Subject, Teacher } from "@/lib/types/academics";

interface CreateClassFormProps {
  onSubmit: (data: Partial<Class>) => void;
  onCancel: () => void;
  initialData?: Partial<Class>;
  isEditing?: boolean;
}

interface SectionInput {
  name: string;
  capacity: string;
  classTeacherId: string;
}

interface SubjectInput {
  name: string;
  code: string;
  type: string;
  hoursPerWeek: string;
}

const academicYears = ['2023-2024', '2024-2025'];
const statusOptions: ClassStatus[] = ['active', 'inactive', 'archived'];
const subjectTypes = ['core', 'elective', 'extra_curricular'];

export default function CreateClassForm({ 
  onSubmit, 
  onCancel, 
  initialData,
  isEditing = false 
}: CreateClassFormProps) {
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    academicYear: initialData?.academicYear || new Date().getFullYear().toString(),
    status: initialData?.status || "active",
    sections: initialData?.sections ? 
      initialData.sections.map(s => ({
        name: s.name,
        capacity: s.capacity.toString(),
        classTeacherId: s.classTeacher?.id
      })) : 
      [{ name: "A", capacity: "40", classTeacherId: "" }],
    subjects: initialData?.subjects ?
      initialData.subjects.map(s => ({
        name: s.name,
        code: s.code,
        type: s.type,
        hoursPerWeek: s.hoursPerWeek.toString()
      })) :
      [] as SubjectInput[],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const processedData: Partial<Class> = {
      name: formData.name,
      academicYear: formData.academicYear,
      status: formData.status,
      sections: formData.sections.map(section => ({
        name: section.name,
        capacity: parseInt(section.capacity),
        classTeacherId: section.classTeacherId,
        currentStrength: 0,
      })),
      subjects: formData.subjects.map(subject => ({
        name: subject.name,
        code: subject.code,
        type: subject.type as any,
        hoursPerWeek: parseInt(subject.hoursPerWeek),
      })),
    };
    onSubmit(processedData);
  };

  const addSection = () => {
    setFormData(prev => ({
      ...prev,
      sections: [...prev.sections, { name: "", capacity: "40", classTeacherId: "" }]
    }));
  };

  const removeSection = (index: number) => {
    setFormData(prev => ({
      ...prev,
      sections: prev.sections.filter((_, i) => i !== index)
    }));
  };

  const updateSection = (index: number, field: keyof SectionInput, value: string) => {
    setFormData(prev => ({
      ...prev,
      sections: prev.sections.map((section, i) => 
        i === index ? { ...section, [field]: value } : section
      )
    }));
  };

  const handleSubjectChange = (index: number, field: keyof SubjectInput, value: string) => {
    setFormData(prev => ({
      ...prev,
      subjects: prev.subjects.map((subject, i) => 
        i === index ? { ...subject, [field]: value } : subject
      )
    }));
  };

  const addSubject = () => {
    setFormData(prev => ({
      ...prev,
      subjects: [...prev.subjects, {
        name: '',
        code: '',
        type: 'core',
        hoursPerWeek: '1'
      }]
    }));
  };

  const removeSubject = (index: number) => {
    setFormData(prev => ({
      ...prev,
      subjects: prev.subjects.filter((_, i) => i !== index)
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Basic Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Class Name"
            placeholder="e.g., Grade 1"
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            isRequired
          />
          <Select
            label="Academic Year"
            placeholder="Select academic year"
            selectedKeys={[formData.academicYear]}
            onChange={(e) => setFormData(prev => ({ ...prev, academicYear: e.target.value }))}
          >
            {academicYears.map(year => (
              <SelectItem key={year} value={year}>
                {year}
              </SelectItem>
            ))}
          </Select>
          <Select
            label="Status"
            placeholder="Select status"
            selectedKeys={[formData.status]}
            onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))}
          >
            {statusOptions.map(status => (
              <SelectItem key={status} value={status}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </SelectItem>
            ))}
          </Select>
        </div>
      </div>

      <Divider />

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium">Sections</h3>
          <Button
            size="sm"
            variant="flat"
            onPress={addSection}
          >
            Add Section
          </Button>
        </div>

        <div className="space-y-4">
          {formData.sections.map((section, index) => (
            <div key={index} className="grid grid-cols-3 gap-4 items-end">
              <Input
                label="Section Name"
                placeholder="e.g., A"
                value={section.name}
                onChange={(e) => updateSection(index, 'name', e.target.value)}
                isRequired
              />
              <Input
                label="Capacity"
                type="number"
                placeholder="e.g., 40"
                value={section.capacity}
                onChange={(e) => updateSection(index, 'capacity', e.target.value)}
                isRequired
              />
              <div className="flex gap-2">
                <Select
                  label="Class Teacher"
                  selectedKeys={section.classTeacherId ? [section.classTeacherId] : []}
                  onChange={(e) => updateSection(index, 'classTeacherId', e.target.value)}
                  className="flex-1"
                >
                  <SelectItem key="1" value="1">John Doe</SelectItem>
                  <SelectItem key="2" value="2">Jane Smith</SelectItem>
                </Select>
                {index > 0 && (
                  <Button
                    isIconOnly
                    color="danger"
                    variant="flat"
                    size="lg"
                    onPress={() => removeSection(index)}
                  >
                    ×
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <Divider />

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium">Subjects</h3>
          <Button
            size="sm"
            variant="flat"
            onPress={addSubject}
          >
            Add Subject
          </Button>
        </div>
        <div className="space-y-4">
          {formData.subjects.map((subject, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-start">
              <Input
                label="Subject Name"
                placeholder="e.g., Mathematics"
                value={subject.name}
                onChange={(e) => handleSubjectChange(index, 'name', e.target.value)}
              />
              <Input
                label="Subject Code"
                placeholder="e.g., MATH"
                value={subject.code}
                onChange={(e) => handleSubjectChange(index, 'code', e.target.value)}
              />
              <Select
                label="Type"
                placeholder="Select type"
                selectedKeys={[subject.type]}
                onChange={(e) => handleSubjectChange(index, 'type', e.target.value)}
              >
                {subjectTypes.map(type => (
                  <SelectItem key={type} value={type}>
                    {type.split('_').map(word => 
                      word.charAt(0).toUpperCase() + word.slice(1)
                    ).join(' ')}
                  </SelectItem>
                ))}
              </Select>
              <div className="flex gap-2">
                <Input
                  type="number"
                  label="Hours per Week"
                  placeholder="e.g., 4"
                  value={subject.hoursPerWeek}
                  onChange={(e) => handleSubjectChange(index, 'hoursPerWeek', e.target.value)}
                  className="flex-1"
                />
                <Button
                  isIconOnly
                  color="danger"
                  variant="light"
                  onPress={() => removeSubject(index)}
                  className="mt-7"
                >
                  ×
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Divider />

      <div className="flex justify-end gap-2">
        <Button
          variant="flat"
          onPress={onCancel}
        >
          Cancel
        </Button>
        <Button
          className="bg-black text-white"
          type="submit"
        >
          Save
        </Button>
      </div>
    </form>
  );
}
