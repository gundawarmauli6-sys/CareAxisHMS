import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import axios from '../api/axios'

function EditPatient() {
  const { id } = useParams()
  const navigate = useNavigate()
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
    registration_date: '',
  })
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [toastMessage, setToastMessage] = useState(null)

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get(`/patients/${id}`)
        const p = res.data
        let fullName = p.name || ''
        setFormData({
          fullName,
          age: p.age ?? '',
          weight: p.weight ?? '',
          height: p.height ?? '',
          married: p.married ?? false,
          allergies: p.allergies || '',
          contact_details: p.contact_details || '',
          email: p.email || '',
          phone: p.phone || '',
          date_of_birth: p.date_of_birth || '',
          address: p.address || '',
          registration_date: p.registration_date || '',
        })
      } catch (err) {
        console.error('Error fetching patient:', err)
      }
    }
    fetch()
  }, [id])

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
      registration_date: formData.registration_date || null,
    }

    setSubmitting(true)
    try {
      await axios.put(`/patients/${id}`, payload)
      setToastMessage('Patient Updated Successfully')
      setTimeout(() => {
        navigate('/records', { state: { toastMessage: 'Patient Record Updated Successfully' } })
      }, 500)
    } catch (err) {
      console.error('Error updating patient:', err)
      setSubmitting(false)
    }
  }

  return (
    <div className="page-wrapper">

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

      <div className="back-link-row mb-4">
        <Link to="/records" className="back-link">
          <svg className="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
          Back to Records
        </Link>
      </div>

      <div className="form-card">

        <div className="form-card-header">
          <div className="form-card-header-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
          </div>
          <div>
            <h2>Edit Patient Information</h2>
            <p>Update patient details below and save changes</p>
          </div>
        </div>

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
                <label className="form-label">Registration Date</label>
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
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                {submitting ? 'Updating…' : 'Update Patient'}
              </button>
              <button type="button" className="btn btn-outline" onClick={() => navigate('/records')}>Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default EditPatient
