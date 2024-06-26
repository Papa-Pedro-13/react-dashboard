import React, { useEffect } from 'react';

import { AiOutlineMenu } from 'react-icons/ai';
import { BsChatLeft } from 'react-icons/bs';
import { FiShoppingCart } from 'react-icons/fi';
import { RiNotification3Line } from 'react-icons/ri';
import { MdKeyboardArrowDown } from 'react-icons/md';

import avatar from '../data/avatar.jpg';

import { useStateContext } from '../context/ContextProvider';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';

import { Chat, UserProfile, Notification, Cart } from '.';

const NavButton = ({ title, customFunc, icon, color, dotColor }) => (
  <TooltipComponent
    content={title}
    position='BottomCenter'
  >
    <button
      type='button'
      style={{ color }}
      className='relative text-xl rounded-full p-3 hover:bg-light-gray'
      onClick={customFunc}
    >
      <span
        style={{ background: dotColor }}
        className='absolute inline-flex rounded-full h-2 w-2 right-2 top-2'
      />
      {icon}
    </button>
  </TooltipComponent>
);

const Navbar = () => {
  const {
    activeMenu,
    setActiveMenu,
    isClicked,
    setIsClicked,
    handleClick,
    screenSize,
    setScreenSize,
  } = useStateContext();

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);
    window.addEventListener('resize', handleResize);
    handleResize();
  }, [setScreenSize]);

  useEffect(() => {
    if (screenSize <= 900) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize, setActiveMenu]);

  return (
    <div className='flex justify-between p-2 md:mx-6 relative'>
      <NavButton
        title={'Menu'}
        color={'blue'}
        icon={<AiOutlineMenu />}
        customFunc={() => setActiveMenu((prev) => !prev)}
      />
      <div className='flex'>
        <NavButton
          title={'Cart'}
          color={'blue'}
          icon={<FiShoppingCart />}
          customFunc={() => handleClick('cart')}
        />
        <NavButton
          title={'Chat'}
          dotColor={'#03c9d7'}
          color={'blue'}
          icon={<BsChatLeft />}
          customFunc={() => handleClick('chat')}
        />
        <NavButton
          title={'Notification'}
          dotColor={'#03c9d7'}
          color={'blue'}
          icon={<RiNotification3Line />}
          customFunc={() => handleClick('notification')}
        />
        <TooltipComponent
          content={'Profile'}
          position='BottomCenter'
        >
          <div
            className='flex items-center gap-2 cursor-pointer p-1 hover:bg-light-gray rounded-lg'
            onClick={() => handleClick('userProfile')}
          >
            <img
              className='rounded-full w-8 h-8'
              alt='avatar'
              src={avatar}
            />
            <p>
              <span className='text-gray-400 text-14'>Hi, </span>
              <span className='text-gray-400 text-14 font-bold ml-1 '>
                Michael
              </span>
            </p>
            <MdKeyboardArrowDown className='text-gray-400 text-14' />
          </div>
        </TooltipComponent>
        {isClicked.cart && <Cart />}
        {isClicked.chat && <Chat />}
        {isClicked.notification && <Notification />}
        {isClicked.userProfile && <UserProfile />}
      </div>
    </div>
  );
};

export default Navbar;
