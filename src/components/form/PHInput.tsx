import { Form, Input } from "antd";
import { Controller, useFormContext } from "react-hook-form";

type TInputProps = {
  type: string;
  name: string;
  label?: string;
};

export default function PHInput({ type, name, label }: TInputProps) {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <Form.Item label={label}>
          <Input size="large" {...field} type={type} id={name} />
        </Form.Item>
      )}
    />
  );
}
