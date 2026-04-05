export interface HomeContent {
  eyebrow: string;
  heroDescription: string;
  heroNotice: string;
  profileCards: {
    title: string;
    subtitle: string;
    icon: "book-open" | "shield" | "globe" | "brain";
  }[];
  features: {
    eyebrow: string;
    title: string;
    description: string;
    icon: "book-open" | "shield" | "globe" | "brain";
  }[];
}

export interface AboutContent {
  overviewParagraphs: string[];
  foundersTitle: string;
  foundersDescription: string;
  founders: {
    name: string;
    role: string;
    image: string;
  }[];
  aimsIntro: string;
  publicationFrequencyText: string;
  submitCtaTitle: string;
  submitCtaDescription: string;
}

export interface AimsScopeContent {
  aimsParagraphs: string[];
  articleTypes: {
    title: string;
    description: string;
  }[];
}

export interface GuidelinesContent {
  sections: {
    title: string;
    paragraphs?: string[];
    listType?: "bullet" | "numbered";
    items?: string[];
  }[];
  resources: {
    title: string;
    description: string;
    icon: "file-text" | "check-circle";
    href: string;
    ctaLabel: string;
  }[];
}

export interface PoliciesContent {
  sections: {
    id: string;
    title: string;
    icon: "check" | "shield" | "lock" | "file-text";
    paragraphs: string[];
    bullets?: string[];
  }[];
}

export interface ContactContent {
  formIntro: string;
  subjects: string[];
  successMessage: string;
}

export interface PublisherContent {
  introParagraphs: string[];
}

export type JournalInfo = {
  id: string;
  name: string;
  shortName: string;
  description: string;
  issn: string | null;
  eissn: string | null;
  publisher: string;
  frequency: string;
  language: string;
  country: string;
  websiteUrl: string;
  mainWebsiteUrl: string;
  contactEmail: string;
  infoEmail: string;
  phone: string | null;
  subjectArea: string;
  subjectAreas: string[];
  accessPolicy: string;
  reviewModel: string;
  license: string;
  establishedYear: number | null;
  registeredOffice: {
    label: string;
    address: string;
  };
  corporateOffice: {
    label: string;
    address: string;
  } | null;
};

export type PublicArticle = {
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
  publishedDate: string;
  type: string;
  volume: number;
  issue: number;
  doi: string | null;
  pdfUrl?: string | null;
  pageStart?: number | null;
  pageEnd?: number | null;
  references?: { text: string; doi?: string | null }[];
};

export type PublicIssue = {
  slug: string;
  volume: number;
  issue: number;
  title?: string | null;
  month: string;
  year: number;
  published: boolean;
  publishedDate?: string | null;
  articleCount: number;
  description?: string | null;
};

export type PublicBoardMember = {
  id: string;
  slug: string;
  name: string;
  title: string | null;
  role: string;
  designation: string;
  department: string;
  institution: string;
  email: string;
  country: string;
  image: string | null;
  orcid?: string | null;
  expertise: string[];
  biography: string | null;
  displayOrder: number;
};
