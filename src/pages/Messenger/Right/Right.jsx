import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import classNames from 'classnames/bind'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook } from '@fortawesome/free-brands-svg-icons'
import { faBell, faSearch } from '@fortawesome/free-solid-svg-icons'

import styles from "../Messenger.module.scss"
import Image from '~/components/Image'
import images from '~/assets/images'
const cx = classNames.bind(styles)
const Right = ({user}) => {
  return (
    <div className={cx('containerRight')}>
        <header>
            <div className={cx('user')}>
                <Image className={cx('avatar')} src={user?.avatar||images.avatar}/>
                <h3>{user?.fullName}</h3>
                <small>Đang hoạt động</small>
            </div>
            <div className={cx('function','row')}>
                <div className={cx('item','flex-center','col')}>
                    <div className={cx('icon','flex-center')}>
                        <Link to={`/profile/${user?._id}`}>
                            <FontAwesomeIcon icon={faFacebook} />
                        </Link>
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
Right.propTypes = {
    user: PropTypes.object
}
export default Right;