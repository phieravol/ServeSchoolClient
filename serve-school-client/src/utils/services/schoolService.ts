interface SchoolService {
    getAllService: () => Promise<Array<School>>;
}

const SchoolService: SchoolService = {
    getAllService: async (): Promise<Array<School>> => {
        try {
            const url = "http://localhost:5261/api/Schools/GetAllSchools";
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error ${response.status}`);
            }
            const data = await response.json();
            
            return data;
        } catch (error) {
            console.error('Error fetching schools:', error);
            return [];
        }
    },
};

export default SchoolService;