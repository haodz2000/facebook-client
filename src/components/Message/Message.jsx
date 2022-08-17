import React from 'react'
import { useState,useEffect } from 'react'
import classNames from 'classnames/bind'
import styles from "./Message.module.scss"
import Image from '../Image'
import images from '~/assets/images'
import * as userService from "~/services/userService"
import Tippy from '@tippyjs/react'
const cx = classNames.bind(styles)
const Message = ({msg,own,user}) => {
  return (
    <div className={cx('wrapper',{
        'own': own
    })}>
        <div className={cx('container')}>
          <div className={cx('user')}>
              <Tippy content={user?.firstName}>
                <Image className={cx('avatar')} src={user?.avatar||images.avatar} />
              </Tippy>
          </div>
          <div className={cx('message')}>
                {msg.image&&(
                  <div className={cx('boxImage')}>
                    <Image className={cx('image')} src={msg?.image} />
                </div>
                )}
                <Tippy placement='left' content={msg?.createdAt}>
                  <div className={cx('text')}>
                      <span>
                        {
                            msg.message
                        }
                      </span>
                  </div>
                </Tippy>
          </div>
        </div>
    </div>
  )
}

export default Message