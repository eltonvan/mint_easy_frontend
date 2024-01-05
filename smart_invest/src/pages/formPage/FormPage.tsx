import { useState } from "react";
import "./formPage.scss";

import PassResetForm from "../../components/passResetForm/PassResetForm";

/*
page with no other component to show forms as password reset and other managment forms
which do nor require login
*/

const formPage = () => {

    const [open, setOpen] = useState(false);


    
    return (
        <div className="home">

            <div className="passResetForm">
                <PassResetForm  setOpen={setOpen}/>
        </div>
            </div>  
    )
}

export default formPage;