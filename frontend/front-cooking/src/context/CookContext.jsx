import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const CookContext = createContext();

const CookProvider = ({ children }) => {
    const [recipes, setRecipes] = useState([]); // Danh sách món ăn
    const [loading, setLoading] = useState(false); // Trạng thái tải dữ liệu
    const [error, setError] = useState(null); // Trạng thái lỗi
    const [user, setUser] = useState(null); // Thông tin người dùng
    const [isAuthenticated, setIsAuthenticated] = useState(false); // Trạng thái đăng nhập

    // Hàm xử lý đăng nhập bằng email và password
    const login = async (username, password) => {
        try {
            setLoading(true);
            const response = await axios.post('http://localhost:3000/login', { username, password });
            setUser(response.data.user); // Đảm bảo API trả về thông tin người dùng đầy đủ
            setIsAuthenticated(true);
            setError(null);
        } catch (err) {
            setError(err.response?.data?.message || 'Đăng nhập thất bại');
        } finally {
            setLoading(false);
        }
    };

    // Hàm xử lý đăng nhập bằng Google
    const loginWithGoogle = () => {
        window.location.href = 'http://localhost:3000/auth/google';
    };

    // Hàm xử lý đăng nhập bằng Facebook
    const loginWithFacebook = () => {
        window.location.href = 'http://localhost:3000/auth/facebook';
    };

    // Hàm lấy thông tin người dùng sau khi đăng nhập Google
    const fetchGoogleUser = async () => {
        try {
            setLoading(true);
            const response = await axios.get('http://localhost:3000/auth/google/success', { withCredentials: true });
            setUser(response.data.user); // Lưu thông tin người dùng
            setIsAuthenticated(true);
            setError(null);
        } catch (err) {
            setError(err.response?.data?.message || 'Không thể lấy thông tin người dùng');
        } finally {
            setLoading(false);
        }
    };

    const fetchFacebookUser = async () => {
        try {
          setLoading(true);
          const response = await axios.get('http://localhost:3000/auth/facebook/success', { withCredentials: true });
          console.log('Response:', response.data); // Kiểm tra phản hồi từ backend
          setUser(response.data.user); // Lưu thông tin người dùng
          setIsAuthenticated(true);
          setError(null);
        } catch (err) {
          console.error('Lỗi:', err);
          setError(err.response?.data?.message || 'Không thể lấy thông tin người dùng');
        } finally {
          setLoading(false);
        }
      };
      

    // Hàm xử lý đăng xuất
    const logout = () => {
        setUser(null);
        setIsAuthenticated(false);
    };
    // Gọi fetchFacebookUser khi ứng dụng tải
    useEffect(() => {
        fetchFacebookUser();
    }, []);
    // Gọi fetchGoogleUser khi ứng dụng tải
    useEffect(() => {
        fetchGoogleUser();
    }, []);
    
    return (
        <CookContext.Provider
            value={{
                recipes, // Danh sách món ăn
                loading, // Trạng thái tải dữ liệu
                error, // Trạng thái lỗi
                user, // Thông tin người dùng
                isAuthenticated, // Trạng thái đăng nhập
                login, // Hàm đăng nhập
                loginWithGoogle, // Hàm đăng nhập bằng Google
                loginWithFacebook, // Hàm đăng nhập bằng Facebook
                logout, // Hàm đăng xuất
            }}
        >
            {children}
        </CookContext.Provider>
    );
};

export default CookProvider;