const fs = require("fs");
const path = require("path");

const DATA_FILE = path.join(__dirname, "..", "src", "lib", "programs", "data.ts");

// Read existing file
let content = fs.readFileSync(DATA_FILE, "utf8");

// Verify it ends with ];
content = content.replace(/\]\s*;?\s*$/, "");
content = content.replace(/export default programs;\s*$/, "");
content = content.trimEnd();
// Remove trailing ] if present
if (content.endsWith("]") || content.endsWith("],")) {
  content = content.replace(/\]$/, "").replace(/,$/, "").trimEnd();
}

// Remove trailing comma after last object if present
content = content.replace(/,\s*$/, "");

function P(slug, title, degree, cat, dur, desc, longDesc, metaTitle, metaDesc, keywords, headings, highlights, careers, faq, related) {
  return `  {
    slug: "${slug}",
    title: "${title}",
    degree: "${degree}",
    category: "${cat}",
    duration: "${dur}",
    description: "${desc}",
    longDescription: "${longDesc}",
    metaTitle: "${metaTitle}",
    metaDescription: "${metaDesc}",
    keywords: ${JSON.stringify(keywords)},
    seoHeadings: ${JSON.stringify(headings)},
    highlights: ${JSON.stringify(highlights)},
    careerOpportunities: ${JSON.stringify(careers)},
    faq: ${JSON.stringify(faq)},
    relatedPrograms: ${JSON.stringify(related)},
  },`;
}

const newPrograms = [];

// BS (4 Years)
const bs = [
  ["bs-bbit", "Bachelor of Business & Information Technology (BBIT)", "BS"],
  ["bs-bioinformatics", "Bioinformatics", "BS"],
  ["bs-biotechnology", "Biotechnology", "BS"],
  ["bs-business-administration", "Business Administration", "BS"],
  ["bs-commerce", "Commerce", "BS"],
  ["bs-computer-science", "Computer Science (BSCS)", "BS"],
  ["bs-data-science", "Data Science", "BS"],
  ["bs-economics", "Economics", "BS"],
  ["bs-english-applied-linguistics", "English (Applied Linguistics)", "BS"],
  ["bs-information-technology", "Information Technology (BSIT)", "BS"],
  ["bs-islamic-studies", "Islamic Studies", "BS"],
  ["bs-mass-communication", "Mass Communication", "BS"],
  ["bs-mathematics", "Mathematics", "BS"],
  ["bs-psychology", "Psychology", "BS"],
  ["bs-public-administration", "Public Administration", "BS"],
  ["bs-sociology", "Sociology", "BS"],
  ["bs-software-engineering", "Software Engineering", "BS"],
  ["bs-statistics", "Statistics", "BS"],
  ["bs-zoology", "Zoology", "BS"],
];

bs.forEach(([slug, title, deg]) => {
  newPrograms.push(P(
    slug, title, deg, "Undergraduate", "4 Years",
    `Pursue a 4-year BS in ${title.replace(/\([^)]+\)/, "").trim()} at Virtual University of Pakistan — an HEC-recognized online degree program.`,
    `The BS ${title.replace(/\([^)]+\)/, "").trim()} program at Virtual University of Pakistan is a 4-year undergraduate degree designed to provide comprehensive knowledge and practical skills. Students benefit from flexible online learning, recorded video lectures, and continuous assessment through assignments and exams.`,
    `${title} (4-Year) – Virtual University of Pakistan`,
    `Enroll in the BS ${title.replace(/\([^)]+\)/, "").trim()} program at Virtual University of Pakistan. 4-year HEC-recognized online degree. Flexible learning. Apply now for admission.`,
    [`${slug} Virtual University`, `${title} Pakistan`, `VU ${slug.replace("bs-", "")} program`, `online ${slug.replace("bs-", "")} degree`, `Pakistan online education`],
    ["Program Overview", "Curriculum & Duration", "Career Opportunities"],
    ["Comprehensive 4-year HEC-recognized curriculum", "Flexible online learning through VU's LMS", "Recorded video lectures by qualified faculty", "Affordable fee structure with multiple semesters"],
    ["Subject Matter Expert", "Analyst", "Researcher", "Educator", "Public Sector Professional"],
    [{ question: `What is the duration of the ${title} program?`, answer: `The BS ${title.replace(/\([^)]+\)/, "").trim()} program is a 4-year undergraduate degree spanning 8 semesters.` }],
    ["bs-lateral-" + slug.replace("bs-", ""), "associate-" + slug.replace("bs-", "")]
  ));
});

