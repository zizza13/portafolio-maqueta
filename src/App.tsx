import { useState, useEffect, useRef } from 'react'

// ─── Types ────────────────────────────────────────────────────────────────────

interface Project {
  id: number
  tag: string
  year: string
  title: string
  subtitle: string
  problem: string
  solution: string
  results: string[]
  tech: string[]
  image: string
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const PROJECTS: Project[] = [
  {
    id: 1,
    tag: 'Arquitectura de Datos',
    year: '2024',
    title: 'Pipeline de Inteligencia Predictiva para Retail',
    subtitle: 'Plataforma de predicción de demanda en tiempo real para cadena de 340 tiendas',
    problem:
      'Una cadena minorista con 340 puntos de venta operaba con pronósticos de demanda generados manualmente en Excel. El proceso tardaba 72 horas, generaba un sobrestock promedio del 23% y pérdidas mensuales de $1.2M MXN por caducidad de producto.',
    solution:
      'Diseñé e implementé un pipeline de datos con Apache Kafka para ingesta en tiempo real, modelos de ML (XGBoost + LSTM) para predicción de demanda y un dashboard interactivo en Streamlit. La arquitectura procesa 4.2M eventos diarios con latencia sub-segundo.',
    results: [
      'Reducción del 67% en sobrestock en los primeros 90 días',
      'Ahorro de $840K MXN mensuales en merma',
      'Pronósticos generados en 8 minutos vs. 72 horas previas',
      '94.3% de precisión en predicciones a 7 días',
    ],
    tech: ['Python', 'Apache Kafka', 'XGBoost', 'PostgreSQL', 'Streamlit', 'Docker'],
    image: 'photo-1551288049-bebda4e38f71',
  },
  {
    id: 2,
    tag: 'Microservicios',
    year: '2023',
    title: 'Migración a Arquitectura de Microservicios — Fintech',
    subtitle: 'Rediseño de sistema monolítico a microservicios para plataforma de pagos',
    problem:
      'Una fintech procesaba $45M USD mensuales sobre un monolito en Python/Django con 8 años de deuda técnica. Cada deployment tardaba 4 horas, los incidentes de producción promediaban 6.5 horas de downtime y escalar para picos de fin de mes requería intervención manual.',
    solution:
      'Lideré la migración progresiva usando el patrón Strangler Fig: identifiqué 11 bounded contexts, los descompuse en microservicios con FastAPI, implementé comunicación asíncrona vía RabbitMQ y migré la infraestructura a Kubernetes en GCP con autoscaling basado en métricas de negocio.',
    results: [
      'Tiempo de deployment reducido de 4 horas a 12 minutos',
      'Disponibilidad del sistema: 99.97% (vs. 98.1% anterior)',
      'Costo de infraestructura reducido 31% mediante autoscaling',
      'Cero downtime en los últimos 14 meses consecutivos',
    ],
    tech: ['FastAPI', 'Kubernetes', 'RabbitMQ', 'GCP', 'Terraform', 'Prometheus'],
    image: 'photo-1558494949-ef010cbdcc31',
  },
  {
    id: 3,
    tag: 'Ingeniería de Datos',
    year: '2023',
    title: 'Data Warehouse Unificado — Manufactura',
    subtitle: 'Centralización de 14 fuentes de datos heterogéneas para planta industrial',
    problem:
      'Una planta manufacturera operaba con 14 sistemas aislados (ERP, MES, SCADA, Excel, sensores IoT) sin integración. Los reportes de producción se construían manualmente cada semana, tomaban 16 horas de trabajo y contenían errores en el 34% de los casos.',
    solution:
      'Construí un Data Warehouse en Snowflake con pipelines de integración en dbt para transformación y Great Expectations para calidad de datos. Conecté los 14 sistemas usando Apache Airflow como orquestador, con conectores personalizados para los sistemas legacy.',
    results: [
      'Reportes de producción automatizados: de 16h a 15 minutos',
      'Tasa de error en datos reducida al 0.3% (desde 34%)',
      'Dashboard ejecutivo con métricas en tiempo real',
      'ROI del proyecto: 380% en el primer año',
    ],
    tech: ['Snowflake', 'dbt', 'Apache Airflow', 'Python', 'Great Expectations', 'Tableau'],
    image: 'photo-1504384308090-c894fdcc538d',
  },
]

const SKILLS = [
  { category: 'Lenguajes', items: ['Python', 'SQL', 'TypeScript', 'Go', 'Bash'] },
  { category: 'Datos & ML', items: ['Pandas', 'Scikit-learn', 'XGBoost', 'TensorFlow', 'dbt', 'Spark'] },
  { category: 'Infraestructura', items: ['Kubernetes', 'Docker', 'Terraform', 'GCP', 'AWS', 'Linux'] },
  { category: 'Datos & Streaming', items: ['Apache Kafka', 'Airflow', 'Snowflake', 'PostgreSQL', 'Redis'] },
]

// ─── Components ───────────────────────────────────────────────────────────────

function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { label: 'Projects', href: '#proyectos' },
    { label: 'Profile', href: '#profile' },
    { label: 'Contact me', href: '#contact' },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-5 px-4">
      {/* Pill container */}
      <div
        className="transition-all duration-300 w-fit"
        style={{
          backgroundColor: scrolled ? 'rgba(244,244,245,0.60)' : 'rgba(244,244,245,0.72)',
          backdropFilter: 'blur(14px)',
          border: '2px solid rgba(255,23,49,0.18)',
          borderRadius: '9999px',
          boxShadow: scrolled ? '0 4px 24px rgba(24,24,27,0.07)' : '0 2px 12px rgba(24,24,27,0.04)',
        }}
      >
        <div className="h-13 px-5 flex items-center justify-center relative">
          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm transition-colors duration-200"
                style={{ color: '#A1A1AA', fontFamily: 'DM Sans, sans-serif' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#18181B')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#A1A1AA')}
              >
                {l.label}
              </a>
            ))}
            <a
              href="mailto:cesar@terrazas.dev"
              className="text-sm px-4 py-1.5 transition-all duration-200"
              style={{
                backgroundColor: '#ff1731',
                color: '#fff',
                fontFamily: 'DM Sans, sans-serif',
                fontWeight: 500,
                borderRadius: '9999px',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#e0102a')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#ff1731')}
            >
              Hablemos
            </a>
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-1 absolute right-4"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menú"
          >
            <span
              className="block w-5 h-px transition-all duration-200"
              style={{ backgroundColor: '#18181B', transform: menuOpen ? 'translateY(5px) rotate(45deg)' : '' }}
            />
            <span
              className="block w-5 h-px transition-all duration-200"
              style={{ backgroundColor: '#18181B', opacity: menuOpen ? 0 : 1 }}
            />
            <span
              className="block w-5 h-px transition-all duration-200"
              style={{ backgroundColor: '#18181B', transform: menuOpen ? 'translateY(-5px) rotate(-45deg)' : '' }}
            />
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div
            className="md:hidden px-5 pb-4 pt-1 flex flex-col gap-3"
            style={{ borderTop: '1px solid rgba(24,24,27,0.07)' }}
          >
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm py-1"
                style={{ color: '#18181B', fontFamily: 'DM Sans, sans-serif' }}
                onClick={() => setMenuOpen(false)}
              >
                {l.label}
              </a>
            ))}
            <a
              href="mailto:cesar@terrazas.dev"
              className="text-sm px-4 py-2 text-center mt-1"
              style={{
                backgroundColor: '#ff1731',
                color: '#fff',
                fontFamily: 'DM Sans, sans-serif',
                fontWeight: 500,
                borderRadius: '9999px',
              }}
            >
              Hablemos
            </a>
          </div>
        )}
      </div>
    </header>
  )
}

