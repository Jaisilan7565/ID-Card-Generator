import { BASE_URL } from "../utils/url";
import axios from "axios";

export const createCardAPI = async (cardInfo) => {
  try {
    const response = await axios.post(`${BASE_URL}/id-card/register`, cardInfo);
    return response.data;
  } catch (error) {
    console.error("Error creating ID Card:", error);
    throw error;
  }
};

export const getIDCards = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/id-card/all`);
    return response.data;
  } catch (error) {
    console.error("Error fetching ID Cards:", error);
    throw error;
  }
};
