import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
function UpdateStudent() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [studentData, setStudentData] = useState({
        firstName: '', lastName: '',
        dateOfBirth: '', phone: '', favColor: '#FF0000', courseLevel: '10',
        educationLevel: 'high school', hobbies: 'basketball', gender: '',
        luckyNumber: 0, about: '', email: ''
    });
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

    }, []);


    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setStudentData(prevState => ({
            ...prevState,
            [name]: value
        }));
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('http://localhost:8080/students', studentData)
            .then(response => {
                // console.log(response)
            })
            .catch(error => {
                console.log(error)
            })
        navigate('/ListOfStudents');
    }
    return (
        <>
            <form onSubmit={handleSubmit}>
                <table className="table table-striped  
            table table-sm 
            table table-hover 
            table-bordered 
            table-condensed
            table w-auto
            " >
                    <thead>
                        <tr>
                            <th colSpan='2' className="text-center">Update Student page</th>

                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className='c1'>First Name</td>
                            <td> <input placeholder="First Name" type="text" maxLength='15' required="required"
                                name='firstName' value={studentData.firstName} onChange={handleInputChange}
                                className="form-control"
                            /></td>
                        </tr>
                        <tr>
                            <td className='c1'>Last Name</td>
                            <td > <input placeholder="Last Name" id='lastName' type="text" maxLength='15' required="required"
                                name='lastName' value={studentData.lastName} onChange={handleInputChange}
                                className="form-control"
                            /></td>
                        </tr>
                        <tr>
                            <td className='c1'>Date of Birth</td>
                            <td><input type="date" id="dateOfBirth" min="1900-01-01" max='2024-01-01'
                                name='dateOfBirth' value={studentData.dateOfBirth} onChange={handleInputChange}
                                className="form-control"
                            /></td>
                        </tr>
                        <tr>
                            <td className='c1'>Email</td>
                            <td><input type='email' id="email"
                                name='email' value={studentData.email} onChange={handleInputChange}
                                className="form-control"
                            /></td>
                        </tr>

                        <tr>
                            <td className='c1'>phone#</td>
                            <td><input type="tel" id="phone" placeholder="123-45-678" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" required
                                name='phone' value={studentData.phone} onChange={handleInputChange}
                                className="form-control"
                            /></td>
                        </tr>
                        <tr>
                            <td className='c1'>Favorite color</td>
                            <td><input type="color" id="favColor" name="favColor"
                                value={studentData.favColor} onChange={handleInputChange}
                                className="form-control"
                            /></td>
                        </tr>
                        <tr>
                            <td className='c1'>Course satisfaction</td>
                            <td><input type='range' id='courseLevel'
                                name='courseLevel' min='0' max='50'
                                value={studentData.courseLevel}
                                onChange={handleInputChange}
                                className="form-control" /></td>
                        </tr>
                        <tr>
                            <td className='c1' >Education degree</td>
                            <td>
                                <select name='educationLevel'
                                    value={studentData.educationLevel} onChange={handleInputChange}
                                    className="form-control"
                                >
                                    <option value='high school'>high school</option>
                                    <option value='collage'>collage</option>
                                    <option value='bachelor'>bachelor</option>
                                    <option value='master'>master</option>
                                    <option value='doctor'>doctor</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td className='c1'>Hobbies</td>
                            <td>
                                <select id='hobbies' name='hobbies'
                                    value={studentData.hobbies}
                                    onChange={handleInputChange}
                                    className="form-control"
                                >
                                    <option value='basketball'>Basketball</option>
                                    <option value='motorcycle'>Motorcycle riding</option>
                                    <option value='pool-billiards'>Pool billiards</option>
                                    <option value='reading'>Reading</option>
                                    <option value='traveling'>Traveling</option>
                                </select></td>
                        </tr>
                        <tr>
                            <td className='c1'>Gender</td>
                            <td>
                                <p>Please select your gender:
                                    <br />
                                    <input type="radio" name="gender" value='male' onChange={handleInputChange} /> Male
                                    <input type="radio" name="gender" value='female' onChange={handleInputChange} />Female
                                </p>
                            </td>
                        </tr>
                        <tr>
                            <td className='c1'>Lucky number</td>
                            <td>
                                <input type='number' id='luckyNumber' name='luckyNumber' step="1"
                                    value={studentData.luckyNumber} onChange={handleInputChange}
                                    className="form-control" />
                            </td>
                        </tr>
                        <tr>
                            <td className='c1'>About</td>
                            <td>
                                <textarea id="about" name="about" rows="4" cols="50"
                                    value={studentData.about} onChange={handleInputChange}
                                    className="form-control"
                                ></textarea>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan='2' className="text-center">
                                <input type='submit' value='Submit'
                                    className="btn btn-success" />
                                <button type="button" className="btn btn-primary" onClick={() => { navigate('/ListOfStudents') }}>Back</button>
                            </td>
                        </tr>
                    </tbody>
                    <tfoot>
                    </tfoot>
                </table>
            </form>
        </>
    )
}
export default UpdateStudent;