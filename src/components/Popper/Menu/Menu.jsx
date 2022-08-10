import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';

import classNames from 'classnames/bind';
import styles from "./Menu.module.scss";
import Header from './Header';
import * as authService from "~/services/authService"
import {Wrapper as PopperWrapper} from "~/components/Popper"
import MenuItem from './MenuItem';
import Image from '~/components/Image';
import { Link } from 'react-router-dom';
import Button from '~/components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles)
const defaultFn = ()=>{}
const Menu = ({items = [], reset, onChange = defaultFn}, {...attrs}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [history,setHistory] = useState([{data: items}]);
    const current = history[history.length - 1];
    useEffect(()=>{
        setHistory((prev) => prev.slice(0, 1));
    },[reset])
    const renderItems = ()=>{
        return current.data.map((item, index)=>{
            const isParent = !!item.children;
            return(
                <MenuItem
                    key={index}
                    data = {item}
                    onClick = {()=>{
                        if(isParent){
                            setHistory((prev)=>[...prev,item.children]);
                        }else{
                            onChange(item)
                        }
                    }}
                />
            )
        })
    }
    const handleBack = ()=>{
        setHistory((prev) => prev.slice(0, prev.length - 1));
    }
    const logout = async()=>{
        await authService.logout(dispatch)
    }
  return (
    <div className={cx('menu-list')} tabIndex="-1" {...attrs}>
        <PopperWrapper className={cx('menu-popper')}>
            {
                history.length===1&&(
                    <div className={cx('account')}>
                        <div className={cx('container')}>
                            <div className={cx('content')}>
                                <Link to="/" className={cx('user')}>
                                    <Image className={cx('avatarUser')} src="https://kenh14cdn.com/203336854389633024/2022/3/8/photo-1-16467175431221225437237.jpg"/>
                                    <span className={cx('nameUser')}>Tạ Hữu Hào</span>
                                </Link>
                                <hr className={cx('hr')}/>
                                <Link to="/" className={cx('link')}>
                                    <span>Xem trang cá nhân</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                )
            }
        {history.length > 1 && <Header title={current.title} onBack={handleBack} />}
        <div className={cx('menu-body')}>
            {renderItems()}
            {history.length===1&&(
                <div className={cx('box-menu-item')}>
                    <Button onClick={logout} className={cx("menu-item")} leftIcon={<FontAwesomeIcon icon={faRightFromBracket} />}>Đăng xuất</Button>
                </div>
            )}
        </div>
        </PopperWrapper>
    </div>
  )
}

export default Menu