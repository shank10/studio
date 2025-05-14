import { PageHeader } from '@/components/shared/PageHeader';
import { MealTracker } from '@/components/dashboard/MealTracker';
import { WaterTracker } from '@/components/dashboard/WaterTracker';
import { NotesSection } from '@/components/dashboard/NotesSection';
import { ExpenseTracker } from '@/components/dashboard/ExpenseTracker';
import { InvestmentTracker } from '@/components/dashboard/InvestmentTracker';
import { DailyTodoList } from '@/components/dashboard/DailyTodoList';
import { DailyCalendarView } from '@/components/dashboard/DailyCalendarView';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';

export default function TodayPage() {
  const today = new Date();
  const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = today.toLocaleDateString(undefined, options);

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Today's Dashboard" 
        description={formattedDate}
        actions={
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" /> Add New Task
          </Button>
        }
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Main column for tasks and schedule */}
        <div className="lg:col-span-2 space-y-6">
          <DailyTodoList />
          <DailyCalendarView />
        </div>

        {/* Sidebar column for quick trackers */}
        <div className="space-y-6">
          <MealTracker />
          <WaterTracker />
        </div>
      </div>

      <div className="space-y-6">
        <NotesSection />
      </div>
      
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <ExpenseTracker />
        <InvestmentTracker />
      </div>
    </div>
  );
}
