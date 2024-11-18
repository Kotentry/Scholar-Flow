'use client';

import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Chip, Divider, Tabs, Tab, Card, CardBody, Progress } from "@nextui-org/react";
import { Enrollment } from "@/lib/types/enrollments";
import { format } from "date-fns";
import { 
  HiOutlineAcademicCap, 
  HiOutlineCash, 
  HiOutlineUser, 
  HiOutlinePhone, 
  HiOutlineMail,
  HiOutlineLocationMarker,
  HiOutlineCalendar,
  HiOutlineDocumentText,
  HiOutlineExclamationCircle,
  HiOutlineCheckCircle
} from "react-icons/hi";

interface EnrollmentDetailProps {
  enrollment: Enrollment;
  isOpen: boolean;
  onClose: () => void;
}

const statusColorMap = {
  pending: "warning",
  active: "success",
  withdrawn: "danger",
  graduated: "primary",
  suspended: "default",
} as const;

const paymentStatusColorMap = {
  pending: "warning",
  partial: "primary",
  paid: "success",
  overdue: "danger",
  waived: "default",
} as const;

export default function EnrollmentDetail({ enrollment, isOpen, onClose }: EnrollmentDetailProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <Modal
      size="3xl"
      isOpen={isOpen}
      onClose={onClose}
      scrollBehavior="inside"
    >
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">Enrollment Details</h2>
                <div className="flex gap-2">
                  <Chip
                    className="capitalize"
                    color={paymentStatusColorMap[enrollment.paymentStatus]}
                    size="sm"
                    variant="flat"
                  >
                    {enrollment.paymentStatus}
                  </Chip>
                  <Chip
                    className="capitalize"
                    color={statusColorMap[enrollment.status]}
                    size="sm"
                    variant="flat"
                  >
                    {enrollment.status}
                  </Chip>
                </div>
              </div>
            </ModalHeader>
            <Divider />
            <ModalBody>
              <Tabs 
                aria-label="Enrollment details tabs"
                fullWidth
                classNames={{
                  tabList: "bg-default-100 p-0",
                  cursor: "bg-black",
                  tab: "h-10",
                  tabContent: "text-default-500 group-data-[selected=true]:text-white",
                }}
              >
                <Tab key="details" title="Details">
                  <Card>
                    <CardBody className="gap-4">
                      {/* Student Information */}
                      <div>
                        <h3 className="text-lg font-semibold mb-2">Student Information</h3>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <HiOutlineUser className="text-default-500" />
                            <div>
                              <p className="font-medium">{enrollment.studentName}</p>
                              <p className="text-small text-default-500">ID: {enrollment.studentId}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <HiOutlineAcademicCap className="text-default-500" />
                            <div>
                              <p><span className="font-medium">Grade Level:</span> {enrollment.gradeLevel}</p>
                              <p><span className="font-medium">Section:</span> {enrollment.section}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <HiOutlineCalendar className="text-default-500" />
                            <p><span className="font-medium">Academic Year:</span> {enrollment.academicYear}</p>
                          </div>
                        </div>
                      </div>

                      <Divider />

                      {/* Guardian Information */}
                      <div>
                        <h3 className="text-lg font-semibold mb-2">Guardian Information</h3>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <HiOutlineUser className="text-default-500" />
                            <div>
                              <p className="font-medium">{enrollment.guardian.name}</p>
                              <p className="text-small text-default-500">{enrollment.guardian.relationship}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <HiOutlinePhone className="text-default-500" />
                            <p>{enrollment.guardian.phone}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <HiOutlineMail className="text-default-500" />
                            <p>{enrollment.guardian.email}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <HiOutlineLocationMarker className="text-default-500" />
                            <p>{enrollment.guardian.address}</p>
                          </div>
                        </div>
                      </div>

                      <Divider />

                      {/* Payment Information */}
                      <div>
                        <h3 className="text-lg font-semibold mb-2">Payment Information</h3>
                        <div className="space-y-4">
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="text-default-500">Total Tuition Fee</p>
                              <p className="text-xl font-semibold">{formatCurrency(enrollment.tuitionFee)}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-default-500">Amount Paid</p>
                              <p className="text-xl font-semibold">{formatCurrency(enrollment.paidAmount)}</p>
                            </div>
                          </div>
                          <div>
                            <div className="flex justify-between text-small mb-1">
                              <span>Payment Progress</span>
                              <span>{Math.round((enrollment.paidAmount / enrollment.tuitionFee) * 100)}%</span>
                            </div>
                            <Progress 
                              size="md"
                              value={(enrollment.paidAmount / enrollment.tuitionFee) * 100}
                              color={paymentStatusColorMap[enrollment.paymentStatus]}
                            />
                          </div>
                          {enrollment.paymentPlan && (
                            <div>
                              <p className="font-medium mb-1">Payment Plan</p>
                              <p>{enrollment.paymentPlan}</p>
                            </div>
                          )}
                        </div>
                      </div>

                      {enrollment.medicalInfo && (
                        <>
                          <Divider />
                          <div>
                            <h3 className="text-lg font-semibold mb-2">Medical Information</h3>
                            <div className="space-y-2">
                              {enrollment.medicalInfo.conditions && (
                                <div>
                                  <p className="font-medium">Medical Conditions</p>
                                  <p>{enrollment.medicalInfo.conditions}</p>
                                </div>
                              )}
                              {enrollment.medicalInfo.allergies && (
                                <div>
                                  <p className="font-medium">Allergies</p>
                                  <p>{enrollment.medicalInfo.allergies}</p>
                                </div>
                              )}
                              {enrollment.medicalInfo.medications && (
                                <div>
                                  <p className="font-medium">Medications</p>
                                  <p>{enrollment.medicalInfo.medications}</p>
                                </div>
                              )}
                            </div>
                          </div>
                        </>
                      )}
                    </CardBody>
                  </Card>
                </Tab>

                <Tab key="documents" title="Documents">
                  <Card>
                    <CardBody>
                      <div className="space-y-4">
                        {enrollment.documents?.map((doc, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <HiOutlineDocumentText className="text-default-500" />
                            <a href={doc.url} target="_blank" rel="noopener noreferrer" className="text-primary">
                              {doc.name}
                            </a>
                            <Chip
                              size="sm"
                              variant="flat"
                              color={doc.verified ? "success" : "warning"}
                            >
                              {doc.verified ? "Verified" : "Pending"}
                            </Chip>
                          </div>
                        ))}
                      </div>
                    </CardBody>
                  </Card>
                </Tab>

                {enrollment.academicHistory && (
                  <Tab key="academic" title="Academic History">
                    <Card>
                      <CardBody>
                        <div className="space-y-6">
                          {enrollment.academicHistory.map((record, index) => (
                            <div key={index}>
                              <div className="flex items-center gap-2 mb-2">
                                <HiOutlineAcademicCap className="text-default-500" />
                                <h4 className="font-medium">{record.academicYear} - {record.grade}</h4>
                              </div>
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <p className="text-default-500">GPA</p>
                                  <p className="font-medium">{record.gpa}</p>
                                </div>
                                <div>
                                  <p className="text-default-500">Attendance</p>
                                  <p className="font-medium">{record.attendance}%</p>
                                </div>
                              </div>
                              {index < enrollment.academicHistory.length - 1 && <Divider className="my-4" />}
                            </div>
                          ))}
                        </div>
                      </CardBody>
                    </Card>
                  </Tab>
                )}
              </Tabs>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Close
              </Button>
              {enrollment.status === "pending" && (
                <>
                  <Button color="default" variant="flat" className="bg-black text-white">
                    Reject
                  </Button>
                  <Button color="default" variant="flat" className="bg-black text-white">
                    Approve
                  </Button>
                </>
              )}
              {enrollment.status === "active" && enrollment.paymentStatus === "pending" && (
                <Button color="default" variant="flat" className="bg-black text-white">
                  Record Payment
                </Button>
              )}
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
