import Contatos from './contatos/';
import Save from './contatos/save/';
import Search from './contatos/search/';
import { BrowserRouter, Routes, Route, NavLink, Navigate } from 'react-router-dom';

const basename =
  process.env.NODE_ENV === "production"
    ? "/curso-react-build"
    : "";

function App() {
  return (
    <BrowserRouter basename={basename}>
      <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-primary navbar-contatos">
        <div className="container">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink end className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link' } to="/contatos">Contatos</NavLink >
            </li>
            <li className="nav-item">
              <NavLink end className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link' } to="/contatos/save">Novo</NavLink >
            </li>
          </ul>
          <Search/>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Navigate to="/contatos" replace />} />
        <Route path="/contatos" element={<Contatos />} />
        <Route path="/contatos/save" element={<Save />} />
        <Route path="/contatos/save/:id" element={<Save />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
