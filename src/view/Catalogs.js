import BorderBox from '../element/BorderBox';
import BorderRouter from '../element/BorderRouter';
import TopELement from '../element/TopElement'
import CatalogTerms from '../element/CatalogTerms'
import '../css/Catalogs.css'
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import appConfig from '../config/app.json'


function Calalogs(params) {
    const [catalogName, setCatalogName] = useState('')
    const [catalogs, setCatalogs] = useState([])

    const navigate = useNavigate();

    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    var cn = queryParams.get('name')
    if (cn != null) {
        if (cn != '' && cn != catalogName) {
            setCatalogName(cn)
        }
    }

    axios.get(`${appConfig.serverAddress}/search/catalogs`)
        .then(res => {
            console.log(res.data)
            const names = []
            for (let index = 0; index < res.data.length; index++) {
                const data = res.data[index];
                names.join(data.name)
            }
            setCatalogs(names)
        })

    function JumpIntoCatalog(n) {
        navigate(`/catalog?name=${n}`);
    }

    function RefreshView(n) {
        if (n != null && n != '') {
            return (
                <BorderBox>
                    <BorderRouter r1={n} />
                    <CatalogTerms />
                </BorderBox >
            )
        }

        return (
            <BorderBox>
                <BorderRouter r1='学科 / 行业' />
                <div className='catalog-list'>
                    {
                        catalogs.map((val, i) => (
                            <div className='catalog-item' onClick={() => JumpIntoCatalog('计算机')}>
                                {val}
                            </div>
                        ))
                    }

                    {/* <NavLink className='catalog-item'>
                        计算机
                    </NavLink>
                    <NavLink className='catalog-item catalog-item-row-last'>
                        计算机
                    </NavLink> */}
                </div>


            </BorderBox>
        )
    }

    return (
        <div className='view'>
            <div className='App-header search-header'>
                <TopELement />
            </div>
            {
                RefreshView(catalogName)
            }
        </div >
    )
}

export default Calalogs;