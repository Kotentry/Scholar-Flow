'use client';

import { useState } from "react";
import { 
  Card, 
  CardBody,
  Tab, 
  Tabs,
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  User,
  Chip,
  Divider,
  Select,
  SelectItem,
  Input
} from "@nextui-org/react";
import { Class } from "@/lib/types/academics";
import { HiOutlineSearch } from "react-icons/hi";

interface ClassDetailProps {
  class: Class;
}

const Overview = ({ class: cls }: { class: Class }) => {
  return (
    <Card>
      <CardBody>
        <div className="space-y-4">
          <div>
            <h3 className="text-sm text-default-500">Basic Information</h3>
            <div className="grid grid-cols-2 gap-4 mt-2">
              <div>
                <p className="text-sm text-default-500">Name</p>
                <p className="font-medium">{cls.name}</p>
              </div>
              <div>
                <p className="text-sm text-default-500">Academic Year</p>
                <p className="font-medium">{cls.academicYear}</p>
              </div>
              <div>
                <p className="text-sm text-default-500">Status</p>
                <Chip
                  size="sm"
                  variant="flat"
                  color={cls.status === 'active' ? 'success' : cls.status === 'inactive' ? 'warning' : 'default'}
                >
                  {cls.status.charAt(0).toUpperCase() + cls.status.slice(1)}
                </Chip>
              </div>
              <div>
                <p className="text-sm text-default-500">Created At</p>
                <p className="font-medium">{new Date(cls.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-sm text-default-500">Statistics</h3>
            <div className="grid grid-cols-3 gap-4 mt-2">
              <div>
                <p className="text-sm text-default-500">Total Sections</p>
                <p className="font-medium">{cls.sections.length}</p>
              </div>
              <div>
                <p className="text-sm text-default-500">Total Students</p>
                <p className="font-medium">
                  {cls.sections.reduce((sum, section) => sum + section.currentStrength, 0)}
                </p>
              </div>
              <div>
                <p className="text-sm text-default-500">Total Subjects</p>
                <p className="font-medium">{cls.subjects.length}</p>
              </div>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

const Sections = ({ class: cls }: { class: Class }) => {
  const [selectedSection, setSelectedSection] = useState(cls.sections[0].id);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredStudents = cls.sections
    .find(section => section.id === selectedSection)
    ?.students.filter(student => 
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.rollNumber.includes(searchQuery) ||
      student.guardianName.toLowerCase().includes(searchQuery.toLowerCase())
    ) || [];

  return (
    <div className="flex flex-col h-full">
      <div className="sticky top-0 z-10 bg-white space-y-4 pb-4">
        <Tabs 
          aria-label="Sections"
          variant="light"
          fullWidth
          classNames={{
            tabList: "bg-default-100",
            cursor: "bg-black",
            tab: "h-8",
            tabContent: "text-default-500 group-data-[selected=true]:text-white",
            base: "w-full"
          }}
          selectedKey={selectedSection}
          onSelectionChange={(key) => setSelectedSection(key as string)}
        >
          {cls.sections.map((section) => (
            <Tab 
              key={section.id} 
              title={`Section ${section.name}`}
            />
          ))}
        </Tabs>

        <div className="flex justify-between items-center gap-4">
          <Input
            className="w-72"
            placeholder="Search students..."
            startContent={<HiOutlineSearch />}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          
          {cls.sections.map(section => 
            section.id === selectedSection && 
            section.classTeacher && (
              <div key={section.id} className="flex items-center gap-2">
                <span className="text-small font-semibold">Class Teacher:</span>
                <User
                  name={section.classTeacher.name}
                  description={section.classTeacher.email}
                  avatarProps={{ size: "sm" }}
                />
              </div>
            )
          )}
        </div>

        {cls.sections.map(section => section.id === selectedSection && (
          <div key={section.id} className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold">Section {section.name}</h3>
              <p className="text-small text-default-500">
                Capacity: {section.currentStrength}/{section.capacity} students
              </p>
            </div>
          </div>
        ))}

        <Divider />
      </div>

      <div className="overflow-auto flex-grow">
        <Table 
          aria-label="Students list"
          classNames={{
            wrapper: "shadow-none"
          }}
        >
          <TableHeader>
            <TableColumn>STUDENT</TableColumn>
            <TableColumn>ROLL NO.</TableColumn>
            <TableColumn>GUARDIAN</TableColumn>
            <TableColumn>STATUS</TableColumn>
          </TableHeader>
          <TableBody emptyContent="No students found">
            {filteredStudents.map((student) => (
              <TableRow key={student.id}>
                <TableCell>
                  <User
                    name={student.name}
                    description={student.email}
                  />
                </TableCell>
                <TableCell>{student.rollNumber}</TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <span>{student.guardianName}</span>
                    <span className="text-tiny text-default-500">{student.guardianPhone}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Chip
                    size="sm"
                    variant="flat"
                    color={
                      student.status === 'active' ? 'success' :
                      student.status === 'inactive' ? 'danger' :
                      student.status === 'transferred' ? 'warning' : 'default'
                    }
                  >
                    {student.status}
                  </Chip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

const Subjects = ({ class: cls }: { class: Class }) => {
  return (
    <Card>
      <CardBody>
        <Table aria-label="Subjects table">
          <TableHeader>
            <TableColumn>Name</TableColumn>
            <TableColumn>Code</TableColumn>
            <TableColumn>Type</TableColumn>
            <TableColumn>Hours/Week</TableColumn>
            <TableColumn>Teacher</TableColumn>
          </TableHeader>
          <TableBody>
            {cls.subjects.map((subject) => (
              <TableRow key={subject.id}>
                <TableCell>{subject.name}</TableCell>
                <TableCell>{subject.code}</TableCell>
                <TableCell>
                  <Chip
                    size="sm"
                    variant="flat"
                    color={
                      subject.type === 'core' ? 'primary' :
                      subject.type === 'elective' ? 'secondary' :
                      'default'
                    }
                  >
                    {subject.type.split('_').map(word => 
                      word.charAt(0).toUpperCase() + word.slice(1)
                    ).join(' ')}
                  </Chip>
                </TableCell>
                <TableCell>{subject.hoursPerWeek}</TableCell>
                <TableCell>
                  {subject.teacher ? (
                    <User
                      name={subject.teacher.name}
                      description={subject.teacher.email}
                      avatarProps={{
                        src: `https://i.pravatar.cc/150?u=${subject.teacher.id}`,
                      }}
                    />
                  ) : (
                    "Not Assigned"
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardBody>
    </Card>
  );
};

const Timetable = ({ class: cls }: { class: Class }) => {
  const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  const [selectedSection, setSelectedSection] = useState(cls.sections[0].id);

  const sectionSlots = cls.timetable.slots.filter(
    slot => slot.section === selectedSection
  ).sort((a, b) => {
    const dayDiff = days.indexOf(a.day) - days.indexOf(b.day);
    if (dayDiff !== 0) return dayDiff;
    return a.startTime.localeCompare(b.startTime);
  });

  return (
    <div className="w-full">
      <div className="flex gap-2 mb-4">
        <Select
          label="Section"
          selectedKeys={[selectedSection]}
          onChange={(e) => setSelectedSection(e.target.value)}
          classNames={{
            trigger: "bg-default-100"
          }}
        >
          {cls.sections.map((section) => (
            <SelectItem key={section.id} value={section.id}>
              Section {section.name}
            </SelectItem>
          ))}
        </Select>
      </div>

      <Table 
        aria-label="Class timetable"
        classNames={{
          wrapper: "shadow-none"
        }}
      >
        <TableHeader>
          <TableColumn>DAY</TableColumn>
          <TableColumn>TIME</TableColumn>
          <TableColumn>SUBJECT</TableColumn>
          <TableColumn>TEACHER</TableColumn>
        </TableHeader>
        <TableBody emptyContent="No timetable entries found">
          {sectionSlots.map((slot) => (
            <TableRow key={slot.id}>
              <TableCell className="capitalize">{slot.day}</TableCell>
              <TableCell>{slot.startTime} - {slot.endTime}</TableCell>
              <TableCell>
                <div className="flex flex-col">
                  <span>{slot.subject.name}</span>
                  <span className="text-tiny text-default-500">
                    {slot.subject.type} • {slot.subject.hoursPerWeek} hrs/week
                  </span>
                </div>
              </TableCell>
              <TableCell>
                <User
                  name={slot.teacher.name}
                  description={slot.teacher.email}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default function ClassDetail({ class: cls }: ClassDetailProps) {
  return (
    <div className="flex w-full flex-col h-[calc(100vh-200px)]">
      <div className="sticky top-0 z-20 bg-white pb-2">
        <Tabs 
          aria-label="Class details"
          variant="light"
          fullWidth
          classNames={{
            tabList: "bg-default-100",
            cursor: "bg-black",
            tab: "h-10",
            tabContent: "text-default-500 group-data-[selected=true]:text-white",
          }}
        >
          <Tab key="overview" title="Overview">
            <Overview class={cls} />
          </Tab>
          <Tab key="sections" title="Sections">
            <Sections class={cls} />
          </Tab>
          <Tab key="subjects" title="Subjects">
            <Subjects class={cls} />
          </Tab>
          <Tab key="timetable" title="Timetable">
            <Timetable class={cls} />
          </Tab>
        </Tabs>
      </div>
    </div>
  );
}
