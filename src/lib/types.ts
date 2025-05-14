import type { LucideIcon } from 'lucide-react';
import type { MEAL_TYPES, EXPENSE_TYPES } from './constants';

export interface Role {
  id: string;
  name: string;
  icon: LucideIcon;
  description: string;
}

export interface Goal {
  id: string;
  roleId: string;
  description: string;
  cycleStartDate: string; // ISO date string
  isCompleted: boolean;
}

export interface Task {
  id:string;
  goalId?: string;
  description: string;
  dueDate?: string; // ISO date string for weekly plan
  scheduledDateTime?: string; // ISO date string with time
  durationMinutes: number; // in minutes
  isCompleted: boolean;
}

export interface Note {
  id: string;
  content: string;
  createdAt: string; // ISO date string
  color?: string; // e.g., 'bg-yellow-200'
}

export type MealType = typeof MEAL_TYPES[number];

export interface MealEntry {
  id: string;
  date: string; // ISO date string
  type: MealType;
  time: string; // HH:mm format
}

export interface WaterIntake {
  date: string; // ISO date string
  glasses: number;
}

export type ExpenseType = typeof EXPENSE_TYPES[number];

export interface Expense {
  id: string;
  date: string; // ISO date string
  description: string;
  amount: number;
  type: ExpenseType;
}

export interface Investment {
  id: string;
  date: string; // ISO date string
  description: string;
  amount: number;
  comments?: string;
}

export interface Cycle {
  startDate: Date;
  endDate: Date;
}
