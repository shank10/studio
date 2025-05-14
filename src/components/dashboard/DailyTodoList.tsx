"use client";

import { CheckSquare, ListTodo } from 'lucide-react';
import { SectionCard } from '@/components/shared/SectionCard';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import type { Task } from '@/lib/types';
import { useState } from 'react';


const mockTasks: Task[] = [
  { id: 'task1', description: 'Review project proposal', durationMinutes: 30, isCompleted: false, dueDate: new Date().toISOString() },
  { id: 'task2', description: 'Call John regarding the new design', durationMinutes: 15, isCompleted: true, dueDate: new Date().toISOString() },
  { id: 'task3', description: 'Draft weekly report', durationMinutes: 60, isCompleted: false, dueDate: new Date().toISOString() },
  { id: 'task4', description: 'Grocery shopping', durationMinutes: 45, isCompleted: false, scheduledDateTime: new Date(new Date().setHours(17,0,0,0)).toISOString() },
];


export function DailyTodoList() {
  const [tasks, setTasks] = useState<Task[]>(mockTasks.filter(t => !t.scheduledDateTime)); // Show only unscheduled tasks or tasks for today

  const toggleTaskCompletion = (taskId: string) => {
    setTasks(currentTasks =>
      currentTasks.map(task =>
        task.id === taskId ? { ...task, isCompleted: !task.isCompleted } : task
      )
    );
  };
  
  return (
    <SectionCard title="Today's To-Do" icon={<ListTodo size={24} />}>
      {tasks.length === 0 ? (
        <p className="text-muted-foreground text-center py-4">No tasks for today. Enjoy your free time or plan new ones!</p>
      ) : (
        <ScrollArea className="h-[200px] pr-3">
          <ul className="space-y-3">
            {tasks.map(task => (
              <li key={task.id} className="flex items-center justify-between p-3 rounded-md border bg-card hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-3">
                  <Checkbox
                    id={`task-${task.id}`}
                    checked={task.isCompleted}
                    onCheckedChange={() => toggleTaskCompletion(task.id)}
                    aria-labelledby={`task-label-${task.id}`}
                  />
                  <Label htmlFor={`task-${task.id}`} id={`task-label-${task.id}`} className={`text-sm ${task.isCompleted ? 'line-through text-muted-foreground' : ''}`}>
                    {task.description}
                  </Label>
                </div>
                <Badge variant={task.isCompleted ? "secondary" : "outline"} className="text-xs">
                  {task.durationMinutes} min
                </Badge>
              </li>
            ))}
          </ul>
        </ScrollArea>
      )}
    </SectionCard>
  );
}
