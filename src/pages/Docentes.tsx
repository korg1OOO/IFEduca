import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

import { Search, Eye, Pencil, Trash2, UserPlus } from "lucide-react";

export default function Docentes() {
  const { user } = useAuth();

  // Bloqueio de acesso
  if (user?.role !== "coordinator" && user?.role !== "admin") {
    return (
      <div className="p-6">
        <h2 className="text-xl font-bold text-destructive">Acesso Negado</h2>
        <p className="text-muted-foreground">Esta página é exclusiva para coordenadores e administradores.</p>
      </div>
    );
  }

  // Mock de docentes
  const [docentes, setDocentes] = useState([
    { id: 1, nome: "João Silva", email: "joao@ifpr.edu.br", departamento: "Matemática" },
    { id: 2, nome: "Maria Santos", email: "maria@ifpr.edu.br", departamento: "Informática" },
    { id: 3, nome: "Carlos Alves", email: "carlos@ifpr.edu.br", departamento: "Física" },
    { id: 4, nome: "Fernanda Lima", email: "fernanda@ifpr.edu.br", departamento: "Química" },
  ]);

  const [busca, setBusca] = useState("");
  const [filtroDepto, setFiltroDepto] = useState("todos");

  const departamentos = ["Matemática", "Informática", "Física", "Química"];

  const docentesFiltrados = docentes.filter((d) => {
    const matchNome = d.nome.toLowerCase().includes(busca.toLowerCase());
    const matchEmail = d.email.toLowerCase().includes(busca.toLowerCase());
    const matchDepto = filtroDepto === "todos" || filtroDepto === d.departamento;

    return (matchNome || matchEmail) && matchDepto;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Gestão de Docentes</h2>
          <p className="text-muted-foreground">
            Adicione, edite e gerencie docentes do sistema
          </p>
        </div>

        <Button className="gap-2">
          <UserPlus className="h-4 w-4" />
          Novo Docente
        </Button>
      </div>

      {/* Filtros */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Filtros</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por nome ou e-mail"
              className="pl-8"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
            />
          </div>

          <Select value={filtroDepto} onValueChange={setFiltroDepto}>
            <SelectTrigger className="w-full md:w-56">
              <SelectValue placeholder="Departamento" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos os Departamentos</SelectItem>
              {departamentos.map((d) => (
                <SelectItem key={d} value={d}>{d}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Tabela */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Lista de Docentes</CardTitle>
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Departamento</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {docentesFiltrados.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-6 text-muted-foreground">
                    Nenhum docente encontrado.
                  </TableCell>
                </TableRow>
              )}

              {docentesFiltrados.map((d) => (
                <TableRow key={d.id}>
                  <TableCell className="font-medium">{d.nome}</TableCell>
                  <TableCell>{d.email}</TableCell>
                  <TableCell>{d.departamento}</TableCell>

                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button size="icon" variant="ghost">
                        <Eye className="h-4 w-4" />
                      </Button>

                      <Button size="icon" variant="ghost">
                        <Pencil className="h-4 w-4" />
                      </Button>

                      <Button size="icon" variant="ghost" className="text-destructive">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}