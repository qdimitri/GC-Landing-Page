import { Fragment, useEffect, useRef, useState, type CSSProperties, type FormEvent } from 'react'
import { copy } from './content/copy'
import { reviews } from './content/reviews'

// Prefixes public asset paths with the site's base path (set in vite.config.ts)
const asset = (path: string) => `${import.meta.env.BASE_URL}${path.slice(1)}`

const generalAdmissionSold = 92

const experiencePhotos = [
  { src: asset('/images/725d383a-9536-43c5-935d-846fe91f85bf.jpg'), alt: 'Speaker in front of a 10X backdrop' },
  { src: asset('/images/cbfacb26-b40e-4321-ba8e-e7b5526fcad2.jpg'), alt: 'Speaker on stage in a large ballroom' },
  { src: asset('/images/8e4702ed-98b0-46e0-9b8b-1162961451ce.jpg'), alt: 'Attendees seated at long tables in a ballroom' },
  { src: asset('/images/ee479cd7-b4df-4875-bc33-dfb7d5ba5974.jpg'), alt: 'Round tables filled with attendees' },
  { src: asset('/images/49a4ecf3-abf0-4bc1-a5d0-75a10fd6869d.jpg'), alt: 'Attendees taking notes at the summit' },
  { src: asset('/images/f33e972c-cdaa-4672-b997-5057b8d14824.jpg'), alt: 'Audience in front of the 10X stage and screen' },
]

const shownReviews = reviews.filter((review) => review.rating >= 4)
// Each card is 406px wide plus a 24px gap. The list is repeated until the track is
// always wider than the 1100px window, and the loop shifts by exactly one copy.
const REVIEW_CARD_SPACE = 430
const reviewCopies = shownReviews.length
  ? Math.max(2, Math.ceil(1100 / (shownReviews.length * REVIEW_CARD_SPACE)) + 1)
  : 2
const reviewSlides = Array.from({ length: reviewCopies }, () => shownReviews).flat()

const learnPhotos = [
  { src: asset('/images/725d383a-9536-43c5-935d-846fe91f85bf.jpg'), alt: 'Grant Cardone presenting on stage in front of a 10X backdrop' },
  { src: asset('/images/79e8e670-3f60-4228-a26a-686b9fc6a2c6.jpg'), alt: 'Wealth Creation Formula slide shown at the summit' },
  { src: asset('/images/ff2d10a9-a29f-4bf7-8936-2a86b6b0d88e.jpg'), alt: 'Wide view of the summit room with the 10X stage' },
]

// Same order as copy.speakers.items
const speakerPhotos = [
  asset('/images/429c5b0c-cd93-47e8-b728-853e2a8a5ec8.png'),
  asset('/images/dbf353e9-61b3-4d9f-af1b-79b8f651db0f.png'),
  asset('/images/68c442d79bf2896a971aafa1.png'),
  asset('/images/68c442d74190aa1f4f0f9bc5.png'),
  asset('/images/6ab13b56825a8484f2d5982d.jpg'),
  asset('/images/68c442d747af6606bfdd11dc.png'),
]

const ticketImages = {
  workbook: asset('/images/workbook-mockup-v1-compressed.png'),
  pass: asset('/images/ticket-10x-lanyard-v3-compressed.png'),
}

// Same order as copy.learn.items
const learnIcons = [
  asset('/images/Screenshot-2024-01-26-at-5.32.22-PM.png'),
  asset('/images/Screenshot-2024-01-26-at-1.55.00-PM.png'),
  asset('/images/Screenshot-2024-01-26-at-1.54.56-PM.png'),
  asset('/images/Screenshot-2024-01-26-at-1.55.03-PM.png'),
  asset('/images/Screenshot-2024-01-26-at-1.55.11-PM.png'),
]

// January 22, 2027 at 4:00 PM Eastern (EST, UTC-5)
const EVENT_TIME = Date.UTC(2027, 0, 22, 21, 0, 0)

function getTimeLeft() {
  const diff = Math.max(0, EVENT_TIME - Date.now())
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff / 3600000) % 24),
    minutes: Math.floor((diff / 60000) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  }
}

function Countdown() {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft)

  useEffect(() => {
    const id = setInterval(() => setTimeLeft(getTimeLeft()), 1000)
    return () => clearInterval(id)
  }, [])

  const units = [
    { label: 'DAYS', value: timeLeft.days },
    { label: 'HRS', value: timeLeft.hours },
    { label: 'MIN', value: timeLeft.minutes },
    { label: 'SEC', value: timeLeft.seconds },
  ]

  return (
    <div className="countdown">
      {units.map((unit) => (
        <div className="countdown__unit" key={unit.label}>
          <span
            className={
              unit.label === 'SEC'
                ? 'countdown__value countdown__value--accent'
                : 'countdown__value'
            }
          >
            {String(unit.value).padStart(2, '0')}
          </span>
          <span className="countdown__label">{unit.label}</span>
        </div>
      ))}
    </div>
  )
}

