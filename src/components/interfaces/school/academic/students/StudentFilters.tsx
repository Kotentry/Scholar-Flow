import { AcademicStudentFilters, AcademicStudentStats } from '@/lib/types/academics';
import { Input, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button, Chip } from '@nextui-org/react';
import { Search, ChevronDown, X } from 'lucide-react';

interface StudentFiltersProps {
  filters: AcademicStudentFilters;
  stats: AcademicStudentStats;
  onFiltersChange: (filters: Partial<AcademicStudentFilters>) => void;
}

export default function StudentFilters({ filters, stats, onFiltersChange }: StudentFiltersProps) {
  const statusOptions = ['active', 'inactive', 'transferred', 'graduated'];
  const genderOptions = ['male', 'female', 'other'];
  const classOptions = Array.from(new Set(stats.byClass.map(c => c.class))).sort();
  const sectionOptions = ['A', 'B', 'C', 'D']; // This should come from actual data

  const handleStatusSelect = (status: string) => {
    const newStatus = new Set(filters.status);
    if (newStatus.has(status)) {
      newStatus.delete(status);
    } else {
      newStatus.add(status);
    }
    onFiltersChange({ status: newStatus });
  };

  const handleClassSelect = (cls: string) => {
    const newClass = new Set(filters.class);
    if (newClass.has(cls)) {
      newClass.delete(cls);
    } else {
      newClass.add(cls);
    }
    onFiltersChange({ class: newClass });
  };

  const handleSectionSelect = (section: string) => {
    const newSection = new Set(filters.section);
    if (newSection.has(section)) {
      newSection.delete(section);
    } else {
      newSection.add(section);
    }
    onFiltersChange({ section: newSection });
  };

  const handleGenderSelect = (gender: string) => {
    const newGender = new Set(filters.gender);
    if (newGender.has(gender)) {
      newGender.delete(gender);
    } else {
      newGender.add(gender);
    }
    onFiltersChange({ gender: newGender });
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row gap-4">
        <Input
          placeholder="Search by name or roll number..."
          value={filters.search}
          onChange={(e) => onFiltersChange({ search: e.target.value })}
          startContent={<Search className="w-4 h-4 text-gray-400" />}
          className="flex-1"
        />

        <div className="flex flex-wrap gap-2">
          <Dropdown>
            <DropdownTrigger>
              <Button 
                className="bg-black text-white"
                endContent={<ChevronDown className="w-4 h-4 text-white" />}
              >
                Status
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              selectionMode="multiple"
              selectedKeys={filters.status}
              onSelectionChange={(keys) => onFiltersChange({ status: new Set(keys) })}
            >
              {statusOptions.map((status) => (
                <DropdownItem key={status}>
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>

          <Dropdown>
            <DropdownTrigger>
              <Button 
                className="bg-black text-white"
                endContent={<ChevronDown className="w-4 h-4 text-white" />}
              >
                Class
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              selectionMode="multiple"
              selectedKeys={filters.class}
              onSelectionChange={(keys) => onFiltersChange({ class: new Set(keys) })}
            >
              {classOptions.map((cls) => (
                <DropdownItem key={cls}>Class {cls}</DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>

          <Dropdown>
            <DropdownTrigger>
              <Button 
                className="bg-black text-white"
                endContent={<ChevronDown className="w-4 h-4 text-white" />}
              >
                Section
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              selectionMode="multiple"
              selectedKeys={filters.section}
              onSelectionChange={(keys) => onFiltersChange({ section: new Set(keys) })}
            >
              {sectionOptions.map((section) => (
                <DropdownItem key={section}>Section {section}</DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>

          <Dropdown>
            <DropdownTrigger>
              <Button 
                className="bg-black text-white"
                endContent={<ChevronDown className="w-4 h-4 text-white" />}
              >
                Gender
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              selectionMode="multiple"
              selectedKeys={filters.gender}
              onSelectionChange={(keys) => onFiltersChange({ gender: new Set(keys) })}
            >
              {genderOptions.map((gender) => (
                <DropdownItem key={gender}>
                  {gender.charAt(0).toUpperCase() + gender.slice(1)}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {Array.from(filters.status).map((status) => (
          <Chip
            key={status}
            onClose={() => handleStatusSelect(status)}
            variant="flat"
          >
            Status: {status.charAt(0).toUpperCase() + status.slice(1)}
          </Chip>
        ))}
        {Array.from(filters.class).map((cls) => (
          <Chip
            key={cls}
            onClose={() => handleClassSelect(cls)}
            variant="flat"
          >
            Class {cls}
          </Chip>
        ))}
        {Array.from(filters.section).map((section) => (
          <Chip
            key={section}
            onClose={() => handleSectionSelect(section)}
            variant="flat"
          >
            Section {section}
          </Chip>
        ))}
        {Array.from(filters.gender).map((gender) => (
          <Chip
            key={gender}
            onClose={() => handleGenderSelect(gender)}
            variant="flat"
          >
            {gender.charAt(0).toUpperCase() + gender.slice(1)}
          </Chip>
        ))}
      </div>
    </div>
  );
}
