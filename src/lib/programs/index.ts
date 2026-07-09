import programs, { type Program, type ProgramCategory, type ProgramDegree } from "./data";

/** Get all programs, optionally filtered by category or degree */
export function getPrograms(opts?: {
  category?: ProgramCategory;
  degree?: ProgramDegree;
}): Program[] {
  let result = programs;
  if (opts?.category) {
    result = result.filter((p) => p.category === opts.category);
  }
  if (opts?.degree) {
    result = result.filter((p) => p.degree === opts.degree);
  }
  return result;
}

/** Get a single program by slug */
export function getProgramBySlug(slug: string): Program | undefined {
  return programs.find((p) => p.slug === slug);
}

/** Get all unique categories with their metadata */
export function getCategories(): {
  key: ProgramCategory;
  label: string;
  description: string;
  count: number;
}[] {
  const counts: Record<ProgramCategory, number> = {
    Undergraduate: 0,
    Graduate: 0,
    "Diplomas / Short Courses": 0,
  };
  programs.forEach((p) => counts[p.category]++);

  return [
    {
      key: "Undergraduate",
      label: "Undergraduate Programs",
      description: "Bachelor's degrees, B.Ed, and associate degree programs",
      count: counts.Undergraduate,
    },
    {
      key: "Graduate",
      label: "Graduate Programs",
      description: "Master's and MS-level programs",
      count: counts.Graduate,
    },
    {
      key: "Diplomas / Short Courses",
      label: "Diplomas & Short Courses",
      description: "Diplomas, specialization certificates, and short courses",
      count: counts["Diplomas / Short Courses"],
    },
  ];
}

/** Get all unique degree types */
export function getDegreeTypes(): ProgramDegree[] {
  return [
    "BS-Lateral",
    "BS",
    "B.Ed",
    "Associate Degree",
    "MS",
    "Diploma",
    "Short Course",
    "Specialization Certificate",
    "Zero Semester",
  ];
}

/** Get programs grouped by degree type within a category */
export function getProgramsGroupedByDegree(category?: ProgramCategory): {
  degree: ProgramDegree;
  programs: Program[];
}[] {
  const filtered = category ? programs.filter((p) => p.category === category) : programs;
  const groups: Record<string, Program[]> = {};
  filtered.forEach((p) => {
    if (!groups[p.degree]) groups[p.degree] = [];
    groups[p.degree].push(p);
  });
  return Object.entries(groups).map(([degree, progs]) => ({
    degree: degree as ProgramDegree,
    programs: progs,
  }));
}

/** Generate a canonical URL for a program page */
export function getProgramUrl(slug: string): string {
  const base = process.env.BLOG_PUBLIC_BASE_URL || process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  return `${base}/programs/${slug}`;
}

export { programs as allPrograms };
export type { Program, ProgramCategory, ProgramDegree };
