import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Alert, AlertDescription } from './ui/alert';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Cloud, 
  CloudRain, 
  Sun, 
  CloudSnow, 
  Wind, 
  Thermometer, 
  Droplets, 
  Eye, 
  AlertTriangle, 
  Info, 
  CheckCircle,
  MapPin,
  Bell,
  Settings
} from 'lucide-react';

interface WeatherLocation {
  country: string;
  state: string;
  district: string;
  area: string;
}

interface WeatherAlert {
  id: string;
  type: 'warning' | 'watch' | 'advisory';
  severity: 'low' | 'medium' | 'high' | 'severe';
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  recommendations: string[];
}

interface WeatherData {
  current: {
    temperature: number;
    humidity: number;
    windSpeed: number;
    windDirection: string;
    visibility: number;
    condition: string;
    icon: string;
    pressure: number;
    uvIndex: number;
  };
  forecast: Array<{
    date: string;
    high: number;
    low: number;
    condition: string;
    icon: string;
    precipitation: number;
    humidity: number;
  }>;
  alerts: WeatherAlert[];
}

const locationData = {
  "United States": {
    "California": {
      "Los Angeles County": ["Downtown LA", "Hollywood", "Beverly Hills", "Santa Monica"],
      "San Francisco County": ["San Francisco", "Daly City", "Colma"],
      "Orange County": ["Anaheim", "Irvine", "Santa Ana", "Newport Beach"]
    },
    "Texas": {
      "Harris County": ["Houston", "Pasadena", "Baytown", "Bellaire"],
      "Dallas County": ["Dallas", "Irving", "Garland", "Mesquite"]
    }
  },
  "India": {
    "Maharashtra": {
      "Mumbai": ["Andheri", "Bandra", "Thane", "Navi Mumbai"],
      "Pune": ["Kothrud", "Hadapsar", "Wakad", "Baner"]
    },
    "Karnataka": {
      "Bangalore Urban": ["Whitefield", "Electronic City", "Koramangala", "Indiranagar"],
      "Mysore": ["Mysore City", "Srirangapatna", "Mandya"]
    }
  },
  "Canada": {
    "Ontario": {
      "Toronto": ["Downtown Toronto", "North York", "Scarborough", "Etobicoke"],
      "Ottawa": ["Centretown", "Kanata", "Orleans", "Nepean"]
    },
    "British Columbia": {
      "Vancouver": ["Downtown Vancouver", "Richmond", "Burnaby", "Surrey"]
    }
  }
};

// Mock weather data generation function
const generateWeatherData = (location: WeatherLocation): WeatherData => {
  const conditions = [
    { condition: "Sunny", icon: "sun", temp: 25 },
    { condition: "Partly Cloudy", icon: "cloud", temp: 22 },
    { condition: "Rainy", icon: "rain", temp: 18 },
    { condition: "Stormy", icon: "storm", temp: 16 }
  ];
  
  // Use location as seed for consistent data
  const seed = location.country.length + location.state.length + location.district.length + location.area.length;
  const randomCondition = conditions[seed % conditions.length];
  
  return {
    current: {
      temperature: randomCondition.temp + ((seed * 7) % 10) - 5,
      humidity: 60 + ((seed * 3) % 30),
      windSpeed: 5 + ((seed * 5) % 15),
      windDirection: "NW",
      visibility: 8 + ((seed * 2) % 7),
      condition: randomCondition.condition,
      icon: randomCondition.icon,
      pressure: 1010 + ((seed * 4) % 20),
      uvIndex: (seed * 6) % 11
    },
    forecast: Array.from({ length: 7 }, (_, i) => {
      const baseTemp = randomCondition.temp;
      const dayIndex = (seed + i) % conditions.length;
      return {
        date: new Date(Date.now() + i * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }),
        high: baseTemp + ((seed + i) % 8),
        low: baseTemp - ((seed + i + 1) % 8),
        condition: conditions[dayIndex].condition,
        icon: conditions[dayIndex].icon,
        precipitation: (seed + i * 10) % 100,
        humidity: 50 + ((seed + i * 5) % 40)
      };
    }),
    alerts: [
      {
        id: "1",
        type: "warning",
        severity: "high",
        title: "Heavy Rain Warning",
        description: "Heavy rainfall expected in the next 24-48 hours. Risk of flooding in low-lying areas.",
        startTime: "Today 6:00 PM",
        endTime: "Tomorrow 6:00 AM",
        recommendations: [
          "Ensure proper drainage in crop fields",
          "Cover sensitive plants if possible",
          "Monitor soil moisture levels closely",
          "Prepare for potential harvest delays"
        ]
      },
      {
        id: "2",
        type: "advisory",
        severity: "medium",
        title: "High UV Index Advisory",
        description: "UV index expected to reach very high levels during midday hours.",
        startTime: "Tomorrow 10:00 AM",
        endTime: "Tomorrow 4:00 PM",
        recommendations: [
          "Provide shade for sensitive crops",
          "Consider watering in early morning or evening",
          "Monitor plants for heat stress signs"
        ]
      }
    ]
  };
};

