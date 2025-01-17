/* eslint-disable @typescript-eslint/no-explicit-any */
import { FieldValues, SubmitHandler } from "react-hook-form";
import PHForm from "../../../components/form/PHForm";
import { Button, Col, Flex } from "antd";
import PHSelect from "../../../components/form/PHSelect";
import { semesterOptions } from "../../../constants/semester";
import { monthOptions } from "../../../constants/global";
import { zodResolver } from "@hookform/resolvers/zod";
import { academicSemesterSchema } from "../../../schemas/academicManagement.schema";
import { useAddAcademicSemesterMutation } from "../../../redux/features/academicManagementApi/academicManagement.api";
import { toast } from "sonner";
import { TResponse } from "../../../types/global";

const currentYear = new Date().getFullYear();

const yearOptions = [0, 1, 2, 3, 4, 5].map((item) => ({
  value: (currentYear + item).toString(),
  label: (currentYear + item).toString(),
}));

console.log(yearOptions);

export default function CreateAcademicSemester() {
  const [addAcademicSemester] = useAddAcademicSemesterMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    // toast
    const toastId = toast.loading("Creating academic semester...");

    const name = semesterOptions[Number(data?.name) - 1]?.label;

    const semesterData = {
      name: name,
      code: data?.name,
      year: data?.year,
      startMonth: data?.startMonth,
      endMonth: data?.endMonth,
    };

    try {
      const result = (await addAcademicSemester(semesterData)) as TResponse;
      if (result.error) {
        toast.error(result.error.data.message, { id: toastId });
      } else {
        toast.success("Semester is created successfully", { id: toastId });
      }
    } catch (err: any) {
      toast.error(err.message, { id: toastId });
    }
  };

  return (
    <Flex justify="center" align="center">
      <Col span={6}>
        <PHForm
          onSubmit={onSubmit}
          resolver={zodResolver(academicSemesterSchema)}
        >
          <PHSelect
            name="name"
            label="Semester Name"
            options={semesterOptions}
          />
          <PHSelect name="year" label="Semester Year" options={yearOptions} />
          <PHSelect
            name="startMonth"
            label="Start Month"
            options={monthOptions}
          />
          <PHSelect name="endMonth" label="End Month" options={monthOptions} />
          <Button type="primary" htmlType="submit">
            Create Academic Semester
          </Button>
        </PHForm>
      </Col>
    </Flex>
  );
}
