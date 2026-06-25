import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('codehive_user');
    return saved ? JSON.parse(saved) : null;
  });



  useEffect(() => {
    if (user) localStorage.setItem('codehive_user', JSON.stringify(user));
    else localStorage.removeItem('codehive_user');
  }, [user]);

  const signup = ({ username, email, password }) => {
    if (!username || !email || !password) return { success: false, error: 'All fields are required.' };
    if (password.length < 6) return { success: false, error: 'Password must be at least 6 characters.' };
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return { success: false, error: 'Please enter a valid email.' };
    const existingUsers = JSON.parse(localStorage.getItem('codehive_users') || '[]');
    if (existingUsers.find(u => u.email === email)) return { success: false, error: 'An account with this email already exists.' };
    if (existingUsers.find(u => u.username === username)) return { success: false, error: 'Username already taken.' };
    const newUser = { username, email, password, createdAt: new Date().toISOString() };
    const updated = [...existingUsers, newUser];
    localStorage.setItem('codehive_users', JSON.stringify(updated));
    setUser({ username, email });
    return { success: true };
  };

  const login = ({ email, password }) => {
    if (!email || !password) return { success: false, error: 'Please fill in all fields.' };
    const existingUsers = JSON.parse(localStorage.getItem('codehive_users') || '[]');
    const found = existingUsers.find(u => u.email === email && u.password === password);
    if (!found) return { success: false, error: 'Invalid email or password.' };
    setUser({ username: found.username, email: found.email });
    return { success: true };
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
