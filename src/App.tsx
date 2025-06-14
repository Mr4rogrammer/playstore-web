
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import AuthRoute from "./components/AuthRoute";
import LoginForm from "./components/LoginForm";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Pricing from "./pages/Pricing";
import Documentation from "./pages/Documentation";
import Support from "./pages/Support";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/dashboard" element={
              <AuthRoute fallback={<LoginForm />}>
                <Dashboard />
              </AuthRoute>
            } />
            <Route path="/pricing" element={
              <AuthRoute fallback={<LoginForm />}>
                <Pricing />
              </AuthRoute>
            } />
            <Route path="/documentation" element={
              <AuthRoute fallback={<LoginForm />}>
                <Documentation />
              </AuthRoute>
            } />
            <Route path="/support" element={
              <AuthRoute fallback={<LoginForm />}>
                <Support />
              </AuthRoute>
            } />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