// B.Ed
newPrograms.push(P(
  "bed-elementary", "B.Ed. Elementary (2.5-Year)", "B.Ed", "Undergraduate", "2.5 Years",
  "Complete your B.Ed Elementary in 2.5 years at Virtual University of Pakistan — a professional teaching degree for aspiring elementary educators.",
  "The B.Ed. Elementary (2.5-Year) program at Virtual University is designed for bachelor's degree holders who wish to obtain a professional teaching qualification for elementary education. The curriculum covers teaching methodologies, child development, and classroom management.",
  "B.Ed Elementary (2.5-Year) – Virtual University of Pakistan",
  "Earn your B.Ed Elementary in 2.5 years at Virtual University of Pakistan. HEC-recognized teaching degree. Flexible online learning. Apply now.",
  ["B.Ed Elementary", "2.5 year B.Ed", "teaching degree Pakistan", "VU education", "elementary teacher training"],
  ["Overview", "Curriculum", "Career Opportunities"],
  ["2.5-year accelerated program for degree holders", "Focus on modern teaching methods and child psychology", "HEC-recognized qualification", "Flexible online format for working professionals"],
  ["Elementary School Teacher", "Curriculum Coordinator", "School Administrator", "Educational Consultant"],
  [{ question: "Who is eligible for the B.Ed Elementary program?", answer: "Candidates with a 14-year education (bachelor's degree) from an HEC-recognized institution are eligible for this 2.5-year program." }],
  ["bed-secondary", "bs-bed-elementary"]
));

newPrograms.push(P(
  "bed-secondary", "B.Ed. Secondary (1.5-Year)", "B.Ed", "Undergraduate", "1.5 Years",
  "Complete your B.Ed Secondary in 1.5 years at Virtual University of Pakistan — a professional teaching degree for aspiring secondary school educators.",
  "The B.Ed. Secondary (1.5-Year) program at Virtual University is designed for bachelor's degree holders who wish to obtain a professional teaching qualification for secondary education. The curriculum focuses on secondary teaching methods, subject specialization, and educational assessment.",
  "B.Ed Secondary (1.5-Year) – Virtual University of Pakistan",
  "Earn your B.Ed Secondary in 1.5 years at Virtual University of Pakistan. HEC-recognized teaching degree for secondary educators. Flexible online learning. Apply now.",
  ["B.Ed Secondary", "1.5 year B.Ed", "secondary teaching Pakistan", "VU teaching degree", "subject specialist training"],
  ["Overview", "Curriculum", "Career Opportunities"],
  ["1.5-year accelerated program for bachelor's degree holders", "Focus on secondary teaching methods and subject specialization", "HEC-recognized qualification", "Flexible online format"],
  ["Secondary School Teacher", "Subject Specialist", "Educational Coordinator", "Academic Counselor"],
  [{ question: "Who is eligible for the B.Ed Secondary program?", answer: "Candidates with a 14-year education (bachelor's degree) from an HEC-recognized institution are eligible for this 1.5-year program." }],
  ["bed-elementary", "bs-bed-elementary"]
));

// Associate Degrees
const associates = [
  ["associate-accounting-finance", "Accounting & Finance"],
  ["associate-biotechnology", "Biotechnology"],
  ["associate-business-analytics", "Business Analytics"],
  ["associate-commerce", "Commerce"],
  ["associate-computer-networking", "Computer Networking"],
  ["associate-computer-science", "Computer Science"],
  ["associate-data-science", "Data Science"],
  ["associate-database-management-system", "Database Management System"],
  ["associate-education", "Education"],
  ["associate-english-applied-linguistics", "English (Applied Linguistics)"],
  ["associate-human-resource-management", "Human Resource Management"],
  ["associate-islamic-banking", "Islamic Banking"],
  ["associate-mathematics", "Mathematics"],
  ["associate-operations-management", "Operations Management"],
  ["associate-psychology", "Psychology"],
  ["associate-public-administration", "Public Administration"],
  ["associate-sociology", "Sociology"],
  ["associate-statistics", "Statistics"],
  ["associate-supply-chain-management", "Supply Chain Management"],
  ["associate-web-design-development", "Web Design and Development"],
  ["associate-zoology", "Zoology"],
];

