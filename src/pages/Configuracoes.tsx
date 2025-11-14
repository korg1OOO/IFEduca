import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Settings2, Save, Mail, Calendar, Bell } from "lucide-react";

export default function Configuracoes() {
  const [settings, setSettings] = useState({
    semester: "2025/2",
    evaluationPeriod: { start: "2025-11-01", end: "2025-12-15" },
    notifications: true,
    emailReminders: true,
    maxEvaluations: 5,
  });

  const handleSave = () => {
    toast.success("Configurações salvas com sucesso!");
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Configurações do Sistema</h2>
        <p className="text-muted-foreground">
          Gerencie as configurações gerais do IF Educa
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Configurações Gerais</CardTitle>
          <CardDescription>
            Defina parâmetros do sistema
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label>Semestre Atual</Label>
            <Input
              value={settings.semester}
              onChange={(e) => setSettings({ ...settings, semester: e.target.value })}
              placeholder="Ex: 2025/2"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Início do Período de Avaliação</Label>
              <Input
                type="date"
                value={settings.evaluationPeriod.start}
                onChange={(e) => setSettings({
                  ...settings,
                  evaluationPeriod: { ...settings.evaluationPeriod, start: e.target.value }
                })}
              />
            </div>
            <div className="space-y-2">
              <Label>Fim do Período de Avaliação</Label>
              <Input
                type="date"
                value={settings.evaluationPeriod.end}
                onChange={(e) => setSettings({
                  ...settings,
                  evaluationPeriod: { ...settings.evaluationPeriod, end: e.target.value }
                })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Máximo de Avaliações por Aluno</Label>
            <Input
              type="number"
              value={settings.maxEvaluations}
              onChange={(e) => setSettings({ ...settings, maxEvaluations: parseInt(e.target.value) })}
              min={1}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Notificações</CardTitle>
          <CardDescription>
            Configure as preferências de notificação
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Notificações no Sistema</Label>
              <p className="text-sm text-muted-foreground">Receber alertas dentro da plataforma</p>
            </div>
            <Switch
              checked={settings.notifications}
              onCheckedChange={(checked) => setSettings({ ...settings, notifications: checked })}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Lembretes por E-mail</Label>
              <p className="text-sm text-muted-foreground">Enviar e-mails sobre prazos e atualizações</p>
            </div>
            <Switch
              checked={settings.emailReminders}
              onCheckedChange={(checked) => setSettings({ ...settings, emailReminders: checked })}
            />
          </div>
        </CardContent>
      </Card>

      <Button onClick={handleSave} size="lg">
        <Save className="mr-2 h-5 w-5" />
        Salvar Configurações
      </Button>
    </div>
  );
}