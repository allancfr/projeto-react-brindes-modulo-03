// src/App.jsx

import React from 'react';
// 1. Importe os componentes do react-router-dom
import { Routes, Route, Link } from 'react-router-dom';

// 2. Importe AMBAS as páginas que criamos
import ListagemProdutos from './pages/ListagemProdutos';
import CadastroProduto from './pages/CadastroProduto';
import EditarProduto from './pages/EditarProduto';

// Importe um CSS para o App se quiser estilizar o menu
import './App.css';

function App() {
  return (
    <div>
      {/* 3. Crie um menu de navegação com o componente <Link> */}
      <nav className="navbar">
        <Link to="/" className="nav-link">Listagem</Link>
        <Link to="/cadastrar" className="nav-link">Cadastrar</Link>
      </nav>

      <hr />

      {/* 4. Defina a área onde as páginas serão trocadas */}
      <Routes>
        {/* Rota 1: Quando a URL for "/", mostre a tela de listagem */}
        <Route path="/" element={<ListagemProdutos />} />

        {/* Rota 2: Quando a URL for "/cadastrar", mostre a tela de cadastro */}
        <Route path="/cadastrar" element={<CadastroProduto />} />
        <Route path="/editar/:id" element={<EditarProduto />} />
      </Routes>
    </div>
  );
}

export default App;