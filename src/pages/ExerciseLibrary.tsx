import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, Heart, Plus, Dumbbell, Star, Trash2, Calendar, ChevronDown } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import Navigation from '@/components/Navigation';

interface Exercise {
  name: string;
  description: string;
  equipment: string;
  difficulty: string;
  tips: string;
}

interface WorkoutExercise extends Exercise {
  muscleGroup: string;
  sets: number;
  reps: number;
  notes: string;
}

interface WeeklyPlan {
  [key: string]: WorkoutExercise[];
}

const ExerciseLibrary = () => {
  const [selectedMuscleGroup, setSelectedMuscleGroup] = useState('chest');
  const [searchTerm, setSearchTerm] = useState('');
  const [myWorkout, setMyWorkout] = useState<WorkoutExercise[]>(() => {
    const saved = localStorage.getItem('myWorkoutExercises');
    return saved ? JSON.parse(saved) : [];
  });
  const [showMyWorkout, setShowMyWorkout] = useState(false);
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
  const [activeDay, setActiveDay] = useState('Monday');
  const [openSections, setOpenSections] = useState<string[]>(['chest']);

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const muscleGroups = [
    { id: 'chest', name: 'Chest', color: 'bg-red-500' },
    { id: 'back', name: 'Back', color: 'bg-blue-500' },
    { id: 'legs', name: 'Legs', color: 'bg-green-500' },
    { id: 'arms', name: 'Arms', color: 'bg-purple-500' },
    { id: 'shoulders', name: 'Shoulders', color: 'bg-yellow-500' },
    { id: 'abs', name: 'Abs', color: 'bg-pink-500' }
  ];

  const exercises = {
    chest: [
      {
        name: 'Push-ups',
        description: 'Classic bodyweight exercise targeting the chest, shoulders, and triceps.',
        equipment: 'None',
        difficulty: 'Beginner',
        tips: 'Keep your body in a straight line and engage your core throughout the movement.'
      },
      {
        name: 'Bench Press',
        description: 'Fundamental chest exercise using a barbell or dumbbells.',
        equipment: 'Barbell/Dumbbells',
        difficulty: 'Intermediate',
        tips: 'Lower the weight slowly and press up with control. Keep your feet flat on the ground.'
      },
      {
        name: 'Incline Bench Press',
        description: 'Targets the upper portion of the chest muscles.',
        equipment: 'Barbell/Dumbbells',
        difficulty: 'Intermediate',
        tips: 'Set the bench to a 30-45 degree angle for optimal upper chest activation.'
      },
      {
        name: 'Decline Push-ups',
        description: 'Bodyweight exercise with feet elevated to target upper chest.',
        equipment: 'Bench/Box',
        difficulty: 'Intermediate',
        tips: 'Keep your core tight and maintain proper form throughout the movement.'
      },
      {
        name: 'Chest Flyes',
        description: 'Isolation exercise that targets the chest muscles with a stretching motion.',
        equipment: 'Dumbbells',
        difficulty: 'Intermediate',
        tips: 'Use a slight bend in your elbows and focus on squeezing your chest muscles.'
      },
      {
        name: 'Cable Crossover',
        description: 'Cable exercise that provides constant tension on the chest muscles.',
        equipment: 'Cable Machine',
        difficulty: 'Intermediate',
        tips: 'Focus on bringing your hands together in front of your chest with control.'
      },
      {
        name: 'Dips',
        description: 'Compound exercise targeting chest, shoulders, and triceps.',
        equipment: 'Dip Bars',
        difficulty: 'Advanced',
        tips: 'Lean forward slightly to emphasize chest activation and control the descent.'
      }
    ],
    back: [
      {
        name: 'Pull-ups',
        description: 'Compound exercise targeting the latissimus dorsi and biceps.',
        equipment: 'Pull-up bar',
        difficulty: 'Intermediate',
        tips: 'Focus on pulling your chest to the bar and controlling the descent.'
      },
      {
        name: 'Bent-over Rows',
        description: 'Rowing movement that targets the middle and upper back.',
        equipment: 'Barbell/Dumbbells',
        difficulty: 'Intermediate',
        tips: 'Keep your back straight and pull the weight to your lower chest.'
      },
      {
        name: 'Lat Pulldowns',
        description: 'Machine exercise that targets the latissimus dorsi muscles.',
        equipment: 'Cable Machine',
        difficulty: 'Beginner',
        tips: 'Pull the bar down to your chest while keeping your torso upright.'
      },
      {
        name: 'Deadlifts',
        description: 'Compound movement targeting the entire posterior chain.',
        equipment: 'Barbell',
        difficulty: 'Advanced',
        tips: 'Keep the bar close to your body and drive through your heels.'
      },
      {
        name: 'T-Bar Rows',
        description: 'Rowing exercise that targets the middle back muscles.',
        equipment: 'T-Bar',
        difficulty: 'Intermediate',
        tips: 'Keep your chest up and squeeze your shoulder blades together.'
      },
      {
        name: 'Face Pulls',
        description: 'Cable exercise targeting the rear deltoids and upper back.',
        equipment: 'Cable Machine',
        difficulty: 'Beginner',
        tips: 'Pull the rope to your face while keeping your elbows high.'
      },
      {
        name: 'Seated Cable Rows',
        description: 'Seated rowing exercise for middle back development.',
        equipment: 'Cable Machine',
        difficulty: 'Beginner',
        tips: 'Squeeze your shoulder blades together and avoid using momentum.'
      }
    ],
    legs: [
      {
        name: 'Squats',
        description: 'King of leg exercises, targeting quads, glutes, and hamstrings.',
        equipment: 'Barbell (optional)',
        difficulty: 'Beginner',
        tips: 'Keep your knees in line with your toes and sit back as if sitting in a chair.'
      },
      {
        name: 'Lunges',
        description: 'Unilateral exercise targeting the quadriceps and glutes.',
        equipment: 'Dumbbells (optional)',
        difficulty: 'Beginner',
        tips: 'Step forward and lower your back knee toward the ground.'
      },
      {
        name: 'Romanian Deadlifts',
        description: 'Hip-hinge movement targeting the hamstrings and glutes.',
        equipment: 'Barbell/Dumbbells',
        difficulty: 'Intermediate',
        tips: 'Keep the weight close to your legs and push your hips back.'
      },
      {
        name: 'Leg Press',
        description: 'Machine exercise targeting the quadriceps and glutes.',
        equipment: 'Leg Press Machine',
        difficulty: 'Beginner',
        tips: 'Keep your feet shoulder-width apart and press through your heels.'
      },
      {
        name: 'Calf Raises',
        description: 'Isolation exercise targeting the calf muscles.',
        equipment: 'None/Dumbbells',
        difficulty: 'Beginner',
        tips: 'Rise up on your toes and squeeze your calves at the top.'
      },
      {
        name: 'Bulgarian Split Squats',
        description: 'Single-leg exercise targeting quads and glutes.',
        equipment: 'Bench',
        difficulty: 'Intermediate',
        tips: 'Keep most of your weight on your front leg and maintain balance.'
      },
      {
        name: 'Hip Thrusts',
        description: 'Glute-focused exercise for posterior chain development.',
        equipment: 'Bench/Barbell',
        difficulty: 'Intermediate',
        tips: 'Drive through your heels and squeeze your glutes at the top.'
      }
    ],
    arms: [
      {
        name: 'Bicep Curls',
        description: 'Isolation exercise for building bicep strength and size.',
        equipment: 'Dumbbells',
        difficulty: 'Beginner',
        tips: 'Keep your elbows stationary and focus on the squeeze at the top.'
      },
      {
        name: 'Tricep Dips',
        description: 'Bodyweight exercise targeting the triceps.',
        equipment: 'Bench/Chair',
        difficulty: 'Intermediate',
        tips: 'Keep your body close to the bench and lower until your arms form a 90-degree angle.'
      },
      {
        name: 'Hammer Curls',
        description: 'Bicep exercise with a neutral grip targeting the brachialis.',
        equipment: 'Dumbbells',
        difficulty: 'Beginner',
        tips: 'Keep your wrists straight and curl with control.'
      },
      {
        name: 'Tricep Pushdowns',
        description: 'Cable exercise targeting the triceps muscles.',
        equipment: 'Cable Machine',
        difficulty: 'Beginner',
        tips: 'Keep your elbows at your sides and extend your arms fully.'
      },
      {
        name: 'Close-Grip Push-ups',
        description: 'Push-up variation that emphasizes the triceps.',
        equipment: 'None',
        difficulty: 'Intermediate',
        tips: 'Keep your hands close together and elbows tucked to your sides.'
      },
      {
        name: 'Preacher Curls',
        description: 'Isolated bicep exercise using a preacher bench.',
        equipment: 'Preacher Bench',
        difficulty: 'Intermediate',
        tips: 'Control the weight both up and down for maximum muscle activation.'
      },
      {
        name: 'Overhead Tricep Extension',
        description: 'Tricep isolation exercise performed overhead.',
        equipment: 'Dumbbells',
        difficulty: 'Intermediate',
        tips: 'Keep your elbows close to your head and control the movement.'
      }
    ],
    shoulders: [
      {
        name: 'Shoulder Press',
        description: 'Overhead pressing movement for shoulder development.',
        equipment: 'Dumbbells',
        difficulty: 'Intermediate',
        tips: 'Press straight up and avoid arching your back excessively.'
      },
      {
        name: 'Lateral Raises',
        description: 'Isolation exercise targeting the middle deltoids.',
        equipment: 'Dumbbells',
        difficulty: 'Beginner',
        tips: 'Raise the weights to shoulder height with a slight bend in your elbows.'
      },
      {
        name: 'Front Raises',
        description: 'Isolation exercise targeting the front deltoids.',
        equipment: 'Dumbbells',
        difficulty: 'Beginner',
        tips: 'Raise the weight in front of you to shoulder height.'
      },
      {
        name: 'Rear Delt Flyes',
        description: 'Exercise targeting the posterior deltoids.',
        equipment: 'Dumbbells',
        difficulty: 'Beginner',
        tips: 'Bend forward slightly and raise the weights to the sides.'
      },
      {
        name: 'Pike Push-ups',
        description: 'Bodyweight exercise targeting the shoulders.',
        equipment: 'None',
        difficulty: 'Intermediate',
        tips: 'Keep your body in an inverted V shape and lower your head toward the ground.'
      },
      {
        name: 'Arnold Press',
        description: 'Complex shoulder exercise that works all three deltoid heads.',
        equipment: 'Dumbbells',
        difficulty: 'Advanced',
        tips: 'Start with palms facing you and rotate as you press overhead.'
      },
      {
        name: 'Upright Rows',
        description: 'Compound movement targeting shoulders and traps.',
        equipment: 'Barbell/Dumbbells',
        difficulty: 'Intermediate',
        tips: 'Pull the weight to chest level with elbows leading the movement.'
      }
    ],
    abs: [
      {
        name: 'Plank',
        description: 'Isometric core exercise for building stability and strength.',
        equipment: 'None',
        difficulty: 'Beginner',
        tips: 'Keep your body in a straight line and breathe steadily.'
      },
      {
        name: 'Crunches',
        description: 'Traditional abdominal exercise targeting the rectus abdominis.',
        equipment: 'None',
        difficulty: 'Beginner',
        tips: 'Focus on lifting your shoulder blades off the ground, not your entire back.'
      },
      {
        name: 'Russian Twists',
        description: 'Rotational exercise targeting the obliques.',
        equipment: 'None/Medicine Ball',
        difficulty: 'Intermediate',
        tips: 'Keep your feet off the ground and twist from your core.'
      },
      {
        name: 'Mountain Climbers',
        description: 'Dynamic exercise that targets the core and provides cardio.',
        equipment: 'None',
        difficulty: 'Intermediate',
        tips: 'Keep your hips level and drive your knees toward your chest.'
      },
      {
        name: 'Dead Bug',
        description: 'Core stability exercise targeting deep abdominal muscles.',
        equipment: 'None',
        difficulty: 'Beginner',
        tips: 'Keep your lower back pressed to the ground throughout the movement.'
      },
      {
        name: 'Hanging Leg Raises',
        description: 'Advanced core exercise targeting the lower abs.',
        equipment: 'Pull-up Bar',
        difficulty: 'Advanced',
        tips: 'Control the movement and avoid swinging your legs.'
      },
      {
        name: 'Bicycle Crunches',
        description: 'Dynamic core exercise targeting obliques and rectus abdominis.',
        equipment: 'None',
        difficulty: 'Intermediate',
        tips: 'Focus on bringing opposite elbow to knee with control.'
      }
    ]
  };

  const currentExercises = exercises[selectedMuscleGroup as keyof typeof exercises] || [];
  const filteredExercises = currentExercises.filter(exercise =>
    exercise.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const groupedWorkoutExercises = muscleGroups.reduce((acc, group) => {
    acc[group.id] = myWorkout.filter(ex => ex.muscleGroup === group.id);
    return acc;
  }, {} as { [key: string]: WorkoutExercise[] });

  const toggleSection = (section: string) => {
    setOpenSections(prev => 
      prev.includes(section) 
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  const addToWorkout = (exercise: Exercise) => {
    if (!myWorkout.some(e => e.name === exercise.name)) {
      const workoutExercise: WorkoutExercise = {
        ...exercise,
        muscleGroup: selectedMuscleGroup,
        sets: 3,
        reps: 10,
        notes: ''
      };
      const updatedWorkout = [...myWorkout, workoutExercise];
      setMyWorkout(updatedWorkout);
      localStorage.setItem('myWorkoutExercises', JSON.stringify(updatedWorkout));
    }
  };

  const removeFromWorkout = (exerciseName: string) => {
    const updatedWorkout = myWorkout.filter(e => e.name !== exerciseName);
    setMyWorkout(updatedWorkout);
    localStorage.setItem('myWorkoutExercises', JSON.stringify(updatedWorkout));
  };

  const updateExercise = (index: number, field: string, value: any) => {
    const updated = [...myWorkout];
    updated[index] = { ...updated[index], [field]: value };
    setMyWorkout(updated);
    localStorage.setItem('myWorkoutExercises', JSON.stringify(updated));
  };

  const addToDay = (exercise: WorkoutExercise) => {
    const updated = {
      ...weeklyPlan,
      [activeDay]: [...weeklyPlan[activeDay], { ...exercise }]
    };
    setWeeklyPlan(updated);
    localStorage.setItem('weeklyWorkoutPlan', JSON.stringify(updated));
  };

  const removeFromDay = (dayIndex: number) => {
    const updated = {
      ...weeklyPlan,
      [activeDay]: weeklyPlan[activeDay].filter((_, i) => i !== dayIndex)
    };
    setWeeklyPlan(updated);
    localStorage.setItem('weeklyWorkoutPlan', JSON.stringify(updated));
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navigation />
      
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Exercise Library
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Discover exercises with detailed instructions and build your workout
            </p>
          </div>

          {/* Search and My Workout Button */}
          <div className="flex flex-col md:flex-row gap-4 mb-8 max-w-2xl mx-auto">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search exercises..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-gray-800 border-gray-700 text-white focus:border-purple-400 transition-colors"
              />
            </div>
            <Button
              onClick={() => setShowMyWorkout(!showMyWorkout)}
              className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 transition-all duration-200 hover:scale-105"
            >
              <Dumbbell className="h-4 w-4 mr-2" />
              My Workout ({myWorkout.length})
            </Button>
          </div>

          {/* My Workout Section */}
          {showMyWorkout && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              {/* Muscle Group Sections */}
              <Card className="bg-gray-800 border-gray-700 animate-scale-in">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <Dumbbell className="h-5 w-5 text-purple-400" />
                    My Exercises by Muscle Group
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {muscleGroups.map((group) => (
                    <Collapsible
                      key={group.id}
                      open={openSections.includes(group.id)}
                      onOpenChange={() => toggleSection(group.id)}
                    >
                      <CollapsibleTrigger asChild>
                        <Button
                          variant="ghost"
                          className="w-full justify-between text-left p-4 bg-gray-700 hover:bg-gray-600"
                        >
                          <span className="capitalize text-white font-medium">
                            {group.name} ({groupedWorkoutExercises[group.id]?.length || 0})
                          </span>
                          <ChevronDown className={`h-4 w-4 transition-transform ${
                            openSections.includes(group.id) ? 'rotate-180' : ''
                          }`} />
                        </Button>
                      </CollapsibleTrigger>
                      <CollapsibleContent className="space-y-2 mt-2">
                        {groupedWorkoutExercises[group.id]?.map((exercise, index) => {
                          const globalIndex = myWorkout.findIndex(ex => ex === exercise);
                          return (
                            <div key={index} className="p-3 bg-gray-700 rounded-lg animate-fade-in">
                              <div className="flex justify-between items-start mb-2">
                                <h4 className="font-medium text-white">{exercise.name}</h4>
                                <div className="flex gap-2">
                                  <Button
                                    size="sm"
                                    onClick={() => addToDay(exercise)}
                                    className="bg-green-600 hover:bg-green-700"
                                  >
                                    <Plus className="h-3 w-3" />
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => removeFromWorkout(exercise.name)}
                                    className="text-red-400 border-red-400 hover:bg-red-400 hover:text-white"
                                  >
                                    <Trash2 className="h-3 w-3" />
                                  </Button>
                                </div>
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
                        {(!groupedWorkoutExercises[group.id] || groupedWorkoutExercises[group.id].length === 0) && (
                          <p className="text-gray-500 text-center py-4">No exercises added for {group.name}</p>
                        )}
                      </CollapsibleContent>
                    </Collapsible>
                  ))}
                </CardContent>
              </Card>

              {/* Weekly Planner */}
              <Card className="bg-gray-800 border-gray-700 animate-scale-in">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <Calendar className="h-5 w-5 text-blue-400" />
                    Weekly Workout Planner
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {/* Day Selector */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {days.map((day) => (
                      <Button
                        key={day}
                        variant={activeDay === day ? "default" : "outline"}
                        onClick={() => setActiveDay(day)}
                        className={`${
                          activeDay === day
                            ? 'bg-blue-600 text-white'
                            : 'border-gray-600 text-gray-400 hover:bg-gray-700'
                        } transition-all duration-200`}
                      >
                        {day}
                      </Button>
                    ))}
                  </div>

                  {/* Day's Workout */}
                  <div className="space-y-3">
                    <h3 className="font-medium text-white mb-3">
                      {activeDay}'s Workout ({weeklyPlan[activeDay]?.length || 0} exercises)
                    </h3>
                    {weeklyPlan[activeDay]?.map((exercise, index) => (
                      <div key={index} className="p-3 bg-gray-700 rounded-lg animate-fade-in">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-medium text-white">{exercise.name}</h4>
                            <Badge variant="secondary" className="bg-gray-600 text-gray-300 mt-1">
                              {exercise.muscleGroup}
                            </Badge>
                            <p className="text-sm text-gray-400 mt-1">
                              {exercise.sets} sets × {exercise.reps} reps
                            </p>
                            {exercise.notes && (
                              <p className="text-xs text-gray-500 mt-1">{exercise.notes}</p>
                            )}
                          </div>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => removeFromDay(index)}
                            className="text-red-400 border-red-400 hover:bg-red-400 hover:text-white"
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    ))}
                    {(!weeklyPlan[activeDay] || weeklyPlan[activeDay].length === 0) && (
                      <p className="text-gray-500 text-center py-8">No exercises planned for {activeDay}</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Muscle Group Tabs */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {muscleGroups.map((group, index) => (
              <Button
                key={group.id}
                variant={selectedMuscleGroup === group.id ? "default" : "outline"}
                onClick={() => setSelectedMuscleGroup(group.id)}
                className={`${
                  selectedMuscleGroup === group.id 
                    ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white' 
                    : 'border-gray-600 text-gray-400 hover:bg-gray-800'
                } transition-all duration-200 hover:scale-105 animate-fade-in`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {group.name}
              </Button>
            ))}
          </div>

          {/* Exercise Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredExercises.map((exercise, index) => (
              <Card key={index} className="bg-gray-800 border-gray-700 hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300 hover:scale-105 animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-lg text-white">{exercise.name}</CardTitle>
                    <Button
                      size="sm"
                      onClick={() => addToWorkout(exercise)}
                      disabled={myWorkout.some(e => e.name === exercise.name)}
                      className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:opacity-50 transition-all duration-200 hover:scale-105"
                    >
                      {myWorkout.some(e => e.name === exercise.name) ? (
                        <Heart className="h-4 w-4 fill-current" />
                      ) : (
                        <Plus className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                  <div className="flex gap-2">
                    <Badge variant="secondary" className="bg-gray-700 text-gray-300">{exercise.equipment}</Badge>
                    <Badge 
                      variant="outline"
                      className={
                        exercise.difficulty === 'Beginner' ? 'text-green-400 border-green-400' :
                        exercise.difficulty === 'Intermediate' ? 'text-yellow-400 border-yellow-400' :
                        'text-red-400 border-red-400'
                      }
                    >
                      {exercise.difficulty}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400 mb-4">{exercise.description}</p>
                  <div className="bg-blue-900/50 p-3 rounded-lg">
                    <h4 className="font-medium text-blue-400 mb-1">Form Tip:</h4>
                    <p className="text-sm text-blue-300">{exercise.tips}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ExerciseLibrary;
