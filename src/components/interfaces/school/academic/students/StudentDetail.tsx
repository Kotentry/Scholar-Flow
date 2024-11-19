import { AcademicStudent } from '@/lib/types/academics';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Card,
  CardBody,
  Divider,
  Chip,
  Tab,
  Tabs
} from '@nextui-org/react';
import { User } from '@nextui-org/react';

interface StudentDetailProps {
  student: AcademicStudent | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function StudentDetail({ student, isOpen, onClose }: StudentDetailProps) {
  if (!student) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="3xl"
      scrollBehavior="inside"
    >
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          <User
            name={student.name}
            description={student.email}
            avatarProps={{
              size: "lg",
              src: `https://api.dicebear.com/7.x/initials/svg?seed=${student.name}`
            }}
          />
        </ModalHeader>
        <ModalBody className="pb-6">
          <Tabs 
            aria-label="Student details" 
            variant="light"
            fullWidth
            classNames={{
              tabList: "bg-default-100",
              cursor: "bg-black",
              tab: "h-10",
              tabContent: "text-default-500 group-data-[selected=true]:text-white",
            }}
          >
            <Tab key="details" title="Details">
              <Card>
                <CardBody className="gap-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Roll Number</p>
                      <p>{student.rollNumber}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Status</p>
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
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Class</p>
                      <p>Class {student.currentClass}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Section</p>
                      <p>Section {student.currentSection}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Gender</p>
                      <p>{student.gender.charAt(0).toUpperCase() + student.gender.slice(1)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Date of Birth</p>
                      <p>{new Date(student.dateOfBirth).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Phone</p>
                      <p>{student.phone || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p>{student.email || 'N/A'}</p>
                    </div>
                  </div>

                  <Divider />

                  <div>
                    <h4 className="text-medium font-medium mb-2">Guardian Information</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">Guardian Name</p>
                        <p>{student.guardianName}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Guardian Phone</p>
                        <p>{student.guardianPhone}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Guardian Email</p>
                        <p>{student.guardianEmail || 'N/A'}</p>
                      </div>
                    </div>
                  </div>

                  <Divider />

                  <div>
                    <h4 className="text-medium font-medium mb-2">Academic Performance</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">Average Grade</p>
                        <Chip variant="flat" color="primary">
                          {student.averageGrade}
                        </Chip>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Average Attendance</p>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-primary rounded-full h-2"
                              style={{ width: `${student.averageAttendance}%` }}
                            />
                          </div>
                          <span>{student.averageAttendance}%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Tab>
            <Tab key="performance" title="Performance">
              <Card>
                <CardBody>
                  <div className="space-y-4">
                    {student.performances.map((performance, index) => (
                      <Card key={index} className="p-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                          <div>
                            <p className="text-sm text-gray-500">Subject</p>
                            <p>{performance.subject}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Exam Type</p>
                            <Chip variant="flat">
                              {performance.examType.charAt(0).toUpperCase() + performance.examType.slice(1)}
                            </Chip>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Marks</p>
                            <p>{performance.marks}/{performance.totalMarks}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Grade</p>
                            <Chip variant="flat" color="primary">
                              {performance.grade}
                            </Chip>
                          </div>
                        </div>
                        {performance.remarks && (
                          <div className="mt-2">
                            <p className="text-sm text-gray-500">Remarks</p>
                            <p>{performance.remarks}</p>
                          </div>
                        )}
                      </Card>
                    ))}
                    {student.performances.length === 0 && (
                      <p className="text-center text-gray-500">No performance records available</p>
                    )}
                  </div>
                </CardBody>
              </Card>
            </Tab>
            <Tab key="attendance" title="Attendance">
              <Card>
                <CardBody>
                  <div className="space-y-4">
                    {student.attendance.map((record, index) => (
                      <Card key={index} className="p-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                          <div>
                            <p className="text-sm text-gray-500">Date</p>
                            <p>{new Date(record.date).toLocaleDateString()}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Status</p>
                            <Chip
                              variant="flat"
                              color={
                                record.status === 'present' ? 'success' :
                                record.status === 'absent' ? 'danger' :
                                record.status === 'late' ? 'warning' :
                                'default'
                              }
                            >
                              {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                            </Chip>
                          </div>
                          {record.subject && (
                            <div>
                              <p className="text-sm text-gray-500">Subject</p>
                              <p>{record.subject}</p>
                            </div>
                          )}
                          {record.remarks && (
                            <div>
                              <p className="text-sm text-gray-500">Remarks</p>
                              <p>{record.remarks}</p>
                            </div>
                          )}
                        </div>
                      </Card>
                    ))}
                    {student.attendance.length === 0 && (
                      <p className="text-center text-gray-500">No attendance records available</p>
                    )}
                  </div>
                </CardBody>
              </Card>
            </Tab>
          </Tabs>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
