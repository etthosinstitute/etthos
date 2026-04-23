import type { JournalInfo } from "./types";

export const JOURNAL_INFO_DEFAULTS: JournalInfo = {
  id: "frontend-default",
  name: "Etthos Journal Of Health, Behavior and Applied Psychology",
  shortName: "EJHBAP",
  description:
    "Etthos Journal Of Health, Behavior and Applied Psychology (EJHBAP) is a peer-reviewed, open-access academic journal published by Etthos Journal Of Health, Behavior and Applied Psychology pvt ltd, dedicated to advancing research in psychology and behavioural sciences.",
  issn: null,
  eissn: null,
  publisher: "Etthos Journal Of Health, Behavior and Applied Psychology pvt ltd",
  frequency: "Quarterly",
  language: "English",
  country: "India",
  websiteUrl: "https://journal.etthos.com",
  mainWebsiteUrl: "https://etthos.com",
  contactEmail: "editor@journal.etthos.com",
  infoEmail: "editor@journal.etthos.com",
  phone: null,
  subjectArea: "Psychology",
  subjectAreas: [
    "Clinical Psychology",
    "Counselling Psychology",
    "Neuropsychology",
    "Applied Behavioural Sciences",
    "Mental Health",
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
  titleLineOne: "Etthos Journal Of",
  titleLineTwo: "Health, Behavior and Applied Psychology",
};
