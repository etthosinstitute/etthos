export type ConsultingService = {
  slug: string;
  title: string;
  shortDescription: string;
  overview?: string;
  services?: string[];
  idealFor?: string[];
  deliveryMode?: string;
  faqs?: Array<{ question: string; answer: string }>;
};

export const consultingServices: ConsultingService[] = [
  {
    slug: "employees-wellness-program",
    title: "Employees Wellness Program",
    shortDescription: "Comprehensive wellness programs to enhance employee mental health, productivity, and workplace satisfaction.",
    overview: "Our Employee Wellness Programs are designed to create psychologically healthy workplaces. We address mental health, stress management, and work-life balance through structured interventions.",
    services: [
      "Mental health awareness sessions",
      "Stress management workshops",
      "Work-life balance programs",
      "Employee engagement activities",
      "Wellness policy development",
    ],
    idealFor: [
      "Corporate organizations",
      "HR departments",
      "Team leaders",
      "Employee welfare committees",
    ],
    deliveryMode: "Online / On-Site",
  },
  {
    slug: "corporate-training-program",
    title: "Corporate Training Program",
    shortDescription: "Customized corporate training modules for skill development and organizational growth.",
    overview: "Our corporate training programs are tailored to meet your organization's specific needs. We focus on leadership development, team building, and professional skills enhancement.",
    services: [
      "Leadership development programs",
      "Team building workshops",
      "Communication skills training",
      "Performance enhancement programs",
      "Change management training",
    ],
    idealFor: [
      "Corporate organizations",
      "Management teams",
      "HR professionals",
      "Training departments",
    ],
    deliveryMode: "Online / On-Site",
  },
  {
    slug: "manager-training-program",
    title: "Manager Training Program",
    shortDescription: "Specialized training for managers on people management, team leadership, and organizational psychology.",
    overview: "Equip your managers with the psychological insights and skills needed to lead effective teams. Our program covers people management, emotional intelligence, and leadership psychology.",
    services: [
      "People management skills training",
      "Conflict resolution techniques",
      "Emotional intelligence development",
      "Performance management coaching",
      "Team motivation strategies",
    ],
    idealFor: [
      "New managers",
      "Senior management",
      "Team leads",
      "Department heads",
    ],
    deliveryMode: "Online / On-Site",
  },
  {
    slug: "posh-training",
    title: "POSH Training",
    shortDescription: "Prevention of Sexual Harassment training programs compliant with legal requirements and best practices.",
    overview: "Our POSH training programs ensure legal compliance while creating a safe and respectful workplace. We train Internal Committee members and conduct organization-wide awareness sessions.",
    services: [
      "POSH Act awareness training",
      "Internal Committee training",
      "Case handling procedures",
      "Workplace safety culture development",
      "Policy development support",
    ],
    idealFor: [
      "All organizations (mandatory compliance)",
      "Internal Committee members",
      "HR professionals",
      "Leadership teams",
    ],
    deliveryMode: "Online / On-Site",
    faqs: [
      {
        question: "Is POSH training mandatory?",
        answer: "Yes, under the POSH Act 2013, organizations with 10 or more employees must conduct regular awareness programs.",
      },
    ],
  },
  {
    slug: "teacher-training-program",
    title: "Teacher Training Program",
    shortDescription: "Professional development programs for educators on student psychology and classroom management.",
    overview: "Our teacher training programs equip educators with psychological insights to better understand and support students. We cover child development, classroom behavior management, and learning difficulties.",
    services: [
      "Child and adolescent psychology training",
      "Classroom behavior management",
      "Learning difficulties awareness",
      "Teacher wellness and burnout prevention",
      "Parent-teacher communication skills",
    ],
    idealFor: [
      "School teachers",
      "College faculty",
      "Special educators",
      "Educational administrators",
    ],
    deliveryMode: "Online / On-Site",
  },
  {
    slug: "business-consultations",
    title: "Business Consultations",
    shortDescription: "Strategic consulting services applying behavioral science to business challenges and growth.",
    overview: "We apply psychological principles to solve business challenges. Our consultants help organizations optimize culture, improve employee engagement, and drive sustainable growth.",
    services: [
      "Organizational behavior analysis",
      "Change management consulting",
      "Culture transformation programs",
      "Strategic HR consulting",
      "Employee engagement optimization",
    ],
    idealFor: [
      "Business leaders",
      "Startup founders",
      "HR directors",
      "Organizational development teams",
    ],
    deliveryMode: "Online / On-Site",
  },
  {
    slug: "product-consultation",
    title: "Product Consultation",
    shortDescription: "Behavioral insights for product development, UX research, and consumer psychology.",
    overview: "Leverage behavioral science to build better products. We provide psychological insights for product design, user experience research, and consumer behavior understanding.",
    services: [
      "User experience research",
      "Consumer behavior analysis",
      "Product psychology insights",
      "Behavioral design principles",
      "Usability testing support",
    ],
    idealFor: [
      "Product managers",
      "UX/UI teams",
      "Startup founders",
      "Marketing teams",
    ],
    deliveryMode: "Online",
  },
  {
    slug: "market-research-support",
    title: "Market Research Support",
    shortDescription: "Psychology-based market research including consumer behavior studies and brand perception analysis.",
    overview: "Our market research services combine psychological methodology with business insights. We help you understand your customers, test concepts, and optimize brand positioning.",
    services: [
      "Consumer psychology research",
      "Brand perception studies",
      "Market behavior analysis",
      "Qualitative research support",
      "Focus group facilitation",
    ],
    idealFor: [
      "Marketing teams",
      "Brand managers",
      "Market research agencies",
      "Business strategists",
    ],
    deliveryMode: "Online / On-Site",
  },
  {
    slug: "career-counselling",
    title: "Career Counselling",
    shortDescription: "Professional career guidance and counselling services for students and professionals.",
    overview: "Our career counselling services help individuals make informed career decisions. We use assessments, counselling, and guidance to support career exploration and development.",
    services: [
      "Career aptitude assessment",
      "Career path planning",
      "Interview preparation coaching",
      "Professional development guidance",
      "Career transition support",
    ],
    idealFor: [
      "Students choosing career paths",
      "Professionals considering career change",
      "Fresh graduates",
      "Working professionals seeking growth",
    ],
    deliveryMode: "Online / In-Person",
    faqs: [
      {
        question: "What age groups do you work with?",
        answer: "We provide career counselling for students from Class 9 onwards, as well as working professionals at any stage of their career.",
      },
    ],
  },
];
