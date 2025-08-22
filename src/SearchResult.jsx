import { Link } from "react-router-dom";


const SearchResults = ({results}) => {
    if(!results.length) return null;
    console.log("Search results: " + results);

    return <>
        <div className="search-results">
            {
                results.map((item, i) => (
                <Link key={i} to={`/${item.appName}/${item.topicName}`}>
                <div key={i} className="search-result-row">
                    {item.appName + " -> " + item.topicName}
                </div>
                </Link>
                ))
            }
        </div>
    </>
}

export default SearchResults;