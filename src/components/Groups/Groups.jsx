import React from 'react'
import classNames from 'classnames/bind'
import styles from "./Groups.module.scss"
import Group from '~/components/Group'
const cx = classNames.bind(styles)
const Groups = () => {
  return (
    <div className={cx('wrapper')}>
        <Group/>
    </div>
  )
}

export default Groups