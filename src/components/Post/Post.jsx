import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera, faCircleCheck, faEllipsis, faGlobeAsia,faShare, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { faFaceSmile, faMessage } from '@fortawesome/free-regular-svg-icons';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Tippy from '@tippyjs/react';
import { faThumbsUp } from '@fortawesome/free-regular-svg-icons';

import styles from './Post.module.scss';
import Image from '../Image';
import images from '~/assets/images';
import Button from '../Button';
import Comment from '~/components/Comment';
import * as userService from '~/services/userService';
import * as postService from '~/services/postService';
const cx = classNames.bind(styles)
const Post = ({item}) => {
    const currentUser = useSelector((state)=>state.user.currentUser)
    const [post,setPost] = useState(item)
    const [user,setUser] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const [isLike, setIsLike]= useState(false)
    const [comment, setComment] = useState({
        userId: "",
        postId: "",
        desc: ""
    })
    useEffect(()=>{
        const fetchUser = async()=>{
            const res = await userService.getUser(item?.userId)
            setUser(res.data.data)
        }
        fetchUser();
        setPost(item)
    },[item])
    useEffect(()=>{
        if(item.likes.find(userId=>userId === currentUser._id)){
            setIsLike(true)
        }else{
            setIsLike(false)
        }
    },[item,currentUser])
    const cmtRef = useRef();
    const [comments,setComments] = useState([])
    const handleClickLike = ()=>{
        const data = {
            postId: item._id,
            userId: currentUser._id,
        }
        const fetchLike = async()=>{
            const res = await postService.like(data);
            setPost(res.data)
            setIsLike(res.msg)
        }
        fetchLike();
    }
    const openComment = ()=>{
        setIsLoading(true)
        const data = {
            postId: post._id
        }
        const fetchComment = async()=>{
            const res = await postService.loadComment(data);
            setComments(res.data.sort((a,b)=>{
                return new Date(b.createdAt)- new Date(a.createdAt)
            }))
            setIsLoading(false)
        }
        fetchComment();
    }
    const handleInput = (e)=>{
        setComment({
            userId : currentUser._id,
            postId: post._id,
            desc: e.target.innerText.trim()
        })
    }
    const handlePress = async(e)=>{
        if(e.key === "Enter"&&!e.shiftKey){
            e.preventDefault()
            if(comment.desc.trim() !==""){
                const data = comment
                const res = await postService.comment(data)
                if(res.data){
                    setComments([comment,...comments])
                    setComment({})
                    cmtRef.current.innerText =""
                }
            }
        }
    }
  return (
    <div className={cx('wrapper')}>
        <div className={cx('container')}>
            <div className={cx('header')}>
                <div className={cx('left')}>
                    <Link to={`/profile/${user?._id}`} ><Image className={cx('avatar')} src={user?.avatar||images.avatar}/></Link>
                    <div className={cx('info')}>
                        <Link to={`/profile/${user?._id}`}>
                            <div className={cx('name')}>
                                <span>{user?.fullName}</span>
                                <FontAwesomeIcon className={cx('tick')} icon={faCircleCheck} />
                            </div>
                        </Link>
                        <div className={cx('time')}>
                            <span>6 gi???</span>
                        <Tippy content="C??ng khai">
                            <FontAwesomeIcon className={cx('mode')} icon={faGlobeAsia} />
                        </Tippy>
                        </div>
                    </div>
                </div>
                <div className={cx('right')}>
                    <div className={cx('more')}>
                        <FontAwesomeIcon icon={faEllipsis} />
                    </div>
                </div>
            </div>
            <div className={cx('content')}>
                {   
                    post?.images?.length>0&&(
                        <>
                            <div className={cx('textContent')}>
                                {post?.desc}
                            </div>
                            <div className={cx('boxImage')}>
                                <Image className={cx('imagePost')} src={post?.images[0]||images.avatar}/>
                            </div>
                        </>
                    )
                }
                {
                    post?.images?.length === 0 &&(
                        (post?.background===true&&post?.desc.length < 50)?(
                            <>
                                <Image className={cx('background')} src="https://img.freepik.com/free-vector/hand-painted-watercolor-pastel-sky-background_23-2148902771.jpg?w=2000" />
                                <div className={cx('textPost')}>
                                    {post?.desc}
                                </div>
                            </>
                        ):(
                            <div className={cx('title')}>
                                {post?.desc}
                            </div>
                        )   
                    )
                    
                }

            </div>
            <div className={cx('popular')}>
                <div className={cx('likes')}>
                    <FontAwesomeIcon className={cx('heart')} icon={faThumbsUp} />
                    <span>
                        {
                           isLike?(post.likes.length > 1?`B???n v?? ${post.likes.length -1 } ng?????i kh??c th??ch b??i vi???t`:`B???n th??ch b??i vi???t`)
                           :(post.likes.length>0&&`${post.likes.length }  ng?????i kh??c th??ch b??i vi???t`)
                        }
                    </span>
                </div>
                <div className={cx('comments')}>
                    <span>
                        {post.comments.length > 0 && `${post.comments.length} b??nh lu???n`}
                    </span>
                </div>
            </div>
            <div className={cx('interactive')}>
                <div className={cx('container')}>
                    <Button onClick={handleClickLike} className={cx('btn-action',{
                        'active':isLike
                    })}>
                        <FontAwesomeIcon className={cx('icon')} icon={faThumbsUp} />
                        <span>
                            Th??ch
                        </span>
                    </Button>
                    <Button onClick={openComment} className={cx('btn-action')}>
                        <FontAwesomeIcon icon={faMessage} />
                        <span>
                            B??nh lu???n
                        </span>
                    </Button>
                    <Button className={cx('btn-action')}>
                        <FontAwesomeIcon icon={faShare} />
                        <span>
                            Chia s???
                        </span>
                    </Button>
                </div>
            </div>
            <div className={cx('bottom')}>
                <div className={cx('userComment')}>
                    <Image className={cx('avatar')} src={currentUser?.avatar||images.avatar}/>
                    <div className={cx('boxInput')}>
                        <div
                            onKeyPress={handlePress}
                            placeholder="Vi???t b??nh lu???n..."
                            tabIndex={0}
                            ref = {cmtRef}
                            onInput = {handleInput}
                            contentEditable ={true}
                            role="textbox"
                            aria-multiline ={false}
                            spellCheck={false} 
                            className={cx('inputComment')}
                            >
                        </div>
                        <div className={cx('Icons')}>
                            <div className={cx('icon')}>
                                <FontAwesomeIcon icon={faFaceSmile} />
                            </div>
                            <div className={cx('icon')}>
                                <FontAwesomeIcon icon={faCamera} />
                            </div>
                        </div>
                    </div>
                </div>
                {isLoading?(
                    <div className={cx('loadingCmt')}>
                        <FontAwesomeIcon className={cx('iconLoad')} icon={faSpinner} />
                    </div>
                ):(
                    <div className={cx('loadComment')}>
                    {
                        comments?.map((item,index)=>(
                            <Comment key={index} data={item}/>
                        ))
                    }  
                    </div>
                )}
            </div>
        </div>
    </div>
  )
}
Post.propTypes = {
    item: PropTypes.object.isRequired
}

export default Post;