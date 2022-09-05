
import './App.css';

import Header from './components/Header';
import Footer from './components/Footer';
import Container from './components/Container';
import {BrowserRouter} from 'react-router-dom';
import {Toaster} from 'react-hot-toast';
function App() { 
  return (
    <>
      <Toaster/>
       <BrowserRouter>
       <Header></Header>
        <Container></Container>
        <Footer></Footer>
        </BrowserRouter>
    </>
  );
}

export default App;
