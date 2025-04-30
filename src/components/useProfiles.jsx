import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { API_URL, getUser, getToken } from "../utils/config";
import Index from "../pages";
import ReservationTutors from "../pages/reservation";
import { useParams } from "react-router-dom";
// import Reservation "../pages/reservation";
const fetchProfiles = ({id_}) => {
  const [loading, setLoading] = useState(true);
  const [detile, setDetilesprofiles] = useState([]);
  const {id}= useParams();
  console.log('ccc',id_);
  
//   const fetchProfesseursById = async (id_) => {
//     axios.get(`${API_URL}/Professeur/${id_}`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//         'Content-Type': 'application/json',
//       }
//     })
//       .then((response) => {
//         setDetilesprofiles(response.data.Profile);
//         console.log('ddd', response.data);
//         setLoading(false)
//       })
//   };
//     useEffect(() => {
//       fetchProfesseursById(id_);
//     }, [id_])
//   return (
//     <ReservationTutors detiles={detile} loading={loading} />
//   )
}

export default fetchProfiles;
