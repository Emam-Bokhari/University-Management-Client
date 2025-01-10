import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import { Fragment } from "react/jsx-runtime";
import Sidebar from "./Sidebar";

const { Header, Content } = Layout;

export default function MainLayout() {
  return (
    <Fragment>
      <Layout style={{ height: "100vh" }}>
        <Sidebar />
        <Layout>
          <Header style={{ padding: 0 }} />
          <Content style={{ margin: "24px 16px 0" }}>
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
