import '../css/BorderView.css'
import TopELement from '../element/TopElement'

function BorderView(params) {
    return (
        <div className="view">
            <div className='App-header search-header'>
                <TopELement />
            </div>
            <div className="border-view">
                {params.children}
            </div>
        </div>
    )
}

export default BorderView