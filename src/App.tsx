import { useState } from "react";

type Screen = "home" | "create";
type IconName =
  | "home" | "feed" | "pin" | "plus" | "radio" | "bookmark" | "file"
  | "user" | "help" | "settings" | "search" | "bell" | "location"
  | "arrow" | "report" | "users" | "badge" | "eye" | "heart" | "comment"
  | "share" | "more" | "camera" | "video" | "upload" | "check" | "shield"
  | "map" | "logout" | "chevron";

const iconPaths: Record<IconName, React.ReactNode> = {
  home: <><path d="m3 11 9-8 9 8"/><path d="M5 10v10h14V10M9 20v-6h6v6"/></>,
  feed: <><path d="M4 5h16M4 10h10M4 15h16M4 20h10"/></>,
  pin: <><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></>,
  plus: <><path d="M12 5v14M5 12h14"/></>,
  radio: <><circle cx="12" cy="12" r="2"/><path d="M8.5 8.5a5 5 0 0 0 0 7M15.5 8.5a5 5 0 0 1 0 7M5.5 5.5a9 9 0 0 0 0 13M18.5 5.5a9 9 0 0 1 0 13"/></>,
  bookmark: <path d="M6 3h12v18l-6-4-6 4V3Z"/>,
  file: <><path d="M6 3h9l3 3v15H6V3Z"/><path d="M9 11h6M9 15h6M14 3v4h4"/></>,
  user: <><circle cx="12" cy="8" r="4"/><path d="M4 21c.8-5 3.5-7 8-7s7.2 2 8 7"/></>,
  help: <><circle cx="12" cy="12" r="9"/><path d="M9.7 9a2.4 2.4 0 1 1 3.1 2.3c-.8.3-.8 1-.8 1.7M12 17h.01"/></>,
  settings: <><circle cx="12" cy="12" r="3"/><path d="M19 13.5v-3l-2-.7-.6-1.4.9-1.9-2.1-2.1-1.9.9-1.4-.6-.7-2h-3l-.7 2-1.4.6-1.9-.9-2.1 2.1.9 1.9-.6 1.4-2 .7v3l2 .7.6 1.4-.9 1.9 2.1 2.1 1.9-.9 1.4.6.7 2h3l.7-2 1.4-.6 1.9.9 2.1-2.1-.9-1.9.6-1.4 2-.7Z"/></>,
  search: <><circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5"/></>,
  bell: <><path d="M18 9a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4"/></>,
  location: <><path d="m21 3-8 18-2-8-8-2 18-8Z"/></>,
  arrow: <><path d="M5 12h14M14 7l5 5-5 5"/></>,
  report: <><path d="M4 4h16v16H4zM8 8h8M8 12h8M8 16h5"/></>,
  users: <><circle cx="9" cy="8" r="3"/><path d="M3 19c.5-4 2.5-6 6-6s5.5 2 6 6M16 5c2 0 3 1.3 3 3s-1 3-3 3M17 13c2.5.3 3.7 2.1 4 5"/></>,
  badge: <><path d="M12 2 15 5l4 .5.5 4L22 12l-2.5 2.5-.5 4-4 .5-3 3-3-3-4-.5-.5-4L2 12l2.5-2.5.5-4L9 5l3-3Z"/><path d="m8.5 12 2.2 2.2 4.8-5"/></>,
  eye: <><path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z"/><circle cx="12" cy="12" r="2.5"/></>,
  heart: <path d="M20.8 5.8a5 5 0 0 0-7.1 0L12 7.5l-1.7-1.7a5 5 0 0 0-7.1 7.1L12 21l8.8-8.1a5 5 0 0 0 0-7.1Z"/>,
  comment: <path d="M21 12a8 8 0 0 1-8 8H4l2.2-3.2A8 8 0 1 1 21 12Z"/>,
  share: <><circle cx="18" cy="5" r="2.5"/><circle cx="6" cy="12" r="2.5"/><circle cx="18" cy="19" r="2.5"/><path d="m8.3 10.8 7.4-4.5M8.3 13.2l7.4 4.5"/></>,
  more: <><circle cx="5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/></>,
  camera: <><path d="M4 7h4l1.5-2h5L16 7h4v12H4V7Z"/><circle cx="12" cy="13" r="3.5"/></>,
  video: <><rect x="3" y="6" width="13" height="12" rx="1"/><path d="m16 10 5-3v10l-5-3"/></>,
  upload: <><path d="M12 16V4M7 9l5-5 5 5M4 20h16"/></>,
  check: <path d="m5 12 4 4L19 6"/>,
  shield: <path d="M12 3 4 6v6c0 5 3.4 8 8 10 4.6-2 8-5 8-10V6l-8-3Z"/>,
  map: <><path d="m3 6 6-3 6 3 6-3v15l-6 3-6-3-6 3V6Z"/><path d="M9 3v15M15 6v15"/></>,
  logout: <><path d="M10 4H4v16h6M14 8l4 4-4 4M8 12h10"/></>,
  chevron: <path d="m9 6 6 6-6 6"/>,
};

