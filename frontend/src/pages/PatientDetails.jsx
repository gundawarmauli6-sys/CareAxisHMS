import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import axios from '../api/axios'

function PatientDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [patient, setPatient] = useState(null)
  const [deleteModal, setDeleteModal] = useState(false)

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get(`/patients/${id}`)
        setPatient(res.data)
      } catch (err) {
        console.error('Error fetching patient:', err)
      }
    }
    fetch()
  }, [id])

  const handleDelete = async () => {
    try {
      await axios.delete(`/patients/${id}`)
      setDeleteModal(false)
      navigate('/records', { state: { toastMessage: 'Patient Record Deleted Successfully' } })
    } catch (err) {
      console.error('Error deleting patient:', err)
    }
  }

  if (!patient) return (
    <div className="page-wrapper">
      <div className="empty-state">
        <h4>Patient Not Found</h4>
        <p>The requested patient record does not exist.</p>
        <Link to="/records" className="btn btn-primary" style={{ marginTop: '1rem', display: 'inline-flex' }}>← Back to Records</Link>
      </div>
    </div>
  )

  const fullName = patient.name || `${patient.first_name || ''} ${patient.last_name || ''}`.trim() || 'Unknown'
  const initials = fullName.split(' ').map(w => w[0]).join('').substring(0, 2).toUpperCase()

  const fields = [
    { label: 'Age', value: patient.age != null ? `${patient.age} years` : null },
    { label: 'Weight', value: patient.weight != null ? `${patient.weight} kg` : null },
    { label: 'Height', value: patient.height ? `${patient.height} cm` : null },
    { label: 'BMI', value: patient.bmi || null },
    { label: 'Married', value: patient.married != null ? (patient.married ? 'Yes' : 'No') : null, isBadge: true },
    { label: 'Email', value: patient.email },
    { label: 'Phone', value: patient.phone },
    { label: 'Date of Birth', value: patient.date_of_birth },
    { label: 'Registration Date', value: patient.registration_date },
    { label: 'Allergies', value: patient.allergies ? patient.allergies : 'No known allergies' },
    { label: 'Contact Details', value: patient.contact_details },
    { label: 'Address', value: patient.address },
  ]

  return (
    <div className="page-wrapper">
      <div className="back-link-row mb-4">
        <Link to="/records" className="back-link">
          <svg className="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
          Back to Records
        </Link>
      </div>

      <div className="detail-card">
        <div className="detail-header">
          <div className="detail-avatar">{initials}</div>
          <div>
            <div className="detail-name">{fullName}</div>
            <div className="detail-id">Patient ID: #{patient.id}</div>
          </div>
        </div>

        <div className="detail-body">
          <div className="detail-grid">
            {fields.map((f) => (
              <div className="detail-item" key={f.label}>
                <span className="detail-label">{f.label}</span>
                {f.isBadge ? (
                  <span className={`badge-married ${patient.married ? 'yes' : 'no'}`}>
                    {f.value || '—'}
                  </span>
                ) : (
                  <span className={`detail-value ${!f.value ? 'empty' : ''}`}>
                    {f.value || 'Not provided'}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="detail-actions">
          <Link to={`/patients/edit/${patient.id}`} className="btn btn-primary">
            <svg className="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
            Edit Patient
          </Link>
          <button className="btn btn-outline" onClick={() => setDeleteModal(true)} style={{ color: 'var(--error)', borderColor: '#fecaca' }}>
            <svg className="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="3 6 5 6 21 6" />
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
            </svg>
            Delete
          </button>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteModal && (
        <div className="modal-overlay" onClick={() => setDeleteModal(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <svg style={{ width: '3rem', height: '3rem', color: 'var(--error)', margin: '0 auto 1rem' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="15" y1="9" x2="9" y2="15" />
              <line x1="9" y1="9" x2="15" y2="15" />
            </svg>
            <h3>Delete Patient?</h3>
            <p>Are you sure you want to delete this patient?</p>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
              Record: <strong>{fullName}</strong>
            </p>
            <div className="modal-actions">
              <button className="btn btn-outline" onClick={() => setDeleteModal(false)}>Cancel</button>
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

export default PatientDetails
