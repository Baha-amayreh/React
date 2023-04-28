import { useState, useEffect, useTransition } from "react";
import axios from "axios";
import './ListOfStudents.css'
import { useNavigate } from "react-router";
function ListOfStudents() {
    const [students, setStudents] = useState([]);
    const [studentsCopy, setStudentsCopy] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();
    const [isPending, startTransition] = useTransition();
    useEffect(() => {
        const authenticatedUser = localStorage.getItem('authenticatedAdmin');
        if (authenticatedUser) {
            axios.get('http://localhost:8080/students')
                .then(response => {
                    setStudents(response.data.filter(f => f.role !== 'A'));
                    setStudentsCopy(response.data.filter(f => f.role !== 'A'))
                })
                .catch(error => {
                    console.log(error);
                });
        } else {
            window.location.href = '/Login'
        }
    }, []);

    useEffect(() => {
        const fetchStudents = async () => {
            const authenticatedUser = localStorage.getItem('authenticatedAdmin');
            if (authenticatedUser) {
                try {
                    const response = await axios.get('http://localhost:8080/students');
                    setStudents(response.data.filter(f => f.role !== 'A'));
                    setStudentsCopy(response.data.filter(f => f.role !== 'A'));
                } catch (error) {
                    console.log(error);
                }
            } else {
                window.location.href = '/Login';
            }
        };

        fetchStudents();
    }, [navigate]);

    function delelteStudent(id) {
        const authenticatedUser = localStorage.getItem('authenticatedAdmin');
        if (authenticatedUser) {
            axios.delete('http://localhost:8080/students/' + id)
                .then(response => {
                    setStudents(students.filter(s => s.id !== id));
                })
                .catch(error => {
                    console.log(error);
                });
            //console.log('student has been deleted!' + 'id=' + id)
        } else {
            window.location.href = '/Login'
        }
    }

    function updateStudent(id) {
        const authenticatedUser = localStorage.getItem('authenticatedAdmin');
        if (authenticatedUser) {
            navigate('/UpdateStudent/' + id);
            //console.log('student has been selected!' + id);
        } else {
            window.location.href = '/Login'
        }
    }
    function selectStudent(id) {
        const authenticatedUser = localStorage.getItem('authenticatedAdmin');
        if (authenticatedUser) {
            navigate('/StudentDetails/' + id);
            // console.log('student has been selected!' + id);
        } else {
            window.location.href = '/Login'
        }
    }
    const handleSearchChange = event => {
        const query = event.target.value;
        setSearchQuery(query);
        startTransition(() => {
            filter1();
            if (searchQuery.length <= 1) {
                filter2();
            }
        })
    };

    function filter1() {
        const filteredStudents = students
            .filter(s => s.firstName.toLowerCase()
                .includes(searchQuery.toLowerCase()) || s.lastName.toLowerCase()
                    .includes(searchQuery.toLowerCase()) || s.gender.toLowerCase()
                        .includes(searchQuery.toLowerCase()) || s.email.toLowerCase()
                            .includes(searchQuery.toLowerCase()) || s.dateOfBirth
                                .includes(searchQuery.toLowerCase()));
        if (filteredStudents.length > 0) {
            setStudents(filteredStudents);
        }
    }
    function filter2() {
        setStudents(studentsCopy);
    }
    return (
        <>

            <h3>List of Students</h3>
            <table className="table table-striped  
            table table-sm 
            table table-hover 
            table-bordered 
            table-condensed
            table w-auto
            "  style={{ borderColor: "black" }}>
                <thead >
                    <tr>
                        <td colSpan='9'>
                            <input type='text' placeholder="Serach by student data:"
                                className="form-control-lg" value={searchQuery} onChange={handleSearchChange}
                            />
                            <button type="button" className="btn btn-success" onClick={() => filter1()}>filter</button> &nbsp;
                            <button type="button" className="btn btn-success" onClick={() => filter2()}>clear</button>
                        </td>

                    </tr>
                    <tr>
                        <th>ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Gneder</th>
                        <th>Email</th>
                        <th>DOB</th>
                        <th>Details</th>
                        <th>Update</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody >

                    {students.map((s, index) => (
                        <tr key={index}>
                            <td>{s.id}</td>
                            <td>{s.firstName}</td>
                            <td>{s.lastName}</td>
                            <td>{s.gender}</td>
                            <td>{s.email}</td>
                            <td>{s.dateOfBirth}</td>
                            <td>
                                {/* <button onClick={() => selectStudent(s.id)}>details</button> */}
                                <button type="button" className="btn btn-primary" onClick={() => selectStudent(s.id)}>details</button>
                            </td>
                            <td>
                                <button type="button" className="btn btn-success" onClick={() => updateStudent(s.id)}>update</button>
                                {/* <button onClick={() => updateStudent(s.id)}>update</button> */}
                            </td>
                            <td>
                                {/* <button onClick={() => delelteStudent(s.id)}>Delete</button> */}
                                <button type="button" onClick={() => delelteStudent(s.id)} className="btn btn-danger">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
                <tfoot>
                </tfoot>
            </table>
        </>
    )

}
export default ListOfStudents;