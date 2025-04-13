import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import '../assets/style/style.css';
import axios from 'axios';
const API_URL = 'http://127.0.0.1:8000/api';
const token = localStorage.getItem('token');
const user = localStorage.getItem('user');
const parsedToken = JSON.parse(user);
function MyFullCalendar() {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [eventColor, setColer] = useState('');
  const [evantDate, setEvanteDte] = useState('');
  const [titleEvante, setTitleEvante] = useState('');
  const [eventClicks, setEventClicks] = useState(false);
  const [InfoDate, setInfoDate] = useState([]);
  const [InfoTitle, setInfotTitle] = useState([]);
  const [infoColor, setInfoColor] = useState([]);



  // const handleDateClick = (info) => {
  //   alert('Date clicked: ' + info.dateStr);
  // };


  const handleGetdata = async (e) => {
    try {
      axios.get(`${API_URL}/disponibilite`, {
        headers: {
          authorization: `bearer ${token}`,
          'Content-Type': 'application/json'
        },
      })
        .then((response) => {

          let data = response.data;
          const newEvents = data.map((evant, index) => ({
            title: evant.titleEvant,
            date: evant.date,
            color: evant.colorEvant
          }));

          setEvents(newEvents);
        })
    } catch (error) {
      console.error(error);
    }
  }
  console.log(eventColor);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append('date', evantDate);
    formData.append('colorEvant', eventColor);
    formData.append('titleEvant', titleEvante);
    try {
      axios.post(`${API_URL}/disponibilite`, formData, {
        headers: {
          authorization: `bearer ${token}`
        },
        body: formData
      })
        .then((response) => {
          setIsOpen(false)
          console.log(response.data);
          setEvents([
            ...events,
            { title: titleEvante, date: evantDate, color: eventColor },
          ]);
        })
    } catch (error) {
      console.error(error);
      setError('error')
    }
  }
  const handleDateClick = (arg) => {
    setIsOpen(true)
    setEvanteDte(arg.dateStr);
  };

  useEffect(() => {
    handleGetdata()
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


    // alert('Event clicked: ' + info.event.title);
  };

  return (
    <>
      {isOpen && (
        <>

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

                  <button
                    className="px-3 py-1.5 text-sm bg-red-400 text-white rounded hover:bg-red-500"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>

      )}
      <div className="mt-8 cursor-pointer">
        <h2 className="text-2xl font-semibold mb-4">Full Calendar Example</h2>
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          events={events}
          dateClick={handleDateClick}
          eventClick={handleEventClick}
          eventDidMount={(info) => {
            info.el.style.backgroundColor = info.backgroundColor;
          }}
        />
      </div>
    </>
  );
}

export default MyFullCalendar;
