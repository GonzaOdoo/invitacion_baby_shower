import './App.css'
import cochecito from './assets/baby-stroller.png'
import pooh from './assets/pooh.jpg'
import { useEffect, useRef, useState } from "react"

function Section({ children, className = '' }: any) {
  return <section className={`section ${className}`}>{children}</section>
}

function App() {
  const [isHero, setIsHero] = useState(true)

  const pageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = pageRef.current
    if (!el) return

    const onScroll = () => {
      const scrollY = el.scrollTop
      const height = el.clientHeight

      setIsHero(scrollY < height * 0.8)
    }

    el.addEventListener("scroll", onScroll)
    return () => el.removeEventListener("scroll", onScroll)
  }, [])
  return (
    
    <div className="page" ref={pageRef}>
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
          A veces las cosas más pequeñas ocupan más lugar en el corazón 💛
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
        <p className="footer"> ¡Solo recordá que es una sorpresa!</p>
        <p className="footer">¡Te esperamos! 🐻</p>
      </Section>

    </div>
  )
}

export default App