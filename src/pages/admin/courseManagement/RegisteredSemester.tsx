import { Fragment } from "react/jsx-runtime";
import { Table, TableColumnsType, Tag } from "antd";
import { TAcademicSemester } from "../../../types/academicManagement.type";
import { useGetAllRegisteredSemestersQuery } from "../../../redux/features/admin/courseManagement.api";
import moment from "moment-timezone";

type TTableData = Pick<
  TAcademicSemester,
  "name" | "year" | "startMonth" | "endMonth"
>;

export default function RegisteredSemester() {
  const {
    data: semesterData,
    // isLoading,
    isFetching,
  } = useGetAllRegisteredSemestersQuery(undefined);
  console.log(semesterData);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ENDED":
        return "red";
      case "UPCOMING":
        return "orange";
      case "GOING":
        return "blue";
      default:
        return "default";
    }
  };

  const tableData = semesterData?.data?.map(
    ({ _id, academicSemester, status, startDate, endDate }) => ({
      key: _id,
      academicSemester: `${academicSemester.name} ${academicSemester.year}`,
      status,
      startDate: moment.tz(startDate, "Asia/Dhaka").format("MMMM"),
      endDate: moment.tz(endDate, "Asia/Dhaka").format("MMMM"),
    })
  );

  const columns: TableColumnsType<TTableData> = [
    {
      title: "Academic Semester Name",
      dataIndex: "academicSemester",
      key: "academicSemester",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <Tag color={getStatusColor(status)}>{status}</Tag>
      ),
    },
    {
      title: "Start Date",
      dataIndex: "startDate",
      key: "startDate",
    },
    {
      title: "End Date",
      dataIndex: "endDate",
      key: "endDate",
    },
    {
      title: "Action",
      dataIndex: "",
      key: "x",
      render: () => <a>Update</a>,
    },
  ];

  return (
    <Fragment>
      <Table<TTableData>
        columns={columns}
        dataSource={tableData}
        loading={isFetching}
      />
    </Fragment>
  );
}
