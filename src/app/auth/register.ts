import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const { username, phoneNumber, email, password } = req.body;

    // Send request to your existing backend
    const response = await axios.post("http://localhost:5001/api/register", {
      username,
      phoneNumber,
      email,
      password,
    });

    res.status(200).json(response.data);
  } catch (error: any) {
    res.status(error.response?.status || 500).json({ message: error.response?.data || "Registration failed" });
  }
}
