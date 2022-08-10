import React, { useEffect, useRef, useState } from 'react'
import classNames from 'classnames/bind'
import styles from "./Search.module.scss"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import HeadlessTippy from '@tippyjs/react/headless';
import {Wrapper as PopperWrapper} from '~/components/Popper'
import AccountItem from '~/components/AccountItem/AccountItem'
const cx = classNames.bind(styles)
const Search = () => {
    const [user, setUser] = useState({
        nickname: "hao.ta.huu.1810",
        fullName:"Tạ Hữu Hào",
        avatar:"https://kenh14cdn.com/203336854389633024/2022/3/8/photo-1-16467175431221225437237.jpg",
        tick:true
    })
    const [searchValue, setSearchValue] = useState('')
    const [searchResult, setSearchResult] = useState([])
    const [showResult, setShowResult] = useState(false)
    const inputRef = useRef();
    useEffect(()=>{
        setShowResult(false);
    },[searchValue])
    const handleHideResult = ()=>{
        setShowResult(false)
    }
  return (
    <div className={cx('wrapper')}>
        <HeadlessTippy
            interactive
            visible= {showResult}
            onClickOutside={handleHideResult}
            render = {(attrs)=>(
                <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                    <PopperWrapper>
                        <AccountItem data={user}/>
                        <AccountItem data={user}/>
                        <AccountItem data={user}/>
                        <AccountItem data={user}/>
                        <AccountItem data={user}/>
                    </PopperWrapper>
                </div>
            )}
        >
            <div className={cx('container')}>
                <input placeholder='Tìm kiếm trên facebook' onChange={(e)=>setSearchValue(e.target.value)} className={cx('searchInput')} type="text" />
                <FontAwesomeIcon className={cx('icon')} icon={faSearch}/>
            </div>
        </HeadlessTippy>
    </div>
  )
}

export default Search