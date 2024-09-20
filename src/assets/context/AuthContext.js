import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { login, logout } from "../services/authService";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [userToken, setUserToken] = useState(null);
    const [userProfile, setUserProfile] = useState(null);

    useEffect(() => {
        async function loadAuthState() {
            const token = await AsyncStorage.getItem('token');
            const profile = await AsyncStorage.getItem('profile');
            if (token && profile) {
                setUserToken(token);
                setUserProfile(JSON.parse(profile));
            }
        }
        loadAuthState();
    }, []);

    const handleLogin = async (username, password) => {
        const data = await login(username, password);
        if (data.token) {
            setUserToken(data.token);
            const profile = await AsyncStorage.getItem('profile');
            setUserProfile(JSON.parse(profile));
        }
    };

    const handleLogout = async () => {
        await logout();
        setUserToken(null);
        setUserProfile(null);
    };

    return (
        <AuthContext.Provider value={{ userToken, userProfile, handleLogin, handleLogout }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };