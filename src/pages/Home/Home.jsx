import React from 'react'
import classNames from 'classnames/bind'
import { useSelector } from 'react-redux'
import styles from "./Home.module.scss"
import Share from '~/components/Share'
import Feed from '~/components/Feed'
const cx = classNames.bind(styles)
const Home = () => {
  const user = useSelector((state)=>state.user.currentUser)
  return (
    <div className={cx('wrapper')}>
        <Feed userId={user?._id} />
    </div>
  )
}

export default Home