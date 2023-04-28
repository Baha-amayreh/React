import { Route, Routes, Navigate, useRouteLoaderData } from "react-router-dom";
import StudentForm from "../Components/StudentForm/StudentForm";
import ListOfStudents from "../Components/ListOfStudents/ListOfStudents";
import UpdateStudent from "../Components/UpdateStudent/UpdateStudent";
import StudentDetails from "../Components/StudentDetails/StudentDetails";
import Login from "../Components/Login/Login";
import Student from "../Components/Student/Student";
function PageRoutes() {
    const loadUserData = async ({ match }) => {
        // axios.get('http://localhost:8080/students/' + id)
        const response = await fetch('http://localhost:8080/students/${match.params.id}');
        return response.json();
    };
    return (
        <>
            <Routes>
                <Route path="/" element={<Navigate replace to="/Login" />} />
                <Route path="Login" element={<Login />} />
                <Route path="ListOfStudents" element={<ListOfStudents />} />
                <Route path="StudentForm" element={<StudentForm />} />
                <Route path="updateStudent/:id" element={<UpdateStudent />} />
                <Route path="StudentDetails/:id" element={<StudentDetails />} />
                <Route path="Student" element={<Student />} />
                <Route path='StudentDetails/:id' loader={loadUserData} component={StudentDetails} />
            </Routes>
        </>
    )
}
export default PageRoutes;