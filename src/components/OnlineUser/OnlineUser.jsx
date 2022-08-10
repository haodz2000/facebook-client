import React from 'react'
import classNames from 'classnames/bind'
import styles from "./OnlineUser.module.scss"
import Image from '../Image'
import images from '~/assets/images'
const cx= classNames.bind(styles)
const OnlineUser = () => {
  return (
    <div className={cx('wrapper')}>
        <div className={cx('container')}>
            <Image className={cx('avatar')} src={images.avatar}/>
            <div className={cx('name')}>
                <span>Tạ Hữu Hào</span>
            </div>
            <div className={cx('badge')}></div>
        </div>
    </div>
  )
}

export default OnlineUser