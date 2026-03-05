import { useContext } from 'react';
import {
  getFoodReels,
  getFoodPartnerInfo,
  createFoodReels,
  likeFoodApi,
  saveFoodApi,
  getSavedFoodApi,
} from '../services/food.api';
import { toast } from 'react-toastify';
import { FoodContext } from '../food.context';

export const useFood = () => {
  const context = useContext(FoodContext);

  if (!context) {
    throw new Error('useFood must be used within FoodProvider');
  }

  const { food, setFood, loading, setLoading } = context;

  const handleGetFoodReels = async () => {
    try {
      setLoading(true);
      const reels = await getFoodReels();

      setFood(reels.foodItem);
      return true;
    } catch (error) {
      const message = error.response?.data?.msg || 'Failed to fetch food reels';
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
      const message = error.response?.data?.msg || 'Failed to fetch food reels';
      toast.error(message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const handleCreateFoodReels = async (name, description, video) => {
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append('name', name);
      formData.append('description', description);
      formData.append('video', video);

      const response = await createFoodReels(formData);

      toast.success('Food created successfully 🎉');
      return true;
    } catch (error) {
      const message =
        error.response?.data?.msg || 'Failed to create food reels';
      toast.error(message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const handleLikeFood = async (id) => {
    try {
      const res = await likeFoodApi(id);

      setFood((prev) =>
        prev.map((item) =>
          item._id === id
            ? {
                ...item,
                likeCount: res.likeCount,
                liked: res.liked,
              }
            : item
        )
      );

      return true;
    } catch (error) {
      const message = error.response?.data?.msg || 'Failed to like reels';
      toast.error(message);
    }
  };

  const handleSaveFood = async (id) => {
    try {
      const res = await saveFoodApi(id);

      setFood((prev) =>
        prev.map((item) =>
          item._id === id ? { ...item, saved: res.saved } : item
        )
      );

      toast.success(res.msg);
      return true;
    } catch (error) {
      const message = error.response?.data?.msg || 'Failed to save reels';
      toast.error(message);
    }
  };

  const handleGetSavedFood = async () => {
    try {
      setLoading(true);
      const response = await getSavedFoodApi();
      setFood(response.savedFood);
      return true;
    } catch (error) {
      const message =
        error.response?.data?.msg || 'Failed to fetch saved reels';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return {
    handleGetFoodReels,
    handleFoodPartnerById,
    handleCreateFoodReels,
    handleLikeFood,
    handleSaveFood,
    handleGetSavedFood,
    loading,
    food,
  };
};
