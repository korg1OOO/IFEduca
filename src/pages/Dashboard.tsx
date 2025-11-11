import { useAuth } from "@/contexts/AuthContext";
import StudentDashboard from "@/components/dashboards/StudentDashboard";
import TeacherDashboard from "@/components/dashboards/TeacherDashboard";
import CoordinatorDashboard from "@/components/dashboards/CoordinatorDashboard";
import AdminDashboard from "@/components/dashboards/AdminDashboard";

export default function Dashboard() {
  const { user } = useAuth();

  const renderDashboard = () => {
    switch (user?.role) {
      case "student":
        return <StudentDashboard />;
      case "teacher":
        return <TeacherDashboard />;
      case "coordinator":
        return <CoordinatorDashboard />;
      case "admin":
        return <AdminDashboard />;
      default:
        return <div>Dashboard não encontrado</div>;
    }
  };

  return renderDashboard();
}
