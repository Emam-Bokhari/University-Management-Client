import PHForm from "../../../components/form/PHForm";
import PHInput from "../../../components/form/PHInput";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { Button, Col, Divider, Row } from "antd";
import PHSelect from "../../../components/form/PHSelect";
import { bloodGroupOptions } from "../../../constants/bloodGroups";
import { genderOptions } from "../../../constants/genders";

export default function CreateStudent() {
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
    // const formData = new FormData();
    // formData.append("firstName", "Moshfiqur Rahman");
    // console.log(formData.get("firstName"));
    // console.log(Object.fromEntries(formData));
    // formData.append("data", JSON.stringify(data));
    // console.log(Object.fromEntries(formData));
  };

  return (
    <Row>
      <Col span={24}>
        <PHForm onSubmit={onSubmit}>
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
              <PHInput type="text" name="dateOfBirth" label="dateOfBirth" />
            </Col>

            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHSelect
                name="bloogGroup"
                label="Blood Group"
                options={bloodGroupOptions}
              />
            </Col>
          </Row>
          {/* contact info */}

          <Button type="primary" htmlType="submit">
            Create Student
          </Button>
        </PHForm>
      </Col>
    </Row>
  );
}
