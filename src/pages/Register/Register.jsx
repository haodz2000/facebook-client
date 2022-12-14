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
                    <div className={cx('rs-title')}>????ng k??</div>
                    <div className={cx('rs-desc')}>Nhanh ch??ng v?? d??? d??ng.</div>
                </div>
                <div className={cx('center')}>
                    <div className={cx('boxInput')}>
                        <div className={cx('name')}>
                            <input
                                required ={true}
                                name="lastName"
                                onChange={handleForm}
                                placeholder="H???"
                                type="text"
                                className={cx('lastName')}
                            />
                            {error?.lastName && (
                                <Tippy content="Kh??ng h???p l???">
                                    <FontAwesomeIcon className={cx('warning')} icon={faCircleExclamation} />
                                </Tippy>                            )}
                        </div>
                        <div className={cx('name')}>
                            <input
                                required ={true}
                                placeholder="T??n"
                                name="firstName"
                                onChange={handleForm}
                                type="text"
                                className={cx('firstName')}
                            />
                            {error?.firstName && (
                                <Tippy content="Kh??ng h???p l???">
                                    <FontAwesomeIcon className={cx('warning')} icon={faCircleExclamation} />
                                </Tippy>
                            )}
                        </div>
                    </div>
                    <div className={cx('boxInput')}>
                        <input required ={true} placeholder="S??? di ?????ng " name="phone" onChange={handleForm} type="text" />
                        {error?.phone && (
                           <Tippy content="S??? ??i???n tho???i kh??ng h???p l???">
                                <FontAwesomeIcon className={cx('warning')} icon={faCircleExclamation} />
                           </Tippy>
                        )}
                    </div>
                    <div className={cx('boxInput')}>
                        <input required ={true} placeholder="?????a ch??? email" name="email" onChange={handleForm} type="text" />
                        {error?.email &&(
                            <Tippy content="Email kh??ng h???p l???">
                                <FontAwesomeIcon className={cx('warning')} icon={faCircleExclamation} />
                            </Tippy>
                        )}
                    </div>
                    <div className={cx('boxInput')}>
                        <input required ={true} type={eye?"text":'password'} name="password" onChange={handleForm} placeholder="M???t kh???u m???i" />
                        {error?.password && (
                            <Tippy content="M???t kh???u kh??ng h???p l???">
                                <FontAwesomeIcon className={cx('warning')} icon={faCircleExclamation} />
                            </Tippy>
                        )}
                        {
                            !error?.password&&(<FontAwesomeIcon onClick={()=>setEye(!eye)} className={cx('ionEye')} icon={faEye} />)
                        }
                    </div>
                    <div className={cx('DateOfBirth')}>
                        <div className={cx('heading')}>
                            <span>Sinh nh???t</span>
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
                            <span>Gi???i t??nh</span>
                            <FontAwesomeIcon icon={faCircleQuestion} />
                        </div>
                        <div className={cx('gender-wrapper')}>
                            <div className={cx('Radio')}>
                                <label htmlFor="female">N???</label>
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
                                <label htmlFor="other">T??y ch???nh</label>
                                <input onChange={handleForm} type="radio" value="other" name="gender" id="other" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className={cx('policy')}>
                    <p>
                        Ng?????i d??ng d???ch v??? c???a ch??ng t??i c?? th??? ???? t???i th??ng tin li??n h??? c???a b???n l??n Facebook.
                        <a href="#a">T??m hi???u th??m.</a>
                    </p>
                    <p>
                        B???ng c??ch nh???p v??o ????ng k??, b???n ?????ng ?? v???i <a href="#a">??i???u kho???n, Ch??nh s??ch quy???n ri??ng t??</a>{' '}
                        v?? <a href="#a">Ch??nh s??ch cookie</a> c???a ch??ng t??i. B???n c?? th??? nh???n ???????c th??ng b??o c???a ch??ng t??i
                        qua SMS v?? h???y nh???n b???t k??? l??c n??o.
                    </p>
                </div>
                {
                    isError&&(<div className={cx('error')}>????ng k?? th???t b???i</div>)
                }
                <div className={cx('bottom')}>
                    <Button className={cx('btn-register')} onClick={handleSubmit}>
                        {isRegister?(<><FontAwesomeIcon className={cx('spinner')} icon={faSpinner} />??ang x??? l??</>):"????ng k??"}
                    </Button>
                </div>
            </div>
            </div>
    )
};

export default Register;
