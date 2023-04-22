import SearchElement from './SearchElement.js'
import '../css/TopElement.css'
import { NavLink } from 'react-router-dom'

function TopELement(params) {
    return (
        <div className='top-element'>
            <div className='top-element-logo'>
                <div className='top-element-logo-title'>
                    BaiZeTerms
                </div>
                <div className={'App-search'}>
                    <SearchElement />
                </div>

                <ul className='extra-links'>
                    <NavLink className='extra-links-item' to='/catalog'>
                        术语库
                    </NavLink>
                </ul>
            </div>
        </div>
    )
}

export default TopELement