export interface Experience {
  title: string;
  company: string;
  startDate: string;
  endDate?: string;
}

export interface Education {
  degree: string;
  institution: string;
  startYear: string;
  endYear?: string;
}

export interface Certification {
  name: string;
  organization: string;
  issueDate: string;
}

export const experiences: Experience[] = [];
export const educations: Education[] = [];
export const certifications: Certification[] = [];