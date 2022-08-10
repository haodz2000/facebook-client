import React, { useState } from 'react'
import classNames from 'classnames/bind'
import styles from "./Notification.module.scss"

import HeadlessTippy from '@tippyjs/react/headless';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faEllipsis } from '@fortawesome/free-solid-svg-icons';
import {Wrapper as PopperWrapper} from '~/components/Popper'
import { Link } from 'react-router-dom';
import Image from '~/components/Image';
import { Notify } from '~/components/Notification';

const cx = classNames.bind(styles)
const Notification = () => {
  const [open, setOpen] = useState(false)
  const [option, setOption] = useState(true)
  return (
    <HeadlessTippy
      interactive
      visible = {open}
      onClickOutside = {()=>setOpen(false)}
      render = {(attrs)=>(
        <div className={cx('notifications')} tabIndex="-1" {...attrs} >
          <PopperWrapper>
            <div className={cx('container')}>
              <div className={cx('header')}>
                  <div className={cx('top')}>
                      <div className={cx('title')}>
                        Thông báo
                      </div>
                      <div className={cx('more')}>
                        <FontAwesomeIcon icon={faEllipsis}/>
                      </div>
                  </div>
                  <div className={cx('bottom')}>
                      <div onClick={()=>setOption(true)} className={cx('option',{'select':option})}>
                        <span>Tất cả</span>
                      </div>
                      <div onClick={()=>setOption(false)} className={cx('option',{'select':!option})}>
                        <span>Chưa đọc</span>
                      </div>
                  </div>
              </div>
              <div className={cx('new')}>
                  <div className={cx('top')}>
                      <span>Mới</span>
                      <Link to="#">Xem tất cả</Link>
                  </div>
                  <div className={cx('content')}>
                      <Notify/>
                      <Notify/>
                  </div>
              </div>
              <div className={cx('old')}>
                  <div className={cx('top')}>
                      <span>Trước đó</span>
                  </div>
                  <div className={cx('content')}>
                      <Notify/>
                      <Notify/>
                      <Notify/>
                      <Notify/>
                      <Notify/>
                      <Notify/>
                  </div>
              </div>
            </div>
          </PopperWrapper>
        </div>
      )}
    >
      <Tippy content='Thông báo'>
          <div onClick={()=>setOpen(!open)} className={cx('item',{'active':open})}>
              <FontAwesomeIcon className={cx('icon')} icon={faBell}/>
              <span className={cx('badgeIcon')}>2</span>
          </div>
      </Tippy>
    </HeadlessTippy>
  )
}

export default Notification