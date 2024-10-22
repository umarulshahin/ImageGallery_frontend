import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import SignIn from './Components/SignIn'
import SignUp from './Components/SignUp'
import { Toaster, toast } from 'sonner'
import Home_Page from './Pages/Home_Page';
import ModalManager from './Components/ModalManager';
import { PersistGate } from 'redux-persist/integration/react';
import { appStore, persist } from './Redux/Store';
import { Provider } from "react-redux";
import PrivetRoute from './PrivetRoute';
import AuthPrivetRoute from './AuthPrivetRoute';

function App() {

  return (
    <>
    <Provider store={appStore}>
    <PersistGate loading={null} persistor={persist}>
    <Toaster richColors  position="top-center" />
    <Router>
      <Routes>
        <Route path="/" element={<AuthPrivetRoute><SignIn /></AuthPrivetRoute>} />
        <Route path="/signup" element={<AuthPrivetRoute><SignUp /></AuthPrivetRoute>} />
        <Route path="/home" element={<PrivetRoute><Home_Page /></PrivetRoute>} />
        <Route path='/auth' element={<AuthPrivetRoute><ModalManager /></AuthPrivetRoute>} />
      </Routes>
    </Router>
    </PersistGate>
    </Provider>
    </>
  )
}

export default App
