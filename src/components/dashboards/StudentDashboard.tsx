import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ClipboardList, Clock, CheckCircle, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Progress } from "@/components/ui/progress";

export default function StudentDashboard() {
  const navigate = useNavigate();

  const stats = [
    {
      title: "Avaliações Pendentes",
      value: "5",
      description: "Docentes aguardando avaliação",
      icon: Clock,
      color: "text-warning",
    },
    {
      title: "Avaliações Concluídas",
      value: "12",
      description: "Neste semestre",
      icon: CheckCircle,
      color: "text-success",
    },
    {
      title: "Prazo Final",
      value: "15 dias",
      description: "Para concluir avaliações",
      icon: AlertCircle,
      color: "text-accent",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Dashboard do Aluno</h2>
        <p className="text-muted-foreground">
          Acompanhe suas avaliações e prazos
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
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
          <CardTitle>Progresso das Avaliações</CardTitle>
          <CardDescription>
            Você completou 70% das avaliações deste período
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Progress value={70} className="h-3" />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>12 de 17 avaliações concluídas</span>
            <span>70%</span>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Docentes Pendentes de Avaliação</CardTitle>
          <CardDescription>
            Clique para avaliar cada docente
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {["Prof. João Silva", "Profa. Maria Santos", "Prof. Carlos Oliveira", "Profa. Ana Costa", "Prof. Pedro Alves"].map((name) => (
            <div
              key={name}
              className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-primary font-medium">
                    {name.split(" ")[1].charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="font-medium">{name}</p>
                  <p className="text-sm text-muted-foreground">
                    Matemática Aplicada
                  </p>
                </div>
              </div>
              <Button
                variant="default"
                size="sm"
                onClick={() => navigate("/avaliar")}
              >
                <ClipboardList className="h-4 w-4 mr-2" />
                Avaliar
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
