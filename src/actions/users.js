import { types } from "../types/types"
import Swal from 'sweetalert2';
import { finishLoading, startLoading } from './ui';




export const addUser = (user, resetForm) => {
    return (dispatch) => {
        dispatch(startLoading());
        const newUser = {
            id: new Date().getTime(),
            name: user.name,
            email: user.email,
            password: user.password,
            cellphone: user.cellphone,
            role: user.role,
            is_active: user.is_active,
            created_date: new Date().toLocaleString(),
            updated_date: new Date().toLocaleString()
        }
        const lclStrg = JSON.parse(localStorage.getItem(types.usersLocalStorage)) || [];
        const checkUser = lclStrg.filter(user => user.email.toLowerCase().trim() === newUser.email.toLowerCase().trim())[0];
        if (checkUser) {
            Swal.fire('Error', 'Ese usuario ya existe, intenta con otro.', 'error');
        } else {
            lclStrg.unshift(newUser);
            dispatch({
                type: types.usersAddNew,
                payload: lclStrg
            });
            localStorage.setItem(types.usersLocalStorage, JSON.stringify(lclStrg));
            Swal.fire(user.name, 'Usuario creado correctamente.', 'success').then(res => dispatch(stopToCreateUser()))
        }
        dispatch(finishLoading());
    }
}

export const updateUser = (updatedUser, resetForm) => {
    return (dispatch) => {
        dispatch(startLoading());
        Swal.fire({
            title: updatedUser.name,
            text: '¿Seguro que deseas actualizar este usuario?',
            icon: "warning",
            showCancelButton: true,
            cancelButtonText: 'No',
            confirmButtonText: 'Sí'
        }).then(res => {
            if (res.value) {
                const lclStrg = JSON.parse(localStorage.getItem(types.usersLocalStorage)) || [];
                const updatedUsers = lclStrg.map(user => {
                    if (user.email.toLowerCase().trim() === updatedUser.email.toLowerCase().trim()) {
                        return {
                            id: updatedUser.id,
                            name: updatedUser.name,
                            email: user.email,
                            password: updatedUser.password,
                            cellphone: updatedUser.cellphone,
                            role: updatedUser.role,
                            is_active: updatedUser.is_active,
                            created_date: updatedUser.created_date,
                            updated_date: new Date().toLocaleString()
                        }
                    };
                    return user;
                });
                localStorage.setItem(types.usersLocalStorage, JSON.stringify(updatedUsers));
                dispatch({
                    type: types.usersUpdate,
                    payload: updatedUsers
                });
                Swal.fire(updatedUser.name, 'Usuario actualizado correctamente.', 'success').then(res => dispatch(selectedUserToNull()))
                dispatch(finishLoading());
            }
        })
    }
}

export const deleteUser = (userToDelete) => {
    return (dispatch) => {
        Swal.fire({
            title: userToDelete.name,
            text: '¿Seguro que deseas eliminar este usuario?',
            icon: "warning",
            showCancelButton: true,
            cancelButtonText: 'No',
            confirmButtonText: 'Sí',
            reverseButtons: true,
            focusConfirm: false
        }).then(res => {
            if (res.value) {
                const lclStrg = JSON.parse(localStorage.getItem(types.usersLocalStorage)) || [];
                const updatedUsers = lclStrg.map(user => {
                    if (user.id === userToDelete.id) user.is_active = false;
                    return user;
                })
                localStorage.setItem(types.usersLocalStorage, JSON.stringify(updatedUsers));
                dispatch({
                    type: types.usersDelete,
                    payload: updatedUsers
                })
                Swal.fire(userToDelete.name, 'Usuario eliminado correctamente.', 'success')
            }
        });
    }
}

export const selectUser = (user) => {
    return (dispatch) => {
        dispatch({
            type: types.usersSelected,
            payload: user
        });
    }
}

export const selectedUserToNull = () => ({
    type: types.usersSelectedToNull
})

export const startToCreateUser = () => ({
    type: types.usersStartCreatingUser
})

export const stopToCreateUser = () => ({
    type: types.usersStopCreatingUser
})
