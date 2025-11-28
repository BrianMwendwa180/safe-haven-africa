import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

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
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Verify from "./pages/Verify";

import { AuthProvider, useAuth } from "./lib/auth";
import RequireAuth from "./lib/RequireAuth";

const queryClient = new QueryClient();

const Landing: React.FC = () => {
  const { user } = useAuth();
  if (user) return <Index />;
  return <Navigate to="/signup" replace />;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing />} />

            <Route path="/breathing" element={<Breathing />} />
            <Route path="/cbt-modules" element={<CBTModules />} />
            <Route path="/cbt-modules/1" element={<CBTExercise1 />} />
            <Route path="/cbt-modules/2" element={<CBTExercise2 />} />
            <Route path="/cbt-modules/3" element={<CBTExercise3 />} />
            <Route path="/cbt-modules/4" element={<CBTExercise4 />} />
            <Route path="/cbt-modules/5" element={<CBTExercise5 />} />

            <Route path="/journal" element={<Journal />} />
            <Route path="/resources" element={<Resources />} />

            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/verify" element={<Verify />} />

            <Route
              path="/home"
              element={
                <RequireAuth>
                  <Index />
                </RequireAuth>
              }
            />

            {/* Catch all */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
