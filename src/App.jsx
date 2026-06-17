import React, { useState, useEffect } from 'react';
import { 
  Bell, 
  Briefcase, 
  Calendar, 
  Award, 
  AlertCircle,
  LayoutDashboard,
  Settings,
  Search,
  Zap
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

// Mock data for notifications
const initialNotifications = [
  {
    id: 1,
    type: 'placement',
    title: 'Google Campus Drive',
    description: 'Google is visiting for Software Engineering roles. Registration closes in 2 hours.',
    time: new Date(Date.now() - 1000 * 60 * 30), // 30 mins ago
    isNew: true
  },
  {
    id: 2,
    type: 'event',
    title: 'Tech Symposium 2026',
    description: 'Annual technical fest begins next week. Call for papers is now open!',
    time: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    isNew: true
  },
  {
    id: 3,
    type: 'result',
    title: 'Semester 6 Results Declared',
    description: 'The results for B.Tech Semester 6 have been published on the portal.',
    time: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    isNew: false
  },
  {
    id: 4,
    type: 'alert',
    title: 'Library Overdue Notice',
    description: 'You have 2 books that are past their due date. Please return them to avoid fines.',
    time: new Date(Date.now() - 1000 * 60 * 60 * 48), // 2 days ago
    isNew: false
  }
];

function App() {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [activeTab, setActiveTab] = useState('dashboard');

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      const newNotification = {
        id: Date.now(),
        type: 'placement',
        title: 'New Interview Shortlist',
        description: 'Check your email for the Microsoft interview shortlist updates.',
        time: new Date(),
        isNew: true
      };
      setNotifications(prev => [newNotification, ...prev].slice(0, 10));
    }, 45000); // Every 45 seconds add a new mock notification
    return () => clearInterval(interval);
  }, []);

  const getIcon = (type) => {
    switch(type) {
      case 'placement': return <Briefcase size={24} />;
      case 'event': return <Calendar size={24} />;
      case 'result': return <Award size={24} />;
      case 'alert': return <AlertCircle size={24} />;
      default: return <Bell size={24} />;
    }
  };

  return (
    <div className="app-container">
      {/* Sidebar Navigation */}
      <aside className="sidebar">
        <div className="logo">
          <Zap className="logo-icon" size={28} />
          CampusSync
        </div>

        <nav className="nav-menu">
          <a className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`} onClick={() => setActiveTab('dashboard')}>
            <LayoutDashboard size={20} />
            Dashboard
          </a>
          <a className={`nav-item ${activeTab === 'placements' ? 'active' : ''}`} onClick={() => setActiveTab('placements')}>
            <Briefcase size={20} />
            Placements
          </a>
          <a className={`nav-item ${activeTab === 'events' ? 'active' : ''}`} onClick={() => setActiveTab('events')}>
            <Calendar size={20} />
            Events
          </a>
          <a className={`nav-item ${activeTab === 'results' ? 'active' : ''}`} onClick={() => setActiveTab('results')}>
            <Award size={20} />
            Results
          </a>
        </nav>

        <div style={{ marginTop: 'auto' }}>
          <div className="nav-menu">
            <a className="nav-item">
              <Settings size={20} />
              Settings
            </a>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="main-content">
        <header className="top-header">
          <div>
            <h1>Welcome Campus</h1>
            <p>Here's what's happening on campus today.</p>
          </div>
          
          <div className="user-profile">
            <div className="live-indicator">
              <div className="live-dot"></div>
              Live Updates
            </div>
            <div style={{ position: 'relative', marginLeft: '1rem' }}>
              <Bell size={24} style={{ cursor: 'pointer' }} />
              <span style={{
                position: 'absolute',
                top: -5,
                right: -5,
                background: 'var(--danger-color)',
                width: 18,
                height: 18,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '10px',
                fontWeight: 'bold'
              }}>
                {notifications.filter(n => n.isNew).length}
              </span>
            </div>
            <div className="avatar" style={{ marginLeft: '1rem' }}>AL</div>
          </div>
        </header>

        {/* Stats Row */}
        <div className="stats-container">
          <div className="glass-card stat-card">
            <div className="notification-icon icon-placement">
              <Briefcase size={28} />
            </div>
            <div className="stat-info">
              <h3>12</h3>
              <p>Active Drives</p>
            </div>
          </div>
          <div className="glass-card stat-card">
            <div className="notification-icon icon-event">
              <Calendar size={28} />
            </div>
            <div className="stat-info">
              <h3>5</h3>
              <p>Upcoming Events</p>
            </div>
          </div>
          <div className="glass-card stat-card">
            <div className="notification-icon icon-result">
              <Award size={28} />
            </div>
            <div className="stat-info">
              <h3>2</h3>
              <p>New Results</p>
            </div>
          </div>
        </div>

        {/* Notifications Feed */}
        <div className="glass-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2>Recent Notifications</h2>
            <div style={{ 
              background: 'rgba(255,255,255,0.05)', 
              padding: '0.5rem 1rem', 
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              border: '1px solid var(--glass-border)'
            }}>
              <Search size={16} color="var(--text-muted)" />
              <input 
                type="text" 
                placeholder="Search updates..." 
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'white',
                  outline: 'none',
                  fontFamily: 'inherit'
                }}
              />
            </div>
          </div>

          <div className="notification-feed">
            {notifications.map(notification => (
              <div key={notification.id} className="notification-item glass-card" style={{ padding: '1.25rem', background: 'rgba(255,255,255,0.02)' }}>
                <div className={`notification-icon icon-${notification.type}`}>
                  {getIcon(notification.type)}
                </div>
                <div className="notification-content">
                  <div className="notification-header">
                    <span className="notification-title">
                      {notification.title}
                      {notification.isNew && (
                        <span style={{ 
                          marginLeft: '0.5rem', 
                          fontSize: '0.7rem', 
                          background: 'var(--primary-color)', 
                          padding: '2px 6px', 
                          borderRadius: '4px' 
                        }}>NEW</span>
                      )}
                    </span>
                    <span className="notification-time">
                      {formatDistanceToNow(notification.time, { addSuffix: true })}
                    </span>
                  </div>
                  <p className="notification-desc">{notification.description}</p>
                  <span className={`notification-badge badge-${notification.type}`}>
                    {notification.type}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
