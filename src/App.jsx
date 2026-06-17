import React, { useState, useEffect } from 'react';
import { 
  Bell, 
  Briefcase, 
  Calendar, 
  Award, 
  AlertCircle,
  LayoutDashboard,
  Settings,
  LogOut,
  Search,
  Zap,
  ChevronRight
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

// Mock data for notifications
const initialNotifications = [
  {
    id: 1,
    type: 'placement',
    title: 'Google Campus Drive',
    description: 'Google is visiting for Software Engineering roles. Registration closes in 2 hours. Ensure your resume is updated before applying.',
    time: new Date(Date.now() - 1000 * 60 * 30), // 30 mins ago
    isNew: true
  },
  {
    id: 2,
    type: 'event',
    title: 'Tech Symposium 2026',
    description: 'Annual technical fest begins next week. Call for papers is now open! We are looking forward to massive participation.',
    time: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    isNew: true
  },
  {
    id: 3,
    type: 'result',
    title: 'Semester 6 Results Declared',
    description: 'The final results for B.Tech Semester 6 have been published on the portal. Click here to view your grade card.',
    time: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    isNew: false
  },
  {
    id: 4,
    type: 'alert',
    title: 'Library Overdue Notice',
    description: 'You have 2 books that are past their due date. Please return them to avoid accumulation of fines.',
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
        description: 'Check your email for the Microsoft interview shortlist updates. Interviews start tomorrow.',
        time: new Date(),
        isNew: true
      };
      setNotifications(prev => [newNotification, ...prev].slice(0, 10));
    }, 30000); // Faster updates for demo
    return () => clearInterval(interval);
  }, []);

  const getIcon = (type, size = 24) => {
    switch(type) {
      case 'placement': return <Briefcase size={size} />;
      case 'event': return <Calendar size={size} />;
      case 'result': return <Award size={size} />;
      case 'alert': return <AlertCircle size={size} />;
      default: return <Bell size={size} />;
    }
  };

  return (
    <>
      {/* Dynamic Aurora Background Layer */}
      <div className="aurora-bg">
        <div className="aurora-blob blob-1"></div>
        <div className="aurora-blob blob-2"></div>
        <div className="aurora-blob blob-3"></div>
      </div>

      <div className="app-container">
        {/* Premium Sidebar Nav */}
        <aside className="sidebar">
          <div className="logo">
            <Zap className="logo-icon" size={32} />
            CampusSync
          </div>

          <nav className="nav-menu" style={{ flex: 1 }}>
            <div className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`} onClick={() => setActiveTab('dashboard')}>
              <LayoutDashboard size={22} />
              <span>Overview</span>
            </div>
            <div className={`nav-item ${activeTab === 'placements' ? 'active' : ''}`} onClick={() => setActiveTab('placements')}>
              <Briefcase size={22} />
              <span>Placements</span>
            </div>
            <div className={`nav-item ${activeTab === 'events' ? 'active' : ''}`} onClick={() => setActiveTab('events')}>
              <Calendar size={22} />
              <span>Events</span>
            </div>
            <div className={`nav-item ${activeTab === 'results' ? 'active' : ''}`} onClick={() => setActiveTab('results')}>
              <Award size={22} />
              <span>Results</span>
            </div>
          </nav>

          <div className="nav-menu">
            <div className="nav-item">
              <Settings size={22} />
              <span>Settings</span>
            </div>
            <div className="nav-item" style={{ color: 'var(--danger-color)' }}>
              <LogOut size={22} />
              <span>Logout</span>
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="main-content">
          <header className="top-header">
            <div>
              <h1>Welcome back, Alex</h1>
              <p>Your portal for real-time campus updates & alerts.</p>
            </div>
            
            <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
              <div className="live-badge">
                <div className="dot"></div>
                LIVE SYSTEM
              </div>
              
              <div className="user-profile">
                <div className="bell-icon">
                  <Bell size={24} />
                  <span className="bell-badge">
                    {notifications.filter(n => n.isNew).length}
                  </span>
                </div>
                <div style={{ width: '1px', height: '24px', background: 'var(--card-border)' }}></div>
                <div className="avatar">AL</div>
              </div>
            </div>
          </header>

          {/* Premium Floating Stats Row */}
          <div className="stats-container">
            <div className="glass-card stat-card">
              <div className="stat-header">
                <div className="stat-icon" style={{ background: 'rgba(16, 185, 129, 0.15)', color: 'var(--success-color)' }}>
                  <Briefcase size={26} />
                </div>
                <ChevronRight size={20} color="var(--text-muted)" />
              </div>
              <div>
                <div className="stat-value">12</div>
                <div className="stat-label">Active Drives</div>
              </div>
            </div>
            <div className="glass-card stat-card">
              <div className="stat-header">
                <div className="stat-icon" style={{ background: 'rgba(139, 92, 246, 0.15)', color: 'var(--primary-color)' }}>
                  <Calendar size={26} />
                </div>
                <ChevronRight size={20} color="var(--text-muted)" />
              </div>
              <div>
                <div className="stat-value">5</div>
                <div className="stat-label">Upcoming Events</div>
              </div>
            </div>
            <div className="glass-card stat-card">
              <div className="stat-header">
                <div className="stat-icon" style={{ background: 'rgba(245, 158, 11, 0.15)', color: 'var(--warning-color)' }}>
                  <Award size={26} />
                </div>
                <ChevronRight size={20} color="var(--text-muted)" />
              </div>
              <div>
                <div className="stat-value">2</div>
                <div className="stat-label">New Results</div>
              </div>
            </div>
          </div>

          {/* Dynamic Feed */}
          <div className="glass-card feed-container">
            <div className="feed-header">
              <h2>Priority Inbox Feed</h2>
              <div className="search-bar">
                <Search size={18} color="var(--text-muted)" />
                <input type="text" placeholder="Search updates, companies..." />
              </div>
            </div>

            <div className="notification-list">
              {notifications.map((notification, index) => (
                <div 
                  key={notification.id} 
                  className={`notification-item type-${notification.type}`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="notif-icon-wrap">
                    {getIcon(notification.type, 28)}
                  </div>
                  
                  <div className="notif-content">
                    <div className="notif-header">
                      <div className="notif-title">
                        {notification.title}
                        {notification.isNew && <span className="badge-new">NEW</span>}
                      </div>
                      <div className="notif-time">
                        {formatDistanceToNow(notification.time, { addSuffix: true })}
                      </div>
                    </div>
                    
                    <p className="notif-desc">{notification.description}</p>
                    
                    <div className="notif-footer">
                      <span className="notif-tag">{notification.type}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default App;
