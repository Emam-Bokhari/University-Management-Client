import { Button, Form, Input } from "antd";
import { Fragment } from "react/jsx-runtime";
import { Controller, useForm } from "react-hook-form";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { useAppDispatch } from "../redux/hook";
import { setUser } from "../redux/features/auth/authSlice";
import { verifyToken } from "../utils/verifyToken";

export default function Login() {
  const dispatch = useAppDispatch();

  const { control, handleSubmit } = useForm({
    defaultValues: {
      id: "A-0000",
      password: "admin123",
    },
  });

  const [login, { error }] = useLoginMutation();

  const onSubmit = async (data) => {
    const userInfo = {
      id: data.id,
      password: data.password,
    };
    const res = await login(userInfo).unwrap();
    const user = verifyToken(res.data.accessToken);
    console.log(user);
    dispatch(setUser({ user: user, token: res.data.accessToken }));
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
