export type TimeOfDay = 'dusk' | 'night';

export type NavSection =
  | 'home'
  | 'about'
  | 'skills'
  | 'projects'
  | 'experience'
  | 'achievements'
  | 'certificates';

export interface NavItemConfig {
  id: NavSection;
  label: string;
  isImplemented: boolean;
  statusHint?: string;
}

export interface PlayerProfile {
  name: string;
  fullName: string;
  degree: string;
  semester: string;
  institution: string;
  expectedGraduation: number;
  currentRole: string;
  developerInterests: string[];
  languages: string[];
  headline: string;
}

export type SkillCategory =
  | 'all'
  | 'languages'
  | 'frontend'
  | 'backend'
  | 'databases'
  | 'ai_ml'
  | 'tools';

export type SkillSource = 'resume' | 'project';

export interface SkillItem {
  id: string;
  name: string;
  category: SkillCategory;
  categoryLabel: string;
  source: SkillSource;
  sourceLabel: string;
  description: string;
  tag: string;
}

export type ProjectCategory =
  | 'all'
  | 'full_stack'
  | 'ai_ml'
  | 'computer_vision'
  | 'web_dev';

export type ProjectStatus =
  | 'Prototype / In Progress'
  | 'Ongoing Project'
  | 'Implemented Project'
  | 'Project Implementation'
  | 'Frontend Project';

export interface ProjectItem {
  id: string;
  title: string;
  locationCode: string;
  categories: ProjectCategory[];
  categoryDisplay: string;
  status: ProjectStatus;
  statusType: 'prototype' | 'ongoing' | 'implemented';
  summary: string;
  problemAddressed: string;
  technicalContribution: string;
  implementationDetails: string;
  technologies: string[];
  githubUrl?: string;
  demoUrl?: string;
  voxelIconType: 'warehouse' | 'citadel' | 'document' | 'agent' | 'vision' | 'arena' | 'market';
}

export type CameraPreset = 'cinematic' | 'house' | 'waterfall' | 'mountains' | 'topdown';

export interface CameraViewConfig {
  id: CameraPreset;
  name: string;
  subtitle: string;
  position: [number, number, number];
  target: [number, number, number];
}

export type PerformanceTier = 'high' | 'medium' | 'low';

export interface WorldSettings {
  shadows: boolean;
  dpr: number;
  particlesCount: number;
  cloudsCount: number;
  waterReflections: boolean;
}

export interface InternshipDetails {
  organization: string;
  role: string;
  workMode: string;
  duration: string;
  employmentType: string;
  status: string;
  assignedProject: {
    title: string;
    organization: string;
    status: string;
    description: string;
  };
  overview: string;
  listedResponsibilities: string[];
}

export interface AcademicMilestone {
  degree: string;
  institution: string;
  semester: string;
  expectedGraduation: number;
  status: string;
  focusAreas: string[];
}

export type AchievementType = 'award' | 'participation';

export interface AchievementItem {
  id: string;
  advancementCode: string;
  title: string;
  event: string;
  activity?: string;
  recognition: string;
  organization?: string;
  institutionContext?: string;
  venue?: string;
  dates?: string;
  team?: string;
  organizer?: string;
  type: AchievementType;
  isFeatured?: boolean;
  description: string;
  verifiedDetails: string[];
}

export interface AdditionalActivityItem {
  id: string;
  title: string;
  event: string;
  recognition: string;
  venueOrContext?: string;
  yearOrPeriod?: string;
  type: AchievementType;
  description: string;
}


