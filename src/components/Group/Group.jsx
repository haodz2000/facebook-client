import React from 'react'
import classNames from 'classnames/bind'
import styles from './Group.module.scss'
import { Link } from 'react-router-dom'
import Image from '../Image'
const cx = classNames.bind(styles)
const Group = ({data}) => {
  return (
    <Link to={data?.to||"/"}>
        <div className={cx('wrapper')}>
            <Image className={cx('image')} src=""/>
            <span className={cx('title')}>{data?.title||"Bộ tộc Mixigaming"}</span>
        </div>
    </Link>
  )
}

export default Group