import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames/bind'
import styles from "./Feed.module.scss"
import Share from '~/components/Share'
import Post from '~/components/Post'
import { useSelector } from 'react-redux'
import * as postService from "~/services/postService"
const cx = classNames.bind(styles)
const Feed = ({userId,onlyUser}) => {
  const user = useSelector((state)=>state.user.currentUser)
  const [posts,setPosts] = useState([])
  useEffect(()=>{
        const fetchPost = async()=>{
          if(onlyUser){
            const res = await postService.getPostUser(userId)
            const data = res.data.sort((a,b)=>{
              return new Date(b.createdAt)- new Date(a.createdAt)
            })
            setPosts(data)
          }
          else{
            const res = await postService.getTimeline(user._id)
            const data = res.data.sort((a,b)=>{
              return new Date(b.createdAt)- new Date(a.createdAt)
            })
            setPosts(data)
          }
      }
      fetchPost()
  },[user,userId,onlyUser])
  return (
    <div className={cx('wrapper')}>
    { user._id=== userId&&<Share/>}
    {
      posts?.map((post,index)=>(
        <Post item={post} key={index} />
      ))
    }
    </div>
  )
}

Feed.propTypes = {
    userId : PropTypes.string,
    onlyUser: PropTypes.bool
}
export default Feed;