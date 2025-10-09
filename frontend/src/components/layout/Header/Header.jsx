// components/layout/Header.jsx
import React, { useState } from 'react';
import Navbar from '../Navbar/Navbar';
import HomeIcon from '../../../assets/icons/home.svg?react';
import GroupIcon from '../../../assets/icons/user_group.svg?react';
import InventoryIcon from '../../../assets/icons/inventory.svg?react';
import ShoppingCartIcon from '../../../assets/icons/shopping_cart.svg?react';
import BarChartIcon from '../../../assets/icons/bar_chart.svg?react';
import DescriptionIcon from '../../../assets/icons/description.svg?react';
import LogoIcon from '../../../assets/icons/logo.svg?react';
import LogoutIcon from '../../../assets/icons/logout.svg?react';
import PersonIcon from '../../../assets/icons/person.svg?react';
import ArrowDropDownIcon from '../../../assets/icons/arrow_drop_down.svg?react';

function Header({ userName, userRole, onLogout, activeItem }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const navigationItems = [
    {
      id: 'home',
      label: 'HOME',
      icon: <HomeIcon />,
      href: '#',
    },
    {
      id: 'users',
      label: 'USUARIOS',
      icon: <GroupIcon />,
      href: '#',
    },
    {
      id: 'inventory',
      label: 'INVENTARIO',
      icon: <InventoryIcon />,
      href: '#',
    },
    {
      id: 'sales',
      label: 'VENTAS',
      icon: <ShoppingCartIcon />,
      href: '#',
    },
    {
      id: 'reports',
      label: 'REPORTES',
      icon: <BarChartIcon />,
      href: '#',
    },
    {
      id: 'documentation',
      label: 'DOCUMENTACIÓN',
      icon: <DescriptionIcon />,
      href: '#',
    },
  ];

  return (
    <div>
      <header>
        {/* Top Header Bar */}
            <div className='bg-yellow-400 px-6 py-2 flex justify-between items-center'>
              <div className='flex items-center gap-4'>
                <div className='text-gray-800'>
                  <LogoIcon className='w-18 h-18' />
                </div>
                <h1 className='font-roboto text-3xl font-bold text-gray-800'>
                  FerreMax
                </h1>
              </div>
              <div className='relative'>
                <button
                  className='flex items-center gap-4 cursor-pointer'
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  <div className='bg-white rounded-full w-12 h-12 flex items-center justify-center'>
                    <div>
                      <PersonIcon className='w-8 h-8 fill-gray-600' />
                    </div>
                  </div>
                  <div className='text-left'>
                    <p className='font-roboto font-semibold text-gray-800'>
                      {userName}
                    </p>
                    <p className='font-roboto text-sm text-gray-700'>
                      {userRole}
                    </p>
                  </div>
                  <div>
                    <ArrowDropDownIcon className='fill-gray-800' />
                  </div>
                </button>
                {isDropdownOpen && (
                  <div className='absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50'>
                    <button
                      className='flex items-center px-4 py-2 font-roboto text-sm text-gray-700 hover:bg-gray-100 w-full text-left'
                      onClick={onLogout}
                    >
                      <span className='mr-3'>
                        <LogoutIcon className='w-5 h-5 fill-gray-700' />
                      </span>
                      Cerrar Sesión
                    </button>
                  </div>
                )}
              </div>
            </div>
        {/* Navigation Bar */}
        <div className='bg-white shadow-md'>
          <Navbar navigationItems={navigationItems} activeItem={activeItem} />
        </div>
      </header>
    </div>
  );
}

export default Header;
