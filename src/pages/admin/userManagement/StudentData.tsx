import { Fragment } from "react/jsx-runtime";
import { Button, Pagination, Space, Table } from "antd";
import { useState } from "react";
import { TQueryParam } from "../../../types";
import { useGetAllStudentsQuery } from "../../../redux/features/admin/userManagement.api";
import { Link } from "react-router-dom";
export default function StudentData() {
  const [currentPage, setCurrentPage] = useState();

  const [params, setParams] = useState<TQueryParam[]>([]);

  const {
    data: studentData,
    // isLoading,
    isFetching,
  } = useGetAllStudentsQuery([
    { name: "page", value: currentPage },
    { name: "sort", value: "id" },
    ...params,
  ]);

  const tableData = studentData?.data?.map(
    ({ _id, name, id, email, contactNo }) => ({
      key: _id,
      firstName: name.firstName,
      lastName: name.lastName,
      id,
      email,
      contactNo,
    })
  );

  const metaData = studentData?.meta;

  const columns = [
    {
      title: "First Name",
      dataIndex: "firstName",
      key: "firstName",
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      key: "lastName",
    },
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Contact No.",
      dataIndex: "contactNo",
      key: "contactNo",
    },
    {
      title: "Action",
      dataIndex: "",
      key: "x",
      render: (item) => {
        return (
          <Space>
            <Link to={`/admin/student-data/${item.key}`}>
              <Button>Details</Button>
            </Link>
            <Button>Update</Button>
            <Button>Block</Button>
          </Space>
        );
      },
      width: "1%",
    },
  ];

  const onChange = (_pagination, filters, _sorter, extra) => {
    console.log("params", filters, extra);
    if (extra.action === "filter") {
      const queryParams: TQueryParam[] = [];

      filters.name?.forEach((item) =>
        queryParams?.push({ name: "name", value: item })
      );

      filters.year?.forEach((item) =>
        queryParams?.push({ name: "year", value: item })
      );

      setParams(queryParams);
    }
  };

  return (
    <Fragment>
      <Table
        columns={columns}
        dataSource={tableData}
        loading={isFetching}
        onChange={onChange}
        pagination={false}
        // showSorterTooltip={{ target: "sorter-icon" }}
      />
      <Pagination
        style={{ marginTop: "20px" }}
        align="end"
        current={currentPage}
        onChange={(page) => setCurrentPage(page)}
        pageSize={metaData?.limit}
        total={metaData?.total}
      />
    </Fragment>
  );
}
