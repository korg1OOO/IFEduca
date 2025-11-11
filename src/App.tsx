import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Avaliar from "./pages/Avaliar";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route
                path="/dashboard"
                element={
                  <DashboardLayout>
                    <Dashboard />
                  </DashboardLayout>
                }
              />
              <Route
                path="/avaliar"
                element={
                  <DashboardLayout>
                    <Avaliar />
                  </DashboardLayout>
                }
              />
              <Route
                path="/metricas"
                element={
                  <DashboardLayout>
                    <div className="text-center py-12">
                      <h2 className="text-2xl font-bold mb-4">Métricas</h2>
                      <p className="text-muted-foreground">Página em desenvolvimento</p>
                    </div>
                  </DashboardLayout>
                }
              />
              <Route
                path="/feedbacks"
                element={
                  <DashboardLayout>
                    <div className="text-center py-12">
                      <h2 className="text-2xl font-bold mb-4">Feedbacks</h2>
                      <p className="text-muted-foreground">Página em desenvolvimento</p>
                    </div>
                  </DashboardLayout>
                }
              />
              <Route
                path="/relatorios"
                element={
                  <DashboardLayout>
                    <div className="text-center py-12">
                      <h2 className="text-2xl font-bold mb-4">Relatórios</h2>
                      <p className="text-muted-foreground">Página em desenvolvimento</p>
                    </div>
                  </DashboardLayout>
                }
              />
              <Route
                path="/configuracoes"
                element={
                  <DashboardLayout>
                    <div className="text-center py-12">
                      <h2 className="text-2xl font-bold mb-4">Configurações</h2>
                      <p className="text-muted-foreground">Página em desenvolvimento</p>
                    </div>
                  </DashboardLayout>
                }
              />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
