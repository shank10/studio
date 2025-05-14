import type { Role } from './types';
import { Users, HeartPulse, Briefcase, Palette, Sparkles, Brain } from 'lucide-react';

export const APP_NAME = "DayWise";

export const ROLES: Role[] = [
  { id: 'family-friends', name: 'Family/Friends', icon: Users, description: 'Nurture relationships with loved ones.' },
  { id: 'health', name: 'Health & Wellness', icon: HeartPulse, description: 'Focus on physical and mental well-being.' },
  { id: 'professional', name: 'Professional Growth', icon: Briefcase, description: 'Advance career and skills.' },
  { id: 'personal-work', name: 'Personal Work/Projects', icon: Brain, description: 'Dedicated focus time for key projects.' },
  { id: 'hobby', name: 'Hobby & Leisure', icon: Palette, description: 'Engage in enjoyable personal interests.' },
  { id: 'spiritual', name: 'Spiritual Growth', icon: Sparkles, description: 'Connect with your inner self and values.' },
];

export const DEFAULT_TASK_DURATION_MINUTES = 20;

export const WATER_GLASS_MAX = 12;
export const WATER_GLASS_MIN = 0;

export const MEAL_TYPES = ['Breakfast', 'Lunch', 'Dinner'] as const;

export const EXPENSE_TYPES = ['Food', 'Transport', 'Utilities', 'Entertainment', 'Health', 'Education', 'Other'] as const;

export const TWELVE_WEEKS_IN_DAYS = 12 * 7;
