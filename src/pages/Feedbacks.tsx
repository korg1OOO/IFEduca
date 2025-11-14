import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { MessageSquare, Search, Filter, Star } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export default function Feedbacks() {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "positive" | "negative" | "neutral">("all");
  const [selectedFeedback, setSelectedFeedback] = useState<string | null>(null);
  const [response, setResponse] = useState("");

  if (!user) return null;

  const isTeacher = user.role === "teacher";
  const isCoordinator = user.role === "coordinator";

  // Mock data - different for roles
  const teacherFeedbacks = [
    {
      id: "1",
      student: "Aluno Anônimo",
      date: "2025-11-10",
      rating: 4.5,
      comment: "Excelente explicação, mas poderia fornecer mais exemplos práticos.",
      status: "positive",
    },
    {
      id: "2",
      student: "Aluno Anônimo",
      date: "2025-11-08",
      rating: 3.0,
      comment: "Aulas um pouco corridas, difícil acompanhar às vezes.",
      status: "neutral",
    },
    {
      id: "3",
      student: "Aluno Anônimo",
      date: "2025-11-05",
      rating: 5.0,
      comment: "Melhor professor que já tive! Muito atencioso.",
      status: "positive",
    },
  ];

  const coordinatorFeedbacks = [
    {
      id: "1",
      teacher: "Prof. Silva",
      student: "Aluno Anônimo",
      date: "2025-11-10",
      rating: 4.5,
      comment: "Excelente explicação, mas poderia fornecer mais exemplos práticos.",
      status: "positive",
    },
    {
      id: "2",
      teacher: "Prof. Santos",
      student: "Aluno Anônimo",
      date: "2025-11-08",
      rating: 2.5,
      comment: "Precisa melhorar a pontualidade e organização das aulas.",
      status: "negative",
    },
    {
      id: "3",
      teacher: "Prof. Oliveira",
      student: "Aluno Anônimo",
      date: "2025-11-05",
      rating: 5.0,
      comment: "Professor excepcional, muito dedicado.",
      status: "positive",
    },
    {
      id: "4",
      teacher: "Prof. Costa",
      student: "Aluno Anônimo",
      date: "2025-11-03",
      rating: 3.5,
      comment: "Conteúdo bom, mas interação com alunos poderia ser melhor.",
      status: "neutral",
    },
  ];

  const feedbacks = isTeacher ? teacherFeedbacks : coordinatorFeedbacks;

  const filteredFeedbacks = feedbacks.filter((fb) => {
    const matchesSearch = 
      (isTeacher ? fb.comment.toLowerCase().includes(searchTerm.toLowerCase()) :
      (fb.teacher.toLowerCase().includes(searchTerm.toLowerCase()) || fb.comment.toLowerCase().includes(searchTerm.toLowerCase())));
    const matchesFilter = filterStatus === "all" || fb.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const handleRespond = (id: string) => {
    if (response.trim()) {
      toast.success("Resposta enviada com sucesso!");
      setResponse("");
      setSelectedFeedback(null);
    } else {
      toast.error("Por favor, escreva uma resposta.");
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Feedbacks</h2>
        <p className="text-muted-foreground">
          {isTeacher ? "Visualize os feedbacks recebidos dos alunos" : "Monitore feedbacks dos docentes do curso"}
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total de Feedbacks</CardDescription>
            <CardTitle className="text-3xl">{feedbacks.length}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Média de Avaliação</CardDescription>
            <CardTitle className="text-3xl">
              {(
                feedbacks.reduce((sum, fb) => sum + fb.rating, 0) / feedbacks.length
              ).toFixed(1)}
            </CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Positivos</CardDescription>
            <CardTitle className="text-3xl">
              {feedbacks.filter((fb) => fb.status === "positive").length}
            </CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Negativos</CardDescription>
            <CardTitle className="text-3xl">
              {feedbacks.filter((fb) => fb.status === "negative").length}
            </CardTitle>
          </CardHeader>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Feedbacks</CardTitle>
          <CardDescription>
            {isTeacher ? "Feedbacks anônimos recebidos" : "Feedbacks por docente"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  className="pl-9"
                  placeholder={isTeacher ? "Buscar por conteúdo..." : "Buscar por docente ou conteúdo..."}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select value={filterStatus} onValueChange={(v: any) => setFilterStatus(v)}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filtrar por status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="positive">Positivos</SelectItem>
                  <SelectItem value="negative">Negativos</SelectItem>
                  <SelectItem value="neutral">Neutros</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-4">
              {filteredFeedbacks.map((fb) => (
                <div key={fb.id} className="p-4 border rounded-lg space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      {isCoordinator && <p className="font-medium">{fb.teacher}</p>}
                      <p className="text-sm text-muted-foreground">{fb.date}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={fb.status === "positive" ? "success" : fb.status === "negative" ? "destructive" : "default"}>
                        {fb.status.charAt(0).toUpperCase() + fb.status.slice(1)}
                      </Badge>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-warning mr-1" />
                        <span>{fb.rating}</span>
                      </div>
                    </div>
                  </div>
                  <p>{fb.comment}</p>
                  {isTeacher && (
                    <div>
                      {selectedFeedback === fb.id ? (
                        <div className="space-y-2">
                          <Label>Resposta (opcional)</Label>
                          <Textarea
                            value={response}
                            onChange={(e) => setResponse(e.target.value)}
                            placeholder="Responda ao feedback..."
                          />
                          <div className="flex gap-2">
                            <Button onClick={() => handleRespond(fb.id)}>Enviar</Button>
                            <Button variant="outline" onClick={() => setSelectedFeedback(null)}>Cancelar</Button>
                          </div>
                        </div>
                      ) : (
                        <Button variant="outline" size="sm" onClick={() => setSelectedFeedback(fb.id)}>
                          <MessageSquare className="h-4 w-4 mr-2" />
                          Responder
                        </Button>
                      )}
                    </div>
                  )}
                </div>
              ))}
              {filteredFeedbacks.length === 0 && (
                <p className="text-center text-muted-foreground">Nenhum feedback encontrado</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}