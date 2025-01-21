import {
  HomeOutlined,
  TeamOutlined,
  UserAddOutlined,
  BookOutlined,
  SolutionOutlined,
  ApartmentOutlined,
  CalendarOutlined,
  EditOutlined,
} from "@ant-design/icons";
import AcademicDepartment from "../pages/admin/academicManagement/AcademicDepartment";
import AcademicFaculty from "../pages/admin/academicManagement/AcademicFaculty";
import AcademicSemester from "../pages/admin/academicManagement/academicSemester";
import CreateAcademicDepartment from "../pages/admin/academicManagement/CreateAcademicDepartment";
import CreateAcademicFaculty from "../pages/admin/academicManagement/CreateAcademicFaculty";
import CreateAcademicSemester from "../pages/admin/academicManagement/CreateAcademicSemester";
import AdminDashboard from "../pages/admin/AdminDashboard";
import CreateAdmin from "../pages/admin/userManagement/CreateAdmin";
import CreateFaculty from "../pages/admin/userManagement/CreateFaculty";
import CreateStudent from "../pages/admin/userManagement/CreateStudent";
import StudentData from "../pages/admin/userManagement/StudentData";
import StudentDetails from "../pages/admin/userManagement/StudentDetails";

export const adminPaths = [
  {
    name: "Dashboard",
    path: "dashboard",
    icon: <HomeOutlined style={{ fontSize: "20px" }} />,
    element: <AdminDashboard />,
  },
  {
    name: "User Management",
    icon: <TeamOutlined style={{ fontSize: "20px" }} />,
    children: [
      {
        name: "Create Admin",
        path: "create-admin",
        icon: <UserAddOutlined style={{ fontSize: "20px" }} />,
        element: <CreateAdmin />,
      },
      {
        name: "Create Faculty",
        path: "create-faculty",
        icon: <UserAddOutlined style={{ fontSize: "20px" }} />,
        element: <CreateFaculty />,
      },
      {
        name: "Create Student",
        path: "create-student",
        icon: <UserAddOutlined style={{ fontSize: "20px" }} />,
        element: <CreateStudent />,
      },
      {
        name: "Students",
        path: "students-data",
        icon: <TeamOutlined style={{ fontSize: "20px" }} />,
        element: <StudentData />,
      },
      {
        path: "student-data/:studentId",
        element: <StudentDetails />,
      },
    ],
  },
  {
    name: "Academic Management",
    icon: <BookOutlined style={{ fontSize: "20px" }} />,
    children: [
      {
        name: "Create Academic Semester",
        path: "create-academic-semesters",
        icon: <EditOutlined style={{ fontSize: "20px" }} />,
        element: <CreateAcademicSemester />,
      },
      {
        name: "Academic Semester",
        path: "academic-semesters",
        icon: <CalendarOutlined style={{ fontSize: "20px" }} />,
        element: <AcademicSemester />,
      },
      {
        name: "Create Academic Faculty",
        path: "create-academic-faculty",
        icon: <EditOutlined style={{ fontSize: "20px" }} />,
        element: <CreateAcademicFaculty />,
      },
      {
        name: "Academic Faculty",
        path: "academic-faculty",
        icon: <SolutionOutlined style={{ fontSize: "20px" }} />,
        element: <AcademicFaculty />,
      },
      {
        name: "Create Academic Department",
        path: "create-academic-department",
        icon: <EditOutlined style={{ fontSize: "20px" }} />,
        element: <CreateAcademicDepartment />,
      },
      {
        name: "Academic Department",
        path: "academic-department",
        icon: <ApartmentOutlined style={{ fontSize: "20px" }} />,
        element: <AcademicDepartment />,
      },
    ],
  },
];
