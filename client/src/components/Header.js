import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";

function Header({ isCollapsed }) {
  const { loginWithRedirect, logout, user, isAuthenticated } = useAuth0();

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/onboarding', label: 'Onboarding' },
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/record', label: 'Record Story' }
  ];

  return (
    <header className="sticky top-0 bg-[var(--color-primary)] shadow-md z-50">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between whitespace-nowrap">
        
        {/* Left Side: Logo */}
        <div className="relative flex items-center h-full">
          <h1 className="text-2xl font-bold leading-none absolute top-1/2 transform -translate-y-1/2 whitespace-nowrap heritage-white-text">
            <Link 
              to="/" 
              className="no-hover"  // No hover class
            >
              Heritage Vault
            </Link>
          </h1>
        </div>

        <div className="flex items-center gap-8">
          {/* Nav Items when Sidebar is Collapsed */}
          {isCollapsed && (
            <nav className="flex items-center gap-6">
              {navItems.map(({ path, label }) => (
                <Link 
                  key={path} 
                  to={path} 
                  className="text-white text-lg font-medium hover:text-[var(--color-accent)]"
                >
                  {label}
                </Link>
              ))}
            </nav>
          )}

          {/* Login/Logout Section */}
          {!isAuthenticated ? (
            <button
              onClick={() => loginWithRedirect()}
              className="bg-white text-[var(--color-primary)] px-4 py-2 rounded-md 
                font-medium shadow-md hover:bg-gray-100"
            >
              Login with Google
            </button>
          ) : (
            <div className="flex items-center gap-4">
              <span className="text-white text-lg font-medium">
                Welcome, {user.name}
              </span>
              <button
                onClick={() => logout({ returnTo: window.location.origin })}
                className="bg-white text-[var(--color-primary)] px-4 py-2 rounded-md 
                  font-medium shadow-md hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;