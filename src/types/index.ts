export type ServiceCategory = 
  | 'etudes'
  | 'construction'
  | 'renovation'
  | 'tp'
  | 'genie_civil'
  | 'amenagement';

export interface ServiceItem {
  id: string;
  category: ServiceCategory;
  number: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  highlights: string[];
  deliverables: string[];
  iconName: string;
  imagePath?: string;
}

export type ProjectFilter = 'all' | 'batiment' | 'tp_genie_civil' | 'renovation' | 'etudes';

export interface ProjectItem {
  id: string;
  title: string;
  category: ProjectFilter;
  categoryLabel: string;
  location: string;
  surface?: string;
  completionYear?: string;
  isIllustrative: boolean; // True if reference illustration, False if actual monitored build
  statusBadge?: string;
  imagePosition?: string;
  description: string;
  specs: { label: string; value: string }[];
  imagePath: string;
  altText: string;
}

export interface CommitmentItem {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  points: string[];
  iconName: string;
}

export interface QuoteFormData {
  fullName: string;
  phone: string;
  email: string;
  projectType: string;
  location: string;
  estimatedBudget: string;
  timeframe: string;
  description: string;
}

export interface QuoteSubmissionResult extends QuoteFormData {
  quoteReference: string;
  submittedAt: string;
}
