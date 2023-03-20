import React, { useState } from 'react';
import {useNavigate} from "react-router-dom";

const AdminSignup = () => {
    const navigate = useNavigate();

    const [admin, setAdmin] = useState({
        username:"", password:"", cpassword:"", year:"", hostelName:""
    });

    let name, value;

    const handleInputs = (e) => {
        name = e.target.name;
        value = e.target.value;

        setAdmin({ ...admin, [name]: value })
    }

    const PostData = async (e) => {
        e.preventDefault();

        const { username, password, cpassword, year, hostelName } = admin;

        const res = await fetch('/admin/register', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username, password, cpassword, year, hostelName
            })
        });

        const data = await res.json();

        if (res.status === 422 || !data) {
            window.alert("Invalid Registration"); 
            console.log("Invalid Registration");
        } else {
            window.alert(" Registration Successful"); 
            console.log("Successful Registration");
            navigate("/admin/login");
        }
    }

        return (
            <>
                <div className="container">
                    <h1>Admin Register</h1>
                    <form method='POST'>
                        <div className="form-group">
                            <label htmlFor="usr">Username</label>
                            <input type="text" name='username' className="form-control" id="usr1" value={admin.username} onChange={handleInputs} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="usr">Hostel Name</label>
                            <select type="text" name='hostelName' className="form-control" id="usr2" value={admin.hostelName} onChange={handleInputs} >
                                <option value="MBH-A">MBH-A</option>
                                <option value="MBH-B">MBH-B</option>
                                <option value="MBH-F">MBH-F</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="usr">Year</label>
                            <input type="Number" name='year' className="form-control" id="usr3" value={admin.year} onChange={handleInputs} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputPassword1">Password</label>
                            <input type="password" name='password' className="form-control" id="exampleInputPassword1" value={admin.password} onChange={handleInputs} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputPassword1">Confirm Password</label>
                            <input type="password" name='cpassword' className="form-control" id="exampleInputPassword2" value={admin.cpassword} onChange={handleInputs} />
                        </div>

                        <button type="submit" className="btn btn-primary" onClick={PostData}>Submit</button>
                    </form>
                </div>

            </>
        )
    }

    export default AdminSignup;