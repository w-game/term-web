import { useLoaderData, useLocation } from 'react-router-dom'
import './css/Search.css'
import SearchElement from './SearchElement';
import termData from './test/json/term.json'

// export function loader({ params }) {
//     var term_name = params.term_name
//     return { term_name }
// }

function getPageWidth() {
    return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
}

function WindowResizeListener() {
    // var width = getPageWidth();
    // // 在此处执行你希望在不同宽度下执行的操作
    // if (width < 660) {
    //     // 执行移动端布局操作
    // } else if (width < 1024) {
    //     // 执行平板布局操作
    // } else {
    //     // 执行桌面布局操作
    // }

    var e = document.getElementById("dict");
    e.classList.add("newWidth");
}

export function Search() {
    // const { term_name } = useLoaderData();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const term = queryParams.get('term');

    window.addEventListener('resize', WindowResizeListener);

    const testTerm = termData.matchs[0]
    return (
        <div className='search-view'>
            <div className='App-header search-header'>
                <div className='App-top-element'>
                    <div className='App-top-element-logo'>
                        <div className='App-top-element-logo-title'>
                            BaiZeTerms
                        </div>
                        <div className='App-search'>
                            <SearchElement />
                        </div>
                    </div>
                </div>
            </div>
            <div className='border-box'>
                <div className='dict-catalog'>
                    <div className='dict-catalog-list'>
                        <div className='dict-catalog-item'>Home</div>
                        <div className='dict-catalog-item'>/ Computer Terms</div>
                        <div className='dict-catalog-item'>/ Font-end</div>
                    </div>
                </div>
                <h1 className='Search-content-dict-title'>
                    {testTerm.name}
                </h1>
                <ul>
                    {
                        testTerm.data.normal.map((val, i) => {
                            if (val.name != null) {
                                return (
                                    <li key={'term_' + i} className='Search-content-dict-item'>
                                        <div className='Search-content-dict-item-title'>
                                            <div className='Search-content-dict-item-language-type'>
                                                {val.type}
                                            </div>
                                            <p className='Search-content-dict-item-name'>
                                                {val.name}
                                            </p>
                                        </div>
                                        <p className='Search-content-dict-item-des'>
                                            {val.des}
                                        </p>
                                    </li>
                                )
                            } else {
                                return (
                                    <li key={'term_' + i} className='Search-content-dict-item'>
                                        <div className='Search-content-dict-item-title'>
                                            <div className='Search-content-dict-item-language-type'>
                                                {val.type}
                                            </div>
                                            <p className='Search-content-dict-item-name'>
                                                暂无资料
                                            </p>
                                        </div>
                                    </li>
                                )
                            }
                        })
                    }
                </ul>

                <div className='search-content-dict-info'>
                    <div className='search-content-dict-info-content'>
                        <div className='search-content-dict-info-content-more'>
                            <div className='Search-content-dict-add-language'>
                                <p>添加语言</p>
                            </div>
                        </div>
                        <div className='search-content-dict-info-content-author'>
                            <p className='search-content-dict-info-content-author-text'>由官方编辑</p>
                            <p className='search-content-dict-info-content-author-time'>2023.04.22</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className='border-box'>
                <div className='border-box-title'>
                    <div className='term-similar'>
                        <h2>近似术语</h2>
                    </div>
                </div>
                <div className='term-similar-content'>
                    <p className='term-similar-item'>
                        后端
                    </p>

                    <p className='term-similar-item'>
                        React
                    </p>
                    <p className='term-similar-item'>
                        React
                    </p>
                    <p className='term-similar-item'>
                        React
                    </p>
                    <p className='term-similar-item'>
                        React
                    </p>
                    <p className='term-similar-item'>
                        React
                    </p>
                    <p className='term-similar-item'>
                        React
                    </p>
                    <p className='term-similar-item'>
                        React
                    </p>
                    <p className='term-similar-item'>
                        React
                    </p>
                    <p className='term-similar-item'>
                        React
                    </p>
                    <p className='term-similar-item'>
                        React
                    </p>
                    <p className='term-similar-item'>
                        React
                    </p>
                    <p className='term-similar-item'>
                        React
                    </p>
                    <p className='term-similar-item'>
                        React
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Search