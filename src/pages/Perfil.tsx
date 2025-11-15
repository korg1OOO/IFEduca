import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useAuth } from "@/contexts/AuthContext";
import { Mail, User, Shield } from "lucide-react";

export default function Perfil() {
  const { user } = useAuth();

  const getRoleLabel = (role: string) => {
    const labels = {
      student: "Aluno",
      teacher: "Docente",
      coordinator: "Coordenador",
      admin: "Administrador",
    };
    return labels[role as keyof typeof labels] || role;
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Meu Perfil</h2>
        <p className="text-muted-foreground">
          Informações da sua conta
        </p>
      </div>

      <Card className="shadow-card max-w-xl">
        <CardHeader className="flex flex-col items-center gap-4">
          <Avatar className="h-20 w-20">
            <AvatarFallback className="bg-primary text-primary-foreground text-3xl">
              {user?.name.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>

          <CardTitle className="text-xl font-bold">{user?.name}</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="flex items-center gap-3">
            <Mail className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="text-sm font-semibold">Email</p>
              <p className="text-muted-foreground text-sm">{user?.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <User className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="text-sm font-semibold">Nome</p>
              <p className="text-muted-foreground text-sm">{user?.name}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Shield className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="text-sm font-semibold">Tipo de Conta</p>
              <p className="text-muted-foreground text-sm">
                {getRoleLabel(user?.role || "")}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
