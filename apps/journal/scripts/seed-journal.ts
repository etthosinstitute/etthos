// Etthos Journal Seed Script
// This script seeds the database with initial data following ISSN India requirements.

import { PrismaClient } from '@repo/database';
import type { ArticleType, BoardRole } from '@repo/database';
import { hash } from 'bcryptjs';

declare const process: {
  exit: (code?: number) => never;
};

const prisma = new PrismaClient();
const journalClient = prisma as unknown as {
  journal: {
    upsert: (args: {
      where: { id: string };
      update: Record<string, unknown>;
      create: Record<string, unknown>;
    }) => Promise<{ id: string; name: string }>;
  };
};
const siteContentClient = prisma as unknown as {
  siteContent: {
    upsert: (args: {
      where: { slug: string };
      update: { title: string; description?: string; content: unknown };
      create: { slug: string; title: string; description?: string; content: unknown };
    }) => Promise<unknown>;
  };
};

const siteContents = [
  {
    slug: 'home',
    title: 'Etthos Journal of Psychology',
    description: 'Peer-reviewed scholarly publication in psychology and behavioural sciences.',
    content: {
      eyebrow: 'Peer-Reviewed Scholarly Publication',
      heroDescription: 'An open-access academic journal for original research, review scholarship, and evidence-based discourse in psychology and behavioural sciences, published under the academic stewardship of Etthos.',
      heroNotice: 'Now Accepting Submissions',
      profileCards: [
        { title: 'Open Access', subtitle: 'Publication Model', icon: 'book-open' },
        { title: 'Peer-Reviewed', subtitle: 'Double-Blind', icon: 'shield' },
        { title: 'Psychology', subtitle: 'Behavioural Sciences', icon: 'brain' },
        { title: 'Quarterly', subtitle: 'Publication Frequency', icon: 'globe' },
      ],
      features: [
        {
          eyebrow: 'Scope',
          title: 'Psychology Focused',
          description: 'Dedicated exclusively to psychology and behavioural sciences — from clinical and cognitive to developmental and social psychology.',
          icon: 'brain',
        },
        {
          eyebrow: 'Review',
          title: 'Rigorous Peer Review',
          description: 'Every manuscript undergoes double-blind peer review by experts, ensuring the highest standards of scholarly integrity.',
          icon: 'shield',
        },
        {
          eyebrow: 'Access',
          title: 'Open Access',
          description: 'All articles are freely accessible for researchers, practitioners, and students across the world.',
          icon: 'globe',
        },
      ],
    },
  },
  {
    slug: 'about',
    title: 'About the Journal',
    description: 'An overview of the mission, scope, and editorial policies of the Etthos Journal of Psychology.',
    content: {
      overviewParagraphs: [
        'The Etthos Journal of Psychology (EJP) is a peer-reviewed, open-access academic journal published by Etthos. The journal is dedicated to the dissemination of high-quality original research, review articles, and scholarly discourse across the full spectrum of psychology and behavioural sciences.',
        'EJP aspires to serve as a credible scholarly platform for researchers, academicians, and practitioners — particularly those working in the Indian and South Asian context — to share rigorous empirical work and contribute to the advancement of psychological knowledge.',
        'The journal is committed to maintaining the highest standards of publication ethics and scholarly rigour. All submissions undergo a double-blind peer review process conducted by experts in the relevant field.',
      ],
      foundersTitle: 'The people behind the Etthos vision',
      foundersDescription: 'Etthos Institute of Behavioral Research and Training Pvt. Ltd. was established with a vision to elevate the standards of psychological education, research, and applied training. The journal extends that broader institutional commitment into scholarly publishing.',
      founders: [
        {
          name: 'Ram Vinoy Tiwari',
          role: 'Director & Chairman',
          image: '/aboutusimages/ram-vinay-tiwari.jpeg',
        },
        {
          name: 'Vishal Anand',
          role: 'Director & CEO',
          image: '/aboutusimages/vishal-anand.jpeg',
        },
      ],
      aimsIntro: 'The Etthos Journal of Psychology welcomes original research articles, review papers, case studies, short communications, and theoretical contributions in the following areas:',
      publicationFrequencyText: 'The journal is published quarterly (4 issues per year) in March, June, September, and December. Special issues dedicated to specific topics may also be published.',
      submitCtaTitle: 'Submit Your Work',
      submitCtaDescription: 'Ready to publish with us? Check our author guidelines and submit your manuscript today.',
    },
  },
  {
    slug: 'aims-scope',
    title: 'Aims & Scope',
    description: 'The scope of the Etthos Journal of Psychology covers the full breadth of psychology and behavioural sciences.',
    content: {
      aimsParagraphs: [
        'The Etthos Journal of Psychology aims to serve as a credible, peer-reviewed scholarly platform for the publication of original research, review articles, case studies, theoretical contributions, and short communications in the domain of psychology and behavioural sciences.',
        'The journal is particularly committed to amplifying scholarship emerging from the Indian and South Asian research context, while remaining open to contributions from researchers across the globe.',
        'The journal upholds the highest standards of publication ethics, transparency, and scholarly integrity, guided by the principles of the Committee on Publication Ethics (COPE).',
      ],
      articleTypes: [
        { title: 'Original Research Articles', description: 'Empirical studies reporting new findings based on primary data.' },
        { title: 'Review Articles', description: 'Systematic reviews, meta-analyses, and narrative reviews synthesising existing literature.' },
        { title: 'Case Studies', description: 'In-depth analyses of individual or group cases with clinical or theoretical significance.' },
        { title: 'Short Communications', description: 'Brief empirical reports or preliminary findings of high relevance.' },
        { title: 'Theoretical Papers', description: 'Contributions advancing conceptual frameworks or proposing new models.' },
        { title: 'Letters to the Editor', description: 'Scholarly responses to previously published articles.' },
        { title: 'Book Reviews', description: 'Critical reviews of recently published academic texts relevant to psychology.' },
      ],
    },
  },
  {
    slug: 'publisher',
    title: 'Publisher Information',
    description: 'Official publisher details for the Etthos Journal of Psychology.',
    content: {
      introParagraphs: [
        'Etthos is the publisher of the Etthos Journal of Psychology (EJP). Etthos is dedicated to fostering rigorous academic scholarship and advancing knowledge through high-quality, open-access publications.',
        'The journal operates under strict adherence to international publication ethics standards and the guidelines of the Committee on Publication Ethics (COPE).',
      ],
    },
  },
  {
    slug: 'guidelines',
    title: 'Author Guidelines',
    description: 'Everything you need to know to prepare and submit your manuscript to the Etthos Journal of Psychology.',
    content: {
      sections: [
        {
          title: 'Submission Process',
          paragraphs: [
            'Manuscripts must be submitted online via the Journal Submission System. First-time users must register for an account. Submissions via email are not accepted.',
          ],
        },
        {
          title: 'Manuscript Preparation',
          paragraphs: [
            'Authors should ensure their manuscripts strictly follow the formatting guidelines below. Incomplete submissions or those not adhering to the guidelines may be returned without review.',
          ],
          listType: 'bullet',
          items: [
            'File Format: Microsoft Word (.doc, .docx) or PDF.',
            'Font: Times New Roman or Arial, 12pt.',
            'Spacing: Double-spaced throughout.',
            'Margins: 1 inch (2.54 cm) on all sides.',
            'Page Numbers: Included on every page.',
            'Word Count: Research articles 5,000–8,000 words; review articles up to 10,000 words; short communications up to 3,000 words.',
          ],
        },
        {
          title: 'Structure of the Manuscript',
          listType: 'numbered',
          items: [
            'Title Page: Title, author names, affiliations, ORCID IDs, and corresponding author contact details.',
            'Abstract: Structured abstract (Background, Objectives, Methods, Results, Conclusion) of max 250 words.',
            'Keywords: 4–6 keywords for indexing.',
            'Introduction: Context, literature review, and purpose of the study.',
            'Methods: Detailed description of participants, measures, and procedures. Include ethics approval details (IRB or institutional ethics committee).',
            'Results: Clear presentation of findings with appropriate statistical analyses.',
            'Discussion: Interpretation of results, implications, limitations, and directions for future research.',
            'References: APA Style (7th Edition).',
          ],
          paragraphs: [],
        },
        {
          title: 'Ethical Requirements',
          paragraphs: [
            'All research involving human participants must have received approval from an appropriate Institutional Review Board (IRB) or Ethics Committee. Authors must include a statement confirming ethical approval, including the name of the approving body and the approval reference number.',
            'Studies involving clinical populations must comply with the Declaration of Helsinki. Informed consent must be obtained from all participants, and confidentiality of participant data must be maintained throughout.',
            'Authors must affirm that the work is original, has not been published previously, and is not under consideration elsewhere. Any potential conflicts of interest must be disclosed.',
          ],
        },
        {
          title: 'Statistical Reporting',
          paragraphs: [
            'Authors should report effect sizes, confidence intervals, and exact p-values where possible. The use of APA-recommended statistical reporting conventions is strongly encouraged. For qualitative research, authors should clearly describe their methodological framework and data analysis procedures.',
          ],
        },
      ],
      resources: [
        {
          title: 'Manuscript Template',
          description: 'Request the current manuscript template with APA 7th edition styles.',
          icon: 'file-text',
          href: 'mailto:info@etthos.com?subject=Manuscript%20Template%20Request',
          ctaLabel: 'Request Template',
        },
        {
          title: 'Cover Letter Template',
          description: 'Request the standard submission cover letter format from the editorial office.',
          icon: 'file-text',
          href: 'mailto:info@etthos.com?subject=Cover%20Letter%20Template%20Request',
          ctaLabel: 'Request Template',
        },
        {
          title: 'Submission Checklist',
          description: 'Get the editorial checklist before completing your submission.',
          icon: 'check-circle',
          href: 'mailto:info@etthos.com?subject=Submission%20Checklist%20Request',
          ctaLabel: 'Request Checklist',
        },
      ],
    },
  },
  {
    slug: 'policies',
    title: 'Policies & Ethics',
    description: 'Our commitment to ethical publishing and research integrity in psychology and behavioural sciences.',
    content: {
      sections: [
        {
          id: 'peer-review',
          title: 'Peer Review Policy',
          icon: 'check',
          paragraphs: [
            'The Etthos Journal of Psychology employs a strict double-blind peer review process. Both reviewer and author identities are concealed throughout the review process to ensure unbiased and objective evaluation of scholarly work.',
            'All submitted manuscripts are initially screened by the editorial office for suitability, scope alignment, and compliance with the journal guidelines. Manuscripts passing this screening are assigned to independent expert reviewers with relevant domain expertise.',
          ],
          bullets: [
            'Initial Screening: 3–5 working days',
            'Peer Review Process: 4–6 weeks',
            'Revision Period: Authors are typically given 2–4 weeks for revisions',
            'Editorial Decision: Accept, Minor Revisions, Major Revisions, or Reject',
          ],
        },
        {
          id: 'ethics',
          title: 'Publication Ethics',
          icon: 'shield',
          paragraphs: [
            'The Etthos Journal of Psychology strictly adheres to the guidelines of the Committee on Publication Ethics (COPE). Authors, editors, and reviewers are expected to maintain the highest standards of publication ethics.',
            'Authorship should be limited to those who have made a significant intellectual contribution to the conception, design, execution, or interpretation of the reported study. All listed authors must have approved the final version of the manuscript and agreed to its submission.',
            'Authors may be asked to provide raw data in connection with a paper for editorial review. Fabrication or falsification of data constitutes a serious breach of ethics and will result in immediate rejection and potential sanctions.',
            'All authors must disclose any financial or personal relationships that could be perceived as influencing their work.',
          ],
        },
        {
          id: 'human-subjects',
          title: 'Human Subjects Research',
          icon: 'shield',
          paragraphs: [
            'All research involving human participants published in the Etthos Journal of Psychology must have been conducted in accordance with the Declaration of Helsinki and must have received approval from an appropriate Institutional Review Board (IRB) or Ethics Committee.',
            'Authors must include a clear statement in the manuscript confirming the name of the approving ethics body, the approval reference number, and that informed consent was obtained from all participants or their legal guardians.',
            'Research involving deception, vulnerable populations, or sensitive topics must provide additional ethical justifications.',
          ],
        },
        {
          id: 'plagiarism',
          title: 'Plagiarism Policy',
          icon: 'lock',
          paragraphs: [
            'The journal has a zero-tolerance policy towards plagiarism. All submissions are checked for similarity using industry-standard software.',
            'Similarity index must be below 15% excluding references and direct quotations. Any manuscript found to contain plagiarised material will be rejected immediately.',
          ],
        },
        {
          id: 'copyright',
          title: 'Copyright & Licensing',
          icon: 'file-text',
          paragraphs: [
            'This is an Open Access journal. All articles are distributed under the terms of the Creative Commons Attribution License (CC BY 4.0), which permits unrestricted use, distribution, and reproduction in any medium, provided the original work is properly cited.',
            'Authors retain the copyright of their work. By submitting a manuscript, authors grant the journal a non-exclusive licence to publish and disseminate the work.',
          ],
        },
      ],
    },
  },
  {
    slug: 'contact',
    title: 'Contact Us',
    description: 'We welcome enquiries from authors, reviewers, and readers.',
    content: {
      formIntro: 'Use the form below for editorial, submission, review, or technical questions. Messages are delivered to the editorial inbox and stored in the database for follow-up.',
      subjects: [
        'Manuscript Submission',
        'Editorial Enquiry',
        'Peer Review',
        'Technical Issue',
        'General Enquiry',
      ],
      successMessage: 'Thanks for reaching out. Our editorial team will get back to you shortly.',
    },
  },
];

