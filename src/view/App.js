import '../css/App.css';
import SearchElement from '../element/SearchElement.js'
import { useState } from 'react';
import TopELement from '../element/TopElement';

function App() {
  const [isAtTop, setIsAtTop] = useState(true);
  const [isOverSearch, setIsOverSearch] = useState(true);
  const handleScroll = () => {
    setIsOverSearch(window.scrollY < 256)
    setIsAtTop(window.scrollY == 0)
  }

  window.addEventListener('scroll', handleScroll);

  return (
    <div className="App">
      <header className={isAtTop ? 'App-header' : 'App-header App-header-non-top'}>
        <TopELement showSearchBox={!isOverSearch} />
      </header>
      <div className='App-content'>
        <div className='App-content-search-box'>
          <div className='App-content-title'>
            白泽词典
          </div>
          <div className='App-content-des'>
            无所不知、无所不晓的专业术语词典
          </div>
          <div className='App-content-search'>
            <SearchElement />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App;
