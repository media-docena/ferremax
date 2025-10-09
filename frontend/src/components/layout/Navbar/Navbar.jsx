// components/layout/Navbar.jsx
import React from 'react'

function Navbar({ navigationItems, activeItem }) {
  return (
    <div className='max-w-7xl mx-auto w-ful'>
      <nav className='font-roboto'>
        <div className='px-6'>
          <div className='flex items-center justify-start space-x-8 h-16'>
            {navigationItems.map((item, index) => (
              <a
                key={index}
                href={item.href || '#'}
                className={`flex items-center px-3 py-2 border-b-4 transition-colors duration-200 ${
                  activeItem === item.id
                    ? 'text-gray-900 border-yellow-400'
                    : 'text-gray-500 border-transparent hover:text-gray-900 hover:border-yellow-400'
                }`}
              >
                {/* Ícono */}
                <span className='mr-2'>{item.icon}</span>
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar
