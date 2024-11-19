import { generateClasses, generateClassStats } from "@/lib/data/mock-academics";
import ClassesClient from "@/components/interfaces/school/academic/classes/ClassesClient";

export default function ClassesPage() {
  // Generate mock data
  const classes = generateClasses(15);
  const stats = generateClassStats(classes);

  return (
    <ClassesClient 
      initialClasses={classes}
      stats={stats}
    />
  );
}
