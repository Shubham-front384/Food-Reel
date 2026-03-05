import { useEffect } from "react";
import { useNavigate } from "react-router";
import { Heart, MessageCircle, Bookmark } from "lucide-react";

import { useFood } from "../../hooks/useFood";
import { useReelsVideo } from "../../hooks/useReelsVideo";

import "../../../auth/styles/reels.css";
import BottomNav from "../../../components/BottomNav";

const Saved = () => {
  const {
    food = [],
    loading,
    handleGetSavedFood,
    handleLikeFood,
    handleSaveFood
  } = useFood();

  const navigate = useNavigate();
  const videoRefs = useReelsVideo(food);

  useEffect(() => {
    handleGetSavedFood();
  }, []);

  const handleVisitStore = (storeId) => {
    navigate(`/store/${storeId}`);
  };

  if (loading) {
    return <div className="loading-screen">Loading saved reels...</div>;
  }

  if (!food.length) {
    return <div className="loading-screen">No saved reels</div>;
  }

  return (
    <div className="reels-container">

      <div className="reels-viewport">

        {food.map((item, index) => (
          <div key={item._id} className="reel-item">

            <video
              ref={(el) => (videoRefs.current[index] = el)}
              muted
              loop
              playsInline
              preload="metadata"
              src={item.video}
              className="reel-video"
            />

            <div className="reel-overlay">

              <div className="icon-stack">

                <div className="heart-icon">
                  <button
                    className="icon-button"
                    onClick={() => handleLikeFood(item._id)}
                  >
                    <Heart size={26} color="#fff" />
                  </button>
                  <span className="icon-label">
                    {item.likeCount || 0}
                  </span>
                </div>

                <div className="comment-icon">
                  <button
                    className="icon-button"
                    onClick={() => navigate(`/reel/${item._id}`)}
                  >
                    <MessageCircle size={26} color="#fff" />
                  </button>
                  <span className="icon-label">
                    Comment
                  </span>
                </div>

                <div className="save-icon">
                  <button
                    className="icon-button"
                    onClick={() => handleSaveFood(item._id)}
                  >
                    <Bookmark size={26} color="#fff" />
                  </button>
                  <span className="icon-label">
                    Unsave
                  </span>
                </div>

              </div>

              <div className="reel-content">

                <h3 className="reel-title">
                  {item.name}
                </h3>

                <p className="reel-description">
                  {item.description}
                </p>

                <button
                  className="visit-store-btn"
                  onClick={() =>
                    handleVisitStore(item.foodPartner?._id || item.foodPartner)
                  }
                >
                  Visit Store
                </button>

              </div>

            </div>

          </div>
        ))}

      </div>

      <BottomNav />

    </div>
  );
};

export default Saved;
