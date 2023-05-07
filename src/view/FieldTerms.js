import { NavLink, useLocation } from 'react-router-dom'
import '../css/CatalogTerms.css'
import TopELement from '../element/TopElement'
import BorderBox from '../element/BorderBox'
import BorderRouter from '../element/BorderRouter'
import { useState, useRef } from 'react'
import { get } from '../func/request'
import search_png from '../img/search.png';
import { throttle } from 'lodash';
import BorderView from './BorderView'

function CatalogTerms(params) {
    const [field, setField] = useState()
    const [fieldSearch, setFieldSearch] = useState()
    const [curPage, setCurPage] = useState(1)
    const [termCount, setTermCount] = useState(1)
    const [searchTerm, setSearchTerm] = useState("")
    const isComposing = useRef(false);

    // 定时器
    const timeoutId = useRef(null)


    const pages = [-2, -1, 0, 1, 2]

    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const fieldId = queryParams.get("id")
    const fieldName = queryParams.get("field")

    if (field == null) {
        get(`subfield?id=${fieldId}&page=${1}`, res => {
            setField(res.data)
            setTermCount(res.data.count)
        })
    }

    function JumpIndex(page) {
        get(`subfield?id=${fieldId}&page=${page}`, res => {
            setField(res.data)
            setTermCount(res.data.count)
            setCurPage(page)
        })
    }

    const handleSearch = name => {
        clearTimeout(timeoutId.current);
        if (!isComposing.current && name !== null && name !== '') {
            const id = setTimeout(() => {
                get(`subfield/term/search?id=${field.id}&name=${name}`, res => {
                    setFieldSearch(res.data.data)
                })
            }, 800);
            timeoutId.current = id
        }
    }

    return (
        <BorderView>
            <div className='field-terms-box'>
                <BorderBox>
                    <BorderRouter r1='领域 / 学科 / 行业' r2={fieldName} r1_link='/field' />
                    <h1 className='catalog-title'>
                        {field?.name}
                    </h1>
                    <p className='catalog-des'>
                        {field?.des}
                    </p>
                    <table className='table-frame'>
                        <thead>
                            <tr>
                                <th className='table-head'>
                                    术语
                                    <div className='list-term-search-box'>
                                        <input
                                            className='list-term-search'
                                            placeholder='找不到术语？试试搜索吧！'
                                            value={searchTerm}
                                            onChange={event => {
                                                const name = event.target.value
                                                setSearchTerm(name)
                                                if (name == null || name == '') {
                                                    setFieldSearch(null)
                                                    clearTimeout(timeoutId.current)
                                                } else {
                                                    handleSearch(name)
                                                }
                                            }}
                                            onCompositionStart={() => {
                                                isComposing.current = true
                                                clearInterval(timeoutId);
                                            }}
                                            onCompositionEnd={event => {
                                                isComposing.current = false
                                                handleSearch(event.target.value)
                                            }}
                                        />
                                        <img className='Search-btn-img' src={search_png} />
                                    </div>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                fieldSearch ?
                                    (
                                        fieldSearch.map((val, i) => {
                                            if (val.type == "ai") {
                                                return (
                                                    <tr key={"field_term_" + val.id}>
                                                        <th className='table-item'>
                                                            <NavLink to={`/term/ai?fieldId=${field.id}&name=${val.name}`}>
                                                                {val.name}
                                                            </NavLink>
                                                            <p className='table-item-ai' style={{ backgroundColor: 'orange' }}>智能推荐</p>
                                                        </th>
                                                    </tr>
                                                )
                                            } else if (val.type == "other") {
                                                return (
                                                    <tr key={"field_term_" + val.id}>
                                                        <th className='table-item'>
                                                            <NavLink to={`/term?fieldId=${field.id}&id=${val.id}&name=${val.name}`}>
                                                                {val.name}
                                                            </NavLink>
                                                            <p className='table-item-ai'>领域：{val.subfield}</p>
                                                        </th>
                                                    </tr>
                                                )
                                            } else {
                                                return (
                                                    <tr key={"field_term_" + val.id}>
                                                        <th className='table-item'>
                                                            <NavLink to={`/term?fieldId=${field.id}&id=${val.id}&name=${val.name}`}>
                                                                {val.name}
                                                            </NavLink>
                                                        </th>
                                                    </tr>
                                                )
                                            }
                                        })
                                    )
                                    :
                                    field?.terms.map((val, i) => (
                                        <tr key={"field_term_" + val.id}>
                                            <th className='table-item'>
                                                <NavLink to={`/term?fieldId=${field.id}&id=${val.id}&name=${val.name}`}>
                                                    {val.name}
                                                </NavLink>
                                            </th>
                                        </tr>
                                    ))
                            }
                            {
                                fieldSearch ? (<></>) : (
                                    <tr>
                                        <th colSpan={1} className='list-page'>
                                            {
                                                pages.map((val, i) => {
                                                    if (curPage + val > 0 && curPage + val < (termCount / 10) + 1) {
                                                        return (
                                                            <p onClick={() => {
                                                                if (val != 0) {
                                                                    JumpIndex(curPage + val)
                                                                }
                                                            }} className={val == 0 ? 'list-page-item-cur' : 'list-page-item'}
                                                                key={'page' + val}>
                                                                {curPage + val}
                                                            </p>
                                                        )
                                                    }
                                                })
                                            }
                                        </th>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </BorderBox>
            </div>
        </BorderView>
    )
}

export default CatalogTerms