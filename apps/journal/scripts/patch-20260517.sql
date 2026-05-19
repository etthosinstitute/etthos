BEGIN;

-- 1. Update journal metadata
UPDATE journals
SET
  publisher            = 'Etthos Institute of Behavioral Research and Training Pvt Ltd',
  "subjectArea"        = 'Interdisciplinary',
  "subjectKeywords"    = ARRAY[
    'Clinical Psychology',
    'Positive Psychology',
    'Neuropsychology',
    'Developmental Psychology',
    'Counselling Psychology',
    'Forensic Psychology',
    'Educational Psychology',
    'Applied Psychology',
    'Health Psychology',
    'Cognitive Psychology',
    'Psychiatry',
    'Medicine',
    'Dietetics & Applied Nutrition',
    'Environment',
    'Journalism',
    'Law',
    'Liberal Arts',
    'Linguistics',
    'Nursing',
    'Media & Communication',
    'Ayurveda',
    'Yoga Science'
  ]::text[]
WHERE id = 'journal-singleton';

-- 2. Reposition Dr. Ashwarya Raj Laxmi to 2nd, shift everyone else down
UPDATE editorial_board SET "displayOrder" = 3  WHERE id = 'board-anu-gauba';
UPDATE editorial_board SET "displayOrder" = 4  WHERE id = 'board-pcs-devara';
UPDATE editorial_board SET "displayOrder" = 5  WHERE id = 'board-pallavi-beri';
UPDATE editorial_board SET "displayOrder" = 6  WHERE id = 'board-luxita-sharma';
UPDATE editorial_board SET "displayOrder" = 7  WHERE id = 'board-tanu-kukreja';
UPDATE editorial_board SET "displayOrder" = 8  WHERE id = 'board-pooja-rana';
UPDATE editorial_board SET "displayOrder" = 9  WHERE id = 'board-vikas-sharma';
UPDATE editorial_board SET "displayOrder" = 10 WHERE id = 'board-sanjay-jha';
UPDATE editorial_board SET "displayOrder" = 11 WHERE id = 'board-ravinder-kumar';
UPDATE editorial_board SET "displayOrder" = 12 WHERE id = 'board-neha-mishra';
UPDATE editorial_board SET "displayOrder" = 13 WHERE id = 'board-alka-pandey';
UPDATE editorial_board SET "displayOrder" = 14 WHERE id = 'board-akshay-ohlan';
UPDATE editorial_board SET "displayOrder" = 2  WHERE id = 'board-ashwarya-raj-laxmi';

COMMIT;
