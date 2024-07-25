import { useState, useEffect } from 'react';

export const useAboutMcut = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('https://mcut.vercel.app/api/aboutmcut', {
      cache: 'force-cache'
    })
      .then((res) => res.json())
      .then((data) => setData(data.data));
  }, []);

  return data;
};

export const useFaculties = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('https://mcut.vercel.app/api/faculty', {
      cache: 'force-cache'
    })
      .then((res) => res.json())
      .then((data) => setData(data.data));
  }, []);

  return data;
};

export const useCampusLife = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('https://mcut.vercel.app/api/campuslife', {
      cache: 'force-cache'
    })
      .then((res) => res.json())
      .then((data) => setData(data.data));
  }, []);

  return data;
};

export const useAdministration = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('https://mcut.vercel.app/api/administration', {
      cache: 'force-cache'
    })
      .then((res) => res.json())
      .then((data) => setData(data.data));
  }, []);

  return data;
};

export const useAdmission = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('https://mcut.vercel.app/api/admission', {
      cache: 'force-cache'
    })
      .then((res) => res.json())
      .then((data) => setData(data.data));
  }, []);

  return data;
};
