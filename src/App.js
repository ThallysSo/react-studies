import { useEffect, useState } from 'react';
import './App.css';
import Formulario from './Formulario';
import Tabela from './Tabela';

function App() {

  //Object
  const objetoProduto = {
    id: 0,
    nome: '',
    marca: ''
  }

  //UseState
  const [btnCancelar, setBtnCancelar] = useState(true);
  const [objProduto, setObjProduto] = useState(objetoProduto)
  const [produtos, setProdutos] = useState([]);

  useEffect(() => { getLista() }, []);

  const getLista = () => {
    fetch("http://localhost:8080/products")
      .then(retorno => retorno.json())
      .then(retorno_convertido => setProdutos(retorno_convertido));
  }


  //Obtendo dados do formulário
  const aoDigitar = (evento) => {
    setObjProduto({
      ...objProduto,
      [evento.target.name]: evento.target.value
    });
  }

  // Cadastrar produto
  const cadastrar = () => {
    fetch('http://localhost:8080/products', {
      method: 'post',
      body: JSON.stringify(objProduto),
      headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json'
      }
    })
      .then(retorno => retorno.json()
      )
      .then(retorno_convertido => {
        if (retorno_convertido.status === 201) {
          alert(retorno_convertido.message)
          clearForm()
          getLista()
        }
        else {
          alert(retorno_convertido.message)
        }
      })
  }

  const clearForm = () => {
    setObjProduto(objetoProduto)
    setBtnCancelar(true)
  }

  //Selecionar produto
  const selecionarProduto = (indice) => {
    setObjProduto(produtos[indice])
    setBtnCancelar(false)
  }

  const alteraProduto = () => {
    fetch('http://localhost:8080/products', {
    method: 'put',
    body: JSON.stringify(objProduto),
    headers: {
      'Content-type': 'application/json',
      'Accept': 'application/json'
    }
  })
  .then(retorno => retorno.json())
  .then(retorno_convertido => {
    if (retorno_convertido.status === 200) {
      alert(retorno_convertido.message)
      clearForm()
      getLista()
    }
    else {
      alert(retorno_convertido.message)
    }
  });
}

  //Remover produto
  const deletarProduto = () => {
    fetch("http://localhost:8080/products/"+ objProduto.id, {
      method: 'delete',
      headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json'
      }
    })
    .then(retorno => retorno.json())
    .then(retorno_convertido => {
      if (retorno_convertido.status === 200) {
        alert(retorno_convertido.message)
        clearForm()
        getLista()
      }
      else {
        alert(retorno_convertido.message)
      }
    });
    
  }
  //Retorno
  return (
    <div>
      <Formulario
        botaoCadastrar={btnCancelar}
        eventoTeclado={aoDigitar}
        cadastrarProduto={cadastrar}
        objeto={objProduto}
        cancelar={clearForm}
        alterar={alteraProduto}
        deletar={deletarProduto}
      />

      <Tabela
        listaDeProdutos={produtos}
        selecionar={selecionarProduto}
      />
    </div>
  );
}

export default App;
