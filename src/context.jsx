import React, { createContext, useContext, useEffect, useState } from "react";
import supabase from "./db/supabase";

const UrlCOntext = createContext();

const UrlProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    const sessionRes = await supabase.auth.getSession();
    const accessToken = sessionRes.data.session?.access_token;

    if (!accessToken) {
      console.warn("No access token found.");
      setUser(null);
      setLoading(false);
      return;
    }

    const {
      data: { user },
      error,
    } = await supabase.auth.getUser(accessToken);

    if (error) {
      console.error("Error getting user:", error.message);
    }

    setUser(user);
    setLoading(false);
  };
  
  
  

  useEffect(() => {
    fetchUser();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (session?.user) {
          setUser(session.user);
        } else {
          setUser(null);
        }
        setLoading(false);
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const isAuthenticated = !!user;

  return (
    <UrlCOntext.Provider value={{ user, fetchUser, loading, isAuthenticated }}>
      {children}
    </UrlCOntext.Provider>
  );
};

export const UrlState = () => useContext(UrlCOntext);

export default UrlProvider;