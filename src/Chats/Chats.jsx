import { useState, useEffect } from "react";
import Pusher from "pusher-js";
import '../assets/js/index';
import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api';

const token = localStorage.getItem('token');
const user = localStorage.getItem('user');
const parsedToken = JSON.parse(user);

function App() {

  const [username, setUsername] = useState('mohamed');
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [receive_id, setreceive_id] = useState(45);
  const [sender, setSender] = useState(parsedToken.role);

  useEffect(() => {
    axios.get(`${API_URL}/messages/${receive_id}`, {
      headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
      }
  })

  .then((response) => {    
    console.log(response.data.message);
    
      setMessages(response.data.message);
  })

    Pusher.logToConsole = true;
    const pusher = new Pusher('622537c1842edf6db17e', {
      cluster: 'eu'
    });


    const channel = pusher.subscribe('forsaTaalm-development');
    channel.bind('message', function (data) {
      setMessages(prevMessages => [...prevMessages, data]);
    });
    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  },[]);

  const submit = async e => {
    e.preventDefault();
  
    try {
        const response = await fetch(`${API_URL}/messages/${receive_id}`, {
            method: 'POST',
            headers: { 
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username,
                sender,
                message,
                receiver_id: receive_id  
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Something went wrong');
        }

        const data = await response.json();    
        setMessage('');
    } catch (error) {
        console.error('Erreur lors de l\'envoi du message:', error);
    }
};
  return (
    <div className="bg-gray-100 h-screen flex items-center justify-center">
      <div className="flex h-[600px] w-full max-w-6xl mx-auto bg-white border border-gray-200 shadow-lg">
        {/* Sidebar */}
        <div className="w-80 border-r border-gray-200 flex flex-col">
          <div className="p-4 border-b border-gray-200">
            <h1 className="text-lg font-bold text-blue-900">Messages</h1>
            <div className="mt-4 relative">
              <input
                type="text"
                placeholder="Search here..."
                className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none"
              />
              <div className="absolute left-3 top-2.5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="p-4 border-b border-gray-200">
            <h2 className="text-sm font-medium text-gray-500 mb-2">Groups</h2>
            <div className="flex items-center py-2 px-1 hover:bg-gray-50 rounded-lg cursor-pointer">
              <div className="w-10 h-10 rounded-full bg-blue-600 flex-shrink-0"></div>
              <div className="ml-3 flex-grow">
                <p className="text-sm font-medium">Class History VII-A</p>
                <p className="text-xs text-gray-400 truncate">Lorem ipsum dolor sit amet...</p>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-xs text-gray-400">12:45 PM</span>
                <span className="bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs mt-1">
                  2
                </span>
              </div>
            </div>

            <div className="flex items-center py-2 px-1 hover:bg-gray-50 rounded-lg cursor-pointer">
              <div className="w-10 h-10 rounded-full bg-orange-500 flex-shrink-0"></div>
              <div className="ml-3 flex-grow">
                <p className="text-sm font-medium">Class VII-A</p>
                <p className="text-xs text-gray-400 truncate">Lorem ipsum dolor sit amet...</p>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-xs text-gray-400">12:45 PM</span>
                <span className="bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs mt-1">
                  2
                </span>
              </div>
            </div>

            <div className="flex items-center py-2 px-1 hover:bg-gray-50 rounded-lg cursor-pointer">
              <div className="w-10 h-10 rounded-full bg-yellow-400 flex-shrink-0"></div>
              <div className="ml-3 flex-grow">
                <p className="text-sm font-medium">All Student VII</p>
                <p className="text-xs text-gray-400 truncate">Lorem ipsum dolor sit amet...</p>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-xs text-gray-400">12:45 PM</span>
              </div>
            </div>
          </div>

          <div className="p-4 border-b border-gray-200 flex-grow overflow-y-auto">
            <h2 className="text-sm font-medium text-gray-500 mb-2">Chats</h2>
            <div className="flex items-center py-2 px-1 hover:bg-gray-50 rounded-lg cursor-pointer bg-gray-100">
              <div className="w-10 h-10 rounded-full bg-purple-300 flex-shrink-0"></div>
              <div className="ml-3 flex-grow">
                <p className="text-sm font-medium">{username}</p>
                <p className="text-xs text-gray-400 truncate">Lorem ipsum dolor sit amet...</p>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-xs text-gray-400">12:45 PM</span>
                <span className="bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs mt-1">
                  2
                </span>
              </div>
            </div>

            <div className="flex items-center py-2 px-1 hover:bg-gray-50 rounded-lg cursor-pointer">
              <div className="w-10 h-10 rounded-full bg-purple-300 flex-shrink-0"></div>
              <div className="ml-3 flex-grow">
                <p className="text-sm font-medium">Tony Soap</p>
                <p className="text-xs text-gray-400 truncate">Lorem ipsum dolor sit amet...</p>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-xs text-gray-400">12:45 PM</span>
                <span className="bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs mt-1">
                  2
                </span>
              </div>
            </div>

            <div className="flex items-center py-2 px-1 hover:bg-gray-50 rounded-lg cursor-pointer">
              <div className="w-10 h-10 rounded-full bg-purple-300 flex-shrink-0"></div>
              <div className="ml-3 flex-grow">
                <p className="text-sm font-medium">Karen Hope</p>
                <p className="text-xs text-gray-400 truncate">Lorem ipsum dolor sit amet...</p>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-xs text-gray-400">12:45 PM</span>
              </div>
            </div>
          </div>

          <div className="p-4">
            <button className="w-full py-2 bg-gray-100 hover:bg-gray-200 text-indigo-600 font-medium rounded-lg">
              View More
            </button>
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-grow flex flex-col">
          {/* Chat Header */}
          <div className="px-4 py-3 flex items-center border-b border-gray-200">
            <div className="w-10 h-10 rounded-full bg-purple-300 flex-shrink-0"></div>
            <div className="ml-3">
              <p className="font-medium" >{username}</p>
              <p className="font-medium">{receive_id}</p>

              <div className="flex items-center">
                <div className="w-2.5 h-2.5 bg-green-500 rounded-full mr-1"></div>
                <span className="text-xs text-gray-500">Online</span>
              </div>
            </div>
            <div className="ml-auto flex items-center space-x-4">
              <button className="text-gray-400 hover:text-gray-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
              </button>
              <buRtton className="text-gray-400 hover:text-gray-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                  />
                </svg>
              </buRtton>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-grow p-4 overflow-y-auto">
      {messages.map((msg, index) => {        
    if (msg.sender == 'etudiant') {
      return (
        <div
          key={index}
          className={`mb-4 w-28 ml-auto`}
        >
          <div
            className={`p-3 w-20 rounded-lg bg-indigo-600 text-left text-white`}
          >
            <p className={`text-left`}>
              {msg.message}
            </p>
          </div>
          <p className={`text-xs text-gray-400  text-left`}>
            {msg.timestamp || '12:45 PM'}
          </p>
        </div>
      );
    }else{
        return (
          <div
            key={index}
            className={`mb-4 w-28  mr-auto`}
          >
            <div
              className={`p-3 rounded-lg bg-gray-100`}
            >
              <p className={`text-sm text-right`}>
                {msg.message}
              </p>
            </div>
            <p className={`text-xs text-gray-400 mt-1text-right `}>
              {msg.timestamp || '12:45 PM'}
            </p>
          </div>
        );
    }
    
      })}
    </div>
  

          {/* Input Area */}
          <form onSubmit={submit} className="p-4 border-t border-gray-200">
            <div className="flex">
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
                placeholder="Type a message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
             
              <button
                type="submit"
                className="ml-2 bg-blue-600 text-white px-4 py-2 rounded-full"
              >
                Send
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
export default App;
