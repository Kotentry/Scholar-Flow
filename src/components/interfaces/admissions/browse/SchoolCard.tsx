"use client";

import { Card, CardHeader, CardBody, CardFooter, Button, Chip, Image } from "@nextui-org/react";
import { School } from '@/lib/data/SchoolsData';
import { FaMapMarkerAlt, FaUsers, FaGraduationCap } from "react-icons/fa";
import { useState } from "react";
import { SchoolDetailsModal } from './SchoolDetailsModal';
import { ApplyModal } from './ApplyModal';

interface SchoolCardProps {
  school: School;
}

export function SchoolCard({ school }: SchoolCardProps) {
  const [showDetails, setShowDetails] = useState(false);
  const [showApply, setShowApply] = useState(false);

  return (
    <>
      <Card shadow="sm" className="border border-zinc-200">
        <CardHeader className="p-0">
          <div className="relative w-full">
            <Image
              src={school.logo}
              alt={school.name}
              classNames={{
                wrapper: "w-full aspect-[16/9]",
                img: "object-cover w-full h-full"
              }}
              radius="none"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <Chip
              variant="flat"
              color={school.type === 'primary' ? 'default' : school.type === 'secondary' ? 'secondary' : 'primary'}
              size="sm"
              className="absolute top-4 right-4"
            >
              {school.type}
            </Chip>
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <h3 className="text-xl font-semibold mb-2 truncate">{school.name}</h3>
              <p className="flex items-center gap-1 text-sm truncate opacity-90">
                <FaMapMarkerAlt />
                {school.location.city}, {school.location.state}
              </p>
            </div>
          </div>
        </CardHeader>

        <CardBody className="p-6">
          <p className="text-zinc-600 text-sm mb-6 line-clamp-3">
            {school.description}
          </p>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-zinc-100 rounded-full flex items-center justify-center">
                <FaUsers className="text-zinc-600" />
              </div>
              <div>
                <p className="text-sm font-medium">{school.metrics.totalStudents}</p>
                <p className="text-xs text-zinc-500">Students</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-zinc-100 rounded-full flex items-center justify-center">
                <FaGraduationCap className="text-zinc-600" />
              </div>
              <div>
                <p className="text-sm font-medium">{school.metrics.totalTeachers}</p>
                <p className="text-xs text-zinc-500">Teachers</p>
              </div>
            </div>
          </div>
        </CardBody>

        <CardFooter className="gap-3 p-6 pt-0">
          <Button
            variant="bordered"
            className="flex-1"
            onPress={() => setShowDetails(true)}
          >
            View Details
          </Button>
          <Button 
            color="primary"
            className="flex-1 bg-zinc-900"
            onPress={() => setShowApply(true)}
          >
            Apply Now
          </Button>
        </CardFooter>
      </Card>

      <SchoolDetailsModal 
        school={school}
        isOpen={showDetails}
        onClose={() => setShowDetails(false)}
        onApply={() => {
          setShowDetails(false);
          setShowApply(true);
        }}
      />

      <ApplyModal
        school={school}
        isOpen={showApply}
        onClose={() => setShowApply(false)}
      />
    </>
  );
}
