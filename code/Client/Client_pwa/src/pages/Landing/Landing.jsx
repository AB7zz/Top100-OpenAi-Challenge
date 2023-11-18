import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


function Landing() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/login');
    }, 3000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex justify-center items-center h-screen">
      <img src='' alt='' />
    </div>
  );
}

export default Landing;
