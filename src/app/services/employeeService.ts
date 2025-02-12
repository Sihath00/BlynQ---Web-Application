const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5001/api";

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
export const updateEmployee = async (personalID: string, data: any) => {
  console.log("🔍 updateEmployee called with personalID:", personalID); // Debug Log

  if (!personalID || personalID === "undefined") {
    console.error("❌ Error: Cannot update employee - Invalid ID");
    return null;
  }

  try {
    const response = await fetch(`${BACKEND_URL}/employees/${personalID}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) throw new Error(`Failed to update employee: ${response.statusText}`);

    return await response.json();
  } catch (error) {
    console.error("❌ Error updating employee:", error);
  }
};


export const archiveEmployeeByPersonalID = async (personalID: string) => {
  if (!personalID) return console.error("❌ Invalid employee ID");

  try {
    const response = await fetch(`${BACKEND_URL}/employees/archive/${personalID}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) throw new Error("Failed to archive employee");

    return await response.json();
  } catch (error) {
    console.error("❌ Error archiving employee:", error);
    throw error;
  }
};

export const getEmployeeByPersonalID = async (personalID: string) => {
  if (!personalID || personalID === "undefined") {
      console.error("❌ Error: Invalid personal ID in request");
      return null;
  }

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api";

  try {
      console.log("🔍 Fetching Employee with ID:", personalID);

      const response = await fetch(`${API_URL}/employees/${personalID}`);

      if (!response.ok) {
          throw new Error(`Failed to fetch employee: ${response.statusText}`);
      }

      const data = await response.json();
      console.log("✅ Employee Data:", data);
      return data;
  } catch (error) {
      console.error("❌ Error fetching employee:", error);
      throw error;
  }
};
