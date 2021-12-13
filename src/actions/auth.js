import { types } from '../types/types';
import Swal from 'sweetalert2';
import { finishLoading, startLoading } from './ui';


export const startLoginEmailPassword = (email, password) => {
    return (dispatch) => {
        dispatch(startLoading());
        const lclStrg = JSON.parse(localStorage.getItem(types.usersLocalStorage)) || [];
        const authUser = lclStrg.filter(user => user.email.toLowerCase() === email.toLowerCase())[0];
        if (authUser) {
            if (authUser.password.toString() !== password.toString()) {
                Swal.fire('Error', 'Correo o contraseña incorrectos, intenta nuevamente.', 'error');
            } else {
                if(authUser.is_active){
                    const auth = {
                        id: authUser.id,
                        name: authUser.name,
                        token: new Date().getTime()
                    }
                    dispatch(login(auth));
                    localStorage.setItem(types.authUserLocalStorage,JSON.stringify(auth));
                }else{
                    Swal.fire('Error', 'Usuario bloqueado, contactar con un administrador.', 'error');
                }
            }
        } else {
            Swal.fire('Error', 'Correo o contraseña incorrectos, intenta nuevamente.', 'error');
        }
        dispatch(finishLoading());
    }
}

export const startRegister = (user) => {
    return (dispatch) => {
        dispatch(startLoading());
        const { rCellphone, rEmail, rName, rPassword } = user;

        const lclStrg = JSON.parse(localStorage.getItem(types.usersLocalStorage)) || [];
        const checkUser = lclStrg.filter(user => user.email.toLowerCase() === rEmail.toLowerCase())[0];
        if (checkUser) {
            Swal.fire('Error', 'Ese usuario ya existe, intenta con otro.', 'error');
        } else {
            const newUser = {
                id: new Date().getTime(),
                name: rName,
                email: rEmail,
                password: rPassword,
                cellphone: rCellphone,
                role: 'user',
                is_active: true,
                created_date: new Date().toLocaleString(),
                updated_date: new Date().toLocaleString()
            };
            lclStrg.unshift(newUser);
            dispatch({
                type: types.usersAddNew,
                payload: lclStrg
            });
            localStorage.setItem(types.usersLocalStorage, JSON.stringify(lclStrg));
            Swal.fire('Ok', 'Usuario creado correctamente.', 'success');
        }
        dispatch(finishLoading());
    }
}

export const login = ({ id, name, token }) => {
    return {
        type: types.login,
        payload: {
            id,
            name,
            token
        }
    }
}

export const logout = () => {
    localStorage.removeItem(types.authUserLocalStorage);
    return { type: types.logout };
};