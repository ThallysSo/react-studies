function Formulario({ botaoCadastrar, eventoTeclado, cadastrarProduto, objeto, cancelar, deletar, alterar }) {
    return (
        <form>

            <input type='text' value={objeto.nome} onChange={eventoTeclado} name="nome" placeholder="Nome" className='form-control'></input>
            <input type='text' value={objeto.marca} onChange={eventoTeclado} name="marca" placeholder="Marca" className='form-control'></input>

            {
                botaoCadastrar ?
                    <input type='button' value="Cadastrar" onClick={cadastrarProduto
                        } className="btn btn-primary"></input>
                    :
                    <div>
                        <input type='button' onClick={alterar}value="Alterar" className="btn btn-warning"></input>
                        <input type='button' onClick={deletar} value="Remover" className="btn btn-danger"></input>
                        <input type='button' value="Cancelar" onClick={cancelar} className="btn btn-secondary"></input>

                    </div>
            }

        </form>
    )
}

export default Formulario;