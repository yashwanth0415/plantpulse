import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { 
  Lightbulb, 
  Droplets, 
  Sprout, 
  Sun, 
  Shield,
  Calendar,
  TrendingUp,
  CheckCircle
} from 'lucide-react';

const recommendations = [
  {
    id: 1,
    title: 'Fertilizer Application',
    category: 'Nutrition',
    priority: 'High',
    icon: Sprout,
    description: 'Your tomato plants show signs of nitrogen deficiency. Apply nitrogen-rich fertilizer.',
    action: 'Apply 10-5-10 fertilizer at 2 lbs per 100 sq ft',
    timeline: 'Within 3 days',
    difficulty: 'Easy',
    expectedImprovement: 15,
    affectedPlants: 12
  },
  {
    id: 2,
    title: 'Irrigation Adjustment',
    category: 'Water Management',
    priority: 'Medium',
    icon: Droplets,
    description: 'Reduce watering frequency to prevent root rot in your corn plants.',
    action: 'Water every 3 days instead of daily, check soil moisture',
    timeline: 'Immediate',
    difficulty: 'Easy',
    expectedImprovement: 10,
    affectedPlants: 8
  },
  {
    id: 3,
    title: 'Pest Control Treatment',
    category: 'Disease Management',
    priority: 'High',
    icon: Shield,
    description: 'Early blight detected on multiple plants. Immediate treatment required.',
    action: 'Apply copper-based fungicide spray every 7-10 days',
    timeline: 'Within 24 hours',
    difficulty: 'Medium',
    expectedImprovement: 25,
    affectedPlants: 6
  },
  {
    id: 4,
    title: 'Sunlight Optimization',
    category: 'Environmental',
    priority: 'Low',
    icon: Sun,
    description: 'Some plants are receiving insufficient sunlight. Consider pruning or relocation.',
    action: 'Prune surrounding vegetation or relocate containers',
    timeline: 'Within 1 week',
    difficulty: 'Medium',
    expectedImprovement: 8,
    affectedPlants: 4
  }
];

const seasonalTips = [
  {
    title: 'June Growing Tips',
    tips: [
      'Monitor for common summer pests like aphids and spider mites',
      'Increase watering frequency as temperatures rise',
      'Apply mulch to retain soil moisture and regulate temperature',
      'Harvest early crops to make room for summer plantings'
    ]
  }
];

const upcomingTasks = [
  { task: 'Weekly soil pH test', due: 'Tomorrow', priority: 'Medium' },
  { task: 'Fertilizer application - Field A', due: 'In 2 days', priority: 'High' },
  { task: 'Pest inspection - Greenhouse 2', due: 'In 3 days', priority: 'Medium' },
  { task: 'Irrigation system maintenance', due: 'Next week', priority: 'Low' }
];

export function Recommendations() {
  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'high': return 'destructive';
      case 'medium': return 'secondary';
      case 'low': return 'outline';
      default: return 'outline';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'easy': return 'text-green-600';
      case 'medium': return 'text-yellow-600';
      case 'hard': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      {/* Active Recommendations */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Active Recommendations</h2>
        <div className="grid gap-4">
          {recommendations.map((rec) => {
            const IconComponent = rec.icon;
            return (
              <Card key={rec.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <IconComponent className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{rec.title}</CardTitle>
                        <CardDescription>{rec.category}</CardDescription>
                      </div>
                    </div>
                    <Badge variant={getPriorityColor(rec.priority)}>
                      {rec.priority} Priority
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">{rec.description}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-muted/50 rounded-lg">
                    <div>
                      <p className="text-sm font-medium">Action Required</p>
                      <p className="text-sm text-muted-foreground">{rec.action}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Timeline</p>
                      <p className="text-sm text-muted-foreground">{rec.timeline}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Difficulty</p>
                      <p className={`text-sm ${getDifficultyColor(rec.difficulty)}`}>
                        {rec.difficulty}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="text-sm">
                        <span className="text-muted-foreground">Affected plants: </span>
                        <span className="font-medium">{rec.affectedPlants}</span>
                      </div>
                      <div className="text-sm">
                        <span className="text-muted-foreground">Expected improvement: </span>
                        <span className="font-medium text-green-600">+{rec.expectedImprovement}%</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        Schedule
                      </Button>
                      <Button size="sm">
                        Mark as Done
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Seasonal Tips and Upcoming Tasks */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sun className="h-5 w-5" />
              Seasonal Growing Tips
            </CardTitle>
            <CardDescription>
              Tips and best practices for the current growing season
            </CardDescription>
          </CardHeader>
          <CardContent>
            {seasonalTips.map((section, index) => (
              <div key={index} className="space-y-3">
                <h4 className="font-medium">{section.title}</h4>
                <ul className="space-y-2">
                  {section.tips.map((tip, tipIndex) => (
                    <li key={tipIndex} className="flex items-start gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Upcoming Tasks
            </CardTitle>
            <CardDescription>
              Scheduled maintenance and care activities
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {upcomingTasks.map((task, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">{task.task}</p>
                    <p className="text-sm text-muted-foreground">Due: {task.due}</p>
                  </div>
                  <Badge variant={getPriorityColor(task.priority)}>
                    {task.priority}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Smart Crop Mode */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Smart Crop Mode
          </CardTitle>
          <CardDescription>
            Enable continuous monitoring and predictive recommendations
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <h4 className="font-medium">Predictive Analytics</h4>
              <p className="text-sm text-muted-foreground">
                Get predictions about potential issues before they become visible
              </p>
            </div>
            <Button variant="outline">
              Enable
            </Button>
          </div>
          
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <h4 className="font-medium">Automated Monitoring</h4>
              <p className="text-sm text-muted-foreground">
                Receive alerts and recommendations based on environmental data
              </p>
            </div>
            <Button variant="outline">
              Configure
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}