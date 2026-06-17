import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { 
  Sprout, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle,
  Calendar,
  Activity,
  Cloud,
  BarChart3
} from 'lucide-react';
import { motion } from 'motion/react';
import { WeatherAlerts } from './weather-alerts';
import { ImageWithFallback } from './figma/ImageWithFallback';

// Mock data for charts
const healthTrendData = [
  { date: 'Jan', health: 85 },
  { date: 'Feb', health: 82 },
  { date: 'Mar', health: 88 },
  { date: 'Apr', health: 90 },
  { date: 'May', health: 87 },
  { date: 'Jun', health: 92 }
];

const cropTypeData = [
  { name: 'Tomatoes', value: 35, color: '#ef4444' },
  { name: 'Corn', value: 25, color: '#f97316' },
  { name: 'Wheat', value: 20, color: '#eab308' },
  { name: 'Rice', value: 20, color: '#22c55e' }
];

const recentAnalyses = [
  {
    id: 1,
    crop: 'Tomato Plant #1',
    date: '2 hours ago',
    health: 92,
    status: 'healthy',
    issues: []
  },
  {
    id: 2,
    crop: 'Corn Field B',
    date: '1 day ago',
    health: 78,
    status: 'warning',
    issues: ['Early Blight detected']
  },
  {
    id: 3,
    crop: 'Wheat Plot A',
    date: '2 days ago',
    health: 85,
    status: 'healthy',
    issues: []
  },
  {
    id: 4,
    crop: 'Rice Paddy 1',
    date: '3 days ago',
    health: 68,
    status: 'critical',
    issues: ['Nitrogen deficiency', 'Water stress']
  }
];

export const Dashboard = React.memo(function Dashboard() {
  const [activeSection, setActiveSection] = useState('overview');

  const handleSectionChange = React.useCallback((value: string) => {
    setActiveSection(value);
  }, []);

  return (
    <div className="space-y-6">
      {/* Dashboard Navigation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Tabs value={activeSection} onValueChange={handleSectionChange} className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-background/80 backdrop-blur-xl border shadow-lg">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
            >
              <TabsTrigger 
                value="overview" 
                className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-blue-500 data-[state=active]:text-white transition-colors duration-300"
              >
                <BarChart3 className="h-4 w-4" />
                Farm Overview
              </TabsTrigger>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1, duration: 0.4 }}
            >
              <TabsTrigger 
                value="weather" 
                className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white transition-colors duration-300"
              >
                <Cloud className="h-4 w-4" />
                Weather & Alerts
              </TabsTrigger>
            </motion.div>
          </TabsList>

          {/* Farm Overview Tab */}
          <TabsContent value="overview" className="mt-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              {/* Overview Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.5 }}
                >
                  <Card className="hover:shadow-lg transition-shadow duration-300">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Total Plants</CardTitle>
                      <Sprout className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">1,247</div>
                      <p className="text-xs text-muted-foreground">
                        +12% from last month
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  <Card className="hover:shadow-lg transition-shadow duration-300">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Avg Health Score</CardTitle>
                      <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">87%</div>
                      <p className="text-xs text-muted-foreground">
                        +5% from last week
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  <Card className="hover:shadow-lg transition-shadow duration-300">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Active Issues</CardTitle>
                      <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">23</div>
                      <p className="text-xs text-muted-foreground">
                        -8 resolved today
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  <Card className="hover:shadow-lg transition-shadow duration-300">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Healthy Plants</CardTitle>
                      <CheckCircle className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">1,124</div>
                      <p className="text-xs text-muted-foreground">
                        90.1% of total plants
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>

              {/* Charts */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-6"
              >
                <Card className="hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <CardTitle>Health Trend</CardTitle>
                    <CardDescription>
                      Average plant health over the last 6 months
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={healthTrendData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Line 
                          type="monotone" 
                          dataKey="health" 
                          stroke="#22c55e" 
                          strokeWidth={2}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <CardTitle>Crop Distribution</CardTitle>
                    <CardDescription>
                      Distribution of monitored crops by type
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={cropTypeData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={120}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {cropTypeData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="flex flex-wrap gap-2 mt-4">
                      {cropTypeData.map((crop, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <div 
                            className="w-3 h-3 rounded"
                            style={{ backgroundColor: crop.color }}
                          />
                          <span className="text-sm">{crop.name} ({crop.value}%)</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Recent Analyses */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.6 }}
              >
                <Card className="hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Activity className="h-5 w-5" />
                      Recent Analyses
                    </CardTitle>
                    <CardDescription>
                      Latest plant health checks and their results
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentAnalyses.map((analysis, index) => (
                        <motion.div 
                          key={analysis.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1, duration: 0.4 }}
                          className="flex items-center justify-between p-4 border rounded-lg hover:shadow-md transition-all duration-300"
                        >
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                              <Sprout className="h-6 w-6 text-muted-foreground" />
                            </div>
                            <div>
                              <p className="font-medium">{analysis.crop}</p>
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Calendar className="h-3 w-3" />
                                {analysis.date}
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-4">
                            <div className="text-right">
                              <div className="flex items-center gap-2">
                                <span className="text-sm">Health:</span>
                                <Progress value={analysis.health} className="w-16 h-2" />
                                <span className="text-sm font-medium">{analysis.health}%</span>
                              </div>
                              {analysis.issues.length > 0 && (
                                <div className="flex gap-1 mt-1">
                                  {analysis.issues.map((issue, issueIndex) => (
                                    <Badge key={issueIndex} variant="destructive" className="text-xs">
                                      {issue}
                                    </Badge>
                                  ))}
                                </div>
                              )}
                            </div>
                            
                            <Badge 
                              variant={
                                analysis.status === 'healthy' ? 'default' :
                                analysis.status === 'warning' ? 'secondary' : 'destructive'
                              }
                            >
                              {analysis.status}
                            </Badge>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          </TabsContent>

          {/* Weather & Alerts Tab */}
          <TabsContent value="weather" className="mt-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <WeatherAlerts />
            </motion.div>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
});