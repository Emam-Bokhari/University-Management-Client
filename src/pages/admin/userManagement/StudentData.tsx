import { Fragment } from "react/jsx-runtime";
import { Button, Dropdown, Menu, Pagination, Space, Table } from "antd";
import { useState } from "react";
import { TQueryParam } from "../../../types";
import { useGetAllStudentsQuery } from "../../../redux/features/admin/userManagement.api";
import { BlockOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";

export default function StudentData() {
  const [currentPage, setCurrentPage] = useState(10);

  const [params, setParams] = useState<TQueryParam[]>([]);

  const {
    data: studentData,
    // isLoading,
    isFetching,
  } = useGetAllStudentsQuery([
    { name: "limit", value: 3 },
    { name: "page", value: currentPage },
    { name: "sort", value: "id" },
    ...params,
  ]);

  const tableData = studentData?.data?.map(({ _id, name, id }) => ({
    key: _id,
    firstName: name.firstName,
    lastName: name.lastName,
    id,
  }));

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
      title: "Action",
      dataIndex: "",
      key: "x",
      render: () => (
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item
                key="1"
                icon={<EditOutlined />}
                style={{ padding: "10px 20px" }}
              >
                Update
              </Menu.Item>
              <Menu.Item
                key="2"
                icon={<DeleteOutlined />}
                style={{ padding: "10px 20px" }}
              >
                Delete
              </Menu.Item>
              <Menu.Item
                key="3"
                icon={<BlockOutlined />}
                style={{ padding: "10px 20px" }}
              >
                Block
              </Menu.Item>
            </Menu>
          }
          trigger={["click"]}
        >
          <Button>Actions</Button>
        </Dropdown>
      ),
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
