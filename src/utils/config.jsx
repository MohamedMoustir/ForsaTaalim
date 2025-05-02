

const API_URL = 'http://127.0.0.1:8000/api';
const getToken = () => sessionStorage.getItem('token');
const getUser = () => {
  const user = sessionStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

export { API_URL, getToken, getUser };
