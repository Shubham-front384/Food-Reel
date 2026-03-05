import React, { useState } from 'react';
import '../../styles/create-food.css';
import { useFood } from "../../hooks/useFood";
import { useNavigate } from "react-router";

const CreateFoodPartner = () => {
  const { handleCreateFoodReels, loading } = useFood();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [videoFile, setVideoFile] = useState(null);
  const [videoPreview, setVideoPreview] = useState(null);

  const handleVideoChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      setVideoFile(file);
      setVideoPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!videoFile) {
      alert("Please upload a video");
      return;
    }

    const success = await handleCreateFoodReels(
      name,
      description,
      videoFile
    );

    if (success) {
      setName("");
      setDescription("");
      setVideoFile(null);
      setVideoPreview(null);
      navigate("/");
    }
  };

  return (
    <section className="create-food">
      <form className="create-food__form" onSubmit={handleSubmit}>
        <h2 className="create-food__title">Create Food Item</h2>

        <div className="create-food__grid">
          <label className="field field--video">
            <span className="field__label">Video</span>
            <div className="video-input">
              <input
                id="video-file"
                type="file"
                accept="video/*"
                onChange={handleVideoChange}
                className="video-input__file visually-hidden"
              />

              <label
                htmlFor="video-file"
                className="video-input__upload"
                aria-hidden
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden
                >
                  <path
                    d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M7 10l5-5 5 5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 5v12"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span>Upload video</span>
              </label>

              {videoPreview ? (
                <div className="video-input__preview-wrap">
                  <video
                    className="video-input__preview"
                    src={videoPreview}
                    controls
                  />
                </div>
              ) : (
                <div className="video-input__placeholder">
                  <svg
                    width="36"
                    height="36"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden
                  >
                    <path
                      d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"
                      stroke="currentColor"
                      strokeWidth="1.25"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M7 10l5-5 5 5"
                      stroke="currentColor"
                      strokeWidth="1.25"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12 5v12"
                      stroke="currentColor"
                      strokeWidth="1.25"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <div>No video selected</div>
                </div>
              )}
            </div>
          </label>

          <label className="field">
            <span className="field__label">Name</span>
            <input
              className="field__input"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Dish name"
              required
            />
          </label>

          <label className="field field--full">
            <span className="field__label">Description</span>
            <textarea
              className="field__input field__textarea"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Short description"
              rows={4}
              required
            />
          </label>
        </div>

        <div className="create-food__actions">
          <button type="submit" className="btn btn--primary" disabled={loading}>
            {loading ? "Creating..." : "Create"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default CreateFoodPartner;
