import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

const About = () => {

    const navigate = useNavigate();
    const [userData, setUserData] = useState([]);
    const [hostelName, setHostelName] = useState('');
    const [year, setYear] = useState('');

    const callGetData = async () => {
        try {
            const res = await fetch('/admin/getdata', {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                credentials: "include"
            });

            const data = await res.json();

            if (res.status === 200) {
                // Get the hostel name from the data
                const hostelName = data.hostelName;
                const year = data.year;
                setHostelName(hostelName);
                setYear(year);
            } else {
                const error = new Error(res.statusText);
                error.status = res.status;
                throw error;
            }
        } catch (error) {
            console.log(error);
            navigate("/admin/login");
        }
    }

    const callAboutPage = async () => {
        try {
            const res = await fetch(`/about?hostelName=${hostelName}&year=${year}`, {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                credentials: "include"
            });

            const data = await res.json();

            if (res.status === 200) {
                const userData = data;

                if (userData.length > 0) {
                    setUserData(userData);
                }
            } else {
                const error = new Error(res.statusText);
                error.status = res.status;
                throw error;
            }
            // console.log("from callaboutpage");
        } catch (error) {
            console.log(error);
            navigate("/admin/login");
        }
    }

    useEffect(() => {
        callGetData();
    }, []);

    useEffect(() => {
        if (hostelName !== '') {
            callAboutPage();
        }
    }, [hostelName]);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 25; // change this as needed
    const totalItems = userData.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    // calculate the index range for the current page
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage - 1, totalItems - 1);

    // create a new array of items to display based on the current page
    const displayedItems = userData.slice(startIndex, endIndex + 1);

    // handle page navigation
    const handlePageClick = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // generate page links
    const pageLinks = [];
    for (let i = 1; i <= totalPages; i++) {
        pageLinks.push(
            <li
                key={i}
                className={`page-item ${i === currentPage ? 'active' : ''}`}
                onClick={() => handlePageClick(i)}
            >
                <button className="page-link" href="#">
                    {i}
                </button>
            </li>
        );
    }

    return (
        <div className="container">
            <h1>About</h1>
            <p>
                <b>Hostel Name: {hostelName}</b>
            </p>
            <p>
                <b>Year: {year}</b>
            </p>
            <table className="table table-striped ">
                <thead>
                    <tr>
                        <th>S. No.</th>
                        <th>Room No.</th>
                        <th>Name</th>
                        <th>Roll No.</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                    </tr>
                </thead>
                <tbody>
                    {displayedItems.map((userData, index) => {
                        return (
                            <tr key={index}>
                                <td>{startIndex + index + 1}</td>
                                <td>{userData.roomNo}</td>
                                <td>{userData.name}</td>
                                <td>{userData.rollNo}</td>
                                <td>{userData.startDate}</td>
                                <td>{userData.endDate}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <nav aria-label="Page navigation example">
                <ul className="pagination justify-content-center">
                    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                        <button className="page-link" href="#" onClick={() => handlePageClick(currentPage - 1)}>
                            Previous
                        </button>
                    </li>
                    {pageLinks}
                    <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                        <button className="page-link" href="#" onClick={() => handlePageClick(currentPage + 1)}>
                            Next
                        </button>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default About;