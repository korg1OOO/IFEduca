import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash } from "lucide-react";

type QuestionType = "text" | "textarea" | "select" | "number";

interface Question {
  id: string;
  title: string;
  type: QuestionType;
  options?: string[];
}

interface Formulario {
  id: string;
  name: string;
  questions: Question[];
}

export default function Formularios() {
  // MOCK INICIAL (apenas em memória)
  const [formularios, setFormularios] = useState<Formulario[]>([
    {
      id: "1",
      name: "Avaliação do Docente - 2024",
      questions: [
        { id: "q1", title: "O docente domina o conteúdo?", type: "select", options: ["Sim", "Não"] },
        { id: "q2", title: "Comentário adicional", type: "textarea" },
      ],
    },
    {
      id: "2",
      name: "Avaliação do Curso",
      questions: [
        { id: "q1", title: "A estrutura do curso é adequada?", type: "select", options: ["Ótima", "Boa", "Ruim"] },
      ],
    },
  ]);

  const [formId, setFormId] = useState<string>("1");
  const [selectedQuestionId, setSelectedQuestionId] = useState<string | null>(null);

  const selectedForm = formularios.find((f) => f.id === formId)!;
  const selectedQuestion = selectedForm.questions.find((q) => q.id === selectedQuestionId) || null;

  // Criar pergunta
  const addQuestion = () => {
    const newQuestion: Question = {
      id: crypto.randomUUID(),
      title: "Nova Pergunta",
      type: "text",
    };

    setFormularios((prev) =>
      prev.map((f) =>
        f.id === selectedForm.id
          ? { ...f, questions: [...f.questions, newQuestion] }
          : f
      )
    );
  };

  // Atualizar pergunta
  const updateQuestion = (field: keyof Question, value: any) => {
    if (!selectedQuestion) return;

    setFormularios((prev) =>
      prev.map((f) =>
        f.id === selectedForm.id
          ? {
              ...f,
              questions: f.questions.map((q) =>
                q.id === selectedQuestion.id
                  ? { ...q, [field]: value }
                  : q
              ),
            }
          : f
      )
    );
  };

  // Remover pergunta
  const deleteQuestion = (id: string) => {
    setSelectedQuestionId(null);
    setFormularios((prev) =>
      prev.map((f) =>
        f.id === selectedForm.id
          ? { ...f, questions: f.questions.filter((q) => q.id !== id) }
          : f
      )
    );
  };

  return (
    <div className="space-y-8 p-4">
      {/* BLOCO 1 — Selecionar formulário */}
      <Card>
        <CardHeader>
          <CardTitle>Selecionar Formulário</CardTitle>
        </CardHeader>
        <CardContent>
          <Select value={formId} onValueChange={(v) => { setFormId(v); setSelectedQuestionId(null); }}>
            <SelectTrigger className="w-72">
              <SelectValue placeholder="Escolha um formulário" />
            </SelectTrigger>
            <SelectContent>
              {formularios.map((f) => (
                <SelectItem key={f.id} value={f.id}>
                  {f.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* BLOCO 2 — Perguntas */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Perguntas</CardTitle>
          <Button onClick={addQuestion}>
            <Plus className="h-4 w-4 mr-2" /> Nova Pergunta
          </Button>
        </CardHeader>

        <CardContent className="space-y-3">
          {selectedForm.questions.length === 0 && (
            <p className="text-muted-foreground text-sm">Nenhuma pergunta ainda.</p>
          )}

          {selectedForm.questions.map((q) => (
            <div
              key={q.id}
              className={`flex items-center justify-between p-3 border rounded-lg cursor-pointer transition 
              ${selectedQuestionId === q.id ? "bg-accent" : "hover:bg-muted"}`}
              onClick={() => setSelectedQuestionId(q.id)}
            >
              <span className="font-medium">{q.title}</span>
              <Button
                variant="destructive"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  deleteQuestion(q.id);
                }}
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* BLOCO 3 — Editor da pergunta */}
      {selectedQuestion && (
        <Card>
          <CardHeader>
            <CardTitle>Editar Pergunta</CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium">Título</label>
              <Input
                value={selectedQuestion.title}
                onChange={(e) => updateQuestion("title", e.target.value)}
                className="mt-1"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Tipo</label>

              <Select
                value={selectedQuestion.type}
                onValueChange={(v) =>
                  updateQuestion("type", v as QuestionType)
                }
              >
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="text">Resposta curta</SelectItem>
                  <SelectItem value="textarea">Texto longo</SelectItem>
                  <SelectItem value="number">Número</SelectItem>
                  <SelectItem value="select">Múltipla escolha</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Opções (caso select) */}
            {selectedQuestion.type === "select" && (
              <div className="space-y-2">
                <label className="text-sm font-medium">Opções</label>

                {(selectedQuestion.options || []).map((opt, idx) => (
                  <div key={idx} className="flex gap-2">
                    <Input
                      value={opt}
                      onChange={(e) => {
                        const newOpts = [...(selectedQuestion.options || [])];
                        newOpts[idx] = e.target.value;
                        updateQuestion("options", newOpts);
                      }}
                    />
                    <Button
                      variant="destructive"
                      onClick={() => {
                        const newOpts = (selectedQuestion.options || []).filter(
                          (_, i) => i !== idx
                        );
                        updateQuestion("options", newOpts);
                      }}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                ))}

                <Button
                  variant="outline"
                  onClick={() =>
                    updateQuestion("options", [
                      ...(selectedQuestion.options || []),
                      "Nova opção",
                    ])
                  }
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Adicionar opção
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
