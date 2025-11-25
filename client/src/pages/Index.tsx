import { useState, useMemo } from 'react';
import { Task, TaskCategory, CATEGORY_LABELS } from '@/types/task';
import { initialStartupTasks } from '@/data/startupTasks';
import { TaskCard } from '@/components/TaskCard';
import { ProgressBar } from '@/components/ProgressBar';
import { TaskDialog } from '@/components/TaskDialog';
import { CalendarView } from '@/components/CalendarView';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Separator } from '@/components/ui/separator';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { 
  Scale, 
  Wrench, 
  Droplets, 
  Car, 
  Megaphone, 
  Settings,
  Filter,
  Plus,
  CalendarDays,
  List,
  Sparkles,
  Clock,
  AlertCircle,
  TrendingUp
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { differenceInDays, formatDistanceToNow, isPast, isToday, isTomorrow, isWithinInterval, addDays } from 'date-fns';

const categoryIcons: Record<TaskCategory, any> = {
  equipment: Wrench,
  supplies: Droplets,
  vehicle: Car,
  legal: Scale,
  marketing: Megaphone,
  operations: Settings,
};

const Index = () => {
  const [tasks, setTasks] = useState<Task[]>(initialStartupTasks);
  const [filterCategory, setFilterCategory] = useState<TaskCategory | 'all'>('all');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState<'create' | 'edit'>('create');
  const [editingTask, setEditingTask] = useState<Task | undefined>();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'list' | 'calendar'>('list');
  const { toast } = useToast();

  const handleToggleTask = (taskId: string) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId
          ? {
              ...task,
              completed: !task.completed,
              completedAt: !task.completed ? new Date() : undefined,
            }
          : task
      )
    );
  };

  const handleAddTask = () => {
    setDialogMode('create');
    setEditingTask(undefined);
    setDialogOpen(true);
  };

  const handleEditTask = (task: Task) => {
    setDialogMode('edit');
    setEditingTask(task);
    setDialogOpen(true);
  };

  const handleDeleteTask = (taskId: string) => {
    setTaskToDelete(taskId);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (taskToDelete) {
      setTasks(prevTasks => prevTasks.filter(t => t.id !== taskToDelete));
      toast({
        title: 'Task deleted',
        description: 'The task has been removed from your checklist.',
      });
    }
    setDeleteDialogOpen(false);
    setTaskToDelete(null);
  };

  const handleSaveTask = (taskData: Omit<Task, 'id' | 'completedAt'>) => {
    if (dialogMode === 'create') {
      const newTask: Task = {
        ...taskData,
        id: Date.now().toString(),
      };
      setTasks(prevTasks => [...prevTasks, newTask]);
      toast({
        title: 'Task added',
        description: 'Your new task has been added to the checklist.',
      });
    } else if (editingTask) {
      setTasks(prevTasks =>
        prevTasks.map(task =>
          task.id === editingTask.id
            ? { ...task, ...taskData }
            : task
        )
      );
      toast({
        title: 'Task updated',
        description: 'Your changes have been saved.',
      });
    }
  };

  const completedCount = tasks.filter(t => t.completed).length;
  const totalCount = tasks.length;

  const getCategoryStats = (category: TaskCategory) => {
    const categoryTasks = tasks.filter(t => t.category === category);
    const completed = categoryTasks.filter(t => t.completed).length;
    return { completed, total: categoryTasks.length };
  };

  const getFilteredTasks = () => {
    if (filterCategory === 'all') return tasks;
    return tasks.filter(t => t.category === filterCategory);
  };

  const filteredTasks = getFilteredTasks();

  // Get upcoming tasks sorted by deadline
  const upcomingTasks = useMemo(() => {
    return tasks
      .filter(t => !t.completed)
      .sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime())
      .slice(0, 5);
  }, [tasks]);

  const getDeadlineStatus = (deadline: Date) => {
    if (isPast(deadline) && !isToday(deadline)) {
      return { label: 'Overdue', variant: 'destructive' as const, icon: AlertCircle };
    }
    if (isToday(deadline)) {
      return { label: 'Today', variant: 'default' as const, icon: Clock };
    }
    if (isTomorrow(deadline)) {
      return { label: 'Tomorrow', variant: 'secondary' as const, icon: Clock };
    }
    const daysUntil = differenceInDays(deadline, new Date());
    if (daysUntil <= 7) {
      return { label: `${daysUntil} days`, variant: 'secondary' as const, icon: Clock };
    }
    return { label: formatDistanceToNow(deadline, { addSuffix: true }), variant: 'outline' as const, icon: Clock };
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-card/95">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {/* Logo */}
              <div className="relative">
                <div className="flex items-center justify-center h-14 w-14 rounded-xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-lg">
                  <Sparkles className="h-7 w-7 absolute top-1 right-1 opacity-50" />
                  <Car className="h-7 w-7" />
                </div>
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">T&M Detailing</h1>
                <p className="text-sm text-muted-foreground">Business Launch Dashboard</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('list')}
                data-testid="button-view-list"
              >
                <List className="h-4 w-4 sm:mr-2" />
                <span className="hidden sm:inline">List</span>
              </Button>
              <Button
                variant={viewMode === 'calendar' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('calendar')}
                data-testid="button-view-calendar"
              >
                <CalendarDays className="h-4 w-4 sm:mr-2" />
                <span className="hidden sm:inline">Calendar</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Overall Progress */}
          <Card className="lg:col-span-2 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
            <CardHeader>
              <div className="flex items-center gap-2 mb-1">
                <TrendingUp className="h-5 w-5 text-primary" />
                <CardTitle className="text-xl">Business Launch Progress</CardTitle>
              </div>
              <CardDescription>Track your detailing business setup from start to finish</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <ProgressBar completed={completedCount} total={totalCount} />
              
              {/* Stats Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                <div className="flex flex-col items-center justify-center p-3 rounded-lg bg-background/50 border border-primary/10">
                  <p className="text-2xl font-bold text-primary">{totalCount}</p>
                  <p className="text-xs text-muted-foreground mt-1">Total Tasks</p>
                </div>
                <div className="flex flex-col items-center justify-center p-3 rounded-lg bg-background/50 border border-primary/10">
                  <p className="text-2xl font-bold text-green-600">{completedCount}</p>
                  <p className="text-xs text-muted-foreground mt-1">Completed</p>
                </div>
                <div className="flex flex-col items-center justify-center p-3 rounded-lg bg-background/50 border border-primary/10">
                  <p className="text-2xl font-bold text-destructive">
                    {tasks.filter(t => !t.completed && new Date(t.deadline) < new Date()).length}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">Overdue</p>
                </div>
                <div className="flex flex-col items-center justify-center p-3 rounded-lg bg-background/50 border border-primary/10">
                  <p className="text-2xl font-bold text-blue-600">
                    {tasks.filter(t => !t.completed && isWithinInterval(new Date(t.deadline), {
                      start: new Date(),
                      end: addDays(new Date(), 7)
                    })).length}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">This Week</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Deadlines */}
          <Card className="lg:col-span-1">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                <CardTitle className="text-xl">Upcoming</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              {upcomingTasks.length > 0 ? (
                <div className="space-y-3">
                  {upcomingTasks.map((task) => {
                    const status = getDeadlineStatus(new Date(task.deadline));
                    const StatusIcon = status.icon;
                    return (
                      <div 
                        key={task.id} 
                        className="flex items-start gap-2 p-2 rounded-md hover-elevate cursor-pointer"
                        onClick={() => {
                          setFilterCategory(task.category);
                          setViewMode('list');
                        }}
                        data-testid={`upcoming-task-${task.id}`}
                      >
                        <StatusIcon className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{task.title}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant={status.variant} className="text-xs">
                              {status.label}
                            </Badge>
                            <span className="text-xs text-muted-foreground">
                              {CATEGORY_LABELS[task.category]}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground text-center py-4">
                  All tasks completed!
                </p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Category Overview */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Categories</h2>
            <Badge variant="outline" data-testid="badge-total-categories">
              {Object.keys(CATEGORY_LABELS).length} total
            </Badge>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {(Object.keys(CATEGORY_LABELS) as TaskCategory[]).map((category) => {
              const stats = getCategoryStats(category);
              const Icon = categoryIcons[category];
              const percentage = stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;
              const isActive = filterCategory === category;

              return (
                <Card 
                  key={category}
                  className={`cursor-pointer transition-all hover-elevate ${
                    isActive ? 'border-primary/50 shadow-md' : ''
                  }`}
                  onClick={() => {
                    setFilterCategory(category);
                    setViewMode('list');
                  }}
                  data-testid={`card-category-${category}`}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className={`flex items-center justify-center h-9 w-9 rounded-lg ${
                          isActive ? 'bg-primary text-primary-foreground' : 'bg-primary/10 text-primary'
                        }`}>
                          <Icon className="h-5 w-5" />
                        </div>
                        <CardTitle className="text-base">{CATEGORY_LABELS[category]}</CardTitle>
                      </div>
                      {percentage === 100 && stats.total > 0 && (
                        <Badge variant="default" className="text-xs">
                          Done
                        </Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">{stats.completed} / {stats.total} tasks</span>
                        <span className="font-semibold text-primary">{percentage}%</span>
                      </div>
                      <Progress value={percentage} className="h-2" />
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {viewMode === 'calendar' ? (
          <CalendarView 
            tasks={tasks} 
            onTaskClick={(task) => {
              setViewMode('list');
              setFilterCategory(task.category);
            }}
          />
        ) : (
          <>
            {/* Filter Bar */}
            <Card className="mb-6">
              <CardContent className="pt-6">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <Filter className="h-5 w-5 text-muted-foreground" />
                    <span className="font-semibold text-sm">Filter by:</span>
                  </div>
                  <Separator orientation="vertical" className="hidden sm:block h-6" />
                  <div className="flex flex-wrap gap-2 flex-1">
                    <Button
                      variant={filterCategory === 'all' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setFilterCategory('all')}
                      data-testid="filter-all"
                      className="flex-shrink-0"
                    >
                      All Tasks
                    </Button>
                    {(Object.keys(CATEGORY_LABELS) as TaskCategory[]).map((category) => {
                      const Icon = categoryIcons[category];
                      return (
                        <Button
                          key={category}
                          variant={filterCategory === category ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => setFilterCategory(category)}
                          data-testid={`filter-${category}`}
                          className="flex-shrink-0"
                        >
                          <Icon className="h-3.5 w-3.5 mr-1.5" />
                          {CATEGORY_LABELS[category]}
                        </Button>
                      );
                    })}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tasks List */}
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                      <CardTitle className="text-xl">
                        {filterCategory === 'all' ? 'All Tasks' : CATEGORY_LABELS[filterCategory]}
                      </CardTitle>
                      <CardDescription className="mt-1">
                        {filteredTasks.length} {filteredTasks.length === 1 ? 'task' : 'tasks'} 
                        {filterCategory !== 'all' && ' in this category'}
                      </CardDescription>
                    </div>
                    <Button onClick={handleAddTask} data-testid="button-add-task">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Task
                    </Button>
                  </div>
                </CardHeader>
              </Card>
              
              <div className="grid gap-4">
                {filteredTasks.map((task) => (
                  <TaskCard 
                    key={task.id} 
                    task={task} 
                    onToggle={handleToggleTask}
                    onEdit={handleEditTask}
                    onDelete={handleDeleteTask}
                  />
                ))}
              </div>

              {filteredTasks.length === 0 && (
                <Card className="text-center py-12">
                  <CardContent>
                    <p className="text-muted-foreground mb-4">No tasks found in this category.</p>
                    <Button onClick={handleAddTask}>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Your First Task
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </>
        )}
      </main>

      {/* Task Dialog */}
      <TaskDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSave={handleSaveTask}
        task={editingTask}
        mode={dialogMode}
      />

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Task?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the task from your checklist.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Index;
