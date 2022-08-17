import React from 'react'
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

import styles from './Menu.module.scss';
import Button from '~/components/Button';
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
MenuItem.propTypes = {
  data: PropTypes.object,
  onClick: PropTypes.func
}

export default MenuItem