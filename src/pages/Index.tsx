import { useState } from 'react';
import { Task, TaskCategory, CATEGORY_LABELS } from '@/types/task';
import { initialStartupTasks } from '@/data/startupTasks';
import { TaskCard } from '@/components/TaskCard';
import { ProgressBar } from '@/components/ProgressBar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Rocket, 
  Scale, 
  Wrench, 
  Droplets, 
  Car, 
  Megaphone, 
  Settings,
  Filter
} from 'lucide-react';

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
            <CardTitle className="text-2xl">Business Launch Progress</CardTitle>
            <CardDescription>Track your mobile car wash setup from start to finish</CardDescription>
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
            <span className="text-sm text-muted-foreground">
              {filteredTasks.length} {filteredTasks.length === 1 ? 'task' : 'tasks'}
            </span>
          </div>
          
          <div className="grid gap-4">
            {filteredTasks.map((task) => (
              <TaskCard key={task.id} task={task} onToggle={handleToggleTask} />
            ))}
          </div>

          {filteredTasks.length === 0 && (
            <Card className="text-center py-12">
              <CardContent>
                <p className="text-muted-foreground">No tasks found in this category.</p>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
};

export default Index;
