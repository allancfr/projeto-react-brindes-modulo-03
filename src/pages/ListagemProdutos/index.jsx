// src/pages/ListagemProdutos/index.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style.css'; // Importa nossos estilos

function ListagemProdutos() {
  // --- ESTADO (useState) ---
  // Criamos um estado para armazenar a lista de produtos que virá da API.
  // Começamos com um array vazio.
  const [products, setProducts] = useState([]);

  // --- EFEITO (useEffect) ---
  // O useEffect com um array de dependências vazio `[]` executa a função
  // interna apenas UMA VEZ, quando o componente é montado na tela.
  useEffect(() => {
    // Função para buscar os dados na API
    const fetchProducts = () => {
      axios.get('http://localhost:3001/produtos')
        .then(response => {
          // Se a busca for bem-sucedida, atualizamos o estado 'products' com os dados
          setProducts(response.data);
          console.log('Produtos carregados:', response.data);
        })
        .catch(error => {
          // Se houver um erro, mostramos no console
          console.error('Erro ao buscar produtos:', error);
        });
    };

    fetchProducts(); // Chamamos a função de busca
  }, []); // O array vazio garante que isso rode só uma vez

  // --- ESTRUTURA JSX ---
  return (
    <div className="list-container">
      <h1>Lista de Brindes</h1>
      <div className="products-grid">
        {/* Usamos o .map() para transformar cada item do array 'products' em um card JSX */}
        {products.map(product => (
          <div className="product-card" key={product.id}>
            <img src={product.imagem} alt={product.nome} className="product-image" />
            <h2 className="product-name">{product.nome}</h2>
            <p className="product-price">R$ {product.preco.toFixed(2)}</p>
            <p className="product-description">{product.descricao}</p>
            <div className="product-actions">
              <button className="btn-edit">Editar</button>
              <button className="btn-delete">Deletar</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ListagemProdutos;