import React from 'react'
import PropTypes from 'prop-types';
import Tippy from '@tippyjs/react'
import classNames from 'classnames/bind'

import styles from "./Message.module.scss"
import Image from '../Image'
import images from '~/assets/images'
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
                            msg?.message
                        }
                      </span>
                  </div>
                </Tippy>
          </div>
        </div>
    </div>
  )
}
Message.propTypes = {
  msg: PropTypes.object,
  user: PropTypes.object,
  own: PropTypes.bool
}
export default Message