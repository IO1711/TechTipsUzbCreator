import { Link, useNavigate } from "react-router-dom";


const SearchResults = ({results, handleResults}) => {
    const navigate = useNavigate();
    if(!results.length) return null;

    const handleResultClick = (appName, topicName) => {
        navigate(`/${appName}/${topicName}`);
        handleResults([]);
    }

    return <>
        <div className="search-results">
            {
                results.map((item, i) => (
                
                <div key={i} className="search-result-row" onClick={() => handleResultClick(item.appName, item.topicName)}>
                    {item.appName + " -> " + item.topicName}
                    
                    {/*<p>{item.topicName}</p>
                    <h6>{item.appName}</h6>*/}
                </div>
                
                ))
            }
        </div>
    </>
}

export default SearchResults;