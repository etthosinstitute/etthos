# Etthos Journal Seed Script

This script seeds the database with initial data following ISSN India requirements.

import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // ============================================================================
  // 1. CREATE JOURNAL (Singleton)
  // ============================================================================
  console.log('\n📰 Creating journal...');
  
  const journal = await prisma.journal.upsert({
    where: { id: 'journal-singleton' },
    update: {},
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
      
      articlesPerIssue: 5, // ISSN minimum requirement
      isActive: true,
    },
  });
  
  console.log('✅ Journal created:', journal.name);

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
  
  const boardMembers = [
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
  
  const articles = [
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
        publishedDate: articleData.publishedDate,
        published: articleData.published,
        issueId: articleData.issueId,
        conflictOfInterest: 'The authors declare no conflicts of interest.',
        ethicsApproval: 'This study was approved by the Institutional Ethics Committee.',
      },
    });

    // Link authors
    for (let j = 0; j < articleData.authorIds.length; j++) {
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
          correspondingEmail: j === 0 ? await prisma.author.findUnique({ where: { id: articleData.authorIds[j] } }).then(a => a?.email) : undefined,
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
