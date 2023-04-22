import { NavLink } from 'react-router-dom'
import '../css/CatalogTerms.css'

function CatalogTerms(params) {
    return (
        <table className='table-frame'>
            <thead>
                <tr>
                    <th className='table-head'>
                        术语
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th className='table-item'>
                        <NavLink to={`/search?term=${'硬件'}`}>
                            硬件
                        </NavLink>
                    </th>
                </tr>

                <tr>
                    <th className='table-item table-item-below'>
                        <NavLink to={`/search?term=${'软件'}`}>
                            软件
                        </NavLink>
                    </th>
                </tr>
            </tbody>
        </table>
    )
}

export default CatalogTerms