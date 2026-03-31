export type TrainingCourseCategory = "Internship" | "Certification" | "Diploma" | "Train The Trainer";

export type TrainingCourse = {
  slug: string;
  title: string;
  category: TrainingCourseCategory;
  shortDescription: string;
  overview?: string;
  whoShouldJoin?: string[];
  keyModules?: string[];
  durationOptions?: string[];
  deliveryMode?: string;
  certification?: string;
  benefits?: string[];
  faqs?: Array<{ question: string; answer: string }>;
};

export const trainingCourses: TrainingCourse[] = [
  {
    slug: "counselling-rehabilitation-psychology-internship",
    title: "Counselling & Rehabilitation Psychology Internship",
    category: "Internship",
    shortDescription:
      "A structured, supervised internship to build counselling competencies and rehabilitation-aligned practical skills under RCI-licensed clinical psychologists.",
    overview:
      "The Counselling & Rehabilitation Psychology Internship at Etthos Institute of Behavioral Research and Training Pvt Ltd is a structured and supervised program designed to develop core competencies in psychological counselling, mental health documentation, and therapeutic rehabilitation. Delivered exclusively under the mentorship of RCI Licensed Clinical Psychologists, this program blends theoretical insight with hands-on practical application.",
    whoShouldJoin: [
      "Undergraduate and Postgraduate Psychology Students",
      "Rehabilitation Psychology Enthusiasts",
      "Aspiring Counsellors and Mental Health Interns",
      "Final Year Students seeking Academic Credit Internships",
    ],
    keyModules: [
      "Basics of Counselling Psychology and Therapeutic Rapport",
      "Client History Taking, Case Conceptualization, and Documentation",
      "Ethical Guidelines and Professional Conduct in Practice",
      "Introduction to Rehabilitation Models and Community-Based Mental Health",
      "Exposure to Real Case Discussions and Mock Therapy Simulations",
      "Reflective Journaling and Supervised Feedback Sessions",
    ],
    durationOptions: ["1 Month", "2 Months", "3 Months"],
    deliveryMode:
      "Online / Hybrid (Live online sessions with optional in-person observation visits for selected locations)",
    certification:
      "Hardcopy of Internship Certificate issued under the signature of RCI Licensed Clinical Psychologist with performance feedback will be delivered at your doorstep.",
    benefits: [
      "Supervised skill-building under licensed professionals",
      "Practical application aligned with current rehabilitation models",
      "Career guidance and feedback for growth in the mental health sector",
      "Certification valued across institutions, NGOs, and clinical settings",
    ],
    faqs: [
      {
        question: "Is this internship recognized for academic credit?",
        answer:
          "Yes. The certificate is recognized by most universities and institutions for internship credit upon completion.",
      },
      {
        question: "Will I get exposure to actual case studies?",
        answer:
          "Yes. You will attend structured case discussions, debriefs, and therapy simulations supervised by RCI professionals.",
      },
      {
        question: "Can I join online if I live outside major cities?",
        answer:
          "Yes. The hybrid model allows you to attend all core modules online while keeping optional physical exposure flexible.",
      },
      {
        question: "What is the difference between 1, 2, and 3-month programs?",
        answer:
          "Longer durations offer deeper clinical exposure, more assignments, and advanced feedback. Choose based on your academic requirement.",
      },
    ],
  },
  {
    slug: "clinical-neuropsychology-internship",
    title: "Clinical & Neuropsychology Internship",
    category: "Internship",
    shortDescription:
      "A comprehensive, practice-oriented internship covering psychopathology, clinical diagnostics, and introductory neuropsychological evaluation under supervision.",
    overview:
      "The Clinical & Neuropsychology Internship offered by Etthos Institute of Behavioral Research and Training Pvt Ltd provides a comprehensive, practice-oriented approach to understanding mental health disorders, clinical diagnostics, and neuropsychological evaluations. This internship is ideal for psychology students who wish to explore the clinical spectrum of psychological science with applied, supervised learning.",
    whoShouldJoin: [
      "Final Year UG and PG Psychology Students",
      "Mental Health Practitioners seeking clinical foundation",
      "Psychology Interns preparing for MPhil or PhD",
      "Students preparing for clinical licensing pathways",
    ],
    keyModules: [
      "Introduction to Psychopathology and Diagnostic Systems (DSM-5 and ICD-11)",
      "Neuropsychological Disorders and Brain-Behavior Relationships",
      "Case History Taking and Mental Status Examination (MSE)",
      "Introduction to Cognitive and Neuropsychological Assessments",
      "Report Writing, Case Presentations, and Feedback Mechanisms",
      "Clinical Ethics, Boundaries, and Therapeutic Conduct",
    ],
    durationOptions: ["6 Weeks", "8 Weeks"],
    deliveryMode:
      "Online Live Classes + Optional Clinical Case Demonstrations (Hybrid for selected participants)",
    certification:
      "Hardcopy Certificates will be issued under the supervision of RCI Licensed Clinical Psychologist with completion evaluation at your doorstep.",
    benefits: [
      "Exposure to real clinical cases and mental health conditions",
      "Learning directly from licensed clinical psychologists",
      "Introduction to neuropsychological tools and case conceptualization",
      "Adds credibility to your academic and professional portfolio",
    ],
    faqs: [
      {
        question: "Is this internship suitable for someone with no clinical exposure?",
        answer:
          "Yes. It begins with foundational clinical concepts and gradually builds into applied practice.",
      },
      {
        question: "Will I receive training in neuropsychological testing?",
        answer:
          "Yes. Introductory exposure to tools like BGT, TMT, and verbal fluency tests and more is provided.",
      },
      {
        question: "Will case presentations be included?",
        answer:
          "Yes. Each intern will attend and optionally present cases under supervision for learning.",
      },
      {
        question: "Can I use this certificate for future MPhil applications?",
        answer:
          "Yes. The certificate is valid for clinical internship requirements in most recognized institutions.",
      },
    ],
  },
  {
    slug: "industrial-organisational-psychology-internship",
    title: "Industrial & Organisational Psychology Internship",
    category: "Internship",
    shortDescription:
      "A professionally crafted internship for applied workplace psychology, performance systems, and organizational interventions led by corporate trainers and organizational psychologists.",
    overview:
      "The Industrial & Organisational Psychology Internship at Etthos Institute of Behavioral Research and Training Pvt Ltd is a professionally crafted program designed for psychology students and HR aspirants seeking practical experience in workplace psychology. Delivered by Corporate Trainers and Organizational Psychologists, this program equips you with foundational skills required to understand employee behavior, optimize organizational outcomes, and apply psychological principles at work.",
    whoShouldJoin: [
      "Undergraduate and Postgraduate Psychology Students",
      "Individuals aspiring for a career in organizational development or consulting",
      "HR Professionals and MBA Students exploring workplace psychology",
    ],
    keyModules: [
      "Introduction to Industrial and Organisational Psychology",
      "Job Analysis, Role Profiling, and Competency Mapping",
      "Employee Motivation and Workplace Stress Management",
      "Organizational Culture, Diversity, and Inclusion",
      "Basics of Psychometric Testing for Recruitment",
      "Training Needs Assessment and Performance Appraisal Models",
      "Live Projects and Case Study Discussions",
    ],
    durationOptions: ["4 Weeks", "6 Weeks", "8 Weeks"],
    deliveryMode: "Online Live Sessions with Practical Assignments and Peer Discussions",
    certification:
      "Hardcopy of Professional Internship Certificate co-signed by Certified Corporate Trainer and Licensed Psychologist",
    benefits: [
      "Learn from interdisciplinary experts in psychology and corporate training",
      "Build a foundational portfolio for HR, I O Psychology, or L&D careers",
      "Opportunity to work on live projects and industry simulations",
      "Adds applied experience to your academic or professional profile",
    ],
    faqs: [
      {
        question: "Is this internship suitable for someone with no HR background?",
        answer: "Yes. The course starts with basics and builds up to applied organizational strategies.",
      },
      {
        question: "Will I get hands-on project experience?",
        answer: "Yes. You will work on simulated organizational tasks and real case studies.",
      },
      {
        question: "Can this internship help me transition into HR or corporate roles?",
        answer:
          "Absolutely. Many of our interns use this experience to enter talent management and L&D domains.",
      },
      {
        question: "Will we cover psychometric testing in the program?",
        answer:
          "Yes. You will get exposure to psychometric screening tools used in recruitment and appraisal.",
      },
    ],
  },

  {
    slug: "professional-certification-in-psychotherapy",
    title: "Professional Certification in Psychotherapy",
    category: "Certification",
    shortDescription: "Gain structured training in psychotherapy theories, intervention strategies, and case formulation directly under the guidance of RCI Licensed Clinical Psychologists.",
    overview: "The Professional Certification in Psychotherapy by Etthos Institute of Behavioral Research and Training Pvt Ltd is a comprehensive training program designed to develop therapeutic competence in aspiring mental health professionals. With a curriculum grounded in evidence-based practices and clinical integrity, this certification empowers you to apply psychotherapy skills ethically and effectively across diverse client needs.",
    keyModules: [
        "Theoretical Foundations: Humanistic, Cognitive-Behavioral, Psychodynamic, and Integrative Approaches",
        "Applied Techniques: CBT, REBT, DBT, Mindfulness-Based Therapy, and Trauma-Informed Therapy",
        "Case Formulation, Treatment Planning, and Progress Monitoring",
        "Therapist Ethics, Boundaries, and Cultural Sensitivity",
        "Therapy Simulations and Peer Supervision",
        "Self-Reflection and Therapeutic Presence Building"
    ],
    durationOptions: ["8 Weeks", "12 Weeks (Intensive format)"],
    deliveryMode: "Live Online Training with Assignments, Reading Packs, and Recorded Feedback Sessions",
    certification: "Hardcopy of Professional Certificate issued by Etthos Institute under RCI Licensed Clinical Psychologist",
    benefits: [
        "Comprehensive coverage of major therapeutic modalities",
        "Emphasis on practical application and case formulation",
        "Supervised feedback to refine clinical skills",
        "Preparation for professional practice in diverse settings"
    ],
    faqs: [
        {
            question: "Is prior therapy experience required to join?",
            answer: "No. This certification covers both foundational and advanced content with tiered learning paths."
        },
        {
            question: "Will I receive supervision during practice?",
            answer: "Yes. Each batch includes supervised feedback sessions and Q&A with senior clinical psychologists."
        },
        {
            question: "Will I be qualified to practice after this course?",
            answer: "This course builds applied psychotherapy skills. Practice depends on your academic eligibility and local regulations."
        },
        {
            question: "Are assignments mandatory?",
            answer: "Yes. Assignments ensure integration of theory into practice and are required for certification."
        }
    ]
  },
  {
    slug: "professional-certification-in-psycho-oncology",
    title: "Professional Certification in Psycho - Oncology",
    category: "Certification",
    shortDescription: "Learn to support patients and caregivers navigating cancer and chronic illness through therapeutic techniques rooted in psycho-oncology and health psychology.",
    overview: "The Professional Certification in Psycho-Oncology offered by Etthos Institute of Behavioral Research and Training Pvt Ltd is a pioneering mental health program crafted for professionals aiming to work at the intersection of psychology and oncology care. Guided by RCI Licensed Clinical Psychologists and experts in health psychology, this course equips participants with the tools to provide psychological support to patients dealing with life-altering health conditions.",
    keyModules: [
        "Foundations of Psycho-Oncology and Psychosocial Oncology Models",
        "Psychological Impact of Diagnosis, Treatment, and Survivorship",
        "Grief, Loss, and Meaning-Making Approaches",
        "Counselling Patients, Families, and End-of-Life Caregivers",
        "Coping with Medical Trauma and Adherence Psychology",
        "Group Therapy and Mind-Body Intervention Models",
        "Multidisciplinary Collaboration and Ethical Care"
    ],
    durationOptions: ["6 Weeks", "8 Weeks"],
    deliveryMode: "Live Online with Guided Case Simulations, Reflection Logs, and Support Resources",
    certification: "Professional Certificate issued under the mentorship of RCI Licensed Clinical Psychologists",
    benefits: [
        "Train to offer psychological support in cancer care settings",
        "Build confidence in grief counselling and illness-related adjustment work",
        "Learn from case-based teaching and structured mentorship",
        "Certification enhances employability in hospitals, hospices, and wellness centers"
    ],
    faqs: [
        {
            question: "Do I need prior clinical experience to join this program?",
            answer: "No. Foundational psychological knowledge is sufficient; clinical exposure is an advantage."
        },
        {
            question: "Will we interact with real case studies?",
            answer: "Yes. Structured case narratives and clinical vignettes will be part of the training experience."
        },
        {
            question: "Will this course cover caregiver counselling?",
            answer: "Absolutely. Special emphasis is placed on family and caregiver dynamics in psycho-oncology."
        },
        {
            question: "Is this course useful for hospital-based professionals?",
            answer: "Yes. It is designed to empower hospital counsellors, nurses, and allied workers in oncology or chronic care departments."
        }
    ]
  },
  {
    slug: "certificate-programme-in-clinical-neuropsychology",
    title: "Certificate Programme in Clinical Neuropsychology",
    category: "Certification",
    shortDescription:
      "A practice-oriented certification in neuropsychological assessment, psychometrics, report writing, and rehabilitation delivered by RCI Licensed Clinical Psychologists.",
    overview:
      "The Certificate Programme in Clinical Neuropsychology is designed to equip counsellors, psychologists, social workers, educators, and allied mental health practitioners with clinically operational knowledge of neuropsychological assessment, psychometric instruments, and therapeutic modalities used in neuropsychological rehabilitation. The programme is unapologetically practical: each session moves from instrument rationale to administration, scoring, interpretation, and applied clinical decision-making.",
    whoShouldJoin: [
      "Counsellors and Psychologists seeking applied neuropsychology training",
      "Social Workers, Educators, and Allied Mental Health Practitioners",
      "Professionals who want structured training in cognitive and neuropsychological assessment",
      "Learners looking to strengthen reporting and rehabilitation-linked formulation skills",
    ],
    keyModules: [
      "Clinical Foundations and Neuroanatomical Mapping for Brain-Behaviour Understanding",
      "Intelligence and Memory Batteries including WAIS, WISC, WMS, RAVLT, RCFT, and related tools",
      "Attention, Executive Function, Visuospatial, and Language Assessment in Clinical Populations",
      "Specialised Batteries, Cognitive Screening, and Neuropsychological Report Writing",
      "Psychometrics in Neuropsychological Practice including Personality, Behavioural, and Validity Testing",
      "Clinical Syndromes and Applied Assessment for TBI, Stroke, Dementia, ADHD, Dyslexia, and ASD",
      "Therapeutic Modalities in Neuropsychological Rehabilitation including APT, GMT, Errorless Learning, CBT, ACT, DBT, MI, and MBCT",
      "Neuroimaging, Ethics, Forensics, and Professional Integration in Neuropsychology",
    ],
    durationOptions: ["4-6 Weeks", "16 Online Sessions"],
    deliveryMode:
      "Live Online + Lifetime Recorded Access with case-based, instrument-focused, applied teaching",
    certification:
      "Certificate in Clinical Neuropsychology issued on successful completion of the programme.",
    benefits: [
      "Covers over 45 named neuropsychological and psychometric tools across key clinical domains",
      "Builds competence in assessment selection, administration, scoring, interpretation, and reporting",
      "Connects assessment findings directly with rehabilitation and therapeutic planning",
      "Delivered by RCI Licensed Clinical Psychologists with active neuropsychological practice experience",
    ],
    faqs: [
      {
        question: "Is this programme focused on practical assessment work or only theory?",
        answer:
          "It is strongly practice-oriented. Sessions move step by step from tool selection and administration to scoring, interpretation, and report writing.",
      },
      {
        question: "Will therapeutic and rehabilitation modalities also be covered?",
        answer:
          "Yes. The programme includes evidence-based cognitive rehabilitation methods and adaptations of CBT, ACT, DBT, MI, and MBCT for neuropsychological populations.",
      },
      {
        question: "Who is this programme designed for?",
        answer:
          "It is designed for counsellors, psychologists, social workers, educators, and allied mental health practitioners seeking clinically relevant neuropsychology training.",
      },
      {
        question: "Does the programme include neuroimaging and forensic relevance?",
        answer:
          "Yes. The final module covers MRI, CT, PET, interdisciplinary integration, ethics, and forensic neuropsychology considerations.",
      },
    ],
  },
  {
    slug: "certificate-programme-in-psychopharmacology-for-mental-health-professionals",
    title: "Certificate Programme in Psychopharmacology for Mental Health Professionals",
    category: "Certification",
    shortDescription:
      "A clinical literacy programme for counsellors and mental health professionals to understand psychiatric medications, side effects, adherence, and collaborative care.",
    overview:
      "The Certificate Programme in Psychopharmacology for Mental Health Professionals equips non-prescribing practitioners with clinically relevant pharmacological knowledge that enhances the quality, safety, and effectiveness of their therapeutic work. This is not a prescribing course. It is a structured programme in psychopharmacology literacy, helping practitioners understand how psychiatric medications work, recognise side effects and medication emergencies, support adherence, and collaborate effectively with prescribing clinicians.",
    whoShouldJoin: [
      "Counsellors, Psychologists, Social Workers, and Mental Health Practitioners",
      "Professionals who regularly work with clients taking psychiatric medications",
      "Therapists seeking stronger collaboration skills with psychiatrists and prescribers",
      "Learners who want medication literacy without stepping outside non-prescribing scope",
    ],
    keyModules: [
      "Foundations of Psychopharmacology covering neuroscience, pharmacokinetics, pharmacodynamics, receptor pharmacology, and medication safety",
      "Drug Classes in Clinical Practice including antidepressants, antipsychotics, mood stabilisers, anxiolytics, stimulants, and addiction pharmacotherapy",
      "Clinical Applications for Counsellors across lifespan prescribing, side effects, adherence, and presentation-specific treatment understanding",
      "Ethics, Legal Issues, Emerging Topics, and Integrated Clinical Reasoning including psychedelic-assisted therapies and pharmacogenomics",
    ],
    durationOptions: ["4-6 Weeks", "16 Online Sessions"],
    deliveryMode:
      "Live Online + Lifetime Recorded Access with session quizzes and a final integration paper",
    certification:
      "Certificate in Psychopharmacology for Mental Health Professionals upon successful completion.",
    benefits: [
      "Improves confidence in discussing medication-related concerns within ethical professional boundaries",
      "Helps practitioners recognise side effects, adverse reactions, toxicity signs, and referral urgency",
      "Strengthens medication adherence support and psychoeducation skills in therapy settings",
      "Builds better interdisciplinary communication with psychiatrists and prescribing clinicians",
    ],
    faqs: [
      {
        question: "Is this a prescribing course?",
        answer:
          "No. It is a clinical literacy programme for non-prescribing mental health professionals and stays within ethical counselling scope.",
      },
      {
        question: "Will the programme cover major psychiatric drug classes in detail?",
        answer:
          "Yes. It covers antidepressants, antipsychotics, mood stabilisers, anxiolytics, ADHD medications, and medications for substance use disorders.",
      },
      {
        question: "Does it include medication adherence and collaborative care?",
        answer:
          "Yes. A full module focuses on side effects, adherence, counsellor communication, and the psychiatrist-counsellor interface.",
      },
      {
        question: "Are ethics and legal boundaries included?",
        answer:
          "Yes. The programme covers scope of practice, legal issues, emerging treatments, and client rights in the Indian mental healthcare context.",
      },
    ],
  },
  {
    slug: "professional-certification-in-research-statistical-methodology",
    title: "Professional Certification in Research & Statistical Methodology",
    category: "Certification",
    shortDescription: "Get certified in modern research methodology and statistics to boost your academic, clinical, or applied psychology career with expert training.",
    overview: "The Professional Certification in Research & Statistical Methodology offered by Etthos Institute of Behavioral Research and Training Pvt Ltd is an intensive training program that equips learners with the tools, techniques, and thinking strategies essential for conducting ethical and effective psychological research. This program is curated and delivered by experienced researchers and RCI Licensed Clinical Psychologists.",
     keyModules: [
        "Introduction to Quantitative, Qualitative, and Mixed Methods Research",
        "Hypothesis Formulation, Operational Definitions, and Variable Design",
        "Sampling Techniques and Research Designs in Psychology",
        "Statistical Concepts: Descriptive, Inferential, and Multivariate Techniques",
        "Hands-On Training in SPSS and Data Interpretation",
        "Research Ethics, Plagiarism Avoidance, and Publication Guidelines",
        "Final Project: Mini-Research Proposal or Data Analysis Presentation"
    ],
    durationOptions: ["4 Weeks", "6 Weeks (Intensive + Mentored options)"],
    deliveryMode: "Live Online Classes with Practice Worksheets, SPSS Datasets, and Submission Feedback",
    certification: "Hardcopy of Professional Certificate issued under the guidance of research mentors and clinical psychologists",
    benefits: [
        "Structured step-by-step training in research from design to analysis",
        "Skill-building in SPSS and statistical reasoning",
        "Guided mentorship and final research presentation",
        "Valuable addition to resumes, academic portfolios, and PhD applications"
    ],
    faqs: [
        {
            question: "Do I need a background in statistics to join?",
            answer: "No. Basic familiarity helps but all concepts will be introduced from foundational levels."
        },
        {
            question: "Will I learn SPSS hands-on?",
            answer: "Yes. The course includes live software demonstrations, exercises, and supervised data interpretation."
        },
        {
            question: "Can this help me prepare for PhD entrances or thesis work?",
            answer: "Definitely. Many participants use this certification to strengthen their research credentials."
        },
        {
            question: "Will I work on a project during the program?",
            answer: "Yes. Each participant will complete either a mini-proposal or dataset analysis with mentor feedback."
        }
    ]
  },
  {
    slug: "professional-certification-in-psychological-assessments",
    title: "Professional Certification in Psychometric Assessment",
    category: "Certification",
    shortDescription:
      "A procedurally specific, clinically applied certification that teaches you how to administer, score, interpret, and report psychometric assessments with confidence.",
    overview:
      "The Professional Certification in Psychometric Assessment is built around one practical principle: knowing what a test measures is not enough. You must be able to select the right instrument, administer it correctly, score it accurately, interpret the profile, and communicate findings professionally. Every session follows a hands-on sequence of instrument selection, standardised administration, step-by-step scoring, clinical profile interpretation, integration across tools, and report writing application.",
    whoShouldJoin: [
      "Psychologists and Counsellors building deeper assessment competence",
      "HR Professionals, Educators, Researchers, and Allied Practitioners",
      "Learners seeking practical training in assessment administration and report writing",
      "Professionals who want structured exposure to cognitive, personality, adaptive, and forensic tools",
    ],
    keyModules: [
        "Assessment Planning and Pre-Testing Setup including referral analysis, battery design, consent, and standardised administration rules",
        "Intelligence Testing from Administration to Interpretation using WAIS-IV, WISC-V, Raven's Matrices, BKS, and DAT",
        "Memory and Achievement Testing with WMS-IV, RAVLT, RCFT, WIAT-III, WJ-IV, and SLD-oriented assessment logic",
        "Attention and Executive Function Testing using TMT, Stroop, WCST, CPT, D-KEFS, and Bender-Gestalt II",
        "Objective Personality Assessment using MMPI-2, MMPI-2-RF, PAI, NEO-PI-3, and 16PF",
        "Projective Assessment with Rorschach R-PAS, TAT, and Sentence Completion methods",
        "Clinical and Adaptive Psychometrics including BDI-II, PHQ-9, GAD-7, BASC-3, CBCL, Conners-3, Vineland-3, and ABAS-3",
        "Validity Testing and Differential Assessment including TOMM, WMT, RDS, and cross-battery integration",
        "Career, Emotional Intelligence, Wellbeing, and Forensic Assessment tools including SDS, SII, EQ-i 2.0, PERMA, HCR-20v3, and SIRS-2",
        "Report Writing, Ethics, Test Security, and Legal Practice in Psychometric Work",
    ],
    durationOptions: ["4-6 Weeks", "16 Online Sessions"],
    deliveryMode:
      "Live Online + Recorded with procedural walkthroughs, scoring labs, and report writing workshops",
    certification:
      "Professional Certificate in Psychometric Assessment issued on successful completion.",
    benefits: [
        "Covers 60+ instruments from administration through interpretation and feedback delivery",
        "Focuses on doing the assessment work, not just learning theory about tools",
        "Builds strong competence in report writing, score integration, and professional communication",
        "Delivered by RCI Licensed Clinical Psychologists with active psychometric caseloads",
    ],
    faqs: [
        {
            question: "How is this different from a theory-heavy testing course?",
            answer:
              "This programme is procedural and practice-led. Each module walks through instrument selection, administration, scoring, interpretation, and report writing step by step."
        },
        {
            question: "Will career, emotional intelligence, and forensic tools also be covered?",
            answer:
              "Yes. The programme includes modules on career assessment, wellbeing, emotional intelligence, and selected forensic assessment frameworks."
        },
        {
            question: "Is report writing part of the programme or just an add-on topic?",
            answer:
              "Report writing is a core part of the training. The programme teaches score tables, integrated interpretation, recommendations, and structured feedback delivery."
        },
        {
            question: "Who should join this programme?",
            answer:
              "It is suitable for psychologists, counsellors, HR professionals, educators, researchers, and allied practitioners who want practical psychometric assessment training.",
        }
    ]
  },
  {
    slug: "professional-certification-in-parenting",
    title: "Professional Certification in Parenting",
    category: "Certification",
    shortDescription: "Become a certified parenting support professional and learn to help caregivers manage developmental, emotional, and behavioral concerns with confidence.",
    overview: "The Professional Certification in Parenting offered by Etthos Institute of Behavioral Research and Training Pvt Ltd is a skill-based training designed to help professionals understand parent-child dynamics and provide effective guidance using evidence-based models. Developed and delivered by RCI Licensed Clinical Psychologists, this program combines developmental psychology, behavior science, and counselling frameworks to build practitioner-level competence in parenting support.",
    keyModules: [
        "Foundations of Developmental and Parenting Psychology",
        "Positive Parenting Techniques and Behavior Modification Strategies",
        "Managing Childhood Behavioral Issues and Tantrums",
        "Emotion Coaching and Parent-Child Communication",
        "Working with Special Populations (Neurodiversity, Single Parenting, Sibling Rivalry)",
        "Family Systems and Parenting Styles: Cultural and Psychological Perspectives",
        "Case Handling, Psychoeducation, and Parental Counselling Models"
    ],
    durationOptions: ["4 Weeks", "6 Weeks", "8 Weeks"],
    deliveryMode: "Live Online Sessions with Case Studies, Skill Demonstrations, and Assignment Feedback",
    certification: "Hardcopy Issued under the guidance of RCI Licensed Clinical Psychologists with performance evaluation",
    benefits: [
        "Learn structured parenting counselling models and techniques",
        "Gain tools to assist caregivers facing behavioral and emotional challenges",
        "Build capacity for school settings, family counselling, or private consultation",
        "Certification enhances professional scope and community impact"
    ],
    faqs: [
        {
            question: "Will I learn how to counsel parents directly?",
            answer: "Yes. You will be trained in approaches to conduct parenting sessions and coach families."
        },
        {
            question: "Is this program suitable for school counsellors?",
            answer: "Absolutely. It equips you to support parents, teachers, and students as part of the school ecosystem."
        },
        {
            question: "Can this course help with issues like screen addiction or aggression in children?",
            answer: "Yes. Behavioral management techniques and child development insights are central to the training."
        },
        {
            question: "Is it necessary to have a psychology background to join?",
            answer: "A basic understanding of psychology is recommended but not mandatory for educators or NGO professionals."
        }
    ]
  },
  {
    slug: "professional-certification-in-school-counselling",
    title: "Professional Certification in School Counselling",
    category: "Certification",
    shortDescription: "Get certified in school counselling practices and develop the skills to promote student well-being, academic performance, and emotional resilience.",
    overview: "The Professional Certification in School Counselling offered by Etthos Institute of Behavioral Research and Training Pvt Ltd is a comprehensive training program for professionals looking to work in educational institutions. This program integrates developmental psychology, counselling skills, and school-based interventions to equip participants with the necessary knowledge and tools to support children and adolescents within the school ecosystem.",
    keyModules: [
        "Foundations of School Counselling and Student Psychology",
        "Emotional and Behavioral Issues in School-Age Children",
        "Counselling Skills for Classroom and Individual Interventions",
        "Academic Stress, Learning Difficulties, and Exam Anxiety",
        "Peer Relationships, Bullying, and Social Adjustment",
        "Crisis Management, Child Protection, and Reporting Protocols",
        "Parent-Teacher Collaboration and School Mental Health Policy"
    ],
    durationOptions: ["4 Weeks", "6 Weeks", "8 Weeks"],
    deliveryMode: "Live Online Training with Case Simulations, Role Plays, and Assignments",
    certification: "Hardcopy Certificate issued under the supervision of RCI Licensed Clinical Psychologists with evaluation and project submission",
    benefits: [
        "Practical counselling tools and psychoeducational frameworks for schools",
        "Certification suitable for school employment and career advancement",
        "Enhanced confidence in managing student emotional and behavioral concerns",
        "Opportunity to work in multidisciplinary school mental health teams"
    ],
    faqs: [
        {
            question: "Will classroom management and peer group issues be covered?",
            answer: "Yes. Modules include classroom behavior, bullying, social anxiety, and peer adjustment."
        },
        {
            question: "Is this suitable for teachers with no psychology background?",
            answer: "Yes. Teachers with interest in emotional development and student support are encouraged to apply."
        },
        {
             question: "Will I be trained in how to collaborate with parents and school staff?",
             answer: "Absolutely. Parent-teacher partnerships and collaborative practices are key components of the program."
        },
        {
            question: "Is it necessary to have a psychology background to join?",
            answer: "A basic understanding of psychology is recommended but not mandatory for educators or NGO professionals."
        }
    ]
  },

  {
    slug: "leadership-emotional-intelligence-train-the-trainer",
    title: "Leadership & Emotional Intelligence - Train The Trainer",
    category: "Train The Trainer",
    shortDescription:
      "A 5-week online train-the-trainer programme focused on leadership, emotional intelligence, inclusive management, and organisational impact.",
    overview:
      "The Train The Trainer Program on Leadership and Emotional Intelligence is a 5-week online programme designed for professionals who want to lead, mentor, and train others using psychologically informed leadership frameworks. The curriculum combines neuroscience of behaviour, emotional intelligence, inclusive leadership, coaching, decision-making, culture building, change leadership, and capstone implementation planning in a practical trainer-ready format.",
    whoShouldJoin: [
      "Managers, HR Professionals, Coaches, and Organisational Consultants",
      "Learning and Development professionals designing leadership interventions",
      "Corporate trainers and facilitators building EQ-led leadership programmes",
      "Professionals who want to mentor teams and drive people-centred organisational change",
    ],
    keyModules: [
      "Introduction to Leadership, Neuroscience of Behaviour, and Emotional Intelligence Foundations",
      "Self-Awareness and Emotional Regulation for Leadership Readiness",
      "Social Awareness, Empathy, and Inclusive Leadership in Organisational Contexts",
      "Motivation, Resilience, and Leading Through Uncertainty",
      "Communication, Assertiveness, and Difficult Conversations",
      "Decision-Making, Accountability, and Ethical Leadership",
      "Coaching, Delegation, and Building High-Performance Teams",
      "Organisational Culture, Psychological Safety, and DEI Leadership",
      "Strategic Influence, Stakeholder Management, and Negotiation",
      "Change Leadership, Crisis Management, and Adaptive Thinking",
      "Capstone Simulation, Assessment, and 30-60-90 Day Leadership Implementation Planning",
    ],
    durationOptions: ["5 Weeks", "Weekly Live Sessions"],
    deliveryMode:
      "Online with weekly live sessions, assessments, reflective practice, peer feedback, and capstone evaluation",
    certification:
      "Participants receive the TTT Leadership Excellence Certificate and the TTT EQ Enabler Certificate on successful completion.",
    benefits: [
      "Connects leadership development with neuroscience, emotional intelligence, and organisational behaviour",
      "Includes weekly assessments, reflective journals, peer feedback, and applied leadership exercises",
      "Provides practical tools like GROW coaching templates, culture audit worksheets, stakeholder maps, and decision audit formats",
      "Designed for trainer-readiness with capstone simulation and implementation planning",
    ],
    faqs: [
      {
        question: "Is this programme only for trainers?",
        answer:
          "No. It is suitable for trainers, managers, HR professionals, coaches, and organisational consultants who want to lead and train with stronger emotional intelligence.",
      },
      {
        question: "What makes the programme practice-oriented?",
        answer:
          "Participants work through weekly assessments, scenario-based exercises, peer feedback, capstone simulation, and a 30-60-90 day implementation plan.",
      },
      {
        question: "Does the programme cover inclusive leadership and psychological safety?",
        answer:
          "Yes. It includes empathy, DEI, microaggressions, psychological safety, stakeholder influence, and organisational culture modules.",
      },
      {
        question: "What certification is awarded after completion?",
        answer:
          "Participants receive dual certification: the TTT Leadership Excellence Certificate and the TTT EQ Enabler Certificate.",
      },
    ],
  },
  {
    slug: "posh-train-the-trainer",
    title: "POSH - Train The Trainer",
    category: "Train The Trainer",
    shortDescription: "Train under legal and psychological experts to become a certified POSH trainer and lead awareness and compliance programs across organizations.",
    overview: "The POSH – Train The Trainer Certification at Etthos Institute of Behavioral Research and Training Pvt Ltd is a legally compliant and professionally structured training program aimed at developing skilled trainers in Prevention of Sexual Harassment at the Workplace. Delivered by experienced legal experts, RCI Licensed Clinical Psychologists, and corporate facilitators, this program enables participants to design, deliver, and evaluate POSH trainings that are legally accurate and psychologically informed.",
    keyModules: [
         "Understanding the POSH Act, 2013: Legal Provisions and Compliance",
         "Components of a Zero-Tolerance Workplace Policy",
         "Gender Sensitization and Psychological Safety at Work",
         "Role of the Internal Committee (IC) and Case Redressal Procedures",
         "Designing and Delivering Awareness and Sensitization Trainings",
         "Handling Disclosures and Addressing Emotional Trauma",
         "Ethics, Confidentiality, and Trainer Conduct"
    ],
    durationOptions: ["1 Month"],
    deliveryMode: "Live Online Interactive Sessions + Roleplays + Trainer Simulations",
    certification: "Hardcopy Certificate issued jointly by Legal Professionals and RCI Licensed Psychologists",
    benefits: [
        "Legally recognized and psychologically enriched POSH trainer certification",
        "Skill-building to lead gender sensitization workshops and compliance training",
        "Real case simulation, policy analysis, and content development training",
        "Suitable for freelance, in-house, or institutional POSH trainers"
    ],
    faqs: [
        {
            question: "Will legal experts be a part of the training?",
            answer: "Yes. Licensed lawyers and consultants will conduct the legal modules."
        },
        {
            question: "Can I join if I am not from a legal or HR background?",
            answer: "Yes. The training is open to any professional interested in building capacity in workplace safety."
        },
        {
            question: "Will I be trained in how to handle disclosures during training?",
            answer: "Absolutely. Trauma-informed response and trainer conduct are essential parts of the course."
        }
    ]
  },
  {
    slug: "diversity-inclusion-train-the-trainer",
    title: "Diversity & Inclusion - Train The Trainer",
    category: "Train The Trainer",
    shortDescription: "Lead Inclusive Change – Become a Certified Diversity & Inclusion Trainer and empower workplaces with equity and belonging.",
    overview: "The Diversity & Inclusion – Train The Trainer program by Etthos Institute of Behavioral Research and Training Pvt Ltd equips participants with the theoretical frameworks and practical skills needed to lead inclusive learning and development initiatives. Rooted in psychological theory, legal compliance, and modern HR practices, the course prepares trainers to facilitate workshops and conversations on equity, access, and inclusive leadership.",
    keyModules: [
        "Understanding Diversity: Gender, Race, Disability, Sexual Orientation, and Neurodiversity",
        "Legal and Ethical Frameworks Governing Equal Opportunity and Anti-Discrimination",
        "Unconscious Bias, Privilege, and Inclusive Communication",
        "Building Inclusive Organizational Culture and Psychological Safety",
        "Designing and Delivering D&I Trainings with Sensitivity and Impact",
        "Intersectionality, Identity Awareness, and Emotional Safety in Training Spaces",
        "Case Scenarios, Workshop Simulations, and Feedback Models"
    ],
    durationOptions: ["1 Month"],
    deliveryMode: "Live Online Sessions with Group Activities, Discussions, and Trainer Evaluations",
    certification: "Hardcopy Certificate issued jointly by Licensed Psychologists, D&I Consultants, and Legal Trainers",
    benefits: [
        "Become a certified trainer capable of leading inclusive change",
        "Gain tools to address bias, improve team equity, and foster belonging",
        "Expand your training offerings into institutions, corporates, and education",
        "Build skills in legal compliance, cultural sensitivity, and intersectionality"
    ],
    faqs: [
        {
            question: "Will I learn how to conduct bias and inclusion workshops?",
            answer: "Yes. The course prepares you to design, deliver, and evaluate such workshops effectively."
        },
        {
            question: "Can I use this certification to conduct D&I training at workplaces?",
            answer: "Yes. The certification is suitable for freelance, internal, or consultancy-based D&I work."
        },
        {
            question: "Do I need prior training experience to apply?",
            answer: "No. Prior experience is helpful but not necessary. The program includes trainer orientation modules."
        },
        {
            question: "Will I learn to handle difficult conversations in diverse groups?",
            answer: "Absolutely. Roleplay and facilitation techniques are key parts of the program."
        }
    ]
  },
  {
    slug: "corporate-training-train-the-trainer",
    title: "Corporate Training - Train The Trainer",
    category: "Train The Trainer",
    shortDescription: "Gain the skills to design, deliver, and assess impactful corporate training programs backed by behavioral science.",
    overview: "The Corporate Training – Train The Trainer program by Etthos Institute of Behavioral Research and Training Pvt Ltd is a structured certification course designed to empower professionals to become dynamic facilitators in workplace learning and development. Built on modern adult learning principles, corporate behavioral psychology, and experiential learning, this program is ideal for those who want to lead training in corporate, institutional, and consulting settings.",
    keyModules: [
        "Adult Learning Principles and Behavioral Training Methodologies",
        "Instructional Design and Content Development for L&D Programs",
        "Communication Dynamics and Trainer Persona Development",
        "Training Delivery Techniques: Experiential, Visual, and Scenario-Based Learning",
        "Group Dynamics, Conflict Handling, and Trainer Adaptability",
        "Feedback, Evaluation Tools, and Post-Training Impact Assessment",
        "Corporate Ethics, Diversity Integration, and Emotional Intelligence"
    ],
    durationOptions: ["1 Week", "10 Days"],
    deliveryMode: "Live Online + Practice Labs + Trainer Presentation Assessments",
    certification: "Hardcopy Issued by Etthos Institute with Corporate Training Professionals and Licensed Psychologists as mentors",
    benefits: [
        "Master the skills to confidently deliver employee training sessions",
        "Learn corporate training design from scratch with evidence-based frameworks",
        "Build a professional trainer portfolio with evaluated sessions",
        "Certification adds value to your corporate or consulting career"
    ],
    faqs: [
        {
            question: "Will I be taught how to create and deliver my own training modules?",
            answer: "Yes. The course includes content planning, structuring, and live delivery practice."
        },
        {
            question: "Is this suitable for beginners in the training field?",
            answer: "Yes. Both beginners and professionals looking to enhance their skills are welcome."
        },
        {
            question: "Will I get individual feedback on my training delivery?",
            answer: "Absolutely. Feedback and trainer evaluation are integral parts of the program."
        },
        {
            question: "Will this help in freelance or in-house training roles?",
            answer: "Yes. The certification enables you to pursue both freelance and in-house opportunities."
        }
    ]
  },
  {
    slug: "soft-skill-training-train-the-trainer",
    title: "Soft Skill Training - Train The Trainer",
    category: "Train The Trainer",
    shortDescription: "Build your expertise in delivering transformative soft skill programs that enhance communication, emotional intelligence, and leadership.",
    overview: "Empower Personal Growth – Become a Certified Soft Skills Trainer. Build your expertise in delivering transformative soft skill programs that enhance communication, emotional intelligence, leadership, and workplace effectiveness.",
    keyModules: [
        "Effective Communication and Interpersonal Skills",
        "Emotional Intelligence and Empathy in the Workplace",
        "Leadership, Team Building, and Motivation",
        "Public Speaking and Presentation Mastery",
        "Time Management and Personal Productivity",
        "Stress Management and Resilience",
        "Conflict Resolution and Negotiation Skills"
    ],
    durationOptions: ["1 Month"],
    deliveryMode: "Live Online Interactive Sessions + Practice Demos",
    certification: "Hardcopy Certificate issued by Etthos Institute",
    benefits: [
        "Master the delivery of high-demand soft skills topics",
        "Learn to engage audiences and facilitate transformative learning",
        "Gain resources and frameworks for communication and leadership training",
        "Certification enhances credibility for corporate and educational training"
    ],
    faqs: [
        {
            question: "Will I learn how to build my own soft skills training programs?",
            answer: "Yes. You will learn instructional design and get guided practice in building modules."
        },
        {
            question: "Can this course help me enter the freelance training industry?",
            answer: "Absolutely. It provides the credibility and toolkit to begin freelance or institutional soft skills facilitation."
        },
        {
            question: "Is there any prior experience required to join this course?",
            answer: "No. This course welcomes both beginners and professionals looking to refine their delivery style."
        },
        {
            question: "Are personality development modules also covered?",
            answer: "Yes. You will learn to deliver sessions on confidence, mindset, and goal setting."
        }
    ]
  },

  {
    slug: "diploma-in-guidance-counselling",
    title: "Diploma in Guidance & Counselling",
    category: "Diploma",
    shortDescription: "Build Professional Competence in Counselling – Enroll in Our Diploma Program designed for aspiring and practicing mental health professionals.",
    overview: "The Diploma in Guidance & Counselling at Etthos Institute of Behavioral Research and Training Pvt Ltd is an intensive and structured academic program tailored for aspiring and practicing mental health professionals. This diploma integrates theory, skill-building, and practice to help learners address academic, personal, social, and emotional concerns across diverse populations.",
    durationOptions: ["6 Months", "1 year"],
    deliveryMode: "Hybrid Model – Live Online Theory + Supervised Practical Assignments",
    certification: "Hardcopy Diploma awarded upon successful completion under RCI Licensed Clinical Psychologist supervision.",
    whoShouldJoin: [
        "Psychology Graduates and Postgraduates",
        "Teachers, Educators, and School Counsellors",
        "Professionals in NGOs, CSR, or Child Welfare Settings",
        "Aspiring Counsellors seeking career transition"
    ],
    benefits: [
        "Structured diploma with career-ready counselling competencies",
        "Guidance-focused training to support children, adolescents, and young adults",
        "Practical orientation and real-life case application",
        "Recognition in school, institutional, and NGO counselling setups"
    ],
    faqs: [
        {
            question: "Will I be eligible to work as a counsellor after this diploma?",
            answer: "Yes. This program builds necessary competence and practical readiness for institutional roles."
        },
        {
            question: "Does this include career counselling training?",
            answer: "Yes. Career guidance and psychoeducational assessment modules are part of the curriculum."
        },
        {
            question: "Is this diploma valid for school jobs?",
            answer: "Yes. Many schools and educational bodies accept this diploma for counselling-related posts."
        },
        {
            question: "Will I have supervised practice during this course?",
            answer: "Yes. You will engage in practicum work under clinical psychologist guidance."
        }
    ]
  },
  {
    slug: "diploma-in-child-maternity-counselling",
    title: "Diploma in Child & Maternity Counselling",
    category: "Diploma",
    shortDescription: "Specialize in Child and Maternal Mental Health – Train in counselling techniques for supporting children and new parents.",
    overview: "The Diploma in Child & Maternity Counselling offered by Etthos Institute of Behavioral Research and Training Pvt Ltd is a specialized diploma that provides deep insights into the emotional, developmental, and psychological needs of children and mothers. This program emphasizes early interventions, emotional bonding, parenting concerns, and maternity-linked mental health challenges.",
    keyModules: [
        "Introduction to Child Development and Maternal Psychology",
        "Prenatal and Postnatal Mental Health Support",
        "Counselling for Pregnancy Anxiety, Postpartum Depression, and Birth Trauma",
        "Emotional and Behavioral Issues in Children (0 to 10 years)",
        "Parent-Child Bonding and Attachment-Based Interventions",
        "Psychoeducation for Parents and Caregivers",
        "Support in NICU, Preterm, and High-Risk Pregnancy Cases",
        "Case Handling, Family Counselling, and Ethical Practice"
    ],
    durationOptions: ["6 Months", "12 Months"],
    deliveryMode: "Hybrid Model – Live Online Theory Sessions + Practical Counselling Projects",
    certification: "Hardcopy Diploma awarded upon successful completion under the guidance of RCI Licensed Clinical Psychologists.",
    whoShouldJoin: [
        "Counsellors, Psychologists, and Educators",
        "Professionals working in hospitals, maternity homes, and child care centers",
        "Psychology Students aiming to specialize in developmental and maternal care",
        "NGO and Community Workers supporting families and mothers"
    ],
    benefits: [
        "Focused training on child and maternal mental health needs",
        "Develop skill-based approaches to support mothers and children through transitions",
        "Certification suitable for working in schools, hospitals, maternity clinics, and family counselling setups",
        "Guided mentorship and applied project work"
    ],
    faqs: [
         {
            question: "Will I be trained to work with new mothers and children together?",
            answer: "Yes. This program integrates family-based support strategies for both child and maternity care"
        },
        {
            question: "Is this diploma useful for hospital or maternity care settings?",
            answer: "Yes. It prepares professionals for emotional support roles in hospital and community care settings."
        },
        {
            question: "Will postpartum concerns be addressed in this program?",
            answer: "Absolutely. Modules on postpartum depression, anxiety, and parenting stress are included."
        },
        {
            question: "Can students of psychology apply for this diploma?",
            answer: "Yes. Undergraduate and postgraduate psychology students are welcome to apply."
        }
    ]
  },
];
