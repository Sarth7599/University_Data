import React, { useEffect, useState } from 'react';
import './CollegeTable.css';

const CollegeTable = () => {
    const [collegeDetails, setCollegeDetails] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [error, setError] = useState(null);

    useEffect(() => {
        const apiUrl = 'http://universities.hipolabs.com/search?country=India';

        const fetchCollegeDetails = async () => {
            try {
                const response = await fetch(apiUrl);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setCollegeDetails(data);
            } catch (error) {
                console.error('Error fetching college details:', error);
                setError(error.message);
            }
        };

        fetchCollegeDetails();
    }, []);

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredColleges = collegeDetails.filter(college =>
        Object.values(college).some(value =>
            value && value.toString().toLowerCase().includes(searchTerm.toLowerCase())
        )
    );
    

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (collegeDetails.length === 0) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <input
                type="text"
                placeholder="Search across all columns"
                value={searchTerm}
                onChange={handleSearch}
            />
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Country</th>
                        <th>State/Province</th>
                        <th>Domains</th>
                        <th>Web Pages</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredColleges.map((college, index) => (
                        <tr key={index}>
                            <td>{college.name}</td>
                            <td>{college.country}</td>
                            <td>{college['state-province']}</td>
                            <td>{college.domains.join(", ")}</td>
                            <td>
                                {college.web_pages.map((page, pageIndex) => (
                                    <a key={pageIndex} href={page} target="_blank" rel="noopener noreferrer">
                                        {page}
                                    </a>
                                ))}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CollegeTable;
