import React, { useEffect, useState  } from "react";
import axios from "axios";
import { API_URL, getToken } from "../utils/config";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
const Logout = () => {
    const token = getToken();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const handleLogout = async () => {
            const response = await axios.post(`${API_URL}/auth/logout`, {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data",
                    }
                }
            );
            if (response) {
                sessionStorage.removeItem("user");
                sessionStorage.removeItem("token");
                navigate('/login')
                setLoading(false)
            }
        }
        handleLogout()
        console.log('ddddd');
    }, [])

    return (
        <>  {loading && <Spinner />}</>
    )

}
export default Logout;