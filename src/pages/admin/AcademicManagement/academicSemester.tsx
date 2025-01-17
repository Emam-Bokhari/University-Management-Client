import { Fragment } from "react/jsx-runtime";
import { useGetAllSemestersQuery } from "../../../redux/features/academicManagementApi/academicManagement.api";
import { Table, TableColumnsType } from "antd";

interface DataType {
  key: React.Key;
  name: string;
  age: number;
  address: string;
}

export default function AcademicSemester() {
  const { data: semesterData, isLoading } = useGetAllSemestersQuery(undefined);
  console.log(semesterData);

  const tableData = semesterData?.data.map(
    ({ _id, name, year, startMonth, endMonth }) => ({
      _id,
      name,
      year,
      startMonth,
      endMonth,
    })
  );

  const columns: TableColumnsType<DataType> = [
    {
      title: "Semester Name",
      dataIndex: "name",
    },
    {
      title: "Year",
      dataIndex: "year",
    },
    {
      title: "Start Month",
      dataIndex: "startMonth",
    },
    {
      title: "End Month",
      dataIndex: "endMonth",
    },
  ];

  return (
    <Fragment>
      <Table<DataType>
        columns={columns}
        dataSource={tableData}
        loading={isLoading}
        showSorterTooltip={{ target: "sorter-icon" }}
      />
    </Fragment>
  );
}
