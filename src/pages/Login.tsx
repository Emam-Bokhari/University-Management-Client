/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Row } from "antd";
import { Fragment } from "react/jsx-runtime";
import { FieldValues } from "react-hook-form";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { useAppDispatch } from "../redux/hook";
import { setUser, TUser } from "../redux/features/auth/authSlice";
import { verifyToken } from "../utils/verifyToken";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import PHForm from "../components/form/PHForm";
import PHInput from "../components/form/PHInput";

export default function Login() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [login] = useLoginMutation();

  const defaultValues = {
    id: "A-0001",
    password: "admin123",
  };

  const onSubmit = async (data: FieldValues) => {
    console.log(data);
    const toastId = toast.loading("Logging in");
    try {
      const userInfo = {
        id: data.id,
        password: data.password,
      };
      const res = await login(userInfo).unwrap();
      const user = verifyToken(res.data.accessToken) as TUser;
      dispatch(setUser({ user: user, token: res.data.accessToken }));
      toast.success("Logged in", { id: toastId, duration: 2000 });
      navigate(`/${user?.role}/dashboard`);
    } catch (err: any) {
      toast.error(err.message || "Something went wrong!", {
        id: toastId,
        duration: 2000,
      });
    }
  };

  return (
    <Fragment>
      <Row justify="center" align="middle" style={{ height: "100vh" }}>
        <PHForm onSubmit={onSubmit} defaultValues={defaultValues}>
          <PHInput type="text" name="id" label="ID" />

          <PHInput type="password" name="password" label="Password" />

          <Button htmlType="submit">Login</Button>
        </PHForm>
      </Row>
    </Fragment>
  );
}
