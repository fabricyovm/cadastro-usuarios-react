import { useEffect, useState, useRef } from 'react';
import api from '../../services/api.js'
import { FaTrashAlt } from "react-icons/fa";
import './style.css'

function Home() {
  const [users, setUsers] = useState([])
  const inputName = useRef()
  const inputAge = useRef()
  const inputEmail = useRef()

  async function getUsers() {
    const usersFromApi = await api.get('/usuarios')

    setUsers(usersFromApi.data)
  }

  async function createUsers() {
    await api.post('/usuarios', {
      name: inputName.current.value,
      age: inputAge.current.value,
      email: inputEmail.current.value
    })

    getUsers()
    resetarInputs()
  }

  async function deleteUsers(id) {
    await api.delete(`/usuarios/${id}`)
    getUsers()
  }

  function resetarInputs() {
    inputName.current.value = '';
    inputAge.current.value = '';
    inputEmail.current.value = '';
  }

  useEffect(() => {
    getUsers()
  }, [])

  return (
    <div className='container'>
      <form className='formulario'>
        <div className="box-formulario">
          <h1 className='titulo'>Cadatro de Usuários</h1>
          <input type="text" name='nome' placeholder="Nome" ref={inputName} />
          <input type="number" name='idade' placeholder="Idade" ref={inputAge} />
          <input type="email" name='email' placeholder="E-mail" ref={inputEmail} />
          <button className='btn-cadastrar' type="button" onClick={createUsers}>Cadastrar</button>
        </div>
      </form>
      <div className="container-lista-usuarios">
        <div className="lista-usuarios">
          <h2>Usuários</h2>
          {users.map(user => (
            <div key={user.id} className="card">
              <div>
                <p>Nome: <span>{user.name}</span></p>
                <p>Idade: <span>{user.age}</span></p>
                <p>E-mail: <span>{user.email}</span></p>
              </div>
              <button className='trash' onClick={() => deleteUsers(user.id)}>
                <FaTrashAlt />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Home
