import { PageHeader } from '@/components/shared/PageHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ROLES } from '@/lib/constants';
import type { Goal } from '@/lib/types';
import { CheckCircle, ListChecks, PlusSquare } from 'lucide-react';

// Mock data
const mockGoals: Goal[] = [
  { id: 'g1', roleId: 'health', description: 'Workout 3 times this week', cycleStartDate: new Date().toISOString(), isCompleted: false },
  { id: 'g2', roleId: 'professional', description: 'Finish Q1 report', cycleStartDate: new Date().toISOString(), isCompleted: true },
  { id: 'g3', roleId: 'personal-work', description: 'Outline new blog post', cycleStartDate: new Date().toISOString(), isCompleted: false },
];


export default function WeeklyPlanningPage() {
  return (
    <div className="space-y-6">
      <PageHeader 
        title="Weekly Planning" 
        description="Plan your tasks for the upcoming week based on your goals."
        actions={<Button><ListChecks className="mr-2 h-4 w-4" /> View This Week's Tasks</Button>}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ROLES.map(role => {
          const roleGoals = mockGoals.filter(g => g.roleId === role.id);
          return (
            <Card key={role.id} className="shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div className='flex items-center gap-2'>
                  <role.icon className="h-5 w-5 text-primary" />
                  <CardTitle className="text-md font-semibold text-primary">{role.name}</CardTitle>
                </div>
                 <Button variant="ghost" size="sm" className="text-xs">
                    <PlusSquare className="mr-1 h-3 w-3" /> Add Task
                  </Button>
              </CardHeader>
              <CardContent>
                {roleGoals.length > 0 ? (
                  <ul className="space-y-2 text-sm">
                    {roleGoals.map(goal => (
                      <li key={goal.id} className={`flex items-center gap-2 ${goal.isCompleted ? 'text-muted-foreground line-through' : ''}`}>
                        {goal.isCompleted ? <CheckCircle className="h-4 w-4 text-green-500" /> : <ListChecks className="h-4 w-4 text-muted-foreground" />}
                        {goal.description}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-xs text-muted-foreground">No specific goals set for this role this cycle. Add tasks directly.</p>
                )}
                 <p className="text-xs text-muted-foreground mt-2 italic">{role.description}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card className="mt-8 shadow-xl">
        <CardHeader>
          <CardTitle className="text-xl text-primary">Weekly Calendar & Unscheduled Tasks</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-muted/30 p-4 rounded-lg min-h-[300px] flex items-center justify-center">
              <p className="text-muted-foreground">Weekly Calendar View (Drag & Drop Tasks Here) - Coming Soon!</p>
            </div>
            <div className="bg-muted/30 p-4 rounded-lg min-h-[300px]">
              <h3 className="font-semibold mb-2 text-center text-primary">To-Do (Unscheduled)</h3>
              <div className="text-center text-muted-foreground">Task List Placeholder - Coming Soon!</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
