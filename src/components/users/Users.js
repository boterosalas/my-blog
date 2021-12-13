import React from 'react';
import { useSelector } from 'react-redux';
import AllUsers from './AllUsers';
import UserForm from './UserForm';


const Users = () => {
    const usersState = useSelector(state => state.users);
    const { userSelected, startCreatingUser } = usersState;

    const initialValues =
    {
        id: '',
        name: '',
        email: '',
        password: '',
        cellphone: '',
        role: '',
        is_active: true,
        created_date: '',
        updated_date: ''
    }

    return (
        <>
            {
                userSelected || startCreatingUser
                    ? <UserForm user={userSelected || initialValues} />
                    : <AllUsers />
            }
        </>
    )
}

export default Users
