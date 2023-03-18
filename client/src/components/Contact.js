import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

const Contact = () => {

    const navigate = useNavigate();

    const [user, setUser] = useState({
        rollNo: "", startDate: "", endDate: ""
    })

    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 1);

    const [minDate, setMinDate] = useState(currentDate.toISOString().split('T')[0]);

    const [duration, setDuration] = useState(0)

    const userContact = async () => {
        try {
            const res = await fetch('/getdata', {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            })

            const data = await res.json()
            setUser({ ...user, rollNo: data.rollNo });

            if (!res.status === 200) {
                const error = new Error(res.error)
                throw error
            }

        } catch (err) {
            console.log(err);
            navigate("/login");
        }
    }
    useEffect(() => {
        userContact();
    }, [setUser])

    let name, value;

    const handleInputs = (e) => {
        console.log(e);
        name = e.target.name;
        value = e.target.value;

        setUser({ ...user, [name]: value })
    }

    function convertMillisecondsToDays(milliseconds) {
        const days = Math.floor(milliseconds / 86400000);
        return days;
    }

    function calculateDuration() {
        const start = new Date(user.startDate);
        const end = new Date(user.endDate);
        const durationInMilliseconds = end.getTime() - start.getTime();
        const durationInDays = convertMillisecondsToDays(durationInMilliseconds) + 1;
        setDuration(durationInDays);
    }

    useEffect(() => {
        calculateDuration();
    }, [user]);

    const PostData = async (e) => {
        e.preventDefault();

        const { startDate, endDate } = user;

        if (window.confirm("Do you really want to submit?")) {

            const res = await fetch('/contact', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    startDate, endDate
                })
            });

            const data = await res.json();

            if (!data) {
                window.alert("Data not saved");
            } else {
                window.alert("Submitted Successfully🎉🎉🎉");
                setUser({ ...user, startDate: "", endDate: "" })
            }
        }

    }

    return (
        <>
            <div className="container">
                <form method='POST'>
                    <div className="form-group">
                        <label htmlFor="usr">Start Date</label>
                        <input type="date" name='startDate' className="form-control" id="usr1" value={user.startDate} onChange={handleInputs} min={minDate} />
                        <label htmlFor="usr">End Date</label>
                        <input type="date" name='endDate' className="form-control" id="usr2" value={user.endDate} onChange={handleInputs} min={minDate} />
                        <button type="submit" className="btn btn-primary my-4" onClick={PostData}>Submit</button>
                    </div>
                </form>
                <div className='container'>
                    <p>Duration: {duration} days</p>
                    <p>💰You Saved <b>₹{duration * 105}</b> today💰</p>
                    <h5 className='text-primary text-center my-5'>🙏Thank You for contributing to our mission towards preventing the wastage of food.🙏</h5>
                </div>
            </div>
        </>
    )
}

export default Contact