import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import PatientRecords from './pages/PatientRecords'
import RegisterPatient from './pages/RegisterPatient'
import EditPatient from './pages/EditPatient'
import PatientDetails from './pages/PatientDetails'
import IntroScreen from './components/IntroScreen'
import './App.css'

function App() {
  const [showIntro, setShowIntro] = useState(() => {
    // Appears only when the application initially loads, not on every page navigation
    return !sessionStorage.getItem('careaxis_hms_intro_shown')
  })

  const handleIntroComplete = () => {
    setShowIntro(false)
    sessionStorage.setItem('careaxis_hms_intro_shown', 'true')
  }

  return (
    <BrowserRouter>
      {showIntro && <IntroScreen onComplete={handleIntroComplete} />}
      <div className="app-container">
        <Navbar />
        <Routes>
          {/* First page: Registration */}
          <Route path="/" element={<RegisterPatient />} />
          <Route path="/register" element={<RegisterPatient />} />
          <Route path="/patients/register" element={<RegisterPatient />} />

          {/* Second page: Patient Records */}
          <Route path="/records" element={<PatientRecords />} />
          <Route path="/patients" element={<PatientRecords />} />

          {/* Edit & Details */}
          <Route path="/patients/edit/:id" element={<EditPatient />} />
          <Route path="/patients/:id" element={<PatientDetails />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App

