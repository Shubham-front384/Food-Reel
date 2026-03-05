import { Route, Routes } from 'react-router';
import RegisterUser from '../auth/pages/RegisterUser';
import LoginUser from '../auth/pages/LoginUser';
import RegisterPartner from '../auth/pages/RegisterPartner';
import LoginPartner from '../auth/pages/LoginPartner';
import Home from '../auth/pages/general/Home';
import CreateFoodPartner from '../auth/pages/food-partner/CreateFoodPartner';
import FoodPartnerProfile from '../auth/pages/food-partner/FoodPartnerProfile';
import Saved from '../auth/pages/general/Saved';

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/user/register" element={<RegisterUser />} />
      <Route path="/user/login" element={<LoginUser />} />
      <Route path="/food-partner/register" element={<RegisterPartner />} />
      <Route path="/food-partner/login" element={<LoginPartner />} />
      <Route path="/food-partner/create" element={<CreateFoodPartner />} />
      <Route path="/store/:id" element={<FoodPartnerProfile />} />
      <Route path="/saved" element={<Saved />} />
    </Routes>
  );
};

export default Router;
