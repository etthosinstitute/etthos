BEGIN;

UPDATE journals
SET
  name = 'Etthos Journal Of Health, Behavior and Applied Psychology',
  "shortName" = 'EJHBAP',
  description = 'A peer-reviewed, open-access academic journal dedicated to advancing research in psychology and behavioural sciences.',
  publisher = 'Etthos',
  frequency = 'Quarterly',
  language = 'English',
  country = 'India',
  "publisherAddress" = 'A/107, Sardar Patel Nagar, Mahuli',
  "publisherCity" = 'Patna',
  "publisherState" = 'Bihar',
  "publisherCountry" = 'India',
  "publisherZip" = '804453',
  "contactEmail" = 'info@etthos.com',
  "infoEmail" = 'info@etthos.com',
  "contactPhone" = '+91 72610 28965',
  "websiteUrl" = 'https://etthosjournal.com',
  "mainWebsiteUrl" = 'https://etthos.com',
  "subjectArea" = 'Multidisciplinary',
  "subjectKeywords" = ARRAY[
    'Dietetics & Applied Nutrition',
    'Environment',
    'Journalism',
    'Law',
    'Liberal Arts',
    'Linguistics',
    'Nursing',
    'Oceanography',
    'Media & Communication',
    'Ayurveda',
    'Yoga Science'
  ]::text[],
  "registeredOfficeLabel" = 'Registered Office',
  "corporateOfficeLabel" = 'Corporate Office',
  "corporateOfficeAddress" = 'D - Mohan Garden, Dwarka Mor, Uttam Nagar, New Delhi, 110059, India',
  license = 'CC BY 4.0',
  "reviewModel" = 'Double-Blind Peer Review',
  "accessPolicy" = 'Open Access',
  "establishedYear" = 2025,
  "articlesPerIssue" = 5,
  "isActive" = true
WHERE id = 'journal-singleton';

INSERT INTO affiliations (id, institution, department, city, state, country, website, "createdAt", "updatedAt")
VALUES
  ('aff-amity-aibas', 'Amity University Haryana', 'Amity Institute of Behavioural and Allied Sciences (AIBAS)', 'Gurugram', 'Haryana', 'India', 'https://www.amity.edu/gurugram/', NOW(), NOW()),
  ('aff-amity-ocean', 'Amity University Haryana', 'Centres of Excellence in Ocean-Atmospheric Science and Technology', 'Gurugram', 'Haryana', 'India', 'https://www.amity.edu/gurugram/', NOW(), NOW()),
  ('aff-gd-goenka-nursing', 'GD Goenka University', 'Department of Nursing', 'Gurgaon', 'Haryana', 'India', 'https://www.gdgoenkauniversity.com/', NOW(), NOW()),
  ('aff-amity-nutrition', 'Amity University Haryana', 'Department of Dietetics and Applied Nutrition', 'Gurugram', 'Haryana', 'India', 'https://www.amity.edu/gurugram/', NOW(), NOW()),
  ('aff-amity-media', 'Amity University Haryana', 'Media & Communication', 'Gurugram', 'Haryana', 'India', 'https://www.amity.edu/gurugram/', NOW(), NOW()),
  ('aff-sgt-clinical', 'SGT University', 'Department of Clinical Psychology, Faculty of Behavioural Sciences', 'Gurugram', 'Haryana', 'India', 'https://sgtuniversity.ac.in/', NOW(), NOW()),
  ('aff-amity-linguistics', 'Amity University Haryana', 'Liberal Arts & Linguistics', 'Gurugram', 'Haryana', 'India', 'https://www.amity.edu/gurugram/', NOW(), NOW()),
  ('aff-amity-law', 'Amity University', 'Department of Law', 'Gurugram', 'Haryana', 'India', 'https://www.amity.edu/', NOW(), NOW()),
  ('aff-amity-psychology', 'Amity University Haryana', 'Department of Psychology', 'Gurugram', 'Haryana', 'India', 'https://www.amity.edu/gurugram/', NOW(), NOW()),
  ('aff-galgotias-psychology', 'Galgotias University', 'Department of Psychology, School of Liberal Education', 'Greater Noida', 'Uttar Pradesh', 'India', 'https://www.galgotiasuniversity.edu.in/', NOW(), NOW()),
  ('aff-independent-ayurveda', 'Independent Practitioner', 'Ayurvedic Medicine & Integrative Women''s Healthcare', 'New Delhi', 'Delhi', 'India', NULL, NOW(), NOW()),
  ('aff-galgotias-political', 'Galgotias University', 'Dept of Political Science', 'Greater Noida', 'Uttar Pradesh', 'India', 'https://www.galgotiasuniversity.edu.in/', NOW(), NOW()),
  ('aff-vit-psychology', 'Vellore Institute of Technology', 'Department of Psychology', 'Vellore', 'Tamil Nadu', 'India', 'https://vit.ac.in/', NOW(), NOW()),
  ('aff-cuk-psychology', 'Central University of Karnataka', 'Dept. of Psychology', 'Kalaburagi', 'Karnataka', 'India', 'https://www.cuk.ac.in/', NOW(), NOW())
