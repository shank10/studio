import { Sun } from 'lucide-react';
import { APP_NAME } from '@/lib/constants';

interface LogoProps {
  collapsed?: boolean;
}

export function Logo({ collapsed = false }: LogoProps) {
  return (
    <div className="flex items-center gap-2 px-2 py-4">
      <Sun className="h-8 w-8 text-primary" />
      {!collapsed && (
        <h1 className="text-2xl font-bold text-primary">{APP_NAME}</h1>
      )}
    </div>
  );
}
