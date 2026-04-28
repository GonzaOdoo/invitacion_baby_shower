import './App.css'
import cochecito from './assets/baby-stroller.png'
import pooh from './assets/pooh.jpg'
import { useEffect, useRef, useState } from "react"
import bgMusic from './assets/bg.mp3'
import arrow from './assets/arrow.png'

function Section({ children, className = '' }: any) {
  return <section className={`section ${className}`}>{children}</section>
}

function App() {
  const [isHero, setIsHero] = useState(true)

  const pageRef = useRef<HTMLDivElement>(null)
  const [isLastSection, setIsLastSection] = useState(false)

  

  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [muted, setMuted] = useState(true)
  const [introVisible, setIntroVisible] = useState(true)
  const [introClosing, setIntroClosing] = useState(false)

  useEffect(() => {
    const el = pageRef.current
    if (!el) return

    const onScroll = () => {
      const scrollY = el.scrollTop
      const height = el.clientHeight
      const scrollHeight = el.scrollHeight

      setIsHero(scrollY < height * 0.8)

      // 👇 detectar última sección
      setIsLastSection(scrollY + height >= scrollHeight - 10)
    }

    el.addEventListener("scroll", onScroll)
    return () => el.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    const audio = new Audio(bgMusic)
    audio.loop = true
    audio.volume = 0.4
    audio.muted = true

    audioRef.current = audio

    return () => {
      audio.pause()
    }
  }, [])


const toggleSound = () => {
  if (!audioRef.current) return

  const newMuted = !muted
  setMuted(newMuted)

  audioRef.current.muted = newMuted

  if (audioRef.current.paused) {
    audioRef.current.play()
  }
}
const handleStart = () => {
  if (!audioRef.current) return

  audioRef.current.muted = false
  setMuted(false)

  audioRef.current.play().catch(() => {})

  // 👇 primero activás animación
  setIntroClosing(true)

  // 👇 recién después lo removés
  setTimeout(() => {
    setIntroVisible(false)
  }, 1200) // mismo tiempo que tu animación
}
return (
    
    <div className="page" ref={pageRef}>
      {introVisible && (
        <div
          className={`intro ${introClosing ? "hide" : ""}`}
          onClick={handleStart}
        >
          
          <div className="intro-honey">
            <div className="honey-blobs">
              <div className="honey-liquid"></div>

              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="honey-blob" />
              ))}
            </div>
          </div>

          <div className="intro-content">
            <p className="intro-text">Tenés una invitación especial 🍯</p>
            <span className="intro-hint">Tocá para abrir</span>
          </div>

        </div>
      )}
      <button className="sound-btn" onClick={toggleSound}>
      {muted ? "🔇" : "🔊"}
    </button>
    
      <div className={`scroll-indicator ${isLastSection ? "hidden" : "visible"}`}>
        <img src={arrow} alt="Scroll" />
      </div>
      <div className="corner-deco">
        <img src={pooh} alt="" />
      </div>
      <div className="honey-wrapper">
        <div className="honey-blobs">
          <div className="honey-liquid"></div>

          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="honey-blob" />
          ))}
        </div>

        {/* SVG filter */}
        <svg height="0">
          <defs>
            <filter id="goo">
              <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur" />
              <feColorMatrix
                in="blur"
                mode="matrix"
                values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
                result="goo"
              />
            </filter>
          </defs>
        </svg>
      </div>

      <div className="bees">
        <div className="bee-wrap b1">
          <div className="bee">🐝</div>
        </div>

        <div className="bee-wrap b2">
          <div className="bee">🐝</div>
        </div>

        <div className="bee-wrap b3">
          <div className="bee">🐝</div>
        </div>
      </div>
      {/* HERO */}
      <Section className="hero">
        <div className="hero-svg">
          <svg viewBox="0 0 500 200">
            <path
              id="curve"
              d="M50,150 Q250,20 450,150"
              fill="transparent"
            />

            <text>
              <textPath href="#curve" startOffset="50%" textAnchor="middle">
                AMALIA
              </textPath>
            </text>
          </svg>
        </div>
        <div className={`hero-anim ${isHero ? "visible" : "hidden"}`}>
          <img src={cochecito} className="hero-anim" />
        </div>
        <p className="subtitle">está en camino 🍯</p>
      </Section>

      {/* MENSAJE */}
      <Section className="fade-in">
        <p className="message">
          Un pequeño milagro está en camino… 🍯
        </p>

        <p className="event-type">
          Acompañanos en el Baby Shower de Itzel Amalia 
        </p>
      </Section>

      {/* DETALLES */}
      <Section className="details fade-in">
        <div>
          <h3>📅 Fecha</h3>
          <p>3 DE MAYO</p>
        </div>
        <div>
          <h3>⏰ Hora</h3>
          <p>18:00 hs</p>
        </div>
        <div>
          <h3>📍 Lugar</h3>
          <p>Amaro Morón Gimenez 397</p>
        </div>
      </Section>

      {/* FOOTER */}
      <Section className="fade-in">
        <p className="footer"> ¡Solo recordá que es una sorpresa para la madre!</p>
        <p className="footer">¡Te esperamos! 🐻</p>
      </Section>

    </div>
  )
}

export default App