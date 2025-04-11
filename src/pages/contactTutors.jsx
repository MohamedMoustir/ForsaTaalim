import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';




const API_URL = 'http://127.0.0.1:8000/api';
const token = localStorage.getItem('token');
const user = localStorage.getItem('user');
const parsedToken = JSON.parse(user);


const ContactTutors = () => {
    const { id } = useParams()
    const [isMenuHidden, setIsMenuHidden] = useState(true);
    const [profiles, setprofiles] = useState([]);
    const [isUserAuth, setUserAuth] = useState(false);
    const [Detilesprofiles, setDetilesprofiles] = useState(6);
    const [message, setMessage] = useState(`Hello ,
        My name is ... and I am looking for a Mathematics tutor.
        I would like to take lessons at your place or mine.
        Ideally, I would like to start lessons as soon`);
    const [address, setAddress] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [err, setError] = useState("");
    const navigate = useNavigate();




}

export default ContactTutors;