import React from 'react';
import classNames from 'classnames/bind';
import styles from './Rightbar.module.scss';
import Image from '~/components/Image';
import Button from '~/components/Button';
import images from '~/assets/images';
import { Link } from 'react-router-dom';
import MakeFriend from '~/components/MakeFriend';
import OnlineUser from '~/components/OnlineUser';
const cx = classNames.bind(styles);
const Rightbar = () => {
    return(
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('advertisements')}>
                    <div className={cx('header')}>
                        <span>Được tài trợ</span>
                    </div>
                    <div className={cx('items')}>
                        <Button href="https://fullstack.edu.vn/" className={cx('advertisement')}>
                            <div className={cx('info','centerRow')}>
                                <div className={cx('banner')}>
                                    <Image className={cx('banner')} src="https://static.fullstack.edu.vn/static/media/f8-icon.18cd71cfcfa33566a22b.png" />
                                </div>
                                <div className={cx('title','center','centerCol')}>
                                    <p>F8 Full Stack Học Lập Trình Để Đi Làm</p>
                                    <span>fullstack.edu.vn</span>
                                </div>
                            </div>
                        </Button>
                        <Button href="https://www.facebook.com/" className={cx('advertisement')}>
                            <div className={cx('info','centerRow')}>
                                <div className={cx('banner')}>
                                    <Image className={cx('banner')} src="" />
                                </div>
                                <div className={cx('title')}>
                                    <p>Facebook</p>
                                    <span>facebook.com</span>
                                </div>
                            </div>
                        </Button>
                    </div>
                </div>
                <div className={cx('pages')}>
                    <div className={cx('header')}>
                        <span>
                            Trang và trang cá nhân của bạn
                        </span>
                    </div>
                    <div className={cx('items')}>
                        <Link to="/" className={cx('centerRow','item')}>
                            <Image className={cx('avatar')} src={images.avatar}/>
                            <span>Hội những người yêu Roise</span>
                        </Link>
                    </div>
                </div>
                <div className={cx('addFriend')}>
                    <div className={cx('header')}>
                        <span>Lời mời kết bạn</span>
                        <Button className={cx('link')} to="/">Xem tất cả</Button>
                    </div>
                    <div className={cx('item')}>
                        <MakeFriend/>
                    </div>
                </div>
                <div className={cx('contact')}>
                    <div className={cx('header')}>
                        <span>Người liên hệ</span>
                    </div>
                    <div className={cx('OnlineUsers')}>
                        <OnlineUser/>
                        <OnlineUser/>
                        <OnlineUser/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Rightbar;
