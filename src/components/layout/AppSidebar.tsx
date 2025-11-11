import {
  LayoutDashboard,
  FileText,
  MessageSquare,
  BarChart3,
  Settings,
  ClipboardList,
  Users,
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useAuth } from "@/contexts/AuthContext";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

export function AppSidebar() {
  const { state } = useSidebar();
  const { user } = useAuth();
  const collapsed = state === "collapsed";

  const getMenuItems = () => {
    const commonItems = [
      { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
    ];

    const roleSpecificItems = {
      student: [
        { title: "Avaliar Docentes", url: "/avaliar", icon: ClipboardList },
      ],
      teacher: [
        { title: "Minhas Métricas", url: "/metricas", icon: BarChart3 },
        { title: "Feedbacks", url: "/feedbacks", icon: MessageSquare },
      ],
      coordinator: [
        { title: "Relatórios", url: "/relatorios", icon: FileText },
        { title: "Feedbacks", url: "/feedbacks", icon: MessageSquare },
        { title: "Gestão de Docentes", url: "/docentes", icon: Users },
      ],
      admin: [
        { title: "Configurações", url: "/configuracoes", icon: Settings },
        { title: "Formulários", url: "/formularios", icon: FileText },
        { title: "Usuários", url: "/usuarios", icon: Users },
        { title: "Relatórios", url: "/relatorios", icon: FileText },
      ],
    };

    return [
      ...commonItems,
      ...(user?.role ? roleSpecificItems[user.role] || [] : []),
    ];
  };

  const menuItems = getMenuItems();

  return (
    <Sidebar className={collapsed ? "w-14" : "w-60"} collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end
                      className="hover:bg-sidebar-accent"
                      activeClassName="bg-sidebar-accent text-sidebar-primary font-medium"
                    >
                      <item.icon className="h-5 w-5" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
