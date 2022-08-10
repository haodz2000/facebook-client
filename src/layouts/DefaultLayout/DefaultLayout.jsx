import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import { useSelector } from 'react-redux';

import styles from './DefaultLayout.module.scss';
import Header from '~/layouts/components/Header';
import Sidebar from '~/layouts/components/Sidebar';
import Rightbar from '~/layouts/components/Rightbar';
import NewPost from '~/components/NewPost';


const cx = classNames.bind(styles);
const DefaultLayout = ({ children }) => {
    const openShare = useSelector((state)=>state.share.open)
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <Header />
            </div>
            <div className={cx('container')}>
                <div className={cx('sidebar')}>
                    <Sidebar />
                </div>
                <div className={cx('content')}>{children}</div>
                <div className={cx('rightbar')}>
                    <Rightbar/>
                </div>
            </div>
            {
                openShare&&(<NewPost/>)
            }
        </div>
    );
};
DefaultLayout.propTypes = {
    children: PropTypes.node,
};
export default DefaultLayout;
