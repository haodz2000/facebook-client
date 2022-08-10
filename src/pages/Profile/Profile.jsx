import React from 'react';
import classNames from 'classnames/bind';
import styles from "./Profile.module.scss"
import Image from '~/components/Image';
import images from '~/assets/images';
import Button from '~/components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera, faEllipsis, faPencil, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import Feed from '~/components/Feed';
import { Link } from 'react-router-dom';
const cx = classNames.bind(styles)
const Profile = () => {
    return <div className={cx('wrapper')}>
        <div className={cx('header')}>
            <div className={cx('left')}></div>
            <div className={cx('center')}>
                <div className={cx('cover-content')}>
                    <div className={cx('picture')}>
                        <Image className={cx('coverPicture')} src={images.background}/>
                        <div className={cx('pictureInput')}>
                            <input type="file" id='file' name='file' hidden /> 
                            <label htmlFor="file">
                                <div className={cx('btn-input-picture')}> 
                                    <FontAwesomeIcon icon={faCamera} />
                                    <span>Thêm ảnh bìa</span>
                                </div>
                            </label>
                        </div>
                    </div>
                    <div className={cx('content')}>
                        <div className={cx('user')}>
                            <Image className={cx('avatar')} src={images.avatar}/>
                            <div className={cx('info')}>
                                <span className={cx('name')}>Ta Huu  Hao</span>
                                <span className={cx("number-friend")}>225 Ban be</span>
                            </div>
                        </div>
                        <div className={cx('interactive')}>
                            {false&&(<div>
                                <Button normal primary> + Thêm bạn bè</Button>
                                <Button normal gray >Nhắn tin</Button>
                            </div>)}
                            {true &&(
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
                            <div className={cx('more')}>
                                <FontAwesomeIcon icon={faEllipsis} />
                            </div>
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
                        <Feed userId={''} />
                    </div>
                </div>
            </div>
            <div className={cx('right')}></div>
        </div>
    </div>;
};

export default Profile;
