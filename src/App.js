import { Grid } from '@giphy/react-components' // included for interface font :wink
import { GiphyFetch } from '@giphy/js-fetch-api'
import {useCallback, useEffect, useRef, useState} from "react";
import debounce from 'lodash.debounce';
import './App.css';
import GiphyList from "./GiphyList";

const gf = new GiphyFetch('<API_KEY>');

function App() {
    const [input, setInput] = useState('');
    const [currentSearch, setCurrentSearch] = useState('');
    const [searches, setSearches] = useState([]);
    const [giphys, setGiphys] = useState([]);
    const [offset, setOffset] = useState(0);

    const debounceSearch = debounce((search, newOffset) => {
        setOffset(newOffset);

        gf.search(search, { offset: newOffset, limit: 10 }).then((result) => {
            setGiphys([...giphys, ...result.data]);
        }).catch(e => console.log(e));
    }, 500);

    const onScroll = useCallback(() => {
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 15) {
            const newOffset = offset + 1;
            debounceSearch(currentSearch, newOffset);
        }
    }, [currentSearch, debounceSearch, offset]);

    useEffect(() => {
        window.addEventListener('scroll', onScroll);
        return () => {
            window.removeEventListener('scroll', onScroll);
        }
    }, [onScroll]);

    const listInnerRef = useRef();

    const handleSearchInputChange = (event) => {
        setInput(event.target.value);
    }

    const handleClick = async () => {
        setCurrentSearch(input);
        if (!searches.includes(input)) {
            setSearches([...searches, input]);
        }
        setOffset(0);
        const { data } = await gf.search(input, { offset: 0, limit: 10  });
        setGiphys(data);
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleClick();
        }
    }

    const handlePreviousSearch = async (previousSearch) => {
        setCurrentSearch(previousSearch);
        setOffset(0);
        const { data } = await gf.search(previousSearch, { offset: 0, limit: 10 });
        setGiphys(data);
    }

    return (
        <div>
            <div>
                <img className="giphyIcon" src="/icon.svg" />
                <h2 className="giphyTitle">GIPHY GRABBER</h2>
            </div>
            <div className="searchContainer">
                <input type="text"
                       placeholder="  Search..."
                       value={input}
                       onChange={handleSearchInputChange}
                       onKeyDown={handleKeyDown}
                />
                <div onClick={handleClick} className="searchButtonContainer">
                    <img src="/search.svg" />
                </div>
            </div>
            <div className="container">
                <label>Previous searches: </label>
                <span>
                    {
                        searches.map(search =>
                            <a key={search} onClick={() => handlePreviousSearch(search)}>{search}</a>
                        )
                    }
                </span>
            </div>
            <div className="container" ref={listInnerRef}>
                {giphys.length > 0 &&
                    <div>
                        <div className="container">Showing results for: {currentSearch}</div>
                        <GiphyList gifs={giphys}/>
                    </div>
                }
            </div>
        </div>
    );
}

export default App;
