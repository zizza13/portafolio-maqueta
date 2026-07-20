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
  link?: string
  linkLabel?: string
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const PROJECTS: Project[] = [
  {
    id: 1,
    tag: 'Published Product',
    year: '2026',
    title: 'Tu Recordatorio Médico | mobile app',
    subtitle: 'Flutter medication reminder app with dual-path, fail-safe alarm scheduling',
    problem:
      'Standard reminder apps rely on a single notification channel, which OEM battery optimizers routinely kill in the background, silently dropping alerts, missing them entirely after a device reboot. For a medication adherence app, a missed reminder isn’t an inconvenience,  it can mean a failed treatment.',
    solution:
      'I built a dual path alarm architecture: every dose is scheduled through both a plugin based alarm engine and Android’s native AlarmManager as a redundant backup, so alarms survive reboots, background restrictions, and OEM battery killers. Alarms fire as a full screen. It also has stock tracking with low stock warnings, home screen widgets showing the next dose. The app runs entirely on device: no backend, no Internet permission, zero data ever leaves the phone.',
    results: [
      'V1 fully functional and feature complete',
      'alarm system survives device reboot, background app restriction, and OEM battery optimization',
      '124 automated tests covering scheduling edge cases',
      'frequency math, alarm collision resolution, snooze protection',
      'Zero data collection: 100% local persistence',
      'Home screen widgets + swipeable weekly adherence tracking'
    ],
    tech: ['Flutter', 'Dart', 'Kotlin', 'Android', 'AlarmManager'],
    image: '/tu_recordatorio_medico.png',
    //link: 'https://chromewebstore.google.com/detail/pomodoro-focus-pro/cplgofhaeomhmegoiolefancgajicmof',
    //linkLabel: 'Get it on the Chrome Web Store →',
  },
  {
    id: 2,
    tag: 'Published Product',
    year: '2026',
    title: 'Pomodoro Focus Pro | Chrome Extension',
    subtitle: 'Manifest V3 productivity extension published on the Chrome Web Store',
    problem:
      'Conventional timer extensions rely on the popup to keep time, so the cycle stops or falls out of sync as soon as the user closes the window, losing notifications and focus continuity.',
    solution:
      'I implemented the core timer in a service worker using chrome.alarms, so cycles and notifications run reliably in the background, independent of the popup UI. I added a state-driven dynamic toolbar icon and an integrated to-do list with local persistence, fully client-side with zero data collection.',
    results: [
      'Published and available on the Chrome Web Store',
      'Stable Pomodoro cycles even with the popup closed',
      'Zero data collection: all persistence is local',
      'Dynamic toolbar icon reflecting the cycle state',
    ],
    tech: ['JavaScript', 'HTML', 'CSS', 'Chrome Extensions API (Manifest V3)'],
    image: '/pomodoro.png',
    link: 'https://chromewebstore.google.com/detail/pomodoro-focus-pro/cplgofhaeomhmegoiolefancgajicmof',
    linkLabel: 'Get it on the Chrome Web Store →',
  },
  {
    id: 3,
    tag: 'Web Development',
    year: '2026',
    title: 'Fierro Mateco | Corporate Landing Page',
    subtitle: 'Responsive, conversion-oriented site for an aluminum profile distributor',
    problem:
      'An aluminum profile distribution company had no web presence: potential customers couldn\'t check the catalog, branches, or contact the company beyond word of mouth and direct calls.',
    solution:
      'I designed and built a responsive, conversion-oriented landing page with sections for services, catalog, branches, and a contact form. I implemented the interface with React and deployed it to production via Vercel.',
    results: [
      'Site live in production (live demo)',
      'Catalog and branches browsable from any device',
      'Integrated contact form to capture leads',
      'Ongoing development with iterative improvements',
    ],
    tech: ['HTML', 'CSS', 'JavaScript', 'React', 'GitHub', 'Vercel'],
    image: '/fierro_mateco.png',
    link: 'https://propuesta-mateco.vercel.app',
    linkLabel: 'View Live Demo →',
  },
  {
    id: 4,
    tag: 'Capstone Project — Project Lead',
    year: '2026',
    title: 'Green CUT | E-waste Management System',
    subtitle: 'Capstone project: data traceability for a circular-economy lab',
    problem:
      'E-waste management at the university center lacked a traceability system: there was no structured way to record impact metrics or classify components during diagnosis and disassembly.',
    solution:
      'As project lead, I designed and coordinated a circular-economy lab focused on e-waste management and logical hardware diagnosis. I built an automated traceability system ("Control Station") with input validation to record impact metrics and classify components, coordinating a four-person technical team across the disassembly and Clean Zone areas.',
    results: [
      'Traceability system (Control Station) in operation',
      'Four-person technical team coordinated across two areas',
      'Impact metrics and component classification recorded in a structured way',
      'Computer Science capstone project (thesis as an intervention project)',
    ],
    tech: ['JavaScript', 'HTML', 'CSS', 'Databases', 'Data validation'],
    image: '/green_cut.png',
  },
  {
    id: 5,
    tag: 'Process Digitalization',
    year: '2024',
    title: 'Grupo Modelo | Product Loading Digitalization',
    subtitle: 'Web application to digitalize the loading process at a bottling plant',
    problem:
      'The product loading process at a bottling plant was recorded manually, resulting in slow data capture prone to operational errors.',
    solution:
      'I digitalized the loading process through a database-driven web application, replacing manual data capture and reducing the associated operational errors.',
    results: [
      'Processing time cut by 30–45%',
      'Manual data capture replaced by a digital workflow',
      'Operational errors reduced in the loading process',
    ],
    tech: ['JavaScript', 'Databases', 'Web development'],
    image: 'photo-1553413077-190dd305871c',
  },
]

