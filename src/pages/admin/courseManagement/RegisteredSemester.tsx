import { Fragment } from "react/jsx-runtime";
import { Button, Dropdown, Table, TableColumnsType, Tag } from "antd";
import { TAcademicSemester } from "../../../types/academicManagement.type";
import {
  useGetAllRegisteredSemestersQuery,
  useUpdateRegisteredSemesterMutation,
} from "../../../redux/features/admin/courseManagement.api";
import moment from "moment-timezone";
import { useState } from "react";

type TTableData = Pick<
  TAcademicSemester,
  "name" | "year" | "startMonth" | "endMonth"
>;

const items = [
  { label: "UPCOMING", key: "UPCOMING" },
  { label: "ONGOING", key: "ONGOING" },
  { label: "ENDED", key: "ENDED" },
];

export default function RegisteredSemester() {
  const [semesterId, setSemesterId] = useState("");

  const {
    data: semesterData,
    // isLoading,
    isFetching,
  } = useGetAllRegisteredSemestersQuery(undefined);

  const [updateSemesterStatus] = useUpdateRegisteredSemesterMutation();

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ENDED":
        return "red";
      case "UPCOMING":
        return "orange";
      case "ONGOING":
        return "blue";
      default:
        return "default";
    }
  };

  function handleStatusChange(data) {
    console.log(data);
    const updateStatusChange = {
      id: semesterId,
      data: {
        status: data.key,
      },
    };
    updateSemesterStatus(updateStatusChange);
  }

  const menuProps = {
    items,
    onClick: handleStatusChange,
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
      render: (item) => (
        <Dropdown menu={menuProps} trigger={["click"]}>
          <Button onClick={() => setSemesterId(item.key)}>Update</Button>
        </Dropdown>
      ),
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
