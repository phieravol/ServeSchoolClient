"use client";
import MainMenu from "@/components/headers/MainMenu";
import SideBar from "@/components/navbars/SideBar";
import { Suspense, useEffect, useRef, useState } from "react";
import TableServe from "@/components/tables/TableServe";
import MainFooter from "@/components/footers/MainFooter";
import SchoolService from "@/utils/services/schoolService";
import ModalServe from "@/components/modals/ModalServe";
import { Button, FormInstance, message } from "antd";
import { formatDate, toSimplifyDate } from "@/helpers/dateHelper";
import moment from "moment";

export default function SchoolPage() {
  const [schools, setSchools] = useState<School[]>([]);
  const [selectedSchool, setSelectedSchool] = useState<School | undefined>();
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    const fetchSchools = async () => {
      try {
        const schools = await SchoolService.getAllSchools();
        schools.map((item, index) => {
          item.order = index + 1;
          item.foundingDate = toSimplifyDate(item.foundingDate);
        });
        schools;
        setSchools(schools);
      } catch (error) {
        console.error("Error fetching schools:", error);
      }
    };

    fetchSchools();
  }, []);

  const handleEdit = (school: School) => {
    setSelectedSchool(school);
    setIsModalVisible(true);
  };

  const handleCreate = () => {
    setSelectedSchool(undefined);
    setIsModalVisible(true);
  };

  const handleDelete = (school: School) => {
    // Perform delete operation, then update schools state
    setSchools((prevSchools) => prevSchools.filter((s) => s.id !== school.id));
  };

  const handleSave = async (school: School) => {
    if (selectedSchool) {
      // Update existing school
      setSchools((prevSchools) =>
        prevSchools.map((s) =>
          s.id === selectedSchool.id ? { ...s, ...school } : s
        )
      );
    } else {
      try {
        school.foundingDate = moment(
          school.foundingDate,
          "DD-MM-YYYY"
        ).toISOString();

        const response = await fetch(
          "http://localhost:5261/api/Schools/CreateSchools",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(school),
          }
        );

        if (response.ok) {
          var data = await response.json();
          console.log(data);

          message.success(`Create school successfully!`, 3);
        } else {
          message.error(response.text(), 3);
        }
      } catch (error) {
        message.error("Error creating school:", 3);
      }
      // Add new school
      setSchools((prevSchools) => [
        ...prevSchools,
        { ...school, order: prevSchools.length + 1 },
      ]);
    }
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setSelectedSchool(undefined);
    setIsModalVisible(false);
  };

  return (
    <div id="container">
      <header id="header" className="border border-solid border-[#ccc]">
        <MainMenu />
      </header>

      <main id="main" className="flex flex-row justify-start gap-4">
        <nav id="nav-bar">
          <SideBar />
        </nav>
        <div id="main-content" className="w-full">
          <h1 className="text-[x-large] text-center font-medium p-4">
            School Table Listing.
          </h1>
          <Button
            onClick={handleCreate}
            className="btn btn-primary relative inline"
            size="large"
          >
            <h2 className="align-middle">Create School</h2>
          </Button>
          <ModalServe
            visible={isModalVisible}
            school={selectedSchool}
            onCancel={handleCancel}
            onSave={handleSave}
          />
          <TableServe
            schools={schools}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      </main>

      <footer id="footer">
        <MainFooter />
      </footer>
    </div>
  );
}
