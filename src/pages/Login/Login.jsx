import React, { useEffect, useState } from 'react';
import classNames from "classnames/bind"
import styles from "./Login.module.scss"
import Button from '~/components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleExclamation, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { faXmarkCircle, } from '@fortawesome/free-regular-svg-icons';
import Register from '~/pages/Register';
import { useDispatch, useSelector } from 'react-redux';
import Tippy from '@tippyjs/react';
import * as authService from "~/services/authService"
import { useLocation, useNavigate } from 'react-router-dom';
const cx = classNames.bind(styles)
const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation().pathname;
    const [open, setOpen] = useState(false);
    const isLogin = useSelector((state)=>state.user.isFetching);
    const isError = useSelector((state)=>state.user.error);
    const [error,setError] = useState({
        account: false,
        password: false
    });
    const [user,setUser] = useState({
        account:"",
        password:"",
    });
    const handleCheck = ()=>{
        if(user?.account.trim()&&user?.password.trim()){
            return true
        }else{
            setError({
                account: !user?.account.trim(),
                password: !user?.password.trim()
            })
            return false;
        }
    }
    const handleInput = (e)=>{
        setUser({...user,[e.target.name]: e.target.value})
        setError({
            ...error,
            [e.target.name]: !e.target.value,
        })
    }
    const handleLogin = ()=>{
        if(handleCheck()){
            const data = user;
            authService.login(dispatch,data)
        }
    }
    
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('left')}>
                    <div className={cx('content')}>
                        <div className={cx('title')}  >
                            <img className={cx('imgFb')} src="https://static.xx.fbcdn.net/rsrc.php/y8/r/dF5SId3UHWd.svg" alt="Facebook" />
                        </div>
                        <div className={cx('desc')}>
                            Facebook giúp bạn kết nối và chia sẻ với mọi người trong cuộc sống của bạn.
                        </div>
                    </div>
                </div>
                <div className={cx('right')}>
                    <div className={cx('rightContent')}>
                        <div className={cx('form')}>
                            <div className={cx('boxInput')}>
                                <input onChange={handleInput} placeholder='Email hoặc số điện thoại' name='account' type="text" className={cx('input')} />
                                {error?.account && (
                                    <Tippy content="Tài khoản không hợp lệ">
                                        <FontAwesomeIcon className={cx('warning')} icon={faCircleExclamation} />
                                    </Tippy>
                                )}
                            </div>
                            <div className={cx('boxInput')}>
                                <input onChange={handleInput} placeholder='Mật khẩu' name='password' type={"password"} className={cx('input')} />
                                {error?.password && (
                                    <Tippy content="Mật khẩu không hợp lệ">
                                        <FontAwesomeIcon className={cx('warning')} icon={faCircleExclamation} />
                                    </Tippy>
                                )}
                            </div>
                            {
                                isError&&(<div className={cx('error')}>Sai tên tài khoản hoặc mật khẩu</div>)
                            }
                            <Button onClick={handleLogin} primary className={cx('btn-login')} >
                                {isLogin?(<><FontAwesomeIcon className={cx('spinner')} icon={faSpinner} />Đang xử lý</>):"Đăng nhập"}
                            </Button>
                            <Button to="/" className={cx('btn-forgotPassword')}>Quên mật khẩu?</Button>
                            <div className={cx('split')}></div>
                            <Button onClick={()=>setOpen(true)} className={cx('btn-register')} >Tạo tài khoản mới</Button>
                        </div>
                        <div className={cx('msg')}>
                            <strong>Tạo trang</strong><span> dành cho người nổi tiếng, thương hiệu hoặc doanh nghiệp.</span>
                        </div>
                    </div>
                </div>
            </div>
            {
                open&&(
                    <div className={cx('wrapper-register')}>
                        <div className={cx('container-register')}>
                            <FontAwesomeIcon className={cx('iconRemove')} onClick={()=>setOpen(false)} icon={faXmarkCircle} />
                            <Register />
                        </div>
                    </div>
                )
            }
        </div>
    )
};

export default Login;
