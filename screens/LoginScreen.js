import AuthContent from '../components/Auth/AuthContent';
import {signIn} from '../backend/http';
import {useState} from 'react';
import {useDispatch} from 'react-redux';
import {setAuthentification} from '../redux/authentificationSlice';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import {storeData} from '../backend/asyncStore';

function LoginScreen() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  async function authenticateHandler({email, password}) {
    try {
      setIsLoading(true);
      const idToken = await signIn(email, password);
      storeData(idToken);
      dispatch(setAuthentification(idToken));
    } catch (err) {
      Alert.alert('An error occurred while sign in');
      setIsLoading(false);
    }
  }

  if (isLoading) {
    return <LoadingOverlay />;
  }
  return <AuthContent onAuthenticate={authenticateHandler} isLogin />;
}

export default LoginScreen;
