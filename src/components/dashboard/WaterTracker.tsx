"use client";

import { useState } from 'react';
import { Minus, Plus, GlassWater } from 'lucide-react';
import { SectionCard } from '@/components/shared/SectionCard';
import { Button } from '@/components/ui/button';
import { WATER_GLASS_MIN, WATER_GLASS_MAX } from '@/lib/constants';

export function WaterTracker() {
  const [glasses, setGlasses] = useState(0);

  const increment = () => setGlasses(prev => Math.min(prev + 1, WATER_GLASS_MAX));
  const decrement = () => setGlasses(prev => Math.max(prev - 1, WATER_GLASS_MIN));

  return (
    <SectionCard title="Water Intake" icon={<GlassWater size={24} />}>
      <div className="flex flex-col items-center justify-center gap-4 p-4">
        <div 
          className="h-24 w-24 rounded-lg border-2 border-primary bg-primary/10 flex items-center justify-center text-4xl font-bold text-primary shadow-inner"
          aria-live="polite"
          aria-label={`Current water intake: ${glasses} glasses`}
        >
          {glasses}
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="icon" onClick={decrement} disabled={glasses <= WATER_GLASS_MIN} aria-label="Decrease water intake by one glass">
            <Minus className="h-5 w-5" />
          </Button>
          <span className="text-sm text-muted-foreground">glasses</span>
          <Button variant="outline" size="icon" onClick={increment} disabled={glasses >= WATER_GLASS_MAX} aria-label="Increase water intake by one glass">
            <Plus className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </SectionCard>
  );
}
