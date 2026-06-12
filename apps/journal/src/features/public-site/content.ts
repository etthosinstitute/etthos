import { cache } from "react";
import { homeContent } from "./data/home";
import { aboutContent } from "./data/about";
import { aimsScopeContent } from "./data/aims-scope";
import { guidelinesContent } from "./data/guidelines";
import { policiesContent } from "./data/policies";
import { contactContent } from "./data/contact";
import { publisherContent } from "./data/publisher";

export const getHomeContent = cache(async () => ({
  title: "Home",
  description:
    "Welcome to the Etthos Journal of Health, Behavior and Applied Psychology",
  content: homeContent,
}));

export const getAboutContent = cache(async () => ({
  title: "About",
  description:
    "About the Etthos Journal of Health, Behavior and Applied Psychology",
  content: aboutContent,
}));

export const getAimsScopeContent = cache(async () => ({
  title: "Aims & Scope",
  description: "Discover the aims and scope of our journal",
  content: aimsScopeContent,
}));

export const getGuidelinesContent = cache(async () => ({
  title: "Guidelines",
  description: "Submission guidelines for authors",
  content: guidelinesContent,
}));

export const getPoliciesContent = cache(async () => ({
  title: "Policies",
  description: "Editorial and publication policies",
  content: policiesContent,
}));

export const getContactContent = cache(async () => ({
  title: "Contact",
  description: "Get in touch with us",
  content: contactContent,
}));

export const getPublisherContent = cache(async () => ({
  title: "Publisher",
  description: "Information about the publisher",
  content: publisherContent,
}));
