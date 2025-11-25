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
  | 'equipment'
  | 'supplies'
  | 'vehicle'
  | 'legal'
  | 'marketing'
  | 'operations';

export const CATEGORY_LABELS: Record<TaskCategory, string> = {
  equipment: 'Equipment & Tools',
  supplies: 'Cleaning Supplies',
  vehicle: 'Vehicle Setup',
  legal: 'Legal & Insurance',
  marketing: 'Marketing & Branding',
  operations: 'Business Operations',
};
