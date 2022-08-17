import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames/bind'
import styles from "./Comment.module.scss"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck, faEllipsis } from '@fortawesome/free-solid-svg-icons'
import images from '~/assets/images'
import Image from '~/components/Image'
const cx = classNames.bind(styles)
const Comment = ({data}) => {
  return (
    <div className={cx('item')}>
        <div className={cx('head')}>
            <Image className={cx('avatar')} src={images.avatar}/>
            <div className={cx('contentComment')}>
                <div className={cx('name')}>
                    <span>Tạ Hữu  Hào</span>
                    <FontAwesomeIcon className={cx('tick')} icon={faCircleCheck} />
                </div>
                <div className={cx('desc')}>
                    <span>
                        {data?.desc}
                    </span>
                </div>
            </div>
            <div className={cx('more','active')}>
                <FontAwesomeIcon icon={faEllipsis}  />
            </div>
        </div>
        <div className={cx('foot')}>
            <span>Thích</span>
            <span>Phản hồi</span>
            <span className={cx('time')}>6 giờ</span>
        </div>
    </div>
  )
}
Comment.propTypes ={
    data : PropTypes.object.isRequired
}
export default Comment