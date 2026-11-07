import { lazy, Suspense, useMemo, useState } from 'react'
import { Activity, ArrowLeft, ArrowRight, BookOpen, Box, CarFront, ChevronDown, ChevronRight, CircleHelp, ClipboardList, Clock3, ExternalLink, Layers3, LayoutDashboard, Search, Settings2, ShieldCheck, Sparkles, Wrench, Zap } from 'lucide-react'
import './App.css'

const CarScene = lazy(() => import('./CarScene'))
const manual = 'https://service.tesla.com/docs/Model3/ServiceManual/en-us/'
const services = [
  { title: 'Exterior lighting', detail: 'Headlights, tail lights & bulbs', category: 'Electrical', icon: Zap },
  { title: 'Wheels & tires', detail: 'Inspection, rotation & replacement', category: 'Chassis', icon: Settings2 },
  { title: 'Cabin air filter', detail: 'Heating & ventilation system', category: 'Maintenance', icon: Activity, url: 'https://service.tesla.com/docs/Model3/ServiceManual/en-us/GUID-2362856A-79BC-49A9-B11C-3B0E68EFF276.html' },
  { title: 'Brake system', detail: 'Inspection & service information', category: 'Chassis', icon: ShieldCheck },
]
const layers = [
  { id: 'exterior', name: 'Exterior', detail: 'Body & lighting', color: '#f1a36b' },
  { id: 'chassis', name: 'Chassis', detail: 'Frame, wheels & brakes', color: '#86a4bd' },
  { id: 'powertrain', name: 'Powertrain', detail: 'Battery & drive unit', color: '#8eb8a6' },
  { id: 'electrical', name: 'Electrical', detail: 'High-voltage systems', color: '#d8b576' },
]

