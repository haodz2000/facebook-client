import React, { useState } from 'react'
import classNames from 'classnames/bind'
import styles from "./Account.module.scss"
import Image from '~/components/Image'
import HeadlessTippy from '@tippyjs/react/headless';
import Tippy from '@tippyjs/react'
import 'tippy.js/dist/tippy.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleExclamation, faEarthAsia, faEnvelope, faGear, faList, faQuestionCircle, faRightFromBracket, faShieldHeart, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import Menu from '~/components/Popper/Menu';
import { useDispatch } from 'react-redux';
import * as authService  from "~/services/authService"
const cx = classNames.bind(styles)
const Account = () => {
    const dispatch = useDispatch();
    const userMenu = [
        {
            icon: <FontAwesomeIcon icon={faGear} />,
            title: 'Cài đặt & quyền riêng tư',
            children:{
                title : 'Cài đặt & quyền riêng tư',
                data:[
                    {
                        icon: <FontAwesomeIcon icon={faGear} />,
                        title:'Cài đặt',
                        to:'/'
                    },
                    {
                        icon : <FontAwesomeIcon icon={faShieldHeart}/>,
                        title: "Kiểm tra quyền riêng tư",
                        to:"/"
                    },
                    {
                        icon : <FontAwesomeIcon icon={faList}/>,
                        title: "Nhật kí hoạt động",
                        to:"/"
                    },
                    {
                        icon : <FontAwesomeIcon icon={faEarthAsia}/>,
                        title: "Ngôn ngữ",
                        to:"/"
                    },
                ]
            }
        },
        {
            icon: <FontAwesomeIcon icon={faQuestionCircle} />,
            title: 'Trợ giúp & hỗ trợ',
            children:{
                title : 'Trợ giúp và hỗ trợ',
                data:[
                    {
                        icon: <FontAwesomeIcon icon={faQuestionCircle} />,
                        title:'Trung tâm trợ giúp',
                        to:'/'
                    },
                    {
                        icon : <FontAwesomeIcon icon={faEnvelope}/>,
                        title: "Hộp thư hỗ trợ",
                        to:"/"
                    },
                    {
                        icon : <FontAwesomeIcon icon={faCircleExclamation}/>,
                        title: "Báo cáo sự cố",
                        to:"/"
                    },
                ]
            }
        },
        {
            icon : <FontAwesomeIcon icon={faTriangleExclamation}/>,
            title: 'Đóng góp ý kiến',
            to : "/"
        },
    ]
    const [open, setOpen] = useState(false)
    const [reset, setReset] = useState(false)
    const onClick = ()=>{
        setOpen(!open)
        setReset(!reset)
    }
    const onHide = ()=>{
        setOpen(false);
        setReset(true)
    }
  return (
        <HeadlessTippy
            interactive
            visible={open}
            onClickOutside = {onHide}
            render= {(attrs)=>(
                <Menu reset={reset} items ={userMenu} {...attrs}></Menu>
            )}
        >
            <Tippy content="Tài khoản">
                <div onClick={onClick} className={cx('item')}>
                    <Image className={cx('avatar')} src="https://kenh14cdn.com/203336854389633024/2022/3/8/photo-1-16467175431221225437237.jpg" />
                </div>
            </Tippy>
        </HeadlessTippy>
  )
}

export default Account