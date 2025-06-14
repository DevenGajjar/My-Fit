
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, Calendar } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import Navigation from '@/components/Navigation';

const MacroTracker = () => {
  const [macros] = useState({
    calories: { current: 1450, goal: 2200 },
    protein: { current: 85, goal: 150 },
    carbs: { current: 180, goal: 275 },
    fats: { current: 45, goal: 75 }
  });

  const [foodInput, setFoodInput] = useState({
    name: '',
    calories: '',
    protein: '',
    carbs: '',
    fats: ''
  });

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navigation />
      
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Macro Tracker
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Track your daily nutrition intake and stay on top of your fitness goals
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Today's Progress */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Calendar className="h-5 w-5" />
                  Today's Progress
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Calories */}
                <div>
                  <div className="flex justify-between mb-2">
                    <Label className="text-lg font-medium text-white">Calories</Label>
                    <span className="text-sm text-gray-400">
                      {macros.calories.current} / {macros.calories.goal}
                    </span>
                  </div>
                  <Progress 
                    value={(macros.calories.current / macros.calories.goal) * 100} 
                    className="h-3"
                  />
                  <div className="text-sm text-gray-500 mt-1">
                    {macros.calories.goal - macros.calories.current} calories remaining
                  </div>
                </div>

                {/* Protein */}
                <div>
                  <div className="flex justify-between mb-2">
                    <Label className="text-lg font-medium text-red-400">Protein</Label>
                    <span className="text-sm text-gray-400">
                      {macros.protein.current}g / {macros.protein.goal}g
                    </span>
                  </div>
                  <Progress 
                    value={(macros.protein.current / macros.protein.goal) * 100} 
                    className="h-3"
                  />
                </div>

                {/* Carbs */}
                <div>
                  <div className="flex justify-between mb-2">
                    <Label className="text-lg font-medium text-blue-400">Carbs</Label>
                    <span className="text-sm text-gray-400">
                      {macros.carbs.current}g / {macros.carbs.goal}g
                    </span>
                  </div>
                  <Progress 
                    value={(macros.carbs.current / macros.carbs.goal) * 100} 
                    className="h-3"
                  />
                </div>

                {/* Fats */}
                <div>
                  <div className="flex justify-between mb-2">
                    <Label className="text-lg font-medium text-yellow-400">Fats</Label>
                    <span className="text-sm text-gray-400">
                      {macros.fats.current}g / {macros.fats.goal}g
                    </span>
                  </div>
                  <Progress 
                    value={(macros.fats.current / macros.fats.goal) * 100} 
                    className="h-3"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Add Food */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Plus className="h-5 w-5" />
                  Log Food
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="food-name" className="text-white">Food Name</Label>
                  <Input
                    id="food-name"
                    placeholder="e.g., Grilled Chicken Breast"
                    value={foodInput.name}
                    onChange={(e) => setFoodInput({...foodInput, name: e.target.value})}
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="calories" className="text-white">Calories</Label>
                    <Input
                      id="calories"
                      type="number"
                      placeholder="250"
                      value={foodInput.calories}
                      onChange={(e) => setFoodInput({...foodInput, calories: e.target.value})}
                      className="bg-gray-700 border-gray-600 text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="protein" className="text-white">Protein (g)</Label>
                    <Input
                      id="protein"
                      type="number"
                      placeholder="30"
                      value={foodInput.protein}
                      onChange={(e) => setFoodInput({...foodInput, protein: e.target.value})}
                      className="bg-gray-700 border-gray-600 text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="carbs" className="text-white">Carbs (g)</Label>
                    <Input
                      id="carbs"
                      type="number"
                      placeholder="5"
                      value={foodInput.carbs}
                      onChange={(e) => setFoodInput({...foodInput, carbs: e.target.value})}
                      className="bg-gray-700 border-gray-600 text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="fats" className="text-white">Fats (g)</Label>
                    <Input
                      id="fats"
                      type="number"
                      placeholder="8"
                      value={foodInput.fats}
                      onChange={(e) => setFoodInput({...foodInput, fats: e.target.value})}
                      className="bg-gray-700 border-gray-600 text-white"
                    />
                  </div>
                </div>

                <Button className="w-full bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white">
                  Add to Today's Log
                </Button>

                <div className="text-center">
                  <Button variant="outline" className="w-full border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white">
                    Search Food Database
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MacroTracker;
