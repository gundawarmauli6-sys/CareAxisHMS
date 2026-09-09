import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import axios from '../api/axios'

function PatientRecords() {
  const location = useLocation()
  const [patients, setPatients] = useState([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(false)
  const [deleteModal, setDeleteModal] = useState(null)
  const [toastMessage, setToastMessage] = useState(location.state?.toastMessage || null)
  const [viewMode, setViewMode] = useState('all')
  const [selectedMonth, setSelectedMonth] = useState('')

  const months = [
    { value: '01', label: 'January' },
    { value: '02', label: 'February' },
    { value: '03', label: 'March' },
    { value: '04', label: 'April' },
    { value: '05', label: 'May' },
    { value: '06', label: 'June' },
    { value: '07', label: 'July' },
    { value: '08', label: 'August' },
    { value: '09', label: 'September' },
    { value: '10', label: 'October' },
    { value: '11', label: 'November' },
    { value: '12', label: 'December' },
  ]

  useEffect(() => {
    if (location.state?.toastMessage) {
      setToastMessage(location.state.toastMessage)
      const timer = setTimeout(() => setToastMessage(null), 3500)
      return () => clearTimeout(timer)
    }
  }, [location.state])

  const getTodayDate = () => {
    const today = new Date()
    const yyyy = today.getFullYear()
    const mm = String(today.getMonth() + 1).padStart(2, '0')
    const dd = String(today.getDate()).padStart(2, '0')
    return `${yyyy}-${mm}-${dd}`
  }

  const fetchPatients = async (mode = viewMode, month = selectedMonth) => {
    try {
      setLoading(true)
      let url = '/patients'
      if (mode === 'today') {
        url = `/patients?today=true&date=${getTodayDate()}`
      } else if (mode === 'month' && month) {
        url = `/patients?month=${month}`
      }
      const res = await axios.get(url)
      setPatients(res.data)
    } catch (err) {
      console.error('Error fetching patients:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchPatients(viewMode, selectedMonth) }, [viewMode, selectedMonth])

  const confirmDelete = (id, name) => {
    setDeleteModal({ id, name })
  }

  const handleDelete = async () => {
    if (!deleteModal) return
    const idToDelete = deleteModal.id
    try {
      // Instantly update local state so continuous serial numbers update immediately
      setPatients(prev => prev.filter(p => p.id !== idToDelete))
      setDeleteModal(null)
      await axios.delete(`/patients/${idToDelete}`)
      fetchPatients(viewMode, selectedMonth)
    } catch (err) {
      console.error('Error deleting patient:', err)
      fetchPatients(viewMode, selectedMonth)
    }
  }

  const filtered = patients.filter((p) => {
    const name = p.name || `${p.first_name || ''} ${p.last_name || ''}`
    const s = search.toLowerCase()
    return name.toLowerCase().includes(s) || (p.phone || '').includes(s) || (p.contact_details || '').includes(s)
  })

  return (
    <div className="page-wrapper">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="toast-container">
          <div className="toast-notification success">
            <svg className="toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            <span>{toastMessage}</span>
          </div>
        </div>
      )}

      {/* Page Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Patient Records</h1>
          <p className="page-subtitle">
            {patients.length} patient{patients.length !== 1 ? 's' : ''} {viewMode === 'today' ? 'registered today' : 'registered'}
          </p>
        </div>
        <Link to="/" className="btn btn-primary">
          <svg className="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Add Patient
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="stats-bar">
        <div className="stat-card">
          <div className="stat-icon-wrap blue">
            <svg className="stat-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </div>
          <div className="stat-info">
            <span className="stat-value">{patients.length}</span>
            <span className="stat-label">
              {viewMode === 'today' ? "Today's Count" : (viewMode === 'month' ? 'Monthly Count' : 'Total Patients')}
            </span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon-wrap teal">
            <svg className="stat-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
          </div>
          <div className="stat-info">
            <span className="stat-value">{patients.filter(p => p.phone || p.contact_details).length}</span>
            <span className="stat-label">With Contact Info</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon-wrap violet">
            <svg className="stat-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" />
              <path d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" />
              <line x1="19" y1="8" x2="19" y2="14" />
              <line x1="22" y1="11" x2="16" y2="11" />
            </svg>
          </div>
          <div className="stat-info">
            <span className="stat-value">{filtered.length}</span>
            <span className="stat-label">{search ? 'Search Results' : 'Active Records'}</span>
          </div>
        </div>
      </div>

      {/* Filter Controls */}
      <div className="filter-controls mb-6" style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
        <div className="radio-group" style={{ margin: 0 }}>
          <label className="radio-option">
            <input
              type="radio"
              name="viewMode"
              id="radio-today"
              checked={viewMode === 'today'}
              onChange={() => setViewMode('today')}
            />
            Today's Patients
          </label>
          <label className="radio-option">
            <input
              type="radio"
              name="viewMode"
              id="radio-all"
              checked={viewMode === 'all'}
              onChange={() => setViewMode('all')}
            />
            All Patient Records
          </label>
          <label className="radio-option">
            <input
              type="radio"
              name="viewMode"
              id="radio-month"
              checked={viewMode === 'month'}
              onChange={() => setViewMode('month')}
            />
            Month Wise Records
          </label>
        </div>
        
        {viewMode === 'month' && (
          <select 
            className="form-input" 
            style={{ width: 'auto', padding: '0.4rem 1rem' }} 
            value={selectedMonth} 
            onChange={(e) => setSelectedMonth(e.target.value)}
          >
            <option value="">Select Month...</option>
            {months.map(m => (
              <option key={m.value} value={m.value}>{m.label}</option>
            ))}
          </select>
        )}
      </div>

      {/* Table Card */}
      <div className="card">
        <div className="table-header">
          <span className="table-header-title">
            {viewMode === 'today' ? "Today's Patients" : (viewMode === 'month' ? 'Month Wise Patients' : 'All Patients')}
          </span>
          <div className="search-bar">
            <svg className="search-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              placeholder="Search by name or phone…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="empty-state">
            <svg className="empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <line x1="17" y1="11" x2="23" y2="11" />
            </svg>
            <h4>
              {viewMode === 'today'
                ? "No patients registered today."
                : (viewMode === 'month' ? "No records found for selected month." : "No Records Found")}
            </h4>
            <p>
              {viewMode === 'today'
                ? "No patients registered today."
                : (search ? 'Try different search keywords.' : 'Register your first patient to get started.')}
            </p>
          </div>
        ) : (
          <div className="table-wrapper">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Sr. No.</th>
                  <th>Patient Name</th>
                  <th>Contact Details</th>
                  <th>Registration Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((patient, index) => {
                  const fullName = patient.name || `${patient.first_name || ''} ${patient.last_name || ''}`.trim() || 'Unknown'
                  return (
                    <tr key={patient.id}>
                      <td className="sr-no-cell">{index + 1}</td>
                      <td>
                        <Link to={`/patients/${patient.id}`} className="patient-name-link">
                          {fullName}
                        </Link>
                      </td>
                      <td className="phone-cell">{patient.contact_details || patient.phone || '—'}</td>
                      <td>{patient.registration_date || '—'}</td>
                      <td>
                        <div className="actions-cell">
                          {/* View */}
                          <Link to={`/patients/${patient.id}`} className="btn-icon view" title="View Details">
                            <svg className="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                              <circle cx="12" cy="12" r="3" />
                            </svg>
                          </Link>
                          {/* Edit */}
                          <Link to={`/patients/edit/${patient.id}`} className="btn-icon edit" title="Edit">
                            <svg className="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                              <path d="M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                            </svg>
                          </Link>
                          {/* Delete */}
                          <button className="btn-icon delete" title="Delete" onClick={() => confirmDelete(patient.id, fullName)}>
                            <svg className="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="3 6 5 6 21 6" />
                              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteModal && (
        <div className="modal-overlay" onClick={() => setDeleteModal(null)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <svg style={{ width: '3rem', height: '3rem', color: 'var(--error)', margin: '0 auto 1rem' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="15" y1="9" x2="9" y2="15" />
              <line x1="9" y1="9" x2="15" y2="15" />
            </svg>
            <h3>Delete Patient?</h3>
            <p>Are you sure you want to delete this patient?</p>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
              Record: <strong>{deleteModal.name}</strong>
            </p>
            <div className="modal-actions">
              <button className="btn btn-outline" onClick={() => setDeleteModal(null)}>Cancel</button>
              <button className="btn btn-danger-outline" onClick={handleDelete}>
                <svg className="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="3 6 5 6 21 6" />
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                </svg>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default PatientRecords
