import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useParams } from 'react-router-dom';
import '../assets/style/style.css';
import axios from 'axios';
import DashboardNav from '../components/dashboardNav';
import { API_URL, getToken, getUser } from '../utils/config';
import Spinner from '../components/Spinner';
import Alert from '../components/Alert';



function MyFullCalendar({ amount }) {
  const token = getToken();
  const user = getUser();
  const [events, setEvents] = useState([]);
  const [message, setMessage] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [eventColor, setColer] = useState('');
  const [evantDate, setEvanteDte] = useState('');
  const [titleEvante, setTitleEvante] = useState('');
  const [eventClicks, setEventClicks] = useState(false);
  const [InfoDate, setInfoDate] = useState([]);
  const [InfoTitle, setInfotTitle] = useState([]);
  const [infoColor, setInfoColor] = useState([]);
  const [id_card, setId] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tuteur_id, setTuteur_id] = useState(null);
  const { id } = useParams()
  const [getDateReserve, setGetDateReserve] = useState(null);
  const [timeReservation, setTimeReservation] = useState(null);
  const [isOpenPoupupDate, setIsOpenPoupupDate] = useState(null);
  const [durationOption, setDurationOptions] = useState([{ time: '1:00' }, { time: '2:00' }, { time: '3:00' }]);
  const [times, setTime] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [type, setType] = useState('');
  const [title, setTitle] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [isClikConfme, setIsClikConfme] = useState(false);
  const [selectedTimes, setSelectedTime] = useState([]);
  const [IsOpenTime, setIsOpenTime] = useState(false);
  const [availableTime, setAvailable_times] = useState([]);
  const [isEvantRed, setIsEvantRed] = useState(false);

  const availableTimes = [
    { time: '08:00 AM' },
    { time: '09:00 AM' },
    { time: '10:00 AM' },
    { time: '11:00 AM' },
    { time: '12:00 PM' },
    { time: '01:00 PM' },
    { time: '02:00 PM' },
    { time: '03:00 PM' },
    { time: '04:00 PM' },
    { time: '05:00 PM' },
  ];
  const handleGetdata = async (e) => {
    try {
      axios.get(`${API_URL}/disponibilite/${id}`, {
        headers: {
          authorization: `bearer ${token}`,
          'Content-Type': 'application/json'
        },
      })
        .then((response) => {

          let data = response.data;
          console.log(data);
          const newEvents = data.map((evant, index) => ({
            title: evant.titleEvant,
            date: evant.date,
            color: evant.colorEvant,
            id: evant.id,
            available_times: evant.available_times
          }));
          setLoading(false)
          setEvents(newEvents);


        })
    } catch (error) {
      console.error(error);
    }
  }
  const handleGetProfeTime = async (e) => {
    try {
      axios.get(`${API_URL}/disponibilite/available_times/${id}`, {
        headers: {
          authorization: `bearer ${token}`,
          'Content-Type': 'application/json'
        },
      })
        .then((response) => {

          let data = response.data;
          setLoading(false)
          setAvailable_times(data);
          console.log('haaaa', data);


        })
    } catch (error) {
      console.error(error);
    }
  }
  const availableTimesArray = availableTime.available_times ? JSON.parse(availableTime.available_times) : [];

  const handleSubmit = async (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append('date', evantDate);
    formData.append('colorEvant', eventColor);
    formData.append('titleEvant', titleEvante);
    formData.append('available_times', JSON.stringify(selectedTimes));

    try {
      axios.post(`${API_URL}/disponibilite`, formData, {
        headers: {
          authorization: `bearer ${token}`,
          'Content-Type': 'aplication/json'
        },
        body: formData
      })
        .then((response) => {
          setIsOpen(false)
          console.log(response.data);
          // sprit operoter
          setEvents([
            ...events,
            { title: titleEvante, date: evantDate, color: eventColor },
          ]);
          setTitle(' disponibilite ajoute  successyful')
          setType('success')
          setMessage('Votre disponibilité a été ajoutée avec succès.')
          setShowAlert(true)
        })
    } catch (error) {
      setShowAlert(true)
      setTitle('Error ajoute disponibilite');
      setType('error')
      setMessage('Erreur lors de l\'ajout de la disponibilité')
    }

  }
 
  const handleDateClick = (arg) => {
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().slice(0, 10);

    if (user.role === 'tuteur') {
      if (formattedDate > arg.dateStr) {
        setShowModal(true);
      } else {
        setIsOpen(true);
        setEvanteDte(arg.dateStr);
      }
    } else {
      const clickedDate = arg.dateStr;
      const eventOnClickedDate = events.find((item) => {
        const dateOnly = item.date.split(' ')[0];
        return dateOnly === clickedDate && item.color === 'red';
      });

      if (eventOnClickedDate) {
        setIsEvantRed(true);
        setIsOpenPoupupDate(false);
      } else {
        if (formattedDate > clickedDate) {
          setShowModal(true);
        } else {
          setGetDateReserve(clickedDate);
          setIsOpenPoupupDate(true);
        }
      }
    }
  };

  useEffect(() => {
    handleGetdata()
    handleGetProfeTime()
  }, [])

  const handleEventClick = (info) => {
    setEventClicks(true);
    const eventStartDate = info.event._instance.range.start;
    const formattedDate = eventStartDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: '2-digit'
    });

    setInfoDate(formattedDate);
    setInfotTitle(info.event.title);
    setInfoColor(info.event.backgroundColor);
    setId(info.event._def.publicId);

  };
  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      const response = axios.delete(`${API_URL}/disponibilite/${id_card}`, {
        headers: {
          authorization: `bearer ${token}`,
          'Content-Type': 'application/json'
        },
      })
      if (response) {
        setEventClicks(false);
        const updatedEvents = events.filter((items) => items.id != id_card);
        console.log(updatedEvents);
        setEvents(updatedEvents);

        setShowAlert(true)
        setTitle(' disponibilite delete succès')
        setType('success')
        setMessage('Votre disponibilité a été ajoutée avec succès.')
        setShowAlert(true)
      }
    } catch (error) {
      console.error(error);
      setShowAlert(true)
      setTitle('Error delete disponibilite');
      setType('error')
      setMessage('Erreur lors de l\'ajout de la delete disponibilité')
    }
  }
  const handleReservation = async (e) => {
    e.preventDefault();
    setIsClikConfme(false)
    setLoading(false);
    let formData = new FormData();
    formData.append('date_reservation', getDateReserve);
    formData.append('time_reservation', timeReservation.replace(/ (AM|PM)/, ''));
    formData.append('amount', parseFloat(amount.replace(/[^\d.]/g, '')));
    formData.append('dura', times);

    try {
      axios.post(`${API_URL}/Etudiant/pay/${id}`, formData, {
        headers: {
          authorization: `bearer ${token}`
        },
        body: formData
      })
        .then((response) => {
          if (response.data.reservation.original.redirect_url) {
            window.location.href = response.data.reservation.original.redirect_url;
          } else {
            console.log(response.data.reservation.original.message);
          }
        })
      setShowAlert(true);
      setTitle(' reservation ajoute  successyful')
      setType('success')
      setMessage('Votre reservation a été ajoutée avec succès.')
      setShowAlert(true)
    } catch (error) {
      console.error("Erreur:", error);
      setShowAlert(true)
      setTitle('Error ajoute reservation');
      setType('error')
      setMessage('Erreur lors de l\'ajout de la reservation')
    }


  };
  const handleSelectTime = (time) => {
    setSelectedTime((prev) =>
      prev.includes(time)
        ? prev.filter((t) => t !== time)
        : [...prev, time]
    );
  };
  const HandleCreateavailable_time = (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append('prof_id', user.id);
    formData.append('available_times', JSON.stringify(selectedTimes));

    try {
      axios.post(`${API_URL}/disponibilite/available_time`, formData, {
        headers: {
          authorization: `bearer ${token}`,
          'Content-Type': 'aplication/json'
        },
        body: formData
      })
        .then((response) => {
          setIsOpenTime(false)
          console.log(response.data);
          setAvailable_times([
            ...events,
            { title: titleEvante, date: evantDate, color: eventColor },
          ]);
          setTitle(' disponibilite ajoute  successyful')
          setType('success')
          setMessage('Votre disponibilité a été ajoutée avec succès.')
          setShowAlert(true)
        })
    } catch (error) {
      setShowAlert(true)
      setTitle('Error ajoute disponibilite');
      setType('error')
      setMessage('Erreur lors de l\'ajout de la disponibilité')
    }

  }

  return (
    <>
      {loading && <Spinner />}

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" style={{ fontFamily: 'Open Sans' }}>
          <div className="bg-white p-6 rounded-lg shadow-md w-96 text-center">
            <h2 className="text-xl text-red-600 font-semibold mb-3">Date invalide</h2>
            <p className="text-gray-700 mb-5">Cette date n'est pas disponible. Veuillez en choisir une autre.</p>
            <button
              onClick={() => setShowModal(false)}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
              Fermer
            </button>
          </div>
        </div>
      )}

      {user.role == 'tuteur' && (
        <div className="col-span-1 md:col-span-3 mt-2 absolute right-[13%] top-[5.3%]">
          <button
            type="button"
            onClick={() => setIsOpenTime(true)}
            className="bg-red-400 text-white px-4 py-2 rounded-md shadow hover:bg-red-500 transition"
          >
            Choose Session Times
          </button>
        </div>
      )}

      {IsOpenTime && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-lg w-full">
            <h2 className="text-lg font-semibold mb-4">Sélectionnez les horaires</h2>
            <ul className="space-y-2 max-h-48 overflow-y-auto">
              {availableTimes.map((item, index) => {
                const isSelected = selectedTimes.includes(item.time);
                return (
                  <li
                    key={index}
                    className={`cursor-pointer p-2 rounded-md ${isSelected
                      ? 'bg-blue-100 text-blue-700 font-semibold'
                      : 'hover:bg-gray-200'}`}
                    onClick={() => handleSelectTime(item.time)}
                  >
                    {item.time}
                  </li>
                );
              })}
            </ul>
            <button
              onClick={HandleCreateavailable_time}
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md w-full"
            >
              Fermer les horaires
            </button>
          </div>
        </div>
      )}


      {isOpen && user.role === 'tuteur' && (
        <>
          {isOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex items-center justify-center">
              <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 z-50">
                <div className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-bold">Ajouter un événement</h1>
                    <button
                      onClick={() => setIsOpen(false)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>

                  <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="flex flex-col">
                      <label className="mb-1 text-sm text-gray-600">Titre</label>
                      <input
                        type="text"
                        name="title"
                        placeholder="Titre de l'événement"
                        value={titleEvante}
                        onChange={(e) => setTitleEvante(e.target.value)}
                        required
                        className="p-2 border rounded"
                      />
                    </div>

                    <div className="flex flex-col">
                      <label className="mb-1 text-sm text-gray-600">Date</label>
                      <input
                        type="date"
                        name="date"
                        value={evantDate}
                        onChange={(e) => setEvanteDte(e.target.value)}
                        required
                        className="p-2 border border-red-400 rounded focus:ring focus:ring-red-200 focus:border-red-500 text-red-500"
                      />
                    </div>

                    <div className="flex flex-col">
                      <label className="mb-1 text-sm text-gray-600">Couleur</label>
                      <select
                        name="color"
                        value={eventColor}
                        onChange={(e) => setColer(e.target.value)}
                        required
                        className="p-2 border rounded"
                      >
                        <option value="">Choisir une couleur</option>
                        <option value="red" className="text-red-500">Rouge</option>
                        <option value="blue" className="text-blue-500">Bleu</option>
                        <option value="green" className="text-green-500">Vert</option>
                      </select>
                    </div>

                    <div className="col-span-1 md:col-span-3 flex justify-end space-x-2 mt-4">
                      <button
                        type="button"
                        onClick={() => setIsOpen(false)}
                        className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 transition"
                      >
                        Annuler
                      </button>
                      <button
                        type="submit"
                        className="bg-red-400 text-white px-4 py-2 rounded hover:bg-red-500 transition"
                      >
                        Ajouter l'événement
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}

        </>
      )}

      {eventClicks && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className=" p-6 rounded-lg shadow-lg w-96">
            <div>
              <div className="p-5 max-w-sm mx-auto bg-white rounded-lg shadow-lg">
                <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900">Conférence Annuelle</h5>

                <div className="flex items-center text-gray-600 mb-4">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                  </svg>
                  <span>{InfoDate}</span>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  <span className={`px-2 py-1 text-xs font-medium  text-white bg-${infoColor}-400 rounded`}>{InfoTitle}</span>
                </div>

                <div className="flex justify-end space-x-2 mt-4">

                  <button onClick={() => setEventClicks(false)}
                    className="px-3 py-1.5 text-sm bg-gray-400 text-white rounded hover:bg-gray-500"
                  >
                    Close
                  </button>
                  {user.role === 'tuteur' && (
                    <button onClick={handleDelete} disabled={loading}
                      className="px-3 py-1.5 text-sm bg-red-400 text-white rounded hover:bg-red-500"
                    >
                      Remove
                    </button>
                  )}

                </div>
              </div>
            </div>
          </div>
        </div>

      )}

      <div className="lg:flex block ">
        {user.role == 'tuteur' && (

          <div className={`absolute lg:relative block  lg:flex `} style={{ zIndex: 7 }}
          >
            <DashboardNav id_={2} />
          </div>
        )}
        {showAlert && (
          <Alert
            type={type}
            title={title}
            message={message}
            onClose={() => setShowAlert(false)}
          />
        )}
        <div className="w-full m-8 p-4 bg-white rounded-2xl shadow-lg cursor-pointer h-full">
          <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            events={events}
            dateClick={handleDateClick}
            eventClick={handleEventClick}
            eventDidMount={(info) => {
              info.el.style.backgroundColor = info.backgroundColor;
            }}
            displayEventTime={true}
          />
        </div>

      </div>
      {user.role === 'etudiant' && (
        <>
          {isEvantRed && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded shadow-lg text-center">
                <h2 className="text-lg font-semibold mb-4">Alerte</h2>
                <p>Professeur introuvable !</p>
                <button
                  onClick={() => setIsEvantRed(false)}
                  className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
                >
                  Fermer
                </button>
              </div>
            </div>
          )}
          <h3 className="font-medium text-gray-800 mb-3">Available times</h3>
          <div className="grid grid-cols-3 gap-2">
            {Array.isArray(availableTimesArray) && availableTimesArray.length > 0 ? (
              availableTimesArray.map((time, index) => (
                <button
                  key={index}
                  id={time}
                  onClick={(e) => setTimeReservation(e.target.id)}
                  className={`border border-red-300  font-medium rounded py-2 text-center w-full ${timeReservation === time ? 'bg-red-400 text-white shadow-md' : 'bg-white'}`}
                >
                  {time}
                </button>
              ))
            ) : (
              <p>No available times</p>
            )}

          </div>
          <h3 className="font-medium text-gray-800 mt-8 mb-4">Choisissez une durée de réservation</h3>
          <div className="grid grid-cols-2 gap-3 mb-8">

            {durationOption.map((time, index) => (
              <button
                key={index}
                id={time.time}
                onClick={(e) => setTime(e.target.id)}
                className={`border border-red-300  font-medium rounded py-2 text-center transition duration-200 
            ${times === time.time.toString() ? 'bg-red-400 text-white shadow-md' : 'bg-white hover:bg-red-50'}`}
              >
                {time.time} hour
              </button>
            ))}

          </div>
          <div className="flex justify-between items-center pt-4 border-t mb-12 border-gray-200">
            <div>
              <p className="font-medium">Selected session:</p>
              <p className="text-gray-600">{getDateReserve} at {timeReservation}({times} hour)</p>
            </div>
            <button onClick={() => setIsClikConfme(true)} className="bg-red-500 hover:bg-red-600 text-white px-6 py-2  rounded-md font-medium transition-colors">
              Confirm
            </button>
          </div>
        </>
      )}
      {isClikConfme && (

        <form onSubmit={handleReservation} className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 text-center">
            <h2 className="text-xl font-semibold text-yellow-600 mb-4">Payment Required</h2>
            <p className="text-gray-700 mb-6">
              To complete your reservation, you need to proceed with the payment.
            </p>
            <div className="flex justify-center gap-4">
              <div onClick={() => setIsClikConfme(false)}

                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-xl"
              >
                Annuler
              </div>
              <button
                className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded-xl"
              >
                Continuer
              </button>
            </div>
          </div>
        </form>

      )}
      {isOpenPoupupDate && (
        <div id="modal" className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full transform transition-all scale-100 duration-300 ease-out hover:scale-105">
            <p id="modalMessage" className="text-lg text-gray-800 font-semibold mb-4">
              YO CHOSE DATE {getDateReserve}
            </p>
            <button
              onClick={() => setIsOpenPoupupDate(false)}
              id="modalClose"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 focus:outline-none transition duration-200 transform active:scale-95"
            >
              Ajouter
            </button>
          </div>
        </div>
      )}

    </>
  );
}

export default MyFullCalendar;
