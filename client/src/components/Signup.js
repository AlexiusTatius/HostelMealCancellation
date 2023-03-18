import React, { useState } from 'react';
import {useNavigate} from "react-router-dom";

const Signup = () => {
    const navigate = useNavigate();

    const [user, setUser] = useState({
        roomNo:"" , name:"" , rollNo:"" , phone:"" , password:"" , cpassword:"" , year:"" , hostelName:""
    });

    let name, value;

    const handleInputs = (e) => {
        console.log(e);
        name = e.target.name;
        value = e.target.value;

        setUser({ ...user, [name]: value })
    }

    const PostData = async (e) => {
        e.preventDefault();

        const { roomNo, name, rollNo, phone, password, cpassword, year, hostelName } = user;

        const res = await fetch('/register', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                roomNo, name, rollNo, phone, password, cpassword, year, hostelName
            })
        });

        const data = await res.json();
        console.log(data);

        if (res.status === 422 || !data) {
            window.alert("Invalid Registration"); 
            console.log("Invalid Registration");
        } else {
            window.alert(" Registration Successful"); 
            console.log("Successful Registration");
            navigate("/login");
        }
    }

        return (
            <>
                <div className="container">
                    <h1>Register</h1>
                    <form method='POST'>
                        <div className="form-group">
                            <label htmlFor="usr">Room No.</label>
                            <input type="text" name='roomNo' className="form-control" id="usr1" value={user.roomNo} onChange={handleInputs} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Name</label>
                            <input type="text" name='name' className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={user.name} onChange={handleInputs} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="usr">Roll No.</label>
                            <input type="Number" name='rollNo' className="form-control" id="usr3" value={user.rollNo} onChange={handleInputs} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="usr">Phone No.</label>
                            <input type="Number" name='phone' className="form-control" id="usr4" value={user.phone} onChange={handleInputs} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="usr">Year of Study</label>
                            <select type="Number" name='year' className="form-control" id="usr5" value={user.year} onChange={handleInputs} >
                            <option value="">Choose Your Year of Study</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="usr">Hostel Name</label>
                            <select type="text" name='hostelName' className="form-control" id="usr6" value={user.hostelName} onChange={handleInputs} >
                                <option value="">Choose Your Hostel</option>
                                <option value="MBH-A">MBH-A</option>
                                <option value="MBH-B">MBH-B</option>
                                <option value="MBH-F">MBH-F</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputPassword1">Password</label>
                            <input type="password" name='password' className="form-control" id="exampleInputPassword1" value={user.password} onChange={handleInputs} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputPassword1">Confirm Password</label>
                            <input type="password" name='cpassword' className="form-control" id="exampleInputPassword2" value={user.cpassword} onChange={handleInputs} />
                        </div>

                        <button type="submit" className="btn btn-primary" onClick={PostData}>Submit</button>
                    </form>
                </div>

            </>
        )
    }

    export default Signup;