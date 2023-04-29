import SearchElement from './SearchElement.js'
import '../css/TopElement.css'
import { NavLink } from 'react-router-dom'

function TopELement(params) {
    var showSearchBox = params.showSearchBox;
    if (showSearchBox == null) {
        showSearchBox = true
    }
    return (
        <div className='top-element'>
            <div className='top-element-logo'>
                <NavLink className='top-element-logo-title' to='/'>
                    BizerTerms
                </NavLink>
                <div className='top-element-search' style={{ display: showSearchBox ? 'block' : 'none' }}>
                    <SearchElement placeholder='搜索专业术语...' />
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