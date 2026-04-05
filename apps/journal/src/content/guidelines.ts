import type { GuidelinesContent } from "../features/public-site/types";

export const guidelinesContent: GuidelinesContent = {
  sections: [
    {
      title: "General Formatting",
      paragraphs: ["All manuscripts must follow the APA formatting style. Manuscripts should be submitted in Word format (.doc or .docx)."],
      listType: "bullet",
      items: ["Font size must be 12-point.", "Double-spaced throughout.", "Margins should be at least 1 inch on all sides."],
    },
    {
      title: "Title Page",
      paragraphs: ["The title page must include the title of the article, authors' names, and complete affiliations."],
    },
  ],
  resources: [
    { title: "APA Style Guide", description: "Official APA formatting resources and tutorials.", icon: "file-text", href: "https://apastyle.apa.org/", ctaLabel: "View Guide" },
    { title: "Author Toolkit", description: "Templates and tools to help format your submission.", icon: "check-circle", href: "#", ctaLabel: "Download Toolkit" },
  ],
};
