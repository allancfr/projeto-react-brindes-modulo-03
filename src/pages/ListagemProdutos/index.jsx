// src/pages/ListagemProdutos/index.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style.css'; // Importa nossos estilos
import { Link } from 'react-router-dom';

function ListagemProdutos() {
  // --- ESTADO (useState) ---
  // Criamos um estado para armazenar a lista de produtos que virá da API.
  // Começamos com um array vazio.
  const [products, setProducts] = useState([]);

  const handleDelete = (productId) => {
  // 1. Pede a confirmação do usuário
  const isConfirmed = window.confirm('Tem certeza que deseja excluir este produto?');

  // 2. Se o usuário não confirmar, a função para por aqui
  if (!isConfirmed) {
    return;
  }

  // 3. Se confirmado, envia a requisição DELETE para a API
  axios.delete(`http://localhost:3001/produtos/${productId}`)
    .then(response => {
      // Callback de SUCESSO
      console.log('Produto deletado com sucesso:', response);
      alert('Produto excluído com sucesso!');

      // 4. ATUALIZA A TELA: Remove o produto da lista no estado local
      // O .filter() cria um NOVO array com todos os produtos,
      // EXCETO aquele que tem o 'id' que acabamos de deletar.
      setProducts(products.filter(product => product.id !== productId));
    })
    .catch(error => {
      // Callback de ERRO
      console.error('Erro ao deletar o produto:', error);
      alert('Ocorreu um erro ao excluir o produto.');
    });
};
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
              <Link to={`/editar/${product.id}`} className="btn-edit">Editar</Link>
              <button className="btn-delete"
  onClick={() => handleDelete(product.id)}
>
  Deletar</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ListagemProdutos;