function MountainsBg() {
  return (
    <svg
      className="absolute inset-0 w-full h-full"
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <style>{`
        @keyframes float-w1 {
          0% { transform: translateY(0px) scaleY(1); }
          100% { transform: translateY(-12px) scaleY(1.03); }
        }
        @keyframes float-w2 {
          0% { transform: translateY(0px) scaleY(1.02); }
          100% { transform: translateY(8px) scaleY(0.98); }
        }
        @keyframes float-w3 {
          0% { transform: translateY(0px) translateX(0px); }
          100% { transform: translateY(-18px) translateX(10px); }
        }
        @keyframes float-w4 {
          0% { transform: translateY(0px) translateX(0px); }
          100% { transform: translateY(12px) translateX(-10px); }
        }
        @keyframes float-w5 {
          0% { transform: translateY(0px) scaleY(0.99); }
          100% { transform: translateY(-8px) scaleY(1.01); }
        }
        .animate-w1 { animation: float-w1 12s ease-in-out infinite alternate; transform-origin: center; }
        .animate-w2 { animation: float-w2 16s ease-in-out infinite alternate; transform-origin: center; }
        .animate-w3 { animation: float-w3 10s ease-in-out infinite alternate; transform-origin: center; }
        .animate-w4 { animation: float-w4 18s ease-in-out infinite alternate; transform-origin: center; }
        .animate-w5 { animation: float-w5 14s ease-in-out infinite alternate; transform-origin: center; }
      `}</style>

      <defs>
        {/* Glow effect for red wave */}
        <filter id="glow-red" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        <linearGradient id="wave-red" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#ff1731" stopOpacity="0.05" />
          <stop offset="50%" stopColor="#ff1731" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#ff1731" stopOpacity="0.05" />
        </linearGradient>
        <linearGradient id="wave-dark" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#18181B" stopOpacity="0.05" />
          <stop offset="50%" stopColor="#18181B" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#18181B" stopOpacity="0.05" />
        </linearGradient>
        <linearGradient id="wave-grey-light" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#D4D4D8" stopOpacity="0.05" />
          <stop offset="50%" stopColor="#A1A1AA" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#D4D4D8" stopOpacity="0.05" />
        </linearGradient>
        <linearGradient id="wave-grey-dark" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#71717A" stopOpacity="0.05" />
          <stop offset="50%" stopColor="#3F3F46" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#71717A" stopOpacity="0.05" />
        </linearGradient>
      </defs>

      {/* Wave 1 (Upper Light Grey) */}
      <path
        d="M -50,200 C 300,740 650,620 950,530 C 1200,460 1350,330 1550,800"
        fill="none"
        stroke="url(#wave-grey-light)"
        strokeWidth="2"
        className="animate-w1"
      />
      {/* Wave 2 (Middle Dark Grey) */}
      <path
        d="M -50,200 C 300,780 650,660 950,570 C 1200,500 1350,370 1550,760"
        fill="none"
        stroke="url(#wave-grey-dark)"
        strokeWidth="2"
        className="animate-w2"
      />
      {/* Wave 3 (Accent Red with Glow) */}
      <path
        d="M -50,200 C 300,820 650,700 950,610 C 1200,540 1350,410 1550,720"
        fill="none"
        stroke="url(#wave-red)"
        strokeWidth="3"
        filter="url(#glow-red)"
        className="animate-w3"
      />
      {/* Wave 4 (Lower Dark Charcoal) */}
      <path
        d="M -50,200 C 300,860 650,740 950,650 C 1200,580 1350,450 1550,680"
        fill="none"
        stroke="url(#wave-dark)"
        strokeWidth="2"
        className="animate-w4"
      />
      {/* Wave 5 (Deep Bottom Light Grey) */}
      <path
        d="M -50,200 C 300,900 650,780 950,690 C 1200,620 1350,490 1550,640"
        fill="none"
        stroke="url(#wave-grey-light)"
        strokeWidth="1.5"
        className="animate-w5"
      />
    </svg>
  )
}

