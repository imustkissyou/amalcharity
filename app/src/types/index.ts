export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  category: 'zakat' | 'sadaqah' | 'kafala' | 'relief' | 'education' | 'health' | 'water' | 'mosque';
  targetAmount: number;
  raisedAmount: number;
  beneficiaries: number;
  urgency: 'high' | 'medium' | 'low';
  location: string;
  acceptsZakat: boolean;
  duration?: string;
  donorCount?: number;
  license?: string;
}

export interface CartItem {
  projectId: string;
  projectTitle: string;
  amount: number;
  image: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
}

export interface Donation {
  id: string;
  projectTitle: string;
  amount: number;
  date: string;
  status: 'completed' | 'pending';
  category: string;
}

export interface StatItem {
  label: string;
  value: string;
  suffix: string;
  icon: string;
}

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export interface ZakatType {
  id: string;
  name: string;
  description: string;
  icon: string;
  nisab?: number;
  rate: number;
}

export interface NewsItem {
  id: string;
  text: string;
  link: string;
}
