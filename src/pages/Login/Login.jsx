import React, {useState } from 'react';
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
const cx = classNames.bind(styles)
const Login = () => {
    const dispatch = useDispatch();
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
                            Facebook gi??p b???n k???t n???i v?? chia s??? v???i m???i ng?????i trong cu???c s???ng c???a b???n.
                        </div>
                    </div>
                </div>
                <div className={cx('right')}>
                    <div className={cx('rightContent')}>
                        <div className={cx('form')}>
                            <div className={cx('boxInput')}>
                                <input onChange={handleInput} placeholder='Email ho???c s??? ??i???n tho???i' name='account' type="text" className={cx('input')} />
                                {error?.account && (
                                    <Tippy content="T??i kho???n kh??ng h???p l???">
                                        <FontAwesomeIcon className={cx('warning')} icon={faCircleExclamation} />
                                    </Tippy>
                                )}
                            </div>
                            <div className={cx('boxInput')}>
                                <input onChange={handleInput} placeholder='M???t kh???u' name='password' type={"password"} className={cx('input')} />
                                {error?.password && (
                                    <Tippy content="M???t kh???u kh??ng h???p l???">
                                        <FontAwesomeIcon className={cx('warning')} icon={faCircleExclamation} />
                                    </Tippy>
                                )}
                            </div>
                            {
                                isError&&(<div className={cx('error')}>Sai t??n t??i kho???n ho???c m???t kh???u</div>)
                            }
                            <Button onClick={handleLogin} primary className={cx('btn-login')} >
                                {isLogin?(<><FontAwesomeIcon className={cx('spinner')} icon={faSpinner} />??ang x??? l??</>):"????ng nh???p"}
                            </Button>
                            <Button to="/" className={cx('btn-forgotPassword')}>Qu??n m???t kh???u?</Button>
                            <div className={cx('split')}></div>
                            <Button onClick={()=>setOpen(true)} className={cx('btn-register')} >T???o t??i kho???n m???i</Button>
                        </div>
                        <div className={cx('msg')}>
                            <strong>T???o trang</strong><span> d??nh cho ng?????i n???i ti???ng, th????ng hi???u ho???c doanh nghi???p.</span>
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
