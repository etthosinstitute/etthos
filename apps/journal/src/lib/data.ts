// ============================================================================
// Etthos Journal of Psychology — Static Data
// ============================================================================

export interface EditorialBoardMemberData {
  id: string;
  name: string;
  title: string; // Dr., Prof., etc.
  role: "Editor-in-Chief" | "Associate Editor" | "Editorial Board Member" | "Reviewer";
  designation: string;
  department: string;
  institution: string;
  email: string;
  country: string;
  image: string | null; // path in /public/editorial-board/
  orcid?: string;
  expertise: string[];
  biography: string;
  displayOrder: number;
}

export interface ArticleData {
  id: string;
  slug: string;
  title: string;
  authors: {
    name: string;
    affiliation: string;
    country: string;
    isCorresponding?: boolean;
  }[];
  abstract: string;
  keywords: string[];
  date: string;
  publishedDate: string; // ISO
  type: string;
  volume: number;
  issue: number;
  doi: string;
  pdfUrl?: string;
  pageStart?: number;
  pageEnd?: number;
  references?: { text: string; doi?: string }[];
}

export interface IssueData {
  slug: string;
  volume: number;
  issue: number;
  title?: string;
  month: string;
  year: number;
  published: boolean;
  publishedDate?: string;
  articleCount: number;
}

// ============================================================================
// JOURNAL INFO
// ============================================================================

export const journalInfo = {
  name: "Etthos Journal of Psychology",
  shortName: "EJP",
  publisher: "Etthos",
  issn: "XXXX-XXXX", // Pending from ISSN National Centre India
  frequency: "Quarterly",
  language: "English",
  country: "India",
  subjectArea: "Psychology & Behavioural Sciences",
  websiteUrl: "https://journal.etthos.com",
  mainWebsiteUrl: "https://etthos.com",
  contactEmail: "journal@etthos.com",
  infoEmail: "info@etthos.com",
  phone: "+91 72610 28965",
  registeredOffice: {
    label: "Registered Office",
    address: "A/107, Sardar Patel Nagar, Mahuli, Patna, Bihar, 804453, India",
  },
  corporateOffice: {
    label: "Corporate Office",
    address: "D - Mohan Garden, Dwarka Mor, Uttam Nagar, New Delhi, 110059, India",
  },
  established: 2025,
  license: "CC BY 4.0",
  reviewModel: "Double-Blind Peer Review",
  accessPolicy: "Open Access",
};

// ============================================================================
// EDITORIAL BOARD (11 Real Members — ISSN Compliant)
// ============================================================================

