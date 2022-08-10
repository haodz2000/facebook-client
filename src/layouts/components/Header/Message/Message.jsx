import React, { useState } from 'react'
import classNames from 'classnames/bind'
import styles from "./Message.module.scss"

import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookMessenger } from '@fortawesome/free-brands-svg-icons'
import HeadlessTippy from '@tippyjs/react/headless';
import { faEllipsis, faVideo,faMaximize, faSearch } from '@fortawesome/free-solid-svg-icons';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import Conversation from '~/components/Conversation/Conversation';
import {Wrapper as PopperWrapper} from '~/components/Popper'
import { Link } from 'react-router-dom';
const cx = classNames.bind(styles)
let cons = [
  {
    id:"1",
    senderId:"1",
    receivedId: "2",
    newMessage:"Hello my friend",
    status:0 //old
  },
  {
    id:"2",
    senderId:"3",
    receivedId: "1",
    newMessage:"Hello my friend",
    status:1 //old
  },
  {
    id:"3",
    senderId:"5",
    receivedId: "1",
    newMessage:"Hello my friend",
    status:1 //old
  },
  {
    id:"4",
    senderId:"1",
    receivedId: "4",
    newMessage:"Hello my friend",
    status:0 //old
  },
]
const Message = () => {
  const [conversations,setConservation] = useState(
    cons.sort((a,b)=>b?.status - a?.status)
  )
  const [open, setOpen] = useState(false)
  return (
    <HeadlessTippy
      interactive
      visible= {open}
      render = {(attrs)=>(
        <div className={cx('conservations')} tabIndex="-1" {...attrs} >
            <PopperWrapper>
              <div className={cx('top')}>
                <div className={cx('left')}>
                  <h3>Chat</h3>
                </div>
                <div className={cx('right')}>
                  <div className={cx('listIcons')}>
                      <div className={cx('boxIcon')}>
                        <FontAwesomeIcon className={cx('icon')} icon={faEllipsis} />
                      </div>
                      <div className={cx('boxIcon')}>
                        <FontAwesomeIcon className={cx('icon')} icon={faMaximize} />
                      </div>
                      <div className={cx('boxIcon')}>
                        <FontAwesomeIcon className={cx('icon')} icon={faVideo} />
                      </div>
                      <div className={cx('boxIcon')}>
                        <FontAwesomeIcon className={cx('icon')} icon={faPenToSquare} />
                      </div>
                  </div>
                </div>
              </div>
              <div className={cx('search')}>
                <div className={cx('boxSearch')}>
                  <input type="text" className={cx('input')} placeholder='Tìm kiếm trên Messenger' />
                  <FontAwesomeIcon className={cx('iconSearch')} icon={faSearch} />
                </div>
              </div>
              <div className={cx('center')}>
                  {conversations?.map((data,index)=>(
                    <Conversation key={index} data={data}/>
                  ))}
              </div>
              <div className={cx('bottom')}>
                  <Link to='/'>
                      <span>Xem tất cả trong Messenger</span>
                  </Link>
              </div>
            </PopperWrapper>
        </div>
      )}
      onClickOutside = {()=>setOpen(false)}
    >
      <Tippy content='Messenger'>
          <div onClick={()=>setOpen(!open)} className={cx('item',{
            'active':open
          })}>
            <FontAwesomeIcon className={cx('icon')} icon={faFacebookMessenger}/>
            <span className={cx('badgeIcon')}>1</span>
          </div>
      </Tippy>
    </HeadlessTippy>
  )
}
export default Message