// src/pages/CadastroProduto/index.jsx

import React, { useState } from 'react';
import axios from 'axios';
import './style.css'; // Importa nosso arquivo de estilos

function CadastroProduto() {
  // --- ESTADOS (useState) ---
  // Criamos um estado para cada campo do formulário
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  // --- FUNÇÃO DE ENVIO (handleSubmit) ---
  const handleSubmit = (event) => {
    // 1. Impede o comportamento padrão do formulário (que é recarregar a página)
    event.preventDefault();

    // 2. Monta o objeto com os dados para enviar para a API
    // As chaves (nome, preco, etc.) devem ser iguais às que a API espera
    const newProduct = {
      nome: name,
      preco: parseFloat(price), // Converte o preço de texto para número
      descricao: description,
      imagem: imageUrl
    };

    // 3. Envia a requisição POST para o backend com Axios
    axios.post('http://localhost:3001/produtos', newProduct)
      .then(response => {
        // Callback para SUCESSO
        console.log('Cadastro realizado com sucesso!', response.data);
        alert('Produto cadastrado com sucesso!');
        
        // Opcional: Limpa os campos do formulário após o cadastro
        setName('');
        setPrice('');
        setDescription('');
        setImageUrl('');
      })
      .catch(error => {
        // Callback para ERRO
        console.error('Houve um erro ao cadastrar o produto:', error);
        alert('Erro ao cadastrar o produto. Verifique o console do navegador.');
      });
  };

  // --- ESTRUTURA JSX (o que será renderizado na tela) ---
  return (
    <div className="container">
      <h1>Cadastro de Produto</h1>
      
      {/* O evento onSubmit do formulário chama nossa função handleSubmit */}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Nome do Produto</label>
          <input
            type="text"
            id="name"
            placeholder="Ex: Caneca Gato Risonho"
            value={name} // O valor do input é controlado pelo estado 'name'
            onChange={(e) => setName(e.target.value)} // Quando o usuário digita, o estado é atualizado
            required // Campo obrigatório
          />
        </div>

        <div className="form-group">
          <label htmlFor="price">Preço</label>
          <input
            type="number"
            id="price"
            step="0.01" // Permite casas decimais
            placeholder="Ex: 25.99"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Descrição</label>
          <textarea
            id="description"
            rows="4"
            placeholder="Descreva o produto aqui..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="imageUrl">URL da Imagem</label>
          <input
            type="text"
            id="imageUrl"
            placeholder="https://exemplo.com/imagem.jpg"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            required
          />
        </div>

        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
}

export default CadastroProduto;