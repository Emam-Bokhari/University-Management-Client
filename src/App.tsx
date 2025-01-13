import { Fragment } from "react";
import MainLayout from "./components/layout/MainLayout";
import ProtectedRoute from "./components/layout/ProtectedRoute";

export default function App() {
  return (
    <Fragment>
      <ProtectedRoute>
        <MainLayout />
      </ProtectedRoute>
    </Fragment>
  );
}
