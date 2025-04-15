import React, { useState } from 'react';
import {
    faCalendarAlt,
    faMapMarkerAlt,
    faChalkboardTeacher,
    faBookOpen,
    faUsers,
    faSignInAlt,
    faClock,
    faTicketAlt,
    faShareAlt,
    faHeart,
    faBookmark
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import Nav from '../components/Nav';
const DetilesAnnonce = ({ event }) => {
    const [isSaved, setIsSaved] = useState(false);
    const [isLiked, setIsLiked] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();
    const sampleEvent = {
        id: 1,
        title: "Advanced Mathematics Workshop",
        description: "Join our intensive workshop covering advanced mathematical concepts including calculus, linear algebra, and statistics with hands-on problem-solving sessions.",
        date: "May 15, 2025",
        time: "10:00 AM - 4:00 PM",
        location: "Science Building, Room 302",
        image: "workshop-math.jpg",
        subjects: "Mathematics, Statistics, Calculus",
        levels: "University, Advanced",
        speaker: "Prof. Sarah Johnson, PhD",
        price: "$45.00",
        availableSeats: 25,
        organizer: "Mathematics Department"
    };

    const eventData = event || sampleEvent;
    const subjectArray = eventData.subjects.split(', ');
    const levelArray = eventData.levels.split(', ');



    return (
        <>
            <Nav></Nav>
          
        </>
    );

}
export default DetilesAnnonce;