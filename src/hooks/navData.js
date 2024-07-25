import { useState, useEffect } from 'react';

export const useAboutMcut = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/api/aboutmcut', {
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
    fetch('http://localhost:3000/api/faculty', {
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
    fetch('http://localhost:3000/api/campuslife', {
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
    fetch('http://localhost:3000/api/administration', {
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
    fetch('http://localhost:3000/api/admission', {
      cache: 'force-cache'
    })
      .then((res) => res.json())
      .then((data) => setData(data.data));
  }, []);

  return data;
};
