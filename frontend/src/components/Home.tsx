import React, { useEffect, useState, useRef } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.tsx';

const UserDashboard: React.FC = () => {
  const { isAuthenticated, setIsAuthenticated, setUser, user } = useAuth();
  const navigate = useNavigate();
  const [remainingTime, setRemainingTime] = useState(60);
  const logoutTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const countdownInterval = useRef<ReturnType<typeof setInterval> | null>(null);

  const logoutUser = () => {
    setIsAuthenticated(false);
    setUser(null);
    navigate('/signin');
  };

  const restartTimer = () => {
    if (isAuthenticated) {
      if (logoutTimeout.current) {
        clearTimeout(logoutTimeout.current);
      }

      if (countdownInterval.current) {
        clearInterval(countdownInterval.current);
      }

      setRemainingTime(60);

      logoutTimeout.current = setTimeout(logoutUser, 60000);

      countdownInterval.current = setInterval(() => {
        setRemainingTime((prevTime) => {
          if (prevTime === 1) {
            clearInterval(countdownInterval.current as ReturnType<typeof setInterval>);
          }
          return prevTime - 1;
        });
      }, 1000);
    }
  };

  useEffect(() => {
    if (!isAuthenticated) return;

    window.addEventListener('mousemove', restartTimer);
    window.addEventListener('keydown', restartTimer);

    restartTimer();

    return () => {
      window.removeEventListener('mousemove', restartTimer);
      window.removeEventListener('keydown', restartTimer);

      if (logoutTimeout.current) {
        clearTimeout(logoutTimeout.current);
      }

      if (countdownInterval.current) {
        clearInterval(countdownInterval.current);
      }
    };
  }, [isAuthenticated]);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/signin');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f8f9fa' }}>
      <div style={{ textAlign: 'center' }}>
        <h1>Welcome to the Dashboard!</h1>
        {user ? (
          <p>Hello, {user.name}!</p>
        ) : (
          <p>You're successfully logged in.</p>
        )}
        <p>Remaining time: {remainingTime} seconds</p>
        {remainingTime === 0 && <p>You will need to log in again after the timeout.</p>}
        <Button variant="danger" onClick={logoutUser}>
          Logout
        </Button>
      </div>
    </div>
  );
};

export default UserDashboard;
