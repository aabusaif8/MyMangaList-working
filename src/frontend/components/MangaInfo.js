import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { read } from "../utils/api";
import "../assets/ListManga.css";

function MangaInfo() {
  const { manga_id } = useParams();
  const [selectedManga, setSelectedManga] = useState(null);
  const history = useHistory();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await read(manga_id);
        setSelectedManga(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [manga_id]);

  if (!selectedManga) {
    return <div>Loading...</div>;
  }

  const goHome = () => {
    history.push('/dashboard');
  }

  // Filter comments by manga_id
  console.log(selectedManga)
  const filteredComments = selectedManga.comments.filter(comment => comment.manga_id === manga_id);

  return (
    <div className="manga-item">
      {/* Render manga information */}
      <p className="field-name">Manga Name : {selectedManga.manga.manga_name}</p>
      <p className="field-name">Author Name : {selectedManga.manga.mangaka_name}</p>
      <p className="field-name">Rating : {selectedManga.manga.rating}</p>
      <p className="field-name">Description:</p>
      <p className="field-value">{selectedManga.manga.description}</p>
      
      <h2>Comments:</h2>
      <div className="comments-container">
        {selectedManga.comments.length > 0 ? (
          selectedManga.comments.map(comment => (
            <div key={comment.comment_id} className="comment-item">
              <p className="reviewer-name">Reviewer: {comment.reviewer_name}</p>
              <p className="rating">Rating: {comment.rating}</p>
              <p className="review-text">Review: {comment.review}</p>
            </div>
          ))
        ) : (
          <p>No comments available</p>
        )}
      </div>
      
      <button className="home-button" onClick={goHome}> Home </button>
    </div>
  );
}

export default MangaInfo;