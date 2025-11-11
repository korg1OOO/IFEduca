import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Users, Star, MessageSquare } from "lucide-react";
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts";

export default function TeacherDashboard() {
  const stats = [
    {
      title: "Média Geral",
      value: "85.2",
      description: "+5.3% em relação ao semestre anterior",
      icon: Star,
      color: "text-warning",
    },
    {
      title: "Total de Avaliações",
      value: "127",
      description: "Recebidas neste semestre",
      icon: Users,
      color: "text-info",
    },
    {
      title: "Tendência",
      value: "+5.3%",
      description: "Melhoria contínua",
      icon: TrendingUp,
      color: "text-success",
    },
    {
      title: "Feedbacks",
      value: "12",
      description: "Novas sugestões recebidas",
      icon: MessageSquare,
      color: "text-accent",
    },
  ];

  const chartData = [
    { month: "Jan", score: 78 },
    { month: "Fev", score: 79 },
    { month: "Mar", score: 81 },
    { month: "Abr", score: 82 },
    { month: "Mai", score: 84 },
    { month: "Jun", score: 85 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Dashboard do Docente</h2>
        <p className="text-muted-foreground">
          Acompanhe suas métricas e evolução
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
          <CardTitle>Evolução da Pontuação</CardTitle>
          <CardDescription>
            Tendência de pontuação nos últimos 6 meses
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis
                dataKey="month"
                className="text-xs"
                tick={{ fill: "hsl(var(--muted-foreground))" }}
              />
              <YAxis
                className="text-xs"
                tick={{ fill: "hsl(var(--muted-foreground))" }}
                domain={[70, 90]}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
              />
              <Line
                type="monotone"
                dataKey="score"
                stroke="hsl(var(--primary))"
                strokeWidth={3}
                dot={{ fill: "hsl(var(--primary))", r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Pontos Fortes</CardTitle>
            <CardDescription>
              Aspectos mais bem avaliados
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { aspect: "Domínio do Conteúdo", score: 92 },
              { aspect: "Clareza na Explicação", score: 88 },
              { aspect: "Disponibilidade", score: 86 },
            ].map((item) => (
              <div key={item.aspect} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>{item.aspect}</span>
                  <span className="font-medium">{item.score}%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-success transition-all"
                    style={{ width: `${item.score}%` }}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Áreas de Melhoria</CardTitle>
            <CardDescription>
              Aspectos com menor pontuação
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { aspect: "Material Didático", score: 72 },
              { aspect: "Pontualidade", score: 75 },
              { aspect: "Feedback aos Alunos", score: 78 },
            ].map((item) => (
              <div key={item.aspect} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>{item.aspect}</span>
                  <span className="font-medium">{item.score}%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-warning transition-all"
                    style={{ width: `${item.score}%` }}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
