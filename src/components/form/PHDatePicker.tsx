import { DatePicker, Form } from "antd";
import { Controller, useFormContext } from "react-hook-form";
import { Fragment } from "react/jsx-runtime";

type TDatePickerProps = {
  name: string;
  label?: string;
};

export default function PHDatePicker({ name, label }: TDatePickerProps) {
  const { control } = useFormContext();
  return (
    <Fragment>
      <Controller
        name={name}
        control={control}
        render={(field) => (
          <Form.Item label={label}>
            <DatePicker
              id={name}
              {...field}
              size="large"
              style={{ width: "100%" }}
            />
          </Form.Item>
        )}
      />
    </Fragment>
  );
}
