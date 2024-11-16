"use client";

import { School } from '@/lib/data/SchoolsData';
import { SchoolCard } from './SchoolCard';
import { Input, Select, SelectItem, Pagination, Button } from "@nextui-org/react";
import { FaSearch, FaSchool, FaMapMarkerAlt, FaSearchLocation } from "react-icons/fa";
import { useState, useMemo } from 'react';

interface SchoolsGridProps {
  schools: School[];
}

const ITEMS_PER_PAGE = 6;

export function SchoolsGrid({ schools }: SchoolsGridProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [locationFilter, setLocationFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredSchools = useMemo(() => {
    return schools.filter(school => {
      const matchesSearch = school.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          school.location.city.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesType = typeFilter === 'all' || school.type === typeFilter;
      const matchesLocation = locationFilter === 'all' || 
                            school.location.city.toLowerCase() === locationFilter.toLowerCase();
      
      return matchesSearch && matchesType && matchesLocation;
    });
  }, [schools, searchQuery, typeFilter, locationFilter]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredSchools.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedSchools = filteredSchools.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  // Get unique locations from schools
  const locations = [...new Set(schools.map(school => school.location.city))];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Filter Bar */}
      <div className="bg-zinc-900 p-6 rounded-xl">
        <div className="flex flex-col md:flex-row gap-4">
          <Input
            placeholder="Search schools..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            startContent={<FaSearch className="text-zinc-400" />}
            classNames={{
              base: "bg-white",
              inputWrapper: "bg-white",
            }}
            size="lg"
          />
          
          <Select
            placeholder="School Type"
            value={typeFilter}
            onChange={(e) => {
              setTypeFilter(e.target.value);
              setCurrentPage(1);
            }}
            startContent={<FaSchool className="text-zinc-400" />}
            classNames={{
              base: "bg-white max-w-xs",
              trigger: "bg-white",
            }}
            size="lg"
          >
            <SelectItem key="all" value="all">All Types</SelectItem>
            <SelectItem key="primary" value="primary">Primary</SelectItem>
            <SelectItem key="secondary" value="secondary">Secondary</SelectItem>
            <SelectItem key="tertiary" value="tertiary">Tertiary</SelectItem>
          </Select>

          <Select
            placeholder="Location"
            value={locationFilter}
            onChange={(e) => {
              setLocationFilter(e.target.value);
              setCurrentPage(1);
            }}
            startContent={<FaMapMarkerAlt className="text-zinc-400" />}
            classNames={{
              base: "bg-white max-w-xs",
              trigger: "bg-white",
            }}
            size="lg"
          >
            <SelectItem key="all" value="all">All Locations</SelectItem>
            {locations.map(location => (
              <SelectItem key={location} value={location.toLowerCase()}>
                {location}
              </SelectItem>
            ))}
          </Select>
        </div>
      </div>

      {/* Schools Grid */}
      {paginatedSchools.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedSchools.map((school) => (
              <SchoolCard key={school.id} school={school} />
            ))}
          </div>

          {/* Pagination */}
          {filteredSchools.length > ITEMS_PER_PAGE && (
            <div className="flex justify-center mt-12">
              <Pagination
                total={totalPages}
                page={currentPage}
                onChange={setCurrentPage}
                showControls
                color="default"
                classNames={{
                  wrapper: "gap-2",
                  item: "bg-white border-zinc-200 text-zinc-900",
                  cursor: "bg-zinc-900 text-white",
                }}
              />
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-16 px-4">
          <div className="w-20 h-20 bg-zinc-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <FaSearchLocation className="text-4xl text-zinc-400" />
          </div>
          <h3 className="text-xl font-semibold mb-2">No Schools Found</h3>
          <p className="text-zinc-600 mb-6 max-w-md mx-auto">
            We couldn't find any schools matching your search criteria. Try adjusting your filters or search terms.
          </p>
          <div className="flex justify-center gap-3">
            <Button
              variant="bordered"
              onPress={() => {
                setSearchQuery('');
                setTypeFilter('all');
                setLocationFilter('all');
                setCurrentPage(1);
              }}
            >
              Clear Filters
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