const SKILLS = [
  { category: 'Languages & Development', items: ['Python', 'JavaScript', 'HTML', 'CSS', 'Node.js', 'Express.js', 'React.js'] },
  { category: 'Databases', items: ['MariaDB', 'MySQL', 'PostgreSQL', 'MongoDB'] },
  { category: 'Tools', items: ['Git', 'GitHub', 'GitLab', 'Docker', 'Power BI'] },
  { category: 'Areas of Interest', items: ['Cloud Computing', 'APIs', 'Machine Learning', 'Automation', 'Problem Solving'] },
]

// ─── Components ───────────────────────────────────────────────────────────────

function scrollToSection(id: string, e: React.MouseEvent) {
  e.preventDefault()
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { label: 'Projects', href: '#projects' },
    { label: 'Profile', href: '#profile' },
    { label: 'Contact me', href: '#contact' },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 sm:pt-5 px-3">
      {/* Pill container — same nav on every screen size, just scaled down for narrow widths */}
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
        <nav className="h-12 sm:h-12 md:h-13 px-5 sm:px-4 md:px-5 flex items-center gap-5 sm:gap-4 md:gap-6">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={(e) => scrollToSection(l.href.slice(1), e)}
              className="text-[15px] sm:text-xs md:text-sm whitespace-nowrap transition-colors duration-200"
              style={{ color: '#A1A1AA', fontFamily: 'DM Sans, sans-serif' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#18181B')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#A1A1AA')}
            >
              {l.label}
            </a>
          ))}
          <a
            href="mailto:ctn0213@outlook.com"
            className="text-[11px] sm:text-xs md:text-sm whitespace-nowrap px-2.5 py-1 sm:px-3 md:px-4 md:py-1.5 transition-all duration-200"
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
            Let's Talk
          </a>
        </nav>
      </div>
    </header>
  )
}

