import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Alert, AlertDescription } from './ui/alert';
import { 
  AlertTriangle, 
  CheckCircle, 
  Droplets, 
  Leaf, 
  TrendingUp,
  Lightbulb
} from 'lucide-react';

interface AnalysisResult {
  diseaseDetected: boolean;
  diseaseName?: string;
  confidence: number;
  severity: string;
  recommendations: string[];
  healthScore: number;
  nutrientDeficiency?: string;
  waterStress?: string;
}

interface AnalysisResultsProps {
  result: AnalysisResult;
}

export function AnalysisResults({ result }: AnalysisResultsProps) {
  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'mild': return 'bg-yellow-500';
      case 'moderate': return 'bg-orange-500';
      case 'severe': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getHealthScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-6">
      {/* Health Score Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Plant Health Score
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <Progress value={result.healthScore} className="h-3" />
            </div>
            <div className={`text-2xl font-bold ${getHealthScoreColor(result.healthScore)}`}>
              {result.healthScore}%
            </div>
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            Overall health assessment based on visual analysis
          </p>
        </CardContent>
      </Card>

      {/* Disease Detection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {result.diseaseDetected ? (
              <AlertTriangle className="h-5 w-5 text-orange-500" />
            ) : (
              <CheckCircle className="h-5 w-5 text-green-500" />
            )}
            Disease Detection
          </CardTitle>
        </CardHeader>
        <CardContent>
          {result.diseaseDetected ? (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Badge variant="destructive">{result.diseaseName}</Badge>
                <Badge 
                  variant="outline" 
                  className={getSeverityColor(result.severity)}
                >
                  {result.severity} Severity
                </Badge>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Confidence:</span>
                <span className="font-medium">{result.confidence}%</span>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-green-600">
              <CheckCircle className="h-4 w-4" />
              <span>No diseases detected</span>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Additional Issues */}
      {(result.nutrientDeficiency || result.waterStress) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {result.nutrientDeficiency && (
            <Alert>
              <Leaf className="h-4 w-4" />
              <AlertDescription>
                {result.nutrientDeficiency}
              </AlertDescription>
            </Alert>
          )}
          {result.waterStress && (
            <Alert>
              <Droplets className="h-4 w-4" />
              <AlertDescription>
                {result.waterStress}
              </AlertDescription>
            </Alert>
          )}
        </div>
      )}

      {/* Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5" />
            Recommendations
          </CardTitle>
          <CardDescription>
            AI-generated care suggestions based on analysis
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {result.recommendations.map((recommendation, index) => (
              <li key={index} className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                <span>{recommendation}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}