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

function App() {

  return (
    <>
    <Provider store={appStore}>
    <PersistGate loading={null} persistor={persist}>
    <Toaster richColors  position="top-center" />
    <Router>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home" element={<Home_Page />} />
        <Route path='/auth' element={<ModalManager />} />
      </Routes>
    </Router>
    </PersistGate>
    </Provider>
    </>
  )
}

export default App
