import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import SignIn from './Components/SignIn'
import SignUp from './Components/SignUp'
import { Toaster, toast } from 'sonner'
import Home_Page from './Pages/Home_Page';

function App() {

  return (
    <>
    <Toaster richColors  position="top-center" />
    <Router>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home" element={<Home_Page />} />
      </Routes>
    </Router>
    </>
  )
}

export default App
