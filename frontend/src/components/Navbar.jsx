import { Link, useLocation } from 'react-router-dom'

function Navbar() {
  const location = useLocation()
  const path = location.pathname

  const isRegistrationActive = path === '/' || path === '/register' || path === '/patients/register'
  const isRecordsActive = path === '/records' || path === '/patients'

  return (
    <nav className="navbar">
      <Link to="/" className="nav-brand">
        <div className="logo-box">
          <svg className="logo-icon" viewBox="0 0 24 24">
            <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
          </svg>
        </div>
        <span className="nav-title">CareAxis HMS</span>
      </Link>
      <div className="nav-links">
        {/* 1st Page: Registration */}
        <Link
          to="/"
          className={`nav-link ${isRegistrationActive ? 'active' : ''}`}
        >
          <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="8.5" cy="7" r="4" />
            <line x1="20" y1="8" x2="20" y2="14" />
            <line x1="23" y1="11" x2="17" y2="11" />
          </svg>
          Registration Page
        </Link>

        {/* 2nd Page: Records */}
        <Link
          to="/records"
          className={`nav-link ${isRecordsActive ? 'active' : ''}`}
        >
          <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
          Patient Records
        </Link>
      </div>
    </nav>
  )
}

export default Navbar
