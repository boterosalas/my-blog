import React, { useEffect } from 'react';
import { Field, Form, Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, selectedUserToNull, updateUser, stopToCreateUser } from '../../actions/users';


const UserForm = ({ user }) => {

    const dispatch = useDispatch();
    const usersState = useSelector(state => state.users);
    const { userSelected, startCreatingUser } = usersState;

    const initialValues =
    {
        id: user.id,
        name: user.name,
        email: user.email,
        password: user.password,
        cellphone: user.cellphone,
        role: user.role,
        is_active: user.is_active,
        created_date: user.created_date,
        updated_date: user.updated_date
    }

    const submitRegisterForm = (values, { resetForm }) => {
        userSelected
            ? dispatch(updateUser(values, resetForm))
            : dispatch(addUser(values, resetForm));
    };

    const validateRegisterForm = (values) => {
        let errors = {};
        const regexName = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/i;
        const regexEmail = /^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$/i;
        const regexPassword = /^[a-z0-9]{6,}$/i;
        const regexCellphone = /^[0-9][0-9]{9,14}$/i;
        if (!values.name) {
            errors.name = "El nombre es obligatorio.";
        } else if (!regexName.test(values.name)) {
            errors.name = "Ingresar solo letras.";
        }
        if (!values.email) {
            errors.email = "El correo es obligatorio.";
        } else if (!regexEmail.test(values.email)) {
            errors.email = "Correo inválido.";
        }
        if (!values.password) {
            errors.password = "La contraseña es obligatoria.";
        } else if (!regexPassword.test(values.password)) {
            errors.password = "La contraseña debe tener al menos 6 caracteres.";
        }
        if (!values.cellphone) {
            errors.cellphone = "El celular es obligatorio";
        } else if (!regexCellphone.test(values.cellphone)) {
            errors.cellphone = "Ingresar solo números, entre 10 y 15 dígitos.";
        }
        if (!values.role && (values.role.length <= 0)) {
            errors.role = "El rol es obligatorio";
        }
        if (values.is_active !== true && values.is_active !== false) {
            errors.is_active = "El estado es obligatorio";
        }
        return errors;
    }

    const handleCancelUpdate = () => {
        dispatch(selectedUserToNull());
        dispatch(stopToCreateUser());
    }

    useEffect(() => {
        return () => {
            dispatch(selectedUserToNull());
            dispatch(stopToCreateUser());
        }
    }, [dispatch])

    return (
        <>
            {
                startCreatingUser ?
                    <h1>Nuevo usuario</h1> : <h1>Actualizar usuario</h1>
            }
            <Formik
                initialValues={initialValues}
                validate={validateRegisterForm}
                onSubmit={submitRegisterForm}
                enableReinitialize="true"
                validateOnMount="true"
            >
                {(formik) => {
                    const {
                        errors,
                        touched,
                        isValid,
                        values
                    } = formik;
                    return (
                        <Form className="p-5 p-sm-3">
                            <div className="row mb-2">
                                <div className="col-10">
                                    <label htmlFor="name">Nombre</label>
                                    <Field
                                        type="text"
                                        name="name"
                                        id="name"
                                        placeholder="Nombre"
                                        className={`form-control form-control-sm ${errors.name && touched.name ?
                                            "border-error" : null}`}
                                    />
                                    {errors.name && touched.name && (
                                        <span className="fs-8">{errors.name}</span>
                                    )}
                                </div>
                                <div className="col-2 form-switch">
                                    <div className="d-flex flex-column align-items-end">
                                        <label htmlFor="is_active" className="p-0">{values.is_active ? 'Activo' : 'Inactivo'}</label>
                                        <Field className="form-check-input pointer m-0 p-0" type="checkbox" role="switch" id="is_active" name="is_active" />

                                        {errors.is_active && touched.is_active && (
                                            <span className="fs-8">{errors.is_active}</span>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="row mb-2">
                                <div className="col">
                                    <label htmlFor="email">Correo</label>
                                    <Field
                                        type="email"
                                        name="email"
                                        id="email"
                                        placeholder="Correo"
                                        className={`form-control form-control-sm ${errors.email && touched.email ?
                                            "border-error" : null}`}
                                        disabled={userSelected}
                                    />
                                    {errors.email && touched.email && (
                                        <span className="fs-8">{errors.email}</span>
                                    )}
                                </div>
                                <div className="col">
                                    <label htmlFor="password">Contraseña</label>
                                    <Field
                                        type="text"
                                        name="password"
                                        id="password"
                                        placeholder="Contraseña"
                                        className={`form-control form-control-sm ${errors.password && touched.password ?
                                            "border-error" : null}`}
                                    />
                                    {errors.password && touched.password && (
                                        <span className="fs-8">{errors.password}</span>
                                    )}
                                </div>
                            </div>
                            <div className="row mb-2">
                                <div className="col">
                                    <label htmlFor="cellphone">Celular</label>
                                    <Field
                                        type="text"
                                        name="cellphone"
                                        id="cellphone"
                                        placeholder="Celular"
                                        className={`form-control form-control-sm ${errors.cellphone && touched.cellphone ?
                                            "border-error" : null}`}
                                    />
                                    {errors.cellphone && touched.cellphone && (
                                        <span className="fs-8">{errors.cellphone}</span>
                                    )}
                                </div>
                                <div className="col">
                                    <label htmlFor="role">Rol</label>
                                    <Field
                                        as="select"
                                        name="role"
                                        className={`form-select form-select-sm ${errors.role && touched.role ? "border-error" : null}`}>
                                        <option value="" disabled>Seleccione un rol de usuario</option>
                                        <option value="user">User</option>
                                        <option value="admin">Admin</option>
                                    </Field>
                                    {errors.role && touched.role && (
                                        <span className="fs-8">{errors.role}</span>
                                    )}
                                </div>
                            </div>
                            <div className="d-grid gap-2 row m-0 mb-2">
                                <button
                                    type="submit"
                                    className={`btn pointer btn-outline-primary ${isValid ? "" : "disabled-btn"}`}
                                    disabled={!isValid}
                                >
                                    {userSelected ? 'Actualizar' : 'Registrar'}
                                </button>
                                {
                                    ((userSelected !== null) || (startCreatingUser)) &&
                                    <button
                                        type="button"
                                        className="btn pointer btn-outline-danger"
                                        onClick={handleCancelUpdate}>
                                        Cancelar
                                    </button>
                                }
                            </div>
                        </Form>
                    );
                }}
            </Formik>
        </>
    )
}

export default UserForm;