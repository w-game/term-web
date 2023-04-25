import BorderBox from '../element/BorderBox';
import BorderRouter from '../element/BorderRouter';
import TopELement from '../element/TopElement'
import CatalogTerms from './CatalogTerms'
import '../css/Catalogs.css'
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import appConfig from '../config/app.json'


function Calalogs(params) {
    const [catalogs, setCatalogs] = useState(null)

    const navigate = useNavigate();

    // const location = useLocation()
    // const queryParams = new URLSearchParams(location.search)

    if (catalogs == null) {
        axios.get(`${appConfig.serverAddress}/search/catalogs`)
            .then(res => {
                console.log(res.data)
                const names = []
                for (let index = 0; index < res.data.length; index++) {
                    const data = res.data[index];
                    names.push(data)
                }
                setCatalogs(names)
            })
    }

    return (
        <div className='view'>
            <div className='App-header search-header'>
                <TopELement />
            </div>

            <BorderBox>
                <BorderRouter r1='学科 / 行业' />
                <div className='catalog-list'>
                    {
                        catalogs?.map((val, i) => (
                            <NavLink
                                key={"catalog_" + i}
                                className='catalog-item'
                                to={`/terms?id=${val.id}&catalog=${val.name}`}>
                                {val.name}
                            </NavLink>
                        ))
                    }
                </div>
            </BorderBox>
        </div >
    )
}

export default Calalogs;