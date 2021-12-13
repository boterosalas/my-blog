import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Field } from "formik";
import { useNavigate } from 'react-router-dom'

import { startLoginEmailPassword, startRegister } from '../../actions/auth';

import './login.css';


const LoginScreen = () => {

    const navigate = useNavigate();
    const { loading } = useSelector(state => state.ui);

    const initialLoginValues = {
        lEmail: '',
        lPassword: ''
    };

    const initialRegisterValues = {
        rName: '',
        rEmail: '',
        rPassword: '',
        rCellphone: ''
    };

    const dispatch = useDispatch();

    const validateLoginForm = (values) => {
        let errors = {};
        const regexEmail = /^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$/i;
        const regexPassword = /^[a-z0-9]{6,}$/i;
        if (!values.lEmail) {
            errors.lEmail = "El correo es obligatorio.";
        } else if (!regexEmail.test(values.lEmail)) {
            errors.lEmail = "Correo inválido.";
        }
        if (!values.lPassword) {
            errors.lPassword = "La contraseña es obligatoria.";
        } else if (!regexPassword.test(values.lPassword)) {
            errors.lPassword = "La contraseña debe tener al menos 6 caracteres.";
        }
        return errors;
    };

    const validateRegisterForm = (values) => {
        let errors = {};
        const regexName = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/i;
        const regexEmail = /^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$/i;
        const regexPassword = /^[a-z0-9]{6,}$/i;
        const regexCellphone = /^[0-9][0-9]{9,14}$/i;
        if (!values.rName) {
            errors.rName = "El nombre es obligatorio.";
        } else if (!regexName.test(values.rName)) {
            errors.rName = "Ingresar solo letras.";
        }
        if (!values.rEmail) {
            errors.rEmail = "El correo es obligatorio.";
        } else if (!regexEmail.test(values.rEmail)) {
            errors.rEmail = "Correo inválido.";
        }
        if (!values.rPassword) {
            errors.rPassword = "La contraseña es obligatoria.";
        } else if (!regexPassword.test(values.rPassword)) {
            errors.rPassword = "La contraseña debe tener al menos 6 caracteres.";
        }
        if (!values.rCellphone) {
            errors.rCellphone = "El celular es obligatorio";
        } else if (!regexCellphone.test(values.rCellphone)) {
            errors.rCellphone = "Ingresar solo números, entre 10 y 15 dígitos.";
        }
        return errors;
    };

    const submitLoginForm = ({ lEmail, lPassword }) => {
        dispatch(startLoginEmailPassword(lEmail, lPassword));
        navigate('/')
    };

    const submitRegisterForm = (values, { resetForm }) => {
        dispatch(startRegister(values));
        resetForm()
    };

    return (
        <>
            <div className="main-container container">
                <div className="login-container row my-5 my-sm-0">
                    <div className="col-sm-6 col-8 mx-auto mx-sm-0 mb-5 mb-sm-0 login-form-1">
                        <h3>Ingreso</h3>
                        <Formik
                            initialValues={initialLoginValues}
                            validate={validateLoginForm}
                            onSubmit={submitLoginForm}
                        >
                            {(formik) => {
                                const {
                                    handleSubmit,
                                    errors,
                                    touched,
                                    isValid,
                                    dirty
                                } = formik;
                                return (
                                    <form onSubmit={handleSubmit} id="registerForm">
                                        <div className="form-row mb-2">
                                            <Field
                                                type="email"
                                                name="lEmail"
                                                id="lEmail"
                                                placeholder="Correo"
                                                className={`form-control form-control-sm ${errors.lEmail && touched.lEmail ?
                                                    "border-error" : null}`}
                                            />
                                            {errors.lEmail && touched.lEmail && (
                                                <span className="fs-8">{errors.lEmail}</span>
                                            )}
                                        </div>
                                        <div className="form-row mb-2">
                                            <Field
                                                type="text"
                                                name="lPassword"
                                                id="lPassword"
                                                placeholder="Contraseña"
                                                className={`form-control form-control-sm ${errors.lPassword && touched.lPassword ?
                                                    "border-error" : null}`}
                                            />
                                            {errors.lPassword && touched.lPassword && (
                                                <span className="fs-8">{errors.lPassword}</span>
                                            )}
                                        </div>

                                        <div className="mb-2">
                                            <div className="d-grid pointer">
                                                <button
                                                    type="submit"
                                                    className={`btn btn-primary ${dirty && isValid ? "" : "disabled-btn"}`}
                                                    disabled={!(dirty && isValid) && !loading}>
                                                    Iniciar sesión
                                                </button>
                                            </div>
                                        </div>

                                    </form>
                                );
                            }}
                        </Formik>
                    </div>

                    <div className="col-sm-6 col-8 mx-auto mx-sm-0 login-form-2">
                        <h3>Registro</h3>
                        <Formik
                            initialValues={initialRegisterValues}
                            validate={validateRegisterForm}
                            onSubmit={submitRegisterForm}
                        >
                            {(formik) => {
                                const {
                                    handleSubmit,
                                    errors,
                                    touched,
                                    isValid,
                                    dirty
                                } = formik;
                                return (
                                    <form onSubmit={handleSubmit} id="registerForm">
                                        <div className="form-row mb-2">
                                            <Field
                                                type="text"
                                                name="rName"
                                                id="rName"
                                                placeholder="Nombre"
                                                className={`form-control form-control-sm ${errors.rName && touched.rName ?
                                                    "border-error" : null}`}
                                            />
                                            {errors.rName && touched.rName && (
                                                <span className="fs-8 text-white">{errors.rName}</span>
                                            )}
                                        </div>
                                        <div className="form-row mb-2">
                                            <Field
                                                type="email"
                                                name="rEmail"
                                                id="rEmail"
                                                placeholder="Correo"
                                                className={`form-control form-control-sm ${errors.rEmail && touched.rEmail ?
                                                    "border-error" : null}`}
                                            />
                                            {errors.rEmail && touched.rEmail && (
                                                <span className="fs-8 text-white">{errors.rEmail}</span>
                                            )}
                                        </div>
                                        <div className="form-row mb-2">
                                            <Field
                                                type="text"
                                                name="rPassword"
                                                id="rPassword"
                                                placeholder="Contraseña"
                                                className={`form-control form-control-sm ${errors.rPassword && touched.rPassword ?
                                                    "border-error" : null}`}
                                            />
                                            {errors.rPassword && touched.rPassword && (
                                                <span className="fs-8 text-white">{errors.rPassword}</span>
                                            )}
                                        </div>
                                        <div className="form-row mb-2">
                                            <Field
                                                type="text"
                                                name="rCellphone"
                                                id="rCellphone"
                                                placeholder="Celular"
                                                className={`form-control form-control-sm ${errors.rCellphone && touched.rCellphone ?
                                                    "border-error" : null}`}
                                            />
                                            {errors.rCellphone && touched.rCellphone && (
                                                <span className="fs-8 text-white">{errors.rCellphone}</span>
                                            )}
                                        </div>

                                        <div className="mb-2">
                                            <div className="d-grid pointer">
                                                <button
                                                    type="submit"
                                                    className={`btn btn-outline-light ${dirty && isValid ? "" : "disabled-btn"}`}
                                                    disabled={!(dirty && isValid) && !loading}>
                                                    Registrarse
                                                </button>
                                            </div>
                                        </div>

                                    </form>
                                );
                            }}
                        </Formik>
                    </div>
                </div>
            </div >

        </>
    );

}

export default LoginScreen;