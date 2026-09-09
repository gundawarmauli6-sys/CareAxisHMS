import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from '../api/axios'

function RegisterPatient() {
  const navigate = useNavigate()

  const getTodayDate = () => {
    const today = new Date()
    const yyyy = today.getFullYear()
    const mm = String(today.getMonth() + 1).padStart(2, '0')
    const dd = String(today.getDate()).padStart(2, '0')
    return `${yyyy}-${mm}-${dd}`
  }

  const [formData, setFormData] = useState({
    fullName: '',
    age: '',
    weight: '',
    height: '',
    married: false,
    allergies: '',
    contact_details: '',
    email: '',
    phone: '',
    date_of_birth: '',
    address: '',
    registration_date: getTodayDate(),
  })
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [totalPatientsToday, setTotalPatientsToday] = useState(0)
  const [toastMessage, setToastMessage] = useState(null)

  useEffect(() => {
    const fetchTodayStats = async () => {
      try {
        const todayStr = getTodayDate()
        const res = await axios.get(`/patients?date=${todayStr}`)
        setTotalPatientsToday(res.data.length)
      } catch (err) {
        console.error('Error fetching today stats:', err)
      }
    }
    fetchTodayStats()
  }, [])

  const set = (key, val) => setFormData(prev => ({ ...prev, [key]: val }))

  const validate = () => {
    const e = {}
    if (!formData.fullName.trim()) e.fullName = 'Name is required'
    if (formData.age === '' || isNaN(formData.age) || Number(formData.age) < 0) e.age = 'Valid age required'
    if (formData.weight === '' || isNaN(formData.weight) || Number(formData.weight) < 0) e.weight = 'Valid weight required'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return

    const payload = {
      name: formData.fullName.trim(),
      age: parseInt(formData.age) || 0,
      weight: parseFloat(formData.weight) || 0,
      height: parseFloat(formData.height) || 0,
      married: formData.married,
      allergies: formData.allergies.trim() || null,
      contact_details: formData.contact_details.trim() || null,
      email: formData.email.trim() || null,
      phone: formData.phone.trim() || null,
      date_of_birth: formData.date_of_birth || null,
      address: formData.address.trim() || null,
      registration_date: formData.registration_date || getTodayDate(),
    }

    setSubmitting(true)
    try {
      await axios.post('/patients', payload)
      setToastMessage('Patient Registered Successfully')
      setTimeout(() => {
        navigate('/records', { state: { toastMessage: 'Patient Registered Successfully' } })
      }, 500)
    } catch (err) {
      console.error('Error creating patient:', err)
      setSubmitting(false)
    }
  }

  return (
    <div className="page-wrapper">
      {/* Toast popup */}
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

      {/* Dashboard Widget */}
      <div className="stats-bar mb-6">
        <div className="stat-card">
          <div className="stat-icon-wrap teal">
            <svg className="stat-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
          </div>
          <div className="stat-info">
            <span className="stat-value">{totalPatientsToday}</span>
            <span className="stat-label">Total Patients Today</span>
          </div>
        </div>
      </div>

      <div className="form-card">
        {/* Card Header */}
        <div className="form-card-header">
          <div className="form-card-header-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="8.5" cy="7" r="4" />
              <line x1="20" y1="8" x2="20" y2="14" />
              <line x1="23" y1="11" x2="17" y2="11" />
            </svg>
          </div>
          <div>
            <h2>Register New Patient</h2>
            <p>Fill in the details below to add a new patient record</p>
          </div>
        </div>

        {/* Card Body */}
        <div className="form-card-body">
          <form onSubmit={handleSubmit}>
            <div className="form-grid">

              <div className="form-group full">
                <label className="form-label required">Full Name</label>
                <input className={`form-input ${errors.fullName ? 'error' : ''}`} placeholder="e.g. John Doe" value={formData.fullName} onChange={(e) => set('fullName', e.target.value)} />
                {errors.fullName && <span className="error-msg">{errors.fullName}</span>}
              </div>

              <div className="form-group">
                <label className="form-label required">Age</label>
                <input className={`form-input ${errors.age ? 'error' : ''}`} type="number" placeholder="e.g. 34" value={formData.age} onChange={(e) => set('age', e.target.value)} />
                {errors.age && <span className="error-msg">{errors.age}</span>}
              </div>

              <div className="form-group">
                <label className="form-label required">Weight (KG)</label>
                <input className={`form-input ${errors.weight ? 'error' : ''}`} type="number" step="0.1" placeholder="e.g. 68.5" value={formData.weight} onChange={(e) => set('weight', e.target.value)} />
                {errors.weight && <span className="error-msg">{errors.weight}</span>}
              </div>

              <div className="form-group">
                <label className="form-label">Height (CM)</label>
                <input className="form-input" type="number" step="0.1" placeholder="e.g. 175" value={formData.height} onChange={(e) => set('height', e.target.value)} />
              </div>

              <div className="form-group">
                <label className="form-label">Today's Date</label>
                <input className="form-input" type="date" value={formData.registration_date} onChange={(e) => set('registration_date', e.target.value)} />
              </div>

              <div className="form-group">
                <label className="form-label">Date of Birth</label>
                <input className="form-input" type="date" value={formData.date_of_birth} onChange={(e) => set('date_of_birth', e.target.value)} />
              </div>

              <div className="form-group full">
                <label className="form-label">Married</label>
                <div className="radio-group">
                  <label className="radio-option">
                    <input type="radio" name="married" checked={formData.married === true} onChange={() => set('married', true)} />
                    Yes
                  </label>
                  <label className="radio-option">
                    <input type="radio" name="married" checked={formData.married === false} onChange={() => set('married', false)} />
                    No
                  </label>
                </div>
              </div>

              <div className="form-group full">
                <label className="form-label">Allergies</label>
                <input className="form-input" placeholder="e.g. Penicillin, Pollen (leave blank if none)" value={formData.allergies} onChange={(e) => set('allergies', e.target.value)} />
              </div>

              <div className="form-group full">
                <label className="form-label">Contact Details</label>
                <input className="form-input" placeholder="Emergency contact name and number" value={formData.contact_details} onChange={(e) => set('contact_details', e.target.value)} />
              </div>

              <div className="form-group">
                <label className="form-label">Email</label>
                <input className="form-input" type="email" placeholder="patient@email.com" value={formData.email} onChange={(e) => set('email', e.target.value)} />
              </div>

              <div className="form-group">
                <label className="form-label">Phone</label>
                <input className="form-input" placeholder="+91 98765 43210" value={formData.phone} onChange={(e) => set('phone', e.target.value)} />
              </div>

              <div className="form-group full">
                <label className="form-label">Address</label>
                <textarea className="form-textarea" placeholder="Street, City, State, PIN" rows="3" value={formData.address} onChange={(e) => set('address', e.target.value)} />
              </div>

            </div>

            <div className="form-actions">
              <button type="submit" className="btn btn-primary" disabled={submitting}>
                <svg className="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
                  <polyline points="17 21 17 13 7 13 7 21" />
                  <polyline points="7 3 7 8 15 8" />
                </svg>
                {submitting ? 'Saving…' : 'Save Patient'}
              </button>
              <button type="button" className="btn btn-outline" onClick={() => navigate('/records')}>Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default RegisterPatient
