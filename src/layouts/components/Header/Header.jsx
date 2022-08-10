import React from 'react'
import classNames from 'classnames/bind'
import styles from "./Header.module.scss"
import { Link, useLocation } from 'react-router-dom'
import images from '~/assets/images'
import Search from './Search'
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGamepad, faHome, faPeopleGroup, faShop, faTelevision, faMessage, faBell, faBars } from '@fortawesome/free-solid-svg-icons'
import { faFacebookMessenger } from '@fortawesome/free-brands-svg-icons'
import Image from '~/components/Image'
import Notification from '~/layouts/components/Header/Notification';
import Message from '~/layouts/components/Header/Message';
import Account from '~/layouts/components/Header/Account'
const cx = classNames.bind(styles)
const Header = () => {
  const router = useLocation().pathname;
  return (
    <header className={cx('wrapper')}>
      <div className={cx('container')}>
        <div className={cx('left')}>
          <div className={cx('boxLogo')}>
            <Link to="/">
              <img className={cx('logo')} src={images.logo} alt="facebook" />
            </Link>
          </div>
          <Search/>
        </div>
        <div className={cx('center')}>
            <ul className={cx('listApps')}>
              <Tippy content="Trang chủ">
                <Link to="/" className={cx('app',{
                    'active':router==='/'
                })}>
                  <FontAwesomeIcon className={cx('icon')} icon={faHome}/>
                </Link >
              </Tippy>
              
              <Tippy content='Watch'>
                <Link to="/movies" className={cx('app',{
                  'active':router==='/movies'
                })}>
                  <FontAwesomeIcon className={cx('icon')} icon={faTelevision}/>
                </Link>
              </Tippy>

              <Tippy content='Marketplace'>
                <Link to="/markets" className={cx('app',{
                  'active':router==='/markets'
                })}>
                  <FontAwesomeIcon className={cx('icon')} icon={faShop}/>
                </Link>
              </Tippy>

              <Tippy content='Groups'>
                <Link to="/groups" className={cx('app',{
                  'active':router==='/groups'
                })}>
                  <FontAwesomeIcon className={cx('icon')} icon={faPeopleGroup}/>
                </Link>
              </Tippy>

              <Tippy content='Game'>
                <Link to="/game" className={cx('app',{
                  'active':router==='/game'
                })}>
                  <FontAwesomeIcon className={cx('icon')} icon={faGamepad}/>
                </Link>
              </Tippy>
            </ul>
        </div>
        <div className={cx('right')}>
            <div className={cx('listItems')}>
              <Tippy content='Menu'>
                <div className={cx('item')}>
                  <FontAwesomeIcon className={cx('icon')} icon={faBars}/>
                </div>
              </Tippy>
              <Message/>
              <Notification/>
              <Account/>
            </div>
        </div>
      </div>
    </header>
  )
}

export default Header