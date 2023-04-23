import { NavLink } from 'react-router-dom';
import '../css/BorderRouter.css'

function CalcRouter(params) {
    if (params.r1 != null && params.r1 != '') {
        if (params.r2 != null && params.r2 != '') {
            return (
                <div className='router-list'>
                    <NavLink className='router-link' to='/'>主页</NavLink>
                    <p className='router-spilt'>➜</p>
                    <NavLink className='router-link'>{params.r1}</NavLink>
                    <p className='router-spilt'>➜</p>
                    <p className='router-item'>{params.r2}</p>
                </div>
            )
        } else {
            return (
                <div className='router-list'>
                    <NavLink className='router-link' to='/'>主页</NavLink>
                    <p className='router-spilt'>➜</p>
                    <p className='router-item'>{params.r1}</p>
                </div>
            )
        }
    }
    return null
}

function BorderRouter(params) {
    return (
        <div className='router'>
            {
                CalcRouter(params)
            }
        </div >
    )
}

export default BorderRouter;