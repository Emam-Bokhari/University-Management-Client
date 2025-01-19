import PHForm from "../../../components/form/PHForm";
import PHInput from "../../../components/form/PHInput";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { Button, Col, Divider, Row } from "antd";
import PHSelect from "../../../components/form/PHSelect";
import { bloodGroupsOptions, genderOptions } from "../../../constants/global";
import PHDatePicker from "../../../components/form/PHDatePicker";
import {
  useGetAllAcademicDepartmentQuery,
  useGetAllSemestersQuery,
} from "../../../redux/features/admin/academicManagement.api";
import { useAddStudentMutation } from "../../../redux/features/admin/userManagement.api";
import { toast } from "sonner";

const defaultValues = {
  // admissionSemester: "67700b08bfb7def342b12521",
  // academicDepartment: "67700a13bfb7def342b1251b",
  name: {
    firstName: "Moshfiqur",
    middleName: "Rahman",
    lastName: "Bhuiya",
  },
  gender: "male",
  dateOfBirth: "1998-09-25",
  email: "moshfiq@gmail.com",
  contactNo: "01710347574",
  emergencyContactNo: "01710347571",
  bloogGroup: "O+",
  presentAddress: "987 Pine Avenue, Citystate",
  permanentAddress: "654 Maple Drive, Townland",
  guardian: {
    fatherName: "Robert Johnson",
    fatherOccupation: "Architect",
    fatherContactNo: "01710347570",
    motherName: "Linda Johnson",
    motherOccupation: "Nurse",
    motherContactNo: "01710347573",
  },
  localGuardian: {
    name: "Sarah Taylor",
    occupation: "Lawyer",
    contactNo: "01710347574",
    address: "321 Birch Street, Suburbia",
  },
  isActive: "active",
};
export default function CreateStudent() {
  const [addStudent, { data, error }] = useAddStudentMutation();
  console.log(data, error);

  const { data: semesterData, isLoading: IsSemesterLoading } =
    useGetAllSemestersQuery(undefined);

  const { data: departmentData } = useGetAllAcademicDepartmentQuery(undefined, {
    skip: IsSemesterLoading,
  });

  const departmentOptions = departmentData?.data?.map((item) => ({
    value: item._id,
    label: item.name,
  }));

  const semesterOptions = semesterData?.data?.map((item) => ({
    value: item._id,
    label: `${item.name} ${item.year}`,
  }));

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const toastId = toast.loading("Creating student...");
    const studentData = {
      password: "student123",
      student: data,
    };
    console.log(studentData);
    const formData = new FormData();
    formData.append("data", JSON.stringify(studentData));
    addStudent(formData);
    toast.success("Student is created successfully", { id: toastId });
    // formData.append("firstName", "Moshfiqur Rahman");
    // console.log(formData.get("firstName"));
    // console.log(Object.fromEntries(formData));
    // formData.append("data", JSON.stringify(data));
    // console.log(Object.fromEntries(formData));
  };

  return (
    <Row>
      <Col span={24}>
        <PHForm onSubmit={onSubmit} defaultValues={defaultValues}>
          {/* personal info */}
          <Divider>Personal Info.</Divider>
          <Row gutter={10}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput type="text" name="name.firstName" label="First Name" />
            </Col>

            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput type="text" name="name.middleName" label="Middle Name" />
            </Col>

            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput type="text" name="name.lastName" label="Last Name" />
            </Col>

            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHSelect name="gender" label="Gender" options={genderOptions} />
            </Col>

            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHDatePicker label="Date Of Birth" name="dateOfBirth" />
            </Col>

            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHSelect
                name="bloogGroup"
                label="Blood Group"
                options={bloodGroupsOptions}
              />
            </Col>
          </Row>
          {/* contact info */}
          <Divider>Contact Info.</Divider>
          <Row gutter={10}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput type="text" name="email" label="Email" />
            </Col>

            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput type="text" name="contactNo" label="Contact No" />
            </Col>

            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="emergencyContactNo"
                label="Emergency Contact No"
              />
            </Col>

            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="presentAddress"
                label="Present Address"
              />
            </Col>

            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="permanentAddress"
                label="Permanent Address"
              />
            </Col>
          </Row>

          {/* guardian info */}
          <Divider>Guardian Info.</Divider>
          <Row gutter={10}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="guardian.fatherName"
                label="Father Name"
              />
            </Col>

            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="guardian.fatherOccupation"
                label="Father Occupation"
              />
            </Col>

            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="guardian.fatherContactNo"
                label="Father Contact No"
              />
            </Col>

            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="guardian.motherName"
                label="Mother Name"
              />
            </Col>

            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="guardian.motherOccupation"
                label="Mother Occupation"
              />
            </Col>

            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="guardian.motherContactNo"
                label="Mother Contact No"
              />
            </Col>
          </Row>

          {/* local guardian */}
          <Divider>Local Guardian Info.</Divider>
          <Row gutter={10}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput type="text" name="localGuardian.name" label="Name" />
            </Col>

            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="localGuardian.occupation"
                label="occupation"
              />
            </Col>

            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="localGuardian.contactNo"
                label="Contact No"
              />
            </Col>

            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="localGuardian.address"
                label="Address"
              />
            </Col>
          </Row>

          {/* academic info */}
          <Divider>Academic Info.</Divider>
          <Row gutter={10}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHSelect
                name="admissionSemester"
                label="Academic Semester"
                options={semesterOptions}
              />
            </Col>

            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHSelect
                name="academicDepartment"
                label="Academic Department"
                options={departmentOptions}
              />
            </Col>
          </Row>

          <Button type="primary" htmlType="submit">
            Create Student
          </Button>
        </PHForm>
      </Col>
    </Row>
  );
}
