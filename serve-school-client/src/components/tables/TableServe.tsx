import Loading from "@/app/loading";
import { Button, Table, TableColumnsType } from "antd";
import moment from "moment";
import { Suspense } from "react";

interface Props {
  schools: School[];
  onEdit: (school: School) => void;
  onDelete: (school: School) => void;
}

const TableServe: React.FC<Props> = ({ schools, onEdit, onDelete }) => {
  const columns: TableColumnsType<School> = [
    {
      key: "order",
      title: "Order",
      dataIndex: "order",
      sorter: (a, b) => a.id - b.id,
      sortDirections: ["descend"],
    },
    {
      key: "name",
      title: "Name",
      dataIndex: "name",
    },
    {
      key: "foundingDate",
      title: "Founding Date",
      dataIndex: "foundingDate",
      render: (foundingDate) =>
        foundingDate ? moment(foundingDate).format("DD/MM/YYYY") : "N/A",
      sorter: (a, b) => Date.parse(a.foundingDate) - Date.parse(b.foundingDate),
      sortDirections: ["descend"],
    },
    {
      title: "Actions",
      key: "actions",
      render: (record: School) => (
        <>
          <Button onClick={() => onEdit(record)}>Edit</Button>
          <Button onClick={() => onDelete(record)}>Delete</Button>
        </>
      ),
    },
  ];
  return (
    <Suspense fallback={<Loading />}>
      <Table
        columns={columns}
        dataSource={schools}
        pagination={{
          pageSizeOptions: ["5", "10", "20"],
          showSizeChanger: true,
          defaultPageSize: 10,
          defaultCurrent: 1,
        }}
        rowKey="id"
      />
    </Suspense>
  );
};

export default TableServe;
