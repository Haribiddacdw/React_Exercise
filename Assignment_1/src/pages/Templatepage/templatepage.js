import Header from '../../components/Header/header';
import ContactUsForm from '../../components/ContactUsForm/contactusform'
import { Outlet } from 'react-router-dom';
function TemplatePage(){
    return(
        <>
         <Header/>
         <Outlet/>
        <ContactUsForm/>
        </>
    )
}
export default TemplatePage;