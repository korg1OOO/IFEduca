import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { BarChart3, Users, Star, TrendingUp } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export default function Metricas() {
  const { user } = useAuth();

  if (user?.role !== "teacher") {
    return (
      <div className="p-6">
        <h2 className="text-xl font-bold text-destructive">Acesso Negado</h2>
        <p className="text-muted-foreground">Esta página é exclusiva para docentes.</p>
      </div>
    );
  }

  // ➜ Dados mockados, prontos para substituir por API depois
  const stats = [
    {
      title: "Média Geral",
      value: "4.6",
      description: "Avaliação média dos alunos",
      icon: Star,
    },
    {
      title: "Total de Avaliações",
      value: "128",
      description: "Recebidas neste semestre",
      icon: Users,
    },
    {
      title: "Nível de Satisfação",
      value: "92%",
      description: "Comportamento ao longo do período",
      icon: TrendingUp,
    },
    {
      title: "Ranking",
      value: "Top 12%",
      description: "Entre todos os docentes do campus",
      icon: BarChart3,
    },
  ];

  const categories = [
    { name: "Didática", score: 4.8 },
    { name: "Domínio do Conteúdo", score: 4.7 },
    { name: "Clareza nas Explicações", score: 4.5 },
    { name: "Organização das Aulas", score: 4.6 },
    { name: "Disponibilidade", score: 4.4 },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Minhas Métricas</h2>
        <p className="text-muted-foreground">
          Desempenho baseado na avaliação dos alunos
        </p>
      </div>

      {/* Cards principais */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title} className="shadow-card hover:shadow-card-hover transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <Icon className="h-5 w-5 text-primary" />
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

      {/* Avaliação por categoria */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Desempenho por Categoria</CardTitle>
          <CardDescription>Avaliação média em cada aspecto</CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {categories.map((cat) => (
            <div key={cat.name} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>{cat.name}</span>
                <span className="font-medium">{cat.score}</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary transition-all"
                  style={{ width: `${(cat.score / 5) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Histórico */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Histórico de Avaliações</CardTitle>
          <CardDescription>Os mais recentes enviados pelos alunos</CardDescription>
        </CardHeader>

        <CardContent className="space-y-3">
          {[ 
            { text: "Excelente didática!", date: "Há 2 dias" },
            { text: "Explica muito bem, mas poderia disponibilizar mais materiais.", date: "Há 1 semana" },
            { text: "Ótimo professor! Sempre disponível.", date: "Há 10 dias" },
          ].map((item, idx) => (
            <div
              key={idx}
              className="flex items-start gap-3 p-3 rounded-lg border"
            >
              <div className="h-2 w-2 rounded-full bg-primary mt-2" />
              <div>
                <p className="text-sm">{item.text}</p>
                <p className="text-xs text-muted-foreground mt-1">{item.date}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
