import { Progress } from '@/components/ui/progress';

interface ProgressBarProps {
  completed: number;
  total: number;
  label?: string;
}

export const ProgressBar = ({ completed, total, label }: ProgressBarProps) => {
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div className="space-y-2">
      {label && (
        <div className="flex items-center justify-between text-sm">
          <span className="font-medium">{label}</span>
          <span className="text-muted-foreground">
            {completed} of {total} tasks
          </span>
        </div>
      )}
      <div className="space-y-1">
        <Progress value={percentage} className="h-2" />
        <div className="text-right text-xs text-muted-foreground">
          {percentage}% complete
        </div>
      </div>
    </div>
  );
};
