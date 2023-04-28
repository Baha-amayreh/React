import { useState } from "react";
import axios from "axios";
function Login() {
    const [loginData, setLoginData] = useState({ stdId: 0, password: '' });
    let [msg, setMsg] = useState(null);
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setLoginData(prevState => ({
            ...prevState,
            [name]: value
        }));
    }
    function login() {
        if (loginData.password.length > 0 && loginData.stdId.length > 0) {
            axios.get('http://localhost:8080/students/' + loginData.stdId)
                .then(response => {
                    if (response.data !== null) {
                        if (response.data.password === loginData.password && response.data.role === 'A') {
                            setMsg(msg = '');
                            localStorage.setItem('authenticatedAdmin', true);
                            window.location.href = '/ListOfStudents'
                        } else if (response.data.password === loginData.password && response.data.role === 'S') {
                            setMsg(msg = '');
                            localStorage.setItem('authenticatedStudent', loginData.stdId);
                            window.location.href = '/Student'

                        } else {
                            setMsg(msg = 'wrong user ID or password!, try again');
                        }
                    } else {
                        setMsg(msg = 'wrong user ID or password!, try again');
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        } else {
            setMsg(msg = 'Please enter the user ID and password');
        }

    }
    return (
        <>
            <table className=" 
            table table-sm 
            table table-hover 
            table-bordered 
            table-condensed
            table w-auto
            border-dark
            ">
                <thead>
                    <tr>
                        <th colSpan='2' className="text-center">Login Page</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className='c1'>ID</td>
                        <td>
                            <input type='text'
                                name='stdId'
                                onChange={handleInputChange}
                                className="form-control"
                            ></input>
                        </td>
                    </tr>
                    <tr>
                        <td className='c1'>Password</td>
                        <td><input type='password'
                            name='password'
                            onChange={handleInputChange}
                            className="form-control"
                        ></input></td>
                    </tr>
                    <tr >
                        <td colSpan='2' className="text-center"> <button  className='btn btn-primary btn-lg btn-block' onClick={login}>login</button>
                        </td>
                    </tr>
                    <tr >
                        <td colSpan='2' className="text-center"> <label>{msg}</label></td>
                    </tr>
                </tbody>
                <tfoot>
                </tfoot>
            </table>
        </>
    )
}
export default Login;