import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import {
    Row, Col, Alert, message,
} from 'antd';
import Card from '@/components/Card/index'
import styles from './index.less'

function Index(props) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loading1, setLoading1] = useState(false);
    const [page, setPage] = useState(1);
    const [select, setSelect] = useState([
        {
            name: 'All',
            select: true,
        },
        {
            name: 'Javascript',
            select: false,
        },
        {
            name: 'Ruby',
            select: false,
        },
        {
            name: 'Java',
            select: false,
        },
        {
            name: 'CSS',
            select: false,
        },
    ]);

    const [show, setShow] = useState(false);

    const p = useRef(1);

    // 获取滚动条当前的位置
    // const getScrollTop = () => {
    //     let scrollTop = 0;
    //     if (document.documentElement && document.documentElement.scrollTop) {
    //         scrollTop = document.documentElement.scrollTop;
    //     } else if (document.body) {
    //         scrollTop = document.body.scrollTop;
    //     }
    //     return scrollTop;
    // };

    // 获取当前可是范围的高度
    // const getClientHeight = () => {
    //     let clientHeight = 0;
    //     if (document.body.clientHeight && document.documentElement.clientHeight) {
    //         clientHeight = Math.min(document.body.clientHeight, document.documentElement.clientHeight);
    //     } else {
    //         clientHeight = Math.max(document.body.clientHeight, document.documentElement.clientHeight);
    //     }
    //     return clientHeight;
    // };

    // 获取文档完整的高度
    // const getScrollHeight = () => Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);

    const getData = (url) => {
        setLoading(true);
        if (window.location.href.split('?select=')[1]) {
            const arr = select;
            for (let i = 0; i < arr.length; i = i + 1) {
                if (arr[i].name === window.location.href.split('?select=')[1]) {
                    arr[i].select = true;
                } else {
                    arr[i].select = false;
                }
            }
            setSelect([...arr]);
        }

        axios.get(url)
            .then((res) => {
                if (res.status === 200) {
                    setLoading(false);
                    setData(res.data.items);
                } else {
                    message.error('Loading failed, please try again later!', 10);
                }
            }).catch(() => {
                setShow(true);
            });
    };

    useEffect(() => {
        // function lister() {
        //     if (getScrollTop() + getClientHeight() + 30 >= getScrollHeight() && p.current === 1) {
        //         // 要执行的方法
        //         console.log('下拉加载');
        //         p.current = 0;
        //         console.log('修改lock为0');
        //         getDataDown();
        //     }
        // }
        // window.addEventListener('scroll', lister)
        if (window.location.href.split('?select=')[1]) {
            switch (window.location.href.split('?select=')[1]) {
                case 'All':
                    return getData(`https://api.github.com/search/repositories?q=stars:%3E1&sort=stars&order=desc&type=Repositories&page=${page}`);
                case 'Javascript':
                    return getData(`https://api.github.com/search/repositories?q=stars:%3E1+language:javascript&sort=stars&order=desc&type=Repositories&page=${page}`);
                case 'Ruby':
                    return getData(`https://api.github.com/search/repositories?q=stars:%3E1+language:ruby&sort=stars&order=desc&type=Repositories&page=${page}`);
                case 'Java':
                    return getData(`https://api.github.com/search/repositories?q=stars:%3E1+language:java&sort=stars&order=desc&type=Repositories&page=${page}`);
                case 'CSS':
                    return getData(`https://api.github.com/search/repositories?q=stars:%3E1+language:css&sort=stars&order=desc&type=Repositories&page=${page}`);

                default:
                    break;
            }
        } else {
            getData('https://api.github.com/search/repositories?q=stars:%3E1&sort=stars&order=desc&type=Repositories');
        }

        // return () => window.removeEventListener('scroll', lister)
    }, []);

    // 下拉加载数据接口
    const getDataDownApi = (url) => {
        setLoading1(true);
        axios.get(url)
            .then((res) => {
                if (res.status === 200) {
                    setLoading(false);
                    setData((pre) => [...pre, ...res.data.items]);
                    setLoading1(false);
                    setPage((pre) => pre + 1);
                } else {

                }
            }).catch(() => {
                setShow(true);
            });
        p.current = 1;
    };
    const getDataDown = () => {
        let tem = {};
        for (let i = 0; i < select.length; i = i + 1) {
            if (select[i].select) {
                tem = select[i];
            }
        }
        switch (tem.name) {
            case 'All':
                return getDataDownApi(`https://api.github.com/search/repositories?q=stars:%3E1&sort=stars&order=desc&type=Repositories&page=${page + 1}`);
            case 'Javascript':
                return getDataDownApi(`https://api.github.com/search/repositories?q=stars:%3E1+language:javascript&sort=stars&order=desc&type=Repositories&page=${page + 1}`);
            case 'Ruby':
                return getDataDownApi(`https://api.github.com/search/repositories?q=stars:%3E1+language:ruby&sort=stars&order=desc&type=Repositories&page=${page + 1}`);
            case 'Java':
                return getDataDownApi(`https://api.github.com/search/repositories?q=stars:%3E1+language:java&sort=stars&order=desc&type=Repositories&page=${page + 1}`);
            case 'CSS':
                return getDataDownApi(`https://api.github.com/search/repositories?q=stars:%3E1+language:css&sort=stars&order=desc&type=Repositories&page=${page + 1}`);

            default:
                break;
        }
    };

    const changeData = (item) => {
        const valiable = `${window.location.href.split('?')[0]}?select=${item.name}`;
        window.history.pushState({}, 0, valiable);
        const arr = select;
        for (const iterator of arr) {
            if (iterator.name === item.name) {
                iterator.select = true;
            } else {
                iterator.select = false;
            }
        }
        setSelect([...arr]);
        setData([]);
        switch (item.name) {
            case 'All':
                return getData(`https://api.github.com/search/repositories?q=stars:%3E1&sort=stars&order=desc&type=Repositories&page=${1}`);
            case 'Javascript':
                return getData(`https://api.github.com/search/repositories?q=stars:%3E1+language:javascript&sort=stars&order=desc&type=Repositories&page=${1}`);
            case 'Ruby':
                return getData(`https://api.github.com/search/repositories?q=stars:%3E1+language:ruby&sort=stars&order=desc&type=Repositories&page=${1}`);
            case 'Java':
                return getData(`https://api.github.com/search/repositories?q=stars:%3E1+language:java&sort=stars&order=desc&type=Repositories&page=${1}`);
            case 'CSS':
                return getData(`https://api.github.com/search/repositories?q=stars:%3E1+language:css&sort=stars&order=desc&type=Repositories&page=${1}`);

            default:
                break;
        }
    };


    return (
        <div >
            <div style={{ margin: '20px auto', textAlign: 'center' }} className={styles.wrapper}>
                {
                    select.map((item, index) => (
                        <a
                            className={item.select ? props.theme==='light'? styles.active_dark: styles.active_light : ''}
                            key={index}
                            onClick={() => changeData(item)}
                            href="#"
                        >{item.name}
                        </a>
                    ))
                }
            </div>
            <div style={{ textAlign: 'center', display: loading ? 'block' : 'none' }}>
                <i className="fa fa-spinner fa-spin fa-2x" />
            </div>

            <Row style={{
                width: '100%', margin: '0 auto', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around', paddingLeft: 10, paddingRight: 10,
            }}
            >

                {
                    data.map((item, index) => (
                        <Col style={{ width: '100%', padding: '10px 5px', margin: 0 }} key={index} lg={6} md={8} sm={12}>
                            <Card item={item} index={index} />
                        </Col>
                    ))
                }
            </Row>
            <div style={{ textAlign: 'center', display: !loading1 && !loading ? 'block' : 'none' }}>
                <button onClick={getDataDown} style={{ fontSize: 15 }}>加载更多</button>
            </div>
            <div style={{ textAlign: 'center', display: loading1 ? 'block' : 'none' }}>
                <i className="fa fa-spinner fa-spin fa-2x" />
            </div>
            <Alert
                message="API rate limit exceeded for 172.104.66.211. (But here's the good news: Authenticated requests get a higher rate limit. Check out the documentation for more details.)!"
                type="error"
                closable
                onClose={() => setShow(false)}
                style={{ display: show ? 'flex' : 'none' }}
            />

        </div>
    );
}

export default Index;
