
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown, Plus, Trash2, Edit3, Calendar, Dumbbell } from 'lucide-react';
import Navigation from '@/components/Navigation';

interface WorkoutExercise {
  name: string;
  muscleGroup: string;
  sets: number;
  reps: number;
  notes: string;
}

interface WeeklyPlan {
  [key: string]: WorkoutExercise[];
}

const MyWorkout = () => {
  const [selectedExercises, setSelectedExercises] = useState<WorkoutExercise[]>(() => {
    const saved = localStorage.getItem('myWorkoutExercises');
    return saved ? JSON.parse(saved) : [];
  });

  const [weeklyPlan, setWeeklyPlan] = useState<WeeklyPlan>(() => {
    const saved = localStorage.getItem('weeklyWorkoutPlan');
    return saved ? JSON.parse(saved) : {
      Monday: [],
      Tuesday: [],
      Wednesday: [],
      Thursday: [],
      Friday: [],
      Saturday: [],
      Sunday: []
    };
  });

  const [openSections, setOpenSections] = useState<string[]>(['chest']);
  const [openDays, setOpenDays] = useState<string[]>(['Monday']);
  const [openDayMuscleGroups, setOpenDayMuscleGroups] = useState<string[]>([]);

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const muscleGroups = ['chest', 'back', 'legs', 'arms', 'shoulders', 'abs'];

  const groupedExercises = muscleGroups.reduce((acc, group) => {
    acc[group] = selectedExercises.filter(ex => ex.muscleGroup === group);
    return acc;
  }, {} as { [key: string]: WorkoutExercise[] });

  // Group exercises by muscle group for each day
  const groupExercisesByMuscleGroup = (exercises: WorkoutExercise[]) => {
    return muscleGroups.reduce((acc, group) => {
      acc[group] = exercises.filter(ex => ex.muscleGroup === group);
      return acc;
    }, {} as { [key: string]: WorkoutExercise[] });
  };

  const toggleSection = (section: string) => {
    setOpenSections(prev => 
      prev.includes(section) 
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  const toggleDay = (day: string) => {
    setOpenDays(prev => 
      prev.includes(day) 
        ? prev.filter(d => d !== day)
        : [...prev, day]
    );
  };

  const toggleDayMuscleGroup = (dayMuscleKey: string) => {
    setOpenDayMuscleGroups(prev => 
      prev.includes(dayMuscleKey) 
        ? prev.filter(key => key !== dayMuscleKey)
        : [...prev, dayMuscleKey]
    );
  };

  const updateExercise = (index: number, field: string, value: any) => {
    const updated = [...selectedExercises];
    updated[index] = { ...updated[index], [field]: value };
    setSelectedExercises(updated);
    localStorage.setItem('myWorkoutExercises', JSON.stringify(updated));
  };

  const removeExercise = (index: number) => {
    const updated = selectedExercises.filter((_, i) => i !== index);
    setSelectedExercises(updated);
    localStorage.setItem('myWorkoutExercises', JSON.stringify(updated));
  };

  const addToDay = (exercise: WorkoutExercise, day: string) => {
    const updated = {
      ...weeklyPlan,
      [day]: [...weeklyPlan[day], { ...exercise }]
    };
    setWeeklyPlan(updated);
    localStorage.setItem('weeklyWorkoutPlan', JSON.stringify(updated));
  };

  const removeFromDay = (day: string, exerciseIndex: number) => {
    const updated = {
      ...weeklyPlan,
      [day]: weeklyPlan[day].filter((_, i) => i !== exerciseIndex)
    };
    setWeeklyPlan(updated);
    localStorage.setItem('weeklyWorkoutPlan', JSON.stringify(updated));
  };

  const updateDayExercise = (day: string, exerciseIndex: number, field: string, value: any) => {
    const updated = {
      ...weeklyPlan,
      [day]: weeklyPlan[day].map((exercise, i) => 
        i === exerciseIndex ? { ...exercise, [field]: value } : exercise
      )
    };
    setWeeklyPlan(updated);
    localStorage.setItem('weeklyWorkoutPlan', JSON.stringify(updated));
  };

  const getTotalExercisesForDay = (day: string) => {
    return weeklyPlan[day]?.length || 0;
  };

  const getMuscleGroupColor = (muscleGroup: string) => {
    const colors = {
      chest: 'bg-red-500',
      back: 'bg-blue-500',
      legs: 'bg-green-500',
      arms: 'bg-purple-500',
      shoulders: 'bg-yellow-500',
      abs: 'bg-pink-500'
    };
    return colors[muscleGroup as keyof typeof colors] || 'bg-gray-500';
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navigation />
      
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              My Workout Plan
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Organize your exercises and plan your weekly workouts
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* My Exercise Library */}
            <Card className="bg-gray-800 border-gray-700 animate-scale-in">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Dumbbell className="h-5 w-5 text-purple-400" />
                  My Exercise Library
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 max-h-96 overflow-y-auto">
                {muscleGroups.map((group) => (
                  <Collapsible
                    key={group}
                    open={openSections.includes(group)}
                    onOpenChange={() => toggleSection(group)}
                  >
                    <CollapsibleTrigger asChild>
                      <Button
                        variant="ghost"
                        className="w-full justify-between text-left p-4 bg-gray-700 hover:bg-gray-600"
                      >
                        <span className="capitalize text-white font-medium flex items-center gap-2">
                          <div className={`w-3 h-3 rounded-full ${getMuscleGroupColor(group)}`}></div>
                          {group} ({groupedExercises[group]?.length || 0})
                        </span>
                        <ChevronDown className={`h-4 w-4 transition-transform ${
                          openSections.includes(group) ? 'rotate-180' : ''
                        }`} />
                      </Button>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="space-y-2 mt-2">
                      {groupedExercises[group]?.map((exercise, index) => {
                        const globalIndex = selectedExercises.findIndex(ex => ex === exercise);
                        return (
                          <div key={index} className="p-3 bg-gray-700 rounded-lg animate-fade-in">
                            <div className="flex justify-between items-start mb-2">
                              <h4 className="font-medium text-white">{exercise.name}</h4>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => removeExercise(globalIndex)}
                                className="text-red-400 border-red-400 hover:bg-red-400 hover:text-white"
                              >
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </div>
                            <div className="grid grid-cols-2 gap-2 mb-2">
                              <div>
                                <label className="text-xs text-gray-400">Sets</label>
                                <Input
                                  type="number"
                                  value={exercise.sets}
                                  onChange={(e) => updateExercise(globalIndex, 'sets', parseInt(e.target.value))}
                                  className="bg-gray-600 border-gray-500 text-white h-8"
                                />
                              </div>
                              <div>
                                <label className="text-xs text-gray-400">Reps</label>
                                <Input
                                  type="number"
                                  value={exercise.reps}
                                  onChange={(e) => updateExercise(globalIndex, 'reps', parseInt(e.target.value))}
                                  className="bg-gray-600 border-gray-500 text-white h-8"
                                />
                              </div>
                            </div>
                            <Input
                              placeholder="Notes..."
                              value={exercise.notes}
                              onChange={(e) => updateExercise(globalIndex, 'notes', e.target.value)}
                              className="bg-gray-600 border-gray-500 text-white h-8"
                            />
                          </div>
                        );
                      })}
                      {(!groupedExercises[group] || groupedExercises[group].length === 0) && (
                        <p className="text-gray-500 text-center py-4">No exercises added for {group}</p>
                      )}
                    </CollapsibleContent>
                  </Collapsible>
                ))}
              </CardContent>
            </Card>

            {/* Weekly Workout Planner */}
            <Card className="bg-gray-800 border-gray-700 animate-scale-in">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Calendar className="h-5 w-5 text-blue-400" />
                  Weekly Workout Planner
                </CardTitle>
              </CardHeader>
              <CardContent className="max-h-96 overflow-y-auto">
                <div className="space-y-4">
                  {days.map((day) => {
                    const dayExercises = groupExercisesByMuscleGroup(weeklyPlan[day] || []);
                    const totalExercises = getTotalExercisesForDay(day);
                    
                    return (
                      <Collapsible
                        key={day}
                        open={openDays.includes(day)}
                        onOpenChange={() => toggleDay(day)}
                      >
                        <CollapsibleTrigger asChild>
                          <Button
                            variant="ghost"
                            className="w-full justify-between text-left p-4 bg-gray-700 hover:bg-gray-600"
                          >
                            <span className="text-white font-medium">
                              {day} ({totalExercises} exercises)
                            </span>
                            <ChevronDown className={`h-4 w-4 transition-transform ${
                              openDays.includes(day) ? 'rotate-180' : ''
                            }`} />
                          </Button>
                        </CollapsibleTrigger>
                        <CollapsibleContent className="mt-2 space-y-3">
                          {muscleGroups.map((muscleGroup) => {
                            const muscleGroupExercises = dayExercises[muscleGroup] || [];
                            const dayMuscleKey = `${day}-${muscleGroup}`;
                            
                            if (muscleGroupExercises.length === 0) return null;
                            
                            return (
                              <Collapsible
                                key={muscleGroup}
                                open={openDayMuscleGroups.includes(dayMuscleKey)}
                                onOpenChange={() => toggleDayMuscleGroup(dayMuscleKey)}
                              >
                                <CollapsibleTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    className="w-full justify-between text-left p-3 bg-gray-600 hover:bg-gray-500 ml-4"
                                  >
                                    <span className="capitalize text-white font-medium flex items-center gap-2">
                                      <div className={`w-2 h-2 rounded-full ${getMuscleGroupColor(muscleGroup)}`}></div>
                                      {muscleGroup} ({muscleGroupExercises.length})
                                    </span>
                                    <ChevronDown className={`h-3 w-3 transition-transform ${
                                      openDayMuscleGroups.includes(dayMuscleKey) ? 'rotate-180' : ''
                                    }`} />
                                  </Button>
                                </CollapsibleTrigger>
                                <CollapsibleContent className="ml-8 mt-2 space-y-2">
                                  {muscleGroupExercises.map((exercise, exerciseIndex) => {
                                    const globalIndex = weeklyPlan[day].findIndex(ex => 
                                      ex.name === exercise.name && 
                                      ex.muscleGroup === exercise.muscleGroup &&
                                      weeklyPlan[day].indexOf(ex) >= weeklyPlan[day].filter(e => 
                                        e.name === exercise.name && e.muscleGroup === exercise.muscleGroup
                                      ).indexOf(exercise)
                                    );
                                    
                                    return (
                                      <div key={exerciseIndex} className="p-3 bg-gray-600 rounded-lg animate-fade-in">
                                        <div className="flex justify-between items-start mb-2">
                                          <h4 className="font-medium text-white">{exercise.name}</h4>
                                          <Button
                                            size="sm"
                                            variant="outline"
                                            onClick={() => removeFromDay(day, globalIndex)}
                                            className="text-red-400 border-red-400 hover:bg-red-400 hover:text-white"
                                          >
                                            <Trash2 className="h-3 w-3" />
                                          </Button>
                                        </div>
                                        <div className="grid grid-cols-2 gap-2 mb-2">
                                          <div>
                                            <label className="text-xs text-gray-400">Sets</label>
                                            <Input
                                              type="number"
                                              value={exercise.sets}
                                              onChange={(e) => updateDayExercise(day, globalIndex, 'sets', parseInt(e.target.value))}
                                              className="bg-gray-500 border-gray-400 text-white h-8"
                                            />
                                          </div>
                                          <div>
                                            <label className="text-xs text-gray-400">Reps</label>
                                            <Input
                                              type="number"
                                              value={exercise.reps}
                                              onChange={(e) => updateDayExercise(day, globalIndex, 'reps', parseInt(e.target.value))}
                                              className="bg-gray-500 border-gray-400 text-white h-8"
                                            />
                                          </div>
                                        </div>
                                        <Input
                                          placeholder="Notes..."
                                          value={exercise.notes}
                                          onChange={(e) => updateDayExercise(day, globalIndex, 'notes', e.target.value)}
                                          className="bg-gray-500 border-gray-400 text-white h-8"
                                        />
                                      </div>
                                    );
                                  })}
                                </CollapsibleContent>
                              </Collapsible>
                            );
                          })}
                          
                          {/* Add Exercise Button */}
                          <div className="ml-4 mt-3">
                            <div className="text-xs text-gray-400 mb-2">Add exercises from your library:</div>
                            <div className="flex flex-wrap gap-2">
                              {selectedExercises.map((exercise, index) => (
                                <Button
                                  key={index}
                                  size="sm"
                                  onClick={() => addToDay(exercise, day)}
                                  className="bg-green-600 hover:bg-green-700 text-xs"
                                >
                                  <Plus className="h-3 w-3 mr-1" />
                                  {exercise.name}
                                </Button>
                              ))}
                            </div>
                            {selectedExercises.length === 0 && (
                              <p className="text-gray-500 text-xs">No exercises in your library. Add some from the Exercise Library page.</p>
                            )}
                          </div>
                        </CollapsibleContent>
                      </Collapsible>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MyWorkout;
