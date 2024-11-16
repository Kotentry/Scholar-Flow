"use client";

import { Input, Select, SelectItem } from "@nextui-org/react";
import { FaSearch, FaSchool, FaMapMarkerAlt } from "react-icons/fa";
import { motion } from "framer-motion";

interface FilterBarProps {
  onSearch: (value: string) => void;
  onTypeFilter: (value: string) => void;
  onLocationFilter: (value: string) => void;
}

export function FilterBar({ onSearch, onTypeFilter, onLocationFilter }: FilterBarProps) {
  return (
    <motion.div 
      className="flex flex-col md:flex-row gap-4 mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Input
        placeholder="Search schools..."
        className="flex-1"
        startContent={<FaSearch className="text-zinc-400" />}
        onChange={(e) => onSearch(e.target.value)}
        size="lg"
        variant="bordered"
      />
      
      <Select
        placeholder="School Type"
        className="w-full md:w-[200px]"
        onChange={(e) => onTypeFilter(e.target.value)}
        size="lg"
        variant="bordered"
        startContent={<FaSchool className="text-zinc-400" />}
      >
        <SelectItem key="all" value="all">All Types</SelectItem>
        <SelectItem key="primary" value="primary">Primary</SelectItem>
        <SelectItem key="secondary" value="secondary">Secondary</SelectItem>
        <SelectItem key="tertiary" value="tertiary">Tertiary</SelectItem>
      </Select>

      <Select
        placeholder="Location"
        className="w-full md:w-[200px]"
        onChange={(e) => onLocationFilter(e.target.value)}
        size="lg"
        variant="bordered"
        startContent={<FaMapMarkerAlt className="text-zinc-400" />}
      >
        <SelectItem key="all" value="all">All Locations</SelectItem>
        <SelectItem key="lagos" value="lagos">Lagos</SelectItem>
        <SelectItem key="abuja" value="abuja">Abuja</SelectItem>
        <SelectItem key="port-harcourt" value="port-harcourt">Port Harcourt</SelectItem>
      </Select>
    </motion.div>
  );
}
