import React, { Component } from "react";
import axios from "axios";
class Student extends Component {
    constructor(props) {
        super(props);
        this.state = {
            studentData: {
                firstName: "",
                lastName: "",
                dateOfBirth: "",
                phone: "",
                favColor: "#FF0000",
                courseLevel: "10",
                educationLevel: "high school",
                hobbies: "basketball",
                gender: "",
                luckyNumber: 0,
                about: "",
                email: "",
                stdImage: "",
            },
        };

    }
    componentDidMount() {
        const authenticatedUser = localStorage.getItem("authenticatedStudent");
        if (authenticatedUser > 0) {
            axios
                .get("http://localhost:8080/students/" + authenticatedUser)
                .then((response) => {
                    this.setState({ studentData: response.data });
                })
                .catch((error) => {
                    console.log(error);
                });
        } else {
            window.location.href = "/Login";
        }
    }

    handlePrint = () => {
        window.print();
    };

    handleLogOut = () => {
        localStorage.removeItem("authenticatedStudent");
        window.location.href = "/Login";
    };

    render() {
        const { studentData } = this.state;
        return (
            <>
                <table
                    className="table table-striped  
            table table-sm 
            table table-hover 
            table-bordered 
            table-condensed
            table w-auto
            "
                >
                    <thead>
                        <tr>
                            <th className="text-center" colSpan="2">
                                <h3>welcome Back!</h3>
                                <button
                                    className="btn btn-lg btn-primary d-print-none"
                                    onClick={this.handlePrint}
                                >
                                    Print Page
                                </button>
                                &nbsp;&nbsp;
                                <button
                                    className="btn btn-lg btn-primary d-print-none"
                                    onClick={this.handleLogOut}
                                >
                                    log out
                                </button>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="c1" >First Name</td>
                            <td>
                                <label className="form-label">{studentData.firstName}</label>
                            </td>
                        </tr>
                        <tr>
                            <td className="c1">Last Name</td>
                            <td>
                                <label className="form-label">{studentData.lastName}</label>
                            </td>
                        </tr>
                        <tr>
                            <td className="c1">Date of Birth</td>
                            <td>
                                <label>{studentData.dateOfBirth}</label>
                            </td>
                        </tr>
                        <tr>
                            <td className="c1">Email</td>
                            <td>
                                <label>{studentData.email}</label>
                            </td>
                        </tr>
                        <tr>
                            <td className="c1">phone#</td>
                            <td>
                                <label>{studentData.phone}</label>
                            </td>
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
                            <td colSpan='2' className="text-center">
                                <button type="button" className="btn btn-lg btn-primary d-print-none" onClick={this.handleLogOut}>Back</button>
                                {/* <a href="/tree.pdf" target="_blank"> component tree PDF</a> */}
                            </td>
                        </tr>
                    </tbody>
                    <tfoot>
                    </tfoot>
                </table>
            </>
        )
    }
}
export default Student;