function Icon({ name, size = 18 }: { name: IconName; size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{iconPaths[name]}</svg>;
}

function Button({ children, className = "", ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button className={className} {...props}>{children}</button>;
}

const navItems: { icon: IconName; label: string }[] = [
  { icon: "home", label: "Home" }, { icon: "feed", label: "Local Feed" },
  { icon: "pin", label: "Explore Nearby" }, { icon: "plus", label: "Report an Issue" },
  { icon: "radio", label: "Live Reports" }, { icon: "bookmark", label: "Saved Reports" },
  { icon: "file", label: "My Contributions" }, { icon: "user", label: "Journalist Profile" },
];

const reports = [
  { type: "Photo", title: "Damaged road near the main bus stop", text: "A large pothole is forcing buses into the opposite lane during the morning commute.", location: "Avadi Bus Depot · Avadi", time: "18 min ago", author: "Maya Chen", initials: "MC", verified: true, status: "Open issue", likes: 48, comments: 12, visual: "road", image: "https://images.unsplash.com/photo-1560782205-4dd83ceb0270?auto=format&fit=crop&w=900&q=82", alt: "Close view of a damaged wet road surface" },
  { type: "Video", title: "Streetlights not working along residential road", text: "Residents say the lights have remained off for four nights, affecting three blocks.", location: "CTH Road · Ambattur", time: "42 min ago", author: "David Okoro", initials: "DO", verified: true, status: "Corporation notified", likes: 31, comments: 8, visual: "lights", image: "https://images.unsplash.com/photo-1781179740173-10ed914f8b83?auto=format&fit=crop&w=900&q=82", alt: "Residential city street illuminated at night" },
  { type: "Photo", title: "Overflowing public waste bin near the market", text: "Vendors are asking for an additional collection before the weekend market begins.", location: "Ambattur OT Market · Chennai", time: "1 hr ago", author: "Nia Patel", initials: "NP", verified: false, status: "Under review", likes: 22, comments: 6, visual: "waste", image: "https://images.unsplash.com/photo-1574676039880-73da8368f0eb?auto=format&fit=crop&w=900&q=82", alt: "Public waste bin beside a city street" },
  { type: "Live", title: "Residents report water supply disruption", text: "Community members are sharing updates from the public water point as crews arrive.", location: "S.A. Engineering College · Poonamallee", time: "Live now", author: "Jon Bell", initials: "JB", verified: true, status: "Live coverage", likes: 76, comments: 24, visual: "water", image: "https://images.unsplash.com/photo-1688846875539-3e668edcb853?auto=format&fit=crop&w=900&q=82", alt: "Water flowing from a public outdoor faucet" },
];

const trusted = [
  { name: "Maya Chen", detail: "86 verified reports", initials: "MC" },
  { name: "David Okoro", detail: "Civic issues · 94% reliable", initials: "DO" },
  { name: "Nia Patel", detail: "52 helpful contributions", initials: "NP" },
];

function Sidebar({ screen, setScreen }: { screen: Screen; setScreen: (screen: Screen) => void }) {
  return (
    <aside className="sidebar">
      <Button className="brand" onClick={() => setScreen("home")} aria-label="SPADE home">
        <span className="spade">♠</span><span>SPADE</span>
      </Button>
      <nav className="nav-list" aria-label="Primary navigation">
        {navItems.map((item) => {
          const active = (item.label === "Home" && screen === "home") || (item.label === "Report an Issue" && screen === "create");
          return <Button key={item.label} className={`nav-item ${active ? "active" : ""}`} onClick={() => item.label === "Report an Issue" ? setScreen("create") : setScreen("home")}><Icon name={item.icon} /><span>{item.label}</span>{item.label === "Live Reports" && <i className="live-dot" />}</Button>;
        })}
      </nav>
      <div className="sidebar-bottom">
        <Button className="nav-item"><Icon name="help" /><span>Help & Guidelines</span></Button>
        <Button className="nav-item"><Icon name="settings" /><span>Settings</span></Button>
        <div className="profile">
          <span className="avatar dark">AK</span>
          <span className="profile-copy"><strong>Amara King</strong><small>Community contributor</small></span>
          <Button className="plain-icon" aria-label="Log out"><Icon name="logout" size={17} /></Button>
        </div>
      </div>
    </aside>
  );
}

function Topbar({ locationOn, setLocationOn }: { locationOn: boolean; setLocationOn: (value: boolean) => void }) {
  return (
    <header className="topbar">
      <Button className="location-select"><Icon name="pin" size={16} /><span><small>EXPLORE YOUR COMMUNITY</small>Avadi, Tamil Nadu</span><span className="down">⌄</span></Button>
      <label className="search"><Icon name="search" size={17} /><input aria-label="Search reports" placeholder="Search reports, locations, or topics" /></label>
      <Button className={`location-status ${locationOn ? "on" : ""}`} onClick={() => setLocationOn(!locationOn)} title="Location sharing is optional"><Icon name="location" size={15} /><span>{locationOn ? "Location on" : "Location off"}</span></Button>
      <Button className="icon-button notify" aria-label="Notifications"><Icon name="bell" /><i /></Button>
      <span className="avatar">AK</span>
    </header>
  );
}

function SummaryCards() {
  const items: { icon: IconName; label: string; value: string; note: string }[] = [
    { icon: "report", label: "Community Reports", value: "1,284", note: "+42 this week" },
    { icon: "pin", label: "Nearby Issues", value: "38", note: "Within 5 km" },
    { icon: "badge", label: "Verified Spaders", value: "216", note: "Trusted contributors" },
    { icon: "users", label: "Following", value: "64", note: "People & topics" },
  ];
  return <div className="summary-grid">{items.map((item) => <div className="summary-card" key={item.label}><span className="summary-icon"><Icon name={item.icon} size={19} /></span><div><small>{item.label}</small><strong>{item.value}</strong><span>{item.note}</span></div></div>)}</div>;
}

function ReportCard({ report }: { report: typeof reports[number] }) {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  return (
    <article className="report-card">
      <div className={`media-placeholder has-image ${report.visual}`}>
        <img src={report.image} alt={report.alt} />
        <span className="media-shade" />
        <span className="media-label"><Icon name={report.type === "Video" || report.type === "Live" ? "video" : report.type === "Photo" ? "camera" : "file"} size={14} />{report.type}</span>
        {report.type === "Live" && <span className="live-label"><i /> LIVE</span>}
      </div>
      <div className="report-body">
        <div className="report-meta"><span>{report.location}</span><span>•</span><span>{report.time}</span><Button className="more"><Icon name="more" /></Button></div>
        <h3>{report.title}</h3>
        <p>{report.text}</p>
        <div className="contributor">
          <span className="avatar small">{report.initials}</span>
          <strong>{report.author}</strong>
          {report.verified && <span className="verified"><Icon name="badge" size={13} /> Verified</span>}
          <span className="status">{report.status}</span>
        </div>
        <div className="engagement">
          <Button className={liked ? "selected" : ""} onClick={() => setLiked(!liked)}><Icon name="heart" size={17} />{report.likes + (liked ? 1 : 0)}</Button>
          <Button><Icon name="comment" size={17} />{report.comments}</Button>
          <Button><Icon name="share" size={17} />Share</Button>
          <Button className={`save ${saved ? "selected" : ""}`} onClick={() => setSaved(!saved)}><Icon name="bookmark" size={17} />{saved ? "Saved" : "Save"}</Button>
        </div>
      </div>
    </article>
  );
}

function AroundYou({ locationOn, setLocationOn }: { locationOn: boolean; setLocationOn: (value: boolean) => void }) {
  return (
    <section className="side-panel">
      <div className="panel-heading"><div><small>LOCAL CONTEXT</small><h3>Around You</h3></div><span>18 reports</span></div>
      <div className="map-placeholder">
        <img src="https://images.unsplash.com/photo-1499631507243-7290571550ed?auto=format&fit=crop&w=800&q=80" alt="Aerial view of a residential neighborhood" />
        <span className="map-shade" />
        <span className="road r1" /><span className="road r2" /><span className="road r3" /><span className="block b1" /><span className="block b2" /><span className="block b3" />
        <span className="map-pin p1"><i /></span><span className="map-pin p2"><i /></span><span className="map-pin p3"><i /></span>
        <span className="current-location"><i /><b>YOU</b></span>
        <span className="map-caption"><Icon name="map" size={14} /> Avadi & Ambattur · 5 km</span>
      </div>
      <div className="issue-list">
        <div><span>01</span><p><strong>Roads & transport</strong><small>7 active reports</small></p></div>
        <div><span>02</span><p><strong>Public services</strong><small>5 active reports</small></p></div>
        <div><span>03</span><p><strong>Safety & access</strong><small>3 active reports</small></p></div>
      </div>
      <Button className="outline full">Explore reports by area <Icon name="arrow" size={15} /></Button>
      <div className="location-toggle"><span><Icon name="location" size={16} /><span><strong>Share my location</strong><small>Optional · used only for nearby reports</small></span></span><Button className={`switch ${locationOn ? "on" : ""}`} onClick={() => setLocationOn(!locationOn)} aria-label="Toggle location sharing"><i /></Button></div>
    </section>
  );
}

function TrustedSpaders() {
  return (
    <section className="side-panel trusted-panel">
      <div className="panel-heading"><div><small>COMMUNITY TRUST</small><h3>Trusted Spaders</h3></div><Button className="text-link">View all</Button></div>
      <div className="trusted-list">{trusted.map((person) => <div key={person.name}><span className="avatar">{person.initials}</span><p><strong>{person.name} <Icon name="badge" size={13} /></strong><small>{person.detail}</small></p><Button className="plain-icon"><Icon name="chevron" size={15} /></Button></div>)}</div>
    </section>
  );
}

function ProgressPanel() {
  return (
    <section className="progress-panel">
      <div className="progress-intro"><small>YOUR REPORTING PROGRESS</small><h2>Trust is built report by report.</h2><p>Higher publishing privileges are earned through responsible reporting, verification, and a trustworthy contribution history.</p></div>
      <div className="progress-metrics">
        <div><strong>24</strong><span>Total submitted</span></div><div><strong>18</strong><span>Reports verified</span></div><div><strong>438</strong><span>Community responses</span></div>
      </div>
      <div className="level-progress">
        <div><span><strong>Reliable Contributor</strong><small>72% toward Journalist status</small></span><b>72%</b></div>
        <div className="progress-track"><i /></div>
        <p><Icon name="shield" size={15} /> 11-month responsible reporting history · No guideline violations</p>
      </div>
      <div className="journal-badge">
        <span className="badge-mark">♠</span>
        <div><small>NEXT CREDENTIAL</small><strong>SPADE Journalist</strong><span>Earned through verified public-interest reporting</span></div>
      </div>
    </section>
  );
}

function Dashboard({ setScreen, locationOn, setLocationOn }: { setScreen: (screen: Screen) => void; locationOn: boolean; setLocationOn: (value: boolean) => void }) {
  const [filter, setFilter] = useState("All reports");
  return (
    <>
      <section className="hero">
        <div><span className="eyebrow">SPADE COMMUNITY DESK · MONDAY, JUNE 16</span><h1>Your Community, In Focus</h1><p>Local stories. Real voices. Public impact.</p></div>
        <div className="hero-actions"><Button className="outline">Explore Reports</Button><Button className="primary" onClick={() => setScreen("create")}><Icon name="plus" size={17} />Create Report</Button></div>
      </section>
      <SummaryCards />
      <div className="content-grid">
        <main className="feed">
          <div className="section-header"><div><small>COMMUNITY NEWSROOM</small><h2>Latest Community Reports</h2></div><Button className="text-link">View local feed <Icon name="arrow" size={15} /></Button></div>
          <div className="filters">{["All reports", "Nearby", "Most discussed", "Verified only"].map((item) => <Button key={item} className={filter === item ? "active" : ""} onClick={() => setFilter(item)}>{item}</Button>)}</div>
          <div className="report-list">{reports.map((report) => <ReportCard report={report} key={report.title} />)}</div>
          <Button className="outline load-more">Load more community reports</Button>
        </main>
        <aside className="context"><AroundYou locationOn={locationOn} setLocationOn={setLocationOn} /><TrustedSpaders /></aside>
      </div>
      <ProgressPanel />
    </>
  );
}

function CreateReport({ setScreen, locationOn, setLocationOn }: { setScreen: (screen: Screen) => void; locationOn: boolean; setLocationOn: (value: boolean) => void }) {
  const [category, setCategory] = useState("Public infrastructure");
  const [mediaType, setMediaType] = useState("upload");
  const [preview, setPreview] = useState(false);
  return (
    <div className="create-page">
      <Button className="back-link" onClick={() => setScreen("home")}>← Back to community dashboard</Button>
      <section className="create-heading">
        <div><span className="eyebrow">NEW COMMUNITY REPORT</span><h1>Report what matters.</h1><p>Share accurate, firsthand information that helps your community understand and respond.</p></div>
        <div className="draft-status"><span /><div><strong>Draft saved</strong><small>Only visible to you</small></div></div>
      </section>
      <div className="create-layout">
        <main className="report-form">
          <div className="form-section">
            <div className="step-number">01</div><div className="form-content"><h2>Tell the story</h2><p>Lead with what happened. Be specific, factual, and clear.</p>
              <label className="field"><span>Report title <b>Required</b></span><input placeholder="What happened in your community?" maxLength={100} /><small>0 / 100 characters</small></label>
              <label className="field"><span>Description & story details <b>Required</b></span><textarea placeholder="Share what you witnessed, when it happened, who is affected, and any context that can be verified." rows={7} /><small>Include only information you can responsibly stand behind.</small></label>
            </div>
          </div>
          <div className="form-section">
            <div className="step-number">02</div><div className="form-content"><h2>Add supporting media</h2><p>Photos and videos can help others understand the issue. This step is optional.</p>
              <div className="media-tabs"><Button className={mediaType === "upload" ? "active" : ""} onClick={() => setMediaType("upload")}><Icon name="upload" />Upload media</Button><Button className={mediaType === "live" ? "active" : ""} onClick={() => setMediaType("live")}><Icon name="radio" />Start live broadcast</Button></div>
              <Button className="upload-zone"><span><Icon name={mediaType === "live" ? "radio" : "camera"} size={24} /></span><strong>{mediaType === "live" ? "Prepare a live community broadcast" : "Drop an image or video here"}</strong><small>{mediaType === "live" ? "Review safety guidance before going live" : "or click to browse · JPG, PNG, MP4 up to 100 MB"}</small></Button>
            </div>
          </div>
          <div className="form-section">
            <div className="step-number">03</div><div className="form-content"><h2>Context & location</h2><p>Help route your report to the right community and public-interest topics.</p>
              <label className="field"><span>Report category <b>Required</b></span><select value={category} onChange={(event) => setCategory(event.target.value)}><option>Public infrastructure</option><option>Public safety</option><option>Environment</option><option>Transport</option><option>Community event</option><option>Other</option></select></label>
              <label className="field"><span>Location <em>Optional</em></span><div className="location-input"><Icon name="pin" size={17} /><input placeholder="Search for a street, landmark, or neighborhood" /></div></label>
              <div className="location-permission"><span><Icon name="location" /><span><strong>Use my current location</strong><small>Precise location is never required and can be removed before publishing.</small></span></span><Button className={`switch ${locationOn ? "on" : ""}`} onClick={() => setLocationOn(!locationOn)}><i /></Button></div>
            </div>
          </div>
          <div className="submit-row"><Button className="outline" onClick={() => setPreview(true)}><Icon name="eye" size={17} />Preview report</Button><Button className="primary"><Icon name="arrow" size={17} />Submit for review</Button></div>
        </main>
        <aside className="creation-aside">
          <section className="guidelines-card"><span className="guideline-icon"><Icon name="shield" /></span><small>BEFORE YOU PUBLISH</small><h3>Report responsibly</h3><ul><li><Icon name="check" size={15} />Share only what you witnessed or verified.</li><li><Icon name="check" size={15} />Protect the privacy of vulnerable people.</li><li><Icon name="check" size={15} />Avoid speculation and harmful language.</li><li><Icon name="check" size={15} />For immediate danger, contact emergency services first.</li></ul><Button className="text-link">Read community guidelines <Icon name="arrow" size={14} /></Button></section>
          <section className="safety-note"><strong>Safety reminder</strong><p>Never put yourself at risk to capture a report. Your safety and the safety of others comes first.</p></section>
          <section className="process-card"><small>WHAT HAPPENS NEXT</small><div><span>1</span><p><strong>Community review</strong><small>Basic accuracy and safety checks</small></p></div><div><span>2</span><p><strong>Local publication</strong><small>Visible to relevant communities</small></p></div><div><span>3</span><p><strong>Trust history</strong><small>Verified work builds contributor standing</small></p></div></section>
        </aside>
      </div>
      {preview && <div className="modal-backdrop" onClick={() => setPreview(false)}><div className="preview-modal" onClick={(event) => event.stopPropagation()}><div className="modal-head"><span>REPORT PREVIEW</span><Button className="plain-icon" onClick={() => setPreview(false)}>×</Button></div><div className="preview-media"><Icon name="camera" size={28} /><span>Media preview</span></div><span className="type-chip">PUBLIC INFRASTRUCTURE</span><h2>Your report title will appear here</h2><p>Your story details will be shown here exactly as the community will read them. Review facts, location details, and attached media before submitting.</p><div className="preview-author"><span className="avatar">AK</span><span><strong>Amara King</strong><small>Avadi, Tamil Nadu · Draft preview</small></span></div><Button className="primary full" onClick={() => setPreview(false)}>Continue editing</Button></div></div>}
    </div>
  );
}

export default function App() {
  const [screen, setScreen] = useState<Screen>("home");
  const [locationOn, setLocationOn] = useState(false);
  return (
    <div className="app-shell">
      <Sidebar screen={screen} setScreen={setScreen} />
      <div className="workspace">
        <Topbar locationOn={locationOn} setLocationOn={setLocationOn} />
        <div className="page">{screen === "home" ? <Dashboard setScreen={setScreen} locationOn={locationOn} setLocationOn={setLocationOn} /> : <CreateReport setScreen={setScreen} locationOn={locationOn} setLocationOn={setLocationOn} />}</div>
      </div>
    </div>
  );
}
