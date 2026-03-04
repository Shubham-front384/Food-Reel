import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { getFoodPartnerInfo } from '../../services/food.api';
import '../../styles/profile.css';

const FoodPartnerProfile = () => {
  const { id } = useParams();

  const [profile, setProfile] = useState(null);
  const [video, setVideo] = useState([]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await getFoodPartnerInfo(id);
        
        setProfile(res.foodPartner);
        setVideo(res.foodPartner.foodItem);
      } catch (err) {
        console.error(err);
      }
    };

    if (id) fetchProfile();
  }, [id]);

  if (!profile) return <div>Loading...</div>;
  console.log(profile);

  return (
    <div className="profile-page">
      <div className="profile-content">
        <div className="profile-top-row">
          <img className="profile-avatar" src="/default.jpg" alt="Avatar" />
          <div className="info-buttons">
            <div className="info-btn">
              {profile.businessName || profile.fullName}
            </div>
            <div className="info-btn">
              {profile.address || 'No address provided'}
            </div>
          </div>
        </div>

        <div className="profile-stats-custom">
          <div className="stat">
            <span>Total meals</span>
            <strong>{String(video.length).padStart(2, "0")}</strong>
          </div>
          <div className="stat">
            <span>Customer serve</span>
            <strong>{String(video.length + 20).padStart(2, "0")}</strong>
          </div>
        </div>

        <hr className="divider" />

        <div className="posts-grid">
          {video.map((item, idx) => (
            <div key={idx} className="grid-item">
              <video src={ item.video } muted alt={ idx } />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FoodPartnerProfile;