associates.forEach(([slug, title]) => {
  newPrograms.push(P(
    slug, `Associate Degree in ${title}`, "Associate Degree", "Undergraduate", "2 Years",
    `Earn your Associate Degree in ${title} at Virtual University of Pakistan — a 2-year foundational program for further studies or entry-level careers.`,
    `The Associate Degree in ${title} at Virtual University of Pakistan is a 2-year undergraduate program covering essential concepts and practical skills. Graduates can pursue BS degree completion through lateral entry or enter the workforce with recognized qualifications.`,
    `Associate Degree in ${title} – Virtual University of Pakistan`,
    `Study the Associate Degree in ${title} at Virtual University of Pakistan. 2-year program with HEC recognition. Flexible online learning. Apply now.`,
    [`associate ${title.toLowerCase()} VU`, `${title} associate degree Pakistan`, `2-year ${title.toLowerCase()} program`, `VU associate degree online`],
    ["Program Overview", "Core Subjects", "Career Pathways", "Further Education Options"],
    ["2-year HEC-recognized associate degree", "Foundation for BS lateral entry programs", "Flexible online learning format", "Affordable tuition fees"],
    ["Entry-level Professional", "Junior Analyst", "Assistant Manager", "Further Study (BS Lateral)"],
    [{ question: `Can I continue to a BS after this Associate Degree in ${title}?`, answer: `Yes, graduates can pursue a BS degree through lateral-entry programs at Virtual University, transferring their earned credits toward a 4-year bachelor's degree.` }],
    ["bs-" + slug.replace("associate-", ""), "bs-lateral-" + slug.replace("associate-", "")]
  ));
});

// MS Programs
newPrograms.push(P(
  "ms-computer-science", "MS in Computer Science", "MS", "Graduate", "2 Years",
  "Advance your computing expertise with VU's MS in Computer Science — a 2-year graduate program covering AI, data science, and software engineering.",
  "The MS in Computer Science at Virtual University of Pakistan offers advanced study in artificial intelligence, data science, software engineering, computer networks, and cybersecurity. The program combines rigorous coursework with a research thesis or project, preparing graduates for leadership roles in technology.",
  "MS Computer Science – Virtual University of Pakistan",
  "Advance your career with VU's MS in Computer Science. Study AI, data science, and software engineering. HEC-recognized graduate degree. Apply now.",
  ["MS CS Pakistan", "computer science master", "VU graduate programs", "AI master Pakistan", "data science graduate"],
  ["Program Overview", "Research Areas", "Career Outcomes", "Admission Requirements"],
  ["Advanced coursework in AI, data science, and networks", "Research thesis or project option", "HEC-recognized degree", "Flexible online learning for professionals"],
  ["AI Engineer", "Research Scientist", "Senior Software Engineer", "Data Scientist", "University Lecturer"],
  [{ question: "Is a thesis required for the MS in Computer Science?", answer: "The program offers both thesis and non-thesis options. The thesis track is recommended for students considering PhD studies, while the non-thesis track focuses on advanced coursework." }],
  ["mba", "bs-computer-science"]
));

newPrograms.push(P(
  "mba", "Master of Business Administration (Equivalent to MS)", "MS", "Graduate", "2.5 Years",
  "Transform your career with VU's MBA (Equivalent to MS) — a 2.5-year graduate program in strategic management and leadership.",
  "The MBA (Equivalent to MS) at Virtual University of Pakistan provides advanced training in strategic management, organizational behavior, financial management, marketing strategy, and business analytics. This program is classified as equivalent to an MS degree by HEC and is designed for professionals seeking leadership roles.",
  "MBA (Equivalent to MS) – Virtual University of Pakistan",
  "Transform your career with VU's MBA (Equivalent to MS). Study strategic management, finance, and marketing. HEC-recognized as MS-equivalent. Apply now.",
  ["MBA Pakistan", "MS equivalent MBA", "VU MBA program", "business administration master", "online MBA Pakistan"],
  ["Program Overview", "Core Subjects", "Career Opportunities", "Program Structure"],
  ["MS-equivalent MBA program by HEC classification", "Strategic management and leadership focus", "Designed for working professionals", "Comprehensive business education"],
  ["Chief Executive Officer", "Strategy Consultant", "Senior Manager", "Entrepreneur", "Business Development Director"],
  [{ question: "Is this MBA equivalent to an MS degree?", answer: "Yes, this program is classified as equivalent to an MS degree by the Higher Education Commission (HEC) of Pakistan." }],
  ["ms-computer-science", "bs-business-administration"]
));

