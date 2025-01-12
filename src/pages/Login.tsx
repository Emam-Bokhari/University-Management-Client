import { Button, Form, Input } from "antd";
import { Fragment } from "react/jsx-runtime";
import { Controller, useForm } from "react-hook-form";
import { useLoginMutation } from "../redux/features/auth/authApi";

export default function Login() {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      id: "A-0000",
      password: "admin123",
    },
  });
  const [login, { data, error }] = useLoginMutation();

  const onSubmit = (data) => {
    console.log(data);
    const userInfo = {
      id: data.id,
      password: data.password,
    };
    login(userInfo);
    console.log(userInfo);
  };
  console.log(data);

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
