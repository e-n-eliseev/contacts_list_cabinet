import { useEffect, useState } from 'react';
import './App.scss';
import { onAuthStateChanged } from "@firebase/auth";
import { auth } from "./services/firebase";
import { Route, Routes } from 'react-router-dom';
import MainPage from './components/mainPage/MainPage';
import PageNotFound from './components/notFound/404';
import NavBar from './components/navigation/NavBar';
import { PublicRoute } from './components/publicRoute/PublicRoute';
import { PrivateRoute } from './components/privateRoute/PrivateRoute';
import LoginPage from './components/logIn/LoginPage';
import Contacts from './components/contacts/Contacts';

function App() {
  //локально сохраняем статус авторизации
  const [authed, setAuthed] = useState<boolean>(false);
  //обработчики изменения состояния авторизации в firebase
  const handleLogin = (): void => {
    setAuthed(true);
  };
  const handleLogout = (): void => {
    setAuthed(false);
  };
  //подписываемся на изменение данных о пользователях в firebase
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        handleLogin();
      } else {
        handleLogout();
      }
    });
    return unsubscribe;
  }, []);

  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<MainPage authed={authed} />} />
        <Route path="/login" element={<PublicRoute authed={authed} />}>
          <Route path="" element={<LoginPage />} />
        </Route>
        <Route path="/signup" element={<PublicRoute authed={authed} />}>
          <Route path="" element={<LoginPage authed />} />
        </Route>
        <Route path="/contacts" element={<PrivateRoute authed={authed} />}>
          <Route path="" element={<Contacts />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
