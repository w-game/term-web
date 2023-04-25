import { NavLink, useLocation } from 'react-router-dom'
import '../css/CatalogTerms.css'
import TopELement from '../element/TopElement'
import BorderBox from '../element/BorderBox'
import BorderRouter from '../element/BorderRouter'
import { useState } from 'react'
import axios from 'axios'
import appConfig from '../config/app'

function CatalogTerms(params) {
    const [catalogData, setCatalogData] = useState()
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const id = queryParams.get("id")
    const catalog = queryParams.get("catalog")

    if (catalogData == null) {
        axios.get(`${appConfig.serverAddress}/search/catalog?id=${id}`)
            .then(res => {
                console.log(res.data)
                setCatalogData(res.data)
            })
    }

    return (
        <div className='view'>
            <div className='App-header search-header'>
                <TopELement />
            </div>
            <BorderBox>
                <BorderRouter r1='学科 / 行业' r2={catalog} r1_link='/catalog' />
                <h1 className='catalog-title'>
                    {catalogData?.name}
                </h1>
                <p className='catalog-des'>
                    {catalogData?.des}
                </p>
                <table className='table-frame'>
                    <thead>
                        <tr>
                            <th className='table-head'>
                                术语
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            catalogData?.terms.map((val, i) => (
                                <tr key={"catalog_term_" + val.id}>
                                    <th className='table-item' style={{ borderBottom: i == catalogData.terms.length - 1 ? 'none' : '1px solid #ddd' }}>
                                        <NavLink to={`/search?id=${val.id}&name=${val.name}`}>
                                            {val.name}
                                        </NavLink>
                                    </th>
                                </tr>
                            ))
                        }


                        {/* <tr>
                            <th className='table-item table-item-below'>
                                <NavLink to={`/search?term=${'软件'}`}>
                                    软件
                                </NavLink>
                            </th>
                        </tr> */}
                    </tbody>
                </table>
            </BorderBox>
        </div >
    )
}

export default CatalogTerms