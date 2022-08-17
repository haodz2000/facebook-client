import React, {useState } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import "flatpickr/dist/themes/material_green.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-regular-svg-icons';
import { faCircleExclamation, faCircleQuestion, faSpinner } from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react';
import Flatpickr from "react-flatpickr";
import classNames from 'classnames/bind';

import styles from './Register.module.scss';
import Button from '~/components/Button';
import * as authService from "~/services/authService"
import removeAccents from '~/utils/removeAccents';

const cx = classNames.bind(styles);
const Register = () => {
    const dispatch = useDispatch();
    const isRegister = useSelector((state)=>state.user.isFetching);
    const isError = useSelector((state)=>state.user.error);
    const [eye,setEye] = useState(false)
    const [birthday, setBirthday] = useState(new Date())
    const [error, setError] = useState({
        lastName: false,
        firstName: false,
        phone: false,
        password: false,
        email:false
    });
    const [newUser, setNewUser] = useState({
        username:"",
        firstName:"",
        lastName:"",
        fullName:"",
        phone:"",
        birthday : new Date(),
        gender :"female"
    })
    const handleForm = (e) => {
        setNewUser({ ...newUser, [e.target.name]: e.target.value });
    };
    const handleCheck = ()=>{
        if(newUser?.lastName && newUser?.firstName&&newUser?.email&&newUser?.phone&&newUser?.birthday&&newUser?.gender&&newUser?.password){
            return true;
        }else{
            setError({
                lastName : !newUser?.lastName,
                firstName: !newUser?.firstName,
                phone: !newUser?.phone,
                email: !newUser?.email,
                password: !newUser?.password        
            })
            return false;
        }
    }
    const handleSubmit = () => {
        if(handleCheck()){
            newUser.fullName = newUser.lastName.trim() + " "+ newUser.firstName.trim();
            newUser.username =  removeAccents(newUser?.lastName.toLowerCase().split(" ")?.[0]+newUser.firstName.toLowerCase().trim() + birthday.getTime());
            const data = newUser
            authService.register(dispatch,data)
        };
    };

    return (
        <div className={cx('register')}>
            <div className={cx('form-register')}>
                <div className={cx('top')}>
                    <div className={cx('rs-title')}>Đăng ký</div>
                    <div className={cx('rs-desc')}>Nhanh chóng và dễ dàng.</div>
                </div>
                <div className={cx('center')}>
                    <div className={cx('boxInput')}>
                        <div className={cx('name')}>
                            <input
                                required ={true}
                                name="lastName"
                                onChange={handleForm}
                                placeholder="Họ"
                                type="text"
                                className={cx('lastName')}
                            />
                            {error?.lastName && (
                                <Tippy content="Không hợp lệ">
                                    <FontAwesomeIcon className={cx('warning')} icon={faCircleExclamation} />
                                </Tippy>                            )}
                        </div>
                        <div className={cx('name')}>
                            <input
                                required ={true}
                                placeholder="Tên"
                                name="firstName"
                                onChange={handleForm}
                                type="text"
                                className={cx('firstName')}
                            />
                            {error?.firstName && (
                                <Tippy content="Không hợp lệ">
                                    <FontAwesomeIcon className={cx('warning')} icon={faCircleExclamation} />
                                </Tippy>
                            )}
                        </div>
                    </div>
                    <div className={cx('boxInput')}>
                        <input required ={true} placeholder="Số di động " name="phone" onChange={handleForm} type="text" />
                        {error?.phone && (
                           <Tippy content="Số điện thoại không hợp lệ">
                                <FontAwesomeIcon className={cx('warning')} icon={faCircleExclamation} />
                           </Tippy>
                        )}
                    </div>
                    <div className={cx('boxInput')}>
                        <input required ={true} placeholder="Địa chỉ email" name="email" onChange={handleForm} type="text" />
                        {error?.email &&(
                            <Tippy content="Email không hợp lệ">
                                <FontAwesomeIcon className={cx('warning')} icon={faCircleExclamation} />
                            </Tippy>
                        )}
                    </div>
                    <div className={cx('boxInput')}>
                        <input required ={true} type={eye?"text":'password'} name="password" onChange={handleForm} placeholder="Mật khẩu mới" />
                        {error?.password && (
                            <Tippy content="Mật khẩu không hợp lệ">
                                <FontAwesomeIcon className={cx('warning')} icon={faCircleExclamation} />
                            </Tippy>
                        )}
                        {
                            !error?.password&&(<FontAwesomeIcon onClick={()=>setEye(!eye)} className={cx('ionEye')} icon={faEye} />)
                        }
                    </div>
                    <div className={cx('DateOfBirth')}>
                        <div className={cx('heading')}>
                            <span>Sinh nhật</span>
                            <FontAwesomeIcon icon={faCircleQuestion} />
                        </div>
                        <Flatpickr
                            name='birthday'
                            onChange={([birthday])=>{setBirthday(birthday)}}
                            className={cx('calendar')}
                            value={birthday}/>
                    </div>
                    <div className={cx('gender')}>
                        <div className={cx('heading')}>
                            <span>Giới tính</span>
                            <FontAwesomeIcon icon={faCircleQuestion} />
                        </div>
                        <div className={cx('gender-wrapper')}>
                            <div className={cx('Radio')}>
                                <label htmlFor="female">Nữ</label>
                                <input
                                    defaultChecked
                                    onChange={handleForm}
                                    type="radio"
                                    id="female"
                                    value="female"
                                    name="gender"
                                />
                            </div>
                            <div className={cx('Radio')}>
                                <label htmlFor="male">Nam</label>
                                <input onChange={handleForm} id="male" name="gender" value="male" type="radio" />
                            </div>
                            <div className={cx('Radio')}>
                                <label htmlFor="other">Tùy chỉnh</label>
                                <input onChange={handleForm} type="radio" value="other" name="gender" id="other" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className={cx('policy')}>
                    <p>
                        Người dùng dịch vụ của chúng tôi có thể đã tải thông tin liên hệ của bạn lên Facebook.
                        <a href="#a">Tìm hiểu thêm.</a>
                    </p>
                    <p>
                        Bằng cách nhấp vào Đăng ký, bạn đồng ý với <a href="#a">Điều khoản, Chính sách quyền riêng tư</a>{' '}
                        và <a href="#a">Chính sách cookie</a> của chúng tôi. Bạn có thể nhận được thông báo của chúng tôi
                        qua SMS và hủy nhận bất kỳ lúc nào.
                    </p>
                </div>
                {
                    isError&&(<div className={cx('error')}>Đăng kí thất bại</div>)
                }
                <div className={cx('bottom')}>
                    <Button className={cx('btn-register')} onClick={handleSubmit}>
                        {isRegister?(<><FontAwesomeIcon className={cx('spinner')} icon={faSpinner} />Đang xử lý</>):"Đăng ký"}
                    </Button>
                </div>
            </div>
            </div>
    )
};

export default Register;
