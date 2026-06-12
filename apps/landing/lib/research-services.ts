export type ResearchService = {
  slug: string;
  title: string;
  shortDescription: string;
  overview?: string;
  services?: string[];
  idealFor?: string[];
  deliveryMode?: string;
  faqs?: Array<{ question: string; answer: string }>;
};

export const researchServices: ResearchService[] = [
  {
    slug: "community-research",
    title: "Community Research",
    shortDescription:
      "Applied research projects focused on community psychology, social behavior, and public mental health initiatives.",
    overview:
      "Our community research initiatives focus on understanding and improving mental health outcomes at the population level. We conduct studies on social behavior, community wellness, and public health psychology.",
    services: [
      "Community mental health surveys and needs assessment",
      "Social behavior analysis and intervention studies",
      "Public health psychology research projects",
      "Impact assessment and program evaluation",
      "Community-based participatory research",
    ],
    idealFor: [
      "NGOs and community organizations",
      "Government health departments",
      "Academic researchers",
      "Public health professionals",
    ],
  },
  {
    slug: "health-based-research",
    title: "Health Based Research",
    shortDescription:
      "Research in health psychology, psychosomatic conditions, and behavioral medicine.",
    overview:
      "Health-based research at Etthos explores the intersection of psychological processes and physical health. We investigate psychosomatic conditions, health behaviors, and mind-body interventions.",
    services: [
      "Psychosomatic research studies",
      "Health behavior modification research",
      "Chronic illness psychology studies",
      "Mind-body intervention effectiveness studies",
      "Patient outcomes research",
    ],
    idealFor: [
      "Healthcare institutions",
      "Pharmaceutical companies",
      "Medical colleges",
      "Health policy makers",
    ],
  },
  {
    slug: "research-support",
    title: "Research Support",
    shortDescription:
      "Comprehensive support for researchers including methodology guidance, data collection, and analysis.",
    overview:
      "We provide end-to-end research support for students, academics, and institutions. From research design to data analysis, our experts guide you through every step of the research process.",
    services: [
      "Research design consultation",
      "Methodology guidance and refinement",
      "Data collection support and supervision",
      "Literature review assistance",
      "Research proposal development",
    ],
    idealFor: [
      "PhD and MPhil scholars",
      "Academic researchers",
      "Institutional research teams",
      "Independent researchers",
    ],
    faqs: [
      {
        question: "Can you help with ongoing research projects?",
        answer:
          "Yes, we can provide support at any stage of your research project, from conceptualization to publication.",
      },
    ],
  },
  {
    slug: "statistical-support",
    title: "Statistical Support",
    shortDescription:
      "Expert statistical analysis services including SPSS, data interpretation, and report writing.",
    overview:
      "Our statistical support services help researchers make sense of their data. We offer hands-on training in statistical software and provide analysis services for research projects.",
    services: [
      "SPSS and statistical software training",
      "Data analysis and interpretation services",
      "Statistical report writing",
      "Quantitative and qualitative analysis",
      "Advanced multivariate analysis",
    ],
    idealFor: [
      "Research scholars needing statistical guidance",
      "Academic institutions",
      "Corporate research teams",
      "Independent researchers",
    ],
    faqs: [
      {
        question: "Which statistical software do you support?",
        answer:
          "We primarily work with SPSS, but also support R, STATA, and other statistical packages.",
      },
    ],
  },
  {
    slug: "guide-and-synopsis-support",
    title: "Guide and Synopsis Support",
    shortDescription:
      "Academic mentorship for dissertation, thesis, and research proposal development.",
    overview:
      "We provide expert mentorship for developing research proposals, thesis synopses, and dissertations. Our guidance ensures your academic work meets the highest standards.",
    services: [
      "Thesis and dissertation guidance",
      "Synopsis development and refinement",
      "Research proposal writing support",
      "Academic mentorship programs",
      "Publication guidance",
    ],
    idealFor: [
      "PhD and MPhil students",
      "Postgraduate researchers",
      "Faculty members",
      "Early career researchers",
    ],
  },
  {
    slug: "research-journal",
    title: "Research Journal",
    shortDescription:
      "Platform for publishing peer-reviewed research in psychology and behavioral sciences.",
    overview:
      "Etthos publishes a peer-reviewed journal dedicated to advancing psychological science. We provide a platform for researchers to share their findings with the academic community.",
    services: [
      "Peer-reviewed publication opportunities",
      "Journal submission support",
      "Academic visibility and indexing",
      "Research dissemination services",
      "Open access publishing options",
    ],
    idealFor: [
      "Researchers seeking publication",
      "Academic institutions",
      "PhD scholars",
      "Research teams",
    ],
  },
  {
    slug: "research-conferences",
    title: "Research Conferences",
    shortDescription:
      "National and international conferences for knowledge sharing and academic networking.",
    overview:
      "We organize and host research conferences that bring together psychologists, researchers, and academics from around the world to share knowledge and foster collaboration.",
    services: [
      "Paper presentation opportunities",
      "Academic networking events",
      "Knowledge exchange sessions",
      "Research collaboration facilitation",
      "Workshop and training sessions",
    ],
    idealFor: [
      "Researchers and academics",
      "Students seeking presentation experience",
      "Institutions looking to showcase research",
      "Professionals seeking continuing education",
    ],
  },
];
