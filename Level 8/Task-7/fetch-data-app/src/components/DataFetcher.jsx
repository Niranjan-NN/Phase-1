import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "../styles/App.css";

// Custom Axios Hook with Caching
const cache = new Map();

const useAxios = (url, config = {}) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = async (forceRefresh = false) => {
        if (!forceRefresh && cache.has(url)) {
            setData(cache.get(url));
            setLoading(false);
            return;
        }

        const source = axios.CancelToken.source();

        try {
            const response = await axios.get(url, {
                ...config,
                cancelToken: source.token
            });
            cache.set(url, response.data);
            setData(response.data);
        } catch (error) {
            if (axios.isCancel(error)) {
                console.log('Request cancelled:', error.message);
            } else {
                setError('Failed to fetch data. Please try again.');
            }
        } finally {
            setLoading(false);
        }

        return () => {
            source.cancel('Component unmounted: Request cancelled to prevent memory leak.');
        };
    };

    useEffect(() => {
        fetchData();
    }, [url, config]);

    return { data, loading, error, refresh: () => fetchData(true) };
};

const DataFetcher = () => {
    const { data, loading, error, refresh } = useAxios('https://jsonplaceholder.typicode.com/posts');

    if (loading) return <div className="loader">Loading...</div>;
    if (error) return <div className="error">{error}</div>;

    return (
        <div className="app-container">
            <h1 className="title">Custom Axios Hook with Caching Demo</h1>
            <button className="btn" onClick={refresh}>Refresh Data</button>
            <ul className="data-list">
                {data.slice(0, 5).map(post => (
                    <li key={post.id} className="list-item">{post.title}</li>
                ))}
            </ul>
        </div>
    );
};

export default DataFetcher;
