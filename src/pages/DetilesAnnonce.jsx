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


const EventDetailCard = ({ event }) => {
    const [isSaved, setIsSaved] = useState(false);
    const [isLiked, setIsLiked] = useState(false);
    const [showModal, setShowModal] = useState(false);


}