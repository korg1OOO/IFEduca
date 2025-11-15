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
import Configuracoes from "./pages/Configuracoes";
import Feedbacks from "./pages/Feedbacks";
import Relatorios from "./pages/Relatorios";
import Usuarios from "./pages/Usuarios";
import NotFound from "./pages/NotFound";
import Perfil from "./pages/Perfil";
import Metricas from "./pages/Metricas";
import Docentes from "./pages/Docentes";
import Formularios from "./pages/Formularios";

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
                    <Metricas />
                  </DashboardLayout>
                }
              />
              <Route
                path="/feedbacks"
                element={
                  <DashboardLayout>
                    <Feedbacks />
                  </DashboardLayout>
                }
              />
              <Route
                path="/relatorios"
                element={
                  <DashboardLayout>
                    <Relatorios />
                  </DashboardLayout>
                }
              />
              <Route
                path="/configuracoes"
                element={
                  <DashboardLayout>
                    <Configuracoes />
                  </DashboardLayout>
                }
              />
              <Route
                path="/usuarios"
                element={
                  <DashboardLayout>
                    <Usuarios />
                  </DashboardLayout>
                }
              />
              <Route
                path="/formularios"
                element={
                  <DashboardLayout>
                    <Formularios />
                  </DashboardLayout>
                }
              />
              <Route
                path="/docentes"
                element={
                  <DashboardLayout>
                    <Docentes />
                  </DashboardLayout>
                }
              />
              <Route
                path="/perfil"
                element={
                  <DashboardLayout>
                    <Perfil />
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