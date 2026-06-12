export type CounsellingService = {
  slug: string;
  title: string;
  shortDescription: string;
  overview?: string;
  services?: string[];
  idealFor?: string[];
  deliveryMode?: string;
  faqs?: Array<{ question: string; answer: string }>;
};

export const counsellingServices: CounsellingService[] = [
  {
    slug: "on-call-text-in-person",
    title: "On Call / Text / In-Person",
    shortDescription:
      "Flexible counselling options including phone calls, text-based support, and face-to-face sessions with licensed psychologists.",
    overview:
      "In today's fast-paced world, accessibility is crucial. Our On-Call, Text-Based, and In-Person Counselling Services offer you the freedom to connect with licensed clinical psychologists in a mode that best suits your lifestyle and emotional comfort.",
    services: [
      "Real-time emotional support over phone or secure text messaging",
      "Pre-scheduled video or audio calls with clinical psychologists",
      "In-person sessions at our institute for in-depth therapy and assessments",
      "Confidential and secure communication channels",
      "24/7 crisis support availability",
    ],
    idealFor: [
      "Individuals seeking immediate psychological first-aid",
      "Ongoing therapy support for anxiety, depression, or stress",
      "Flexible therapy sessions for working professionals or students",
      "People preferring privacy and discretion",
    ],
    deliveryMode: "Online / Phone / In-Person",
    faqs: [
      {
        question: "How do I book a session?",
        answer:
          "You can book via WhatsApp, phone call, or through our website. Choose your preferred mode (Call, Text, In-Person), select a time slot and psychologist, and confirm your booking.",
      },
      {
        question: "Are the sessions confidential?",
        answer:
          "Absolutely. All our communications are confidential and comply with professional ethics and data protection standards.",
      },
      {
        question: "What if I need urgent support?",
        answer:
          "We offer crisis support services. Contact our helpline immediately for urgent psychological assistance.",
      },
    ],
  },
  {
    slug: "health-based-counselling",
    title: "Health Based Counselling",
    shortDescription:
      "Specialized psychological support for individuals dealing with chronic illness, medical conditions, and health-related anxiety.",
    overview:
      "Health-based counselling addresses the psychological impact of medical conditions, chronic illness, and health-related concerns. Our psychologists work closely with individuals to manage stress, anxiety, and emotional challenges associated with health issues.",
    services: [
      "Chronic illness coping strategies and psychological support",
      "Medical anxiety and phobia management",
      "Psychosomatic symptom support and treatment",
      "Health behavior modification counselling",
      "Pre and post-surgical psychological support",
      "Caregiver support and guidance",
    ],
    idealFor: [
      "Patients with chronic conditions like diabetes, heart disease, or cancer",
      "Individuals facing medical procedures or surgeries",
      "Family members and caregivers of patients",
      "Healthcare workers seeking support",
      "People dealing with health-related anxiety",
    ],
    deliveryMode: "Online / In-Person",
    faqs: [
      {
        question: "Do you work with hospitals?",
        answer:
          "Yes, we collaborate with healthcare institutions to provide integrated psychological care for patients.",
      },
      {
        question: "Can you help with medical phobias?",
        answer:
          "Yes, our psychologists are trained in evidence-based approaches to treat medical phobias and health anxiety.",
      },
    ],
  },
  {
    slug: "corporate-counselling-plan",
    title: "Corporate Counselling Plan",
    shortDescription:
      "Comprehensive employee assistance programs and workplace mental health solutions for organizations.",
    overview:
      "Our corporate counselling plans provide organizations with structured mental health support for their workforce. From individual employee counselling to team interventions, we help create psychologically healthy workplaces.",
    services: [
      "Employee Assistance Program (EAP) implementation",
      "Confidential one-on-one counselling sessions",
      "Critical incident stress debriefing",
      "Workplace conflict resolution services",
      "Mental health awareness workshops",
      "Manager and leadership coaching",
    ],
    idealFor: [
      "Corporate organizations of all sizes",
      "HR departments seeking employee wellness solutions",
      "Team leaders and managers",
      "Employees at all levels needing support",
      "Organizations facing high stress environments",
    ],
    deliveryMode: "Online / On-Site",
    faqs: [
      {
        question: "How is employee confidentiality maintained?",
        answer:
          "All counselling sessions are strictly confidential. Organizations receive only aggregate reports without identifying individual employees.",
      },
      {
        question: "Can you customize the program for our company?",
        answer:
          "Absolutely. We design tailored programs based on your organization's size, industry, and specific needs.",
      },
    ],
  },
  {
    slug: "psychological-assessments",
    title: "Psychological Assessments",
    shortDescription:
      "Comprehensive psychological testing and assessment services for diagnostic, academic, and occupational purposes.",
    overview:
      "Our psychological assessment services provide thorough evaluations using standardized tools administered by RCI Licensed Clinical Psychologists. Assessments cover cognitive, emotional, personality, and behavioral domains.",
    services: [
      "Intelligence and cognitive assessments (WISC, WAIS, Bhatia Battery)",
      "Personality evaluations (MMPI, 16PF, NEO-PI-R)",
      "Emotional and behavioral screening (DASS-21, BASC, CBCL)",
      "Neuropsychological screening tools",
      "Career aptitude and interest testing",
      "Detailed assessment reports with recommendations",
    ],
    idealFor: [
      "Individuals seeking self-understanding",
      "Parents concerned about child development",
      "Organizations for recruitment and selection",
      "Students for career guidance",
      "Clinical diagnosis and treatment planning",
    ],
    deliveryMode: "Online / In-Person",
    faqs: [
      {
        question: "How long does a psychological assessment take?",
        answer:
          "Depending on the type, assessments may range from 90 minutes to 3 hours including the feedback session.",
      },
      {
        question: "Can this be used for school or clinical diagnosis?",
        answer:
          "Yes, we provide official reports usable for academic support, psychiatric diagnosis, or therapy planning.",
      },
      {
        question: "Are these tools standardized?",
        answer:
          "Absolutely. We only use internationally and nationally standardized tools with established reliability and validity.",
      },
    ],
  },
];
