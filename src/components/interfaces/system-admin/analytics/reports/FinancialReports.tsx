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
  HiOutlineCurrencyDollar,
  HiOutlineChartPie,
  HiOutlineExclamation,
} from 'react-icons/hi';
import { financialReports } from '@/lib/data/reportsData';
import ReportFilters from './ReportFilters';

export default function FinancialReports() {
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
    { key: 'revenue', label: 'Revenue' },
    { key: 'payments', label: 'Payment Methods' },
    { key: 'outstanding', label: 'Outstanding Payments' },
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

      {/* Revenue by School */}
      <Card>
        <CardHeader className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-default-100">
              <HiOutlineCurrencyDollar className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-semibold">Revenue by School</h3>
          </div>
          <p className="text-small text-default-500">
            Track revenue and collection rates across schools
          </p>
        </CardHeader>
        <CardBody>
          <Table aria-label="Revenue by school">
            <TableHeader>
              <TableColumn>SCHOOL</TableColumn>
              <TableColumn>REVENUE</TableColumn>
              <TableColumn>STUDENTS</TableColumn>
              <TableColumn>COLLECTION RATE</TableColumn>
            </TableHeader>
            <TableBody>
              {financialReports.revenueBySchool.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.school}</TableCell>
                  <TableCell>GHS {item.revenue.toLocaleString()}</TableCell>
                  <TableCell>{item.students}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Progress
                        value={item.collectionRate}
                        size="sm"
                        radius="sm"
                        classNames={{
                          indicator: item.collectionRate >= 90
                            ? "bg-success"
                            : item.collectionRate >= 80
                            ? "bg-warning"
                            : "bg-danger",
                        }}
                      />
                      <span className="text-small">{item.collectionRate}%</span>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardBody>
      </Card>

      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
        {/* Payment Methods */}
        <Card>
          <CardHeader className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-default-100">
                <HiOutlineChartPie className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-semibold">Payment Methods</h3>
            </div>
            <p className="text-small text-default-500">
              Distribution of payment methods used
            </p>
          </CardHeader>
          <CardBody>
            <div className="space-y-4">
              {financialReports.paymentMethods.map((method) => (
                <div key={method.method}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">{method.method}</span>
                    <span className="text-default-500">
                      GHS {method.amount.toLocaleString()}
                    </span>
                  </div>
                  <Progress
                    value={method.percentage}
                    size="sm"
                    radius="sm"
                    classNames={{
                      indicator: "bg-black",
                    }}
                  />
                  <p className="text-small text-default-500 mt-1">
                    {method.percentage}% of total payments
                  </p>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>

        {/* Outstanding Payments */}
        <Card>
          <CardHeader className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-default-100">
                <HiOutlineExclamation className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-semibold">Outstanding Payments</h3>
            </div>
            <p className="text-small text-default-500">
              Track pending and overdue payments
            </p>
          </CardHeader>
          <CardBody>
            <Table aria-label="Outstanding payments">
              <TableHeader>
                <TableColumn>SCHOOL</TableColumn>
                <TableColumn>AMOUNT</TableColumn>
                <TableColumn>DUE DATE</TableColumn>
                <TableColumn>STATUS</TableColumn>
              </TableHeader>
              <TableBody>
                {financialReports.outstandingPayments.map((payment) => (
                  <TableRow key={payment.id}>
                    <TableCell>{payment.school}</TableCell>
                    <TableCell>GHS {payment.amount.toLocaleString()}</TableCell>
                    <TableCell>
                      {new Date(payment.dueDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <Chip
                        variant="flat"
                        size="sm"
                        color={payment.status === 'overdue' ? 'danger' : 'warning'}
                        className="capitalize"
                      >
                        {payment.status}
                      </Chip>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
