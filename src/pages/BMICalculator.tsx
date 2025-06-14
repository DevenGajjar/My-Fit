
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calculator, User, Activity, ToggleLeft, ToggleRight } from 'lucide-react';
import Navigation from '@/components/Navigation';

const BMICalculator = () => {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [age, setAge] = useState('');
  const [bmi, setBmi] = useState<number | null>(null);
  const [category, setCategory] = useState('');
  const [isMetric, setIsMetric] = useState(true);

  const calculateBMI = () => {
    if (height && weight) {
      let heightInMeters: number;
      let weightInKg: number;

      if (isMetric) {
        heightInMeters = parseFloat(height) / 100;
        weightInKg = parseFloat(weight);
      } else {
        // Convert feet/inches to meters and pounds to kg
        const feet = Math.floor(parseFloat(height) / 12);
        const inches = parseFloat(height) % 12;
        heightInMeters = (feet * 12 + inches) * 0.0254;
        weightInKg = parseFloat(weight) * 0.453592;
      }

      const bmiValue = weightInKg / (heightInMeters * heightInMeters);
      setBmi(parseFloat(bmiValue.toFixed(1)));
      
      if (bmiValue < 18.5) {
        setCategory('Underweight');
      } else if (bmiValue >= 18.5 && bmiValue < 25) {
        setCategory('Normal weight');
      } else if (bmiValue >= 25 && bmiValue < 30) {
        setCategory('Overweight');
      } else {
        setCategory('Obese');
      }
    }
  };

  const getBMIColor = () => {
    if (!bmi) return 'text-gray-400';
    if (bmi < 18.5) return 'text-blue-400';
    if (bmi >= 18.5 && bmi < 25) return 'text-green-400';
    if (bmi >= 25 && bmi < 30) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getCategoryColor = () => {
    if (!category) return 'bg-gray-700';
    if (category === 'Underweight') return 'bg-blue-600';
    if (category === 'Normal weight') return 'bg-green-600';
    if (category === 'Overweight') return 'bg-yellow-600';
    return 'bg-red-600';
  };

  const toggleUnits = () => {
    setIsMetric(!isMetric);
    setHeight('');
    setWeight('');
    setBmi(null);
    setCategory('');
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navigation />
      
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">
              BMI Calculator
            </h2>
            <p className="text-gray-400 text-lg">
              Calculate your Body Mass Index and understand your health metrics
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Input Section */}
            <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Calculator className="h-5 w-5 text-blue-400" />
                  Calculate Your BMI
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Unit Toggle */}
                <div className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg">
                  <span className="text-gray-300">Units: {isMetric ? 'Metric' : 'Imperial'}</span>
                  <Button
                    onClick={toggleUnits}
                    variant="ghost"
                    className="p-2 hover:bg-gray-600"
                  >
                    {isMetric ? (
                      <ToggleLeft className="h-6 w-6 text-blue-400" />
                    ) : (
                      <ToggleRight className="h-6 w-6 text-blue-400" />
                    )}
                  </Button>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="height" className="text-gray-300">
                    Height {isMetric ? '(cm)' : '(inches)'}
                  </Label>
                  <Input
                    id="height"
                    type="number"
                    placeholder={isMetric ? "Enter height in cm" : "Enter height in inches"}
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="weight" className="text-gray-300">
                    Weight {isMetric ? '(kg)' : '(lbs)'}
                  </Label>
                  <Input
                    id="weight"
                    type="number"
                    placeholder={isMetric ? "Enter weight in kg" : "Enter weight in lbs"}
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="age" className="text-gray-300">Age (years)</Label>
                  <Input
                    id="age"
                    type="number"
                    placeholder="Enter your age"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                </div>

                <Button 
                  onClick={calculateBMI}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white text-lg py-3 rounded-xl"
                  disabled={!height || !weight}
                >
                  <Activity className="h-5 w-5 mr-2" />
                  Calculate BMI
                </Button>
              </CardContent>
            </Card>

            {/* Results Section */}
            <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <User className="h-5 w-5 text-blue-400" />
                  Your Results
                </CardTitle>
              </CardHeader>
              <CardContent>
                {bmi ? (
                  <div className="space-y-6">
                    <div className="text-center">
                      <div className={`text-6xl font-bold mb-2 ${getBMIColor()}`}>
                        {bmi}
                      </div>
                      <p className="text-gray-400 text-lg">Your BMI</p>
                      {age && (
                        <p className="text-gray-500 text-sm mt-2">Age: {age} years</p>
                      )}
                    </div>

                    <div className="text-center">
                      <div className={`inline-block px-6 py-3 rounded-full text-white font-semibold ${getCategoryColor()}`}>
                        {category}
                      </div>
                    </div>

                    <div className="space-y-4 bg-gray-700/30 p-6 rounded-xl border border-gray-600">
                      <h4 className="font-semibold text-white text-lg">BMI Categories:</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-blue-400">Underweight:</span>
                          <span className="text-gray-300">Below 18.5</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-green-400">Normal weight:</span>
                          <span className="text-gray-300">18.5 - 24.9</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-yellow-400">Overweight:</span>
                          <span className="text-gray-300">25.0 - 29.9</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-red-400">Obese:</span>
                          <span className="text-gray-300">30.0 and above</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Calculator className="h-16 w-16 text-gray-600 mx-auto mb-4" />
                    <p className="text-gray-400 text-lg">
                      Enter your details to calculate your BMI
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Information Cards */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
              <CardContent className="p-6">
                <h3 className="font-semibold text-white text-lg mb-3">What is BMI?</h3>
                <p className="text-gray-400 leading-relaxed">
                  Body Mass Index (BMI) is a measure of body fat based on height and weight. 
                  It's used as a screening tool to identify possible weight problems in adults.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
              <CardContent className="p-6">
                <h3 className="font-semibold text-white text-lg mb-3">Important Note</h3>
                <p className="text-gray-400 leading-relaxed">
                  BMI is a useful indicator but doesn't account for muscle mass, bone density, 
                  and overall body composition. Consult healthcare professionals for complete assessment.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BMICalculator;
