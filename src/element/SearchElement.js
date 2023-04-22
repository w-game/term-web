import { useNavigate } from 'react-router-dom';
import search_png from '../img/search.png';
import { useEffect, useState } from 'react';

function SearchElement(params) {
    const [searchName, setSearchName] = useState('');
    const [matchData, setMatchData] = useState([]);
    const [matchSwitch, setMatchSwitch] = useState(false)
    const [showedName, setShowedName] = useState(searchName)
    const [isInited, setIsInited] = useState(false)
    const navigate = useNavigate();

    if (isInited == false) {
        Init()
    }

    useEffect(() => {
        if (searchName == '') {
            setMatchData([])
            setMatchSwitch(false)
        } else {
            setMatchData(['4', '5', '6', '8'])
            setMatchSwitch(true)
        }
    }, [searchName])

    function Init() {
        if (params.searchName && params.searchName != '') {
            setShowedName(params.searchName)
        }
        setIsInited(true)
    }

    function OnSearchInputValueChange(event) {
        setSearchName(event.target.value)
        setShowedName(event.target.value)
    }

    function HandleSearch(n) {
        if (n == null || n == '') {
            return
        }
        navigate(`/search?term=${n}`);
        setMatchSwitch(false)
        setMatchData([])
    }

    function MatchItem(params) {
        const { matchName } = params
        return (
            <div className='Search-match-item' onClick={() => { HandleSearch(matchName) }}>
                <div className='Search-match-item-text'>
                    {matchName}
                </div>
            </div>
        )
    }

    return (
        <div className='Search-box'>
            <div className='Search-input-frame'>
                <input value={showedName} className='Search-input' onChange={OnSearchInputValueChange} />
                <button className='Search-btn' onClick={() => { HandleSearch(searchName) }}>
                    <img className='Search-btn-img' src={search_png} />
                </button>
            </div>
            <div className='Search-match'>
                {matchData.map((v, i) => (
                    <MatchItem key={i} matchName={v} />)
                )}
                <div className={!matchSwitch ? 'Close' : 'Search-match-item-more-btn'}>查看更多</div>
            </div>
        </div>
    )
}

export default SearchElement