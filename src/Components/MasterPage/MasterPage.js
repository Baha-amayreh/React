import { BrowserRouter } from 'react-router-dom';
import Dashboard from '../../containers/Dashboard';
import './MasterPage.css'
import { useContext } from 'react';
import { DataContext } from '../../App';
function MasterPage(props) {
    const copyRight = useContext(DataContext);
    return (
        <>
            <div className="container"  >
                <br />
                <header>
                    <BrowserRouter>
                        <Dashboard />
                    </BrowserRouter>
                </header>
                <hr />
                <main className="main">
                    <table className=" 
            table table-sm 
            table table-hover 
            table-bordered 
            table-condensed
            table w-auto
            table border-double
            border-dark
            ">
                        <tbody >
                             {props.children} 
                        </tbody>
                        <tfoot>
                        </tfoot>
                    </table>
                </main>
                <footer className="footer">
                    <h6>Copyright © {copyRight.year} {copyRight.company}  Corporation. All rights reserved!</h6>
                </footer>
            </div>
        </>
    )
}
export default MasterPage;