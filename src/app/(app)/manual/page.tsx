import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen } from 'lucide-react';

export default function UserManualPage() {
  return (
    <div className="space-y-6">
      <PageHeader 
        title="DayWise User Manual" 
        description="Learn how to make the most of DayWise."
      />

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-primary">
            <BookOpen className="h-6 w-6" />
            Welcome to DayWise!
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            DayWise is designed to help you organize your life, set meaningful goals, and track your progress towards a more fulfilling and productive lifestyle.
          </p>
          
          <section>
            <h2 className="text-xl font-semibold mb-2 text-primary/90">Core Features:</h2>
            <ul className="list-disc list-inside space-y-1 text-sm text-foreground/80">
              <li><strong>Today's Dashboard:</strong> Your daily overview with To-Do list, schedule, quick trackers (meals, water), notes, and financial trackers.</li>
              <li><strong>Weekly Planning:</strong> Plan your week by breaking down your goals into actionable tasks. Schedule tasks on a weekly calendar.</li>
              <li><strong>12-Week Goal Setting:</strong> Set overarching goals for various life roles (Family, Health, Professional, etc.) on a 12-week cycle.</li>
              <li><strong>Flexible Task Management:</strong> Add, edit, delete, and schedule tasks easily.</li>
              <li><strong>Trackers:</strong> Monitor meals, water intake, expenses, and investments.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2 text-primary/90">Getting Started:</h2>
            <ol className="list-decimal list-inside space-y-1 text-sm text-foreground/80">
              <li><strong>Set Your 12-Week Goals:</strong> Navigate to "Annual Goals" to define what you want to achieve in the current 12-week cycle.</li>
              <li><strong>Plan Your Week:</strong> Go to "Weekly Planning" to add tasks related to your goals or other commitments. Drag tasks to the calendar (feature coming soon).</li>
              <li><strong>Use the Dashboard Daily:</strong> Check "Today's Dashboard" for your daily agenda, manage your To-Do list, and use the trackers.</li>
            </ol>
          </section>
          
          <p className="text-sm text-muted-foreground italic">
            This user manual is a brief overview. More detailed guides for each feature will be added soon.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
