import { Task } from '@/types/task';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { format, isSameDay, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isPast, startOfWeek, endOfWeek } from 'date-fns';
import { cn } from '@/lib/utils';

interface CalendarViewProps {
  tasks: Task[];
  onTaskClick?: (task: Task) => void;
}

export const CalendarView = ({ tasks, onTaskClick }: CalendarViewProps) => {
  const today = new Date();
  const monthStart = startOfMonth(today);
  const monthEnd = endOfMonth(today);
  const calendarStart = startOfWeek(monthStart);
  const calendarEnd = endOfWeek(monthEnd);
  
  const calendarDays = eachDayOfInterval({ start: calendarStart, end: calendarEnd });

  const getTasksForDay = (day: Date) => {
    return tasks.filter(task => isSameDay(task.deadline, day));
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-destructive/10 text-destructive border-destructive/20';
      case 'medium': return 'bg-primary/10 text-primary border-primary/20';
      case 'low': return 'bg-muted text-muted-foreground border-border';
      default: return 'bg-muted';
    }
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">{format(today, 'MMMM yyyy')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-2">
            {/* Weekday headers */}
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <div key={day} className="text-center font-semibold text-sm text-muted-foreground py-2">
                {day}
              </div>
            ))}

            {/* Calendar days */}
            {calendarDays.map((day, idx) => {
              const dayTasks = getTasksForDay(day);
              const isCurrentMonth = isSameMonth(day, today);
              const isToday = isSameDay(day, today);
              const isPastDay = isPast(day) && !isToday;

              return (
                <div
                  key={idx}
                  className={cn(
                    'min-h-24 border rounded-lg p-2 transition-colors',
                    isCurrentMonth ? 'bg-card' : 'bg-muted/30',
                    isToday && 'border-primary border-2 bg-primary/5',
                    isPastDay && 'opacity-60'
                  )}
                >
                  <div className={cn(
                    'text-sm font-medium mb-1',
                    isToday && 'text-primary font-bold',
                    !isCurrentMonth && 'text-muted-foreground'
                  )}>
                    {format(day, 'd')}
                  </div>
                  
                  <div className="space-y-1">
                    {dayTasks.slice(0, 2).map((task) => (
                      <button
                        key={task.id}
                        onClick={() => onTaskClick?.(task)}
                        className={cn(
                          'w-full text-left text-xs p-1 rounded border truncate transition-all hover:shadow-sm',
                          getPriorityColor(task.priority),
                          task.completed && 'opacity-50 line-through'
                        )}
                      >
                        {task.title}
                      </button>
                    ))}
                    {dayTasks.length > 2 && (
                      <div className="text-xs text-muted-foreground text-center">
                        +{dayTasks.length - 2} more
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Upcoming deadlines list */}
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Deadlines</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {tasks
              .filter(task => !task.completed && task.deadline >= today)
              .sort((a, b) => a.deadline.getTime() - b.deadline.getTime())
              .slice(0, 10)
              .map((task) => (
                <button
                  key={task.id}
                  onClick={() => onTaskClick?.(task)}
                  className="w-full flex items-center justify-between p-3 rounded-lg border hover:bg-accent transition-colors text-left"
                >
                  <div className="flex-1">
                    <div className="font-medium">{task.title}</div>
                    <div className="text-sm text-muted-foreground">{task.description}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">{format(task.deadline, 'MMM d')}</Badge>
                    <Badge variant={task.priority === 'high' ? 'destructive' : 'secondary'}>
                      {task.priority}
                    </Badge>
                  </div>
                </button>
              ))}
            {tasks.filter(task => !task.completed && task.deadline >= today).length === 0 && (
              <p className="text-center text-muted-foreground py-4">No upcoming deadlines</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
