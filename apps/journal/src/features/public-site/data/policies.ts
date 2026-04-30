import type { PoliciesContent } from "../types";

export const policiesContent: PoliciesContent = {
  sections: [
    {
      id: "open-access",
      title: "Open Access Policy",
      icon: "lock",
      paragraphs: ["All articles published by Etthos Journal of Health, Behavior and Applied Psychology pvt ltd are made immediately available worldwide under an open access license. This means everyone has free and unlimited access to the full-text of all articles published in Etthos Journal of Health, Behavior and Applied Psychology pvt ltd journals."],
      bullets: ["Free availability on the public internet.", "Permitting any users to read, download, copy, distribute, print, search, or link to the full texts of these articles."],
    },
    {
      id: "peer-review",
      title: "Peer Review Policy",
      icon: "check",
      paragraphs: ["Etthos Journal of Health, Behavior and Applied Psychology pvt ltd employs a rigorous double-blind peer review process to ensure the quality and validity of published research. Both reviewers and authors remain anonymous throughout the process."],
    },
    {
      id: "ethics",
      title: "Publication Ethics",
      icon: "shield",
      paragraphs: ["We are committed to upholding the highest standards of publication ethics and take all possible measures against any publication malpractices."],
    },
  ],
};
