import React, { useEffect, useRef } from 'react'
import classNames from 'classnames/bind'
import styles from "./Messenger.module.scss"
import EmojiPicker from 'emoji-picker-react'
import Conversations from '~/components/Conversations'
import Image from '~/components/Image'
import images from '~/assets/images'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleInfo, faGift, faImage, faPaperPlane, faPhone, faPlusCircle, faSmile, faVideo } from '@fortawesome/free-solid-svg-icons'
import Message from '~/components/Message/Message'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import * as consService from "~/services/consService"
import * as userService from "~/services/userService"
import Right from './Right/Right'
const cx = classNames.bind(styles)
const Messenger = () => {
    const consId = useLocation().pathname.split("/")[3]
    const currentUser = useSelector((state)=>state.user.currentUser)
    const socket = useSelector((state)=>state.socket.socket)
    const [user,setUser] = useState();
    const [openEmoji,setOpenEmoji]= useState(false)
    const scrollRef = useRef();
    const inputRef = useRef();
    const [file,setFile] = useState();
    const [cons,setCons] = useState({})
    const [message,setMessage] = useState({
        conversationId: "",
        senderId:"",
        receiverId:"",
        message:"",
        image:"",
    })
    const [messages, setMessages] = useState([
    ])
    useEffect(()=>{
        socket?.on("getMessage",(data)=>{
            setMessages((pre)=>[...pre,data])
        })  
    },[socket])
    useEffect(()=>{
        const fetchCons = async()=>{
            const data = {
                userId: currentUser._id,
                consId: consId
            }
            const res = await consService.findOne(data)
            if(res.msg){
                setCons(res.data)
            }
        }
        fetchCons();
    },[consId,currentUser])
    useEffect(()=>{
        scrollRef.current?.scrollIntoView({behavior: "smooth"})
    },[messages])
    useEffect(()=>{
        const userId = cons?.members?.filter(id=>id !== currentUser._id)
        if(userId){
            const fetchUser = async()=>{
                const res = await userService.getUser(userId?.[0])
                if(res.status===200){
                    setUser(res.data.data)
                }
            }
            fetchUser();
        }
        const fetchMessage = async()=>{
            const res = await consService.loadMessage({conversationId:cons._id})
            if(res.msg){
                setMessages(res.data)
            }
        }
        fetchMessage();
    },[cons,currentUser])
    const handleInput = (e)=>{
        setMessage({
            conversationId: cons?._id,
            senderId: currentUser._id,
            receiverId : user?._id,
            message: e.target.innerText,
            image: ""
        })
    }
    const onEmojiClick = (event, emojiObject) => {
        inputRef.current.innerText += emojiObject.emoji
        setMessage({...message,message: inputRef.current.innerText})
    };
    const handlePressSend = async(e)=>{
        if(e.key === "Enter"&&!e.shiftKey){
            e.preventDefault();
            if(message.message !==""||message.image!==""){
                const data = message;
                data.receiverId&&socket.emit("sendMessage",data)
                const res = await consService.sendMessage(data)
                setMessages([...messages,res.data])
                setMessage({...message,message:""})
                inputRef.current.innerText = ""
            }
        }
    }
    return (
    <div className={cx('wrapper')}>
        <div className={cx('container')}>
            <div className={cx('left')}>
                <div className={cx('conversationBox')}>
                    <Conversations/>
                </div>
            </div>
            <div className={cx('center')}>
                <div className={cx('chat-box')}>
                    <div className={cx('top')}>
                        <div className={cx('user','flex-center')}>
                            <Image className={cx('avatar')} src={user?.avatar||images.avatar}/>
                            <div className={cx('info','col')}>
                                <span>{user?.fullName}</span>
                                <small>Đang hoạt động</small>
                            </div>
                            <div className={cx('active')}></div>
                        </div>
                        <div className={cx('options','row')}>
                            <div className={cx('flex-center')}>
                                <FontAwesomeIcon className={cx('icon')} icon={faPhone} />
                            </div>
                            <div className={cx('flex-center')} >
                                <FontAwesomeIcon className={cx('icon')} icon={faVideo} />
                            </div>
                            <div className={cx('flex-center')} >
                                <FontAwesomeIcon className={cx('icon')} icon={faCircleInfo} />
                            </div>
                        </div>
                    </div>
                    <div className={cx('message')}>
                        <div className={cx('content')}>
                            {
                                messages?.map((msg,index)=>(
                                    <div ref={scrollRef} key={index}>
                                        <Message  msg={msg} user={msg.senderId === currentUser._id?currentUser:user} own={msg.senderId === currentUser._id} />
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    <div className={cx('bottom','row','flex-end')}>
                        <div className={cx('others','row','flex-end')}>
                            <div className={cx('boxIcon')}>
                                <FontAwesomeIcon className={cx('icon')} icon={faPlusCircle}/>
                            </div>
                            <div className={cx('boxIcon')}>
                                <FontAwesomeIcon className={cx('icon')} icon={faImage}/>
                            </div>
                            <div className={cx('boxIcon')}>
                                <FontAwesomeIcon className={cx('icon')} icon={faGift}/>
                            </div>
                        </div>
                       <div className={cx('boxInput','row')}>
                            <div
                                onKeyUp={handleInput}
                                ref={inputRef}
                                onKeyPress={handlePressSend}
                                placeholder='Aa'
                                tabIndex={0}
                                contentEditable={true}
                                role="textbox"
                                aria-multiline ={false}
                                className={cx('input')}
                            >
                            </div>
                            <div onClick={()=>setOpenEmoji(!openEmoji)} className={cx('boxIcon')}>
                                <FontAwesomeIcon className={cx('icon')} icon={faSmile} />
                            </div>
                       </div>
                       <div className={cx('send')}>
                            <div className={cx('boxIcon')}>
                                <FontAwesomeIcon className={cx('icon')} icon={faPaperPlane}/>
                            </div>
                       </div>
                       {
                         openEmoji&&(
                            <div className={cx('boxEmoji')}>
                                <EmojiPicker onEmojiClick={onEmojiClick} />
                            </div>
                         )
                       }
                    </div>
                </div>
            </div>
            <div className={cx('right')}>
                <Right/>
            </div>
        </div>
    </div>
  )
}

export default Messenger