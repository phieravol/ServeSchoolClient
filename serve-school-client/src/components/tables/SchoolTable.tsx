"use client";
import React, { Suspense, useEffect, useState } from "react";
import { Button, Table } from "antd";
import type { TableColumnsType, TableProps } from "antd";
import Loading from "@/app/loading";
import SchoolService from "@/utils/services/schoolService";
import { formatDate, toSimplifyDate } from "@/helpers/dateHelper";
import SchoolModal from "../modals/SchoolModal";

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
    render: (foundingDate) => (foundingDate ? formatDate(foundingDate) : "N/A"),
    sorter: (a, b) => Date.parse(a.foundingDate) - Date.parse(b.foundingDate),
    sortDirections: ["descend"],
  },
];

const SchoolTable: React.FC = () => {
  const [schools, setSchools] = useState<School[]>([]);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [schoolData, setSchoolData] = useState<School>();

  const handleSave = (schoolData: School) => {
    // Update schools state with the new school data
    schoolData.order = schools.length;
    setSchools([...schools, schoolData]);
    setIsModalVisible(false);
  };

  const handleRowClick = (record: School) => {
    setSchoolData(record);
    setIsModalVisible(true);
  };

  console.log(`school selected: ${JSON.stringify(schoolData)}`);

  const handleShow = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    const fetchSchools = async () => {
      try {
        const schools = await SchoolService.getAllSchools();
        schools.map((item, index) => (item.order = index + 1));
        setSchools(schools);
      } catch (error) {
        console.error("Error fetching schools:", error);
      }
    };

    fetchSchools();
  }, []);

  return (
    <Suspense fallback={<Loading />}>
      <SchoolModal
        onSave={handleSave}
        visible={isModalVisible}
        onCancel={handleCancel}
        onShow={handleShow}
        school={schoolData}
      />

      <Table
        columns={columns}
        dataSource={schools}
        onRow={(record) => ({
          onClick: () => handleRowClick(record),
          style: { cursor: "pointer" },
          title: "Click row to view detail",
        })}
        pagination={{
          pageSizeOptions: ["5", "10", "20"],
          showSizeChanger: true,
          defaultPageSize: 5,
          defaultCurrent: 1,
        }}
        rowKey="id"
      />
    </Suspense>
  );
};

export default SchoolTable;
