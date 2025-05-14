
"use client";

import { CalendarClock } from 'lucide-react';
import { SectionCard } from '@/components/shared/SectionCard';
import { ScrollArea } from '@/components/ui/scroll-area';
import type { Task } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { useState, useEffect } from 'react'; // Added useState and useEffect

const mockScheduledTasks: Task[] = [
  { id: 'event1', description: 'Team Standup Meeting', scheduledDateTime: new Date(new Date().setHours(9,0,0,0)).toISOString(), durationMinutes: 30, isCompleted: false },
  { id: 'event2', description: 'Client Call - Project X', scheduledDateTime: new Date(new Date().setHours(11,0,0,0)).toISOString(), durationMinutes: 60, isCompleted: false },
  { id: 'event3', description: 'Focus Block: Coding', scheduledDateTime: new Date(new Date().setHours(14,0,0,0)).toISOString(), durationMinutes: 120, isCompleted: false },
  { id: 'task4', description: 'Grocery shopping', durationMinutes: 45, isCompleted: false, scheduledDateTime: new Date(new Date().setHours(17,0,0,0)).toISOString() },

];

const formatTime = (dateString?: string) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

export function DailyCalendarView() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const todayEvents = mockScheduledTasks
    .filter(task => task.scheduledDateTime && new Date(task.scheduledDateTime).toDateString() === new Date().toDateString())
    .sort((a, b) => new Date(a.scheduledDateTime!).getTime() - new Date(b.scheduledDateTime!).getTime());

  return (
    <SectionCard title="Today's Schedule" icon={<CalendarClock size={24} />}>
      {todayEvents.length === 0 ? (
        <p className="text-muted-foreground text-center py-4">No scheduled events for today.</p>
      ) : (
        <ScrollArea className="h-[200px] pr-3">
          <ul className="space-y-3">
            {todayEvents.map(event => (
              <li key={event.id} className="flex items-center justify-between p-3 rounded-md border bg-card hover:bg-muted/50 transition-colors">
                <div>
                  <p className="text-sm font-medium">{event.description}</p>
                  <p className="text-xs text-muted-foreground">
                    {isClient ? formatTime(event.scheduledDateTime) : '...'} ({event.durationMinutes} min)
                  </p>
                </div>
                {event.isCompleted && <Badge variant="secondary">Done</Badge>}
              </li>
            ))}
          </ul>
        </ScrollArea>
      )}
    </SectionCard>
  );
}
