"use client";

import { useState, type ChangeEvent } from 'react';
import { Utensils } from 'lucide-react';
import { SectionCard } from '@/components/shared/SectionCard';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { MEAL_TYPES, type MealType } from '@/lib/constants';
import type { MealEntry } from '@/lib/types';

export function MealTracker() {
  const [meals, setMeals] = useState<Partial<Record<MealType, string>>>({
    Breakfast: '',
    Lunch: '',
    Dinner: '',
  });

  const handleTimeChange = (mealType: MealType, event: ChangeEvent<HTMLInputElement>) => {
    setMeals(prev => ({ ...prev, [mealType]: event.target.value }));
  };

  const handleSubmit = (mealType: MealType) => {
    // In a real app, save this data
    console.log(`Saved ${mealType} time: ${meals[mealType]}`);
    // Optionally, show a toast notification
  };

  return (
    <SectionCard title="Meal Times" icon={<Utensils size={24} />}>
      <div className="space-y-4">
        {MEAL_TYPES.map((mealType) => (
          <div key={mealType} className="flex items-end gap-2">
            <div className="flex-grow">
              <Label htmlFor={`${mealType}-time`} className="text-sm font-medium text-foreground/80">
                {mealType}
              </Label>
              <Input
                id={`${mealType}-time`}
                type="time"
                value={meals[mealType] || ''}
                onChange={(e) => handleTimeChange(mealType, e)}
                className="mt-1"
              />
            </div>
            <Button onClick={() => handleSubmit(mealType)} size="sm" variant="outline" className="h-10">
              Log
            </Button>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}
