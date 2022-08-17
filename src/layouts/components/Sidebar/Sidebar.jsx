import React from 'react';
import classNames from 'classnames/bind';
import styles from "./Sidebar.module.scss"
import Image from '~/components/Image';
import images from '~/assets/images';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
const cx = classNames.bind(styles)
const Sidebar = () => {
    const currentUser = useSelector((state)=>state.user.currentUser)
    const pages = [
        {
            image : images.friend,
            title: "Bạn bè",
            to: "/"
        },
        {
            image : images.game,
            title: "Chơi game",
            to: "/"
        },
        {
            image : images.messenger,
            title: "Messenger",
            to: `/messenger/t/${currentUser._id}`
        },
        {
            image : images.group,
            title: "Nhóm",
            to: "/"
        },
        {
            image : images.marketplace,
            title: "Marketplace",
            to: "/"
        },
        
    ]
    const groups = [
        {
            image : images.game,
            title: "Lập trình F8 FullStack",
            to: "/"
        },
        {
            image : images.messenger,
            title: "Bộ tộc Mixigaming",
            to: "/"
        },
        {
            image : images.messenger,
            title: "SUPER TEAM - Hơn cả một đội bóng",
            to: "/"
        },
        {
            image : images.group,
            title: "Hội những người yêu lập trình",
            to: "/"
        },
        {
            image : images.marketplace,
            title: "Front-end Việt Nam",
            to: "/"
        },
        
    ]
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('top')}>
                    <div className={cx('user')}>
                        <Image className={cx('avatar')} src={images.avatar}/>
                        <span className={cx('name')}>
                            Tạ Hữu Hào
                        </span>
                    </div>
                    {
                        pages.map((item,index)=>(
                            <Link to={item.to} key={index} className={cx('item')}>
                                <Image className={cx('image')} src={item.image}/>
                                <span className={cx('title')}>
                                    {item.title}
                                </span>
                            </Link>
                        ))
                    }
                    <div className={cx('item')}>
                        <div className={cx('icons')}>
                            <FontAwesomeIcon icon={faAngleDown} />
                        </div>
                        <span className={cx('title')}>
                            Xem thêm
                        </span>
                    </div>
                    
                </div>
                <div className={cx('hr')}></div>
                <div className={cx('center')}>
                    <div className={cx('heading')}>Lối tắt của bạn</div>
                    <div className={cx('groups')}>
                        {
                            groups.map((item,index)=>(
                                <Link to={item.to} key={index} className={cx('item')}>
                                    <Image className={cx('image')} src={item.image}/>
                                    <span className={cx('title')}>
                                        {item.title}
                                    </span>
                                </Link>
                            ))
                        }
                    </div>
                    <div className={cx('item')}>
                        <div className={cx('icons')}>
                            <FontAwesomeIcon icon={faAngleDown} />
                        </div>
                        <span className={cx('title')}>
                            Xem thêm
                        </span>
                    </div>
                </div>
                <div className={cx('bottom')}>
                    <div className={cx('policy')}>
                        Quyền riêng tư  · Điều khoản  · Quảng cáo  · Lựa chọn quảng cáo   · Cookie  ·   · Meta © 2022
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
