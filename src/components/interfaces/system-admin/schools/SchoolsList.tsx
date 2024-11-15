'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Input,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  Chip,
} from "@nextui-org/react";
import {
  HiOutlineSearch,
  HiOutlineFilter,
  HiOutlinePlus,
  HiOutlineAdjustments,
} from "react-icons/hi";
import SchoolCard from "./SchoolCard";
import { School } from "@/lib/data/schoolsData";

const statusOptions = [
  { key: "all", label: "All Status" },
  { key: "active", label: "Active" },
  { key: "pending", label: "Pending" },
  { key: "inactive", label: "Inactive" },
  { key: "suspended", label: "Suspended" },
];

const typeOptions = [
  { key: "all", label: "All Types" },
  { key: "primary", label: "Primary" },
  { key: "secondary", label: "Secondary" },
  { key: "tertiary", label: "Tertiary" },
];

interface SchoolsListProps {
  schools: School[];
}

export default function SchoolsList({ schools }: SchoolsListProps) {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [selectedStatus, setSelectedStatus] = useState(new Set(["all"]));
  const [selectedType, setSelectedType] = useState(new Set(["all"]));

  // Filter schools based on search and filters
  const filteredSchools = schools.filter((school) => {
    const matchesSearch = school.name.toLowerCase().includes(search.toLowerCase()) ||
      school.location.city.toLowerCase().includes(search.toLowerCase());

    const matchesStatus = selectedStatus.has("all") || selectedStatus.has(school.status);
    const matchesType = selectedType.has("all") || selectedType.has(school.type);

    return matchesSearch && matchesStatus && matchesType;
  });

  const handleViewSchool = (id: string) => {
    router.push(`/admin/schools/${id}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      {/* Actions Section */}
      <div className="flex flex-col gap-4">
        {/* Search Input - Full Width on Mobile */}
        <Input
          placeholder="Search schools..."
          value={search}
          radius="full"
          onValueChange={setSearch}
          startContent={<HiOutlineSearch size={20} />}
          classNames={{
            inputWrapper: "bg-default-100",
          }}
        />
        
        {/* Filters and Add Button Row */}
        <div className="flex items-center gap-3 justify-between">
          <div className="flex gap-3">
            <Dropdown>
              <DropdownTrigger>
                <Button
                  variant="flat"
                  startContent={<HiOutlineAdjustments size={20} color="white" />}
                  className="font-medium bg-black text-white sm:w-40"
                  color="primary"
                >
                  <p className="hidden sm:block">Status</p>
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Status filter"
                selectionMode="single"
                selectedKeys={selectedStatus}
                onSelectionChange={setSelectedStatus}
              >
                {statusOptions.map((status) => (
                  <DropdownItem key={status.key}>{status.label}</DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Dropdown>
              <DropdownTrigger>
                <Button
                  variant="flat"
                  startContent={<HiOutlineFilter size={20} color="white" />}
                  className="font-medium bg-black text-white sm:w-40"
                  color="primary"
                >
                  <p className="hidden sm:block">Type</p>
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Type filter"
                selectionMode="single"
                selectedKeys={selectedType}
                onSelectionChange={setSelectedType}
              >
                {typeOptions.map((type) => (
                  <DropdownItem key={type.key}>{type.label}</DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          </div>
          <Button
            color="primary"
            startContent={<HiOutlinePlus size={20} color="white" />}
            className="font-medium bg-black text-white sm:w-40"
            onPress={() => router.push("/admin/schools/new")}
          >
            <span className="hidden sm:inline">Add School</span>
            <span className="sm:hidden">Add</span>
          </Button>
        </div>
      </div>

      {/* Results Summary */}
      <div className="flex flex-wrap items-center gap-2 text-default-500">
        <div className="flex items-center gap-2">
          <HiOutlineAdjustments className="w-4 h-4" />
          <span>Showing {filteredSchools.length} schools</span>
        </div>
        {search && (
          <Chip 
            size="sm" 
            variant="flat" 
            onClose={() => setSearch("")}
            classNames={{
              base: "border-1 border-default-200",
              content: "text-xs font-medium",
            }}
          >
            Search: {search}
          </Chip>
        )}
        {!selectedStatus.has("all") && (
          <Chip
            size="sm"
            variant="flat"
            onClose={() => setSelectedStatus(new Set(["all"]))}
            classNames={{
              base: "border-1 border-default-200",
              content: "text-xs font-medium",
            }}
          >
            Status: {Array.from(selectedStatus)[0]}
          </Chip>
        )}
        {!selectedType.has("all") && (
          <Chip
            size="sm"
            variant="flat"
            onClose={() => setSelectedType(new Set(["all"]))}
            classNames={{
              base: "border-1 border-default-200",
              content: "text-xs font-medium",
            }}
          >
            Type: {Array.from(selectedType)[0]}
          </Chip>
        )}
      </div>

      {/* Schools Grid */}
      <div className="grid grid-cols-1 gap-6">
        {filteredSchools.map((school) => (
          <SchoolCard
            key={school.id}
            school={school}
            onView={handleViewSchool}
          />
        ))}
        {filteredSchools.length === 0 && (
          <div className="text-center py-12 text-default-500">
            No schools found matching your criteria.
          </div>
        )}
      </div>
    </motion.div>
  );
}
