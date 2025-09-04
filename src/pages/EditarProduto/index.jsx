// src/pages/EditarProduto/index.jsx

import React, { useState, useEffect } from 'react';
// 1. Importamos os 'hooks' que nos ajudarão com os parâmetros da URL e a navegação
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './style.css'; // O estilo é o mesmo do cadastro

function EditarProduto() {
  // 2. useParams() nos dá acesso aos parâmetros da URL. Pegamos o 'id'.
  const { id } = useParams();
  // 3. useNavigate() nos dá a função para navegar programaticamente
  const navigate = useNavigate();

  // Os estados continuam os mesmos
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  // 4. useEffect para buscar os dados do produto na API quando a página carrega
  useEffect(() => {
    axios.get(`http://localhost:3001/produtos/${id}`)
      .then(response => {
        const product = response.data;
        // 5. Preenchemos os estados com os dados do produto que veio da API
        setName(product.nome);
        setPrice(product.preco);
        setDescription(product.descricao);
        setImageUrl(product.imagem);
      })
      .catch(error => {
        console.error("Erro ao buscar dados do produto:", error);
      });
  }, [id]); // O [id] garante que o efeito rode novamente se o ID na URL mudar

  // 6. A função de submit foi modificada
  const handleSubmit = (event) => {
    event.preventDefault();

    const updatedProduct = {
      nome: name,
      preco: parseFloat(price),
      descricao: description,
      imagem: imageUrl
    };

    // 7. Usamos o método PUT para ATUALIZAR, passando o ID na URL
    axios.put(`http://localhost:3001/produtos/${id}`, updatedProduct)
      .then(() => {
        alert('Produto atualizado com sucesso!');
        // 8. Após o sucesso, navegamos de volta para a página de listagem
        navigate('/');
      })
      .catch(error => {
        console.error("Erro ao atualizar o produto:", error);
        alert('Erro ao atualizar o produto.');
      });
  };

  // 9. O JSX é quase o mesmo, só mudamos o título e o texto do botão
  return (
    <div className="container">
      <h1>Editar Produto</h1>
      <form onSubmit={handleSubmit}>
        {/* Os inputs e labels são exatamente os mesmos do cadastro */}
        <div className="form-group">
          <label htmlFor="name">Nome do Produto</label>
          <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="price">Preço</label>
          <input type="number" id="price" step="0.01" value={price} onChange={(e) => setPrice(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="description">Descrição</label>
          <textarea id="description" rows="4" value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="imageUrl">URL da Imagem</label>
          <input type="text" id="imageUrl" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} required />
        </div>
        <button type="submit">Salvar Alterações</button>
      </form>
    </div>
  );
}

export default EditarProduto;