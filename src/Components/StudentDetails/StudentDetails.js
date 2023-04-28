import { useEffect, useState, useReducer } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Avatar from "react-avatar";
import { useRouteLoaderData } from 'react-router-dom';
function StudentDetails() {
    const { id } = useParams('null');
    const navigate = useNavigate();
    const [studentData, setStudentData] = useState({
        firstName: '', lastName: '',
        dateOfBirth: '', phone: '', favColor: '#FF0000', courseLevel: '10',
        educationLevel: 'high school', hobbies: 'basketball', gender: '',
        luckyNumber: 0, about: '', email: '', stdImage: ''
    });

    // const UserDetailPage = () => {
    //     const { user, loading, error } = useRouteLoaderData((params) => {
    //     });
    // }
    const [fSize, dispatch] = useReducer(reducer, 10);
    function reducer(state, action) {
        switch (action.type) {
            case 'increment':
                return state + 1;
            case 'decrement':
                return state - 1;
            default:
                throw new Error();
        }
    }
    useEffect(() => {
        const authenticatedUser = localStorage.getItem('authenticatedAdmin');
        if (authenticatedUser) {
            axios.get('http://localhost:8080/students/' + id)
                .then(response => {
                    setStudentData(response.data);
                })
                .catch(error => {
                    console.log(error);
                });
        } else {
            window.location.href = '/Login'
        }
    }, [id]);
    function mainPage() {
        navigate('/ListOfStudents')
    }
    const handlePrint = () => {
        window.print();
    };

    return (
        <>
            <table className="table table-striped  
            table table-sm 
            table table-hover 
            table-bordered 
            table-condensed
            table w-auto
            " >
                <thead>
                    <tr>
                        <th className="text-center">
                            <button className="btn btn-lg btn-outline-primary d-print-none" onClick={handlePrint}>Print Page</button>

                        </th>
                        <th>
                            <button className="btn btn-lg btn-outline-primary d-print-none" onClick={() => dispatch({ type: 'increment' })}>+</button>
                            <button className="btn btn-lg btn-outline-primary d-print-none" onClick={() => dispatch({ type: 'decrement' })}>-</button>
                            <button className="btn  btn-outline-primary d-print-none" >{fSize}px</button>
                        </th>

                    </tr>
                </thead>
                <tbody style={{ fontSize: fSize + 'px' }}>
                    <tr>
                        <td className='c1'>First Name</td>
                        <td>
                            <label className="form-label">{studentData.firstName}</label>
                        </td>
                    </tr>
                    <tr>
                        <td className='c1'>Last Name</td>
                        <td >
                            <label className="form-label">{studentData.lastName}</label>
                        </td>
                    </tr>
                    <tr>
                        <td className='c1'>Date of Birth</td>
                        <td><label>{studentData.dateOfBirth}</label></td>
                    </tr>
                    <tr>
                        <td className='c1'>Email</td>
                        <td><label>{studentData.email}</label></td>
                    </tr>
                    <tr>
                        <td className='c1'>phone#</td>
                        <td><label>{studentData.phone}</label></td>
                    </tr>
                    <tr>
                        <td className='c1'>Favorite color</td>
                        <td><input type="color" id="favColor" name="favColor"
                            value={studentData.favColor} readOnly />
                        </td>
                    </tr>
                    <tr>
                        <td className='c1'>Course satisfaction</td>
                        <td><label>{studentData.courseLevel}</label></td>
                    </tr>
                    <tr>
                        <td className='c1'>Education degree</td>
                        <td>
                            <label>{studentData.educationLevel}</label>
                        </td>
                    </tr>
                    <tr>
                        <td className='c1'>Hobbies</td>
                        <td>
                            <label>{studentData.hobbies}</label>
                        </td>
                    </tr>
                    <tr>
                        <td className='c1'>Gender</td>
                        <td>
                            <label>{studentData.gender}</label>
                        </td>
                    </tr>
                    <tr>
                        <td className='c1'>Lucky number</td>
                        <td>
                            <label>{studentData.luckyNumber}</label>
                        </td>
                    </tr>
                    <tr>
                        <td className='c1'>About</td>
                        <td>
                            <textarea id="about" name="about" rows="4" cols="50"
                                value={studentData.about} readOnly ></textarea>
                        </td>
                    </tr>
                    <tr>
                        <td>image</td>
                        <td>
                            <Avatar src={studentData.stdImage} />
                        </td>
                    </tr>
                    <tr>
                        <td colSpan='2' className="text-center">
                            <button type="button" className="btn btn-primary" onClick={mainPage}>Back</button>
                        </td>
                    </tr>
                </tbody>
                <tfoot>
                </tfoot>
            </table>
        </>
    )
}
export default StudentDetails;