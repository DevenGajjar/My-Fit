
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Diet from "./pages/Diet";
import ExerciseLibrary from "./pages/ExerciseLibrary";
import SupplementGuide from "./pages/SupplementGuide";
import BMICalculator from "./pages/BMICalculator";
import MyWorkout from "./pages/MyWorkout";
import SignIn from "./pages/SignIn";
import LogIn from "./pages/LogIn";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/diet" element={<Diet />} />
          <Route path="/exercises" element={<ExerciseLibrary />} />
          <Route path="/supplements" element={<SupplementGuide />} />
          <Route path="/bmi" element={<BMICalculator />} />
          <Route path="/my-workout" element={<MyWorkout />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
