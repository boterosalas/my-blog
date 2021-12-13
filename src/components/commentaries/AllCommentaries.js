import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startToUpdateCommentary, stopToUpdateCommentary, updateCommentary } from '../../actions/commentaries';
import { Field, Form, Formik } from 'formik';

import './commentaries.scss';

const AllCommentaries = ({ commentariesToDisplay, currentPost }) => {

    const dispatch = useDispatch();
    const usersState = useSelector(state => state.users)
    const postsState = useSelector(state => state.posts)
    const authState = useSelector(state => state.auth)
    const { posts } = postsState;
    const { users } = usersState;
    const { editingCommentary } = postsState;


    const getUserNameById = (id) => {
        return users.filter(user => user.id === id)[0].name;
    }

    const handleEdit = (id) => {
        dispatch(startToUpdateCommentary(id));
    }

    const [initialValues, setInitialValues] = useState({
        id: '',
        commentary: '',
        user_id: 'authState.id',
        is_active: true,
        created_date: '',
        updated_date: ''
    })

    useEffect(() => {
        if (editingCommentary) {
            const currentCommentary = commentariesToDisplay.filter(com => com.id === editingCommentary)[0];
            setInitialValues(currentCommentary);
        }
    }, [editingCommentary, commentariesToDisplay])

    const submitForm = (values, { resetForm }) => {
        dispatch(updateCommentary(values, posts, currentPost.id, resetForm))
    };

    const validateForm = (values) => {
        let errors = {};
        if (!values.commentary || values.commentary.trim() === '') {
            errors.commentary = "El comentario no puede estar vacío.";
        }
        return errors;
    }

    const handleCancel = () => {
        dispatch(stopToUpdateCommentary())
    }

    return (
        <>
            <h4>Comentarios</h4>
            {
                commentariesToDisplay.map(commentary => {
                    return (
                        (editingCommentary === commentary.id)
                            ? <Formik
                                initialValues={initialValues}
                                validate={validateForm}
                                onSubmit={submitForm}
                                enableReinitialize="true"
                                validateOnMount="true"
                                key={commentary.id}
                            >
                                {(formik) => {
                                    const {
                                        errors,
                                        touched,
                                        isValid,
                                        values
                                    } = formik;
                                    // console.log(values);
                                    return (
                                        <Form className="p-2">
                                            <div className="form-switch p-0 m-0 mb-2 d-flex justify-content-end align-items-end">
                                                <div className="d-flex flex-column align-items-end">
                                                    <label htmlFor="is_active" className="p-0 fs-08">{values.is_active ? 'Activo' : 'Inactivo'}</label>
                                                    <Field className="form-check-input pointer p-0" type="checkbox" role="switch" id="is_active" name="is_active" />
                                                </div>
                                            </div>
                                            <div className="row mb-2">
                                                <div className="col">
                                                    <Field
                                                        as="textarea"
                                                        name="commentary"
                                                        id="commentary"
                                                        placeholder="Escribe tu comentario"
                                                        maxLength="1000"
                                                        className={`form-control form-control-sm textarea-commentary ${errors.commentary && touched.commentary ?
                                                            "border-error" : ''}`}
                                                    />
                                                    {errors.commentary && touched.commentary && (
                                                        <span className="fs-08">{errors.commentary}</span>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="d-flex justify-content-end">
                                                <button
                                                    className="btn pointer btn-outline-danger btn-sm me-1"
                                                    onClick={handleCancel}
                                                    type="button">
                                                    Cancelar
                                                </button>
                                                <button
                                                    type="submit"
                                                    className={`btn btn-sm pointer btn-outline-primary ${isValid ? "" : "disabled-btn"}`}
                                                >
                                                    Actualizar
                                                </button>
                                            </div>
                                        </Form>
                                    );
                                }}
                            </Formik>
                            : (commentary.is_active || (commentary.user_id === authState.id)) &&
                            <div className="row d-flex flex-column pencil-container" key={commentary.id}>
                                {(commentary.user_id === authState.id) && <i className="fas fa-pencil-alt edit-pencil commentary-pencil fa-sm" onClick={() => handleEdit(commentary.id)}></i>}
                                <p className={`p-0 pe-2 m-0 fs-08 ${commentary.is_active ? '' : 'text-muted'}`}>{commentary.commentary}</p>
                                {!commentary.is_active && <p className="p-0 pe-2 m-0 fs-07 text-danger">Comentario desactivado</p>}
                                <p className="text-end italic fs-07 p-0 m-0">{getUserNameById(commentary.user_id)}</p>
                                <hr />
                            </div>
                    )
                })
            }
        </>
    )
}

export default AllCommentaries
