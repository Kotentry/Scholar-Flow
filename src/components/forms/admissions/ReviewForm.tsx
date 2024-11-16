"use client";

import { useFormContext } from "react-hook-form";
import { Card, CardBody, Button, Avatar, Divider } from "@nextui-org/react";
import { FaCamera, FaUser, FaUsers, FaGraduationCap, FaFileAlt, FaQuestionCircle, FaCheck } from "react-icons/fa";
import { mockApplicationData } from "@/lib/data/mockApplicationData";

interface ReviewFormProps {
  onPrevious: () => void;
}

export function ReviewForm({ onPrevious }: ReviewFormProps) {
  const { watch } = useFormContext();
  // Use mock data for now, later we'll use actual form data
  const formData = mockApplicationData;

  const sections = [
    {
      id: "personal-info",
      title: "Personal Information",
      icon: <FaUser className="text-xl" />,
      fields: [
        { label: "First Name", value: formData.firstName },
        { label: "Last Name", value: formData.lastName },
        { label: "Date of Birth", value: formData.dateOfBirth },
        { label: "Gender", value: formData.gender },
        { label: "Email", value: formData.email },
        { label: "Phone", value: formData.phone },
        { label: "Address", value: formData.address },
      ],
    },
    {
      id: "guardian-info",
      title: "Guardian Information",
      icon: <FaUsers className="text-xl" />,
      fields: [
        { label: "Guardian Name", value: formData.guardianName },
        { label: "Relationship", value: formData.relationship },
        { label: "Guardian Email", value: formData.guardianEmail },
        { label: "Guardian Phone", value: formData.guardianPhone },
        { label: "Guardian Address", value: formData.guardianAddress },
        { label: "Occupation", value: formData.guardianOccupation },
      ],
    },
    {
      id: "academic-history",
      title: "Academic History",
      icon: <FaGraduationCap className="text-xl" />,
      fields: [
        { label: "Previous School", value: formData.previousSchool },
        { label: "Grade Level", value: formData.gradeLevel },
        { label: "GPA", value: formData.gpa },
        { label: "Achievements", value: formData.achievements },
        { label: "Activities", value: formData.activities },
        { 
          label: "Awards", 
          value: formData.awards.map((award, index) => (
            <div key={index} className="ml-4 list-disc">
              • {award}
            </div>
          ))
        },
      ],
    },
    {
      id: "documents",
      title: "Documents",
      icon: <FaFileAlt className="text-xl" />,
      fields: [
        { label: "Birth Certificate", value: formData.birthCertificate },
        { label: "Academic Records", value: formData.academicRecords },
        { label: "Medical Records", value: formData.medicalRecords },
        { label: "Recommendation Letter", value: formData.recommendationLetter },
        { 
          label: "Additional Documents", 
          value: formData.additionalDocuments.map((doc, index) => (
            <div key={index} className="ml-4 list-disc">
              • {doc}
            </div>
          ))
        },
      ],
    },
    {
      id: "questionnaire",
      title: "Questionnaire",
      icon: <FaQuestionCircle className="text-xl" />,
      fields: [
        { label: "Why do you want to join?", value: formData.joinReason },
        { label: "Academic Goals", value: formData.academicGoals },
        { label: "Special Requirements", value: formData.specialRequirements },
        { label: "Interests", value: formData.interests },
        { label: "Strengths", value: formData.strengths },
        { label: "Challenges", value: formData.challenges },
      ],
    },
  ];

  return (
    <div className="space-y-8">
      {/* Profile Header */}
      <Card>
        <CardBody>
          <div className="flex flex-col items-center">
            <div className="relative mb-4">
              <Avatar
                className="w-24 h-24"
                src={formData.profileImage}
                fallback={
                  <div className="w-24 h-24 bg-zinc-100 rounded-full flex items-center justify-center">
                    <FaUser className="w-12 h-12 text-zinc-400" />
                  </div>
                }
              />
              <Button
                isIconOnly
                className="absolute bottom-0 right-0 bg-zinc-900 text-white"
                size="sm"
              >
                <FaCamera />
              </Button>
            </div>
            <h2 className="text-xl font-semibold">
              {formData.firstName} {formData.lastName}
            </h2>
            <p className="text-sm text-zinc-600">{formData.email}</p>
          </div>
        </CardBody>
      </Card>

      {/* Application Summary */}
      <Card>
        <CardBody className="space-y-6">
          <div className="flex items-center gap-2">
            <FaCheck className="text-green-500" />
            <h3 className="text-lg font-semibold">Application Summary</h3>
          </div>

          {sections.map((section) => (
            <div key={section.id}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-zinc-100 rounded-full flex items-center justify-center">
                  {section.icon}
                </div>
                <h4 className="font-semibold">{section.title}</h4>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-14">
                {section.fields.map((field) => (
                  <div key={field.label} className={field.label.includes("join") || field.label.includes("Goals") ? "col-span-2" : ""}>
                    <p className="text-sm font-medium text-zinc-600">
                      {field.label}
                    </p>
                    <p className="mt-1">
                      {field.value || <span className="text-zinc-400">Not provided</span>}
                    </p>
                  </div>
                ))}
              </div>

              <Divider className="my-6" />
            </div>
          ))}
        </CardBody>
      </Card>

      {/* Navigation */}
      <div className="flex justify-end gap-3">
        <Button
          variant="bordered"
          onClick={() => window.location.hash = "questionnaire"}
        >
          Previous: Questionnaire
        </Button>
        <Button
          variant="bordered"
          onClick={() => window.location.hash = ""}
        >
          Save & Continue Later
        </Button>
        <Button
          color="primary"
          className="bg-zinc-900"
        >
          Submit Application
        </Button>
      </div>
    </div>
  );
}
