import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { toast } from "sonner";
import { Send } from "lucide-react";

export default function Avaliar() {
  const [ratings, setRatings] = useState({
    dominio: [75],
    clareza: [75],
    disponibilidade: [75],
    material: [75],
    pontualidade: [75],
  });
  const [comentarios, setComentarios] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Avaliação enviada com sucesso! Obrigado pelo seu feedback.");
    // Reset form
    setRatings({
      dominio: [75],
      clareza: [75],
      disponibilidade: [75],
      material: [75],
      pontualidade: [75],
    });
    setComentarios("");
  };

  const criteria = [
    { id: "dominio", label: "Domínio do Conteúdo", description: "Conhecimento e expertise na disciplina" },
    { id: "clareza", label: "Clareza na Explicação", description: "Facilidade de compreensão das aulas" },
    { id: "disponibilidade", label: "Disponibilidade", description: "Acesso e suporte fora da sala de aula" },
    { id: "material", label: "Material Didático", description: "Qualidade dos recursos utilizados" },
    { id: "pontualidade", label: "Pontualidade", description: "Cumprimento de horários e prazos" },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Avaliar Docente</h2>
        <p className="text-muted-foreground">
          Sua avaliação é anônima e ajuda a melhorar a qualidade do ensino
        </p>
      </div>

      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Prof. João Silva</CardTitle>
          <CardDescription>
            Matemática Aplicada • Turma: INFO-2023
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {criteria.map((criterion) => (
              <div key={criterion.id} className="space-y-3">
                <div>
                  <Label className="text-base font-medium">{criterion.label}</Label>
                  <p className="text-sm text-muted-foreground">
                    {criterion.description}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <Slider
                    value={ratings[criterion.id as keyof typeof ratings]}
                    onValueChange={(value) =>
                      setRatings((prev) => ({ ...prev, [criterion.id]: value }))
                    }
                    max={100}
                    step={5}
                    className="flex-1"
                  />
                  <div className="w-16 text-center">
                    <span className="text-2xl font-bold text-primary">
                      {ratings[criterion.id as keyof typeof ratings][0]}
                    </span>
                  </div>
                </div>
              </div>
            ))}

            <div className="space-y-3 pt-4 border-t">
              <Label htmlFor="comentarios" className="text-base font-medium">
                Comentários Adicionais (Opcional)
              </Label>
              <Textarea
                id="comentarios"
                placeholder="Compartilhe sugestões, elogios ou pontos de melhoria..."
                value={comentarios}
                onChange={(e) => setComentarios(e.target.value)}
                rows={5}
                className="resize-none"
              />
              <p className="text-xs text-muted-foreground">
                Seus comentários são anônimos e serão usados para feedback construtivo.
              </p>
            </div>

            <Button type="submit" size="lg" className="w-full">
              <Send className="mr-2 h-5 w-5" />
              Enviar Avaliação
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}