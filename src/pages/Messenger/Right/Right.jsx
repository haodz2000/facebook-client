import React from 'react'
import classNames from 'classnames/bind'
import styles from "../Messenger.module.scss"
import Image from '~/components/Image'
import images from '~/assets/images'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook } from '@fortawesome/free-brands-svg-icons'
import { faBell, faSearch } from '@fortawesome/free-solid-svg-icons'
const cx = classNames.bind(styles)
const Right = () => {
  return (
    <div className={cx('containerRight')}>
        <header>
            <div className={cx('user')}>
                <Image className={cx('avatar')} src={images.avatar}/>
                <h3>Tạ Hữu Hào</h3>
                <small>Đang hoạt động</small>
            </div>
            <div className={cx('function','row')}>
                <div className={cx('item','flex-center','col')}>
                    <div className={cx('icon','flex-center')}>
                        <FontAwesomeIcon icon={faFacebook} />
                    </div>
                    <small>Trang cá nhân</small>
                </div>
                <div className={cx('item','flex-center','col')}>
                    <div className={cx('icon','flex-center')}>
                        <FontAwesomeIcon icon={faBell} />
                    </div>
                    <small>Tắt thông báo</small>
                </div>
                <div className={cx('item','flex-center','col')}>
                    <div className={cx('icon','flex-center')}>
                        <FontAwesomeIcon icon={faSearch} />
                    </div>
                    <small>Tìm kiếm</small>
                </div>
            </div>
        </header>

    </div>
  )
}

export default Right