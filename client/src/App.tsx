import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import Breathing from "./pages/Breathing";
import CBTModules from "./pages/CBTModules";
import CBTExercise1 from "./pages/CBTExercise1";
import CBTExercise2 from "./pages/CBTExercise2";
import CBTExercise3 from "./pages/CBTExercise3";
import CBTExercise4 from "./pages/CBTExercise4";
import CBTExercise5 from "./pages/CBTExercise5";
import Journal from "./pages/Journal";
import Resources from "./pages/Resources";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/breathing" element={<Breathing />} />
          <Route path="/cbt-modules" element={<CBTModules />} />
          <Route path="/cbt-modules/1" element={<CBTExercise1 />} />
          <Route path="/cbt-modules/2" element={<CBTExercise2 />} />
          <Route path="/cbt-modules/3" element={<CBTExercise3 />} />
          <Route path="/cbt-modules/4" element={<CBTExercise4 />} />
          <Route path="/cbt-modules/5" element={<CBTExercise5 />} />
          <Route path="/journal" element={<Journal />} />
          <Route path="/resources" element={<Resources />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
