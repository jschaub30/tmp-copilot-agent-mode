import { Navigate, NavLink, Route, Routes } from 'react-router-dom'
import octofitLogo from '../../../docs/octofitapp-small.png'
import './App.css'

const navigation = [
  { label: 'Overview', to: '/', end: true },
  { label: 'Activities', to: '/activities' },
  { label: 'Teams', to: '/teams' },
  { label: 'Leaderboard', to: '/leaderboard' },
  { label: 'Workouts', to: '/workouts' },
]

const metrics = [
  { label: 'Active minutes', value: '0', unit: 'min', detail: 'of 150 this week' },
  { label: 'Sessions', value: '0', unit: '', detail: 'this week' },
  { label: 'Current streak', value: '0', unit: 'days', detail: 'keep it moving' },
]

function Dashboard() {
  const today = new Intl.DateTimeFormat('en', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  }).format(new Date())

  return (
    <div className="page-content">
      <header className="page-heading">
        <div>
          <p className="eyebrow">OVERVIEW</p>
          <h1>Your activity</h1>
          <p className="date-label">{today}</p>
        </div>
        <span className="date-chip">WEEK 01</span>
      </header>

      <section className="metric-grid" aria-label="Weekly activity summary">
        {metrics.map((metric, index) => (
          <article className={`metric-item metric-item-${index + 1}`} key={metric.label}>
            <p className="metric-label">{metric.label}</p>
            <div className="metric-reading">
              <strong>{metric.value}</strong>
              {metric.unit && <span>{metric.unit}</span>}
            </div>
            <p className="metric-detail">{metric.detail}</p>
          </article>
        ))}
      </section>

      <section className="overview-grid">
        <article className="surface activity-panel">
          <div className="panel-heading">
            <div>
              <p className="eyebrow">YOUR LOG</p>
              <h2>Recent activity</h2>
            </div>
            <NavLink className="text-link" to="/activities">View all</NavLink>
          </div>
          <div className="empty-state">
            <span className="empty-mark" aria-hidden="true">0</span>
            <p>No activity recorded yet.</p>
            <NavLink className="btn btn-dark btn-sm" to="/activities">Go to activities</NavLink>
          </div>
        </article>

        <aside className="surface target-panel">
          <p className="eyebrow">WEEKLY TARGET</p>
          <h2>150 <span>min</span></h2>
          <div className="target-track" role="progressbar" aria-label="Weekly active minutes" aria-valuenow="0" aria-valuemin="0" aria-valuemax="150">
            <span />
          </div>
          <p className="target-caption">0 of 150 active minutes</p>
          <div className="target-footnote"><span className="target-dot" /> A fresh week starts here</div>
        </aside>
      </section>
    </div>
  )
}

function SectionPage({ title }) {
  return (
    <div className="page-content">
      <header className="page-heading">
        <div>
          <p className="eyebrow">OCTOFIT TRACKER</p>
          <h1>{title}</h1>
        </div>
      </header>
      <section className="surface section-empty">
        <span className="empty-mark" aria-hidden="true">0</span>
        <p>No {title.toLowerCase()} to show yet.</p>
      </section>
    </div>
  )
}

function App() {
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <a className="brand" href="/" aria-label="OctoFit Tracker overview">
          <img className="brand-logo" src={octofitLogo} alt="" />
          <span className="brand-name">OctoFit <small>TRACKER</small></span>
        </a>
        <p className="nav-caption">WORKSPACE</p>
        <nav className="nav flex-column" aria-label="Main navigation">
          {navigation.map((item) => (
            <NavLink
              className={({ isActive }) => `side-link${isActive ? ' active' : ''}`}
              end={item.end}
              key={item.to}
              to={item.to}
            >
              <span className="nav-indicator" aria-hidden="true" />
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="sidebar-footer">
          <span className="sidebar-footer-mark">OF</span>
          <div><strong>OCTOFIT</strong><span>MOVE WELL</span></div>
        </div>
      </aside>
      <div className="main-column">
        <header className="topbar">
          <span className="topbar-context">PERSONAL SPACE</span>
          <span className="avatar" aria-label="Account">A</span>
        </header>
        <Routes>
          <Route element={<Dashboard />} path="/" />
          <Route element={<SectionPage title="Activities" />} path="/activities" />
          <Route element={<SectionPage title="Teams" />} path="/teams" />
          <Route element={<SectionPage title="Leaderboard" />} path="/leaderboard" />
          <Route element={<SectionPage title="Workouts" />} path="/workouts" />
          <Route element={<Navigate replace to="/" />} path="*" />
        </Routes>
      </div>
    </div>
  )
}

export default App
