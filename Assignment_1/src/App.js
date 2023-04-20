import './App.css';
import Homepage from './pages/HomePage/homepage';
import DetailsPage from './pages/DetailPage/detailpage';
import TemplatePage from './pages/Templatepage/templatepage';
import { BrowserRouter,Routes,Route } from 'react-router-dom';


function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
       <Route path='/' element={<TemplatePage/>}>
        <Route index element={<Homepage/>}></Route>
        <Route exact path='/detailspage/:userId' element={<DetailsPage/>}></Route>
       </Route>
    </Routes>
    </BrowserRouter> 
    </>
  );
}

export default App;