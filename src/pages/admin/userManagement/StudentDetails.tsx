import { useParams } from "react-router-dom";
import { Fragment } from "react/jsx-runtime";

export default function StudentDetails() {
  const params = useParams();
  console.log(params);
  const studentId = params.studentId;
  console.log(studentId);
  return (
    <Fragment>
      <p>Student details component</p>
    </Fragment>
  );
}
