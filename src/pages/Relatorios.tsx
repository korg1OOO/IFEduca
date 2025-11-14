import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Bar, BarChart, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts";
import { Download, Filter } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

export default function Relatorios() {
  const { user } = useAuth();
  const [filterPeriod, setFilterPeriod] = useState("semestre");
  const [filterCourse, setFilterCourse] = useState("all");

  if (!user) return null;

  const isAdmin = user.role === "admin";

  // Mock data
  const performanceData = [
    { name: "Jan", avg: 78 },
    { name: "Fev", avg: 80 },
    { name: "Mar", avg: 82 },
    { name: "Abr", avg: 85 },
    { name: "Mai", avg: 84 },
    { name: "Jun", avg: 86 },
  ];

  const teacherScores = [
    { name: "Prof. Silva", score: 88 },
    { name: "Prof. Santos", score: 82 },
    { name: "Prof. Oliveira", score: 90 },
    { name: "Prof. Costa", score: 76 },
    { name: "Prof. Alves", score: 84 },
  ];

  const handleExport = () => {
    toast.success("Relatório exportado com sucesso!");
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Relatórios</h2>
          <p className="text-muted-foreground">
            {isAdmin ? "Relatórios gerais do sistema" : "Relatórios do curso"}
          </p>
        </div>
        <Button onClick={handleExport}>
          <Download className="mr-2 h-5 w-5" />
          Exportar PDF
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <Select value={filterPeriod} onValueChange={setFilterPeriod}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Período" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="semestre">Semestre Atual</SelectItem>
            <SelectItem value="ano">Ano Atual</SelectItem>
            <SelectItem value="all">Todo Período</SelectItem>
          </SelectContent>
        </Select>
        {isAdmin && (
          <Select value={filterCourse} onValueChange={setFilterCourse}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Curso" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os Cursos</SelectItem>
              <SelectItem value="info">Informática</SelectItem>
              <SelectItem value="eng">Engenharia</SelectItem>
              <SelectItem value="adm">Administração</SelectItem>
            </SelectContent>
          </Select>
        )}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Média Geral</CardDescription>
            <CardTitle className="text-3xl">84.5</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total de Avaliações</CardDescription>
            <CardTitle className="text-3xl">1,247</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Taxa de Participação</CardDescription>
            <CardTitle className="text-3xl">89%</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Docentes Avaliados</CardDescription>
            <CardTitle className="text-3xl">24</CardTitle>
          </CardHeader>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Evolução da Média Geral</CardTitle>
          <CardDescription>
            Tendência de desempenho ao longo do tempo
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis dataKey="name" className="text-xs" tick={{ fill: "hsl(var(--muted-foreground))" }} />
              <YAxis className="text-xs" tick={{ fill: "hsl(var(--muted-foreground))" }} domain={[70, 90]} />
              <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px" }} />
              <Line type="monotone" dataKey="avg" stroke="hsl(var(--primary))" strokeWidth={3} dot={{ fill: "hsl(var(--primary))", r: 5 }} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Desempenho por Docente</CardTitle>
          <CardDescription>
            Comparativo de médias
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={teacherScores}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis dataKey="name" className="text-xs" tick={{ fill: "hsl(var(--muted-foreground))" }} />
              <YAxis className="text-xs" tick={{ fill: "hsl(var(--muted-foreground))" }} domain={[0, 100]} />
              <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px" }} />
              <Bar dataKey="score" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}