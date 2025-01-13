/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Form, Input } from "antd";
import { Fragment } from "react/jsx-runtime";
import { Controller, useForm } from "react-hook-form";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { useAppDispatch } from "../redux/hook";
import { setUser, TUser } from "../redux/features/auth/authSlice";
import { verifyToken } from "../utils/verifyToken";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function Login() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { control, handleSubmit } = useForm({
    defaultValues: {
      id: "A-0000",
      password: "admin123",
    },
  });

  const [login, { error }] = useLoginMutation();

  const onSubmit = async (data) => {
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
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "15%",
        }}
      >
        <Form
          onFinish={handleSubmit(onSubmit)}
          labelCol={{ span: 5 }}
          style={{ minWidth: 400, maxWidth: 600 }}
        >
          <Form.Item label="Id" name="id">
            <Controller
              name="id"
              control={control}
              render={(field) => <Input {...field} defaultValue="A-0000" />}
            />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <Input.Password {...field} defaultValue="admin123" />
              )}
            />
          </Form.Item>
          <Form.Item label={null}>
            <Button type="primary" htmlType="submit">
              Login
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Fragment>
  );
}