function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [hasStarted, setHasStarted] = useState(false)

  const playWithSound = () => {
    const video = videoRef.current
    if (!video) return
    video.currentTime = 0
    video.muted = false
    Array.from(video.textTracks).forEach((track) => {
      track.mode = 'showing'
    })
    video.play()
    setHasStarted(true)
  }

  return (
    <div className="hero-video">
      <video
        ref={videoRef}
        className="hero-video__media"
        src={asset('/videos/business-summit-lander.mp4')}
        autoPlay
        muted
        loop
        playsInline
        controls={hasStarted}
      >
        <track
          kind="captions"
          src={asset('/videos/business-summit-lander.en.vtt')}
          srcLang="en"
          label="English"
        />
      </video>
      {!hasStarted && (
        <button
          type="button"
          className="hero-video__play"
          aria-label="Play video with sound"
          onClick={playWithSound}
        >
          <svg viewBox="0 0 24 24" width="40" height="40" aria-hidden="true">
            <path d="M8 5v14l11-7z" fill="#fff" />
          </svg>
        </button>
      )}
    </div>
  )
}

function SoldProgress() {
  return (
    <div className="progress">
      <div
        className="progress__fill"
        style={{ width: `${generalAdmissionSold}%` }}
      >
        <span className="progress__label">
          {copy.progressLabel.replace('{percent}', String(generalAdmissionSold))}
        </span>
      </div>
    </div>
  )
}