const getWeatherIcon = (iconType: string) => {
  switch (iconType) {
    case 'sun': return <Sun className="h-8 w-8 text-yellow-500" />;
    case 'cloud': return <Cloud className="h-8 w-8 text-gray-500" />;
    case 'rain': return <CloudRain className="h-8 w-8 text-blue-500" />;
    case 'snow': return <CloudSnow className="h-8 w-8 text-blue-300" />;
    case 'storm': return <CloudRain className="h-8 w-8 text-purple-500" />;
    default: return <Sun className="h-8 w-8 text-yellow-500" />;
  }
};

const getAlertIcon = (severity: string) => {
  switch (severity) {
    case 'severe': return <AlertTriangle className="h-5 w-5 text-red-500" />;
    case 'high': return <AlertTriangle className="h-5 w-5 text-orange-500" />;
    case 'medium': return <Info className="h-5 w-5 text-yellow-500" />;
    case 'low': return <CheckCircle className="h-5 w-5 text-green-500" />;
    default: return <Info className="h-5 w-5 text-blue-500" />;
  }
};

const getSeverityColor = (severity: string) => {
  switch (severity) {
    case 'severe': return 'bg-red-50 border-red-200 dark:bg-red-950 dark:border-red-800';
    case 'high': return 'bg-orange-50 border-orange-200 dark:bg-orange-950 dark:border-orange-800';
    case 'medium': return 'bg-yellow-50 border-yellow-200 dark:bg-yellow-950 dark:border-yellow-800';
    case 'low': return 'bg-green-50 border-green-200 dark:bg-green-950 dark:border-green-800';
    default: return 'bg-blue-50 border-blue-200 dark:bg-blue-950 dark:border-blue-800';
  }
};

