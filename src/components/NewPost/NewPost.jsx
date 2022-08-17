import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSmile } from '@fortawesome/free-regular-svg-icons';
import { useNavigate } from 'react-router-dom';
import {
    faCircleCheck,
    faEarthAsia,
    faEllipsis,
    faFlag,
    faImage,
    faLocationDot,
    faRemove,
    faSpinner,
    faUserTag,
} from '@fortawesome/free-solid-svg-icons';
import { useSelector, useDispatch } from 'react-redux';
import Tippy from '@tippyjs/react';

import app from '~/firebase/firebase';
import styles from './NewPost.module.scss';
import * as postService from "~/services/postService"
import {close } from '~/redux/features/shareSlice';
import Image from '../Image';
import images from '~/assets/images';
const cx = classNames.bind(styles);
const NewPost = () => {
    const navigate = useNavigate();
    const user = useSelector((state)=>state.user.currentUser)
    const storage = getStorage(app);
    const dispatch = useDispatch();
    const metadata = {
        contentType: 'image/jpeg'
    };
    const [open, setOpen] = useState(false);
    const [active, setActive] = useState(false);
    const [file, setFile] = useState([]);
    const [isFetching, setIsFetching] = useState(false);
    const [newPost, setNewPost] = useState({
        userId: user._id,
        image :[],
        desc :"",
        background:true,
    });
    const title = useRef();
    const closeBoxShare = () => {
        dispatch(close());
    };
    const handleInput = ()=>{
        setNewPost({...newPost,desc:title.current.innerHTML})
    }
    const handleAddImage = (e) => {
        const image = e.target.files[0];
        image.preview = URL.createObjectURL(image);
        setFile([...file, image]);
    };
    useEffect(()=>{
        if(file.length > 0){
            setNewPost({...newPost,background:false})
        }
    },[newPost,file])
    useEffect(()=>{
        if(newPost.desc !==""||file.length > 0){
            setActive(true)
        }else{
            setActive(false)
        }
    },[newPost,file])
    const handleHidden = () => {
        file.map((item, index) => {
           return item && URL.revokeObjectURL(item.preview);
        });
        setFile([]);
        setOpen(false);
    };
    const handleSubmit = async() => {
        if(newPost.desc !== "" || file.length >= 0){
            setIsFetching(true);
            if(file.length >0){
                const storageRef = ref(storage, 'posts/' + new Date().getTime() + file[0].name);
                const uploadTask = uploadBytesResumable(storageRef, file[0], metadata);
                uploadTask.on('state_changed',
                (snapshot) => {
                switch (snapshot.state) {
                case 'paused':
                    break;
                case 'running':
                    break;
                    default:break
                }
            }, 
            (error) => {
                switch (error.code) {
                    case 'storage/unauthorized':
                    break;
                case 'storage/canceled':
                    break;
                    case 'storage/unknown':
                        break;
                        default:break
                    }
                }, 
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        const post = newPost;
                        post.images = [downloadURL];
                        postService.post(post)
                        setIsFetching(false);
                        dispatch(close())
                        navigate("/")
                    });
                });
            }
            else{
                const post = newPost;
                await postService.post(post)
                setIsFetching(false)
                dispatch(close())
                navigate("/")
            } 
        }
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('header')}>
                    <span>Tạo bài viết</span>
                    <div onClick={closeBoxShare} className={cx('iconRemove')}>
                        <FontAwesomeIcon className={cx('remove')} icon={faRemove} />
                    </div>
                </div>
                <div className={cx('body')}>
                    <div className={cx('user')}>
                        <Image className={cx('avatar')} src={images.avatar} />
                        <div className={cx('info')}>
                            <div className={cx('name')}>
                                <span>{user?.fullName}</span>
                                {user?.tick&&<FontAwesomeIcon className={cx('tick')} icon={faCircleCheck} />}
                            </div>
                            <div className={cx('mode')}>
                                <FontAwesomeIcon icon={faEarthAsia} /> <span>Công khai</span>
                            </div>
                        </div>
                    </div>
                    <div className={cx('content')}>
                        <div
                            onKeyUp={handleInput}
                            ref={title}
                            className={cx('desc')}
                            tabIndex={0}
                            contentEditable="true"
                            placeholder={` ${user?.firstName} ơi, bạn đang nghĩ gì thế `}
                            role="textbox"
                            aria-multiline="true"
                            spellCheck={false}
                        ></div>
                        <div className={cx('option')}>
                            <Tippy content="emoji">
                                <FontAwesomeIcon icon={faSmile} />
                            </Tippy>
                        </div>
                        <input onChange={handleAddImage} type="file" name="file" id="file" hidden />
                        {open && (
                            <div className={cx('boxImage')}>
                                <div className={cx('containerImage')}>
                                    <label htmlFor={file.length===0?"file":""}>
                                        <div
                                            className={cx('image', {
                                                'bg-gray': file.length === 0,
                                            })}
                                        >
                                            {file.length === 0 && (
                                                <>
                                                    <div className={cx('div')}>
                                                        <FontAwesomeIcon icon={faImage} />
                                                    </div>
                                                    <p>Thêm ảnh/video</p>
                                                    <span>hoặc kéo và thả</span>
                                                </>
                                            )}
                                            {file.length > 0 && (
                                                <div className={cx('imagePreview')}>
                                                    {file.map((item, index) => (
                                                        <Image
                                                            className={cx('imgPre', 'imgMul')}
                                                            key={index}
                                                            src={item.preview}
                                                        />
                                                    ))}
                                                </div>
                                            )}
                                            <div onClick={handleHidden} className={cx('hidden')}>
                                                <FontAwesomeIcon icon={faRemove} />
                                            </div>
                                        </div>
                                    </label>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <div className={cx('footer')}>
                    <div className={cx('more')}>
                        <div className={cx('moreText')}>
                            <span>Thêm vào bài viết của bạn</span>
                        </div>
                        <div className={cx('boxIcons')}>
                            <FontAwesomeIcon
                                onClick={() => setOpen(true)}
                                className={cx('iconImage', 'icon')}
                                icon={faImage}
                            />
                            <FontAwesomeIcon
                                onClick={() => setOpen(false)}
                                className={cx('iconFriend', 'icon')}
                                icon={faUserTag}
                            />
                            <FontAwesomeIcon className={cx('iconEmoji', 'icon')} icon={faSmile} />
                            <FontAwesomeIcon className={cx('iconLocation', 'icon')} icon={faLocationDot} />
                            <FontAwesomeIcon className={cx('iconFlag', 'icon')} icon={faFlag} />
                            <FontAwesomeIcon className={cx('iconMore', 'icon')} icon={faEllipsis} />
                        </div>
                    </div>
                </div>
                <div className={cx('submit')}>
                    <button onClick={handleSubmit} className={cx('btnSubmit',{'active':active})}>
                        Đăng
                    </button>
                </div>
                {isFetching && (
                    <div className={cx('process')}>
                        <FontAwesomeIcon className={cx('iconProcess')} icon={faSpinner} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default NewPost;
