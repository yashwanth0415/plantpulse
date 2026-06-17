import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card';
import { Badge } from './components/ui/badge';
import { Button } from './components/ui/button';
import { 
  Camera, 
  BarChart3, 
  Lightbulb, 
  History,
  Leaf,
  Brain,
  Shield,
  TrendingUp
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ThemeProvider } from './components/theme-provider';
import { AnimatedBackground } from './components/animated-background';
import { Navigation } from './components/navigation';
import { SignIn } from './components/auth/signin';
import { SignUp } from './components/auth/signup';
import { WelcomeAnimation } from './components/welcome-animation';
import { PlantUpload } from './components/plant-upload';
import { AnalysisResults } from './components/analysis-results';
import { Dashboard } from './components/dashboard';
import { Recommendations } from './components/recommendations';
import { ImageWithFallback } from './components/figma/ImageWithFallback';

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: 'easeOut' }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

type AuthState = 'signin' | 'signup' | 'authenticated' | null;

export default function App() {
  const [activeTab, setActiveTab] = useState('upload');
  const [analysisResult, setAnalysisResult] = useState(null);
  const [authState, setAuthState] = useState<AuthState>(null);
  const [user, setUser] = useState<{ email: string; name: string } | null>(null);
  const [showWelcome, setShowWelcome] = useState(false);

  const handleAnalysisComplete = (result: any) => {
    setAnalysisResult(result);
    setActiveTab('results');
  };

  const handleSignIn = (email: string, name: string) => {
    setUser({ email, name });
    setAuthState('authenticated');
    setShowWelcome(true);
  };

  const handleSignUp = (email: string, name: string) => {
    setUser({ email, name });
    setAuthState('authenticated');
    setShowWelcome(true);
  };

  const handleSignOut = () => {
    setUser(null);
    setAuthState(null);
    setActiveTab('upload');
    setAnalysisResult(null);
  };

  const handleWelcomeComplete = () => {
    setShowWelcome(false);
  };

  return (
    <ThemeProvider defaultTheme="system" storageKey="plantpulse-theme">
      <div className="min-h-screen bg-background relative overflow-hidden">
        <AnimatedBackground />
        
        <AnimatePresence mode="wait">
          {/* Authentication Screens */}
          {authState === 'signin' && (
            <motion.div
              key="signin"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <SignIn 
                onSignIn={handleSignIn} 
                onSwitchToSignUp={() => setAuthState('signup')} 
              />
            </motion.div>
          )}

          {authState === 'signup' && (
            <motion.div
              key="signup"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <SignUp 
                onSignUp={handleSignUp} 
                onSwitchToSignIn={() => setAuthState('signin')} 
              />
            </motion.div>
          )}

          {/* Welcome Animation */}
          {showWelcome && user && (
            <WelcomeAnimation 
              userName={user.name} 
              onComplete={handleWelcomeComplete} 
            />
          )}

          {/* Main Application */}
          {(authState === 'authenticated' || authState === null) && !showWelcome && (
            <motion.div
              key="main-app"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Navigation */}
              <Navigation
                user={user}
                onSignIn={() => setAuthState('signin')}
                onSignUp={() => setAuthState('signup')}
                onSignOut={handleSignOut}
              />

              {/* Hero Section - Only show if not authenticated */}
              {!user && (
                <motion.section 
                  className="relative py-20 overflow-hidden"
                  initial="initial"
                  animate="animate"
                  variants={staggerContainer}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-green-50/80 via-blue-50/60 to-purple-50/80 dark:from-green-950/20 dark:via-blue-950/10 dark:to-purple-950/20" />
                  <div className="container mx-auto px-4 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                      <motion.div className="space-y-8" variants={fadeInUp}>
                        <motion.h2 
                          className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent leading-tight"
                          variants={fadeInUp}
                        >
                          Monitor Your Crops with AI Intelligence
                        </motion.h2>
                        <motion.p 
                          className="text-xl text-foreground/80 leading-relaxed"
                          variants={fadeInUp}
                        >
                          Upload plant photos and get instant AI-powered health analysis, 
                          disease detection, and personalized care recommendations to optimize your harvest.
                        </motion.p>
                        <motion.div 
                          className="flex flex-wrap gap-6"
                          variants={fadeInUp}
                        >
                          {[
                            { icon: Camera, text: "Image-based Analysis", color: "text-green-600" },
                            { icon: Brain, text: "AI Disease Detection", color: "text-blue-600" },
                            { icon: TrendingUp, text: "Growth Tracking", color: "text-purple-600" }
                          ].map((feature, index) => (
                            <motion.div 
                              key={index}
                              className="flex items-center gap-3 group"
                              whileHover={{ scale: 1.05, x: 5 }}
                              transition={{ type: "spring", stiffness: 400, damping: 17 }}
                            >
                              <motion.div
                                className={`p-2 rounded-lg bg-gradient-to-br ${
                                  feature.color === "text-green-600" ? "from-green-100 to-green-200 dark:from-green-900 dark:to-green-800" :
                                  feature.color === "text-blue-600" ? "from-blue-100 to-blue-200 dark:from-blue-900 dark:to-blue-800" :
                                  "from-purple-100 to-purple-200 dark:from-purple-900 dark:to-purple-800"
                                } group-hover:shadow-lg transition-all duration-300`}
                                whileHover={{ rotate: 360 }}
                                transition={{ duration: 0.6 }}
                              >
                                <feature.icon className={`h-5 w-5 ${feature.color}`} />
                              </motion.div>
                              <span className="font-medium group-hover:text-primary transition-colors duration-300">
                                {feature.text}
                              </span>
                            </motion.div>
                          ))}
                        </motion.div>
                        <motion.div variants={fadeInUp}>
                          <Button 
                            size="lg" 
                            className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 px-8 py-3"
                            onClick={() => setAuthState('signup')}
                          >
                            Get Started Today
                          </Button>
                        </motion.div>
                      </motion.div>
                      <motion.div 
                        className="relative"
                        variants={fadeInUp}
                      >
                        <motion.div
                          className="relative group"
                          whileHover={{ scale: 1.02, rotateY: 5 }}
                          transition={{ duration: 0.4 }}
                        >
                          <div className="absolute -inset-4 bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 rounded-2xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-500" />
                          <ImageWithFallback
                            src="https://images.unsplash.com/photo-1666987571351-737b29874697?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGh5JTIwcGxhbnQlMjBjcm9wcyUyMGZhcm1pbmclMjBhZ3JpY3VsdHVyZXxlbnwxfHx8fDE3NTgyOTE2OTl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                            alt="Healthy crops in a farm"
                            className="relative w-full h-96 object-cover rounded-2xl shadow-2xl group-hover:shadow-3xl transition-all duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent rounded-2xl" />
                        </motion.div>
                      </motion.div>
                    </div>
                  </div>
                </motion.section>
              )}

              {/* User-specific welcome section */}
              {user && (
                <motion.section 
                  className="relative py-12 overflow-hidden"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="container mx-auto px-4 relative z-10">
                    <div className="text-center space-y-4">
                      <motion.h2 
                        className="text-4xl font-bold bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                      >
                        Welcome back, {user.name}! 🌱
                      </motion.h2>
                      <motion.p 
                        className="text-xl text-muted-foreground"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                      >
                        Let's continue monitoring your crops and optimizing your harvest
                      </motion.p>
                    </div>
                  </div>
                </motion.section>
              )}

              {/* Main Content - Only show if authenticated */}
              {user && (
                <main className="container mx-auto px-4 py-12 relative z-10">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <TabsList className="grid w-full grid-cols-4 bg-background/80 backdrop-blur-xl border shadow-lg">
                {[
                  { value: "upload", icon: Camera, label: "Upload & Analyze" },
                  { value: "dashboard", icon: BarChart3, label: "Dashboard" },
                  { value: "recommendations", icon: Lightbulb, label: "Recommendations" },
                  { value: "results", icon: History, label: "Latest Results", disabled: !analysisResult }
                ].map((tab, index) => (
                  <motion.div
                    key={tab.value}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.4 }}
                  >
                    <TabsTrigger 
                      value={tab.value} 
                      className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-blue-500 data-[state=active]:text-white transition-all duration-300 hover:scale-105 relative overflow-hidden group"
                      disabled={tab.disabled}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-blue-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <tab.icon className="h-4 w-4 relative z-10" />
                      <span className="relative z-10">{tab.label}</span>
                    </TabsTrigger>
                  </motion.div>
                ))}
              </TabsList>
            </motion.div>

            <TabsContent value="upload" className="mt-8">
              <motion.div 
                className="space-y-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <motion.div 
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <h3 className="text-3xl font-bold mb-3 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                    Plant Health Analysis
                  </h3>
                  <p className="text-lg text-muted-foreground">
                    Upload a photo of your plant and provide crop details for comprehensive AI analysis
                  </p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                >
                  <PlantUpload onAnalysisComplete={handleAnalysisComplete} />
                </motion.div>
              </motion.div>
            </TabsContent>

            <TabsContent value="dashboard" className="mt-8">
              <motion.div 
                className="space-y-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <h3 className="text-3xl font-bold mb-3 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Farm Overview
                  </h3>
                  <p className="text-lg text-muted-foreground">
                    Monitor your overall farm health, track trends, and manage your crops
                  </p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                >
                  <Dashboard />
                </motion.div>
              </motion.div>
            </TabsContent>

            <TabsContent value="recommendations" className="mt-8">
              <motion.div 
                className="space-y-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <h3 className="text-3xl font-bold mb-3 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    Smart Recommendations
                  </h3>
                  <p className="text-lg text-muted-foreground">
                    AI-generated care suggestions and seasonal farming tips
                  </p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                >
                  <Recommendations />
                </motion.div>
              </motion.div>
            </TabsContent>

            <TabsContent value="results" className="mt-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {analysisResult ? (
                  <div className="space-y-8">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      <h3 className="text-3xl font-bold mb-3 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                        Analysis Results
                      </h3>
                      <p className="text-lg text-muted-foreground">
                        Detailed AI analysis of your plant's health and condition
                      </p>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, y: 40 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2, duration: 0.6 }}
                    >
                      <AnalysisResults result={analysisResult} />
                    </motion.div>
                    <motion.div 
                      className="flex gap-4"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      <Button 
                        onClick={() => setActiveTab('upload')}
                        className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white"
                      >
                        Analyze Another Plant
                      </Button>
                      <Button 
                        variant="outline" 
                        onClick={() => setActiveTab('recommendations')}
                        className="hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 dark:hover:from-purple-950 dark:hover:to-pink-950"
                      >
                        View Recommendations
                      </Button>
                    </motion.div>
                  </div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4 }}
                  >
                    <Card className="hover:shadow-xl transition-all duration-500 hover:scale-[1.02] border-0 bg-gradient-to-br from-background via-background to-muted/20">
                      <CardHeader>
                        <CardTitle>No Results Yet</CardTitle>
                        <CardDescription>
                          Upload and analyze a plant photo to see results here
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Button 
                          onClick={() => setActiveTab('upload')}
                          className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white"
                        >
                          Start Analysis
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                )}
              </motion.div>
            </TabsContent>
                </Tabs>
                </main>
              )}

              {/* Features Section - Only show if not authenticated */}
              {!user && (
        <motion.section 
          className="py-20 relative overflow-hidden"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-muted/30 via-background to-muted/30" />
          <div className="container mx-auto px-4 relative z-10">
            <motion.div 
              className="text-center mb-16"
              variants={fadeInUp}
            >
              <h3 className="text-4xl font-bold mb-4 bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
                Why Choose PlantPulse?
              </h3>
              <p className="text-xl text-muted-foreground">
                Advanced AI technology meets practical farming solutions
              </p>
            </motion.div>
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
              variants={staggerContainer}
            >
              {[
                {
                  icon: Brain,
                  title: "AI-Powered Detection",
                  description: "Advanced computer vision algorithms identify diseases, pests, and nutrient deficiencies",
                  gradient: "from-blue-500 to-purple-600",
                  bgGradient: "from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950"
                },
                {
                  icon: TrendingUp,
                  title: "Growth Tracking",
                  description: "Monitor plant health over time and track improvements with detailed analytics",
                  gradient: "from-green-500 to-emerald-600",
                  bgGradient: "from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950"
                },
                {
                  icon: Lightbulb,
                  title: "Smart Recommendations",
                  description: "Get personalized care suggestions based on your specific crops and conditions",
                  gradient: "from-yellow-500 to-orange-600",
                  bgGradient: "from-yellow-50 to-orange-50 dark:from-yellow-950 dark:to-orange-950"
                },
                {
                  icon: Shield,
                  title: "Preventive Care",
                  description: "Early detection helps prevent issues before they become serious problems",
                  gradient: "from-purple-500 to-pink-600",
                  bgGradient: "from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950"
                }
              ].map((feature, index) => (
                <motion.div key={index} variants={fadeInUp}>
                  <Card className={`h-full hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:-translate-y-2 border-0 bg-gradient-to-br ${feature.bgGradient} group cursor-pointer relative overflow-hidden`}>
                    <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                    <CardHeader className="relative z-10">
                      <motion.div
                        className={`p-3 rounded-xl bg-gradient-to-br ${feature.gradient} w-fit mb-4 group-hover:scale-110 transition-transform duration-300`}
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                      >
                        <feature.icon className="h-8 w-8 text-white" />
                      </motion.div>
                      <CardTitle className="text-xl group-hover:text-primary transition-colors duration-300">
                        {feature.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="relative z-10">
                      <p className="text-muted-foreground group-hover:text-foreground/80 transition-colors duration-300">
                        {feature.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.section>
              )}

              {/* Footer */}
        <motion.footer 
          className="border-t backdrop-blur-xl bg-background/80 py-8 relative"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="container mx-auto px-4">
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <p className="text-muted-foreground text-lg">
                © MREC 2025 PlantPulse. Empowering farmers with AI technology
              </p>
              <motion.div 
                className="flex items-center justify-center gap-2 mt-2"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                <Leaf className="h-4 w-4 text-green-600" />
                <span className="text-sm text-muted-foreground">
                  Growing healthier crops, one analysis at a time
                  @yashwanth0415
                </span>
              </motion.div>
            </motion.div>
          </div>
        </motion.footer>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </ThemeProvider>
  );
}