function Hero() {
  return (
    <section
      id="inicio"
      className="relative min-h-screen flex flex-col justify-end overflow-hidden"
      style={{ backgroundColor: '#F4F4F5' }}
    >
      {/* Mountain background */}
      <MountainsBg />

      {/* Content — sits above mountains */}
      <div className="relative z-10 pb-20 pt-36 px-6 lg:px-10 max-w-6xl mx-auto w-full">
        {/* Status pill */}
        <div className="flex items-center gap-2 mb-14">
          <span className="inline-block w-2 h-2 rounded-full" style={{ backgroundColor: '#ff1731' }} />
          <span className="text-xs tracking-widest uppercase" style={{ color: '#A1A1AA', fontFamily: 'DM Sans, sans-serif' }}>
            Welcome to my portfolio
          </span>
        </div>

        {/* Main heading */}
        <div className="mb-8">
          <h1
            className="text-5xl md:text-7xl lg:text-8xl leading-none tracking-tight"
            style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', color: '#18181B', fontWeight: 800 }}
          >
            Hi, I'm
            <br />
            César Terrazas Nava
          </h1>
        </div>

        {/* Lower row: title + description */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 items-end">
          <div>
            <p
              className="text-lg md:text-xl font-medium mb-2"
              style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', color: '#18181B' }}
            >
              Computer Science Engineer
              <br />Specialized in Data Intelligence
            </p>
            <div className="w-8 h-px mt-4" style={{ backgroundColor: '#ff1731' }} />
          </div>

          <div>
            <p
              className="text-base md:text-lg leading-relaxed mb-8"
              style={{ color: '#A1A1AA', fontFamily: 'DM Sans, sans-serif', fontWeight: 300 }}
            >
              I design scalable systems, logical architectures, and data-driven solutions that transform operational complexity into competitive advantage.
            </p>

            <div className="flex items-center gap-6">
              <a
                href="#projects"
                className="text-sm px-6 py-3 transition-all duration-200 inline-block"
                style={{ backgroundColor: '#18181B', color: '#F4F4F5', fontFamily: 'DM Sans, sans-serif', fontWeight: 500, borderRadius: '9999px' }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#ff1731')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#18181B')}
              >
                Ver proyectos
              </a>
              <a
                href="#contact"
                className="text-sm transition-colors duration-200"
                style={{ color: '#18181B', fontFamily: 'DM Sans, sans-serif', textDecoration: 'underline', textUnderlineOffset: '4px', borderRadius: '9999px' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#18181B')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#A1A1AA')}
              >
                Contactar
              </a>
            </div>
          </div>
        </div>

        {/* Bottom row: metrics */}
        <div
          className="mt-16 pt-8 grid grid-cols-3 gap-4"
          style={{ borderTop: '1px solid rgba(24,24,27,0.08)' }}
        >
          {[
            { num: '7+', label: 'Años de experiencia' },
            { num: '34', label: 'Proyectos entregados' },
            { num: '$12M+', label: 'Valor generado (USD)' },
          ].map((m) => (
            <div key={m.label}>
              <p
                className="text-2xl md:text-3xl font-bold mb-1"
                style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', color: '#18181B' }}
              >
                {m.num}
              </p>
              <p className="text-xs" style={{ color: '#A1A1AA', fontFamily: 'DM Sans, sans-serif' }}>
                {m.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <article
      className="py-12 lg:py-16 cursor-pointer group"
      style={{ borderTop: '1px solid rgba(24,24,27,0.08)' }}
      onClick={() => setExpanded(!expanded)}
    >
      {/* Header row */}
      <div className="flex items-start justify-between gap-4 mb-0">
        <div className="flex items-start gap-4 lg:gap-8 flex-1">
          {/* Index */}
          <span
            className="text-xs mt-1 shrink-0 w-5"
            style={{ color: '#A1A1AA', fontFamily: 'DM Sans, sans-serif' }}
          >
            {String(index + 1).padStart(2, '0')}
          </span>

          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-3 mb-3">
              <span
                className="text-xs tracking-widest uppercase"
                style={{ color: '#ff1731', fontFamily: 'DM Sans, sans-serif' }}
              >
                {project.tag}
              </span>
              <span className="text-xs" style={{ color: '#A1A1AA', fontFamily: 'DM Sans, sans-serif' }}>
                {project.year}
              </span>
            </div>

            <h3
              className="text-xl md:text-2xl lg:text-3xl font-semibold leading-tight mb-2 group-hover:text-[#ff1731] transition-colors duration-200"
              style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', color: '#18181B' }}
            >
              {project.title}
            </h3>
            <p className="text-sm md:text-base" style={{ color: '#A1A1AA', fontFamily: 'DM Sans, sans-serif' }}>
              {project.subtitle}
            </p>
          </div>
        </div>

        {/* Toggle icon */}
        <div
          className="shrink-0 mt-1 w-8 h-8 flex items-center justify-center transition-all duration-300"
          style={{
            border: '1px solid rgba(24,24,27,0.12)',
            transform: expanded ? 'rotate(45deg)' : 'rotate(0deg)',
          }}
        >
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path d="M5 1V9M1 5H9" stroke="#18181B" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
        </div>
      </div>

      {/* Expanded content */}
      {expanded && (
        <div className="mt-10 ml-0 md:ml-13 lg:ml-16 grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Left: text */}
          <div className="lg:col-span-3 space-y-8">
            <div>
              <h4
                className="text-xs tracking-widest uppercase mb-3"
                style={{ color: '#ff1731', fontFamily: 'DM Sans, sans-serif' }}
              >
                El Problema
              </h4>
              <p
                className="text-sm md:text-base leading-relaxed"
                style={{ color: '#18181B', fontFamily: 'DM Sans, sans-serif' }}
              >
                {project.problem}
              </p>
            </div>

            <div>
              <h4
                className="text-xs tracking-widest uppercase mb-3"
                style={{ color: '#ff1731', fontFamily: 'DM Sans, sans-serif' }}
              >
                La Solución
              </h4>
              <p
                className="text-sm md:text-base leading-relaxed"
                style={{ color: '#18181B', fontFamily: 'DM Sans, sans-serif' }}
              >
                {project.solution}
              </p>
            </div>

            {/* Tech stack */}
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="text-xs px-3 py-1"
                  style={{
                    fontFamily: 'DM Sans, sans-serif',
                    color: '#18181B',
                    border: '1px solid rgba(24,24,27,0.12)',
                    backgroundColor: 'rgba(24,24,27,0.03)',
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Right: results */}
          <div className="lg:col-span-2">
            <h4
              className="text-xs tracking-widest uppercase mb-4"
              style={{ color: '#ff1731', fontFamily: 'DM Sans, sans-serif' }}
            >
              Resultados
            </h4>
            <ul className="space-y-3">
              {project.results.map((r, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span
                    className="shrink-0 mt-2 w-1 h-1 rounded-full"
                    style={{ backgroundColor: '#ff1731' }}
                  />
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: '#18181B', fontFamily: 'DM Sans, sans-serif' }}
                  >
                    {r}
                  </p>
                </li>
              ))}
            </ul>

            {/* Image */}
            <div
              className="mt-6 aspect-video overflow-hidden"
              style={{ backgroundColor: '#E4E4E7' }}
            >
              <img
                src={`https://images.unsplash.com/${project.image}?w=600&h=340&fit=crop&auto=format`}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
          </div>
        </div>
      )}
    </article>
  )
}

function Projects() {
  return (
    <section id="proyectos" className="px-6 lg:px-10 max-w-6xl mx-auto py-24">
      <div className="flex items-end justify-between mb-12">
        <div>
          <span
            className="text-xs tracking-widest uppercase block mb-3"
            style={{ color: '#A1A1AA', fontFamily: 'DM Sans, sans-serif' }}
          >
            Trabajo seleccionado
          </span>
          <h2
            className="text-3xl md:text-4xl font-bold"
            style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', color: '#18181B' }}
          >
            Casos de Estudio
          </h2>
        </div>
        <span className="text-sm hidden md:block" style={{ color: '#A1A1AA', fontFamily: 'DM Sans, sans-serif' }}>
          Click para expandir
        </span>
      </div>

      <div>
        {PROJECTS.map((p, i) => (
          <ProjectCard key={p.id} project={p} index={i} />
        ))}
        <div style={{ borderTop: '1px solid rgba(24,24,27,0.08)' }} />
      </div>
    </section>
  )
}

function About() {
  return (
    <section id="profile" className="px-6 lg:px-10 max-w-6xl mx-auto py-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
        {/* Left */}
        <div>
          <span
            className="text-xs tracking-widest uppercase block mb-6"
            style={{ color: '#A1A1AA', fontFamily: 'DM Sans, sans-serif' }}
          >
            Profile
          </span>
          <h2
            className="text-3xl md:text-4xl font-bold mb-8"
            style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', color: '#18181B' }}
          >
            Ingeniero de Software e Inteligencia de Datos
          </h2>

          <div className="space-y-4 mb-10">
            <p
              className="text-base leading-relaxed"
              style={{ color: '#18181B', fontFamily: 'DM Sans, sans-serif', fontWeight: 300 }}
            >
              Soy un ingeniero especializado en la intersección de la arquitectura de software y
              la ingeniería de datos. Mi enfoque es construir sistemas que no solo funcionan hoy,
              sino que escalan con el negocio de mis clientes.
            </p>
            <p
              className="text-base leading-relaxed"
              style={{ color: '#A1A1AA', fontFamily: 'DM Sans, sans-serif', fontWeight: 300 }}
            >
              He trabajado con empresas en retail, fintech y manufactura, transformando procesos
              manuales y sistemas heredados en infraestructuras de datos modernas y automatizadas.
              Mi diferenciador: entiendo tanto el código como el negocio.
            </p>
          </div>

          {/* Timeline */}
          <div className="space-y-6">
            {[
              { year: '2021–Presente', role: 'Ingeniero Senior de Datos', place: 'Freelance & Consultoría' },
              { year: '2019–2021', role: 'Arquitecto de Software', place: 'Grupo Empresarial Monterrey' },
              { year: '2017–2019', role: 'Desarrollador Backend', place: 'Startup Fintech CDMX' },
            ].map((e) => (
              <div key={e.year} className="flex gap-6">
                <span
                  className="text-xs pt-0.5 w-24 shrink-0"
                  style={{ color: '#A1A1AA', fontFamily: 'DM Sans, sans-serif' }}
                >
                  {e.year}
                </span>
                <div>
                  <p className="text-sm font-medium" style={{ color: '#18181B', fontFamily: 'DM Sans, sans-serif' }}>
                    {e.role}
                  </p>
                  <p className="text-xs mt-0.5" style={{ color: '#A1A1AA', fontFamily: 'DM Sans, sans-serif' }}>
                    {e.place}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: skills */}
        <div>
          <span
            className="text-xs tracking-widest uppercase block mb-6"
            style={{ color: '#A1A1AA', fontFamily: 'DM Sans, sans-serif' }}
          >
            Stack técnico
          </span>

          <div className="space-y-8">
            {SKILLS.map((s) => (
              <div key={s.category}>
                <p
                  className="text-xs font-medium mb-3"
                  style={{ color: '#18181B', fontFamily: 'DM Sans, sans-serif', textTransform: 'uppercase', letterSpacing: '0.08em' }}
                >
                  {s.category}
                </p>
                <div className="flex flex-wrap gap-2">
                  {s.items.map((item) => (
                    <span
                      key={item}
                      className="text-sm px-3 py-1.5"
                      style={{
                        fontFamily: 'DM Sans, sans-serif',
                        color: '#18181B',
                        border: '1px solid rgba(24,24,27,0.12)',
                      }}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Photo */}
          <div className="mt-10 aspect-4/3 overflow-hidden" style={{ backgroundColor: '#E4E4E7' }}>
            <img
              src="https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=600&h=450&fit=crop&auto=format"
              alt="César trabajando"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

function Contact() {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  const inputStyle = {
    width: '100%',
    padding: '12px 0',
    backgroundColor: 'transparent',
    border: 'none',
    borderBottom: '1px solid rgba(24,24,27,0.15)',
    outline: 'none',
    fontSize: '0.9375rem',
    fontFamily: 'DM Sans, sans-serif',
    color: '#18181B',
  }

  return (
    <section id="contact" className="px-6 lg:px-10 max-w-6xl mx-auto py-24">
      <div
        className="py-16 px-8 lg:px-16"
        style={{ backgroundColor: '#18181B' }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left */}
          <div>
            <span
              className="text-xs tracking-widest uppercase block mb-6"
              style={{ color: '#A1A1AA', fontFamily: 'DM Sans, sans-serif' }}
            >
              Contacto
            </span>
            <h2
              className="text-3xl md:text-4xl font-bold mb-6 text-white"
              style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
            >
              ¿Tienes un reto que resolver?
            </h2>
            <p
              className="text-base leading-relaxed mb-10"
              style={{ color: '#A1A1AA', fontFamily: 'DM Sans, sans-serif', fontWeight: 300 }}
            >
              Cuéntame sobre tu proyecto. Respondo en menos de 24 horas.
            </p>

            <div className="space-y-4">
              {[
                { label: 'Email', value: 'cesar@terrazas.dev' },
                { label: 'LinkedIn', value: 'linkedin.com/in/cesarterrazas' },
                { label: 'GitHub', value: 'github.com/cesarterrazas' },
              ].map((c) => (
                <div key={c.label} className="flex items-center gap-4">
                  <span
                    className="text-xs w-16"
                    style={{ color: '#A1A1AA', fontFamily: 'DM Sans, sans-serif', textTransform: 'uppercase', letterSpacing: '0.08em' }}
                  >
                    {c.label}
                  </span>
                  <span
                    className="text-sm"
                    style={{ color: '#F4F4F5', fontFamily: 'DM Sans, sans-serif' }}
                  >
                    {c.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: form */}
          <div>
            {submitted ? (
              <div className="flex flex-col justify-center h-full gap-4">
                <div className="w-10 h-px" style={{ backgroundColor: '#ff1731' }} />
                <p
                  className="text-2xl font-semibold text-white"
                  style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
                >
                  Mensaje enviado.
                </p>
                <p style={{ color: '#A1A1AA', fontFamily: 'DM Sans, sans-serif' }}>
                  Te respondo en menos de 24 horas.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {[
                  { id: 'name', label: 'Nombre', type: 'text', placeholder: 'Tu nombre completo' },
                  { id: 'email', label: 'Email', type: 'email', placeholder: 'tu@email.com' },
                ].map((f) => (
                  <div key={f.id}>
                    <label
                      htmlFor={f.id}
                      className="block text-xs mb-2"
                      style={{ color: '#A1A1AA', fontFamily: 'DM Sans, sans-serif', textTransform: 'uppercase', letterSpacing: '0.08em' }}
                    >
                      {f.label}
                    </label>
                    <input
                      id={f.id}
                      type={f.type}
                      placeholder={f.placeholder}
                      required
                      value={formState[f.id as 'name' | 'email']}
                      onChange={(e) => setFormState({ ...formState, [f.id]: e.target.value })}
                      style={inputStyle}
                      onFocus={(e) => (e.target.style.borderBottomColor = '#ff1731')}
                      onBlur={(e) => (e.target.style.borderBottomColor = 'rgba(24,24,27,0.15)')}
                    />
                  </div>
                ))}

                <div>
                  <label
                    htmlFor="message"
                    className="block text-xs mb-2"
                    style={{ color: '#A1A1AA', fontFamily: 'DM Sans, sans-serif', textTransform: 'uppercase', letterSpacing: '0.08em' }}
                  >
                    Mensaje
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    placeholder="Cuéntame sobre tu proyecto..."
                    required
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    style={{ ...inputStyle, resize: 'none' }}
                    onFocus={(e) => (e.target.style.borderBottomColor = '#ff1731')}
                    onBlur={(e) => (e.target.style.borderBottomColor = 'rgba(24,24,27,0.15)')}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 text-sm font-medium transition-all duration-200"
                  style={{ backgroundColor: '#ff1731', color: '#fff', fontFamily: 'DM Sans, sans-serif' }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#e0102a')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#ff1731')}
                >
                  Enviar mensaje →
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer
      className="px-6 lg:px-10 max-w-6xl mx-auto py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
      style={{ borderTop: '1px solid rgba(24,24,27,0.08)' }}
    >
      <p className="text-xs" style={{ color: '#A1A1AA', fontFamily: 'DM Sans, sans-serif' }}>
        © 2026 César Terrazas Nava
      </p>
      <p className="text-xs" style={{ color: '#A1A1AA', fontFamily: 'DM Sans, sans-serif' }}>
        Monterrey, México · Disponible remotamente
      </p>
    </footer>
  )
}

// ─── App ──────────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <div style={{ backgroundColor: '#F4F4F5', minHeight: '100vh' }}>
      <Nav />
      <Hero />
      <Projects />
      <About />
      <Contact />
      <Footer />
    </div>
  )
}
