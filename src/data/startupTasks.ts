import { Task } from '@/types/task';

export const initialStartupTasks: Task[] = [
  // Legal & Compliance
  {
    id: '1',
    title: 'Register Business Entity',
    description: 'Choose and register your business structure (LLC, Corporation, etc.)',
    category: 'legal',
    deadline: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 2 weeks
    completed: false,
    priority: 'high',
  },
  {
    id: '2',
    title: 'Obtain EIN',
    description: 'Apply for Employer Identification Number from IRS',
    category: 'legal',
    deadline: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000), // 3 weeks
    completed: false,
    priority: 'high',
  },
  {
    id: '3',
    title: 'Business Licenses & Permits',
    description: 'Research and obtain necessary local and state business licenses',
    category: 'legal',
    deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 1 month
    completed: false,
    priority: 'medium',
  },
  {
    id: '4',
    title: 'Trademark Registration',
    description: 'File trademark application for brand name and logo',
    category: 'legal',
    deadline: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000), // 1.5 months
    completed: false,
    priority: 'medium',
  },

  // Funding & Finance
  {
    id: '5',
    title: 'Open Business Bank Account',
    description: 'Set up dedicated business checking and savings accounts',
    category: 'funding',
    deadline: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
    completed: false,
    priority: 'high',
  },
  {
    id: '6',
    title: 'Create Financial Model',
    description: 'Build 3-year financial projections and budget',
    category: 'funding',
    deadline: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000),
    completed: false,
    priority: 'high',
  },
  {
    id: '7',
    title: 'Secure Initial Funding',
    description: 'Pitch to investors or apply for startup loans',
    category: 'funding',
    deadline: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000), // 2 months
    completed: false,
    priority: 'high',
  },
  {
    id: '8',
    title: 'Set Up Accounting System',
    description: 'Choose and implement accounting software (QuickBooks, Xero, etc.)',
    category: 'funding',
    deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    completed: false,
    priority: 'medium',
  },

  // Product Development
  {
    id: '9',
    title: 'Validate Market & Product Fit',
    description: 'Conduct customer interviews and market research',
    category: 'product',
    deadline: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
    completed: false,
    priority: 'high',
  },
  {
    id: '10',
    title: 'Build MVP',
    description: 'Develop minimum viable product for initial launch',
    category: 'product',
    deadline: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000), // 3 months
    completed: false,
    priority: 'high',
  },
  {
    id: '11',
    title: 'Beta Testing Program',
    description: 'Launch closed beta with early users and collect feedback',
    category: 'product',
    deadline: new Date(Date.now() + 105 * 24 * 60 * 60 * 1000), // 3.5 months
    completed: false,
    priority: 'medium',
  },
  {
    id: '12',
    title: 'Product Documentation',
    description: 'Create user guides and technical documentation',
    category: 'product',
    deadline: new Date(Date.now() + 120 * 24 * 60 * 60 * 1000), // 4 months
    completed: false,
    priority: 'low',
  },

  // Marketing & Branding
  {
    id: '13',
    title: 'Develop Brand Identity',
    description: 'Create logo, color scheme, and brand guidelines',
    category: 'marketing',
    deadline: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000),
    completed: false,
    priority: 'high',
  },
  {
    id: '14',
    title: 'Build Website',
    description: 'Launch professional company website with SEO optimization',
    category: 'marketing',
    deadline: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000),
    completed: false,
    priority: 'high',
  },
  {
    id: '15',
    title: 'Social Media Presence',
    description: 'Set up and optimize profiles on relevant platforms',
    category: 'marketing',
    deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    completed: false,
    priority: 'medium',
  },
  {
    id: '16',
    title: 'Content Marketing Strategy',
    description: 'Plan blog posts, newsletters, and content calendar',
    category: 'marketing',
    deadline: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
    completed: false,
    priority: 'medium',
  },

  // Operations
  {
    id: '17',
    title: 'Set Up Office/Workspace',
    description: 'Establish physical or virtual office space',
    category: 'operations',
    deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    completed: false,
    priority: 'medium',
  },
  {
    id: '18',
    title: 'Choose Tech Stack',
    description: 'Select and implement essential business software and tools',
    category: 'operations',
    deadline: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000),
    completed: false,
    priority: 'medium',
  },
  {
    id: '19',
    title: 'Establish Business Insurance',
    description: 'Obtain liability, property, and other necessary insurance',
    category: 'operations',
    deadline: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000),
    completed: false,
    priority: 'medium',
  },
  {
    id: '20',
    title: 'Create Operations Manual',
    description: 'Document standard operating procedures and workflows',
    category: 'operations',
    deadline: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
    completed: false,
    priority: 'low',
  },

  // Team Building
  {
    id: '21',
    title: 'Define Organizational Structure',
    description: 'Create org chart and define key roles and responsibilities',
    category: 'team',
    deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    completed: false,
    priority: 'high',
  },
  {
    id: '22',
    title: 'Recruit Co-founders/Key Hires',
    description: 'Identify and onboard essential team members',
    category: 'team',
    deadline: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
    completed: false,
    priority: 'high',
  },
  {
    id: '23',
    title: 'Set Up Payroll System',
    description: 'Implement payroll processing and benefits administration',
    category: 'team',
    deadline: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000),
    completed: false,
    priority: 'medium',
  },
  {
    id: '24',
    title: 'Employee Handbook',
    description: 'Create comprehensive employee policies and handbook',
    category: 'team',
    deadline: new Date(Date.now() + 75 * 24 * 60 * 60 * 1000),
    completed: false,
    priority: 'low',
  },
];
