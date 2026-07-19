import type { HomeContent } from "../types";

export const homeContent: HomeContent = {
  eyebrow: "Peer-Reviewed · Open Access · Quarterly",
  heroDescription:
    "Peer-reviewed, open access research on psychology, health, and human behavior, and the fields that shape them.",
  heroNotice: "Now accepting submissions for our upcoming issue.",
  profileCards: [
    {
      title: "For Authors",
      subtitle: "Author Guidelines, submission process, and APC information",
      icon: "book-open",
    },
    {
      title: "For Reviewers",
      subtitle: "Peer Review Policy and reviewer expectations",
      icon: "shield",
    },
    {
      title: "For Readers",
      subtitle: "Latest Articles and open access terms",
      icon: "globe",
    },
    {
      title: "For Editors",
      subtitle: "Editorial Board and governance",
      icon: "brain",
    },
  ],
  features: [
    {
      eyebrow: "Peer Review",
      title: "Rigorous Peer Review",
      description:
        "Every submission undergoes double-blind peer review by at least two independent subject-matter experts before any publication decision is made.",
      icon: "shield",
    },
    {
      eyebrow: "Open Access",
      title: "Open & Discoverable",
      description:
        "Every accepted article receives a Crossref DOI and is published under a CC BY 4.0 open access license, freely readable, citable, and reusable worldwide from day one, with no paywall or subscription barrier.",
      icon: "globe",
    },
    {
      eyebrow: "Editorial Policy",
      title: "Editorial Independence",
      description:
        "Publication decisions are made solely by our Editor-in-Chief and Editorial Board, independent of the publisher's business operations.",
      icon: "brain",
    },
  ],
};
