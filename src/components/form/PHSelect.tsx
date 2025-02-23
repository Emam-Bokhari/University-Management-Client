import { Form, Select } from "antd";
import { Controller, useFormContext } from "react-hook-form";

type TPHSelectProps = {
  label: string;
  name: string;
  options: { value: string; label: string; disabled?: boolean }[] | undefined;
  mode?: "multiple" | undefined;
};

export default function PHSelect({
  label,
  name,
  options,
  mode,
}: TPHSelectProps) {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <Form.Item label={label}>
          <Select
            mode={mode}
            {...field}
            defaultValue={"None"}
            style={{ width: "100%" }}
            size="large"
            options={options}
          />
          {error && <small style={{ color: "red" }}>{error?.message}</small>}
        </Form.Item>
      )}
    />
  );
}
