import TopELement from "../element/TopElement"
import '../css/TermExtract.css'
import { NavLink, useLocation, useNavigate } from "react-router-dom"
import { Fragment, useCallback, useEffect, useState } from "react"
import add from '../img/add.png'
import { get, post } from '../func/request'

function TermExtract(params) {
    const [middleStatus, setMiddleStatus] = useState("ADD")
    const [articalData, setArticalData] = useState()
    const [articleNames, setArticleNames] = useState()
    const [isSearching, setIsSearching] = useState(false)
    const [termName, setTermName] = useState()
    const [termData, setTermData] = useState()
    const [isTermSearching, setIsTermSearching] = useState(false)

    const navigate = useNavigate();

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);

    useEffect(() => {
        if (articleNames == null) {
            get("articles", res => {
                setArticleNames(res.data)
            })
        }
    }, [articleNames])

    switch (location.pathname) {
        case "/extract":
            const id = queryParams.get('id');
            if (id != null && (articalData == null || parseInt(articalData.id) !== parseInt(id))) {
                console.log(id, articalData?.id)
                get(`article?id=${id}`, res => {
                    setMiddleStatus("SHOW")
                    setArticalData(res.data)
                })
            }
            break;
        case "/extract/add":
            if (middleStatus != "ADD") {
                setMiddleStatus("ADD")
            }
    }

    const handleClick = name => {
        if (isTermSearching) return
        setTermName(name)
        setIsTermSearching(true)
        get(`term/search?name=${name}`, res => {
            setTermData(res.data)
            setIsTermSearching(false)
        })
    }

    function ArticalShow(params) {
        const [textType, setTextType] = useState("TEXT")

        const matchKeywordsAndTerms = (text, keywords, terms, i) => {
            const matchChars = keywords.concat(terms)
            const splitText = text.split(new RegExp(`(${matchChars.join('|')})`, 'g'));

            const renderText = () => {
                return splitText.map((part, index) => {
                    if (keywords.includes(part)) {
                        // 如果 part 在匹配数组中，则将它包裹在可点击的 span 元素中
                        return (
                            <span
                                key={index}
                                className="artical-content-w"
                                style={{ color: 'red' }}
                                onClick={() => handleClick(part)}>
                                {part}
                            </span>
                        );
                    } else if (terms.includes(part)) {
                        return (
                            <span
                                key={index}
                                className="artical-content-w"
                                onClick={() => handleClick(part)}>
                                {part}
                            </span>
                        );
                    } else {
                        // 否则直接返回文本
                        return part;
                    }
                });
            };

            return (
                <p key={"p_" + i} className="artical-content-p">
                    {renderText()}
                </p>
            )
        }

        const render = () => {
            if (articalData == null) {
                return (<></>)
            }
            var paragraphs = articalData.content.split('\n\n');
            if (paragraphs.length == 1) {
                paragraphs = articalData.content.split('\r\n\r\n')
            }
            return (
                <>
                    {
                        paragraphs.map((val, i) => (
                            matchKeywordsAndTerms(val, articalData.keywords, articalData.terms, i)
                        ))
                    }
                </>
            )
        }

        return (
            <>
                <div className="middle-top">
                    <h2 className={textType == "TEXT" ? "middle-style-selected" : "middle-style"} onClick={() => setTextType("TEXT")}>
                        文本
                    </h2>
                    <h2 className={textType == "FORMAT" ? "middle-style-selected" : "middle-style"} onClick={() => setTextType("FORMAT")}>
                        规范化
                    </h2 >
                </div >
                <div>
                    <h2 className="artical-title">
                        {articalData?.title}
                    </h2>
                    <div className="artical-content">
                        {
                            render()
                        }

                    </div>
                </div>
            </>
        )
    }

    function ArticalAdd(params) {
        const [articalTitle, setArticalTitle] = useState("")
        const [articalContent, setArticalContent] = useState("")
        const [extractType, setExtractType] = useState(0)

        const handleExtract = () => {
            if (articalTitle == null || articalTitle == ''
                || articalContent == null || articalContent == '') {
                return
            }
            post("extract", {
                "title": articalTitle,
                "content": articalContent
            }, res => {
                // setArticalData(data)
                // setMiddleStatus("SHOW")
                navigate(`/extract?id=${res.data.id}`);
                setIsSearching(false)
            })
            setIsSearching(true)
        }

        return (
            <>
                <div className="middle-top">
                    <h2 className={extractType == 0 ? "middle-style-selected" : "middle-style"} onClick={() => setExtractType(0)}>文本提取</h2>
                    <h2 className={extractType == 1 ? "middle-style-selected" : "middle-style"} onClick={() => setExtractType(1)}>文件提取(PDF/word)</h2>
                </div>
                {
                    extractType == 0 ? (
                        <div>
                            <div className="artical-add-item">
                                <h3>标题</h3>
                                <input className="artical-add-title" onChange={e => {
                                    setArticalTitle(e.target.value)
                                }}
                                    value={articalTitle} />
                            </div>
                            <div className="artical-add-item">
                                <h3>内容</h3>
                                <textarea className="artical-add-area" onChange={e => {
                                    setArticalContent(e.target.value)
                                }}
                                    value={articalContent} />
                            </div>
                            <div className="artical-add-start">
                                <button className="artical-add-start-btn" onClick={handleExtract}>开始提取</button>
                            </div>
                        </div>
                    ) : (
                        <div className="artical-add-select-file">
                            <div className="artical-add-select-file-btn">
                                <img src={add} style={{ width: '48px', height: '48px' }} />
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <p>Demo.word</p>
                            </div>
                            <div className="artical-add-start">
                                <button className="artical-add-start-btn" onClick={handleExtract}>开始提取</button>
                            </div>
                        </div>
                    )
                }
            </>
        )
    }

    const termDetail = name => {
        if (!termData || termData.infos[0].name !== name) return (<></>)
        return (
            <>
                <p className="article-term-d">
                    {termData.infos[0].definition}
                    <NavLink
                        className="article-term-more"
                        target="_blank"
                        to={`/term?fieldId=${termData.subfield.id}&id=${termData.id}&name=${termData.infos[0].name}`}>
                        更多内容
                    </NavLink>
                </p >
            </>
        )
    }
    return (
        <div className='view'>
            <div className='App-header search-header'>
                <TopELement />
            </div>
            <div className="body">
                <div className="left">
                    <h3>文章列表</h3>
                    <ul className="article-list">
                        {
                            articleNames?.map((val, i) => (
                                <li key={'article_' + val.id}
                                    className="artical-list-item">
                                    <NavLink to={`/extract?id=${val.id}`}>
                                        #{val.title}
                                    </NavLink>
                                </li>
                            ))
                        }
                        <li className="article-add">
                            <NavLink style={{ color: 'white' }} to='/extract/add'>
                                新增文章
                            </NavLink>
                        </li>
                    </ul>
                </div>
                <div className="middle">
                    {
                        middleStatus == "ADD" ? <ArticalAdd /> : <ArticalShow />
                    }
                </div>
                <div className="right">
                    <div className="right-item">
                        <div className="item-head">
                            <div className="item-logo" />
                            <h3>
                                关键词
                            </h3>
                        </div>
                        <div className="item-content">
                            {
                                articalData?.keywords.map((val, i) => (
                                    <Fragment key={`keyword_${i}`}>
                                        <NavLink
                                            key={`keyword_${i}`}
                                            className="item-link-word"
                                            style={{ color: 'red' }}
                                            onClick={() => handleClick(val)}>
                                            {val}
                                        </NavLink>
                                        <div>
                                            {
                                                !termData || termName !== val ? (<></>) :
                                                    isTermSearching ? (
                                                        <p className="article-term-d">
                                                            读取中...
                                                        </p>
                                                    ) : termDetail(val)
                                            }
                                        </div>
                                    </Fragment>
                                ))
                            }
                        </div >
                    </div>
                    <div className="right-item">
                        <div className="item-head">
                            <div className="item-logo" />
                            <h3>
                                专业术语
                            </h3>
                        </div>
                        <div className="item-content">
                            {
                                articalData?.terms.map((val, i) => (
                                    <Fragment key={`term_${i}`}>
                                        <NavLink
                                            key={`term_` + i}
                                            className="item-link-word"
                                            onClick={() => handleClick(val)}>
                                            {val}
                                        </NavLink>
                                        <div>
                                            {
                                                !termData || termName !== val ? (<></>) :
                                                    isTermSearching ? (
                                                        <p className="article-term-d">
                                                            读取中...
                                                        </p>
                                                    ) : termDetail(val)
                                            }
                                        </div>
                                    </Fragment>
                                ))
                            }
                        </div>
                    </div>
                    <div className="right-item">
                        <div className="item-head">
                            <div className="item-logo" />
                            <h3>
                                文章解析
                            </h3>
                        </div>
                        <div className="item-content" style={{ textIndent: '1.5em' }}>
                            {articalData?.analysis}
                        </div>
                    </div>
                </div>
            </div>

            {
                isSearching ? (<div className="search-mask">正在识别中，请耐心等待...</div>) : (<></>)
            }
        </div >
    )
}

export default TermExtract