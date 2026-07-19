import { createContext, useContext, useEffect, useState } from 'react';
import API from '../api/axios';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [contact, setContact] = useState(null);
  const [hero, setHero] = useState(null);
  const [about, setAbout] = useState(null);
  const [valueProps, setValueProps] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const [c, h, a, v] = await Promise.all([
          API.get('/contact'),
          API.get('/content/hero'),
          API.get('/content/about'),
          API.get('/content/valueProps'),
        ]);
        setContact(c.data);
        setHero(h.data.value);
        setAbout(a.data.value);
        setValueProps(v.data.value || []);
      } catch (e) {
        console.error('Data load error:', e);
      }
    };
    load();
  }, []);

  const refresh = async () => {
    const [c, h, a, v] = await Promise.all([
      API.get('/contact'),
      API.get('/content/hero'),
      API.get('/content/about'),
      API.get('/content/valueProps'),
    ]);
    setContact(c.data);
    setHero(h.data.value);
    setAbout(a.data.value);
    setValueProps(v.data.value || []);
  };

  return (
    <DataContext.Provider value={{ contact, hero, about, valueProps, refresh }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
