import { Fragment } from "react/jsx-runtime";
import { useGetAllSemestersQuery } from "../../../redux/features/academicSemester/AcademicSemesterApi";

export default function AcademicSemester() {
  const { data } = useGetAllSemestersQuery(undefined);
  console.log(data);
  return (
    <Fragment>
      <p>Academic Semester component</p>
    </Fragment>
  );
}