ON CONFLICT (institution, department, city, country)
DO UPDATE SET
  state = EXCLUDED.state,
  website = EXCLUDED.website,
  "updatedAt" = NOW();

UPDATE editorial_board SET "isActive" = false;

INSERT INTO editorial_board (
  id, "firstName", "lastName", title, email, role, position, designation, department,
  "affiliationId", country, orcid, biography, expertise, "profileImageUrl", website,
  "displayOrder", "isActive", "joinedDate", "createdAt", "updatedAt"
)
VALUES
(
  'board-priyanka-verma',
  'Priyanka', 'Verma', 'Dr.', 'dr.priyankapsychology@gmail.com, pverma1@ggn.amity.edu', 'EDITOR_IN_CHIEF', 'Editor-in-Chief',
  'Head of Institution & Associate Professor',
  'Amity Institute of Behavioural and Allied Sciences (AIBAS)',
  (SELECT id FROM affiliations WHERE institution = 'Amity University Haryana' AND department = 'Amity Institute of Behavioural and Allied Sciences (AIBAS)' AND city = 'Gurugram' AND country = 'India'),
  'India', NULL,
  'Dr. Priyanka Verma heads the Amity Institute of Behavioural and Allied Sciences (AIBAS) at Amity University Haryana. She established a Centre of Excellence for Psychometric Testing and holds three design patents in mental health innovation, including a VR Device for Mental Health Diagnostics.',
  ARRAY['Counselling Psychology','Positive Psychology','Psychometric Testing','Organisational Behaviour','Mental Health']::text[],
  '/editorial-board/dr_priyanka.jpeg', NULL, 1, true, NOW(), NOW(), NOW()
),
(
  'board-anu-gauba',
  'Anu', 'Gauba', 'Dr.', 'anu.gauba@gdgoenka.ac.in', 'EDITORIAL_BOARD_MEMBER', 'Editorial Board Member',
  'Founder Principal, Department of Nursing',
  'Department of Nursing',
  (SELECT id FROM affiliations WHERE institution = 'GD Goenka University' AND department = 'Department of Nursing' AND city = 'Gurgaon' AND country = 'India'),
  'India', NULL,
  'Dr. Anu Gauba is a distinguished nursing educator and public health advocate with over two decades of experience. She holds the Chancellor''s Gold Medal for Best PhD Thesis from the National Institute of Medical Sciences University, Jaipur, and has authored multiple academic publications including a monograph by Lambert Publications (UK).',
  ARRAY['Nursing Education','Public Health','Community Medicine','Health Training & Policy','Research']::text[],
  '/editorial-board/dr_annu.jpeg', NULL, 2, true, NOW(), NOW(), NOW()
),
(
  'board-pcs-devara',
  'Panuganti C.S.', 'Devara', 'Prof. (Dr.)', 'pcsdevara@ggn.amity.edu', 'EDITORIAL_BOARD_MEMBER', 'Editorial Board Member',
  'Director, Professor & Head — ACOAST, ACESH & ACAPC',
  'Centres of Excellence in Ocean-Atmospheric Science and Technology',
  (SELECT id FROM affiliations WHERE institution = 'Amity University Haryana' AND department = 'Centres of Excellence in Ocean-Atmospheric Science and Technology' AND city = 'Gurugram' AND country = 'India'),
  'India', '0000-0002-2852-2017',
  'Prof. Devara is an internationally recognised authority in atmospheric and environmental sciences with over four decades of sustained scientific contribution. A Fellow of the Royal Meteorological Society (UK) and Expert Reviewer for IPCC, he has authored over 585 research papers and supervised 12 doctoral scholars.',
  ARRAY['Atmospheric Science','Remote Sensing','Climate & Weather','Air Pollution Control','Ocean Science']::text[],
  '/editorial-board/prof-devara.jpeg', NULL, 3, true, NOW(), NOW(), NOW()
),
(
  'board-pallavi-beri',
  'Pallavi', 'Beri', 'Dr.', 'pallavi.beri@galgotiasuniversity.edu.in', 'EDITORIAL_BOARD_MEMBER', 'Editorial Board Member',
  'Program Chair & Associate Professor',
  'Dept of Political Science',
  (SELECT id FROM affiliations WHERE institution = 'Galgotias University' AND department = 'Dept of Political Science' AND city = 'Greater Noida' AND country = 'India'),
  'India', NULL,
  'Dr. Pallavi Beri is the Program Chair and Associate Professor in the Dept of Political Science at Galgotias University. She is the Principal Investigator for an ICSSR Project on Women-led Development. With over 11 years of teaching experience, she holds an M.A, M.Phil, and PhD in Political Science from JNU, and a BA from Delhi University. She has multiple publications with reputed Scopus indexed publishers and regularly chairs and presents at international conferences.',
  ARRAY['Political Science', 'Women-led Development']::text[],
  '/editorial-board/dr_pallavi.jpeg', NULL, 4, true, NOW(), NOW(), NOW()
),
(
  'board-luxita-sharma',
  'Luxita', 'Sharma', 'Prof. (Dr.)', 'lsharma@ggn.amity.edu', 'EDITORIAL_BOARD_MEMBER', 'Editorial Board Member',
  'Associate Professor & Officiating Director, Amity Medical School; Head, Department of Dietetics and Applied Nutrition',
  'Department of Dietetics and Applied Nutrition',
  (SELECT id FROM affiliations WHERE institution = 'Amity University Haryana' AND department = 'Department of Dietetics and Applied Nutrition' AND city = 'Gurugram' AND country = 'India'),
  'India', NULL,
  'Dr. Luxita Sharma is one of India''s most prolific scholars in nutritional sciences with over two decades of experience. She has authored 18 books published by Wiley, CRC Press, and Springer, contributed over 118 research papers, and holds 10 patents. Her h-index of 9 reflects the sustained reach of her scholarly contributions.',
  ARRAY['Clinical Nutrition','Functional Foods','Food Product Development','Obesity & Metabolic Health','Psycho-Nutrition']::text[],
  '/editorial-board/dr_luxita.jpeg', NULL, 5, true, NOW(), NOW(), NOW()
),
(
  'board-tanu-kukreja',
  'Tanu Kukreja', 'Bhayana', 'Dr.', 'tanu.kukreja@vit.ac.in', 'EDITORIAL_BOARD_MEMBER', 'Editorial Board Member',
  'Associate Professor',
  'Department of Psychology',
  (SELECT id FROM affiliations WHERE institution = 'Vellore Institute of Technology' AND department = 'Department of Psychology' AND city = 'Vellore' AND country = 'India'),
  'India', NULL,
  'Dr. Tanu Kukreja Bhayana is an Associate Professor at Vellore Institute of Technology, Vellore. She has over 13 years of experience in teaching and research. Dr. Kukreja has one patent filed, 18 publications, and has presented 20+ research papers. She is an international affiliate with the APA and a reviewer for Springer''s ''Journal of Autism and Developmental Disorder''. She holds a master''s and doctorate in psychology from GJU, Haryana, an MBA (HR), and is certified in training and management of learning disabled.',
  ARRAY['Mental Health Literacy', 'Emotion Regulation', 'Child and Adolescent Mental Health', 'Workplace Spirituality']::text[],
  '/editorial-board/dr_tanu.jpeg', NULL, 6, true, NOW(), NOW(), NOW()
),
(
  'board-pooja-rana',
  'Pooja', 'Rana', 'Dr.', 'prana@ggn.amity.edu', 'EDITORIAL_BOARD_MEMBER', 'Editorial Board Member',
  'Professor & Head, PhD Programme',
  'Media & Communication',
  (SELECT id FROM affiliations WHERE institution = 'Amity University Haryana' AND department = 'Media & Communication' AND city = 'Gurugram' AND country = 'India'),
  'India', NULL,
  'Dr. Pooja Rana is a Professor and PhD Programme Head at Amity University Haryana with over two decades of distinguished experience. An award-winning scholar, she has authored several academic books on journalism and media studies widely referenced in higher education curricula across India.',
  ARRAY['Media & Communication','Digital Media Governance','Journalism Studies','Communication Policy','Media Management']::text[],
  '/editorial-board/Dr_pooja_rana.jpeg', NULL, 7, true, NOW(), NOW(), NOW()
),
(
  'board-vikas-sharma',
  'Vikas', 'Sharma', 'Dr.', 'vikas.sharma@sgtuniversity.org', 'EDITORIAL_BOARD_MEMBER', 'Editorial Board Member',
  'Associate Professor & Head, Department of Clinical Psychology',
  'Department of Clinical Psychology, Faculty of Behavioural Sciences',
  (SELECT id FROM affiliations WHERE institution = 'SGT University' AND department = 'Department of Clinical Psychology, Faculty of Behavioural Sciences' AND city = 'Gurugram' AND country = 'India'),
  'India', NULL,
  'Dr. Vikas Sharma holds an M.Phil. in Clinical Psychology from IHBAS, New Delhi and a Doctorate from the University of Delhi. He has published over 50 research papers and is a member of the Indian Association of Clinical Psychologists (IACP) and the Indian Society of Sleep Research.',
  ARRAY['Clinical Psychology','Cognitive Behaviour Therapy','Behavioural Medicine','Sleep Research','Psychological Assessment']::text[],
  '/editorial-board/dr_vikas.jpeg', NULL, 8, true, NOW(), NOW(), NOW()
),
(
  'board-sanjay-jha',
  'Sanjay K.', 'Jha', 'Prof. (Dr.)', 'skjha@ggn.amity.edu', 'EDITORIAL_BOARD_MEMBER', 'Editorial Board Member',
  'Director of Liberal Arts; Professor of Linguistics; Head, Amity Centre for Sanskrit and Indic Studies',
  'Liberal Arts & Linguistics',
  (SELECT id FROM affiliations WHERE institution = 'Amity University Haryana' AND department = 'Liberal Arts & Linguistics' AND city = 'Gurugram' AND country = 'India'),
  'India', NULL,
  'Prof. Sanjay K. Jha is a scholar of exceptional intellectual range — a linguist, polyglot, and institution builder. Proficient in 10 Indian and 5 foreign languages, he has published over 200 research papers, 9 books, and is Chief Editor of four international journals. He is the recipient of 23 prestigious awards.',
  ARRAY['Applied Linguistics','Sanskrit & Indic Studies','Computational Linguistics','Indian Knowledge Systems','Machine Translation']::text[],
  '/editorial-board/dr_sanjay.jpeg', NULL, 9, true, NOW(), NOW(), NOW()
),
(
  'board-ravinder-kumar',
  'Ravinder', 'Kumar', 'Dr.', 'ravinderkumar@cuk.ac.in', 'EDITORIAL_BOARD_MEMBER', 'Editorial Board Member',
  'Assistant Professor',
  'Dept. of Psychology',
  (SELECT id FROM affiliations WHERE institution = 'Central University of Karnataka' AND department = 'Dept. of Psychology' AND city = 'Kalaburagi' AND country = 'India'),
  'India', NULL,
  'Dr. Ravinder Kumar is an Assistant Professor in the Dept. of Psychology at Central University of Karnataka, Kalaburagi.',
  ARRAY['Psychology']::text[],
  '/editorial-board/dr_ravinder.jpeg', NULL, 10, true, NOW(), NOW(), NOW()
),
(
  'board-neha-mishra',
  'Neha', 'Mishra', 'Dr.', 'neha.mishra@amity.edu', 'EDITORIAL_BOARD_MEMBER', 'Editorial Board Member',
  'Assistant Professor of Law',
  'Department of Law',
  (SELECT id FROM affiliations WHERE institution = 'Amity University' AND department = 'Department of Law' AND city = 'Gurugram' AND country = 'India'),
  'India', NULL,
  'Dr. Neha Mishra, LL.M., NET, Ph.D., is a legal scholar with over 12 years of professional experience, including 9 years of dedicated academic service. She specialises in Criminal Law with a focused research agenda encompassing public interest litigation and judicial activism.',
  ARRAY['Criminal Law','Public Interest Litigation','Judicial Activism','Comparative Law','Legal Scholarship']::text[],
  '/editorial-board/dr_neha.jpeg', NULL, 11, true, NOW(), NOW(), NOW()
),
(
  'board-alka-pandey',
  'Alka', 'Pandey', 'Dr.', 'alka.pandey@galgotiasuniversity.edu.in', 'EDITORIAL_BOARD_MEMBER', 'Editorial Board Member',
  'Assistant Professor, Department of Psychology',
  'Department of Psychology, School of Liberal Education',
  (SELECT id FROM affiliations WHERE institution = 'Galgotias University' AND department = 'Department of Psychology, School of Liberal Education' AND city = 'Greater Noida' AND country = 'India'),
  'India', NULL,
  'Dr. Alka Pandey holds a PhD in Child Guidance and Family Counselling and a Post-Doctoral Fellowship from G.B. Pant University. She is a recipient of the ICAR-Junior Research Fellowship at All India 1st Rank, UGC-NET, and the Young Scientist Award. She has over 40 publications in Scopus-indexed journals.',
  ARRAY['Child Guidance & Counselling','Clinical Psychology','Human Development','Mental Health','Life Skills Training']::text[],
  '/editorial-board/dr-alka-pandey.png', NULL, 12, true, NOW(), NOW(), NOW()
),
(
  'board-akshay-ohlan',
  'Akshay', 'Ohlan', 'Dr.', 'aohlan@ggn.amity.edu', 'EDITORIAL_BOARD_MEMBER', 'Editorial Board Member',
  'Assistant Professor of Psychology',
  'Department of Psychology',
  (SELECT id FROM affiliations WHERE institution = 'Amity University Haryana' AND department = 'Department of Psychology' AND city = 'Gurugram' AND country = 'India'),
  'India', NULL,
  'Dr. Akshay Ohlan holds a PhD in Psychology from Guru Jambheshwar University and is a five-time UGC-NET qualified academician. His research spans positive psychology, neuropsychology, and suicide prevention. His publications appear in Scopus- and UGC-CARE-indexed journals.',
  ARRAY['Positive Psychology','Neuropsychology','Suicide Prevention','Mental Health','Biopsychology']::text[],
  '/editorial-board/dr-akshay.jpeg', NULL, 13, true, NOW(), NOW(), NOW()
),
(
  'board-ashwarya-raj-laxmi',
  'Ashwarya Raj', 'Laxmi', 'Dr.', 'ashwarya.rajlaxmi@gmail.com', 'EDITORIAL_BOARD_MEMBER', 'Editorial Board Member',
  'Research Medical Officer & Ayurvedic Physician; MS Scholar, Prasuti Tantra evum Stree Roga',
  'Ayurvedic Medicine & Integrative Women''s Healthcare',
  (SELECT id FROM affiliations WHERE institution = 'Independent Practitioner' AND department = 'Ayurvedic Medicine & Integrative Women''s Healthcare' AND city = 'New Delhi' AND country = 'India'),
  'India', NULL,
  'Dr. Ashwarya Raj Laxmi is a qualified Ayurvedic physician and clinical researcher specialising in Prasuti Tantra evum Stree Roga (Obstetrics & Gynaecology). Her practice integrates classical Shastraic knowledge with contemporary clinical protocols for women''s healthcare.',
  ARRAY['Ayurvedic Medicine','Women''s Health','Clinical Obstetrics','Integrative Healthcare','Nutritional Counselling']::text[],
  '/editorial-board/dr_aishwarya.jpeg', NULL, 14, true, NOW(), NOW(), NOW()
)
ON CONFLICT (id) DO UPDATE SET
  "firstName" = EXCLUDED."firstName",
  "lastName" = EXCLUDED."lastName",
  title = EXCLUDED.title,
  email = EXCLUDED.email,
  role = EXCLUDED.role,
  position = EXCLUDED.position,
  designation = EXCLUDED.designation,
  department = EXCLUDED.department,
  "affiliationId" = EXCLUDED."affiliationId",
  country = EXCLUDED.country,
  orcid = EXCLUDED.orcid,
  biography = EXCLUDED.biography,
  expertise = EXCLUDED.expertise,
  "profileImageUrl" = EXCLUDED."profileImageUrl",
  website = EXCLUDED.website,
  "displayOrder" = EXCLUDED."displayOrder",
  "isActive" = EXCLUDED."isActive",
  "updatedAt" = NOW();

COMMIT;
