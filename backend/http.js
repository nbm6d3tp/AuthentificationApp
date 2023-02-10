import axios from 'axios';

const API_KEY = 'AIzaSyBKX6ns4_iEehKHo8I7xhc25EXLpnY9QS4';
export async function signUp(email, password) {
  const response = await axios.post(
    'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + API_KEY,
    {email: email, password: password, returnSecureToken: true},
  );
  return response.data.idToken;
}

export async function signIn(email, password) {
  const response = await axios.post(
    'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' +
      API_KEY,
    {email: email, password: password, returnSecureToken: true},
  );
  return response.data.idToken;
}