// Diplomas
const diplomas = [
  ["diploma-accounting", "Accounting"],
  ["diploma-accounting-finance", "Accounting & Finance"],
  ["diploma-applied-psychology", "Applied Psychology"],
  ["diploma-banking-finance", "Banking & Finance"],
  ["diploma-bioinformatics", "Bioinformatics"],
  ["diploma-business-administration", "Business Administration"],
  ["diploma-computer-science", "Computer Science"],
  ["diploma-english-language-teaching", "English Language Teaching"],
  ["diploma-entrepreneurship-sme-management", "Entrepreneurship & SME Management"],
  ["diploma-finance", "Finance"],
  ["diploma-human-resource-management", "Human Resource Management"],
  ["diploma-information-technology", "Information Technology"],
  ["diploma-linguistics", "Linguistics"],
  ["diploma-marketing-management", "Marketing Management"],
  ["diploma-molecular-biology", "Molecular Biology"],
  ["diploma-public-administration", "Public Administration"],
  ["diploma-television-production", "Television Production"],
];

diplomas.forEach(([slug, title]) => {
  newPrograms.push(P(
    slug, `Diploma in ${title}`, "Diploma", "Diplomas / Short Courses", "1 Year",
    `Earn a 1-year Diploma in ${title} at Virtual University of Pakistan — a focused program for career advancement or skill development.`,
    `The Diploma in ${title} at Virtual University of Pakistan is a 1-year program designed to provide specialized knowledge and practical skills. Students benefit from flexible online learning and can apply completed credits toward higher qualifications.`,
    `Diploma in ${title} – Virtual University of Pakistan`,
    `Enroll in the 1-year Diploma in ${title} at Virtual University of Pakistan. Gain specialized skills through flexible online learning. Apply now.`,
    [`diploma ${title.toLowerCase()} VU`, `${title} diploma Pakistan`, `1-year ${title.toLowerCase()} program`, `VU diploma courses`],
    ["Program Overview", "Course Content", "Career Outcomes"],
    ["1-year focused diploma program", "Practical skill development", "Flexible online learning", "Credit transfer to degree programs"],
    ["Specialist", "Technician", "Junior Professional", "Entrepreneur"],
    [{ question: `Can I use this diploma toward a degree?`, answer: `Yes, credits earned in this diploma program may be transferable to relevant BS degree programs at Virtual University, subject to program policies.` }],
    ["bs-" + slug.replace("diploma-", ""), "associate-" + slug.replace("diploma-", "")]
  ));
});

// Short Courses
const shortCourses = [
  ["short-course-accounting-banking-finance", "Accounting, Banking & Finance"],
  ["short-course-computer-science-it", "Computer Science / Information Technology"],
  ["short-course-economics", "Economics"],
  ["short-course-english", "English"],
  ["short-course-humanities-distribution", "Humanities Distribution"],
  ["short-course-law", "Law"],
  ["short-course-management", "Management"],
  ["short-course-marketing", "Marketing"],
  ["short-course-mass-communication", "Mass Communication"],
  ["short-course-mathematics", "Mathematics"],
  ["short-course-physics", "Physics"],
  ["short-course-probability-statistics", "Probability & Statistics"],
  ["short-course-psychology", "Psychology"],
  ["short-course-sociology", "Sociology"],
];

