import { useEffect, useState } from 'react'
import './IntroScreen.css'

function IntroScreen({ onComplete }) {
  const [isExiting, setIsExiting] = useState(false)

  useEffect(() => {
    // 4.5 seconds: Start smooth fade & scale-out transition
    const exitTimer = setTimeout(() => {
      setIsExiting(true)
    }, 4500)

    // 5.0 seconds: Exact end of 5-second intro
    const completeTimer = setTimeout(() => {
      if (onComplete) onComplete()
    }, 5000)

    return () => {
      clearTimeout(exitTimer)
      clearTimeout(completeTimer)
    }
  }, [onComplete])

  const handleSkip = () => {
    setIsExiting(true)
    setTimeout(() => {
      if (onComplete) onComplete()
    }, 350)
  }

  return (
    <div
      className={`intro-overlay ${isExiting ? 'intro-exit' : ''}`}
      role="banner"
      aria-label="CareAxis HMS Intro Screen"
    >
      {/* Background ambient lighting effects */}
      <div className="intro-backdrop">
        <div className="intro-glow-orb orb-primary" />
        <div className="intro-glow-orb orb-teal" />
        <div className="intro-grid-pattern" />
      </div>

      <div className="intro-content">
        {/* Phase 1 (0s - 1.5s): Logo Pop-Up & ECG Pulse */}
        <div className="intro-logo-wrapper">
          <div className="intro-logo-box">
            <svg
              className="intro-logo-svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
          </div>

          <div className="intro-brand-header">
            <span className="intro-brand-name">CAREAXIS HMS</span>
            <span className="intro-brand-badge">HOSPITAL SYSTEM</span>
          </div>

          {/* Animated Medical ECG Line */}
          <div className="intro-pulse-line">
            <svg viewBox="0 0 280 24" className="pulse-svg" preserveAspectRatio="none">
              <path
                d="M 0 12 L 60 12 L 75 3 L 85 21 L 95 6 L 105 18 L 115 12 L 280 12"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              />
            </svg>
          </div>
        </div>

        {/* Phase 2 (1.5s - 3.5s): Dynamic Throwing / Swoosh Welcome Words */}
        <div className="intro-title-wrapper">
          <h1 className="intro-headline" aria-label="Welcome to CareAxis HMS System">
            <span className="intro-word word-welcome">WELCOME</span>
            <span className="intro-word word-to">TO</span>
            <span className="intro-word word-careaxis">CAREAXIS</span>
            <span className="intro-word word-hms">HMS</span>
            <span className="intro-word word-system">SYSTEM</span>
          </h1>

          <p className="intro-subcaption">
            Clinical Workflow • Patient Records • Intelligent Healthcare
          </p>
        </div>
      </div>

      {/* 5-second progress bar */}
      <div className="intro-timeline-bar">
        <div className="intro-timeline-fill" />
      </div>

      {/* Skip button for rapid navigation */}
      <button
        type="button"
        className="intro-skip-button"
        onClick={handleSkip}
        title="Skip intro"
      >
        Skip <span>→</span>
      </button>
    </div>
  )
}

export default IntroScreen
