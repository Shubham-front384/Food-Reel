import { useEffect, useRef } from "react";
import "../../../auth/styles/reels.css";
import { useFood } from "../../hooks/useFood";
import { useNavigate } from "react-router";

const Home = () => {
  const { food = [], loading, handleGetFoodReels } = useFood();
  const videoRefs = useRef([]);

  const navigate = useNavigate();

  // Fetch reels
  useEffect(() => {
    handleGetFoodReels();
  }, []);

  // Handle auto play / pause / reset
  useEffect(() => {
    if (!food.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target;

          if (entry.isIntersecting) {
            video.currentTime = 0;
            video.play().catch(() => {});
          } else {
            video.pause();
            video.currentTime = 0;
          }
        });
      },
      {
        threshold: 0.7,
      }
    );

    videoRefs.current.forEach((video) => {
      if (video) observer.observe(video);
    });

    return () => {
      videoRefs.current.forEach((video) => {
        if (video) observer.unobserve(video);
      });
    };
  }, [food]);

  const handleVisitStore = (storeId) => {
    navigate(`/store/${storeId}`);
  };

  if (loading) {
    return <div className="loading-screen">Loading reels...</div>;
  }

  if (!food.length) {
    return <div className="loading-screen">No reels available</div>;
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
              <div className="reel-content">
                <h3 className="reel-title">{item.name}</h3>

                <p className="reel-description">
                  {item.description}
                </p>

                <button
                  className="visit-store-btn"
                  onClick={() =>
                    handleVisitStore(item.foodPartner)
                  }
                >
                  Visit Store
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
