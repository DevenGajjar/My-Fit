
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Dumbbell, Heart, Calculator, Sparkles, Zap, Target } from 'lucide-react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Floating icons */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 floating-animation opacity-30">
          <Sparkles className="h-6 w-6 text-blue-400" />
        </div>
        <div className="absolute top-40 right-20 floating-animation opacity-30" style={{ animationDelay: '1s' }}>
          <Zap className="h-8 w-8 text-purple-400" />
        </div>
        <div className="absolute bottom-40 left-20 floating-animation opacity-30" style={{ animationDelay: '2s' }}>
          <Target className="h-7 w-7 text-pink-400" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-8 fade-in-up leading-tight text-white">
            Transform Your Fitness Journey with{' '}
            <span className="text-gradient-primary">
              Smart Tracking
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto fade-in-up leading-relaxed" style={{ animationDelay: '0.2s' }}>
            Track your macros, discover new exercises, monitor your BMI, and achieve your fitness goals with our comprehensive platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center fade-in-up" style={{ animationDelay: '0.4s' }}>
            <Link to="/diet">
              <Button size="lg" className="btn-primary px-10 py-4 text-xl rounded-2xl">
                <Heart className="h-5 w-5 mr-3" />
                Start Tracking Now
              </Button>
            </Link>
            <Link to="/exercises">
              <Button variant="outline" size="lg" className="btn-secondary-dark px-10 py-4 text-xl rounded-2xl">
                <Dumbbell className="h-5 w-5 mr-3" />
                View Exercise Library
              </Button>
            </Link>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="group p-8 glass-effect-dark rounded-3xl card-hover stagger-animation overflow-hidden relative border-gray-700">
            <div className="relative z-10">
              <div className="bg-gradient-to-r from-red-500 to-pink-500 p-4 rounded-2xl w-fit mb-6 group-hover:scale-110 transition-transform duration-300">
                <Heart className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">Macro Tracking</h3>
              <p className="text-gray-300 text-lg leading-relaxed">
                Effortlessly log your meals and track calories, protein, carbs, and fats. 
                Set personalized goals and watch your progress unfold.
              </p>
            </div>
          </Card>

          <Card className="group p-8 glass-effect-dark rounded-3xl card-hover stagger-animation overflow-hidden relative border-gray-700" style={{ animationDelay: '0.2s' }}>
            <div className="relative z-10">
              <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-4 rounded-2xl w-fit mb-6 group-hover:scale-110 transition-transform duration-300">
                <Dumbbell className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">Exercise Library</h3>
              <p className="text-gray-300 text-lg leading-relaxed">
                Explore hundreds of exercises with detailed instructions, proper form tips, 
                and equipment requirements for every muscle group.
              </p>
            </div>
          </Card>

          <Card className="group p-8 glass-effect-dark rounded-3xl card-hover stagger-animation overflow-hidden relative border-gray-700" style={{ animationDelay: '0.4s' }}>
            <div className="relative z-10">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-4 rounded-2xl w-fit mb-6 group-hover:scale-110 transition-transform duration-300">
                <Calculator className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">BMI Calculator</h3>
              <p className="text-gray-300 text-lg leading-relaxed">
                Monitor your Body Mass Index, track your progress over time, and get 
                insights into your health metrics with our advanced BMI calculator.
              </p>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
