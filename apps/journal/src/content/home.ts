import type { HomeContent } from "../lib/public-site";

export const homeContent: HomeContent = {
  eyebrow: "Welcome to",
  heroDescription: "An open-access, peer-reviewed journal dedicated to advancing the field of psychology and behavioural sciences through rigorous research and theoretical innovation.",
  heroNotice: "Now accepting submissions for our upcoming issue.",
  profileCards: [
    { title: "Authors", subtitle: "Submit your research", icon: "book-open" },
    { title: "Reviewers", subtitle: "Join our peer review board", icon: "shield" },
    { title: "Readers", subtitle: "Explore published articles", icon: "globe" },
    { title: "Editors", subtitle: "Manage the review process", icon: "brain" },
  ],
  features: [
    { eyebrow: "Peer Review", title: "Rigorous Evaluation", description: "All submissions undergo a double-blind peer review process to ensure high-quality publications.", icon: "shield" },
    { eyebrow: "Open Access", title: "Global Reach", description: "Our open-access policy ensures that your research is accessible to anyone anywhere.", icon: "globe" },
    { eyebrow: "Fast Publication", title: "Rapid Turnaround", description: "We strive to provide authors with quick decisions without compromising review quality.", icon: "brain" },
  ],
};
