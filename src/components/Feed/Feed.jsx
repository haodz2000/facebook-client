import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames/bind'
import styles from "./Feed.module.scss"
import Share from '~/components/Share'
import Post from '~/components/Post'
import { useSelector } from 'react-redux'
import * as postService from "~/services/postService"
const cx = classNames.bind(styles)
const Feed = ({userId}) => {
  const user = useSelector((state)=>state.user.currentUser)
  const [posts,setPost] = useState([])
  useEffect(()=>{
      const fetchPost = async()=>{
          const res = await postService.getTimeline(userId||user._id)
          setPost(res.data)
      }
      fetchPost()
  },[userId])
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
    userId : PropTypes.string
}
export default Feed;