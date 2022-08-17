import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames/bind'
import { useSelector } from 'react-redux'
import { useEffect,useState } from 'react'

import styles from "./Conversation.module.scss"
import Image from '~/components/Image'
import * as userService from "~/services/userService"
const cx = classNames.bind(styles)
const Conversation = ({data}) => {
  const currentUser = useSelector((state)=>state.user.currentUser);
  const [user,setUser] = useState({});
  useEffect(()=>{
    const fetchUser = async()=>{
        const userId = data.members.filter((id)=>{
            return id !== currentUser._id
        })
        const res = await userService.getUser(userId[0])
        setUser(res.data.data)
    }
    fetchUser();
  },[data,currentUser])
  return (
    <div className={cx('wrapper')}>
        <div className={cx('container',{
            'new':(data.status === true&&data.senderId!==currentUser._id)
        })}>
            <div className={cx('boxAvatar')}>
                <Image className={cx('avatar')} src="https://kenh14cdn.com/203336854389633024/2022/3/8/photo-1-16467175431221225437237.jpg" alt="Roise"/>
            </div>
            <div className={cx('info')}>
                <div className={cx('friend')}>
                    <span className={cx('name')}>{user?.fullName}</span>
                </div>
                <div className={cx('message')}>
                    {
                        (data?.newMessage!=="" || data?.image.length >0)?(
                            <>
                                <span className={cx('sender')}>
                                    {
                                        (data.senderId!==user?._id)?"You: ":`${user?.firstName}: `
                                    }
                                </span>
                                <span className={cx('newMessage')}>{data?.newMessage}</span>
                                <span className={cx('time')}></span>
                            </>
                        ):(<span className={cx('newMessage')}>Hãy chat gì đó với {user?.firstName}</span>)
                    }
                </div>
            </div>
            <div className={cx('badge')}></div>
        </div>
    </div>
  )
}
Conversation.propTypes = {
    data: PropTypes.object.isRequired
}
export default Conversation;