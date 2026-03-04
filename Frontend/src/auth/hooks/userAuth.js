import { useContext } from "react";
import { AuthContext } from "../auth.context";
import { registerUser, loginUser, registerPartner, loginPartner } from "../services/user.api";
import { toast } from "react-toastify";

export const useAuth = () => {
  const context = useContext(AuthContext);

  const { user, setUser, loading, setLoading } = context;

  const handleUserRegister = async (fullName, email, password) => {
    try {
      setLoading(true);

      const response = await registerUser({ fullName, email, password });
      setUser(response.user);

      toast.success("Account created successfully 🎉");
      return true;
    } catch (error) {
      const message = error.response?.data?.msg || "Registration failed";

      toast.error(message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const handleUserLogin = async (email, password) => {
    try {
      setLoading(true);

      const response = await loginUser({ email, password });

      setUser(response.user);
      toast.success("Logged in successfully 🎉");
      return true;
    } catch (error) {
      const message = error.response?.data?.msg || "Login failed";

      toast.error(message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const handlePartnerRegister = async (fullName, contactName, phone, address, email, password) => {
    try {
      setLoading(true);

      const response = await registerPartner({ fullName, contactName, phone, address, email, password });
      setUser(response.partner);

      toast.success("Account created successfully 🎉");
      return true;
    } catch (error) {
      const message = error.response?.data?.msg || "Registration failed";

      toast.error(message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const handlePartnerLogin = async (email, password) => {
    try {
      setLoading(true);

      const response = await loginPartner({ email, password });

      setUser(response.partner);
      toast.success("Logged in successfully 🎉");
      return true;
    } catch (error) {
      const message = error.response?.data?.msg || "Login failed";

      toast.error(message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    user,
    handleUserRegister,
    handleUserLogin,
    handlePartnerRegister,
    handlePartnerLogin,
    loading
  };
};
