import './App.css';
import SearchElement from './SearchElement.js'
import { useState } from 'react';

// import React, { Component } from 'react';

function App() {
  const [isAtTop, setIsAtTop] = useState(true);
  const [isOverSearch, setIsOverSearch] = useState(true);
  const handleScroll = () => {
    setIsOverSearch(window.scrollY < 256)
    setIsAtTop(window.scrollY == 0)
    // console.debug(window.scrollY)
    // console.debug(window.scrollY == 0)
  }

  window.addEventListener('scroll', handleScroll);
  return (
    <div className="App">
      <header className={isAtTop ? 'App-header' : 'App-header App-header-non-top'}>
        <div className='App-top-element'>
          <div className='App-top-element-logo'>
            <div className='App-top-element-logo-title'>
              BaiZeTerms
            </div>
            <div className={isOverSearch ? 'Close' : 'App-search'}>
              <SearchElement />
            </div>
          </div>
        </div>
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

// export class App extends Component {
//   state = {

//   }

//   constructor(props) {
//     super(props);

//     // 绑定方法中的this
//     this.onSearchInputValueChange = this.onSearchInputValueChange.bind(this);
//     this.onSearchBtnClick = this.onSearchBtnClick.bind(this);

//     this.state = {
//       searchName: ''
//     };
//   }

//   onSearchInputValueChange(event) {
//     this.setState({ searchName: event.target.value })
//   }

//   onSearchBtnClick() {
//     // const navigate = useNavigate();
//     // navigate(`/search${this.state.searchName}`);
//     // this.props.history.push(`/search${this.state.searchName}`);
//     Navigate(`/search${this.state.searchName}`)
//   }

//   render() {

//   }
// }

export default App;
