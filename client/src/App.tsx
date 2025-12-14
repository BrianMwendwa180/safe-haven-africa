import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

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
import Support from "./pages/Support";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./contexts/AuthContext";


const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            
            <Route path="/" element={<ProtectedRoute><Index /></ProtectedRoute>} />
            <Route path="/breathing" element={<ProtectedRoute><Breathing /></ProtectedRoute>} />
            <Route path="/cbt-modules" element={<ProtectedRoute><CBTModules /></ProtectedRoute>} />
            <Route path="/cbt-modules/1" element={<ProtectedRoute><CBTExercise1 /></ProtectedRoute>} />
            <Route path="/cbt-modules/2" element={<ProtectedRoute><CBTExercise2 /></ProtectedRoute>} />
            <Route path="/cbt-modules/3" element={<ProtectedRoute><CBTExercise3 /></ProtectedRoute>} />
            <Route path="/cbt-modules/4" element={<ProtectedRoute><CBTExercise4 /></ProtectedRoute>} />
            <Route path="/cbt-modules/5" element={<ProtectedRoute><CBTExercise5 /></ProtectedRoute>} />
            <Route path="/journal" element={<ProtectedRoute><Journal /></ProtectedRoute>} />
            <Route path="/resources" element={<ProtectedRoute><Resources /></ProtectedRoute>} />
            <Route path="/support" element={<ProtectedRoute><Support /></ProtectedRoute>} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
