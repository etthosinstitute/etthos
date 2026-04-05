import { cache } from "react";
import { homeContent } from "../../content/home";
import { aboutContent } from "../../content/about";
import { aimsScopeContent } from "../../content/aims-scope";
import { guidelinesContent } from "../../content/guidelines";
import { policiesContent } from "../../content/policies";
import { contactContent } from "../../content/contact";
import { publisherContent } from "../../content/publisher";

export const getHomeContent = cache(async () => ({
  title: "Home",
  description: "Welcome to the Etthos Journal",
  content: homeContent,
}));

export const getAboutContent = cache(async () => ({
  title: "About",
  description: "About the Etthos Journal",
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
