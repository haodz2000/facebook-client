import React, { useState } from 'react'
import classNames from 'classnames/bind'
import HeadlessTippy from '@tippyjs/react/headless'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFaceSmile, faImage, faVideo } from '@fortawesome/free-solid-svg-icons'
import { useSelector, useDispatch } from 'react-redux'
import { open, close } from '~/redux/features/shareSlice';

import styles from "./Share.module.scss"
import Image from '../Image'
import images from '~/assets/images'
const cx = classNames.bind(styles)
const Share = () => {
  const currentUser = useSelector((state)=>state.user.currentUser)
  const openShare = useSelector((state)=>state.share.open)
  const dispatch = useDispatch();
  const openBoxShare = ()=>{
      dispatch(open())
  }
  return (
        <div className={cx('wrapper')}>
          <div className={cx('container')}>
            <div className={cx('top')}>
                <Image className={cx('avatar')} src={images.avatar}/>
                <div onClick={openBoxShare} className={cx('feel')}><span>{currentUser?.firstName} ơi, bạn đang nghĩ gì thế?</span></div>
            </div>
            <div className={cx('bottom')}>
                <button className={cx('btn')}>
                  <FontAwesomeIcon className={cx('icon','video')} icon={faVideo} />
                  <span className={cx('title')} >Video trực tiếp</span>
                  </button>
                <button onClick={openBoxShare} className={cx('btn')} >
                  <FontAwesomeIcon className={cx('icon','image')} icon={faImage} />
                  <span className={cx('title')} >Ảnh/video</span>
                </button>
                <button onClick={openBoxShare} className={cx('btn')}>
                  <FontAwesomeIcon className={cx('icon','emoji')} icon={faFaceSmile} />
                  <span className={cx('title')} >Cảm xúc/Hoạt động</span>
                </button>
            </div>
          </div>
        </div>
  )
}

export default Share