"use client";

import { useState } from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { ROLES, TWELVE_WEEKS_IN_DAYS } from '@/lib/constants';
import type { Goal, Role } from '@/lib/types';
import { AlertCircle, CheckCircle, PlusCircle, Save, Trash2 } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

// Mock data and cycle logic
const getCurrentCycleStartDate = () => {
  // Simplified: assumes cycles start Jan 1, Apr 1, Jul 1, Oct 1 for demo
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  if (month < 3) return new Date(year, 0, 1).toISOString(); // Jan 1
  if (month < 6) return new Date(year, 3, 1).toISOString(); // Apr 1
  if (month < 9) return new Date(year, 6, 1).toISOString(); // Jul 1
  return new Date(year, 9, 1).toISOString(); // Oct 1
};

const initialGoals: Goal[] = [
  { id: 'ag1', roleId: 'health', description: 'Run a 5K', cycleStartDate: getCurrentCycleStartDate(), isCompleted: false },
  { id: 'ag2', roleId: 'health', description: 'Meditate 10 mins daily', cycleStartDate: getCurrentCycleStartDate(), isCompleted: true },
  { id: 'ag3', roleId: 'professional', description: 'Learn a new programming language basics', cycleStartDate: getCurrentCycleStartDate(), isCompleted: false },
];

export default function AnnualGoalsPage() {
  const [goals, setGoals] = useState<Goal[]>(initialGoals);
  const [newGoalForms, setNewGoalForms] = useState<Partial<Record<string, string>>>({});

  const currentCycleStart = getCurrentCycleStartDate();
  const cycleEndDate = new Date(new Date(currentCycleStart).getTime() + TWELVE_WEEKS_IN_DAYS * 24 * 60 * 60 * 1000);
  
  const isLastWeekOfCycle = () => {
    const today = new Date();
    const oneWeekBeforeEnd = new Date(cycleEndDate.getTime() - 7 * 24 * 60 * 60 * 1000);
    return today >= oneWeekBeforeEnd && today <= cycleEndDate;
  };

  const handleAddGoal = (roleId: string) => {
    const description = newGoalForms[roleId];
    if (!description || !description.trim()) return;
    const newGoal: Goal = {
      id: Date.now().toString(),
      roleId,
      description,
      cycleStartDate: currentCycleStart,
      isCompleted: false,
    };
    setGoals(prev => [...prev, newGoal]);
    setNewGoalForms(prev => ({ ...prev, [roleId]: '' }));
  };

  const toggleGoalCompletion = (goalId: string) => {
    setGoals(prev => prev.map(g => g.id === goalId ? { ...g, isCompleted: !g.isCompleted } : g));
  };

  const deleteGoal = (goalId: string) => {
    setGoals(prev => prev.filter(g => g.id !== goalId));
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        title="12-Week Goals"
        description={`Current Cycle: ${new Date(currentCycleStart).toLocaleDateString()} - ${cycleEndDate.toLocaleDateString()}`}
        actions={<Button><Save className="mr-2 h-4 w-4" /> Save All Changes</Button>}
      />

      {isLastWeekOfCycle() && (
         <Alert variant="destructive" className="border-accent bg-accent/10 text-accent-foreground">
          <AlertCircle className="h-4 w-4 !text-accent" />
          <AlertTitle className="!text-accent font-semibold">Planning Time!</AlertTitle>
          <AlertDescription>
            It's the last week of the current 12-week cycle. Time to review your goals and plan for the next cycle!
          </AlertDescription>
        </Alert>
      )}

      <Accordion type="multiple" defaultValue={ROLES.map(r => r.id)} className="w-full space-y-4">
        {ROLES.map((role: Role) => {
          const roleGoals = goals.filter(g => g.roleId === role.id && g.cycleStartDate === currentCycleStart);
          return (
            <AccordionItem key={role.id} value={role.id} className="border bg-card rounded-lg shadow-md">
              <AccordionTrigger className="px-6 py-4 hover:no-underline">
                <div className="flex items-center gap-3">
                  <role.icon className="h-6 w-6 text-primary" />
                  <span className="text-lg font-semibold text-primary">{role.name}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6 pt-0">
                <p className="text-sm text-muted-foreground mb-4">{role.description}</p>
                <ul className="space-y-3 mb-4">
                  {roleGoals.map(goal => (
                    <li key={goal.id} className="flex items-center justify-between p-3 rounded-md border hover:bg-muted/20">
                      <div className="flex items-center gap-3">
                        <Checkbox
                          id={`goal-${goal.id}`}
                          checked={goal.isCompleted}
                          onCheckedChange={() => toggleGoalCompletion(goal.id)}
                          aria-labelledby={`goal-label-${goal.id}`}
                        />
                        <Label htmlFor={`goal-${goal.id}`} id={`goal-label-${goal.id}`} className={`text-sm ${goal.isCompleted ? 'line-through text-muted-foreground' : ''}`}>
                          {goal.description}
                        </Label>
                      </div>
                      <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive" onClick={() => deleteGoal(goal.id)}>
                        <Trash2 size={16} /> <span className="sr-only">Delete</span>
                      </Button>
                    </li>
                  ))}
                   {roleGoals.length === 0 && <p className="text-sm text-muted-foreground text-center py-2">No goals set for this role in the current cycle.</p>}
                </ul>
                <div className="flex gap-2 items-end pt-4 border-t">
                  <div className="flex-grow">
                    <Label htmlFor={`new-goal-${role.id}`} className="text-xs font-medium">New Goal for {role.name}</Label>
                    <Input 
                      id={`new-goal-${role.id}`}
                      placeholder="Enter goal description"
                      value={newGoalForms[role.id] || ''}
                      onChange={(e) => setNewGoalForms(prev => ({ ...prev, [role.id]: e.target.value }))}
                      className="mt-1"
                    />
                  </div>
                  <Button onClick={() => handleAddGoal(role.id)} size="sm" className="h-10">
                    <PlusCircle className="mr-2 h-4 w-4" /> Add Goal
                  </Button>
                </div>
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
}
