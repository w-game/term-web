import { NavLink, useLoaderData, useLocation } from 'react-router-dom'
import '../css/Search.css'
import TopELement from '../element/TopElement';
import BorderBox from '../element/BorderBox';
import BorderRouter from '../element/BorderRouter';
import axios from 'axios';
import { useState, useEffect } from 'react';
import appConfig from '../config/app'

function WindowResizeListener() {
    var es = document.getElementsByClassName("border-box")
    for (let index = 0; index < es.length; index++) {
        const e = es[index];
        e.classList.add("newWidth");
    }
}

export function Search() {
    const [termData, setTermData] = useState()
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const term = queryParams.get('term');

    useEffect(() => {
        window.addEventListener('resize', WindowResizeListener);

        return () => {
            window.removeEventListener('resize', WindowResizeListener);
        };
    }, []);

    useEffect(() => {
        if (termData == null || termData.name !== term) {
            axios.get(`${appConfig.serverAddress}/search/get/${term}`)
                .then(response => {
                    setTermData(response.data)
                    console.log(response.data)
                })
        }
    }, [term]);

    function CalcLanguage(l) {
        switch (l) {
            case "en":
                return "英"
            case "jp":
                return "日"

            default:
                return "中"
        }
    }

    return (
        <div className='view'>
            <div className='App-header search-header'>
                <TopELement />
            </div>
            <BorderBox>
                <BorderRouter r1='Tech Terms' r2='前端' />
                <h1 className='Search-content-dict-title'>
                    {termData ? termData.name : '未找到相关术语'}
                </h1>
                <ul>
                    {
                        termData?.languages.map((val, i) => {
                            if (val.name != null) {
                                return (
                                    <li key={'term_' + i} className='Search-content-dict-item'>
                                        <div className='Search-content-dict-item-title'>
                                            <div className='Search-content-dict-item-language-type'>
                                                {CalcLanguage(val.language)}
                                            </div>
                                            <p className='Search-content-dict-item-name'>
                                                {val.name}
                                            </p>
                                        </div>
                                        <p className='Search-content-dict-item-des'>
                                            {val.definition}
                                        </p>
                                    </li>
                                )
                            } else {
                                return (
                                    <li key={'term_' + i} className='Search-content-dict-item'>
                                        <div className='Search-content-dict-item-title'>
                                            <div className='Search-content-dict-item-language-type'>
                                                {val.language}
                                            </div>
                                            <p className='Search-content-dict-item-name'>
                                                暂无资料
                                            </p>
                                        </div>
                                    </li>
                                )
                            }
                        })
                    }
                </ul>

                <div className='search-content-dict-info'>
                    <div className='search-content-dict-info-content'>
                        <div className='search-content-dict-info-content-more'>
                            <div className='Search-content-dict-add-language'>
                                <p>添加语言解释</p>
                            </div>
                        </div>
                        <div className='search-content-dict-info-content-author'>
                            <p className='search-content-dict-info-content-author-text'>由官方编辑</p>
                            <p className='search-content-dict-info-content-author-time'>2023.04.22</p>
                        </div>
                    </div>
                </div>
            </BorderBox>

            <BorderBox>
                <div className='border-box-title'>
                    <div className='term-similar'>
                        <h2>近似术语</h2>
                    </div>
                </div>
                <div className='term-similar-content'>
                    <NavLink className='term-similar-item' to={`/search?term=${'后端'}`}>
                        后端
                    </NavLink>
                </div>
            </BorderBox>
        </div>
    )
}

export default Search