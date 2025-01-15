import { Input } from "antd";
import { Controller, useFormContext } from "react-hook-form";

type TInputProps = {
  type: string;
  name: string;
  label?: string;
};

export default function PHInput({ type, name, label }: TInputProps) {
  const { control } = useFormContext();

  return (
    <div style={{ marginBottom: "12px" }}>
      {label ? label : null}
      <Controller
        control={control}
        name={name}
        render={({ field }) => <Input {...field} type={type} id={name} />}
      />
    </div>
  );
}
