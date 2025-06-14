
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Plus, Target, Trash2, Edit2 } from 'lucide-react';
import Navigation from '@/components/Navigation';

interface FoodItem {
  name: string;
  quantity: number;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
}

interface Meal {
  name: string;
  foods: FoodItem[];
}

interface MacroGoals {
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
}

interface MacroTotals {
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
}

const Diet = () => {
  const [macroGoals, setMacroGoals] = useState<MacroGoals>({
    calories: 2000,
    protein: 150,
    carbs: 200,
    fats: 60,
  });

  const [meals, setMeals] = useState<Meal[]>([
    { name: 'Meal 1', foods: [] },
    { name: 'Meal 2', foods: [] },
    { name: 'Meal 3', foods: [] },
  ]);

  const [editingMeal, setEditingMeal] = useState<number | null>(null);

  useEffect(() => {
    const storedMacroGoals = localStorage.getItem('macroGoals');
    const storedMeals = localStorage.getItem('meals');

    if (storedMacroGoals) {
      setMacroGoals(JSON.parse(storedMacroGoals));
    }
    if (storedMeals) {
      setMeals(JSON.parse(storedMeals));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('macroGoals', JSON.stringify(macroGoals));
    localStorage.setItem('meals', JSON.stringify(meals));
  }, [macroGoals, meals]);

  const addMeal = () => {
    setMeals([...meals, { name: `Meal ${meals.length + 1}`, foods: [] }]);
  };

  const updateMealName = (mealIndex: number, newName: string) => {
    const updatedMeals = [...meals];
    updatedMeals[mealIndex].name = newName;
    setMeals(updatedMeals);
    setEditingMeal(null);
  };

  const addFood = (mealIndex: number) => {
    const updatedMeals = [...meals];
    updatedMeals[mealIndex].foods.push({ name: '', quantity: 1, calories: 0, protein: 0, carbs: 0, fats: 0 });
    setMeals(updatedMeals);
  };

  const removeFood = (mealIndex: number, foodIndex: number) => {
    const updatedMeals = [...meals];
    updatedMeals[mealIndex].foods.splice(foodIndex, 1);
    setMeals(updatedMeals);
  };

  const updateFood = (mealIndex: number, foodIndex: number, field: string, value: any) => {
    const updatedMeals = [...meals];
    updatedMeals[mealIndex].foods[foodIndex] = { ...updatedMeals[mealIndex].foods[foodIndex], [field]: value };
    setMeals(updatedMeals);
  };

  const getMealTotals = (meal: Meal): MacroTotals => {
    let calories = 0;
    let protein = 0;
    let carbs = 0;
    let fats = 0;

    meal.foods.forEach((food) => {
      calories += food.calories * food.quantity;
      protein += food.protein * food.quantity;
      carbs += food.carbs * food.quantity;
      fats += food.fats * food.quantity;
    });

    return { calories, protein, carbs, fats };
  };

  const getCurrentTotals = (): MacroTotals => {
    let calories = 0;
    let protein = 0;
    let carbs = 0;
    let fats = 0;

    meals.forEach((meal) => {
      const mealTotals = getMealTotals(meal);
      calories += mealTotals.calories;
      protein += mealTotals.protein;
      carbs += mealTotals.carbs;
      fats += mealTotals.fats;
    });

    return { calories, protein, carbs, fats };
  };

  const currentTotals = getCurrentTotals();

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navigation />
      
      <section className="py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-white mb-2">
              Daily Nutrition Tracker
            </h2>
            <p className="text-gray-400">
              Track your macros and reach your fitness goals
            </p>
          </div>

          {/* Macro Goals & Progress */}
          <Card className="mb-6 bg-gray-800/50 border-gray-700">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-white text-lg">
                <Target className="h-5 w-5 text-blue-400" />
                Daily Goals & Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              {/* Goals Input */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                <div>
                  <Label className="text-gray-300 text-sm">Calories</Label>
                  <Input
                    type="number"
                    value={macroGoals.calories}
                    onChange={(e) => setMacroGoals({...macroGoals, calories: Number(e.target.value)})}
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                </div>
                <div>
                  <Label className="text-gray-300 text-sm">Protein (g)</Label>
                  <Input
                    type="number"
                    value={macroGoals.protein}
                    onChange={(e) => setMacroGoals({...macroGoals, protein: Number(e.target.value)})}
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                </div>
                <div>
                  <Label className="text-gray-300 text-sm">Carbs (g)</Label>
                  <Input
                    type="number"
                    value={macroGoals.carbs}
                    onChange={(e) => setMacroGoals({...macroGoals, carbs: Number(e.target.value)})}
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                </div>
                <div>
                  <Label className="text-gray-300 text-sm">Fats (g)</Label>
                  <Input
                    type="number"
                    value={macroGoals.fats}
                    onChange={(e) => setMacroGoals({...macroGoals, fats: Number(e.target.value)})}
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                </div>
              </div>

              {/* Progress */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-400">Calories</span>
                    <span className="text-white">{Math.round(currentTotals.calories)}/{macroGoals.calories}</span>
                  </div>
                  <Progress value={(currentTotals.calories / macroGoals.calories) * 100} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-400">Protein</span>
                    <span className="text-white">{Math.round(currentTotals.protein)}/{macroGoals.protein}g</span>
                  </div>
                  <Progress value={(currentTotals.protein / macroGoals.protein) * 100} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-400">Carbs</span>
                    <span className="text-white">{Math.round(currentTotals.carbs)}/{macroGoals.carbs}g</span>
                  </div>
                  <Progress value={(currentTotals.carbs / macroGoals.carbs) * 100} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-400">Fats</span>
                    <span className="text-white">{Math.round(currentTotals.fats)}/{macroGoals.fats}g</span>
                  </div>
                  <Progress value={(currentTotals.fats / macroGoals.fats) * 100} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Meals */}
          <div className="space-y-4">
            {meals.map((meal, mealIndex) => (
              <Card key={mealIndex} className="bg-gray-800/50 border-gray-700">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2">
                    {editingMeal === mealIndex ? (
                      <Input
                        value={meal.name}
                        onChange={(e) => updateMealName(mealIndex, e.target.value)}
                        onBlur={() => setEditingMeal(null)}
                        onKeyDown={(e) => e.key === 'Enter' && setEditingMeal(null)}
                        className="bg-gray-700 border-gray-600 text-white text-lg font-semibold"
                        autoFocus
                      />
                    ) : (
                      <>
                        <CardTitle className="text-lg text-white flex-1">{meal.name}</CardTitle>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setEditingMeal(mealIndex)}
                          className="text-gray-400 hover:text-white"
                        >
                          <Edit2 className="h-4 w-4" />
                        </Button>
                      </>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {meal.foods.map((food, foodIndex) => (
                      <div key={foodIndex} className="bg-gray-700/30 p-3 rounded-lg">
                        <div className="grid grid-cols-1 md:grid-cols-6 gap-3">
                          <Input
                            placeholder="Food name"
                            value={food.name}
                            onChange={(e) => updateFood(mealIndex, foodIndex, 'name', e.target.value)}
                            className="bg-gray-600 border-gray-500 text-white md:col-span-2"
                          />
                          <Input
                            type="number"
                            placeholder="Quantity"
                            value={food.quantity}
                            onChange={(e) => updateFood(mealIndex, foodIndex, 'quantity', Number(e.target.value))}
                            className="bg-gray-600 border-gray-500 text-white"
                          />
                          <Input
                            type="number"
                            placeholder="Calories"
                            value={food.calories}
                            onChange={(e) => updateFood(mealIndex, foodIndex, 'calories', Number(e.target.value))}
                            className="bg-gray-600 border-gray-500 text-white"
                          />
                          <Input
                            type="number"
                            placeholder="Protein"
                            value={food.protein}
                            onChange={(e) => updateFood(mealIndex, foodIndex, 'protein', Number(e.target.value))}
                            className="bg-gray-600 border-gray-500 text-white"
                          />
                          <div className="flex gap-2">
                            <Input
                              type="number"
                              placeholder="Carbs"
                              value={food.carbs}
                              onChange={(e) => updateFood(mealIndex, foodIndex, 'carbs', Number(e.target.value))}
                              className="bg-gray-600 border-gray-500 text-white flex-1"
                            />
                            <Input
                              type="number"
                              placeholder="Fats"
                              value={food.fats}
                              onChange={(e) => updateFood(mealIndex, foodIndex, 'fats', Number(e.target.value))}
                              className="bg-gray-600 border-gray-500 text-white flex-1"
                            />
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => removeFood(mealIndex, foodIndex)}
                              className="border-red-500 text-red-400 hover:bg-red-600 hover:text-white"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    <Button
                      onClick={() => addFood(mealIndex)}
                      variant="outline"
                      size="sm"
                      className="w-full border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Food Item
                    </Button>

                    {/* Meal Totals */}
                    {meal.foods.length > 0 && (
                      <div className="bg-gray-700/20 p-3 rounded border border-gray-600 mt-3">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm text-center">
                          <div>
                            <p className="text-gray-400">Calories</p>
                            <p className="font-semibold text-white text-lg">{Math.round(getMealTotals(meal).calories)}</p>
                          </div>
                          <div>
                            <p className="text-gray-400">Protein</p>
                            <p className="font-semibold text-white text-lg">{Math.round(getMealTotals(meal).protein)}g</p>
                          </div>
                          <div>
                            <p className="text-gray-400">Carbs</p>
                            <p className="font-semibold text-white text-lg">{Math.round(getMealTotals(meal).carbs)}g</p>
                          </div>
                          <div>
                            <p className="text-gray-400">Fats</p>
                            <p className="font-semibold text-white text-lg">{Math.round(getMealTotals(meal).fats)}g</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}

            <Button
              onClick={addMeal}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add New Meal
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Diet;
