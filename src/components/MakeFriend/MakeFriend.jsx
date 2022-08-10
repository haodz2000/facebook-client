import React from 'react'
import classNames from 'classnames/bind'
import styles from "./MakeFriend.module.scss"
import { Link } from 'react-router-dom'
import Image from '../Image'
import images from '~/assets/images'
import Button from '../Button'
const cx = classNames.bind(styles)
const MakeFriend = () => {
  return (
    <div className={cx('wrapper')}>
        <div className={cx('container')}>
            <Link to="/">
                <Image className={cx('avatar')} src={images.avatar}/>
            </Link>
            <div className={cx('info')}>
                <span className={cx('name')}>Tạ Hữu Hào</span>
                <div className={cx('accept')}>
                    <button className={cx('btn','primary')}>Đồng ý</button>
                    <button className={cx('btn','disable')}>Từ chối</button>
                </div>     
            </div>
            
        </div>

    </div>
  )
}

export default MakeFriend