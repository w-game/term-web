import BorderBox from '../element/BorderBox';
import BorderRouter from '../element/BorderRouter';
import TopELement from '../element/TopElement'
import '../css/Catalogs.css'
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { get } from '../func/request'


function Calalogs(params) {
    const [fields, setFields] = useState(null)

    const navigate = useNavigate();

    // const location = useLocation()
    // const queryParams = new URLSearchParams(location.search)

    if (fields == null) {
        get("fields", res => {
            console.log(res.data)
            setFields(res.data)
        })
    }

    return (
        <div className='view field-view'>
            <div className='App-header search-header'>
                <TopELement />
            </div>

            <div className='field-box'>
                <BorderBox>
                    <BorderRouter r1='领域 / 学科 / 行业' />
                    <div className='catalog-list'>
                        {
                            fields?.map((val, i) => (
                                <div key={`filed_${val.id}`}>
                                    <div className='field-title'>
                                        <div className='field-logo'></div>
                                        <p>{val.name}</p>
                                    </div>
                                    <div className='field-sublist'>
                                        {
                                            val.subfields.map((val, i) => (
                                                <NavLink
                                                    key={"catalog_" + i}
                                                    className='catalog-item'
                                                    to={`/terms?id=${val.id}&field=${val.name}`}>
                                                    {val.name}
                                                </NavLink>
                                            ))
                                        }
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </BorderBox>
            </div>
        </div >
    )
}

export default Calalogs;