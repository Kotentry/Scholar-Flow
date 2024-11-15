'use client';

import {
  Card,
  CardBody,
  CardHeader,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Chip,
  Progress,
} from '@nextui-org/react';
import {
  HiOutlineDocumentDownload,
  HiOutlineAcademicCap,
  HiOutlineUserGroup,
  HiOutlineChartBar,
} from 'react-icons/hi';
import { schoolReports } from '@/lib/data/reportsData';
import ReportFilters from './ReportFilters';

export default function SchoolReports() {
  const handleExport = (section: string) => {
    // TODO: Implement export functionality
    console.log(`Exporting ${section}...`);
  };

  const handleSearch = (value: string) => {
    // TODO: Implement search functionality
    console.log('Searching:', value);
  };

  const handleFilterChange = (filter: string) => {
    // TODO: Implement filter functionality
    console.log('Filter changed:', filter);
  };

  const handleDateChange = (range: any) => {
    // TODO: Implement date filter functionality
    console.log('Date range:', range);
  };

  const filterOptions = [
    { key: 'enrollment', label: 'Enrollment' },
    { key: 'staffing', label: 'Staffing' },
    { key: 'performance', label: 'Performance' },
  ];

  return (
    <div className="grid gap-6">
      {/* Filters */}
      <ReportFilters
        filterOptions={filterOptions}
        filterLabel="Report Type"
        onSearch={handleSearch}
        onFilterChange={handleFilterChange}
        onDateChange={handleDateChange}
      />

      {/* Enrollment Statistics */}
      <Card>
        <CardHeader className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-default-100">
              <HiOutlineAcademicCap className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-semibold">Enrollment Statistics</h3>
          </div>
          <p className="text-small text-default-500">
            Track student enrollment and growth across schools
          </p>
        </CardHeader>
        <CardBody>
          <Table aria-label="Enrollment statistics">
            <TableHeader>
              <TableColumn>SCHOOL</TableColumn>
              <TableColumn>TOTAL STUDENTS</TableColumn>
              <TableColumn>NEW STUDENTS</TableColumn>
              <TableColumn>WITHDRAWALS</TableColumn>
              <TableColumn>GROWTH RATE</TableColumn>
            </TableHeader>
            <TableBody>
              {schoolReports.enrollment.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.school}</TableCell>
                  <TableCell>{item.total}</TableCell>
                  <TableCell>
                    <Chip
                      variant="flat"
                      size="sm"
                      color="success"
                    >
                      +{item.newStudents}
                    </Chip>
                  </TableCell>
                  <TableCell>
                    <Chip
                      variant="flat"
                      size="sm"
                      color="danger"
                    >
                      -{item.withdrawals}
                    </Chip>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Progress
                        value={item.growth * 10}
                        size="sm"
                        radius="sm"
                        classNames={{
                          indicator: "bg-success",
                        }}
                      />
                      <span className="text-success">+{item.growth}%</span>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardBody>
      </Card>

      {/* Staffing Overview */}
      <Card>
        <CardHeader className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-default-100">
              <HiOutlineUserGroup className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-semibold">Staffing Overview</h3>
          </div>
          <p className="text-small text-default-500">
            Staff distribution and student-teacher ratios
          </p>
        </CardHeader>
        <CardBody>
          <Table aria-label="Staffing overview">
            <TableHeader>
              <TableColumn>SCHOOL</TableColumn>
              <TableColumn>TEACHERS</TableColumn>
              <TableColumn>ADMINS</TableColumn>
              <TableColumn>SUPPORT STAFF</TableColumn>
              <TableColumn>STUDENT-TEACHER RATIO</TableColumn>
            </TableHeader>
            <TableBody>
              {schoolReports.staffing.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.school}</TableCell>
                  <TableCell>{item.teachers}</TableCell>
                  <TableCell>{item.admins}</TableCell>
                  <TableCell>{item.support}</TableCell>
                  <TableCell>{item.ratio}:1</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardBody>
      </Card>

      {/* Performance Metrics */}
      <Card>
        <CardHeader className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-default-100">
              <HiOutlineChartBar className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-semibold">Performance Metrics</h3>
          </div>
          <p className="text-small text-default-500">
            Track attendance, grades, and satisfaction rates
          </p>
        </CardHeader>
        <CardBody>
          <Table aria-label="Performance metrics">
            <TableHeader>
              <TableColumn>SCHOOL</TableColumn>
              <TableColumn>ATTENDANCE RATE</TableColumn>
              <TableColumn>AVERAGE GRADES</TableColumn>
              <TableColumn>SATISFACTION SCORE</TableColumn>
            </TableHeader>
            <TableBody>
              {schoolReports.performance.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.school}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Progress
                        value={item.attendance}
                        size="sm"
                        radius="sm"
                        classNames={{
                          indicator: item.attendance >= 90 ? "bg-success" : "bg-warning",
                        }}
                      />
                      <span>{item.attendance}%</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Progress
                        value={item.grades}
                        size="sm"
                        radius="sm"
                        classNames={{
                          indicator: item.grades >= 85 ? "bg-success" : "bg-warning",
                        }}
                      />
                      <span>{item.grades}%</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Progress
                        value={item.satisfaction}
                        size="sm"
                        radius="sm"
                        classNames={{
                          indicator: item.satisfaction >= 85 ? "bg-success" : "bg-warning",
                        }}
                      />
                      <span>{item.satisfaction}%</span>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardBody>
      </Card>
    </div>
  );
}
