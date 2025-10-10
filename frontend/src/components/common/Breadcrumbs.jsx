// components/common/Breadcrumbs.jsx
import { NavLink } from 'react-router';
import ChevronRightIcon from '../../assets/icons/chevron_right.svg?react';

function Breadcrumbs ({ items }) {
  return (
    <nav aria-label='Breadcrumb' className='text-sm mb-4'>
      <ol className='list-none p-0 inline-flex'>
        {items.map((item, index) => (
          <li key={index} className='flex items-center'>
            {index > 0 && (
              <span className='mx-2 text-gray-500'>
                <ChevronRightIcon />
              </span>
            )}
            {item.href ? (
              <NavLink to={item.href} className='text-gray-500 hover:text-gray-900' end>
                {item.label}
              </NavLink>
            ) : (
              <span className='text-gray-900'>{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;