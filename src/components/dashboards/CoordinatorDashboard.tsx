import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Users, AlertTriangle, CheckCircle } from "lucide-react";
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts";

export default function CoordinatorDashboard() {
  const stats = [
    {
      title: "Média Geral do Curso",
      value: "82.5",
      description: "Todas as disciplinas",
      icon: TrendingUp,
      color: "text-success",
    },
    {
      title: "Total de Docentes",
      value: "24",
      description: "Ativos neste semestre",
      icon: Users,
      color: "text-info",
    },
    {
      title: "Alertas Ativos",
      value: "3",
      description: "Docentes com média <70%",
      icon: AlertTriangle,
      color: "text-accent",
    },
    {
      title: "Taxa de Resposta",
      value: "89%",
      description: "Alunos que avaliaram",
      icon: CheckCircle,
      color: "text-success",
    },
  ];

  const chartData = [
    { name: "Prof. Silva", score: 85 },
    { name: "Prof. Santos", score: 78 },
    { name: "Prof. Oliveira", score: 92 },
    { name: "Prof. Costa", score: 68 },
    { name: "Prof. Alves", score: 81 },
    { name: "Prof. Lima", score: 87 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Dashboard do Coordenador</h2>
        <p className="text-muted-foreground">
          Visão geral do desempenho do curso
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title} className="shadow-card hover:shadow-card-hover transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <Icon className={`h-5 w-5 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Média por Docente</CardTitle>
          <CardDescription>
            Comparativo de desempenho dos docentes
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis
                dataKey="name"
                className="text-xs"
                tick={{ fill: "hsl(var(--muted-foreground))" }}
              />
              <YAxis
                className="text-xs"
                tick={{ fill: "hsl(var(--muted-foreground))" }}
                domain={[0, 100]}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
              />
              <Bar
                dataKey="score"
                fill="hsl(var(--primary))"
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Docentes Destaque</CardTitle>
            <CardDescription>
              Maiores pontuações do semestre
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { name: "Prof. Oliveira", score: 92, subject: "Algoritmos" },
              { name: "Prof. Lima", score: 87, subject: "Banco de Dados" },
              { name: "Prof. Silva", score: 85, subject: "Programação Web" },
            ].map((teacher) => (
              <div
                key={teacher.name}
                className="flex items-center justify-between p-3 rounded-lg border"
              >
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-success/10 flex items-center justify-center">
                    <span className="text-success font-medium">
                      {teacher.name.split(" ")[1].charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium">{teacher.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {teacher.subject}
                    </p>
                  </div>
                </div>
                <div className="text-2xl font-bold text-success">
                  {teacher.score}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Atenção Necessária</CardTitle>
            <CardDescription>
              Docentes com pontuação abaixo de 70%
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { name: "Prof. Costa", score: 68, subject: "Redes de Computadores", feedbacks: 5 },
            ].map((teacher) => (
              <div
                key={teacher.name}
                className="flex items-center justify-between p-3 rounded-lg border border-accent/30 bg-accent/5"
              >
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-accent/10 flex items-center justify-center">
                    <span className="text-accent font-medium">
                      {teacher.name.split(" ")[1].charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium">{teacher.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {teacher.subject}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {teacher.feedbacks} feedbacks pendentes
                    </p>
                  </div>
                </div>
                <div className="text-2xl font-bold text-accent">
                  {teacher.score}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
