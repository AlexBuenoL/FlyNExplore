import { BrowserRouter, Routes, Route, useLocation} from 'react-router-dom'

import { Register } from './components/Register';
import { Login } from './components/Login';
import { FlightSearch } from './components/FlightSearch';
import { Navbar } from './components/Navbar';
import { Recommends } from './components/Recommends';
import { AboutUs } from './components/AboutUs';
import { ProfileMenu } from './components/ProfileMenu';
import { SessionProvider } from './SessionContext';

function App() {

  return (
    <SessionProvider>
      <div className='App'>
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </div> 
    </SessionProvider>
  );
}

function AppContent() {

  const location = useLocation();
  const showNavbar = !['/', '/login', '/register'].includes(location.pathname);

  return (
    <>
      {showNavbar && <Navbar />}
      <Routes> 
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/flightSearch" element={<FlightSearch />} />
        <Route path="/recommends" element={<Recommends />} />
        <Route path="/aboutUs" element={<AboutUs />} />
        <Route path="/profileMenu" element={<ProfileMenu />} />
      </Routes>
    </>
  );
}

export default App;
