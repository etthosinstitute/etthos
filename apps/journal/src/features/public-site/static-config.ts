import type { JournalInfo } from "./types";

export const JOURNAL_INFO_DEFAULTS: JournalInfo = {
  id: "frontend-default",
  name: "Etthos Journal of Health, Behavior and Applied Psychology",
  shortName: "EJHBAP",
  description:
    "Etthos Journal of Health, Behavior and Applied Psychology (EJHBAP) is a peer-reviewed, open-access academic journal published by Etthos Journal of Health, Behavior and Applied Psychology pvt ltd, dedicated to advancing research in psychology and behavioural sciences.",
  issn: null,
  eissn: null,
  publisher: "Etthos Journal of Health, Behavior and Applied Psychology pvt ltd",
  frequency: "Quarterly",
  language: "English",
  country: "India",
  websiteUrl: "https://etthosjournal.com",
  mainWebsiteUrl: "https://etthos.com",
  contactEmail: "info@etthos.com",
  infoEmail: "info@etthos.com",
  phone: null,
  subjectArea: "Multidisciplinary",
  subjectAreas: [
    "Clinical Psychology",
    "Positive Psychology",
    "Neuropsychology",
    "Developmental Psychology",
    "Counselling Psychology",
    "Forensic Psychology",
    "Educational Psychology",
    "Applied Psychology",
    "Health Psychology",
    "Cognitive Psychology",
    "Psychiatry",
    "Medicine",
    "Dietetics & Applied Nutrition",
    "Environment",
    "Journalism",
    "Law",
    "Liberal Arts",
    "Linguistics",
    "Nursing",
    "Oceanography",
    "Media & Communication",
    "Ayurveda",
    "Yoga Science",
  ],
  accessPolicy: "Open Access",
  reviewModel: "Double-Blind Peer Review",
  license: "CC BY 4.0",
  establishedYear: null,
  registeredOffice: {
    label: "Registered Office",
    address: "India",
  },
  corporateOffice: null,
};

export const EDITORIAL_IMAGE_OVERRIDES: Record<string, string> = {
  "board-vikas-sharma": "/editorial-board/dr_vikas.jpeg",
};

export const HERO_CONFIG = {
  titleLineOne: "Etthos Journal",
  titleLineTwo: "Health, Behavior and Applied Psychology",
};
