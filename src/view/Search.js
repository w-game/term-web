import { NavLink, useLoaderData, useLocation } from 'react-router-dom'
import '../css/Search.css'
import TopELement from '../element/TopElement';
import BorderBox from '../element/BorderBox';
import BorderRouter from '../element/BorderRouter';
import { useState, useEffect } from 'react';
import { get } from '../func/request'


export function Search() {
    const [termData, setTermData] = useState()
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const termName = queryParams.get('name');
    const fieldId = queryParams.get('fieldId');

    switch (location.pathname) {
        case "/term":
            const id = queryParams.get('id');
            if (termData == null || termData.id !== parseInt(id)) {
                get(`term?id=${id}`, res => {
                    setTermData(res.data)
                    console.log(res.data)
                })
            }
            break;
        case "/term/ai":
            get(`ai/term?name=${termName}&field=${fieldId}`, res => {
                setTermData(res.data)
            })
            break
    }

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

    function CalcTime(isoDate) {
        const date = isoDate ? new Date(isoDate) : new Date();
        const hour = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
        const minute = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
        const formattedDate = `${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()} ${hour}:${minute}`;
        return formattedDate
    }

    return (
        <div className='view'>
            <div className='App-header search-header'>
                <TopELement />
            </div>
            <div className='searh-view'>
                <div className='main-box'>
                    <BorderBox>
                        <BorderRouter r1={termData?.subfield} r2={termData?.infos[0].name} r1_link={`/terms?id=${fieldId}&field=${termData?.subfield}`} />
                        <h1 className='Search-content-dict-title'>
                            {termData ? termData.name : '未找到相关术语'}
                        </h1>
                        <ul>
                            {
                                termData?.infos.map((val, i) => {
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
                                                <div className='Search-content-dict-item-des'>
                                                    <p className='des-label'>定义</p>
                                                    {val.definition}
                                                </div>
                                                <div className='Search-content-dict-item-des'>
                                                    <p className='des-label'>历史</p>
                                                    {val.history}
                                                </div>
                                                <div className='Search-content-dict-item-des'>
                                                    <p className='des-label'>应用</p>
                                                    {val.application}
                                                </div>
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
                                    <p className='search-content-dict-info-content-author-text'>由<span style={{ color: "#1871D8", cursor: 'pointer', display: 'flex', alignItems: 'center' }}>{termData?.author.nickname}</span>编辑</p>
                                    <p className='search-content-dict-info-content-author-time'>{CalcTime(termData ? termData.create_time : null)}</p>
                                </div>
                            </div>
                        </div>
                    </BorderBox>
                </div>

                <div className='additional-box'>
                    <BorderBox>
                        <div className='border-box-title'>
                            <div className='term-similar'>
                                <h2>近似术语</h2>
                            </div>
                        </div>
                        <div className='term-similar-content'>
                            {
                                termData?.related_terms.map((val, i) => (
                                    <NavLink
                                        key={`related_term_${i}`}
                                        className='term-similar-item'
                                        to={`/term?name=${'后端'}`}>
                                        {val}
                                    </NavLink>
                                ))
                            }
                        </div>
                    </BorderBox>
                </div>
            </div>
        </div>
    )
}

export default Search