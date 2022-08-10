import React from 'react'
import classNames from 'classnames/bind';
import styles from './Menu.module.scss';
import Button from '~/components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
const cx= classNames.bind(styles);
const MenuItem = ({data, onClick}) => {
    const classes = cx('menu-item',{
        separate: data.separate
    })
  return (
    <div className={cx('box-menu-item')}>
      <Button className={classes} leftIcon={data?.icon} to={data?.to} onClick={onClick} >
          {data?.title}
      </Button>
      {
        data?.children&&(
          <div onClick={onClick} className={cx('iconNext')}>
            <FontAwesomeIcon icon={faChevronRight} />
          </div>
        )
      }
    </div>
  )
}

export default MenuItem