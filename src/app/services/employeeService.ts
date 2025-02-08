const BACKEND_URL = "http://localhost:5001/api"; // ✅ Update with your backend URL

// ✅ Fetch Employees by Service Center UID
export const getActiveEmployees = async (uid: string) => {
  try {
    const response = await fetch(`${BACKEND_URL}/employees?uid=${uid}`);

    console.log("Response Status:", response.status);
    console.log("Response Headers:", response.headers);

    const data = await response.json();
    console.log("✅ API Response Data:", data);

    if (!Array.isArray(data)) {
      throw new Error("Invalid response format. Expected an array.");
    }

    return data;
  } catch (error) {
    console.error("❌ Error fetching employees:", error);
    return [];
  }
};

// ✅ Add Employee
export const addEmployee = async (employeeData: any) => {
  try {
    const response = await fetch(`${BACKEND_URL}/employees`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(employeeData),
    });

    if (!response.ok) {
      throw new Error("Failed to add employee");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("❌ Error adding employee:", error);
    return { error: "Failed to add employee" };
  }
};
export const updateEmployeeByPersonalID = async (personalID: string, updatedData: any) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/employees/${personalID}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedData),
        });

        if (!response.ok) {
            throw new Error("Failed to update employee");
        }

        return await response.json();
    } catch (error) {
        console.error("Error updating employee:", error);
        throw error;
    }
};

export const archiveEmployeeByPersonalID = async (personalID: string) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/employees/archive/${personalID}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error("Failed to archive employee");
        }

        return await response.json();
    } catch (error) {
        console.error("❌ Error archiving employee:", error);
        throw error;
    }
};

export const getEmployeeByPersonalID = async (personalID: string) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/employees/${personalID}`);

        if (!response.ok) {
            throw new Error("Failed to fetch employee details");
        }

        return await response.json();
    } catch (error) {
        console.error("❌ Error fetching employee:", error);
        throw error;
    }
};
