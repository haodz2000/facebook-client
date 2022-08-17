import React, { useState,useEffect } from 'react'
import { useSelector } from 'react-redux';
import classNames from 'classnames/bind'
import styles from "./Conversations.module.scss"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsis, faVideo,faMaximize, faSearch } from '@fortawesome/free-solid-svg-icons';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import Conversation from '~/components/Conversation';
import { Link, useLocation } from 'react-router-dom';
import * as consService from "~/services/consService"
const cx = classNames.bind(styles)
const Conversations = () => {
    const currentUser = useSelector((state)=>state.user.currentUser)
    const [cons,setCons] = useState([])
    useEffect(()=>{
      const fetchCons = async()=>{
          const data={
            userId: currentUser._id
          }
          const res = await consService.findAll(data)
          setCons(res.data.sort((a,b)=>(b?.status-a?.status)))
      }
      fetchCons()
    },[currentUser])
    const pathname = useLocation().pathname.split("/")
    return (
    <>
        <div className={cx('top')}>
                <div className={cx('left')}>
                  <h3>Chat</h3>
                </div>
                <div className={cx('right')}>
                  <div className={cx('listIcons')}>
                      <div className={cx('boxIcon')}>
                        <FontAwesomeIcon className={cx('icon')} icon={faEllipsis} />
                      </div>
                      <div className={cx('boxIcon')}>
                        <FontAwesomeIcon className={cx('icon')} icon={faMaximize} />
                      </div>
                      <div className={cx('boxIcon')}>
                        <FontAwesomeIcon className={cx('icon')} icon={faVideo} />
                      </div>
                      <div className={cx('boxIcon')}>
                        <FontAwesomeIcon className={cx('icon')} icon={faPenToSquare} />
                      </div>
                  </div>
                </div>
              </div>
              <div className={cx('search')}>
                <div className={cx('boxSearch')}>
                  <input type="text" className={cx('input')} placeholder='Tìm kiếm trên Messenger' />
                  <FontAwesomeIcon className={cx('iconSearch')} icon={faSearch} />
                </div>
              </div>
              <div className={cx('center')}>
                  {cons?.map((data,index)=>(
                    <Link to={`/messenger/t/${data._id}`} key={index}>
                        <Conversation data={data}/>
                    </Link>
                  ))}
              </div>
              {
                !pathname.includes("messenger")&&(
                  <div className={cx('bottom')}>
                      <Link to='/'>
                          <span>Xem tất cả trong Messenger</span>
                      </Link>
                  </div>
                )
              }
    </>
  )
}

export default Conversations