import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Sidebar({ isCollapsed }) {
  const location = useLocation();

  const navItems = [
    { path: '/', icon: '🏠', label: 'Home' },
    { path: '/onboarding', icon: '📋', label: 'Onboarding' },
    { path: '/dashboard', icon: '📚', label: 'Dashboard' },
    { path: '/record', icon: '🎙️', label: 'Record Story' }
  ];

  return (
    <aside
      className={`transition-all duration-500 bg-[var(--color-primary)] p-6 shadow-lg ${
        isCollapsed ? 'w-16' : 'w-64'
      } min-h-screen`}
    >
      <nav>
        <ul className="space-y-2">
          {navItems.map(({ path, icon, label }) => (
            <li key={path}>
              <Link
                to={path}
                className="flex items-center gap-4 px-4 py-3 rounded-md text-white font-medium"
              >
                <span className="text-2xl">{icon}</span>
                {!isCollapsed && <span>{label}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;