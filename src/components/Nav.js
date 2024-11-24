import React from 'react';
import logo from '../images/logo .svg'

const Nav = ()  => { 
    
  return ( 
   <nav>
   <a href='/'>
   <img src={logo} alt='logo'/>
   </a>
  {/* mobile navbar */}

  <div>
  <div classname='bar'></div>
  <div classname='bar'></div>
  <div classname='bar'></div>

  {/* nav items */}
  </div>
  
  
   </nav>
  );
}

export default Nav;
