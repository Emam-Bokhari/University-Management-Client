import { Menu, Layout } from "antd";
import { Fragment } from "react/jsx-runtime";
import { sidebarItemsGenerator } from "../../utils/sidebarItemsGenerator";
import { adminPaths } from "../../routes/admin.routes";
import { facultyPaths } from "../../routes/faculty.routes";
import { studentPaths } from "../../routes/student.routes";
import { useAppSelector } from "../../redux/hook";
import { selectCurrentUser } from "../../redux/features/auth/authSlice";

import { useState } from "react";

const { Sider } = Layout;

const UserRole = {
  ADMIN: "admin",
  FACULTY: "faculty",
  STUDENT: "student",
};

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  const user = useAppSelector(selectCurrentUser);

  let sidebarItems;

  switch (user!.role) {
    case UserRole.ADMIN:
      sidebarItems = sidebarItemsGenerator(adminPaths, UserRole.ADMIN);
      break;
    case UserRole.FACULTY:
      sidebarItems = sidebarItemsGenerator(facultyPaths, UserRole.FACULTY);
      break;
    case UserRole.STUDENT:
      sidebarItems = sidebarItemsGenerator(studentPaths, UserRole.STUDENT);
      break;
    default:
      break;
  }

  return (
    <Fragment>
      <Sider
        width={250}
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        collapsedWidth={80}
        breakpoint="lg"
        onBreakpoint={(broken) => setCollapsed(broken)}
        style={{ height: "100vh", overflow: "auto" }}
      >
        {/* logo */}
        <div
          style={{
            color: "white",
            height: "4rem",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h1
            style={{
              fontWeight: "normal",
              fontSize: collapsed ? "16px" : "18px",
            }}
          >
            {collapsed ? "PH" : "PH-University"}
          </h1>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={sidebarItems}
          inlineCollapsed={collapsed}
        />
      </Sider>
    </Fragment>
  );
}
