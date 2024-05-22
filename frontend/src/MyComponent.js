import React, { useState, useEffect } from 'react';

const MyComponent = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        // Simulate fetching data
        const fetchData = async () => {
            const result = await fetch('/api/data'); // Adjust the API endpoint accordingly
            const json = await result.json();
            setData(json);
        };
        fetchData();
    }, []);

    return (
        <div>
            {Array.isArray(data) ? (
                data.map((item, index) => <div key={index}>{item}</div>)
            ) : (
                <div>No data available</div>
            )}
        </div>
    );
};

export default MyComponent;
