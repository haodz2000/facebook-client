import React from 'react'
import classNames from 'classnames/bind'
import styles from "./Notification.module.scss"
import Image from '~/components/Image'
const cx = classNames.bind(styles)

const Notification = ({data}) => {
  return (
    <div className={cx('wrapper')}>
        <div className={cx('container',{'new':true})}>
            <div className={cx('boxImage')}>
                <Image className={cx('image')} src="https://kenh14cdn.com/203336854389633024/2022/3/8/photo-1-16467175431221225437237.jpg" alt =""/>
            </div>
            <div className={cx('notification')}>
                <span className={cx('sender')}>Peter</span>
                <span className={cx('text')}>đã thêm vào tin của bạn</span>
                <span className={cx('received')}>Tạ Hữu Hào</span>
            </div>
            <div className={cx('overview')}></div>
        </div>
        <div className={cx('timeSend')}>7 giờ trước</div>
    </div>
  )
}

export default Notification;