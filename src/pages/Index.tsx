import { useState } from 'react';
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
  List
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

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

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-primary text-primary-foreground">
              <Car className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Mobile Car Wash Startup</h1>
              <p className="text-muted-foreground">Your complete checklist from equipment to first customer</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Overall Progress */}
        <Card className="mb-8 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl">Business Launch Progress</CardTitle>
                <CardDescription>Track your mobile car wash setup from start to finish</CardDescription>
              </div>
              <div className="flex gap-2">
                <Button
                  variant={viewMode === 'list' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                >
                  <List className="h-4 w-4 mr-2" />
                  List
                </Button>
                <Button
                  variant={viewMode === 'calendar' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('calendar')}
                >
                  <CalendarDays className="h-4 w-4 mr-2" />
                  Calendar
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <ProgressBar completed={completedCount} total={totalCount} />
          </CardContent>
        </Card>

        {/* Category Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {(Object.keys(CATEGORY_LABELS) as TaskCategory[]).map((category) => {
            const stats = getCategoryStats(category);
            const Icon = categoryIcons[category];
            const percentage = stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;

            return (
              <Card 
                key={category}
                className="cursor-pointer transition-all hover:shadow-md hover:border-primary/50"
                onClick={() => setFilterCategory(category)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center justify-center h-8 w-8 rounded-md bg-primary/10 text-primary">
                      <Icon className="h-4 w-4" />
                    </div>
                    <CardTitle className="text-base">{CATEGORY_LABELS[category]}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">{stats.completed} / {stats.total} tasks</span>
                      <span className="font-semibold text-primary">{percentage}%</span>
                    </div>
                    <Progress value={percentage} className="h-1.5" />
                  </div>
                </CardContent>
              </Card>
            );
          })}
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
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Filter className="h-5 w-5 text-muted-foreground" />
                <span className="font-semibold">Filter:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={filterCategory === 'all' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFilterCategory('all')}
                >
                  All Tasks
                </Button>
                {(Object.keys(CATEGORY_LABELS) as TaskCategory[]).map((category) => (
                  <Button
                    key={category}
                    variant={filterCategory === category ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setFilterCategory(category)}
                  >
                    {CATEGORY_LABELS[category]}
                  </Button>
                ))}
              </div>
            </div>

            {/* Tasks List */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">
                  {filterCategory === 'all' ? 'All Tasks' : CATEGORY_LABELS[filterCategory]}
                </h2>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-muted-foreground">
                    {filteredTasks.length} {filteredTasks.length === 1 ? 'task' : 'tasks'}
                  </span>
                  <Button onClick={handleAddTask}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Task
                  </Button>
                </div>
              </div>
              
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