async function main() {
  console.log('🌱 Starting database seed...');

  // ============================================================================
  // 1. CREATE JOURNAL (Singleton)
  // ============================================================================
  console.log('\n📰 Creating journal...');
  
  const journal = await journalClient.journal.upsert({
    where: { id: 'journal-singleton' },
    update: {
      description: 'A peer-reviewed open-access journal dedicated to advancing psychological research and practice in India and beyond.',
      publisher: 'Etthos',
      frequency: 'Quarterly',
      language: 'English',
      country: 'India',
      publisherAddress: 'Etthos Institute of Behavioral Research and Training Pvt. Ltd.',
      publisherCity: 'New Delhi',
      publisherState: 'Delhi',
      publisherCountry: 'India',
      publisherZip: '110001',
      contactEmail: 'journal@etthos.com',
      infoEmail: 'info@etthos.com',
      contactPhone: '+91-11-12345678',
      websiteUrl: 'https://journal.etthos.com',
      mainWebsiteUrl: 'https://etthos.com',
      subjectArea: 'Psychology',
      subjectKeywords: [
        'Clinical Psychology',
        'Cognitive Psychology',
        'Developmental Psychology',
        'Educational Psychology',
        'Social Psychology',
        'Neuropsychology',
      ],
      registeredOfficeLabel: 'Registered Office',
      corporateOfficeLabel: 'Corporate Office',
      corporateOfficeAddress: 'Etthos, New Delhi, Delhi, India',
      license: 'CC BY 4.0',
      reviewModel: 'Double-Blind Peer Review',
      accessPolicy: 'Open Access',
      establishedYear: 2024,
      articlesPerIssue: 5,
      isActive: true,
    },
    create: {
      id: 'journal-singleton',
      name: 'Etthos Journal of Psychology',
      shortName: 'EJP',
      description: 'A peer-reviewed open-access journal dedicated to advancing psychological research and practice in India and beyond.',
      publisher: 'Etthos',
      frequency: 'Quarterly',
      language: 'English',
      country: 'India',
      
      // Publisher Information (ISSN Requirement)
      publisherAddress: '123 Psychology Avenue',
      publisherCity: 'New Delhi',
      publisherState: 'Delhi',
      publisherCountry: 'India',
      publisherZip: '110001',
      contactEmail: 'journal@etthos.com',
      infoEmail: 'info@etthos.com',
      contactPhone: '+91-11-12345678',
      
      websiteUrl: 'https://journal.etthos.com',
      mainWebsiteUrl: 'https://etthos.com',
      
      subjectArea: 'Psychology',
      subjectKeywords: [
        'Clinical Psychology',
        'Cognitive Psychology',
        'Developmental Psychology',
        'Educational Psychology',
        'Social Psychology',
        'Neuropsychology'
      ],
      registeredOfficeLabel: 'Registered Office',
      corporateOfficeLabel: 'Corporate Office',
      corporateOfficeAddress: 'Etthos, New Delhi, Delhi, India',
      license: 'CC BY 4.0',
      reviewModel: 'Double-Blind Peer Review',
      accessPolicy: 'Open Access',
      establishedYear: 2024,
      
      articlesPerIssue: 5, // ISSN minimum requirement
      isActive: true,
    },
  });
  
  console.log('✅ Journal created:', journal.name);

  for (const siteContent of siteContents) {
    await siteContentClient.siteContent.upsert({
      where: { slug: siteContent.slug },
      update: {
        title: siteContent.title,
        description: siteContent.description,
        content: siteContent.content,
      },
      create: siteContent,
    });
  }

  // ============================================================================
  // 2. CREATE AFFILIATIONS
  // ============================================================================
  console.log('\n🏛️  Creating affiliations...');
  
  const affiliation1 = await prisma.affiliation.upsert({
    where: {
      institution_department_city_country: {
        institution: 'University of Delhi',
        department: 'Department of Psychology',
        city: 'New Delhi',
        country: 'India',
      },
    },
    update: {},
    create: {
      institution: 'University of Delhi',
      department: 'Department of Psychology',
      city: 'New Delhi',
      state: 'Delhi',
      country: 'India',
      website: 'https://du.ac.in',
    },
  });

  const affiliation2 = await prisma.affiliation.upsert({
    where: {
      institution_department_city_country: {
        institution: 'Indian Institute of Technology Bombay',
        department: 'Department of Humanities and Social Sciences',
        city: 'Mumbai',
        country: 'India',
      },
    },
    update: {},
    create: {
      institution: 'Indian Institute of Technology Bombay',
      department: 'Department of Humanities and Social Sciences',
      city: 'Mumbai',
      state: 'Maharashtra',
      country: 'India',
      website: 'https://iitb.ac.in',
    },
  });

  const affiliation3 = await prisma.affiliation.upsert({
    where: {
      institution_department_city_country: {
        institution: 'Tata Institute of Social Sciences',
        department: 'School of Human Ecology',
        city: 'Mumbai',
        country: 'India',
      },
    },
    update: {},
    create: {
      institution: 'Tata Institute of Social Sciences',
      department: 'School of Human Ecology',
      city: 'Mumbai',
      state: 'Maharashtra',
      country: 'India',
      website: 'https://tiss.edu',
    },
  });

  const affiliation4 = await prisma.affiliation.upsert({
    where: {
      institution_department_city_country: {
        institution: 'Stanford University',
        department: 'Department of Psychology',
        city: 'Stanford',
        country: 'USA',
      },
    },
    update: {},
    create: {
      institution: 'Stanford University',
      department: 'Department of Psychology',
      city: 'Stanford',
      state: 'California',
      country: 'USA',
      website: 'https://psychology.stanford.edu',
    },
  });

  console.log('✅ Created 4 affiliations');

  // ============================================================================
  // 3. CREATE EDITORIAL BOARD (ISSN Requirement: Minimum 5 members)
  // ============================================================================
  console.log('\n👥 Creating editorial board members...');
  
  const boardMembers: Array<{
    firstName: string;
    lastName: string;
    title: string;
    email: string;
    role: BoardRole;
    position: string;
    designation: string;
    department: string;
    affiliationId: string;
    country: string;
    orcid: string;
    biography: string;
    expertise: string[];
    displayOrder: number;
  }> = [
    {
      firstName: 'Priya',
      lastName: 'Sharma',
      title: 'Prof.',
      email: 'priya.sharma@du.ac.in',
      role: 'EDITOR_IN_CHIEF',
      position: 'Editor-in-Chief',
      designation: 'Professor',
      department: 'Department of Psychology',
      affiliationId: affiliation1.id,
      country: 'India',
      orcid: '0000-0001-1234-5678',
      biography: 'Prof. Priya Sharma is a distinguished psychologist with over 20 years of experience in clinical psychology and research.',
      expertise: ['Clinical Psychology', 'Cognitive Behavioral Therapy', 'Trauma Psychology'],
      displayOrder: 1,
    },
    {
      firstName: 'Rajesh',
      lastName: 'Kumar',
      title: 'Dr.',
      email: 'rajesh.kumar@iitb.ac.in',
      role: 'ASSOCIATE_EDITOR',
      position: 'Associate Editor',
      designation: 'Associate Professor',
      department: 'Department of Humanities and Social Sciences',
      affiliationId: affiliation2.id,
      country: 'India',
      orcid: '0000-0002-2345-6789',
      biography: 'Dr. Rajesh Kumar specializes in cognitive psychology and human-computer interaction.',
      expertise: ['Cognitive Psychology', 'Human-Computer Interaction', 'Decision Making'],
      displayOrder: 2,
    },
    {
      firstName: 'Anjali',
      lastName: 'Desai',
      title: 'Dr.',
      email: 'anjali.desai@tiss.edu',
      role: 'ASSOCIATE_EDITOR',
      position: 'Associate Editor',
      designation: 'Assistant Professor',
      department: 'School of Human Ecology',
      affiliationId: affiliation3.id,
      country: 'India',
      orcid: '0000-0003-3456-7890',
      biography: 'Dr. Anjali Desai focuses on developmental psychology and child mental health.',
      expertise: ['Developmental Psychology', 'Child Psychology', 'Mental Health'],
      displayOrder: 3,
    },
    {
      firstName: 'Michael',
      lastName: 'Chen',
      title: 'Prof.',
      email: 'mchen@stanford.edu',
      role: 'EDITORIAL_BOARD_MEMBER',
      position: 'Editorial Board Member',
      designation: 'Professor',
      department: 'Department of Psychology',
      affiliationId: affiliation4.id,
      country: 'USA',
      orcid: '0000-0004-4567-8901',
      biography: 'Prof. Michael Chen is an internationally recognized expert in social psychology.',
      expertise: ['Social Psychology', 'Cultural Psychology', 'Behavioral Economics'],
      displayOrder: 4,
    },
    {
      firstName: 'Sunita',
      lastName: 'Rao',
      title: 'Dr.',
      email: 'sunita.rao@du.ac.in',
      role: 'EDITORIAL_BOARD_MEMBER',
      position: 'Editorial Board Member',
      designation: 'Senior Lecturer',
      department: 'Department of Psychology',
      affiliationId: affiliation1.id,
      country: 'India',
      orcid: '0000-0005-5678-9012',
      biography: 'Dr. Sunita Rao specializes in educational psychology and learning disorders.',
      expertise: ['Educational Psychology', 'Learning Disorders', 'Assessment'],
      displayOrder: 5,
    },
  ];

  for (const member of boardMembers) {
    await prisma.editorialBoardMember.upsert({
      where: { email: member.email },
      update: {},
      create: member,
    });
  }

  console.log('✅ Created 5 editorial board members (ISSN requirement met)');

  // ============================================================================
  // 4. CREATE VOLUME & ISSUE
  // ============================================================================
  console.log('\n📚 Creating volume and issue...');
  
  const volume = await prisma.volume.upsert({
    where: { 
      journalId_year: {
        journalId: journal.id,
        year: 2024,
      },
    },
    update: {},
    create: {
      number: 1,
      year: 2024,
      description: 'Inaugural Volume',
      journalId: journal.id,
    },
  });

  const issue = await prisma.issue.upsert({
    where: {
      volumeId_number: {
        volumeId: volume.id,
        number: 1,
      },
    },
    update: {},
    create: {
      number: 1,
      title: 'Inaugural Issue',
      description: 'The first issue of Etthos Journal of Psychology, featuring groundbreaking research.',
      published: true,
      publishedDate: new Date('2024-03-01'),
      volumeId: volume.id,
    },
  });

  console.log('✅ Created Volume 1, Issue 1');

  // ============================================================================
  // 5. CREATE AUTHORS
  // ============================================================================
  console.log('\n✍️  Creating authors...');
  
  const authors = await Promise.all([
    prisma.author.upsert({
      where: { email: 'john.doe@du.ac.in' },
      update: {},
      create: {
        firstName: 'John',
        lastName: 'Doe',
        title: 'Dr.',
        email: 'john.doe@du.ac.in',
        orcid: '0000-0006-1234-5678',
        biography: 'Dr. John Doe is a clinical psychologist specializing in anxiety disorders.',
      },
    }),
    prisma.author.upsert({
      where: { email: 'jane.smith@iitb.ac.in' },
      update: {},
      create: {
        firstName: 'Jane',
        lastName: 'Smith',
        title: 'Dr.',
        email: 'jane.smith@iitb.ac.in',
        orcid: '0000-0007-2345-6789',
        biography: 'Dr. Jane Smith researches cognitive processes and decision making.',
      },
    }),
    prisma.author.upsert({
      where: { email: 'alice.johnson@tiss.edu' },
      update: {},
      create: {
        firstName: 'Alice',
        lastName: 'Johnson',
        title: 'Dr.',
        email: 'alice.johnson@tiss.edu',
        orcid: '0000-0008-3456-7890',
        biography: 'Dr. Alice Johnson focuses on child development and educational psychology.',
      },
    }),
  ]);

  // Link authors to affiliations
  await prisma.authorAffiliation.upsert({
    where: {
      authorId_affiliationId: {
        authorId: authors[0].id,
        affiliationId: affiliation1.id,
      },
    },
    update: {},
    create: {
      authorId: authors[0].id,
      affiliationId: affiliation1.id,
      isPrimary: true,
      position: 'Assistant Professor',
      current: true,
    },
  });

  await prisma.authorAffiliation.upsert({
    where: {
      authorId_affiliationId: {
        authorId: authors[1].id,
        affiliationId: affiliation2.id,
      },
    },
    update: {},
    create: {
      authorId: authors[1].id,
      affiliationId: affiliation2.id,
      isPrimary: true,
      position: 'Research Fellow',
      current: true,
    },
  });

  console.log('✅ Created 3 authors with affiliations');

  // ============================================================================
  // 6. CREATE KEYWORDS
  // ============================================================================
  console.log('\n🏷️  Creating keywords...');
  
  const keywordNames = [
    'Cognitive Behavioral Therapy',
    'Depression',
    'Anxiety',
    'Mental Health',
    'Clinical Psychology',
    'Decision Making',
    'Cognitive Processes',
    'Learning',
    'Memory',
    'Child Development',
  ];

  const keywords = await Promise.all(
    keywordNames.map(name =>
      prisma.keyword.upsert({
        where: { name },
        update: {},
        create: { name },
      })
    )
  );

  console.log(`✅ Created ${keywords.length} keywords`);

  // ============================================================================
  // 7. CREATE ARTICLES (ISSN Requirement: Minimum 5 per issue)
  // ============================================================================
  console.log('\n📄 Creating articles...');
  
  const articles: Array<{
    title: string;
    slug: string;
    abstract: string;
    type: ArticleType;
    pageStart: number;
    pageEnd: number;
    doi: string;
    publishedDate: Date;
    published: boolean;
    issueId: string;
    authorIds: string[];
    keywordIds: string[];
  }> = [
    {
      title: 'Efficacy of Cognitive Behavioral Therapy in Treating Depression: A Meta-Analysis',
      slug: 'efficacy-cbt-treating-depression-meta-analysis',
      abstract: 'This meta-analysis examines the efficacy of Cognitive Behavioral Therapy (CBT) in treating depression across 50 randomized controlled trials. Results indicate that CBT shows significant improvement over control conditions with a large effect size (d = 0.82). The study also explores moderators such as therapy duration, therapist experience, and patient demographics. Implications for clinical practice and future research directions are discussed.',
      type: 'RESEARCH_ARTICLE',
      pageStart: 1,
      pageEnd: 15,
      doi: '10.12345/ejp.v1i1.001',
      publishedDate: new Date('2024-03-01'),
      published: true,
      issueId: issue.id,
      authorIds: [authors[0].id],
      keywordIds: [keywords[0].id, keywords[1].id, keywords[4].id],
    },
    {
      title: 'Neural Correlates of Decision Making Under Uncertainty',
      slug: 'neural-correlates-decision-making-uncertainty',
      abstract: 'Using functional magnetic resonance imaging (fMRI), this study investigates the neural substrates of decision making under conditions of uncertainty. Twenty-four healthy participants completed a gambling task while brain activity was recorded. Results revealed increased activation in the dorsolateral prefrontal cortex and anterior cingulate cortex during uncertain decisions. These findings contribute to our understanding of the cognitive neuroscience of decision making.',
      type: 'RESEARCH_ARTICLE',
      pageStart: 16,
      pageEnd: 28,
      doi: '10.12345/ejp.v1i1.002',
      publishedDate: new Date('2024-03-01'),
      published: true,
      issueId: issue.id,
      authorIds: [authors[1].id],
      keywordIds: [keywords[5].id, keywords[6].id],
    },
    {
      title: 'The Role of Executive Functions in Early Childhood Learning',
      slug: 'role-executive-functions-early-childhood-learning',
      abstract: 'This longitudinal study examines the relationship between executive functions and academic achievement in preschool children. One hundred and twenty children aged 4-5 years were assessed on measures of working memory, inhibitory control, and cognitive flexibility, and were followed up two years later. Results show that executive functions at age 4-5 predict reading and mathematics performance at age 6-7, even after controlling for IQ and socioeconomic status.',
      type: 'RESEARCH_ARTICLE',
      pageStart: 29,
      pageEnd: 42,
      doi: '10.12345/ejp.v1i1.003',
      publishedDate: new Date('2024-03-01'),
      published: true,
      issueId: issue.id,
      authorIds: [authors[2].id],
      keywordIds: [keywords[7].id, keywords[9].id],
    },
    {
      title: 'Anxiety Disorders in College Students: Prevalence and Risk Factors',
      slug: 'anxiety-disorders-college-students-prevalence-risk-factors',
      abstract: 'This cross-sectional study investigates the prevalence of anxiety disorders among college students in India and identifies potential risk factors. A total of 800 students from five universities completed standardized anxiety assessments and demographic questionnaires. Results indicate a prevalence rate of 28.5% for clinically significant anxiety symptoms. Academic pressure, financial stress, and social isolation emerged as significant risk factors. Implications for campus mental health services are discussed.',
      type: 'RESEARCH_ARTICLE',
      pageStart: 43,
      pageEnd: 56,
      doi: '10.12345/ejp.v1i1.004',
      publishedDate: new Date('2024-03-01'),
      published: true,
      issueId: issue.id,
      authorIds: [authors[0].id, authors[1].id],
      keywordIds: [keywords[2].id, keywords[3].id],
    },
    {
      title: 'Memory Consolidation During Sleep: Recent Advances and Future Directions',
      slug: 'memory-consolidation-during-sleep-recent-advances',
      abstract: 'This review article synthesizes recent research on memory consolidation during sleep, covering both behavioral and neurophysiological evidence. We discuss the roles of slow-wave sleep and REM sleep in different types of memory, including declarative and procedural memory. The article also explores clinical implications for learning disorders and potential interventions to enhance memory consolidation through sleep optimization.',
      type: 'REVIEW_ARTICLE',
      pageStart: 57,
      pageEnd: 72,
      doi: '10.12345/ejp.v1i1.005',
      publishedDate: new Date('2024-03-01'),
      published: true,
      issueId: issue.id,
      authorIds: [authors[1].id, authors[2].id],
      keywordIds: [keywords[8].id, keywords[6].id],
    },
  ];

  for (let i = 0; i < articles.length; i++) {
    const articleData = articles[i];
    
    const article = await prisma.article.upsert({
      where: { slug: articleData.slug },
      update: {},
      create: {
        title: articleData.title,
        slug: articleData.slug,
        abstract: articleData.abstract,
        type: articleData.type,
        pageStart: articleData.pageStart,
        pageEnd: articleData.pageEnd,
        doi: articleData.doi,
        pdfUrl: `https://journal.etthos.com/articles/${articleData.slug}.pdf`,
        publishedDate: articleData.publishedDate,
        published: articleData.published,
        issueId: articleData.issueId,
        conflictOfInterest: 'The authors declare no conflicts of interest.',
        ethicsApproval: 'This study was approved by the Institutional Ethics Committee.',
      },
    });

    // Link authors
    for (let j = 0; j < articleData.authorIds.length; j++) {
      const correspondingAuthor =
        j === 0
          ? await prisma.author.findUnique({
              where: { id: articleData.authorIds[j] },
              select: { email: true },
            })
          : null;

      await prisma.articleAuthor.upsert({
        where: {
          articleId_authorId: {
            articleId: article.id,
            authorId: articleData.authorIds[j],
          },
        },
        update: {},
        create: {
          articleId: article.id,
          authorId: articleData.authorIds[j],
          order: j + 1,
          isCorresponding: j === 0,
          correspondingEmail: correspondingAuthor?.email,
        },
      });
    }

    // Link keywords
    for (const keywordId of articleData.keywordIds) {
      await prisma.articleKeyword.upsert({
        where: {
          articleId_keywordId: {
            articleId: article.id,
            keywordId,
          },
        },
        update: {},
        create: {
          articleId: article.id,
          keywordId,
        },
      });
    }

    // Create sample references
    await prisma.reference.create({
      data: {
        articleId: article.id,
        order: 1,
        text: 'Beck, A. T., Rush, A. J., Shaw, B. F., & Emery, G. (1979). Cognitive therapy of depression. Guilford Press.',
        year: 1979,
      },
    });

    // Create citations
    const authorNames = await Promise.all(
      articleData.authorIds.map(async id => {
        const author = await prisma.author.findUnique({ where: { id } });
        return `${author?.firstName} ${author?.lastName}`;
      })
    );

    await prisma.citation.createMany({
      data: [
        {
          articleId: article.id,
          format: 'APA',
          text: `${authorNames.join(', ')} (2024). ${articleData.title}. Etthos Journal of Psychology, 1(1), ${articleData.pageStart}-${articleData.pageEnd}. https://doi.org/${articleData.doi}`,
        },
        {
          articleId: article.id,
          format: 'MLA',
          text: `${authorNames.join(', and ')}. "${articleData.title}." Etthos Journal of Psychology, vol. 1, no. 1, 2024, pp. ${articleData.pageStart}-${articleData.pageEnd}.`,
        },
      ],
    });
  }

  console.log(`✅ Created ${articles.length} articles (ISSN requirement met)`);

  // ============================================================================
  // 8. CREATE ADMIN USER
  // ============================================================================
  console.log('\n👤 Creating admin user...');
  
  const hashedPassword = await hash('admin123', 10);
  const editorPassword = await hash('Editor@123', 10);
  const reviewerPassword = await hash('Reviewer@123', 10);
  
  await prisma.user.upsert({
    where: { email: 'admin@etthos.com' },
    update: {},
    create: {
      email: 'admin@etthos.com',
      password: hashedPassword,
      firstName: 'Admin',
      lastName: 'User',
      role: 'SUPER_ADMIN',
    },
  });

  await prisma.user.upsert({
    where: { email: 'editor@journal.com' },
    update: {
      password: editorPassword,
      firstName: 'Dr.',
      lastName: 'Smarth',
      role: 'EDITOR',
      isActive: true,
    },
    create: {
      email: 'editor@journal.com',
      password: editorPassword,
      firstName: 'Dr.',
      lastName: 'Smarth',
      role: 'EDITOR',
      isActive: true,
    },
  });

  await prisma.user.upsert({
    where: { email: 'reviewer@journal.com' },
    update: {
      password: reviewerPassword,
      firstName: 'Aarav',
      lastName: 'Khanna',
      role: 'REVIEWER',
      isActive: true,
    },
    create: {
      email: 'reviewer@journal.com',
      password: reviewerPassword,
      firstName: 'Aarav',
      lastName: 'Khanna',
      role: 'REVIEWER',
      isActive: true,
    },
  });

  console.log('✅ Created admin user (email: admin@etthos.com, password: admin123)');

  // ============================================================================
  // SUMMARY
  // ============================================================================
  console.log('\n' + '='.repeat(60));
  console.log('🎉 DATABASE SEEDING COMPLETE!');
  console.log('='.repeat(60));
  console.log('\n✅ ISSN India Requirements Met:');
  console.log(`   • Editorial Board: 5 members (minimum required)`);
  console.log(`   • Articles per Issue: ${articles.length} (minimum 5 required)`);
  console.log(`   • All members have institutional affiliations and emails`);
  console.log(`   • Publisher information included`);
  console.log(`   • Each article has unique URL (slug-based)`);
  console.log('\n📊 Summary:');
  console.log(`   • Journal: 1`);
  console.log(`   • Volumes: 1`);
  console.log(`   • Issues: 1 (published)`);
  console.log(`   • Articles: ${articles.length} (all published)`);
  console.log(`   • Authors: ${authors.length}`);
  console.log(`   • Editorial Board: 5 members`);
  console.log(`   • Affiliations: 4`);
  console.log(`   • Keywords: ${keywords.length}`);
  console.log('\n🔐 Admin Login:');
  console.log('   Email: admin@etthos.com');
  console.log('   Password: admin123');
  console.log('   👉 Please change this password immediately!\n');
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
