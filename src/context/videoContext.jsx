import { createContext, useEffect, useState } from 'react';
import { categories } from '../constants/index.jsx';
import api from '../utils/api';

export const VideoContext = createContext();

export const VideoProvider = ({ children }) => {
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [video, setVideo] = useState();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const type = selectedCategory.type;
    const url =
      type === 'home'
        ? '/home'
        : type === 'trending'
        ? '/trending'
        : type === 'category'
        ? `/search?query=${selectedCategory.name}`
        : '';

    api
      .get(url)
      .then((res) => setVideo(res.data.data))
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false));
  }, [selectedCategory]);

  return (
    <VideoContext.Provider
      value={{ selectedCategory, setSelectedCategory, video, error, isLoading }}
    >
      {children}
    </VideoContext.Provider>
  );
};
