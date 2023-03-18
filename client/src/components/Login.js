import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();
    
    const [rollNo, setRollNo] = useState('')
    const [password, setPassword] = useState('')

    const loginUser = async (e) => {
        e.preventDefault()

        const res = await fetch('/signin', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                rollNo, password
            })
        })

        const data = await res.json();

        if (data.status === 400 || !data || res.status === 400) {
            window.alert("Invalid Credentials"); 
            console.log("Invalid Credentials");
        } else {
            window.alert("Login Successful"); 
            console.log("Login Successful");
            navigate("/contact");
        }
    }

    return (
        <>
            <div className="container">
                <h1>Login</h1>
            <form method='POST'>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Roll No.</label>
                    <input type="Number" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" 
                    value={rollNo} onChange = { (e) => {setRollNo(e.target.value)}}/>
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1"
                    value={password} onChange = { (e) => {setPassword(e.target.value)}}/>
                </div>
                
                <button type="submit" className="btn btn-primary" onClick={loginUser}>Login</button>
            </form>
            </div>
        </>
    )
}

export default Login;