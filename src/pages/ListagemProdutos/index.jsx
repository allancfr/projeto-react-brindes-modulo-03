// src/pages/ListagemProdutos/index.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style.css'; // Importa nossos estilos
import { Link } from 'react-router-dom';

function ListagemProdutos() {
  const [allProducts, setAllProducts] = useState([]); // Guarda TODOS os produtos da API
  const [filteredProducts, setFilteredProducts] = useState([]); // Guarda os produtos que serão exibidos
  const [searchTerm, setSearchTerm] = useState(""); // Guarda o texto da busca

  const handleDelete = (productId) => {
    const isConfirmed = window.confirm('Tem certeza que deseja excluir este produto?');
    if (!isConfirmed) {
      return;
    }
    axios.delete(`http://localhost:3001/produtos/${productId}`)
      .then(response => {
        console.log('Produto deletado com sucesso:', response);
        alert('Produto excluído com sucesso!');
        setAllProducts(allProducts.filter(product => product.id !== productId));
      })
      .catch(error => {
        console.error('Erro ao deletar o produto:', error);
        alert('Ocorreu um erro ao excluir o produto.');
      });
  };

  // --- EFEITO #1: Buscar os dados da API (APENAS UMA VEZ) ---
  useEffect(() => {
    const fetchProducts = () => {
      axios.get('http://localhost:3001/produtos')
        .then(response => {
          setAllProducts(response.data);
          // setFilteredProducts(response.data); // Não precisamos mais desta linha aqui
          console.log('Produtos carregados:', response.data);
        })
        .catch(error => {
          console.error('Erro ao buscar produtos:', error);
        });
    };
    fetchProducts();
  }, []); // O array vazio garante que isso rode só uma vez

  // --- EFEITO #2: Filtrar os produtos (RODA SEMPRE QUE A BUSCA OU A LISTA MUDAR) ---
  // Este useEffect foi movido para fora do primeiro
  useEffect(() => {
    const results = allProducts.filter(product =>
      product.nome.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(results);
  }, [searchTerm, allProducts]); // Depende do termo de busca e da lista completa

  // --- ESTRUTURA JSX ---
  return (
    <div className="list-container">
      <h1>Lista de Brindes</h1>
      <div className="search-container">
        <input
          type="text"
          placeholder="Pesquisar por nome..."
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="products-grid">
        {filteredProducts.map(product => (
          <div className="product-card" key={product.id}>
            <img src={product.imagem} alt={product.nome} className="product-image" />
            <h2 className="product-name">{product.nome}</h2>
            <p className="product-price">R$ {parseFloat(product.preco).toFixed(2)}</p>
            <p className="product-description">{product.descricao}</p>
            <div className="product-actions">
              <Link to={`/editar/${product.id}`} className="btn-edit">Editar</Link>
              <button
                className="btn-delete"
                onClick={() => handleDelete(product.id)}
              >
                Deletar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ListagemProdutos;