export const WeatherAlerts = React.memo(function WeatherAlerts() {
  const [location, setLocation] = useState<WeatherLocation>({
    country: '',
    state: '',
    district: '',
    area: ''
  });
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [alertsEnabled, setAlertsEnabled] = useState(true);

  // Memoize location data calculations to prevent unnecessary re-renders
  const countries = React.useMemo(() => Object.keys(locationData), []);
  
  const states = React.useMemo(() => {
    if (!location.country) return [];
    const countryData = locationData[location.country as keyof typeof locationData];
    return countryData ? Object.keys(countryData) : [];
  }, [location.country]);
  
  const districts = React.useMemo(() => {
    if (!location.country || !location.state) return [];
    const countryData = locationData[location.country as keyof typeof locationData] as any;
    const stateData = countryData?.[location.state];
    return stateData ? Object.keys(stateData) : [];
  }, [location.country, location.state]);
  
  const areas = React.useMemo(() => {
    if (!location.country || !location.state || !location.district) return [];
    const countryData = locationData[location.country as keyof typeof locationData] as any;
    const stateData = countryData?.[location.state];
    const districtData = stateData?.[location.district];
    return districtData || [];
  }, [location.country, location.state, location.district]);

  useEffect(() => {
    if (location.country && location.state && location.district && location.area) {
      setLoading(true);
      // Simulate API call with cleanup
      const timeoutId = setTimeout(() => {
        try {
          setWeatherData(generateWeatherData(location));
        } catch (error) {
          console.error('Error generating weather data:', error);
          setWeatherData(null);
        } finally {
          setLoading(false);
        }
      }, 800); // Reduced timeout for better UX

      // Cleanup function to prevent memory leaks
      return () => {
        clearTimeout(timeoutId);
      };
    } else {
      setWeatherData(null);
      setLoading(false);
    }
  }, [location.country, location.state, location.district, location.area]);

  const handleLocationChange = React.useCallback((field: keyof WeatherLocation, value: string) => {
    setLocation(prev => {
      const newLocation = { ...prev, [field]: value };
      // Reset dependent fields
      if (field === 'country') {
        newLocation.state = '';
        newLocation.district = '';
        newLocation.area = '';
      } else if (field === 'state') {
        newLocation.district = '';
        newLocation.area = '';
      } else if (field === 'district') {
        newLocation.area = '';
      }
      return newLocation;
    });
  }, []);

  return (
    <div className="space-y-6">
      {/* Location Selection */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="backdrop-blur-xl bg-background/80 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
          <CardHeader>
            <div className="flex items-center gap-3">
              <motion.div
                className="p-2 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <MapPin className="h-5 w-5 text-white" />
              </motion.div>
              <div>
                <CardTitle>Location Settings</CardTitle>
                <CardDescription>
                  Set your location to receive weather alerts and forecasts
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="space-y-2">
                <label className="font-medium">Country</label>
                <Select value={location.country} onValueChange={(value) => handleLocationChange('country', value)}>
                  <SelectTrigger className="hover:border-blue-400 focus:border-blue-500 transition-colors duration-300">
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                  <SelectContent>
                    {countries.map(country => (
                      <SelectItem key={country} value={country}>{country}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="font-medium">State/Province</label>
                <Select 
                  value={location.state} 
                  onValueChange={(value) => handleLocationChange('state', value)}
                  disabled={!location.country}
                >
                  <SelectTrigger className="hover:border-blue-400 focus:border-blue-500 transition-colors duration-300 disabled:opacity-50">
                    <SelectValue placeholder="Select state" />
                  </SelectTrigger>
                  <SelectContent>
                    {states.map(state => (
                      <SelectItem key={state} value={state}>{state}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="font-medium">District/County</label>
                <Select 
                  value={location.district} 
                  onValueChange={(value) => handleLocationChange('district', value)}
                  disabled={!location.state}
                >
                  <SelectTrigger className="hover:border-blue-400 focus:border-blue-500 transition-colors duration-300 disabled:opacity-50">
                    <SelectValue placeholder="Select district" />
                  </SelectTrigger>
                  <SelectContent>
                    {districts.map(district => (
                      <SelectItem key={district} value={district}>{district}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="font-medium">Area</label>
                <Select 
                  value={location.area} 
                  onValueChange={(value) => handleLocationChange('area', value)}
                  disabled={!location.district}
                >
                  <SelectTrigger className="hover:border-blue-400 focus:border-blue-500 transition-colors duration-300 disabled:opacity-50">
                    <SelectValue placeholder="Select area" />
                  </SelectTrigger>
                  <SelectContent>
                    {areas.map(area => (
                      <SelectItem key={area} value={area}>{area}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t">
              <div className="flex items-center gap-2">
                <Bell className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Weather Alerts</span>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setAlertsEnabled(!alertsEnabled)}
                className={`transition-all duration-300 ${alertsEnabled ? 'bg-green-50 border-green-200 text-green-700 dark:bg-green-950 dark:border-green-800 dark:text-green-300' : ''}`}
              >
                {alertsEnabled ? 'Enabled' : 'Disabled'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Weather Data */}
      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="flex items-center justify-center py-12"
          >
            <div className="text-center space-y-4">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear", repeatType: "loop" }}
                className="mx-auto"
              >
                <Cloud className="h-12 w-12 text-blue-500" />
              </motion.div>
              <p className="text-muted-foreground">Loading weather data...</p>
            </div>
          </motion.div>
        )}

        {weatherData && !loading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {/* Current Weather */}
            <Card className="backdrop-blur-xl bg-background/80 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      {getWeatherIcon(weatherData.current.icon)}
                      Current Weather
                    </CardTitle>
                    <CardDescription>
                      {location.area}, {location.district}, {location.state}
                    </CardDescription>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold">{weatherData.current.temperature}°C</div>
                    <div className="text-sm text-muted-foreground">{weatherData.current.condition}</div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="flex items-center gap-2">
                    <Droplets className="h-4 w-4 text-blue-500" />
                    <div>
                      <div className="text-sm font-medium">{weatherData.current.humidity}%</div>
                      <div className="text-xs text-muted-foreground">Humidity</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Wind className="h-4 w-4 text-gray-500" />
                    <div>
                      <div className="text-sm font-medium">{weatherData.current.windSpeed} km/h</div>
                      <div className="text-xs text-muted-foreground">Wind</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Eye className="h-4 w-4 text-green-500" />
                    <div>
                      <div className="text-sm font-medium">{weatherData.current.visibility} km</div>
                      <div className="text-xs text-muted-foreground">Visibility</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Thermometer className="h-4 w-4 text-red-500" />
                    <div>
                      <div className="text-sm font-medium">{weatherData.current.pressure} mb</div>
                      <div className="text-xs text-muted-foreground">Pressure</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Weather Alerts */}
            {alertsEnabled && weatherData.alerts.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="space-y-4"
              >
                <h3 className="text-xl font-semibold flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-orange-500" />
                  Active Weather Alerts
                </h3>
                {weatherData.alerts.map((alert, index) => (
                  <motion.div
                    key={alert.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                  >
                    <Alert className={`${getSeverityColor(alert.severity)} hover:shadow-lg transition-all duration-300`}>
                      <div className="flex items-start gap-3">
                        {getAlertIcon(alert.severity)}
                        <div className="flex-1 space-y-2">
                          <div className="flex items-center gap-2">
                            <h4 className="font-semibold">{alert.title}</h4>
                            <Badge variant="outline" className="text-xs">
                              {alert.type.toUpperCase()}
                            </Badge>
                          </div>
                          <AlertDescription>{alert.description}</AlertDescription>
                          <div className="text-xs text-muted-foreground">
                            {alert.startTime} - {alert.endTime}
                          </div>
                          <div className="space-y-1">
                            <div className="text-sm font-medium">Farming Recommendations:</div>
                            <ul className="text-sm text-muted-foreground space-y-1">
                              {alert.recommendations.map((rec, i) => (
                                <li key={i} className="flex items-start gap-2">
                                  <div className="w-1 h-1 rounded-full bg-current mt-2 flex-shrink-0" />
                                  {rec}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </Alert>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {/* 7-Day Forecast */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <Card className="backdrop-blur-xl bg-background/80 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardHeader>
                  <CardTitle>7-Day Forecast</CardTitle>
                  <CardDescription>
                    Extended weather outlook for farming planning
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
                    {weatherData.forecast.map((day, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05, duration: 0.4 }}
                        className="text-center p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors duration-300"
                      >
                        <div className="text-sm font-medium mb-2">{day.date}</div>
                        <div className="mb-2">{getWeatherIcon(day.icon)}</div>
                        <div className="text-sm space-y-1">
                          <div className="font-semibold">{day.high}°</div>
                          <div className="text-muted-foreground">{day.low}°</div>
                          <div className="text-xs text-blue-600">{day.precipitation}%</div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {!weatherData && !loading && location.area && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-12"
        >
          <Cloud className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">Ready to Load Weather Data</h3>
          <p className="text-muted-foreground">
            Complete your location selection to view weather information and alerts.
          </p>
        </motion.div>
      )}
    </div>
  );
});