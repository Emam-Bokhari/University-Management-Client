/* eslint-disable @typescript-eslint/no-explicit-any */
import { FieldValues, SubmitHandler } from "react-hook-form";
import PHForm from "../../../components/form/PHForm";
import { Button, Col, Flex } from "antd";
import PHInput from "../../../components/form/PHInput";
import { toast } from "sonner";
import { useGetAllCoursesQuery } from "../../../redux/features/admin/courseManagement.api";
import PHSelect from "../../../components/form/PHSelect";

export default function CreateCourse() {
  const { data: courses } = useGetAllCoursesQuery(undefined);
  console.log(courses);

  const preRequisiteCoursesOptions = courses?.data?.map((item) => ({
    value: item._id,
    label: item.title,
  }));
  console.log(preRequisiteCoursesOptions);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    // const toastId = toast.loading("Creating semester registration...");
    const courseData = {
      ...data,
      preRequisiteCourses: data?.preRequisiteCourses.map((item) => ({
        course: item,
        isDeleted: false,
      })),
    };
    console.log(courseData);
  };

  return (
    <Flex justify="center" align="center">
      <Col span={6}>
        <PHForm onSubmit={onSubmit}>
          <PHInput name="title" label="Title" type="text" />
          <PHInput name="prefix" label="Prefix" type="text" />
          <PHInput name="code" label="Code" type="text" />
          <PHInput name="credits" label="Credits" type="text" />
          <PHInput name="maxCredit" label="Max Credit" type="text" />
          <PHSelect
            name="preRequisiteCourses"
            label="Prerequisite Courses"
            options={preRequisiteCoursesOptions}
            mode="multiple"
          />

          <Button type="primary" htmlType="submit">
            Create Academic Semester
          </Button>
        </PHForm>
      </Col>
    </Flex>
  );
}
