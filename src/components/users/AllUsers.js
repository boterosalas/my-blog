import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, selectUser, startToCreateUser } from '../../actions/users';

const AllUsers = () => {

    const dispatch = useDispatch();
    const usersState = useSelector(state => state.users);
    const { users: allUsers } = usersState;

    const handleDeleteUser = (event, user) => {
        event.stopPropagation();
        dispatch(deleteUser(user));
    }

    const handleSelectUser = (user) => {
        dispatch(selectUser(user));
    }

    const handleNewUser = () => {
        dispatch(startToCreateUser());
    }

    return (
        <>
            <div className="d-flex justify-content-between align-items-end mb-3">
                <h1>Todos los usuarios</h1>
                <button className="btn btn-primary" onClick={handleNewUser}>Nuevo</button>
            </div>
            <p className="mb-0">Para ver más información sobre cada usuario o actualizarlo haz click sobre la fila correspondiente de la tabla que está ubicada abajo, también puedes hacer click directamente sobre el ícono de papelera para desactivar al usuario del sistema.</p>
            <p className="mb-0">Si lo que quieres es crear un nuevo usuario entonces haz click en el boton 'NUEVO' que está en la parte superior a la derecha.</p>
            {
                <table className="table table-hover mt-5">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Correo</th>
                            <th scope="col">Rol</th>
                            <th scope="col">Estado</th>
                            <th scope="col">Opciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            allUsers.map((user, idx) => {
                                return (
                                    <tr key={user.id} className="pointer" onClick={() => { handleSelectUser(user) }}>
                                        <th scope="row">{idx + 1}</th>
                                        <td>{user.email}</td>
                                        <td>{user.role}</td>
                                        <td>{user.is_active ? 'Activo' : 'Inactivo'}</td>
                                        <td>
                                            <button type="button" className="btn btn-danger btn-sm me-1" onClick={(e) => { handleDeleteUser(e, user) }} disabled={!user.is_active}>
                                                <i className="fas fa-trash-alt"></i>
                                            </button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            }
        </>
    )
}

export default AllUsers
