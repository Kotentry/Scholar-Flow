'use client';

import { useState } from "react";
import { 
  Modal, 
  ModalContent, 
  ModalHeader, 
  ModalBody,
  ModalFooter,
  Button,
  Card,
  CardBody,
  Tabs,
  Tab,
  Chip,
  Divider,
  Input,
  Checkbox,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { format } from "date-fns";
import { Application } from "@/lib/types/admissions";
import { HiOutlineDocumentDownload, HiOutlineCheck, HiOutlineX, HiOutlineCalendar } from "react-icons/hi";

interface ApplicationDetailProps {
  application: Application;
  isOpen: boolean;
  onClose: () => void;
}

export default function ApplicationDetail({ application, isOpen, onClose }: ApplicationDetailProps) {
  const [showInterviewSchedule, setShowInterviewSchedule] = useState(false);
  const [interviewDate, setInterviewDate] = useState("");
  const [interviewTime, setInterviewTime] = useState("");
  const [skipInterview, setSkipInterview] = useState(false);
  const [priority, setPriority] = useState("medium");

  const handleApprove = () => {
    if (skipInterview) {
      // Directly approve without interview
      console.log("Approve application without interview:", application.id);
      onClose();
    } else {
      setShowInterviewSchedule(true);
    }
  };

  const handleScheduleInterview = () => {
    // Handle interview scheduling
    console.log("Schedule interview for:", application.id, {
      date: interviewDate,
      time: interviewTime,
    });
    setShowInterviewSchedule(false);
    onClose();
  };

  const handleReject = () => {
    // Implement reject logic
    console.log("Reject application:", application.id);
    onClose();
  };

  return (
    <>
      <Modal
        size="full"
        isOpen={isOpen}
        onClose={onClose}
        scrollBehavior="inside"
        
      >
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <div className="flex justify-between items-center">
                  <span>Application Review</span>
                  <div className="flex gap-2 items-center">
                    <Select
                      label="Priority"
                      size="sm"
                      value={priority}
                      onChange={(e) => setPriority(e.target.value)}
                      className="w-32"
                    >
                      <SelectItem key="high" value="high">High Priority</SelectItem>
                      <SelectItem key="medium" value="medium">Medium Priority</SelectItem>
                      <SelectItem key="low" value="low">Low Priority</SelectItem>
                    </Select>
                    <Chip size="sm" variant="flat" color="primary">
                      {application.applicationNumber}
                    </Chip>
                  </div>
                </div>
              </ModalHeader>
              <ModalBody>
                <Tabs 
                  aria-label="Application details" 
                  fullWidth
                  classNames={{
                    tabList: "bg-default-100 p-0",
                    cursor: "bg-black",
                    tab: "h-10",
                    tabContent: "text-default-500 group-data-[selected=true]:text-white",
                  }}
                >
                  <Tab key="personal" title="Personal Information">
                    <Card className="bg-default-50">
                      <CardBody className="gap-8">
                        <div className="space-y-6">
                          <div>
                            <h3 className="text-lg font-semibold mb-4">Basic Information</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <p className="text-sm text-default-500">Full Name</p>
                                <p>{application.firstName} {application.lastName}</p>
                              </div>
                              <div>
                                <p className="text-sm text-default-500">Date of Birth</p>
                                <p>{format(new Date(application.dateOfBirth), "MMMM d, yyyy")}</p>
                              </div>
                              <div>
                                <p className="text-sm text-default-500">Gender</p>
                                <p>{application.gender}</p>
                              </div>
                              <div>
                                <p className="text-sm text-default-500">Email</p>
                                <p>{application.email}</p>
                              </div>
                              <div>
                                <p className="text-sm text-default-500">Phone</p>
                                <p>{application.phone}</p>
                              </div>
                              <div>
                                <p className="text-sm text-default-500">Address</p>
                                <p>{application.address}</p>
                              </div>
                            </div>
                          </div>

                          <Divider />

                          <div>
                            <h3 className="text-lg font-semibold mb-4">Guardian Information</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <p className="text-sm text-default-500">Guardian Name</p>
                                <p>{application.guardianName}</p>
                              </div>
                              <div>
                                <p className="text-sm text-default-500">Relationship</p>
                                <p>{application.relationship}</p>
                              </div>
                              <div>
                                <p className="text-sm text-default-500">Email</p>
                                <p>{application.guardianEmail}</p>
                              </div>
                              <div>
                                <p className="text-sm text-default-500">Phone</p>
                                <p>{application.guardianPhone}</p>
                              </div>
                              <div>
                                <p className="text-sm text-default-500">Occupation</p>
                                <p>{application.guardianOccupation}</p>
                              </div>
                              <div>
                                <p className="text-sm text-default-500">Address</p>
                                <p>{application.guardianAddress}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardBody>
                    </Card>
                  </Tab>

                  <Tab key="academic" title="Academic History">
                    <Card className="bg-default-50">
                      <CardBody className="gap-6">
                        <div>
                          <h3 className="text-lg font-semibold mb-4">Current Academic Status</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <p className="text-sm text-default-500">Previous School</p>
                              <p>{application.previousSchool}</p>
                            </div>
                            <div>
                              <p className="text-sm text-default-500">Grade Level</p>
                              <p>{application.gradeLevel}</p>
                            </div>
                            <div>
                              <p className="text-sm text-default-500">GPA</p>
                              <p>{application.gpa}</p>
                            </div>
                          </div>
                        </div>

                        <Divider />

                        <div>
                          <h3 className="text-lg font-semibold mb-4">Achievements & Activities</h3>
                          <div className="space-y-4">
                            <div>
                              <p className="text-sm text-default-500">Achievements</p>
                              <p className="whitespace-pre-wrap">{application.achievements}</p>
                            </div>
                            <div>
                              <p className="text-sm text-default-500">Activities</p>
                              <p className="whitespace-pre-wrap">{application.activities}</p>
                            </div>
                            <div>
                              <p className="text-sm text-default-500">Awards</p>
                              <ul className="list-disc list-inside">
                                {application.awards.map((award, index) => (
                                  <li key={index}>{award}</li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </CardBody>
                    </Card>
                  </Tab>

                  <Tab key="documents" title="Documents">
                    <Card className="bg-default-50">
                      <CardBody>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {[
                            { name: "Birth Certificate", file: application.birthCertificate },
                            { name: "Academic Records", file: application.academicRecords },
                            { name: "Medical Records", file: application.medicalRecords },
                            { name: "Recommendation Letter", file: application.recommendationLetter },
                            ...application.additionalDocuments.map((doc, index) => ({
                              name: `Additional Document ${index + 1}`,
                              file: doc,
                            })),
                          ].map((document, index) => (
                            <Card key={index} className="bg-white">
                              <CardBody className="flex flex-row items-center justify-between">
                                <div className="space-y-1">
                                  <p className="font-medium">{document.name}</p>
                                  <p className="text-sm text-default-500">
                                    {document.file}
                                  </p>
                                </div>
                                <Button
                                  isIconOnly
                                  className="bg-black text-white"
                                  onClick={() => window.open(document.file, "_blank")}
                                >
                                  <HiOutlineDocumentDownload className="w-5 h-5" />
                                </Button>
                              </CardBody>
                            </Card>
                          ))}
                        </div>
                      </CardBody>
                    </Card>
                  </Tab>

                  <Tab key="questionnaire" title="Questionnaire">
                    <Card className="bg-default-50">
                      <CardBody className="gap-6">
                        <div>
                          <h3 className="text-lg font-semibold mb-4">Students Response</h3>
                          <div className="space-y-6">
                            <div>
                              <p className="text-sm text-default-500">Reason for Joining</p>
                              <p className="whitespace-pre-wrap">{application.joinReason}</p>
                            </div>
                            <div>
                              <p className="text-sm text-default-500">Academic Goals</p>
                              <p className="whitespace-pre-wrap">{application.academicGoals}</p>
                            </div>
                            <div>
                              <p className="text-sm text-default-500">Special Requirements</p>
                              <p>{application.specialRequirements}</p>
                            </div>
                            <div>
                              <p className="text-sm text-default-500">Interests</p>
                              <p>{application.interests}</p>
                            </div>
                            <div>
                              <p className="text-sm text-default-500">Strengths</p>
                              <p>{application.strengths}</p>
                            </div>
                            <div>
                              <p className="text-sm text-default-500">Challenges</p>
                              <p>{application.challenges}</p>
                            </div>
                          </div>
                        </div>
                      </CardBody>
                    </Card>
                  </Tab>
                </Tabs>
              </ModalBody>
              <ModalFooter>
                <div className="flex gap-2">
                  <Button
                    variant="light"
                    startContent={<HiOutlineX />}
                    onPress={handleReject}
                    className="text-danger"
                  >
                    Reject
                  </Button>
                  <Checkbox
                    isSelected={skipInterview}
                    onValueChange={setSkipInterview}
                  >
                    Skip Interview
                  </Checkbox>
                  <Button
                    className="bg-black text-white"
                    startContent={<HiOutlineCheck />}
                    onPress={handleApprove}
                  >
                    {skipInterview ? "Approve" : "Schedule Interview"}
                  </Button>
                </div>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      <Modal
        size="sm"
        isOpen={showInterviewSchedule}
        onClose={() => setShowInterviewSchedule(false)}
        classNames={{
          backdrop: "z-[60]",
          wrapper: "z-[61]",
        }}
      >
        <ModalContent>
          {() => (
            <>
              <ModalHeader>Schedule Interview</ModalHeader>
              <ModalBody>
                <div className="space-y-4">
                  <Input
                    type="date"
                    label="Interview Date"
                    placeholder="Select date"
                    value={interviewDate}
                    onChange={(e) => setInterviewDate(e.target.value)}
                    startContent={<HiOutlineCalendar />}
                  />
                  <Input
                    type="time"
                    label="Interview Time"
                    placeholder="Select time"
                    value={interviewTime}
                    onChange={(e) => setInterviewTime(e.target.value)}
                  />
                </div>
              </ModalBody>
              <ModalFooter>
                <Button
                  variant="light"
                  onPress={() => setShowInterviewSchedule(false)}
                >
                  Cancel
                </Button>
                <Button
                  className="bg-black text-white"
                  onPress={handleScheduleInterview}
                  isDisabled={!interviewDate || !interviewTime}
                >
                  Schedule
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
