"use client";

import { School } from "@/lib/data/schoolsData";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Image,
  Chip,
} from "@nextui-org/react";
import { FaMapMarkerAlt, FaUsers, FaGraduationCap, FaArrowLeft, FaChalkboardTeacher, FaBook, FaLaptop, FaFootballBall } from "react-icons/fa";

interface SchoolDetailsModalProps {
  school: School;
  isOpen: boolean;
  onClose: () => void;
}

export function SchoolDetailsModal({ school, isOpen, onClose }: SchoolDetailsModalProps) {
  const features = [
    { icon: <FaChalkboardTeacher />, label: "Experienced Faculty" },
    { icon: <FaBook />, label: "Modern Curriculum" },
    { icon: <FaLaptop />, label: "Tech Integration" },
    { icon: <FaFootballBall />, label: "Sports Programs" },
  ];

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose}
      size="2xl"
      scrollBehavior="inside"
      classNames={{
        backdrop: "bg-zinc-900/50 backdrop-blur-sm",
      }}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              <div className="flex items-center w-full">
                <Button
                  isIconOnly
                  variant="light"
                  onPress={onClose}
                  className="mr-2"
                >
                  <FaArrowLeft />
                </Button>
                <span className="flex-grow text-center font-bold">School Details</span>
                <div className="w-9" /> {/* Spacer for alignment */}
              </div>
            </ModalHeader>

            <ModalBody className="p-0">
              {/* Hero Section */}
              <div className="relative">
                <Image
                  src={school.logo}
                  alt={school.name}
                  classNames={{
                    wrapper: "w-full aspect-[21/9]",
                    img: "object-cover w-full h-full"
                  }}
                  radius="none"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-2xl font-bold">{school.name}</h3>
                    <Chip
                      variant="flat"
                      color={school.type === 'primary' ? 'default' : school.type === 'secondary' ? 'secondary' : 'primary'}
                      size="sm"
                    >
                      {school.type}
                    </Chip>
                  </div>
                  <p className="flex items-center gap-1 text-sm opacity-90">
                    <FaMapMarkerAlt />
                    {school.location.city}, {school.location.state}
                  </p>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="bg-zinc-50 p-4 rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-zinc-900 text-white rounded-full flex items-center justify-center">
                        <FaUsers />
                      </div>
                      <div>
                        <p className="text-2xl font-bold">{school.metrics.totalStudents}</p>
                        <p className="text-sm text-zinc-600">Students</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-zinc-50 p-4 rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-zinc-900 text-white rounded-full flex items-center justify-center">
                        <FaGraduationCap />
                      </div>
                      <div>
                        <p className="text-2xl font-bold">{school.metrics.totalTeachers}</p>
                        <p className="text-sm text-zinc-600">Teachers</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="mb-8">
                  <h4 className="text-lg font-semibold mb-3">About the School</h4>
                  <p className="text-zinc-600">
                    {school.description}
                  </p>
                </div>

                {/* Features */}
                <div className="mb-8">
                  <h4 className="text-lg font-semibold mb-3">Key Features</h4>
                  <div className="grid grid-cols-2 gap-4">
                    {features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 border rounded-lg">
                        <div className="w-8 h-8 bg-zinc-100 rounded-full flex items-center justify-center text-zinc-600">
                          {feature.icon}
                        </div>
                        <span className="text-sm font-medium">{feature.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Additional Info */}
                <div>
                  <h4 className="text-lg font-semibold mb-3">Additional Information</h4>
                  <div className="bg-zinc-50 rounded-xl p-4 space-y-3">
                    <div>
                      <p className="text-sm font-medium">Student-Teacher Ratio</p>
                      <p className="text-zinc-600">1:{Math.round(school.metrics.totalStudents / school.metrics.totalTeachers)}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Facilities</p>
                      <p className="text-zinc-600">Modern classrooms, Library, Computer Lab, Sports Ground</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Achievements</p>
                      <p className="text-zinc-600">Multiple academic and sports awards</p>
                    </div>
                  </div>
                </div>
              </div>
            </ModalBody>

            <ModalFooter className="px-6">
              <Button
                variant="bordered"
                onPress={onClose}
                className="flex-1"
              >
                Close
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
