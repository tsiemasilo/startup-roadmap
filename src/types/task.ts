export interface Task {
  id: string;
  title: string;
  description: string;
  category: TaskCategory;
  deadline: Date;
  completed: boolean;
  completedAt?: Date;
  priority: 'low' | 'medium' | 'high';
}

export type TaskCategory = 
  | 'legal'
  | 'funding'
  | 'product'
  | 'marketing'
  | 'operations'
  | 'team';

export const CATEGORY_LABELS: Record<TaskCategory, string> = {
  legal: 'Legal & Compliance',
  funding: 'Funding & Finance',
  product: 'Product Development',
  marketing: 'Marketing & Branding',
  operations: 'Operations',
  team: 'Team Building',
};
