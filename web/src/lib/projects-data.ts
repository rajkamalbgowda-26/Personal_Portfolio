import { Project } from "./api-client";

export interface ExtendedProject extends Project {
  shortTitle: string;
  tagline: string;
  keyHighlights: string[];
  categorizedStack: {
    category: string;
    items: string[];
  }[];
  screenshots: {
    title: string;
    caption: string;
    url: string;
  }[];
}

export const FLAGSHIP_PROJECTS: ExtendedProject[] = [];

export function getProjectBySlug(slug: string): ExtendedProject | undefined {
  return FLAGSHIP_PROJECTS.find((p) => p.slug.toLowerCase() === slug.toLowerCase());
}
