
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(148,163,184,0.1)_1px,transparent_0)] [background-size:20px_20px] pointer-events-none"></div>
      
      {/* Floating elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-purple-500/10 rounded-full blur-xl floating-animation"></div>
        <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-blue-500/10 rounded-full blur-xl floating-animation" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-3/4 left-1/2 w-24 h-24 bg-pink-500/10 rounded-full blur-xl floating-animation" style={{ animationDelay: '4s' }}></div>
      </div>
      
      <Navigation />
      <HeroSection />
      
      {/* Clean Footer */}
      <footer className="bg-gray-800 border-t border-gray-700 py-16 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <h3 className="text-3xl font-bold mb-4 text-gradient-primary">
              Ready to Transform Your Fitness Journey?
            </h3>
            <p className="text-gray-300 mb-8 text-lg leading-relaxed max-w-2xl mx-auto">
              Start tracking your macros, discover new exercises, and monitor your BMI progress
            </p>
            <div className="glass-effect-dark rounded-2xl p-8 max-w-3xl mx-auto shadow-xl">
              <p className="text-gray-200 text-lg leading-relaxed">
                <strong className="text-gradient-secondary">My Fitness</strong> - Your complete fitness tracking solution with macro tracking, 
                exercise library, and BMI monitoring all in one place.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <span className="bg-blue-900/50 text-blue-300 px-4 py-2 rounded-full text-sm font-medium border border-blue-500/30">Macro Tracking</span>
                <span className="bg-purple-900/50 text-purple-300 px-4 py-2 rounded-full text-sm font-medium border border-purple-500/30">Exercise Library</span>
                <span className="bg-pink-900/50 text-pink-300 px-4 py-2 rounded-full text-sm font-medium border border-pink-500/30">BMI Calculator</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
