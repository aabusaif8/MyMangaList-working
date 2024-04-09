import React, { useState, useEffect } from "react";
import FormatManga from "./FormatManga";
import { listManga } from "../utils/api";

function ListManga() {
  const [mangaData, setMangaData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await listManga();
        setMangaData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="manga-list-container">
      {mangaData.length > 0 ? (
        mangaData.map((manga) => (
          <div key={manga.manga_id}>
            <FormatManga manga={manga} />
          </div>
        ))
      ) : (
        <p>No manga data available</p>
      )}
    </div>
  );
}

export default ListManga;



