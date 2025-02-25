/* eslint-disable @typescript-eslint/no-explicit-any */
import { FieldValues, SubmitHandler } from "react-hook-form";
import PHForm from "../../../components/form/PHForm";
import { Button, Col, Flex } from "antd";
import PHSelect from "../../../components/form/PHSelect";
import { useGetAllSemestersQuery } from "../../../redux/features/admin/academicManagement.api";
import PHDatePicker from "../../../components/form/PHDatePicker";
import PHInput from "../../../components/form/PHInput";
import { useAddRegisteredSemesterMutation } from "../../../redux/features/admin/courseManagement.api";
import { toast } from "sonner";

export default function SemesterRegistration() {
  const { data: academicSemester } = useGetAllSemestersQuery([
    { name: "sort", value: "year" },
  ]);

  const [addSemester] = useAddRegisteredSemesterMutation();

  const status = ["UPCOMING", "ONGOING", "ENDED"];

  const statusOptions = status.map((item) => ({
    value: item,
    label: item,
  }));

  const academicSemesterOptions = academicSemester?.data?.map((item) => ({
    value: item._id,
    label: `${item.name} ${item.year}`,
  }));

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Creating semester registration...");
    const semesterData = {
      ...data,
      minCredit: Number(data?.minCredit),
      maxCredit: Number(data?.maxCredit),
    };
    console.log(semesterData);

    try {
      const result = await addSemester(semesterData);
      if (result.error) {
        toast.error(result?.error?.data?.message, { id: toastId });
      } else {
        toast.success("Semester registered successfully", { id: toastId });
      }
    } catch (err) {
      toast.error("Something went wrong", { id: toastId });
    }
  };

  return (
    <Flex justify="center" align="center">
      <Col span={6}>
        <PHForm onSubmit={onSubmit}>
          <PHSelect
            name="academicSemester"
            label="Semester Name"
            options={academicSemesterOptions}
          />
          <PHSelect name="status" label="Status" options={statusOptions} />
          <PHDatePicker name="startDate" label="Start Date" />
          <PHDatePicker name="endDate" label="End Date" />

          <PHInput name="minCredit" label="Min Credit" type="text" />
          <PHInput name="maxCredit" label="Max Credit" type="text" />

          <Button type="primary" htmlType="submit">
            Create Academic Semester
          </Button>
        </PHForm>
      </Col>
    </Flex>
  );
}
