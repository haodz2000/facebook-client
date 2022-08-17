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
                alert("Không thể tạo cuộc hội thoại")
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
                                    <span>Thêm ảnh bìa</span>
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
                                <span className={cx("number-friend")}>{user?.friends.length} Bạn bè</span>
                            </div>
                        </div>
                        <div className={cx('interactive')}>
                            {(user?._id!==currentUser?._id)&&(<div>
                                <Button onClick={handleAddFriend}  normal primary> {isFriend?"Bỏ theo dõi":"+ Theo dõi"}</Button>
                                <Button onClick={handleOpenMessage} normal gray >Nhắn tin</Button>
                            </div>)}
                            {(user?._id===currentUser?._id) &&(
                                <div>
                                    <Button normal leftIcon={<FontAwesomeIcon icon={faPencil} />} gray >Chỉnh sửa trang cá nhân</Button>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className={cx('menu')}>
                            <ul className={cx('lists')}>
                                <li className={cx('selected')} >Bài viết</li>
                                <li>Giới thiệu</li>
                                <li>Bạn bè</li>
                                <li>Ảnh</li>
                                <li>Video</li>
                                <li>Check in</li>
                                <li>Xem thêm</li>
                            </ul>
                            <Tippy content="Xem thêm">
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
                                    <span>Giới thiệu</span>
                                </div>
                                <div className={cx('btn')}>
                                    <Button gray large >Thêm tiểu sử</Button>
                                </div>
                                <div className={cx('description')}>
                                    <p>Mô tả</p>
                                    <p>
                                        Yêu tự do
                                    </p>
                                </div>
                                <div className={cx('btn')}>
                                    <Button gray large >Chỉnh sửa chi tiết</Button>
                                </div>
                                <div className={cx('btn')}>
                                    <Button gray large >Chỉnh sửa sở thích</Button>
                                </div>
                                <div className={cx('btn')}>
                                    <Button gray large >Thêm nội dung đáng chú ý</Button>
                                </div>
                            </div>
                            <div className={cx('wrapbox')}>
                                <div className={cx('head')}>
                                    <span>Ảnh</span>
                                    <Link to={`/`}>Xem tất cả ảnh</Link>
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
                                    <span>Bạn bè</span>
                                    <Link to={`/`}>Xem tất cả bạn bè</Link>
                                </div>
                                <div className={cx('boxImage')}>
                                    <div className={cx('friend')}>
                                        <div className={cx('images')}>
                                            <span></span>
                                            <Image className={cx('image')} src={images.avatar}/>
                                        </div>
                                        <span className={cx('name')}>
                                            Tạ Hữu Hào
                                        </span>
                                    </div>
                                    <div className={cx('friend')}>
                                        <div className={cx('images')}>
                                            <span></span>
                                            <Image className={cx('image')} src={images.avatar}/>
                                        </div>
                                        <span className={cx('name')}>
                                            Tạ Hữu Hào
                                        </span>
                                    </div>
                                    <div className={cx('friend')}>
                                        <div className={cx('images')}>
                                            <span></span>
                                            <Image className={cx('image')} src={images.avatar}/>
                                        </div>
                                        <span className={cx('name')}>
                                            Tạ Hữu Hào
                                        </span>
                                    </div>
                                    <div className={cx('friend')}>
                                        <div className={cx('images')}>
                                            <span></span>
                                            <Image className={cx('image')} src={images.avatar}/>
                                        </div>
                                        <span className={cx('name')}>
                                            Tạ Hữu Hào
                                        </span>
                                    </div>
                                    <div className={cx('friend')}>
                                        <div className={cx('images')}>
                                            <span></span>
                                            <Image className={cx('image')} src={images.avatar}/>
                                        </div>
                                        <span className={cx('name')}>
                                            Tạ Hữu Hào
                                        </span>
                                    </div>
                                    <div className={cx('friend')}>
                                        <div className={cx('images')}>
                                            <span></span>
                                            <Image className={cx('image')} src={images.avatar}/>
                                        </div>
                                        <span className={cx('name')}>
                                            Tạ Hữu Hào
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className={cx('policy')}>
                                <span>
                                Quyền riêng tư  · Điều khoản  · Quảng cáo  · Lựa chọn quảng cáo   · Cookie  ·   · Meta © 2022
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
