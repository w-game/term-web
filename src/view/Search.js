import { NavLink, useLoaderData, useLocation } from 'react-router-dom'
import '../css/Search.css'
import BorderBox from '../element/BorderBox';
import BorderRouter from '../element/BorderRouter';
import { useState, useEffect } from 'react';
import { get, stream } from '../func/request'
import BorderView from '../view/BorderView'


export function Search() {
    const [termData, setTermData] = useState()
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const termName = queryParams.get('name');
    const fieldId = queryParams.get('fieldId');

    const fetchTermDefinition = termId => {
        stream(`term/ai?id=${termId}`, res => {
            const reader = res.body.getReader();

            function processStream({ done, value }) {
                if (done) {
                    console.log('数据流处理完成');
                    return;
                }
                const decoder = new TextDecoder('utf-8');
                const text = decoder.decode(value);

                setTermData(prevData => {
                    return {
                        ...prevData,
                        infos: [
                            {
                                ...prevData.infos[0],
                                definition: prevData.infos[0].definition + text
                            }
                        ]
                    };
                });

                reader.read().then(processStream);
            }

            reader.read().then(processStream);
        })
    }

    useEffect(() => {
        switch (location.pathname) {
            case "/term":
                const id = queryParams.get('id');
                if (termData == null || termData.id !== parseInt(id)) {
                    get(`term?id=${id}`, res => {
                        setTermData(res.data)
                    })
                }
                break;
            case "/term/ai":
                get(`subfield/check?id=${fieldId}&name=${termName}`, res => {
                    setTermData(res.data)
                    const definition = res.data.infos[0].definition
                    if (definition == null || definition == '') {
                        fetchTermDefinition(res.data.id)
                    }
                })
                break
        }
    }, [])

    useEffect(() => console.log(termData?.subfield.id), [termData])

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
        // const hour = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
        // const minute = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
        const month = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1
        const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()
        const formattedDate = `${date.getFullYear()}.${month}.${day}`;
        return formattedDate
    }

    return (
        <BorderView>
            <div className='main-box'>
                <BorderBox>
                    <BorderRouter r1={termData?.subfield.name} r2={termData?.infos[0].name} r1_link={`/terms?id=${termData?.subfield.id}&field=${termData?.subfield.name}`} />
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
                                            <div className='term-info-item'>
                                                <span className='des-label'>定义</span>
                                                {val.definition}
                                            </div>
                                            <div className='term-info-item'>
                                                <span className='des-label'>历史</span>
                                                {
                                                    val.history ? (val.history) : (<NavLink className='term-info-get' onClick={() => {
                                                        stream(`term/history/ai?id=${termData.id}`, res => {
                                                            const reader = res.body.getReader();

                                                            function processStream({ done, value }) {
                                                                if (done) {
                                                                    console.log('数据流处理完成');
                                                                    return;
                                                                }
                                                                const decoder = new TextDecoder('utf-8');
                                                                const text = decoder.decode(value);

                                                                setTermData(prevData => {
                                                                    return {
                                                                        ...prevData,
                                                                        infos: [
                                                                            {
                                                                                ...prevData.infos[0],
                                                                                history: prevData.infos[0].history + text
                                                                            }
                                                                        ]
                                                                    };
                                                                });

                                                                reader.read().then(processStream);
                                                            }

                                                            reader.read().then(processStream);
                                                        })
                                                    }}><span>点击查询</span></NavLink>)
                                                }
                                            </div>
                                            <div className='term-info-item'>
                                                <span className='des-label'>应用</span>
                                                {
                                                    val.application ? (val.application) : (<NavLink className='term-info-get' onClick={() => {
                                                        stream(`term/application/ai?id=${termData.id}`, res => {
                                                            const reader = res.body.getReader();

                                                            function processStream({ done, value }) {
                                                                if (done) {
                                                                    console.log('数据流处理完成');
                                                                    return;
                                                                }
                                                                const decoder = new TextDecoder('utf-8');
                                                                const text = decoder.decode(value);

                                                                setTermData(prevData => {
                                                                    return {
                                                                        ...prevData,
                                                                        infos: [
                                                                            {
                                                                                ...prevData.infos[0],
                                                                                application: prevData.infos[0].application + text
                                                                            }
                                                                        ]
                                                                    };
                                                                });

                                                                reader.read().then(processStream);
                                                            }

                                                            reader.read().then(processStream);
                                                        })
                                                    }}><span>点击查询</span></NavLink>)
                                                }
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
                            <h3>相关术语</h3>
                        </div>
                    </div>
                    <div className='term-similar-content'>
                        {
                            termData?.related_terms.length > 0 ?
                                termData?.related_terms.map((val, i) => (
                                    <NavLink
                                        key={`related_term_${i}`}
                                        className='term-similar-item'
                                        to={`/term/ai?fieldId=${termData.subfield.id}&name=${val}`} target="_blank">
                                        {val}
                                    </NavLink>
                                )) : (<NavLink>点击搜索相关术语</NavLink>)
                        }
                    </div>
                </BorderBox>

                <BorderBox>
                    <div className='border-box-title'>
                        <div className='term-similar'>
                            <h3>术语问</h3>
                        </div>
                    </div>
                    <div className='term-similar-content'>
                        {
                            // termData?.related_terms.map((val, i) => (
                            //     <NavLink
                            //         key={`related_term_${i}`}
                            //         className='term-similar-item'
                            //         to={`/term?name=${'后端'}`}>
                            //         {val}
                            //     </NavLink>
                            // ))
                        }
                    </div>
                </BorderBox>
            </div>
        </BorderView>
    )
}

export default Search