import React from 'react'
import PropTypes from 'prop-types';
import classNames from 'classnames/bind'
import { Link } from 'react-router-dom'
import styles from "./OnlineUser.module.scss"
import Image from '../Image'
import images from '~/assets/images'
const cx= classNames.bind(styles)
const OnlineUser = ({user}) => {
  return (
        <Link to={`/profile/${user._id}`}>
          <div className={cx('wrapper')}>
                <div className={cx('container')}>
                    <Image className={cx('avatar')} src={user?.avatar||images.avatar}/>
                    <div className={cx('name')}>
                        <span>{user?.fullName}</span>
                    </div>
                    <div className={cx('badge')}></div>
                </div>
          </div>
      </Link>
  )
}
OnlineUser.propTypes = {
  user: PropTypes.object.isRequired
}

export default OnlineUser