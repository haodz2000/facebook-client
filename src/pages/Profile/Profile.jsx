import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from "./Profile.module.scss"
import Image from '~/components/Image';
import images from '~/assets/images';
import Button from '~/components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera, faEllipsis, faPencil } from '@fortawesome/free-solid-svg-icons';
import Feed from '~/components/Feed';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { follow, unFollow} from '~/redux/features/userSlice';
import * as userService from "~/services/userService"
import * as consService from "~/services/consService"
import Tippy from '@tippyjs/react';
import { useNavigate } from 'react-router-dom';
const cx = classNames.bind(styles)
const Profile = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userId = useLocation().pathname.split("/")[2]
    const [isFriend, setIsFriend] = useState()
    const [user,setUser] = useState();
    const currentUser = useSelector((state)=>state.user.currentUser)
    useEffect(()=>{
        if(userId !== currentUser._id){
            const fetchUser = async()=>{
                const res = await userService.getUser(userId)
                setUser(res.data.data)
            }
            fetchUser();
        }else{
            setUser(currentUser)
        }
    },[userId,currentUser])
    useEffect(()=>{
        if(currentUser.followings.includes(user?._id)){
            setIsFriend(true)
        }else{
            setIsFriend(false)
        }
    },[user,currentUser])
    const handleAddFriend = async()=>{
        const data = {
            senderId: currentUser._id,
            receiverId: user._id
        }
        const res = await userService.follow(data)
        if(res.status === 200){
            const receiverId = res.data.data.receiverId
            if(res.data.follow){
                dispatch(follow({currentUser,receiverId}))
                setIsFriend(true)
            }else{
                dispatch(unFollow({currentUser,receiverId}))
                setIsFriend(false)
            }
        }
    }
    const handleOpenMessage = async()=>{
        const data = {
            members: [currentUser._id,user._id]
        }
        const res = await consService.findExits(data)
        if(res.msg === true){
            navigate(`/messenger/t/${res.data._id}`)
        }else{
            const response = await consService.create(data)
            if(response.msg === true){
                navigate(`/messenger/t/${response.data._id}`)
            }else{
                alert("Kh??ng th??? t???o cu???c h???i tho???i")
            }
        }
    }
    return <div className={cx('wrapper')}>
        <div className={cx('header')}>
            <div className={cx('left')}></div>
            <div className={cx('center')}>
                <div className={cx('cover-content')}>
                    <div className={cx('picture')}>
                        <Image className={cx('coverPicture')} src={user?.coverImage?"":images.background}/>
                        <div className={cx('pictureInput')}>
                            <input type="file" id='filePicture' name='filePicture' hidden /> 
                            <label htmlFor="filePicture">
                                <div className={cx('btn-input-picture')}> 
                                    <FontAwesomeIcon icon={faCamera} />
                                    <span>Th??m ???nh b??a</span>
                                </div>
                            </label>
                        </div>
                    </div>
                    <div className={cx('content')}>
                        <div className={cx('user')}>
                            <div className={cx('boxAvatar')}>
                                <Image className={cx('avatar')} src={user?.avatar?"":images.avatar}/>
                                <input type="file" hidden id='filePicture'/>
                                <label htmlFor="filePicture">
                                    <div className={cx('btn-input-avatar')}>
                                        <FontAwesomeIcon icon={faCamera} />
                                    </div>
                                </label>
                            </div>
                            <div className={cx('info')}>
                                <span className={cx('name')}>{user?.fullName}</span>
                                <span className={cx("number-friend")}>{user?.friends.length} B???n b??</span>
                            </div>
                        </div>
                        <div className={cx('interactive')}>
                            {(user?._id!==currentUser?._id)&&(<div>
                                <Button onClick={handleAddFriend}  normal primary> {isFriend?"B??? theo d??i":"+ Theo d??i"}</Button>
                                <Button onClick={handleOpenMessage} normal gray >Nh???n tin</Button>
                            </div>)}
                            {(user?._id===currentUser?._id) &&(
                                <div>
                                    <Button normal leftIcon={<FontAwesomeIcon icon={faPencil} />} gray >Ch???nh s???a trang c?? nh??n</Button>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className={cx('menu')}>
                            <ul className={cx('lists')}>
                                <li className={cx('selected')} >B??i vi???t</li>
                                <li>Gi???i thi???u</li>
                                <li>B???n b??</li>
                                <li>???nh</li>
                                <li>Video</li>
                                <li>Check in</li>
                                <li>Xem th??m</li>
                            </ul>
                            <Tippy content="Xem th??m">
                                <div className={cx('more')}>
                                    <FontAwesomeIcon icon={faEllipsis} />
                                </div>
                            </Tippy>
                    </div>
                </div>
            </div>
            <div className={cx('right')}></div>
        </div>
        <div className={cx('body')}>
            <div className={cx('left')}></div>
            <div className={cx('center')}>
                <div className={cx('posts')}>
                    <div className={cx('aside')}>
                        <div className={cx('sidebar')}>
                            <div className={cx('wrapbox')}>
                                <div className={cx('head')}>
                                    <span>Gi???i thi???u</span>
                                </div>
                                <div className={cx('btn')}>
                                    <Button gray large >Th??m ti???u s???</Button>
                                </div>
                                <div className={cx('description')}>
                                    <p>M?? t???</p>
                                    <p>
                                        Y??u t??? do
                                    </p>
                                </div>
                                <div className={cx('btn')}>
                                    <Button gray large >Ch???nh s???a chi ti???t</Button>
                                </div>
                                <div className={cx('btn')}>
                                    <Button gray large >Ch???nh s???a s??? th??ch</Button>
                                </div>
                                <div className={cx('btn')}>
                                    <Button gray large >Th??m n???i dung ????ng ch?? ??</Button>
                                </div>
                            </div>
                            <div className={cx('wrapbox')}>
                                <div className={cx('head')}>
                                    <span>???nh</span>
                                    <Link to={`/`}>Xem t???t c??? ???nh</Link>
                                </div>
                                <div className={cx('boxImage')}>
                                    <div className={cx('images')}>
                                        <span></span>
                                        <Image className={cx('image')} src={images.avatar}/>
                                    </div>
                                    <div  className={cx('images')}>
                                        <span></span>
                                        <Image className={cx('image')} src={images.avatar}/>
                                    </div>
                                    <div className={cx('images')}>
                                        <span></span>
                                        <Image className={cx('image')} src={images.avatar}/>
                                    </div>
                                    <div className={cx('images')}>
                                        <span></span>
                                        <Image className={cx('image')} src={images.avatar}/>
                                    </div>
                                    <div  className={cx('images')}>
                                        <span></span>
                                        <Image className={cx('image')} src={images.avatar}/>
                                    </div>
                                    <div className={cx('images')}>
                                        <span></span>
                                        <Image className={cx('image')} src={images.avatar}/>
                                    </div>
                                </div>
                            </div>
                            <div className={cx('wrapbox')}>
                                <div className={cx('head')}>
                                    <span>B???n b??</span>
                                    <Link to={`/`}>Xem t???t c??? b???n b??</Link>
                                </div>
                                <div className={cx('boxImage')}>
                                    <div className={cx('friend')}>
                                        <div className={cx('images')}>
                                            <span></span>
                                            <Image className={cx('image')} src={images.avatar}/>
                                        </div>
                                        <span className={cx('name')}>
                                            T??? H???u H??o
                                        </span>
                                    </div>
                                    <div className={cx('friend')}>
                                        <div className={cx('images')}>
                                            <span></span>
                                            <Image className={cx('image')} src={images.avatar}/>
                                        </div>
                                        <span className={cx('name')}>
                                            T??? H???u H??o
                                        </span>
                                    </div>
                                    <div className={cx('friend')}>
                                        <div className={cx('images')}>
                                            <span></span>
                                            <Image className={cx('image')} src={images.avatar}/>
                                        </div>
                                        <span className={cx('name')}>
                                            T??? H???u H??o
                                        </span>
                                    </div>
                                    <div className={cx('friend')}>
                                        <div className={cx('images')}>
                                            <span></span>
                                            <Image className={cx('image')} src={images.avatar}/>
                                        </div>
                                        <span className={cx('name')}>
                                            T??? H???u H??o
                                        </span>
                                    </div>
                                    <div className={cx('friend')}>
                                        <div className={cx('images')}>
                                            <span></span>
                                            <Image className={cx('image')} src={images.avatar}/>
                                        </div>
                                        <span className={cx('name')}>
                                            T??? H???u H??o
                                        </span>
                                    </div>
                                    <div className={cx('friend')}>
                                        <div className={cx('images')}>
                                            <span></span>
                                            <Image className={cx('image')} src={images.avatar}/>
                                        </div>
                                        <span className={cx('name')}>
                                            T??? H???u H??o
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className={cx('policy')}>
                                <span>
                                Quy???n ri??ng t??  ?? ??i???u kho???n  ?? Qu???ng c??o  ?? L???a ch???n qu???ng c??o   ?? Cookie  ??   ?? Meta ?? 2022
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className={cx('feed')}>
                        <Feed userId={user?._id} onlyUser={true} />
                    </div>
                </div>
            </div>
            <div className={cx('right')}></div>
        </div>
    </div>;
};

export default Profile;