export const editorialBoard: EditorialBoardMemberData[] = [
  {
    id: "priyanka-verma",
    name: "Dr. Priyanka Verma",
    title: "Dr.",
    role: "Editor-in-Chief",
    designation: "Head of Institution & Associate Professor",
    department: "Amity Institute of Behavioural and Allied Sciences (AIBAS)",
    institution: "Amity University Haryana",
    email: "priyanka@ggn.amity.edu",
    country: "India",
    image: "/editorial-board/dr_priyanka.jpeg",
    expertise: ["Counselling Psychology", "Positive Psychology", "Psychometric Testing", "Organisational Behaviour", "Mental Health"],
    biography: "Dr. Priyanka Verma heads the Amity Institute of Behavioural and Allied Sciences (AIBAS) at Amity University Haryana. She established a Centre of Excellence for Psychometric Testing and holds three design patents in mental health innovation, including a VR Device for Mental Health Diagnostics.",
    displayOrder: 1,
  },
  {
    id: "pcs-devara",
    name: "Prof. (Dr.) Panuganti C.S. Devara",
    title: "Prof. (Dr.)",
    role: "Editorial Board Member",
    designation: "Director, Professor & Head — ACOAST, ACESH & ACAPC",
    department: "Centres of Excellence in Ocean-Atmospheric Science and Technology",
    institution: "Amity University Haryana, Gurugram",
    email: "pcsdevara@ggn.amity.edu",
    country: "India",
    image: "/editorial-board/prof-devara.jpeg",
    orcid: "0000-0002-2852-2017",
    expertise: ["Atmospheric Science", "Remote Sensing", "Climate & Weather", "Air Pollution Control", "Ocean Science"],
    biography: "Prof. Devara is an internationally recognised authority in atmospheric and environmental sciences with over four decades of sustained scientific contribution. A Fellow of the Royal Meteorological Society (UK) and Expert Reviewer for IPCC, he has authored over 585 research papers and supervised 12 doctoral scholars.",
    displayOrder: 2,
  },
  {
    id: "anu-gauba",
    name: "Dr. Anu Gauba",
    title: "Dr.",
    role: "Editorial Board Member",
    designation: "Founder Principal, Department of Nursing",
    department: "Department of Nursing",
    institution: "GD Goenka University, Gurgaon, Haryana",
    email: "anu.gauba@gdgoenka.ac.in",
    country: "India",
    image: "/editorial-board/dr_annu.jpeg",
    expertise: ["Nursing Education", "Public Health", "Community Medicine", "Health Training & Policy", "Research"],
    biography: "Dr. Anu Gauba is a distinguished nursing educator and public health advocate with over two decades of experience. She holds the Chancellor's Gold Medal for Best PhD Thesis from the National Institute of Medical Sciences University, Jaipur, and has authored multiple academic publications including a monograph by Lambert Publications (UK).",
    displayOrder: 3,
  },
  {
    id: "luxita-sharma",
    name: "Dr. Luxita Sharma",
    title: "Dr.",
    role: "Editorial Board Member",
    designation: "Associate Professor & Officiating Director, Amity Medical School; Head, Department of Dietetics and Applied Nutrition",
    department: "Department of Dietetics and Applied Nutrition",
    institution: "Amity University Haryana",
    email: "lsharma@ggn.amity.edu",
    country: "India",
    image: "/editorial-board/dr_luxita.jpeg",
    expertise: ["Clinical Nutrition", "Functional Foods", "Food Product Development", "Obesity & Metabolic Health", "Psycho-Nutrition"],
    biography: "Dr. Luxita Sharma is one of India's most prolific scholars in nutritional sciences with over two decades of experience. She has authored 18 books published by Wiley, CRC Press, and Springer, contributed over 118 research papers, and holds 10 patents. Her h-index of 9 reflects the sustained reach of her scholarly contributions.",
    displayOrder: 4,
  },
  {
    id: "pooja-rana",
    name: "Dr. Pooja Rana",
    title: "Dr.",
    role: "Editorial Board Member",
    designation: "Professor & Head, PhD Programme",
    department: "Media & Communication",
    institution: "Amity University Haryana",
    email: "prana@ggn.amity.edu",
    country: "India",
    image: "/editorial-board/Dr_pooja_rana.jpeg",
    expertise: ["Media & Communication", "Digital Media Governance", "Journalism Studies", "Communication Policy", "Media Management"],
    biography: "Dr. Pooja Rana is a Professor and PhD Programme Head at Amity University Haryana with over two decades of distinguished experience. An award-winning scholar, she has authored several academic books on journalism and media studies widely referenced in higher education curricula across India.",
    displayOrder: 5,
  },
  {
    id: "vikas-sharma",
    name: "Dr. Vikas Sharma",
    title: "Dr.",
    role: "Editorial Board Member",
    designation: "Associate Professor & Head, Department of Clinical Psychology",
    department: "Department of Clinical Psychology, Faculty of Behavioural Sciences",
    institution: "SGT University, Gurugram",
    email: "vikas.sharma@sgtuniversity.org",
    country: "India",
    image: null,
    expertise: ["Clinical Psychology", "Cognitive Behaviour Therapy", "Behavioural Medicine", "Sleep Research", "Psychological Assessment"],
    biography: "Dr. Vikas Sharma holds an M.Phil. in Clinical Psychology from IHBAS, New Delhi and a Doctorate from the University of Delhi. He has published over 50 research papers and is a member of the Indian Association of Clinical Psychologists (IACP) and the Indian Society of Sleep Research.",
    displayOrder: 6,
  },
  {
    id: "sanjay-jha",
    name: "Prof. Sanjay K. Jha",
    title: "Prof.",
    role: "Editorial Board Member",
    designation: "Director of Liberal Arts; Professor of Linguistics; Head, Amity Centre for Sanskrit and Indic Studies",
    department: "Liberal Arts & Linguistics",
    institution: "Amity University Haryana",
    email: "skjha@ggn.amity.edu",
    country: "India",
    image: "/editorial-board/dr_sanjay.jpeg",
    expertise: ["Applied Linguistics", "Sanskrit & Indic Studies", "Computational Linguistics", "Indian Knowledge Systems", "Machine Translation"],
    biography: "Prof. Sanjay K. Jha is a scholar of exceptional intellectual range — a linguist, polyglot, and institution builder. Proficient in 10 Indian and 5 foreign languages, he has published over 200 research papers, 9 books, and is Chief Editor of four international journals. He is the recipient of 23 prestigious awards.",
    displayOrder: 7,
  },
  {
    id: "neha-mishra",
    name: "Dr. Neha Mishra",
    title: "Dr.",
    role: "Editorial Board Member",
    designation: "Assistant Professor of Law",
    department: "Department of Law",
    institution: "Amity University, Gurugram",
    email: "neha.mishra@amity.edu",
    country: "India",
    image: "/editorial-board/dr_neha.jpeg",
    expertise: ["Criminal Law", "Public Interest Litigation", "Judicial Activism", "Comparative Law", "Legal Scholarship"],
    biography: "Dr. Neha Mishra, LL.M., NET, Ph.D., is a legal scholar with over 12 years of professional experience, including 9 years of dedicated academic service. She specialises in Criminal Law with a focused research agenda encompassing public interest litigation and judicial activism.",
    displayOrder: 8,
  },
  {
    id: "akshay-ohlan",
    name: "Dr. Akshay Ohlan",
    title: "Dr.",
    role: "Editorial Board Member",
    designation: "Assistant Professor of Psychology",
    department: "Department of Psychology",
    institution: "Amity University Haryana",
    email: "aohlan@ggn.amity.edu",
    country: "India",
    image: "/editorial-board/dr-akshay.jpeg",
    expertise: ["Positive Psychology", "Neuropsychology", "Suicide Prevention", "Mental Health", "Biopsychology"],
    biography: "Dr. Akshay Ohlan holds a PhD in Psychology from Guru Jambheshwar University and is a five-time UGC-NET qualified academician. His research spans positive psychology, neuropsychology, and suicide prevention. His publications appear in Scopus- and UGC-CARE-indexed journals.",
    displayOrder: 9,
  },
  {
    id: "alka-pandey",
    name: "Dr. Alka Pandey",
    title: "Dr.",
    role: "Editorial Board Member",
    designation: "Assistant Professor, Department of Psychology",
    department: "Department of Psychology, School of Liberal Education",
    institution: "Galgotias University, Greater Noida",
    email: "alka.pandey@galgotiasuniversity.edu.in",
    country: "India",
    image: "/editorial-board/dr-alka-pandey.png",
    expertise: ["Child Guidance & Counselling", "Clinical Psychology", "Human Development", "Mental Health", "Life Skills Training"],
    biography: "Dr. Alka Pandey holds a PhD in Child Guidance and Family Counselling and a Post-Doctoral Fellowship from G.B. Pant University. She is a recipient of the ICAR-Junior Research Fellowship at All India 1st Rank, UGC-NET, and the Young Scientist Award. She has over 40 publications in Scopus-indexed journals.",
    displayOrder: 10,
  },
  {
    id: "ashwarya-raj-laxmi",
    name: "Dr. Ashwarya Raj Laxmi",
    title: "Dr.",
    role: "Editorial Board Member",
    designation: "Research Medical Officer & Ayurvedic Physician; MS Scholar, Prasuti Tantra evum Stree Roga",
    department: "Ayurvedic Medicine & Integrative Women's Healthcare",
    institution: "Independent Practitioner",
    email: "ashwarya.rajlaxmi@gmail.com",
    country: "India",
    image: "/editorial-board/dr_aishwarya.jpeg",
    expertise: ["Ayurvedic Medicine", "Women's Health", "Clinical Obstetrics", "Integrative Healthcare", "Nutritional Counselling"],
    biography: "Dr. Ashwarya Raj Laxmi is a qualified Ayurvedic physician and clinical researcher specialising in Prasuti Tantra evum Stree Roga (Obstetrics & Gynaecology). Her practice integrates classical Shastraic knowledge with contemporary clinical protocols for women's healthcare.",
    displayOrder: 11,
  },
];

