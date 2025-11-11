import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, FileText, Settings, Database } from "lucide-react";

export default function AdminDashboard() {
  const stats = [
    {
      title: "Total de Usuários",
      value: "1,247",
      description: "Ativos no sistema",
      icon: Users,
      color: "text-info",
    },
    {
      title: "Formulários Ativos",
      value: "8",
      description: "Configurados para este semestre",
      icon: FileText,
      color: "text-success",
    },
    {
      title: "Avaliações Coletadas",
      value: "3,542",
      description: "Neste período",
      icon: Database,
      color: "text-primary",
    },
    {
      title: "Configurações",
      value: "12",
      description: "Módulos ativos",
      icon: Settings,
      color: "text-muted-foreground",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Dashboard do Administrador</h2>
        <p className="text-muted-foreground">
          Gerenciamento geral do sistema
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

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Distribuição de Usuários</CardTitle>
            <CardDescription>
              Por tipo de perfil
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { role: "Alunos", count: 1100, percentage: 88 },
              { role: "Docentes", count: 120, percentage: 10 },
              { role: "Coordenadores", count: 20, percentage: 1.5 },
              { role: "Administradores", count: 7, percentage: 0.5 },
            ].map((item) => (
              <div key={item.role} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>{item.role}</span>
                  <span className="font-medium">{item.count}</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary transition-all"
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Atividades Recentes</CardTitle>
            <CardDescription>
              Últimas ações no sistema
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { action: "Formulário criado", user: "Admin", time: "Há 2 horas" },
              { action: "Novo docente cadastrado", user: "Coord. Silva", time: "Há 5 horas" },
              { action: "Relatório gerado", user: "Coord. Santos", time: "Há 1 dia" },
              { action: "Configurações atualizadas", user: "Admin", time: "Há 2 dias" },
            ].map((activity, index) => (
              <div
                key={index}
                className="flex items-start gap-3 p-3 rounded-lg border"
              >
                <div className="h-2 w-2 rounded-full bg-primary mt-2" />
                <div className="flex-1">
                  <p className="font-medium text-sm">{activity.action}</p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                    <span>{activity.user}</span>
                    <span>•</span>
                    <span>{activity.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
