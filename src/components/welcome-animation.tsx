import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Leaf, Heart } from 'lucide-react';

interface WelcomeAnimationProps {
  userName: string;
  onComplete: () => void;
}

export function WelcomeAnimation({ userName, onComplete }: WelcomeAnimationProps) {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setCurrentStep(1), 1000),
      setTimeout(() => setCurrentStep(2), 2500),
      setTimeout(() => setCurrentStep(3), 4000),
      setTimeout(() => onComplete(), 5500),
    ];

    return () => timers.forEach(timer => clearTimeout(timer));
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-green-500/20 via-blue-500/20 to-purple-500/20 backdrop-blur-xl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Animated Background Particles */}
      {Array.from({ length: 50 }, (_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-gradient-to-r from-green-400 to-blue-400 rounded-full"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            scale: 0,
          }}
          animate={{
            scale: [0, 1, 0],
            rotate: 360,
          }}
          transition={{
            duration: 3,
            delay: Math.random() * 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}

      <div className="text-center space-y-8 relative z-10">
        {/* Logo Animation */}
        <motion.div
          className="flex items-center justify-center"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <motion.div
            className="p-6 bg-gradient-to-br from-green-400 to-green-600 rounded-full shadow-2xl"
            animate={{ 
              boxShadow: [
                "0 0 20px rgba(34, 197, 94, 0.3)",
                "0 0 40px rgba(34, 197, 94, 0.6)",
                "0 0 20px rgba(34, 197, 94, 0.3)"
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Leaf className="h-16 w-16 text-white" />
          </motion.div>
        </motion.div>

        {/* Welcome Text */}
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: currentStep >= 1 ? 1 : 0, y: currentStep >= 1 ? 0 : 30 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="text-5xl font-bold bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
            Welcome to PlantPulse!
          </h1>
          
          <motion.div
            className="flex items-center justify-center gap-3"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ 
              opacity: currentStep >= 2 ? 1 : 0, 
              scale: currentStep >= 2 ? 1 : 0.5 
            }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <Sparkles className="h-6 w-6 text-yellow-500" />
            <span className="text-2xl text-foreground">
              Hello, <span className="font-bold text-green-600">{userName}</span>!
            </span>
            <Heart className="h-6 w-6 text-red-500" />
          </motion.div>
        </motion.div>

        {/* Feature Highlights */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: currentStep >= 3 ? 1 : 0, y: currentStep >= 3 ? 0 : 40 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {[
            {
              icon: "🌱",
              title: "AI-Powered Analysis",
              description: "Smart crop health monitoring"
            },
            {
              icon: "📊",
              title: "Real-time Insights",
              description: "Track your farm's progress"
            },
            {
              icon: "💡",
              title: "Smart Recommendations",
              description: "Personalized farming tips"
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              className="bg-background/50 backdrop-blur-lg rounded-2xl p-6 border border-white/10"
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ 
                opacity: currentStep >= 3 ? 1 : 0, 
                scale: currentStep >= 3 ? 1 : 0.8,
                y: currentStep >= 3 ? 0 : 20
              }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.2,
                ease: "easeOut" 
              }}
            >
              <div className="text-4xl mb-3">{feature.icon}</div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-sm">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Loading indicator */}
        <motion.div
          className="flex items-center justify-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <motion.div
            className="w-2 h-2 bg-green-500 rounded-full"
            animate={{ scale: [1, 1.5, 1] }}
            transition={{ duration: 1, repeat: Infinity, delay: 0 }}
          />
          <motion.div
            className="w-2 h-2 bg-blue-500 rounded-full"
            animate={{ scale: [1, 1.5, 1] }}
            transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
          />
          <motion.div
            className="w-2 h-2 bg-purple-500 rounded-full"
            animate={{ scale: [1, 1.5, 1] }}
            transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
          />
        </motion.div>

        <motion.p
          className="text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 0.5 }}
        >
          Setting up your smart farming dashboard...
        </motion.p>
      </div>
    </motion.div>
  );
}