// ============================================================================
// PSYCHOLOGY-SPECIFIC SAMPLE ARTICLES
// ============================================================================

export const articles: ArticleData[] = [
  {
    id: "1",
    slug: "cognitive-behavioural-therapy-efficacy-anxiety-disorders-indian-university-students",
    title: "Cognitive Behavioural Therapy Efficacy in Anxiety Disorders Among Indian University Students: A Randomised Controlled Trial",
    authors: [
      { name: "Dr. Vikas Sharma", affiliation: "SGT University, Gurugram", country: "India", isCorresponding: true },
      { name: "Dr. Priyanka Verma", affiliation: "Amity University Haryana", country: "India" },
    ],
    abstract: "This randomised controlled trial investigates the efficacy of Cognitive Behavioural Therapy (CBT) in reducing symptoms of generalised anxiety disorder among undergraduate students across three Indian universities. A sample of 120 participants (aged 18–24) was randomly allocated to either a 12-session CBT intervention group or a wait-list control group. Anxiety symptoms were assessed using the Generalised Anxiety Disorder 7-item Scale (GAD-7) and the Beck Anxiety Inventory (BAI) at baseline, post-intervention, and three-month follow-up. Results indicated a statistically significant reduction in anxiety symptoms in the CBT group compared to controls (p < .001, Cohen's d = 0.82). The therapeutic gains were maintained at follow-up. These findings support the applicability of structured CBT protocols in Indian higher education contexts and highlight the need for accessible mental health interventions on university campuses.",
    keywords: ["Cognitive Behavioural Therapy", "Anxiety Disorders", "Indian University Students", "Randomised Controlled Trial", "Mental Health"],
    date: "March 2025",
    publishedDate: "2025-03-15",
    type: "Research Article",
    volume: 1,
    issue: 1,
    doi: "10.XXXXX/ejp.v1i1.001",
    pageStart: 1,
    pageEnd: 18,
    references: [
      { text: "Beck, A. T., & Steer, R. A. (1990). Manual for the Beck Anxiety Inventory. San Antonio, TX: Psychological Corporation." },
      { text: "Spitzer, R. L., Kroenke, K., Williams, J. B. W., & Löwe, B. (2006). A brief measure for assessing generalised anxiety disorder: The GAD-7. Archives of Internal Medicine, 166(10), 1092–1097.", doi: "10.1001/archinte.166.10.1092" },
      { text: "Hofmann, S. G., Asnaani, A., Vonk, I. J. J., Sawyer, A. T., & Fang, A. (2012). The efficacy of cognitive behavioral therapy: A review of meta-analyses. Cognitive Therapy and Research, 36(5), 427–440.", doi: "10.1007/s10608-012-9476-1" },
    ],
  },
  {
    id: "2",
    slug: "mindfulness-based-stress-reduction-burnout-healthcare-professionals",
    title: "Mindfulness-Based Stress Reduction and Burnout Among Healthcare Professionals: A Systematic Review and Meta-Analysis",
    authors: [
      { name: "Dr. Akshay Ohlan", affiliation: "Amity University Haryana", country: "India", isCorresponding: true },
      { name: "Dr. Anu Gauba", affiliation: "GD Goenka University, Gurgaon", country: "India" },
    ],
    abstract: "Burnout among healthcare professionals constitutes a significant occupational health concern with implications for patient care quality and workforce retention. This systematic review and meta-analysis synthesises evidence from 34 peer-reviewed studies (N = 2,847) examining the impact of Mindfulness-Based Stress Reduction (MBSR) programmes on burnout dimensions — emotional exhaustion, depersonalisation, and reduced personal accomplishment — as measured by the Maslach Burnout Inventory (MBI). Results indicate that MBSR interventions significantly reduce emotional exhaustion (pooled SMD = −0.67, 95% CI [−0.83, −0.51]) and depersonalisation (pooled SMD = −0.42, 95% CI [−0.58, −0.26]), with moderate improvements in personal accomplishment (pooled SMD = 0.35, 95% CI [0.19, 0.51]). Subgroup analyses revealed that programme duration of eight weeks or longer yielded the strongest effects. These findings have important implications for healthcare organisations seeking evidence-based wellness interventions.",
    keywords: ["Mindfulness", "Burnout", "Healthcare Professionals", "MBSR", "Systematic Review", "Meta-Analysis"],
    date: "March 2025",
    publishedDate: "2025-03-15",
    type: "Review Article",
    volume: 1,
    issue: 1,
    doi: "10.XXXXX/ejp.v1i1.002",
    pageStart: 19,
    pageEnd: 42,
    references: [
      { text: "Maslach, C., Jackson, S. E., & Leiter, M. P. (1996). Maslach Burnout Inventory Manual (3rd ed.). Consulting Psychologists Press." },
      { text: "Kabat-Zinn, J. (1990). Full Catastrophe Living: Using the Wisdom of Your Body and Mind to Face Stress, Pain, and Illness. Delacorte Press." },
    ],
  },
  {
    id: "3",
    slug: "psychometric-validation-resilience-scale-indian-adolescents",
    title: "Psychometric Validation of a Resilience Scale for Indian Adolescents: Factor Structure, Reliability, and Convergent Validity",
    authors: [
      { name: "Dr. Alka Pandey", affiliation: "Galgotias University, Greater Noida", country: "India", isCorresponding: true },
      { name: "Dr. Priyanka Verma", affiliation: "Amity University Haryana", country: "India" },
    ],
    abstract: "This study reports the development and psychometric validation of a culturally adapted resilience scale for Indian adolescents aged 13–18 years. An initial pool of 42 items was generated through literature review and expert consultation, and was administered to a stratified sample of 650 adolescents across urban, semi-urban, and rural settings in North India. Exploratory factor analysis yielded a five-factor structure — emotional regulation, social support, self-efficacy, adaptability, and purpose — explaining 62.4% of total variance. Confirmatory factor analysis on a hold-out sample (n = 325) demonstrated adequate model fit (χ²/df = 2.14, CFI = .94, RMSEA = .05). The 28-item final scale exhibited excellent internal consistency (Cronbach's α = .91) and satisfactory convergent validity with the Connor-Davidson Resilience Scale (r = .74, p < .001). This instrument addresses the need for contextually relevant resilience assessment tools in Indian psychological research.",
    keywords: ["Psychometric Validation", "Resilience Scale", "Indian Adolescents", "Factor Analysis", "Psychological Assessment"],
    date: "March 2025",
    publishedDate: "2025-03-15",
    type: "Research Article",
    volume: 1,
    issue: 1,
    doi: "10.XXXXX/ejp.v1i1.003",
    pageStart: 43,
    pageEnd: 62,
    references: [
      { text: "Connor, K. M., & Davidson, J. R. T. (2003). Development of a new resilience scale: The Connor-Davidson Resilience Scale (CD-RISC). Depression and Anxiety, 18(2), 76–82.", doi: "10.1002/da.10113" },
    ],
  },
  {
    id: "4",
    slug: "neuropsychological-correlates-internet-addiction-young-adults",
    title: "Neuropsychological Correlates of Internet Addiction in Young Adults: Executive Function Deficits and Emotional Dysregulation",
    authors: [
      { name: "Dr. Akshay Ohlan", affiliation: "Amity University Haryana", country: "India", isCorresponding: true },
    ],
    abstract: "Internet addiction has emerged as a significant behavioural health concern among young adults, yet its neuropsychological underpinnings remain insufficiently characterised in Indian populations. This cross-sectional study examined executive function deficits and emotional dysregulation in 200 young adults (aged 18–30) classified as exhibiting problematic internet use (PIU) using the Internet Addiction Test (IAT). Participants completed a neuropsychological assessment battery including the Wisconsin Card Sorting Test (WCST), Trail Making Test (TMT-B), Stroop Colour-Word Test, and the Difficulties in Emotion Regulation Scale (DERS). Results revealed that participants with PIU demonstrated significantly poorer performance on measures of cognitive flexibility (WCST perseverative errors: t = 3.41, p < .001) and inhibitory control (Stroop interference: t = 2.89, p = .004), alongside elevated emotional dysregulation scores (DERS total: t = 4.12, p < .001), compared to matched controls. These findings support a neurocognitive model of internet addiction implicating prefrontal executive dysfunction.",
    keywords: ["Internet Addiction", "Neuropsychology", "Executive Function", "Emotional Dysregulation", "Young Adults"],
    date: "March 2025",
    publishedDate: "2025-03-15",
    type: "Research Article",
    volume: 1,
    issue: 1,
    doi: "10.XXXXX/ejp.v1i1.004",
    pageStart: 63,
    pageEnd: 80,
    references: [
      { text: "Young, K. S. (1998). Internet addiction: The emergence of a new clinical disorder. CyberPsychology & Behavior, 1(3), 237–244.", doi: "10.1089/cpb.1998.1.237" },
    ],
  },
  {
    id: "5",
    slug: "positive-psychology-interventions-subjective-well-being-school-teachers",
    title: "Positive Psychology Interventions and Subjective Well-Being Among School Teachers: A Pre-Post Intervention Study",
    authors: [
      { name: "Dr. Priyanka Verma", affiliation: "Amity University Haryana", country: "India", isCorresponding: true },
      { name: "Dr. Alka Pandey", affiliation: "Galgotias University, Greater Noida", country: "India" },
    ],
    abstract: "Teaching is widely acknowledged as a profession associated with elevated levels of occupational stress and emotional exhaustion. This pre-post intervention study evaluated the impact of a six-week positive psychology intervention (PPI) programme — comprising gratitude journaling, strengths identification exercises, and savouring techniques — on subjective well-being among 85 school teachers in Haryana, India. Well-being was assessed using the Satisfaction with Life Scale (SWLS) and the Positive and Negative Affect Schedule (PANAS). Paired sample t-tests revealed significant improvements in life satisfaction (t = 4.67, p < .001) and positive affect (t = 3.92, p < .001) post-intervention, alongside a significant reduction in negative affect (t = −2.81, p = .006). These results suggest that structured PPI programmes represent a feasible and effective approach to enhancing teacher well-being within the Indian educational context.",
    keywords: ["Positive Psychology", "Subjective Well-Being", "School Teachers", "Gratitude", "Intervention Study"],
    date: "March 2025",
    publishedDate: "2025-03-15",
    type: "Research Article",
    volume: 1,
    issue: 1,
    doi: "10.XXXXX/ejp.v1i1.005",
    pageStart: 81,
    pageEnd: 98,
    references: [
      { text: "Diener, E., Emmons, R. A., Larsen, R. J., & Griffin, S. (1985). The Satisfaction With Life Scale. Journal of Personality Assessment, 49(1), 71–75.", doi: "10.1207/s15327752jpa4901_13" },
      { text: "Watson, D., Clark, L. A., & Tellegen, A. (1988). Development and validation of brief measures of positive and negative affect: The PANAS scales. Journal of Personality and Social Psychology, 54(6), 1063–1070.", doi: "10.1037/0022-3514.54.6.1063" },
      { text: "Seligman, M. E. P. (2011). Flourish: A Visionary New Understanding of Happiness and Well-being. Free Press." },
    ],
  },
  {
    id: "6",
    slug: "integrative-approach-ayurvedic-psychology-mental-health-women",
    title: "An Integrative Approach to Ayurvedic Psychology and Mental Health in Women: A Narrative Review",
    authors: [
      { name: "Dr. Ashwarya Raj Laxmi", affiliation: "Independent Practitioner", country: "India", isCorresponding: true },
      { name: "Dr. Luxita Sharma", affiliation: "Amity University Haryana", country: "India" },
    ],
    abstract: "The integration of Ayurvedic psychological principles with contemporary mental health practice represents an emerging area of scholarly inquiry with particular relevance to women's health. This narrative review examines classical Ayurvedic conceptions of mind (manas), consciousness (chetana), and the three mental constitutions (sattva, rajas, tamas) in relation to modern constructs of anxiety, depression, and perinatal mental health. Drawing upon 47 sources spanning classical Ayurvedic texts and peer-reviewed empirical literature, the review identifies convergences between Ayurvedic psycho-somatic frameworks and biopsychosocial models of women's mental health. Specific attention is given to dietary and lifestyle interventions (ahara and vihara) and their evidence base in managing mood disorders during the perinatal period. The review concludes that a systematic, evidence-informed integration of Ayurvedic psychology may complement conventional approaches to women's mental healthcare, while acknowledging the need for rigorous clinical trials to establish efficacy.",
    keywords: ["Ayurvedic Psychology", "Women's Mental Health", "Integrative Medicine", "Perinatal Mental Health", "Narrative Review"],
    date: "March 2025",
    publishedDate: "2025-03-15",
    type: "Review Article",
    volume: 1,
    issue: 1,
    doi: "10.XXXXX/ejp.v1i1.006",
    pageStart: 99,
    pageEnd: 118,
    references: [
      { text: "Sharma, H. (2012). Meditation: Process and effects. AYU — An International Quarterly Journal of Research in Ayurveda, 36(3), 233–237.", doi: "10.4103/0974-8520.182754" },
    ],
  },
];

// ============================================================================
// ISSUES DATA
// ============================================================================

export const issues: IssueData[] = [
  {
    slug: "volume-1-issue-1",
    volume: 1,
    issue: 1,
    title: "Inaugural Issue",
    month: "March",
    year: 2025,
    published: true,
    publishedDate: "2025-03-15",
    articleCount: 6,
  },
];

// ============================================================================
// PSYCHOLOGY SUBJECT AREAS (for Aims & Scope)
// ============================================================================

export const subjectAreas = [
  "Clinical Psychology",
  "Cognitive Psychology",
  "Developmental Psychology",
  "Social Psychology",
  "Neuropsychology",
  "Educational Psychology",
  "Counselling Psychology",
  "Health Psychology",
  "Industrial & Organisational Psychology",
  "Positive Psychology",
  "Psychometric Assessment",
  "Behavioural Neuroscience",
  "Community Psychology",
  "Forensic Psychology",
  "Environmental Psychology",
  "Cross-Cultural Psychology",
];
