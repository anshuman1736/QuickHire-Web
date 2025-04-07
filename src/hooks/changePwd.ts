import { BACKEND_URL } from "@/lib/config"
import axios from "axios"

const SendOTP = async (email: string) => {
  try {
    const response = await axios.post(`${BACKEND_URL}/auth/send-otp?email=${email}`, {});
    return response.data;
  } catch (error) {
    console.error("Error sending OTP:", error);
    throw error;
  }
}

const VerifyOTP = async (email: string, otp: string) => {
  try {
    const response = await axios.post(`${BACKEND_URL}/auth/validate-otp?email=${email}&otp=${otp}`, {});
    return response.data;
  } catch (error) {
    console.error("Error validating OTP:", error);
    throw error;
  }
}

const ChangePwd = async (email: string, password: string) => {
  try {
    const response = await axios.put(`${BACKEND_URL}/auth/changePassword?email=${email}&password=${password}`, {});
    return response.data;
  } catch (error) {
    console.error("Error changing password:", error);
    throw error;
  }
}

export { SendOTP, VerifyOTP, ChangePwd };