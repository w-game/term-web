import { useNavigate } from 'react-router-dom';
import search_png from '../img/search.png';
import { useEffect, useState } from 'react';
import axios from 'axios';
import appConfig from '../config/app'

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
        const name = event.target.value
        setSearchName(name)
        setShowedName(name)
        if (name == null || name == '') {
            setMatchData([])
        } else {
            axios.get(`${appConfig.serverAddress}/search/match?name=${name}`)
                .then(res => {
                    setMatchData(res.data)
                })
        }
    }

    function HandleSearch(id, n) {
        if (n == null || n == '') {
            return
        }
        if (id == -1) {
            if (matchData != null && matchData.length != 0) {
                id = matchData[0].id
            }
        }
        navigate(`/search?id=${id}&name=${n}`);
        setMatchSwitch(false)
        setMatchData([])
    }

    function MatchItem(params) {
        const { id, matchName } = params
        return (
            <div className='Search-match-item' onClick={() => { HandleSearch(id, matchName) }}>
                <div className='Search-match-item-text'>
                    {matchName}
                </div>
            </div>
        )
    }

    return (
        <div className='Search-box'>
            <div className='Search-input-frame'>
                <input
                    value={showedName}
                    className='Search-input'
                    onChange={OnSearchInputValueChange}
                    onKeyDown={e => {
                        if (e.key === "Enter") {
                            HandleSearch(-1, searchName)
                        }
                    }}
                />
                <button className='Search-btn' onClick={() => { HandleSearch(-1, searchName) }}>
                    <img className='Search-btn-img' src={search_png} />
                </button>
            </div>
            <div className='Search-match'>
                {matchData.map((v, i) => (
                    <MatchItem key={i} id={v.id} matchName={v.name} />)
                )}
                <div className={!matchSwitch ? 'Close' : 'Search-match-item-more-btn'}>查看更多</div>
            </div>
        </div>
    )
}

export default SearchElement