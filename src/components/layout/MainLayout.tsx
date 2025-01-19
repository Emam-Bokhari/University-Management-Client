import { Button, Layout } from "antd";
import { Outlet } from "react-router-dom";
import { Fragment } from "react/jsx-runtime";
import Sidebar from "./Sidebar";
import { useAppDispatch } from "../../redux/hook";
import { logout } from "../../redux/features/auth/authSlice";
import { toast } from "sonner";

const { Header, Content } = Layout;

export default function MainLayout() {
  const dispatch = useAppDispatch();

  function handleLogout() {
    dispatch(logout());
    toast.success("Successfully logout", { duration: 2000 });
  }
  return (
    <Fragment>
      <Layout style={{ height: "100vh", overflow: "hidden" }}>
        <Sidebar />
        <Layout style={{ height: "100%", overflow: "auto" }}>
          <Header style={{ padding: 0 }}>
            <Button onClick={handleLogout}>Logout</Button>
          </Header>
          <Content style={{ margin: "24px 16px 0", overflow: "auto" }}>
            <div
              style={{
                padding: 24,
                minHeight: 360,
              }}
            >
              {/* outlet */}
              <Outlet />
            </div>
          </Content>
        </Layout>
      </Layout>
    </Fragment>
  );
}