function MountainsBg() {
  const svgRef = useRef<SVGSVGElement>(null)
  const wave3Ref = useRef<SVGPathElement>(null)
  const gradientRef = useRef<SVGRadialGradientElement>(null)
  const midStopRef = useRef<SVGStopElement>(null)
  const blurRef = useRef<SVGFEGaussianBlurElement>(null)

  const samplesRef = useRef<{ x: number; y: number }[]>([])
  const mouseRef = useRef({ x: 0, y: 0, active: false })
  const stateRef = useRef({ proximity: 0, hotX: 750, hotY: 650 })
  const rafRef = useRef<number | null>(null)

  // Sample the red wave's static path once — its `d` never changes, so no need to resample.
  useEffect(() => {
    const path = wave3Ref.current
    if (!path) return
    const len = path.getTotalLength()
    const N = 60
    const samples = Array.from({ length: N + 1 }, (_, i) => path.getPointAtLength((i / N) * len))
    samplesRef.current = samples
    const mid = samples[Math.floor(N / 2)]
    stateRef.current.hotX = mid.x
    stateRef.current.hotY = mid.y
  }, [])

  // Mouse-proximity "energy" glow: nearest-point tracking drives a radial gradient hotspot.
  useEffect(() => {
    const isFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!isFinePointer || reducedMotion) return

    const svg = svgRef.current
    if (!svg) return
    const MAX_RADIUS = 220

    function toSvgPoint(clientX: number, clientY: number) {
      const ctm = svg!.getScreenCTM()
      if (!ctm) return null
      const pt = svg!.createSVGPoint()
      pt.x = clientX
      pt.y = clientY
      return pt.matrixTransform(ctm.inverse())
    }

    function ensureLoop() {
      if (rafRef.current == null) rafRef.current = requestAnimationFrame(tick)
    }

    function tick() {
      const s = stateRef.current
      let targetProximity = 0
      let targetX = s.hotX
      let targetY = s.hotY

      if (mouseRef.current.active) {
        const p = toSvgPoint(mouseRef.current.x, mouseRef.current.y)
        if (p) {
          let best = Infinity
          let bestPt = samplesRef.current[0]
          for (const sp of samplesRef.current) {
            const dx = p.x - sp.x
            const dy = p.y - sp.y
            const d2 = dx * dx + dy * dy
            if (d2 < best) {
              best = d2
              bestPt = sp
            }
          }
          const dist = Math.sqrt(best)
          targetProximity = Math.max(0, 1 - dist / MAX_RADIUS) ** 2
          targetX = bestPt.x
          targetY = bestPt.y
        }
      }

      // Damped lerp: smoothly approaches the target AND smoothly fades back to baseline on mouse-leave.
      const k = 0.12
      s.proximity += (targetProximity - s.proximity) * k
      s.hotX += (targetX - s.hotX) * k
      s.hotY += (targetY - s.hotY) * k

      gradientRef.current?.setAttribute('cx', String(s.hotX))
      gradientRef.current?.setAttribute('cy', String(s.hotY))
      gradientRef.current?.setAttribute('r', String(600 - s.proximity * 450))
      midStopRef.current?.setAttribute('stop-opacity', String(0.55 + s.proximity * 0.45))
      blurRef.current?.setAttribute('stdDeviation', String(5 + s.proximity * 3))
      wave3Ref.current?.setAttribute('stroke-width', String(3 + s.proximity * 1.5))

      const settled = !mouseRef.current.active && s.proximity < 0.001 && targetProximity < 0.001
      if (settled) {
        rafRef.current = null
        return
      }
      rafRef.current = requestAnimationFrame(tick)
    }

    const onMove = (e: PointerEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY, active: true }
      ensureLoop()
    }
    const onLeave = () => {
      mouseRef.current.active = false
      ensureLoop()
    }
    const onVisibility = () => {
      if (document.hidden) onLeave()
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerleave', onLeave)
    window.addEventListener('blur', onLeave)
    document.addEventListener('visibilitychange', onVisibility)
    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerleave', onLeave)
      window.removeEventListener('blur', onLeave)
      document.removeEventListener('visibilitychange', onVisibility)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <svg
      ref={svgRef}
      className="absolute inset-0 w-full h-full"
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <style>{`
        @keyframes drift-w1 { 0% { transform: translateX(-14px); } 100% { transform: translateX(14px); } }
        @keyframes drift-w2 { 0% { transform: translateX(12px); } 100% { transform: translateX(-12px); } }
        @keyframes drift-w3 { 0% { transform: translateX(-10px); } 100% { transform: translateX(10px); } }
        @keyframes drift-w4 { 0% { transform: translateX(14px); } 100% { transform: translateX(-14px); } }
        @keyframes drift-w5 { 0% { transform: translateX(-10px); } 100% { transform: translateX(10px); } }
        .animate-w1 { animation: drift-w1 20s ease-in-out infinite alternate; transform-origin: center; }
        .animate-w2 { animation: drift-w2 26s ease-in-out infinite alternate; transform-origin: center; }
        .animate-w3 { animation: drift-w3 32s ease-in-out infinite alternate; transform-origin: center; }
        .animate-w4 { animation: drift-w4 38s ease-in-out infinite alternate; transform-origin: center; }
        .animate-w5 { animation: drift-w5 44s ease-in-out infinite alternate; transform-origin: center; }
        @media (prefers-reduced-motion: reduce) {
          .animate-w1, .animate-w2, .animate-w3, .animate-w4, .animate-w5 { animation: none; }
        }
      `}</style>

      <defs>
        {/* Glow effect for red wave */}
        <filter id="glow-red" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur ref={blurRef} stdDeviation="5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        <radialGradient id="wave-red" ref={gradientRef} gradientUnits="userSpaceOnUse" cx="750" cy="650" r="600">
          <stop offset="0%" stopColor="#ff1731" stopOpacity="1" />
          <stop ref={midStopRef} offset="40%" stopColor="#ff1731" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#ff1731" stopOpacity="0.05" />
        </radialGradient>
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
        ref={wave3Ref}
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
      id="home"
      className="relative min-h-screen flex flex-col justify-end overflow-hidden"
      style={{ backgroundColor: '#F4F4F5' }}
    >
      {/* Mountain background */}
      <MountainsBg />

      {/* Content — sits above mountains */}
      <div className="relative z-10 pb-16 pt-28 md:pb-20 md:pt-36 px-6 md:px-8 lg:px-10 max-w-6xl mx-auto w-full">
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
              Computer Science Engineering Student
              <br />Specialized in Data Intelligence
            </p>
            <div className="w-8 h-px mt-4" style={{ backgroundColor: '#ff1731' }} />
          </div>

          <div>
            <p
              className="text-base md:text-lg leading-relaxed mb-8"
              style={{ color: '#A1A1AA', fontFamily: 'DM Sans, sans-serif', fontWeight: 300 }}
            >
              Computer Science Engineering student Specialized in Data Intelligence, with experience in web development, databases, and process digitalization. Interested in software development, cloud computing, and data.
            </p>

            <div className="flex items-center gap-6">
              <a
                href="#projects"
                onClick={(e) => scrollToSection('projects', e)}
                className="text-sm px-6 py-3 transition-all duration-200 inline-block"
                style={{ backgroundColor: '#18181B', color: '#F4F4F5', fontFamily: 'DM Sans, sans-serif', fontWeight: 500, borderRadius: '9999px' }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#ff1731')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#18181B')}
              >
                View projects
              </a>
              <a
                href="#contact"
                onClick={(e) => scrollToSection('contact', e)}
                className="text-sm transition-colors duration-200"
                style={{ color: '#18181B', fontFamily: 'DM Sans, sans-serif', textDecoration: 'underline', textUnderlineOffset: '4px', borderRadius: '9999px' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#18181B')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#A1A1AA')}
              >
                Contact
              </a>
            </div>
          </div>
        </div>

        {/* Bottom row: metrics */}
        <div
          className="mt-10 md:mt-16 pt-8 grid grid-cols-3 gap-3 sm:gap-4"
          style={{ borderTop: '1px solid rgba(24,24,27,0.08)' }}
        >
          {[
            { num: '2026', label: 'Graduation (UDG)' },
            { num: '4', label: 'Technical projects' },
            { num: '2', label: 'AWS certifications' },
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
  const contentRef = useRef<HTMLDivElement>(null)
  const [maxHeight, setMaxHeight] = useState(0)

  useEffect(() => {
    const el = contentRef.current
    if (!el) return
    if (!expanded) {
      setMaxHeight(0)
      return
    }
    const updateHeight = () => {
      if (contentRef.current) {
        setMaxHeight(contentRef.current.scrollHeight + 80)
      }
    }
    updateHeight()
    const observer = new ResizeObserver(updateHeight)
    observer.observe(el)
    return () => observer.disconnect()
  }, [expanded, project])


  return (
    <article
      className="py-8 md:py-12 lg:py-16 cursor-pointer group"
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

      {/* Expanded content — animated unfold via measured max-height */}
      <div
        className="overflow-hidden transition-[max-height,opacity] duration-500 ease-in-out"
        style={{
          maxHeight: expanded ? `${maxHeight}px` : '0px',
          opacity: expanded ? 1 : 0,
        }}
      >
        <div ref={contentRef}>
          <div className="mt-8 md:mt-10 ml-0 md:ml-13 lg:ml-16 grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-8 lg:gap-12">
            {/* Left: text */}
            <div className="md:col-span-3 space-y-6 md:space-y-8">
              <div>
                <h4
                  className="text-xs tracking-widest uppercase mb-3"
                  style={{ color: '#ff1731', fontFamily: 'DM Sans, sans-serif' }}
                >
                  The Problem
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
                  The Solution
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

              {/* Live link, when available */}
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex items-center gap-2 text-xs px-3 py-1.5 w-fit transition-all duration-200"
                  style={{
                    fontFamily: 'DM Sans, sans-serif',
                    color: '#ff1731',
                    border: '1px solid rgba(255,23,49,0.3)',
                    backgroundColor: 'rgba(255,23,49,0.06)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(255,23,49,0.12)'
                    e.currentTarget.style.borderColor = 'rgba(255,23,49,0.55)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(255,23,49,0.06)'
                    e.currentTarget.style.borderColor = 'rgba(255,23,49,0.3)'
                  }}
                >
                  {project.linkLabel || 'Visit Live Website →'}
                </a>
              )}
            </div>

            {/* Right: results */}
            <div className="md:col-span-2">
              <h4
                className="text-xs tracking-widest uppercase mb-4"
                style={{ color: '#ff1731', fontFamily: 'DM Sans, sans-serif' }}
              >
                Results
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
                  src={
                    project.image.startsWith('photo-')
                      ? `https://images.unsplash.com/${project.image}?w=600&h=340&fit=crop&auto=format`
                      : project.image
                  }
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}

function Projects() {
  return (
    <section id="projects" className="px-6 md:px-8 lg:px-10 max-w-6xl mx-auto py-16 md:py-24">
      <div className="flex items-end justify-between mb-12">
        <div>
          <span
            className="text-xs tracking-widest uppercase block mb-3"
            style={{ color: '#A1A1AA', fontFamily: 'DM Sans, sans-serif' }}
          >
            Selected work
          </span>
          <h2
            className="text-3xl md:text-4xl font-bold"
            style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', color: '#18181B' }}
          >
            Projects
          </h2>
        </div>
        <span className="text-sm hidden md:block" style={{ color: '#A1A1AA', fontFamily: 'DM Sans, sans-serif' }}>
          Click to expand
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
    <section id="profile" className="px-6 md:px-8 lg:px-10 max-w-6xl mx-auto py-16 md:py-24">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 lg:gap-24">
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
            Computer Science Engineering Student Specialized in Data Intelligence
          </h2>

          <div className="space-y-4 mb-10">
            <p
              className="text-base leading-relaxed"
              style={{ color: '#18181B', fontFamily: 'DM Sans, sans-serif', fontWeight: 300 }}
            >
              I'm a Computer Science Engineering student specializing in Data Intelligence at
              the University of Guadalajara. I have experience in web development, databases,
              and process digitalization, and I'm interested in going deeper into software
              development, cloud computing, and data.
            </p>
            <p
              className="text-base leading-relaxed"
              style={{ color: '#A1A1AA', fontFamily: 'DM Sans, sans-serif', fontWeight: 300 }}
            >
              I've applied what I learn to real projects: from a published Chrome extension to
              an e-waste management capstone project where I led a technical team. I'm a
              structured problem-solver and a fast learner.
            </p>
          </div>

          {/* Timeline */}
          <div className="space-y-6">
            {[
              { year: '2022–2026', role: 'Computer Science Engineering', place: 'UDG, Tonalá · Data Intelligence Specialization' },
              { year: '2024', role: 'Process Digitalization', place: 'Grupo Modelo México' },
              { year: '2020–2021', role: 'Delivery Route Planning', place: 'GVI, Zapopan' },
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
            Tech Stack
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
              alt="César working"
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
    <section id="contact" className="px-6 md:px-8 lg:px-10 max-w-6xl mx-auto py-16 md:py-24">
      <div
        className="py-10 px-6 md:py-16 md:px-10 lg:px-16"
        style={{ backgroundColor: '#18181B' }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 lg:gap-16">
          {/* Left */}
          <div>
            <span
              className="text-xs tracking-widest uppercase block mb-6"
              style={{ color: '#A1A1AA', fontFamily: 'DM Sans, sans-serif' }}
            >
              Contact
            </span>
            <h2
              className="text-3xl md:text-4xl font-bold mb-6 text-white"
              style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
            >
              Have a challenge to solve?
            </h2>
            <p
              className="text-base leading-relaxed mb-10"
              style={{ color: '#A1A1AA', fontFamily: 'DM Sans, sans-serif', fontWeight: 300 }}
            >
              Tell me about your project. I respond within 24 hours.
            </p>

            <div className="space-y-4">
              {[
                { label: 'Email', value: 'ctn0213@outlook.com' },
                { label: 'Phone', value: '+52 33 2237 5389' },
                { label: 'LinkedIn', value: 'linkedin.com/in/cesar-terrazas-nava' },
              ].map((c) => (
                <div key={c.label} className="flex items-center gap-4">
                  <span
                    className="text-xs w-20 shrink-0"
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
                  Message sent.
                </p>
                <p style={{ color: '#A1A1AA', fontFamily: 'DM Sans, sans-serif' }}>
                  I'll get back to you within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {[
                  { id: 'name', label: 'Name', type: 'text', placeholder: 'Your full name' },
                  { id: 'email', label: 'Email', type: 'email', placeholder: 'you@email.com' },
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
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    placeholder="Tell me about your project..."
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
                  Send message →
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
    <footer style={{ borderTop: '1px solid #ff1731' }}>
      <div
        className="px-6 md:px-8 lg:px-10 max-w-6xl mx-auto py-8 md:py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
      >
        <p className="text-xs" style={{ color: '#A1A1AA', fontFamily: 'DM Sans, sans-serif' }}>
          © 2026 César Terrazas Nava
        </p>
        <p className="text-xs" style={{ color: '#A1A1AA', fontFamily: 'DM Sans, sans-serif' }}>
          Zapopan, Jalisco · Available remotely
        </p>
      </div>
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
