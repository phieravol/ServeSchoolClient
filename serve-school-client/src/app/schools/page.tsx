"use client";
import MainMenu from "@/components/headers/MainMenu";
import SideBar from "@/components/navbars/SideBar";
import { useEffect, useState } from "react";
import TableServe from "@/components/tables/TableServe";
import MainFooter from "@/components/footers/MainFooter";
import SchoolService from "@/utils/services/schoolService";
import ModalServe from "@/components/modals/ModalServe";
import { Button, Modal, message } from "antd";
import moment from "moment";

export default function SchoolPage() {
  const [schools, setSchools] = useState<School[]>([]);
  const [selectedSchool, setSelectedSchool] = useState<School | undefined>();
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    const fetchSchools = async () => {
      const schools = await SchoolService.getAllSchools();
      schools.map((item, index) => {
        item.order = index + 1;
        item.foundingDate = moment(item.foundingDate).format("yyyy-MM-DD");
      });
      schools;
      setSchools(schools);
    };

    fetchSchools();
  }, []);

  const handleEdit = (school: School) => {
    school.foundingDate = moment(school.foundingDate).format("yyyy-MM-DD");
    setSelectedSchool(school);
    setIsModalVisible(true);
  };

  const handleCreate = () => {
    setSelectedSchool(undefined);
    setIsModalVisible(true);
  };

  const handleDelete = async (school: School) => {
    const config = {
      title: "Confirm Delete",
      content: `Are you sure you want to delete "${school.name}"?`,
      onOk: async () => {
        var response = await SchoolService.deleteSchool(school);
        if (response) {
          message.success(response, 3);
          // Perform delete operation, then update schools state
          setSchools((prevSchools) =>
            prevSchools.filter((s) => s.id !== school.id)
          );
        } else {
          message.error("Failed to delete school", 3);
        }
      },
    };

    Modal.confirm(config);
  };

  const handleSave = async (school: School) => {
    if (selectedSchool) {
      const response = await SchoolService.updateSchool(school);
      if (response) {
        message.success(response, 3);
        // Update existing school
        setSchools((prevSchools) =>
          prevSchools.map((s) =>
            s.id === selectedSchool.id ? { ...s, ...school } : s
          )
        );
      }
    } else {
      // Add new school
      const response = await SchoolService.createSchool(school);
      if (response) {
        school.foundingDate = moment(school.foundingDate).format("MM/DD/YYYY");
        message.success("create school successfully!");
        // Add new school
        setSchools((prevSchools) => [
          ...prevSchools,
          { ...school, order: prevSchools.length + 1, id: response.id },
        ]);
      }
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
