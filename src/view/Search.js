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
                    const body = res.data
                    if (body.code !== 200) {
                        setTermData(null)
                        return
                    }
                    setTermData(body.data)
                    const definition = body.data.infos[0].definition
                    if (definition == null || definition == '') {
                        fetchTermDefinition(body.data.id)
                    }
                })
                break
        }
    }, [])

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
                                                    val.application ? (val.application) : (
                                                        <NavLink
                                                            className='term-info-get'
                                                            onClick={() => {
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
                                                            }}><span>点击查询</span></NavLink>
                                                    )
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
                        <li key="add_language" className='Search-content-dict-item'>
                            <div className='Search-content-dict-item-title'>
                                <p className='Search-content-dict-item-language-type'>
                                    ➕
                                </p>
                                <NavLink className='Search-content-dict-item-name'>
                                    添加语言解释
                                </NavLink>
                            </div>
                        </li>
                    </ul>

                    <div className='search-content-dict-info'>
                        <div className='search-content-dict-info-content'>
                            <div className='search-content-dict-info-content-more'>
                                <NavLink className='term-op-btn'>
                                    <svg t="1683105935406" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4853" width="24" height="24"><path d="M853.333333 501.333333c-17.066667 0-32 14.933333-32 32v320c0 6.4-4.266667 10.666667-10.666666 10.666667H170.666667c-6.4 0-10.666667-4.266667-10.666667-10.666667V213.333333c0-6.4 4.266667-10.666667 10.666667-10.666666h320c17.066667 0 32-14.933333 32-32s-14.933333-32-32-32H170.666667c-40.533333 0-74.666667 34.133333-74.666667 74.666666v640c0 40.533333 34.133333 74.666667 74.666667 74.666667h640c40.533333 0 74.666667-34.133333 74.666666-74.666667V533.333333c0-17.066667-14.933333-32-32-32z" fill="#666666" p-id="4854"></path><path d="M405.333333 484.266667l-32 125.866666c-2.133333 10.666667 0 23.466667 8.533334 29.866667 6.4 6.4 14.933333 8.533333 23.466666 8.533333h8.533334l125.866666-32c6.4-2.133333 10.666667-4.266667 14.933334-8.533333l300.8-300.8c38.4-38.4 38.4-102.4 0-140.8-38.4-38.4-102.4-38.4-140.8 0L413.866667 469.333333c-4.266667 4.266667-6.4 8.533333-8.533334 14.933334z m59.733334 23.466666L761.6 213.333333c12.8-12.8 36.266667-12.8 49.066667 0 12.8 12.8 12.8 36.266667 0 49.066667L516.266667 558.933333l-66.133334 17.066667 14.933334-68.266667z" fill="#666666" p-id="4855"></path></svg>
                                </NavLink>
                                <NavLink className='term-op-btn'>
                                    <svg t="1683106136671" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5984" width="24" height="24"><path d="M885.9 533.7c16.8-22.2 26.1-49.4 26.1-77.7 0-44.9-25.1-87.4-65.5-111.1a67.67 67.67 0 0 0-34.3-9.3H572.4l6-122.9c1.4-29.7-9.1-57.9-29.5-79.4-20.5-21.5-48.1-33.4-77.9-33.4-52 0-98 35-111.8 85.1l-85.9 311h-0.3v428h472.3c9.2 0 18.2-1.8 26.5-5.4 47.6-20.3 78.3-66.8 78.3-118.4 0-12.6-1.8-25-5.4-37 16.8-22.2 26.1-49.4 26.1-77.7 0-12.6-1.8-25-5.4-37 16.8-22.2 26.1-49.4 26.1-77.7-0.2-12.6-2-25.1-5.6-37.1zM112 528v364c0 17.7 14.3 32 32 32h65V496h-65c-17.7 0-32 14.3-32 32z" p-id="5985"></path></svg>
                                </NavLink>
                                <NavLink className='term-op-btn'>
                                    <svg t="1683106190595" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6133" width="24" height="24"><path d="M885.9 490.3c3.6-12 5.4-24.4 5.4-37 0-28.3-9.3-55.5-26.1-77.7 3.6-12 5.4-24.4 5.4-37 0-28.3-9.3-55.5-26.1-77.7 3.6-12 5.4-24.4 5.4-37 0-51.6-30.7-98.1-78.3-118.4-8.3-3.6-17.2-5.4-26.5-5.4H273v428h0.3l85.8 310.8C372.9 889 418.9 924 470.9 924c29.7 0 57.4-11.8 77.9-33.4 20.5-21.5 31-49.7 29.5-79.4l-6-122.9h239.9c12.1 0 23.9-3.2 34.3-9.3 40.4-23.5 65.5-66.1 65.5-111 0-28.3-9.3-55.5-26.1-77.7zM112 132v364c0 17.7 14.3 32 32 32h65V100h-65c-17.7 0-32 14.3-32 32z" p-id="6134"></path></svg>
                                </NavLink>
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