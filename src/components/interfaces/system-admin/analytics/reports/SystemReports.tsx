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
  HiOutlineChartBar,
  HiOutlineServer,
  HiOutlineShieldCheck,
} from 'react-icons/hi';
import { systemReports } from '@/lib/data/reportsData';
import ReportFilters from './ReportFilters';

const statusColorMap = {
  excellent: 'success',
  good: 'success',
  warning: 'warning',
  danger: 'danger',
};

const severityColorMap = {
  high: 'danger',
  medium: 'warning',
  low: 'success',
};

const trendColorMap = {
  improving: 'success',
  stable: 'primary',
  increasing: 'warning',
  decreasing: 'success',
};

export default function SystemReports() {
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
    { key: 'usage', label: 'System Usage' },
    { key: 'performance', label: 'Performance' },
    { key: 'security', label: 'Security' },
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

      {/* System Usage */}
      <Card>
        <CardHeader className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-default-100">
              <HiOutlineChartBar className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-semibold">System Usage</h3>
          </div>
          <p className="text-small text-default-500">
            Track usage patterns and satisfaction across modules
          </p>
        </CardHeader>
        <CardBody>
          <Table aria-label="System usage">
            <TableHeader>
              <TableColumn>MODULE</TableColumn>
              <TableColumn>USAGE RATE</TableColumn>
              <TableColumn>ERRORS</TableColumn>
              <TableColumn>SATISFACTION</TableColumn>
            </TableHeader>
            <TableBody>
              {systemReports.usage.map((item) => (
                <TableRow key={item.module}>
                  <TableCell>{item.module}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Progress
                        value={item.usage}
                        size="sm"
                        radius="sm"
                        classNames={{
                          indicator: item.usage >= 80 ? "bg-success" : "bg-warning",
                        }}
                      />
                      <span>{item.usage}%</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Chip
                      variant="flat"
                      size="sm"
                      color={item.errors > 10 ? 'warning' : 'success'}
                    >
                      {item.errors} issues
                    </Chip>
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

      {/* System Performance */}
      <Card>
        <CardHeader className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-default-100">
              <HiOutlineServer className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-semibold">System Performance</h3>
          </div>
          <p className="text-small text-default-500">
            Monitor system performance metrics
          </p>
        </CardHeader>
        <CardBody>
          <Table aria-label="System performance">
            <TableHeader>
              <TableColumn>METRIC</TableColumn>
              <TableColumn>VALUE</TableColumn>
              <TableColumn>STATUS</TableColumn>
              <TableColumn>TREND</TableColumn>
            </TableHeader>
            <TableBody>
              {systemReports.performance.map((item) => (
                <TableRow key={item.metric}>
                  <TableCell>{item.metric}</TableCell>
                  <TableCell>{item.value}</TableCell>
                  <TableCell>
                    <Chip
                      variant="flat"
                      size="sm"
                      color={statusColorMap[item.status]}
                      className="capitalize"
                    >
                      {item.status}
                    </Chip>
                  </TableCell>
                  <TableCell>
                    <Chip
                      variant="flat"
                      size="sm"
                      color={trendColorMap[item.trend]}
                      className="capitalize"
                    >
                      {item.trend}
                    </Chip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardBody>
      </Card>

      {/* Security Overview */}
      <Card>
        <CardHeader className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-default-100">
              <HiOutlineShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-semibold">Security Overview</h3>
          </div>
          <p className="text-small text-default-500">
            Track security events and trends
          </p>
        </CardHeader>
        <CardBody>
          <Table aria-label="Security overview">
            <TableHeader>
              <TableColumn>EVENT</TableColumn>
              <TableColumn>COUNT</TableColumn>
              <TableColumn>SEVERITY</TableColumn>
              <TableColumn>TREND</TableColumn>
            </TableHeader>
            <TableBody>
              {systemReports.security.map((item) => (
                <TableRow key={item.event}>
                  <TableCell>{item.event}</TableCell>
                  <TableCell>{item.count}</TableCell>
                  <TableCell>
                    <Chip
                      variant="flat"
                      size="sm"
                      color={severityColorMap[item.severity]}
                      className="capitalize"
                    >
                      {item.severity}
                    </Chip>
                  </TableCell>
                  <TableCell>
                    <Chip
                      variant="flat"
                      size="sm"
                      color={trendColorMap[item.trend]}
                      className="capitalize"
                    >
                      {item.trend}
                    </Chip>
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
