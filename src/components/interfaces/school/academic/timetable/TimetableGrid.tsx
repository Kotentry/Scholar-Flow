'use client';

import { Card, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react";

interface Period {
  time: string;
  subject: string;
  teacher: string;
}

interface DaySchedule {
  day: string;
  periods: Period[];
}

interface TimetableGridProps {
  timetable: {
    class: string;
    section: string;
    schedule: DaySchedule[];
  };
}

export default function TimetableGrid({ timetable }: TimetableGridProps) {
  return (
    <Card className="p-4">
      <h2 className="text-xl font-semibold mb-4">
        Class {timetable.class} - Section {timetable.section}
      </h2>
      
      <Table 
        aria-label="Timetable grid"
        className="mt-4"
        isStriped
      >
        <TableHeader>
          <TableColumn>Time</TableColumn>
          {timetable.schedule.map((day) => (
            <TableColumn key={day.day}>{day.day}</TableColumn>
          ))}
        </TableHeader>
        <TableBody>
          {timetable.schedule[0].periods.map((period, periodIndex) => (
            <TableRow key={period.time}>
              <TableCell>{period.time}</TableCell>
              {timetable.schedule.map((day) => (
                <TableCell key={day.day}>
                  <div>
                    <div className="font-medium">{day.periods[periodIndex].subject}</div>
                    <div className="text-sm text-gray-500">{day.periods[periodIndex].teacher}</div>
                  </div>
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}
