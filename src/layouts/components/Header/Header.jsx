import React, { useEffect,useState } from 'react'
import {io} from 'socket.io-client'
import classNames from 'classnames/bind'
import styles from "./Header.module.scss"
import { Link, useLocation } from 'react-router-dom'
import images from '~/assets/images'
import Search from './Search'
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGamepad, faHome, faPeopleGroup, faShop, faTelevision, faBars } from '@fortawesome/free-solid-svg-icons'
import {connect,getOnline} from "~/redux/features/socketSlice"
// import { faFacebookMessenger } from '@fortawesome/free-brands-svg-icons'
// import Image from '~/components/Image'
import Notification from '~/layouts/components/Header/Notification';
import Message from '~/layouts/components/Header/Message';
import Account from '~/layouts/components/Header/Account'
import { useDispatch, useSelector } from 'react-redux'
import { useRef } from 'react'
const cx = classNames.bind(styles)
const Header = () => {
  const dispatch = useDispatch()
    const currentUser = useSelector((state)=>state.user.currentUser)
    const Socket = useRef()
    const socket = useSelector((state)=>state.socket.socket)
    useEffect(()=>{
        Socket.current = io("https://facebook-api-server.herokuapp.com/")
        if(Socket.current){
            dispatch(connect(Socket))
        }
        return ()=>{
            socket?.disconnect();
            socket?.on("getOnlineUser",(users)=>{
              dispatch(getOnline(users))
            })
        }
    },[])
    useEffect(()=>{
        socket?.emit("addUser",currentUser._id)
        socket?.on("getOnlineUser",(users)=>{
            dispatch(getOnline(users))
        })
    },[currentUser,socket])
  const router = useLocation().pathname.split("/");

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
              {!router?.includes("messenger")&&<Message/>}
              <Notification/>
              <Account/>
            </div>
        </div>
      </div>
    </header>
  )
}

export default Header