shortCourses.forEach(([slug, title]) => {
  newPrograms.push(P(
    slug, title, "Short Course", "Diplomas / Short Courses", "4 Months",
    `Enroll in the ${title} short course at Virtual University of Pakistan — a 4-month program for focused learning and skill enhancement.`,
    `The ${title} short course at Virtual University of Pakistan is a 4-month (one semester) program designed for students who want to gain knowledge in a specific subject area without committing to a full degree program.`,
    `${title} – Virtual University Short Course`,
    `Enroll in the ${title} short course at Virtual University of Pakistan. 4-month online program for skill enhancement. Flexible learning. Apply now.`,
    [`${title.toLowerCase()} short course`, `VU short courses`, `4-month ${title.toLowerCase()} program`, `online short course Pakistan`],
    ["Course Overview", "Topics Covered", "Who Should Enroll"],
    ["4-month focused short course", "Flexible online delivery", "Access to VU learning resources", "Certificate upon completion"],
    ["Skill Enhancement", "Career Development", "Academic Preparation"],
    [{ question: `What is the duration of this short course?`, answer: `The ${title} short course is a 4-month (one semester) program at Virtual University of Pakistan.` }],
    ["bs-" + slug.replace("short-course-", ""), "associate-" + slug.replace("short-course-", "")]
  ));
});

// Specialization Certs
const specializations = ["Banking", "Finance", "Human Resource Management", "Management", "Marketing"];
specializations.forEach((name) => {
  const slug = "spec-" + name.toLowerCase().replace(/\s+/g, "-");
  newPrograms.push(P(
    slug, `Specialization in ${name}`, "Specialization Certificate", "Diplomas / Short Courses", "One Semester",
    `Earn a Specialization Certificate in ${name} at Virtual University of Pakistan — a one-semester focused program for career advancement.`,
    `The Specialization Certificate in ${name} at Virtual University of Pakistan is a one-semester program designed for students and professionals who want to deepen their expertise in a specific area. The program covers advanced topics and practical applications.`,
    `Specialization in ${name} – Virtual University of Pakistan`,
    `Enroll in the one-semester Specialization Certificate in ${name} at Virtual University of Pakistan. Advance your career with focused expertise. Apply now.`,
    [`${name.toLowerCase()} specialization`, `VU certificate programs`, `${name} certificate Pakistan`, `online specialization`],
    ["Program Overview", "Specialization Topics", "Career Benefits"],
    ["One-semester focused specialization", "Advanced study in a specific area", "Flexible online learning", "Enhance your professional profile"],
    ["${name} Specialist", "Senior Professional", "Industry Consultant"],
    [{ question: "What is the duration of this specialization?", answer: `The Specialization Certificate in ${name} is a one-semester program at Virtual University of Pakistan.` }],
    ["mba", "bs-business-administration"]
  ));
});

// Zero Semester
newPrograms.push(P(
  "zero-semester", "Zero Semester", "Zero Semester", "Diplomas / Short Courses", "4 Months",
  "Prepare for university-level studies with VU's Zero Semester program — a 4-month foundation program covering essential academic skills.",
  "The Zero Semester at Virtual University of Pakistan is a preparatory program designed to equip students with foundational knowledge in mathematics, English, computer skills, and study techniques before starting their bachelor's degree. It helps students build confidence and academic readiness.",
  "Zero Semester – Virtual University of Pakistan",
  "Prepare for success with VU's Zero Semester. Build foundational skills in math, English, and computing before starting your BS program. Apply now.",
  ["zero semester VU", "foundation program Pakistan", "university preparation", "VU foundation semester", "academic readiness"],
  ["Overview", "Subjects Covered", "Benefits", "Eligibility"],
  ["Build foundational skills in mathematics, English, and IT", "Smooth transition to bachelor's programs", "Affordable preparatory option", "Boosts academic confidence and readiness"],
  ["University-Ready Student", "Foundation for Any BS Degree"],
  [{ question: "Who should enroll in Zero Semester?", answer: "Students who need to strengthen their foundational knowledge in mathematics, English, and computer skills before starting a BS program. It is also recommended for those who do not meet the minimum admission criteria for direct entry." }],
  ["bs-computer-science", "bs-business-administration"]
));

// Append to file
content += ",\n" + newPrograms.join("\n") + "\n];\n\nexport default programs;\n";

fs.writeFileSync(DATA_FILE, content);
console.log(`Added ${newPrograms.length} new programs`);
console.log("Total programs:", newPrograms.length + 28);