function App() {
  const [page, setPage] = useState('dashboard')
  const [carSearch, setCarSearch] = useState('')
  const [serviceSearch, setServiceSearch] = useState('')
  const [selectedService, setSelectedService] = useState(null)
  const [layer, setLayer] = useState('all')
  const [exploded, setExploded] = useState(false)
  const filteredServices = useMemo(() => services.filter((service) => `${service.title} ${service.detail} ${service.category}`.toLowerCase().includes(serviceSearch.toLowerCase().trim())), [serviceSearch])
  const carMatches = 'tesla model 3 2023 electric'.includes(carSearch.toLowerCase().trim())

  function openVehicle() {
    setPage('vehicle')
    setSelectedService(null)
    window.scrollTo(0, 0)
  }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <button className="brand" onClick={() => setPage('dashboard')} aria-label="Mechanics home">
          <span className="brand-mark"><Wrench size={19} strokeWidth={2.5} /></span>
          <span>mechanics<span className="brand-dot">.</span></span>
        </button>
        <div className="workspace-label">WORKSPACE</div>
        <nav className="side-nav" aria-label="Main navigation">
          <button className={page === 'dashboard' ? 'active' : ''} onClick={() => setPage('dashboard')}><LayoutDashboard size={18} /> Dashboard</button>
          <button className={page === 'vehicle' ? 'active' : ''} onClick={openVehicle}><CarFront size={18} /> Vehicle library</button>
        </nav>
        <div className="sidebar-bottom">
          <div className="sidebar-note"><Sparkles size={16} /><div><strong>Built for the workshop</strong><span>Your digital companion, just getting started.</span></div></div>
          <div className="profile"><div className="avatar">M</div><div><strong>Guest workspace</strong><span>Proof of concept</span></div><ChevronDown size={16} /></div>
        </div>
      </aside>

      <main className="main">
        <header className="topbar"><div className="breadcrumbs"><span>Workspace</span><ChevronRight size={14} /><strong>{page === 'dashboard' ? 'Dashboard' : 'Vehicle library'}</strong></div><div className="top-right"><span className="preview-pill"><span /> EARLY PREVIEW</span><a href={manual} target="_blank" rel="noreferrer" aria-label="Open Tesla service manual"><CircleHelp size={19} /></a><div className="top-avatar">M</div></div></header>
        {page === 'dashboard' ? (
          <div className="content dashboard">
            <div className="page-heading"><div><div className="eyebrow"><span /> YOUR WORKSPACE</div><h1>Good to see you<span className="accent">.</span></h1><p>Everything you need to get back under the hood.</p></div><span className="date-label"><span /> WORKSHOP OVERVIEW</span></div>
            <section className="hero">
              <div className="hero-copy"><div className="hero-kicker"><Sparkles size={14} /> A SMARTER WAY TO WORK</div><h2>Meet your new<br /><em>workshop companion.</em></h2><p>From the first look to the final check, find the information you need to keep moving.</p><button className="primary-button" onClick={openVehicle}>Explore the vehicle <ArrowRight size={17} /></button></div>
              <div className="hero-art" aria-hidden="true"><div className="hero-ring ring-one" /><div className="hero-ring ring-two" /><CarFront size={182} strokeWidth={0.75} /><span className="art-label">01 / THE VEHICLE LIBRARY</span></div>
            </section>
            <div className="section-title"><div><div className="eyebrow muted">YOUR GARAGE</div><h2>Find a vehicle</h2><p>Start by searching our vehicle library.</p></div><span className="count-pill">1 VEHICLE AVAILABLE</span></div>
            <label className="search-field"><Search size={19} /><input value={carSearch} onChange={(event) => setCarSearch(event.target.value)} placeholder="Search by make or model..." aria-label="Search vehicles" /><span>SEARCH</span></label>
            <div className="list-heading"><span>AVAILABLE VEHICLES</span><span>MODEL / YEAR</span></div>
            {carMatches ? <button className="vehicle-card" onClick={openVehicle}><div className="vehicle-thumb"><CarFront size={49} strokeWidth={1.2} /></div><div className="vehicle-info"><div className="vehicle-tags"><span>TESLA</span><span className="dot-separator">•</span><span>ELECTRIC</span></div><h3>Model 3</h3><p>2023 <span>·</span> Service information & interactive view</p></div><span className="card-action">Explore vehicle <ArrowRight size={17} /></span></button> : <div className="empty-state">No vehicles found. Try “Tesla” or “Model 3”.</div>}
            <div className="bottom-hint"><BookOpen size={17} /><span>More vehicles are on the way. For now, explore our first proof of concept.</span></div>
          </div>
        ) : (
          <div className="content vehicle-page">
            <button className="back-link" onClick={() => setPage('dashboard')}><ArrowLeft size={16} /> Back to dashboard</button>
            <div className="vehicle-heading"><div><div className="eyebrow"><span /> VEHICLE LIBRARY <ChevronRight size={13} /> TESLA</div><h1>Model 3 <span>2023</span></h1><p>Get to know the vehicle, inside and out.</p></div><a className="manual-link" href={manual} target="_blank" rel="noreferrer"><BookOpen size={17} /> Official service manual <ExternalLink size={14} /></a></div>
            <div className="vehicle-layout">
              <div className="vehicle-primary">
                <section className="viewer-card">
                  <div className="viewer-top"><div><div className="eyebrow muted">INTERACTIVE VEHICLE</div><h2>Explore the Model 3</h2></div><span className="concept-badge"><span /> CONCEPT MODEL</span></div>
                  <div className="scene-wrap"><Suspense fallback={<div className="scene-fallback">Loading 3D view…</div>}><CarScene layer={layer} exploded={exploded} /></Suspense><div className="scene-caption"><span className="caption-icon"><Box size={15} /></span> Drag to rotate <span>·</span> Scroll to zoom</div><div className="scene-index">MODEL 3 <span>/</span> 01</div></div>
                  <div className="viewer-controls"><div><strong>Explore the layers</strong><p>A simplified illustration, not a repair reference.</p></div><button className={`toggle-button ${exploded ? 'selected' : ''}`} onClick={() => setExploded(!exploded)} aria-pressed={exploded}><Layers3 size={17} /> {exploded ? 'Collapse view' : 'Explode view'}</button></div>
                </section>
                <section className="services-section"><div className="section-title compact"><div><div className="eyebrow muted">WHAT ARE YOU WORKING ON?</div><h2>Find a service</h2><p>Explore service topics and find the official documentation.</p></div></div>
                  <label className="search-field"><Search size={19} /><input value={serviceSearch} onChange={(event) => { setServiceSearch(event.target.value); setSelectedService(null) }} placeholder="Search services or systems..." aria-label="Search services" /></label>
                  <div className="service-grid">{filteredServices.map((service) => <button key={service.title} className={`service-card ${selectedService?.title === service.title ? 'service-selected' : ''}`} onClick={() => setSelectedService(service)}><span className="service-icon"><service.icon size={19} /></span><span className="service-copy"><strong>{service.title}</strong><small>{service.detail}</small><span>{service.category}</span></span><ChevronRight size={17} /></button>)}</div>
                  {filteredServices.length === 0 && <div className="empty-state">No matching services. Try another search.</div>}
                  {selectedService && <div className="service-detail"><div><div className="eyebrow muted">SERVICE INFORMATION</div><h3>{selectedService.title}</h3><p>Vehicle-specific steps, parts, fasteners and torque values have not been verified in this preview. Consult the official manual and confirm the exact vehicle configuration before starting work.</p></div><a href={selectedService.url || manual} target="_blank" rel="noreferrer">Open Tesla service manual <ExternalLink size={15} /></a></div>}
                </section>
              </div>
              <aside className="vehicle-aside">
                <section className="side-card"><div className="side-card-heading"><div><div className="eyebrow muted">VEHICLE SYSTEMS</div><h3>Layers</h3></div><Layers3 size={19} /></div><p>Select a layer to focus on a system.</p><button className={`layer-row ${layer === 'all' ? 'layer-active' : ''}`} onClick={() => setLayer('all')} aria-pressed={layer === 'all'}><span className="layer-dot all-dot" /><span><strong>Complete vehicle</strong><small>Show all layers</small></span><ChevronRight size={15} /></button>{layers.map((item) => <button key={item.id} className={`layer-row ${layer === item.id ? 'layer-active' : ''}`} onClick={() => setLayer(item.id)} aria-pressed={layer === item.id}><span className="layer-dot" style={{ backgroundColor: item.color }} /><span><strong>{item.name}</strong><small>{item.detail}</small></span><ChevronRight size={15} /></button>)}</section>
                <section className="source-card"><div className="source-icon"><BookOpen size={19} /></div><div className="eyebrow muted">GOOD TO KNOW</div><h3>Made for discovery.<br />Grounded in sources.</h3><p>This preview uses a conceptual model. Always refer to Tesla’s official service information for actual repairs.</p><a href={manual} target="_blank" rel="noreferrer">View official manual <ArrowRight size={15} /></a></section>
                <div className="aside-foot"><Clock3 size={15} /> More vehicle data coming soon</div>
              </aside>
            </div>
          </div>
        )}
        <footer><span>© mechanics. Built for the people who keep us moving.</span><span><ClipboardList size={14} /> PROOF OF CONCEPT</span></footer>
      </main>
    </div>
  )
}

export default App
