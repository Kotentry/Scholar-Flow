import { AcademicStudent } from '@/lib/types/academics';
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  Button,
  Chip,
  Tooltip,
  User
} from '@nextui-org/react';
import { Eye, Edit } from 'lucide-react';

interface StudentListProps {
  students: AcademicStudent[];
  onView: (student: AcademicStudent) => void;
  onEdit: (student: AcademicStudent) => void;
}

export default function StudentList({ students, onView, onEdit }: StudentListProps) {
  const columns = [
    { name: 'STUDENT', uid: 'student' },
    { name: 'ROLL NUMBER', uid: 'rollNumber' },
    { name: 'CLASS', uid: 'class' },
    { name: 'SECTION', uid: 'section' },
    { name: 'STATUS', uid: 'status' },
    { name: 'ATTENDANCE', uid: 'attendance' },
    { name: 'GRADE', uid: 'grade' },
    { name: 'ACTIONS', uid: 'actions' }
  ];

  const renderCell = (student: AcademicStudent, columnKey: string) => {
    switch (columnKey) {
      case 'student':
        return (
          <User
            name={student.name}
            description={student.email}
            avatarProps={{
              radius: 'lg',
              src: `https://api.dicebear.com/7.x/initials/svg?seed=${student.name}`
            }}
          />
        );
      case 'rollNumber':
        return student.rollNumber;
      case 'class':
        return `Class ${student.currentClass}`;
      case 'section':
        return `Section ${student.currentSection}`;
      case 'status':
        return (
          <Chip
            variant="flat"
            color={
              student.status === 'active' ? 'success' :
              student.status === 'inactive' ? 'warning' :
              student.status === 'transferred' ? 'danger' :
              'primary'
            }
          >
            {student.status.charAt(0).toUpperCase() + student.status.slice(1)}
          </Chip>
        );
      case 'attendance':
        return (
          <div className="flex items-center gap-2">
            <div className="flex-1 bg-gray-200 rounded-full h-2 w-20">
              <div
                className="bg-primary rounded-full h-2"
                style={{ width: `${student.averageAttendance}%` }}
              />
            </div>
            <span className="text-sm">{student.averageAttendance}%</span>
          </div>
        );
      case 'grade':
        return (
          <Chip variant="flat" color="primary">
            {student.averageGrade}
          </Chip>
        );
      case 'actions':
        return (
          <div className="flex gap-2">
            <Tooltip content="View Details">
              <Button
                isIconOnly
                size="sm"
                className="bg-black text-white"
                onClick={() => onView(student)}
              >
                <Eye className="w-4 h-4" />
              </Button>
            </Tooltip>
            <Tooltip content="Edit Student">
              <Button
                isIconOnly
                size="sm"
                className="bg-black text-white"
                onClick={() => onEdit(student)}
              >
                <Edit className="w-4 h-4" />
              </Button>
            </Tooltip>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Table aria-label="Students table">
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === 'actions' ? 'center' : 'start'}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={students}>
        {(student) => (
          <TableRow key={student.id}>
            {(columnKey) => (
              <TableCell>{renderCell(student, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
