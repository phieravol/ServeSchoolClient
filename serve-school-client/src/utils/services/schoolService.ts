import moment from "moment";

interface SchoolService {
  getAllSchools: () => Promise<Array<School>>;
  createSchool: (school: School) => Promise<School | undefined>;
  updateSchool: (school: School) => Promise<String | undefined>;
  deleteSchool: (school: School) => Promise<String | undefined>;
}

const SchoolService: SchoolService = {
  getAllSchools: async (): Promise<Array<School>> => {
    try {
      const url = `http://localhost:5261/api/Schools/GetAllSchools`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching schools:", error);
      return [];
    }
  },
  createSchool: async (school: School): Promise<School | undefined> => {
    school.foundingDate = moment(
      school.foundingDate,
      "DD-MM-YYYY"
    ).toISOString();
    const url = "http://localhost:5261/api/Schools/CreateSchools";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(school),
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    }
    return undefined;
  },
  updateSchool: async (school: School): Promise<String | undefined> => {
    school.foundingDate = moment(
      school.foundingDate,
      "DD-MM-YYYY"
    ).toISOString();
    const url = "http://localhost:5261/api/Schools/UpdateSchool";
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(school),
    });
    if (response.ok) {
      return response.text();
    }
    return undefined;
  },
  deleteSchool: async (school: School): Promise<String | undefined> => {
    try {
      const url = `http://localhost:5261/api/Schools/RemoveSchool?Id=${school.id}`;
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(school),
      });

      if (response.ok) {
        return response.text();
      }
      return undefined;
    } catch (error) {
      return undefined;
    }
  },
};

export default SchoolService;
