import { useContext } from "react";
import { getFoodReels, getFoodPartnerInfo, createFoodReels } from "../services/food.api";
import { toast } from "react-toastify";
import { FoodContext } from "../food.context";

export const useFood = () => {
  const context = useContext(FoodContext);

  if (!context) {
    throw new Error("useFood must be used within FoodProvider");
  }

  const { food, setFood, loading, setLoading } = context;

  const handleGetFoodReels = async () => {
    try {
      setLoading(true);
      const reels = await getFoodReels();

      setFood(reels.foodItem);
      return true;
    } catch (error) {
      const message = error.response?.data?.msg || "Failed to fetch food reels";
      toast.error(message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const handleFoodPartnerById = async (id) => {
    try {
      setLoading(true);
      const response = await getFoodPartnerInfo(id);

      setFood(response.foodPartner);
      return true;
    } catch (error) {
      const message = error.response?.data?.msg || "Failed to fetch food reels";
      toast.error(message);
      return false;
    } finally {
      setLoading(false);
    }
  }

  const handleCreateFoodReels = async (name, description, video) => {
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("video", video);

      const response = await createFoodReels(formData);

      toast.success("Food created successfully 🎉");
      return true;
    } catch(error) {
      const message = error.response?.data?.msg || "Failed to fetch food reels";
      toast.error(message);
      return false;
    } finally {
      setLoading(false);
    }
  }

  return {
    handleGetFoodReels,
    handleFoodPartnerById,
    handleCreateFoodReels,
    loading,
    food
  };
};
