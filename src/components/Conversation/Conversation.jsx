import React from 'react'
import classNames from 'classnames/bind'
import styles from "./Conversation.module.scss"
import { Link } from 'react-router-dom'
import Image from '~/components/Image'
const cx = classNames.bind(styles)
const Conversation = ({data}) => {
    const currentId = 1;
  return (
    <div className={cx('wrapper')}>
        <div className={cx('container',{
            'new':data.status ===1
        })}>
            <div className={cx('boxAvatar')}>
                <Image className={cx('avatar')} src="https://kenh14cdn.com/203336854389633024/2022/3/8/photo-1-16467175431221225437237.jpg" alt="Roise"/>
            </div>
            <div className={cx('info')}>
                <div className={cx('friend')}>
                    <span className={cx('name')}>Tạ Hữu Hào</span>
                </div>
                <div className={cx('message')}>
                    <span className={cx('sender')}>You: </span>
                    <span className={cx('newMessage')}>New Message</span>
                    <span className={cx('time')}></span>
                </div>
            </div>
            <div className={cx('badge')}></div>
        </div>
    </div>
  )
}

export default Conversation