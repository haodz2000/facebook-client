import React, { useState } from 'react'
import classNames from 'classnames/bind'
import styles from "./Message.module.scss"

import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookMessenger } from '@fortawesome/free-brands-svg-icons'
import HeadlessTippy from '@tippyjs/react/headless';
import {Wrapper as PopperWrapper} from '~/components/Popper'
import Conversations from '~/components/Conversations';
const cx = classNames.bind(styles)
const Message = () => {
  const [open, setOpen] = useState(false)
  return (
    <div>
      <HeadlessTippy
        interactive
        visible= {open}
        render = {(attrs)=>(
          <div className={cx('conservations')} tabIndex="-1" {...attrs} >
              <PopperWrapper>
                <Conversations/>
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
    </div>
  )
}
export default Message