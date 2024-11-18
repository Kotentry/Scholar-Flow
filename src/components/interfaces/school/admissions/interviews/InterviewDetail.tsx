'use client';

import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Chip, Divider, Tabs, Tab, Card, CardBody } from "@nextui-org/react";
import { Interview } from "@/lib/types/interviews";
import { format } from "date-fns";
import { HiOutlineCalendar, HiOutlineVideoCamera, HiOutlineLocationMarker, HiOutlineDocumentText, HiOutlineLink } from "react-icons/hi";

interface InterviewDetailProps {
  interview: Interview;
  isOpen: boolean;
  onClose: () => void;
}

const statusColorMap = {
  scheduled: "primary",
  completed: "success",
  cancelled: "danger",
  no_show: "warning",
} as const;

export default function InterviewDetail({ interview, isOpen, onClose }: InterviewDetailProps) {
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
                <h2 className="text-xl font-bold">Interview Details</h2>
                <Chip
                  className="capitalize"
                  color={statusColorMap[interview.status]}
                  size="sm"
                  variant="flat"
                >
                  {interview.status.replace("_", " ")}
                </Chip>
              </div>
            </ModalHeader>
            <Divider />
            <ModalBody>
              <Tabs 
                aria-label="Interview details tabs"
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
                          <p><span className="font-medium">Name:</span> {interview.studentName}</p>
                          <p><span className="font-medium">Grade Applied:</span> {interview.gradeLevel}</p>
                          <p><span className="font-medium">Application ID:</span> {interview.applicationId}</p>
                        </div>
                      </div>

                      <Divider />

                      {/* Interview Schedule */}
                      <div>
                        <h3 className="text-lg font-semibold mb-2">Schedule Details</h3>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <HiOutlineCalendar className="text-default-500" />
                            <div>
                              <p><span className="font-medium">Date:</span> {format(new Date(interview.dateTime), "MMMM d, yyyy")}</p>
                              <p><span className="font-medium">Time:</span> {format(new Date(interview.dateTime), "h:mm a")}</p>
                            </div>
                          </div>
                          <p><span className="font-medium">Duration:</span> {interview.duration} minutes</p>
                          <div className="flex items-center gap-2">
                            {interview.isOnline ? (
                              <HiOutlineVideoCamera className="text-default-500" />
                            ) : (
                              <HiOutlineLocationMarker className="text-default-500" />
                            )}
                            <p><span className="font-medium">Location:</span> {interview.location}</p>
                          </div>
                          {interview.meetingLink && (
                            <div className="flex items-center gap-2">
                              <HiOutlineLink className="text-default-500" />
                              <a href={interview.meetingLink} target="_blank" rel="noopener noreferrer" className="text-primary">
                                Join Meeting
                              </a>
                            </div>
                          )}
                        </div>
                      </div>

                      <Divider />

                      {/* Interviewer Information */}
                      <div>
                        <h3 className="text-lg font-semibold mb-2">Interviewer</h3>
                        <p>{interview.interviewerName}</p>
                      </div>

                      {interview.notes && (
                        <>
                          <Divider />
                          <div>
                            <h3 className="text-lg font-semibold mb-2">Notes</h3>
                            <p>{interview.notes}</p>
                          </div>
                        </>
                      )}
                    </CardBody>
                  </Card>
                </Tab>

                {interview.feedback && (
                  <Tab key="feedback" title="Feedback">
                    <Card>
                      <CardBody className="gap-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <h3 className="text-lg font-semibold mb-4">Ratings</h3>
                            <div className="space-y-4">
                              <div>
                                <p className="font-medium">Academic Potential</p>
                                <div className="flex gap-1">
                                  {Array.from({ length: 5 }).map((_, i) => (
                                    <div
                                      key={i}
                                      className={`w-8 h-2 rounded ${
                                        i < interview.feedback!.academicPotential
                                          ? "bg-primary"
                                          : "bg-default-100"
                                      }`}
                                    />
                                  ))}
                                </div>
                              </div>
                              <div>
                                <p className="font-medium">Behavioral Assessment</p>
                                <div className="flex gap-1">
                                  {Array.from({ length: 5 }).map((_, i) => (
                                    <div
                                      key={i}
                                      className={`w-8 h-2 rounded ${
                                        i < interview.feedback!.behavioralAssessment
                                          ? "bg-primary"
                                          : "bg-default-100"
                                      }`}
                                    />
                                  ))}
                                </div>
                              </div>
                              <div>
                                <p className="font-medium">Communication Skills</p>
                                <div className="flex gap-1">
                                  {Array.from({ length: 5 }).map((_, i) => (
                                    <div
                                      key={i}
                                      className={`w-8 h-2 rounded ${
                                        i < interview.feedback!.communicationSkills
                                          ? "bg-primary"
                                          : "bg-default-100"
                                      }`}
                                    />
                                  ))}
                                </div>
                              </div>
                              <div>
                                <p className="font-medium">Overall Rating</p>
                                <div className="flex gap-1">
                                  {Array.from({ length: 5 }).map((_, i) => (
                                    <div
                                      key={i}
                                      className={`w-8 h-2 rounded ${
                                        i < interview.feedback!.overallRating
                                          ? "bg-primary"
                                          : "bg-default-100"
                                      }`}
                                    />
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold mb-4">Comments</h3>
                            <p>{interview.feedback.comments}</p>
                          </div>
                        </div>
                      </CardBody>
                    </Card>
                  </Tab>
                )}

                {interview.documents && interview.documents.length > 0 && (
                  <Tab key="documents" title="Documents">
                    <Card>
                      <CardBody>
                        <div className="space-y-4">
                          {interview.documents.map((doc, index) => (
                            <div key={index} className="flex items-center gap-2">
                              <HiOutlineDocumentText className="text-default-500" />
                              <a href={doc} target="_blank" rel="noopener noreferrer" className="text-primary">
                                Document {index + 1}
                              </a>
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
              {interview.status === "scheduled" && (
                <>
                  <Button color="default" variant="flat" className="bg-black text-white">
                    Reschedule
                  </Button>
                  <Button color="default" variant="flat" className="bg-black text-white">
                    Start Interview
                  </Button>
                </>
              )}
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
