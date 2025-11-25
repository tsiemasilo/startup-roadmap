import { Task } from '@/types/task';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, CheckCircle2, AlertCircle, Pencil, Trash2 } from 'lucide-react';
import { format, isPast, differenceInDays } from 'date-fns';

interface TaskCardProps {
  task: Task;
  onToggle: (taskId: string) => void;
  onEdit?: (task: Task) => void;
  onDelete?: (taskId: string) => void;
}

export const TaskCard = ({ task, onToggle, onEdit, onDelete }: TaskCardProps) => {
  const isOverdue = !task.completed && isPast(task.deadline);
  const daysUntilDeadline = differenceInDays(task.deadline, new Date());
  
  const getStatusBadge = () => {
    if (task.completed) {
      const wasLate = task.completedAt && isPast(task.deadline) && task.completedAt > task.deadline;
      return (
        <Badge variant={wasLate ? "destructive" : "default"} className="gap-1">
          <CheckCircle2 className="h-3 w-3" />
          {wasLate ? 'Completed Late' : 'Completed'}
        </Badge>
      );
    }
    
    if (isOverdue) {
      return (
        <Badge variant="destructive" className="gap-1">
          <AlertCircle className="h-3 w-3" />
          Overdue
        </Badge>
      );
    }
    
    if (daysUntilDeadline <= 7) {
      return (
        <Badge variant="secondary" className="gap-1">
          <Clock className="h-3 w-3" />
          Due Soon
        </Badge>
      );
    }
    
    return <Badge variant="outline">Upcoming</Badge>;
  };

  const getPriorityColor = () => {
    switch (task.priority) {
      case 'high': return 'border-l-destructive';
      case 'medium': return 'border-l-primary';
      case 'low': return 'border-l-muted';
    }
  };

  return (
    <Card 
      className={`group border-l-4 ${getPriorityColor()} transition-all duration-300 hover:shadow-lg hover:-translate-y-1 animate-slide-in-up ${
        task.completed ? 'opacity-60' : ''
      }`}
      data-testid={`task-card-${task.id}`}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start gap-3">
          <div className={task.completed ? 'animate-check-bounce' : ''}>
            <Checkbox
              checked={task.completed}
              onCheckedChange={() => onToggle(task.id)}
              className="mt-1 transition-all duration-200 hover:scale-110"
              data-testid={`checkbox-task-${task.id}`}
            />
          </div>
          <div className="flex-1">
            <div className="flex items-start justify-between gap-2">
              <CardTitle className={`text-lg transition-all duration-300 ${task.completed ? 'line-through text-muted-foreground' : ''}`}>
                {task.title}
              </CardTitle>
              <div className="flex items-center gap-2 flex-wrap">
                <div className="animate-fade-in">
                  {getStatusBadge()}
                </div>
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  {onEdit && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 hover:scale-110 transition-transform duration-200"
                      onClick={() => onEdit(task)}
                      data-testid={`button-edit-task-${task.id}`}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                  )}
                  {onDelete && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-destructive hover:text-destructive hover:scale-110 transition-transform duration-200"
                      onClick={() => onDelete(task.id)}
                      data-testid={`button-delete-task-${task.id}`}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            </div>
            <CardDescription className="mt-1 transition-all duration-300">{task.description}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>Due: {format(task.deadline, 'MMM d, yyyy')}</span>
          </div>
          {task.completed && task.completedAt && (
            <div className="flex items-center gap-1 text-primary animate-fade-in">
              <CheckCircle2 className="h-4 w-4" />
              <span>Completed: {format(task.completedAt, 'MMM d, yyyy')}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
