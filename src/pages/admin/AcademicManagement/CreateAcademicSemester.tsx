import { FieldValues, SubmitHandler } from "react-hook-form";
import PHForm from "../../../components/form/PHForm";
import { Button, Col, Flex } from "antd";
import PHSelect from "../../../components/form/PHSelect";
import { semesterOptions } from "../../../constants/semester";
import { monthOptions } from "../../../constants/global";
import { zodResolver } from "@hookform/resolvers/zod";
import { academicSemesterSchema } from "../../../schemas/academicManagement.schema";

const currentYear = new Date().getFullYear();

const yearOptions = [0, 1, 2, 3, 4, 5].map((item) => ({
  value: (currentYear + item).toString(),
  label: (currentYear + item).toString(),
}));

console.log(yearOptions);

export default function CreateAcademicSemester() {
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const name = semesterOptions[Number(data?.name) - 1]?.label;
    const semesterData = {
      name: name,
      code: data?.name,
      year: data?.year,
      startMonth: data?.startMonth,
      endMonth: data?.endMonth,
    };
    console.log(semesterData);
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
