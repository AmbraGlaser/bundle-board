import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Home() {
  const accessKey = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;
  const [img, setImg] = useState("");
  const [res, setRes] = useState([]);
  const [randomSizes, setRandomSizes] = useState([]);
  const [error, setError] = useState(null);

  const fetchRandomPhotos = async () => {
    try {
      const data = await fetch(
        `https://api.unsplash.com/photos/random?client_id=${accessKey}&count=40`
      );
      if (!data.ok) {
        if (data.status === 403) {
          setError("Access forbidden: 403");
        } else {
          throw new Error("Request failed");
        }
      } else {
        const dataJ = await data.json();
        setRes(dataJ);
        setRandomSizes(generateRandomSizes(dataJ.length));
      }
    } catch (error) {
      console.error(error);
      setError("An error occurred while fetching photos.");
    }
  };

  const fetchPhotosBySearch = async () => {
    try {
      const data = await fetch(
        `https://api.unsplash.com/search/photos?page=1&query=${img}&client_id=${accessKey}&per_page=40`
      );
      if (!data.ok) {
        if (data.status === 403) {
          setError("Access forbidden: 403");
        } else {
          throw new Error("Request failed");
        }
      } else {
        const dataJ = await data.json();
        const result = dataJ.results;
        const filteredresult = result.filter(result => result.description !== null);
        setRes(filteredresult);
        setRandomSizes(generateRandomSizes(filteredresult.length));
      }

    } catch (error) {
      console.error(error);
      setError("An error occurred while fetching photos.");
    }
  };

  const generateRandomSizes = (count) => {
    const minSize = 300;
    const maxSize = 500;
    const sizes = [];
    for (let i = 0; i < count; i++) {
      const width = Math.floor(Math.random() * (maxSize - minSize + 1)) + minSize;
      const height = Math.floor(Math.random() * (maxSize - minSize + 1)) + minSize;
      sizes.push({ width, height });
    }
    return sizes;
  };

  useEffect(() => {
    fetchRandomPhotos();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchPhotosBySearch();
    setImg("");
  };

  if (error) {
    return <div className="error-page text-purple font-Title dark:text-light-blue flex justify-center">{error}</div>;
  }

  return (
    <div className="flex flex-col items-center bg-light dark:bg-dark min-h-screen">
      <div className="mb-8">
        <form className="flex items-center space-x-4" onSubmit={handleSubmit}>
          <label className="text-2xl" htmlFor="img">
            📷
          </label>
          <input
            className="block w-full font-Secundair p-4 ps-10 text-sm text-dark border border-purple rounded-lg focus:border-purple dark:border-light-blue dark:placeholder-gray-400 dark:text-dark dark:focus:ring-light-blue dark:focus:border-light-blue"
            type="text"
            placeholder="Vind je Inspiratie..."
            value={img}
            onChange={(e) => setImg(e.target.value)}
          />
          <button
            type="submit"
            className="focus:ring-4 focus:outline-none font-Title dark:text-light-blue focus:ring-purple font-medium rounded-lg text-sm px-4 py-2 dark:focus:ring-light-blue"
          >
            Zoeken
          </button>
        </form>
      </div>
      <div className="flex flex-wrap justify-center gap-4 border-purple dark:border-light-blue border-2 p-2 max-w-6xl">
        {res &&
          res.map((val, index) => {
            return (
              <Link to={`/detail/${val.id}`} key={val.id}>
                <img
                  className="object-cover rounded border-2 border-purple dark:border-light-blue"
                  src={val.urls.small}
                  alt={val.alt_description}
                  style={{ width: `${randomSizes[index].width}px`, height: `${randomSizes[index].height}px` }}
                />
              </Link>
            );
          })}
      </div>
    </div>
  );
}

export default Home;
