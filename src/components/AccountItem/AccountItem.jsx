import React from 'react'
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from "./AccountItem.module.scss"

import { Link } from 'react-router-dom';
import Image from '~/components/Image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
const cx = classNames.bind(styles)

const AccountItem = ({data}) => {
  return (
    <Link to={`/profile/@${data?.nickname}`} className={cx('wrapper')} >
        <Image src={data?.avatar} alt={data?.fullName} className={cx('avatar')}/>
        <div className={cx('info')}>
                <h4 className={cx('name')}>
                    <span>{data?.fullName}</span>
                    {data?.tick && <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />}
                </h4>
        </div>
    </Link>
  )
}
AccountItem.propTypes ={
    data : PropTypes.object.isRequired
}
export default AccountItem