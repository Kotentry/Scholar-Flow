import { faker } from "@faker-js/faker";
import { 
  Class, 
  ClassSection, 
  Subject, 
  Teacher,
  ClassStats,
  ClassStatus,
  SubjectType,
  TeacherRole,
  Student,
  TimeSlot,
  ClassTimetable
} from "../types/academics";

const subjectNames = [
  "Mathematics",
  "English Language",
  "Science",
  "Social Studies",
  "Physical Education",
  "Art",
  "Music",
  "Computer Science",
  "History",
  "Geography",
  "Biology",
  "Chemistry",
  "Physics",
  "Literature",
  "Foreign Language"
];

const generateTeacher = (): Teacher => {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  
  return {
    id: faker.string.uuid(),
    name: `${firstName} ${lastName}`,
    email: faker.internet.email({ firstName, lastName }),
    phone: faker.phone.number(),
    subjects: faker.helpers.arrayElements(subjectNames, { min: 1, max: 3 }),
    role: faker.helpers.arrayElement(['class_teacher', 'subject_teacher', 'assistant_teacher'] as TeacherRole[]),
    joinedAt: faker.date.past().toISOString(),
    status: faker.helpers.arrayElement(['active', 'inactive']),
  };
};

const generateSubject = (teacher?: Teacher): Subject => {
  const name = faker.helpers.arrayElement(subjectNames);
  return {
    id: faker.string.uuid(),
    name,
    code: name.split(' ').map(word => word[0]).join('').toUpperCase(),
    type: faker.helpers.arrayElement(['core', 'elective', 'extra_curricular'] as SubjectType[]),
    description: faker.lorem.sentence(),
    credits: faker.number.int({ min: 1, max: 5 }),
    hoursPerWeek: faker.number.int({ min: 1, max: 6 }),
    teacher,
  };
};

const generateStudent = (sectionId: string): Student => {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const gender = faker.helpers.arrayElement(['male', 'female', 'other']);

  return {
    id: faker.string.uuid(),
    name: `${firstName} ${lastName}`,
    rollNumber: faker.number.int({ min: 1000, max: 9999 }).toString(),
    email: faker.internet.email({ firstName, lastName }),
    phone: faker.phone.number(),
    gender,
    dateOfBirth: faker.date.between({ 
      from: '2005-01-01', 
      to: '2015-12-31' 
    }).toISOString(),
    address: faker.location.streetAddress(),
    guardianName: faker.person.fullName(),
    guardianPhone: faker.phone.number(),
    guardianEmail: faker.internet.email(),
    section: sectionId,
    admissionDate: faker.date.past().toISOString(),
    status: faker.helpers.arrayElement(['active', 'inactive', 'transferred', 'graduated']),
  };
};

const generateSection = (name: string, teacher?: Teacher): ClassSection => {
  const id = faker.string.uuid();
  const capacity = faker.number.int({ min: 25, max: 40 });
  const currentStrength = faker.number.int({ min: 15, max: capacity });
  
  return {
    id,
    name,
    capacity,
    currentStrength,
    classTeacher: teacher,
    students: Array.from({ length: currentStrength }, () => generateStudent(id)),
  };
};

const generateTimeSlot = (subjects: Subject[], teachers: Teacher[], sectionId: string): TimeSlot => {
  const subject = faker.helpers.arrayElement(subjects);
  const teacher = subject.teacher || faker.helpers.arrayElement(teachers);
  
  const startHour = faker.number.int({ min: 8, max: 15 });
  const startTime = `${startHour.toString().padStart(2, '0')}:00`;
  const endTime = `${(startHour + 1).toString().padStart(2, '0')}:00`;
  
  return {
    id: faker.string.uuid(),
    day: faker.helpers.arrayElement(['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']),
    startTime,
    endTime,
    subject,
    teacher,
    section: sectionId,
  };
};

const generateTimetable = (classId: string, sections: ClassSection[], subjects: Subject[], teachers: Teacher[]): ClassTimetable => {
  const slots: TimeSlot[] = [];
  
  sections.forEach(section => {
    // Generate 6 slots per day for each section
    Array.from({ length: 30 }).forEach(() => {
      slots.push(generateTimeSlot(subjects, teachers, section.id));
    });
  });

  return {
    classId,
    slots,
  };
};

export const generateClass = (): Class => {
  const teachers = Array.from({ length: 5 }, generateTeacher);
  const sections = ['A', 'B', 'C'].map(name => generateSection(name, faker.helpers.arrayElement(teachers)));
  const subjects = Array.from({ length: 6 }, () => generateSubject(faker.helpers.arrayElement(teachers)));
  const id = faker.string.uuid();
  const currentYear = new Date().getFullYear();
  
  return {
    id,
    name: `Grade ${faker.number.int({ min: 1, max: 12 })}`,
    sections,
    subjects,
    timetable: generateTimetable(id, sections, subjects, teachers),
    status: faker.helpers.arrayElement(['active', 'inactive']) as ClassStatus,
    academicYear: currentYear.toString(),
    createdAt: faker.date.past().toISOString(),
    updatedAt: faker.date.recent().toISOString(),
  };
};

export const generateClasses = (count: number = 10): Class[] => {
  return Array.from({ length: count }, generateClass);
};

export const generateClassStats = (classes: Class[]): ClassStats => {
  const totalStudents = classes.reduce((sum, cls) => 
    sum + cls.sections.reduce((secSum, sec) => secSum + sec.currentStrength, 0), 
    0
  );

  const totalSections = classes.reduce((sum, cls) => sum + cls.sections.length, 0);

  const academicYears = [...new Set(classes.map(cls => cls.academicYear))];
  const academicYearDistribution = academicYears.map(year => ({
    year,
    count: classes.filter(cls => cls.academicYear === year).length
  }));

  return {
    total: classes.length,
    active: classes.filter(cls => cls.status === 'active').length,
    inactive: classes.filter(cls => cls.status === 'inactive').length,
    archived: classes.filter(cls => cls.status === 'archived').length,
    totalStudents,
    totalSections,
    averageClassSize: Math.round(totalStudents / totalSections),
    academicYearDistribution,
  };
};
