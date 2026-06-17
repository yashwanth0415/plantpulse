import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import { Upload, Camera, Loader2, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface PlantUploadProps {
  onAnalysisComplete: (result: any) => void;
}

export function PlantUpload({ onAnalysisComplete }: PlantUploadProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [formData, setFormData] = useState({
    cropType: '',
    soilType: '',
    irrigationFrequency: '',
    lastFertilizer: '',
    symptoms: ''
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleAnalyze = async () => {
    if (!selectedFile) return;
    
    setIsAnalyzing(true);
    
    // Simulate AI analysis
    setTimeout(() => {
      const mockResult = {
        diseaseDetected: Math.random() > 0.5,
        diseaseName: 'Early Blight',
        confidence: Math.round(Math.random() * 30 + 70),
        severity: ['Mild', 'Moderate', 'Severe'][Math.floor(Math.random() * 3)],
        recommendations: [
          'Apply copper-based fungicide spray',
          'Improve air circulation around plants',
          'Reduce watering frequency',
          'Remove affected leaves immediately'
        ],
        healthScore: Math.round(Math.random() * 40 + 60),
        nutrientDeficiency: Math.random() > 0.7 ? 'Nitrogen deficiency detected' : null,
        waterStress: Math.random() > 0.8 ? 'Signs of water stress' : null
      };
      
      setIsAnalyzing(false);
      onAnalysisComplete(mockResult);
    }, 3000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Image Upload Section */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] border-0 bg-gradient-to-br from-background via-background to-green-50/30 dark:to-green-950/30 group">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 group-hover:text-green-600 transition-colors duration-300">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <Camera className="h-5 w-5" />
              </motion.div>
              Plant Photo Upload
            </CardTitle>
            <CardDescription>
              Upload a clear photo of your plant for AI analysis
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <motion.div 
              className="border-2 border-dashed border-border rounded-xl p-8 text-center relative overflow-hidden group-hover:border-green-400 transition-colors duration-300"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-green-400/5 to-blue-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              {previewUrl ? (
                <motion.div 
                  className="space-y-4"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="relative group/image">
                    <ImageWithFallback
                      src={previewUrl}
                      alt="Plant preview"
                      className="w-full h-48 object-cover rounded-xl shadow-lg group-hover/image:shadow-2xl transition-all duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent rounded-xl opacity-0 group-hover/image:opacity-100 transition-opacity duration-300" />
                  </div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      variant="outline"
                      onClick={() => {
                        setPreviewUrl('');
                        setSelectedFile(null);
                      }}
                      className="hover:bg-red-50 hover:text-red-600 hover:border-red-200 dark:hover:bg-red-950 dark:hover:text-red-400 dark:hover:border-red-800"
                    >
                      Remove Photo
                    </Button>
                  </motion.div>
                </motion.div>
              ) : (
                <div className="space-y-6 relative z-10">
                  <motion.div
                    animate={{ 
                      y: [0, -10, 0],
                      rotate: [0, 5, -5, 0]
                    }}
                    transition={{ 
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <Upload className="h-16 w-16 mx-auto text-muted-foreground group-hover:text-green-500 transition-colors duration-300" />
                  </motion.div>
                  <div>
                    <Label htmlFor="file-upload" className="cursor-pointer">
                      <motion.div 
                        className="space-y-3"
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 400, damping: 17 }}
                      >
                        <p className="text-lg font-medium group-hover:text-green-600 transition-colors duration-300">
                          Click to upload or drag and drop
                        </p>
                        <p className="text-sm text-muted-foreground">
                          PNG, JPG up to 10MB
                        </p>
                        <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                          <Sparkles className="h-3 w-3" />
                          <span>AI-powered analysis ready</span>
                        </div>
                      </motion.div>
                    </Label>
                    <Input
                      id="file-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                  </div>
                </div>
              )}
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Crop Information Form */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Card className="hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] border-0 bg-gradient-to-br from-background via-background to-blue-50/30 dark:to-blue-950/30 group">
          <CardHeader>
            <CardTitle className="group-hover:text-blue-600 transition-colors duration-300">
              Crop Information
            </CardTitle>
            <CardDescription>
              Provide details about your crop for better analysis
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
          {[
            {
              id: "crop-type",
              label: "Crop Type",
              type: "select",
              value: formData.cropType,
              onChange: (value: string) => setFormData(prev => ({ ...prev, cropType: value })),
              placeholder: "Select crop type",
              options: [
                { value: "tomato", label: "Tomato" },
                { value: "corn", label: "Corn" },
                { value: "wheat", label: "Wheat" },
                { value: "rice", label: "Rice" },
                { value: "potato", label: "Potato" },
                { value: "soybean", label: "Soybean" },
                { value: "cucumber", label: "Cucumber" },
                { value: "pepper", label: "Pepper" }
              ]
            },
            {
              id: "soil-type",
              label: "Soil Type",
              type: "select",
              value: formData.soilType,
              onChange: (value: string) => setFormData(prev => ({ ...prev, soilType: value })),
              placeholder: "Select soil type",
              options: [
                { value: "clay", label: "Clay" },
                { value: "sandy", label: "Sandy" },
                { value: "loamy", label: "Loamy" },
                { value: "silt", label: "Silt" },
                { value: "mixed", label: "Mixed" }
              ]
            },
            {
              id: "irrigation",
              label: "Irrigation Frequency",
              type: "select",
              value: formData.irrigationFrequency,
              onChange: (value: string) => setFormData(prev => ({ ...prev, irrigationFrequency: value })),
              placeholder: "Select irrigation frequency",
              options: [
                { value: "daily", label: "Daily" },
                { value: "every-2-days", label: "Every 2 days" },
                { value: "weekly", label: "Weekly" },
                { value: "bi-weekly", label: "Bi-weekly" },
                { value: "as-needed", label: "As needed" }
              ]
            }
          ].map((field, index) => (
            <motion.div 
              key={field.id}
              className="space-y-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
            >
              <Label htmlFor={field.id} className="group-hover:text-blue-600 transition-colors duration-300">
                {field.label}
              </Label>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileFocus={{ scale: 1.02 }}
              >
                <Select
                  value={field.value}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger className="hover:border-blue-400 focus:border-blue-500 transition-colors duration-300">
                    <SelectValue placeholder={field.placeholder} />
                  </SelectTrigger>
                  <SelectContent>
                    {field.options?.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </motion.div>
            </motion.div>
          ))}

          <motion.div 
            className="space-y-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
          >
            <Label htmlFor="fertilizer" className="group-hover:text-blue-600 transition-colors duration-300">
              Last Fertilizer Application
            </Label>
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileFocus={{ scale: 1.02 }}
            >
              <Input
                id="fertilizer"
                placeholder="e.g., NPK 20-20-20, 2 weeks ago"
                value={formData.lastFertilizer}
                onChange={(e) => setFormData(prev => ({ ...prev, lastFertilizer: e.target.value }))}
                className="hover:border-blue-400 focus:border-blue-500 transition-colors duration-300"
              />
            </motion.div>
          </motion.div>

          <motion.div 
            className="space-y-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.4 }}
          >
            <Label htmlFor="symptoms" className="group-hover:text-blue-600 transition-colors duration-300">
              Observed Symptoms (Optional)
            </Label>
            <motion.div
              whileHover={{ scale: 1.01 }}
              whileFocus={{ scale: 1.01 }}
            >
              <Textarea
                id="symptoms"
                placeholder="Describe any symptoms you've noticed..."
                value={formData.symptoms}
                onChange={(e) => setFormData(prev => ({ ...prev, symptoms: e.target.value }))}
                className="hover:border-blue-400 focus:border-blue-500 transition-colors duration-300 min-h-[100px]"
              />
            </motion.div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button
              onClick={handleAnalyze}
              disabled={!selectedFile || isAnalyzing}
              className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 py-6 text-lg relative overflow-hidden group/button"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-green-600 opacity-0 group-hover/button:opacity-100 transition-opacity duration-300" />
              <div className="relative z-10 flex items-center justify-center">
                {isAnalyzing ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      <Loader2 className="h-5 w-5 mr-3" />
                    </motion.div>
                    <span>Analyzing Plant...</span>
                    <motion.div
                      className="ml-2"
                      animate={{ opacity: [0, 1, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <Sparkles className="h-4 w-4" />
                    </motion.div>
                  </>
                ) : (
                  <>
                    <Sparkles className="h-5 w-5 mr-2" />
                    Analyze Plant Health
                  </>
                )}
              </div>
            </Button>
          </motion.div>
        </CardContent>
      </Card>
      </motion.div>
    </div>
  );
}