function ReserveModal({
  isClosing,
  onClose,
  onFadeEnd,
}: {
  isClosing: boolean
  onClose: () => void
  onFadeEnd: () => void
}) {
  const { modal } = copy
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitted, setSubmitted] = useState(false)

  // After a successful submission, close the popup 2 seconds later
  useEffect(() => {
    if (!submitted) return
    const timer = setTimeout(onClose, 2000)
    return () => clearTimeout(timer)
  }, [submitted])

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const value = (name: string) => String(data.get(name) ?? '').trim()
    const nextErrors: Record<string, string> = {}

    if (!value('firstName')) nextErrors.firstName = 'Please enter your first name.'
    if (!value('lastName')) nextErrors.lastName = 'Please enter your last name.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value('email'))) {
      nextErrors.email = 'Please enter a valid email address.'
    }
    if (value('phone').replace(/\D/g, '').length < 10) {
      nextErrors.phone = 'Please enter a valid phone number.'
    }
    if (!data.get('consent')) nextErrors.consent = 'Please agree to continue.'

    setErrors(nextErrors)
    if (Object.keys(nextErrors).length === 0) setSubmitted(true)
  }

  return (
    <div
      className={isClosing ? 'modal-overlay modal-overlay--closing' : 'modal-overlay'}
      onAnimationEnd={(event) => {
        if (isClosing && event.target === event.currentTarget) onFadeEnd()
      }}
      onClick={(event) => {
        // Clicking outside the box closes it
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <div className="modal" role="dialog" aria-modal="true" aria-label={modal.titleLine1}>
        <button type="button" className="modal__close" aria-label="Close" onClick={onClose}>
          ×
        </button>

        <div className="modal__header">
          <p className="modal__eyebrow">{modal.eyebrow}</p>
          <h2 className="modal__title">
            {modal.titleLine1}
            <br />
            {modal.titleLine2Before}
            <span className="modal__red">{modal.titleLine2Red}</span>
            {modal.titleLine2After}
          </h2>
          <p className="modal__date">{copy.eventDate}</p>
        </div>

        <div className="modal__body">
          {submitted ? (
            <p className="modal__success">Submission successful</p>
          ) : (
            <form noValidate onSubmit={handleSubmit}>
              <p className="modal__intro">{modal.intro}</p>

              <input name="firstName" className="modal__input" type="text" placeholder="First name" aria-label="First name" />
              {errors.firstName && <p className="modal__error">{errors.firstName}</p>}

              <input name="lastName" className="modal__input" type="text" placeholder="Last name" aria-label="Last name" />
              {errors.lastName && <p className="modal__error">{errors.lastName}</p>}

              <label className="modal__field">
                <svg className="modal__icon" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" fill="#777" />
                </svg>
                <input name="email" type="email" placeholder="Email" aria-label="Email" />
              </label>
              {errors.email && <p className="modal__error">{errors.email}</p>}

              <label className="modal__field">
                <span className="modal__country" aria-hidden="true">🇺🇸 ▾</span>
                <input name="phone" type="tel" placeholder="Phone" aria-label="Phone" />
              </label>
              {errors.phone && <p className="modal__error">{errors.phone}</p>}

              <label className="modal__consent">
                <input name="consent" type="checkbox" />
                <span>{modal.consent}</span>
              </label>
              {errors.consent && <p className="modal__error">{errors.consent}</p>}

              <button type="submit" className="modal__submit">
                {modal.submit}
              </button>

              <p className="modal__legal">
                {modal.legalBefore}
                <span className="modal__legal-link">{modal.terms}</span>
                {modal.legalMiddle}
                <span className="modal__legal-link">{modal.privacy}</span>
                {modal.legalAfter}
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}

function App() {
  const [modalState, setModalState] = useState<'closed' | 'open' | 'closing'>('closed')
  const experienceRef = useRef<HTMLElement>(null)

  // Moves the flipped background at a different speed from the page as you scroll
  useEffect(() => {
    const updateParallax = () => {
      const section = experienceRef.current
      if (!section) return
      const { top } = section.getBoundingClientRect()
      section.style.setProperty('--parallax-y', `${-top * 0.3}px`)
    }

    updateParallax()
    window.addEventListener('scroll', updateParallax, { passive: true })
    window.addEventListener('resize', updateParallax)
    return () => {
      window.removeEventListener('scroll', updateParallax)
      window.removeEventListener('resize', updateParallax)
    }
  }, [])

  return (
    <>
      <main className="landing">
        <section className="section section--bg-hero section--center section--hero" data-section="HERO">
          {/* Top bar lives inside the hero so it sticks only until the hero ends */}
          <div className="top-bar" data-section="Top Bar">
            <SoldProgress />
            <div className="top-bar__tagline">{copy.tagline}</div>
          </div>
          <p className="hero-date">
            <svg className="hero-date__pin" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 2a7 7 0 0 0-7 7c0 5.2 7 13 7 13s7-7.8 7-13a7 7 0 0 0-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z" fill="#e51f35" />
            </svg>
            <span>{copy.eventDate}</span>
          </p>
          <div className="hero-copy">
            <p>
              <span className="hero-copy__line">Learn The Strategies That Took My Business From</span>
              <span className="hero-copy__line">
                $2M to $750M in Revenue at The 10<span>X</span> Business Summit
              </span>
            </p>
          </div>
          <HeroVideo />
          <nav className="hero-buttons">
            {copy.heroButtons.map((button) => (
              <a key={button.href} className="hero-button" href={button.href}>
                {button.label}
              </a>
            ))}
          </nav>
        </section>
        <section className="section section--learn" id="learn" data-section="LEARN">
          <div className="learn__top">
            <div className="learn__header">
              <p className="learn__eyebrow">{copy.learn.eyebrow}</p>
              <h2 className="learn__heading">{copy.learn.heading}</h2>
            </div>

            {/* Photos are listed twice so the track loops seamlessly */}
            <div className="learn__carousel">
              <div className="learn__track">
                {[...learnPhotos, ...learnPhotos].map((photo, index) => (
                  <img
                    key={`${photo.src}-${index}`}
                    className="learn__slide"
                    src={photo.src}
                    alt={photo.alt}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="learn__items">
            {copy.learn.items.map((item, index) => (
              <div className="learn__item" key={item.title}>
                <img className="learn__icon" src={learnIcons[index]} alt="" />
                <h3 className="learn__title">{item.title}</h3>
                <p className="learn__description">{item.description}</p>
              </div>
            ))}
          </div>
        </section>
        <hr className="section-divider" />

        <section className="section section--speakers" id="speakers" data-section="SPEAKERS">
          <div className="speakers__inner">
            <div className="speakers__header">
              <h2 className="learn__heading">{copy.speakers.heading}</h2>
            </div>

            <div className="speakers__grid">
              {copy.speakers.items.map((speaker, index) => (
                <div className="speakers__card" key={speaker.name}>
                  <img className="speakers__photo" src={speakerPhotos[index]} alt={speaker.name} />
                  <h3 className="speakers__name">{speaker.name}</h3>
                  <p className="speakers__bio">{speaker.bio}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="section section--bg-countdown section--center" id="countdown" data-section="COUNTDOWN">
          <p className="countdown-heading">{copy.countdownHeading}</p>
          <Countdown />
          <SoldProgress />

          <div className="ticket__card" id="tickets">
            <div className="ticket__header">
              <h2 className="ticket__heading">{copy.ticket.heading}</h2>
              <p className="ticket__subheading">
                {copy.ticket.subheadingBefore}
                <strong>{copy.ticket.subheadingBold}</strong>
                {copy.ticket.subheadingAfter}
              </p>
            </div>

            <div className="ticket__body">
              <div className="ticket__visual">
                <img className="ticket__workbook" src={ticketImages.workbook} alt="10X Business Summit workbook" />
                <img className="ticket__pass" src={ticketImages.pass} alt="General admission lanyard ticket" />
              </div>

              <div className="ticket__details">
                <h3 className="ticket__admission">{copy.ticket.admissionTitle}</h3>
                <p className="ticket__retail">
                  {copy.ticket.retailLabel} <s>{copy.ticket.retailPrice}</s>
                </p>
                <p className="ticket__price">{copy.ticket.price}</p>
                <p className="ticket__price-note">{copy.ticket.priceNote}</p>

                <ul className="ticket__features">
                  {copy.ticket.features.map((feature) => (
                    <li className="ticket__feature" key={feature.title}>
                      <svg className="ticket__check" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M9 16.17l-3.5-3.5L4 14.17 9 19.17 20 8.17 18.59 6.76z" fill="#e51f35" />
                      </svg>
                      <div>
                        <strong className="ticket__feature-title">{feature.title}</strong>
                        <p className="ticket__feature-description">{feature.description}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="ticket__guarantee">
              <h3 className="ticket__guarantee-title">{copy.ticket.guaranteeTitle}</h3>
              <p className="ticket__guarantee-text">
                {copy.ticket.guaranteeBefore}
                <strong>{copy.ticket.guaranteeBold}</strong>
              </p>
              <p className="ticket__guarantee-note">{copy.ticket.guaranteeNote}</p>
            </div>
          </div>

          <button type="button" className="hero-button ticket__cta" onClick={() => setModalState('open')}>
            <svg className="ticket__cta-icon" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M11 7L9.6 8.4l2.6 2.6H2v2h10.2l-2.6 2.6L11 17l5-5-5-5zm9 12h-8v2h8c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-8v2h8v14z" fill="#fff" />
            </svg>
            {copy.ticket.ctaLabel}
          </button>

          {modalState !== 'closed' && (
            <ReserveModal
              isClosing={modalState === 'closing'}
              onClose={() => setModalState('closing')}
              onFadeEnd={() => setModalState('closed')}
            />
          )}
        </section>

        <section className="section section--reviews" id="reviews" data-section="REVIEWS">
          <h2 className="reviews__heading">{copy.reviews.heading}</h2>

          <div className="reviews__carousel">
            <div
              className="reviews__track"
              style={{
                '--reviews-shift': `-${100 / reviewCopies}%`,
                width: `${reviewSlides.length * REVIEW_CARD_SPACE}px`,
              } as CSSProperties}
            >
              {reviewSlides.map((review, index) => (
                <article className="reviews__card" key={`${review.name}-${review.date}-${index}`}>
                  <div className="reviews__header">
                    <span className="reviews__avatar" aria-hidden="true">
                      {review.name.split(' ').map((part) => part[0]).join('')}
                    </span>
                    <div>
                      <p className="reviews__author">{review.name}</p>
                      <p className="reviews__date">{review.date}</p>
                    </div>
                  </div>
                  <div className="reviews__stars" aria-label={`${review.rating} out of 5 stars`}>
                    {'★'.repeat(review.rating)}
                  </div>
                  <p className="reviews__text">{review.text}</p>
                  {review.companyReplied && <p className="reviews__reply">Company replied</p>}
                </article>
              ))}
            </div>
          </div>
        </section>

        <section ref={experienceRef} className="section section--flipped" data-section="EXPERIENCE">
          <div className="experience__inner">
            <h2 className="experience__heading">
              {copy.experience.headingBefore}
              <span className="experience__red">{copy.experience.headingRed}</span>
              {copy.experience.headingAfter}
            </h2>

            <div className="experience__grid">
              {experiencePhotos.map((photo) => (
                <img key={photo.src} className="experience__photo" src={photo.src} alt={photo.alt} />
              ))}
            </div>

            <a className="hero-button experience__cta" href="#tickets">
              {copy.experience.ctaLabel}
            </a>
          </div>
        </section>
      </main>
      <footer className="footer" data-section="FOOTER">
        <p className="footer__brand">{copy.footer.brand}</p>
        <nav className="footer__links">
          {copy.footer.links.map((link, index) => (
            <Fragment key={link}>
              {index > 0 && <span className="footer__divider">|</span>}
              <a className="footer__link" href="#">{link}</a>
            </Fragment>
          ))}
        </nav>
        <p className="footer__disclaimer">{copy.footer.disclaimer}</p>
        <p className="footer__text">
          {copy.footer.questions}{' '}
          <a className="footer__link footer__phone" href="tel:+17209243558">{copy.footer.phone}</a>
        </p>
        <p className="footer__text">{copy.footer.address}</p>
        <p className="footer__text">{copy.footer.copyright}</p>
      </footer>
    </>
  )
}

export default App
