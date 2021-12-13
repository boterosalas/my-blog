import React from 'react'
import { Field, Form, Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { createCommentary, startToCreateCommentary, stopToCreateCommentary } from '../../actions/commentaries';

const CommentaryForm = ({ postId }) => {

    const dispatch = useDispatch();
    const authState = useSelector(state => state.auth);
    const postsState = useSelector(state => state.posts);
    const { creatingCommentary, posts } = postsState;

    const initialValues =
    {
        id: '',
        commentary: '',
        user_id: authState.id,
        is_active: true,
        created_date: '',
        updated_date: ''
    }

    const submitForm = (values, { resetForm }) => {
        creatingCommentary
            ? dispatch(createCommentary(values, posts, postId, resetForm))
            : dispatch(createCommentary(values, resetForm));
    };

    const validateForm = (values) => {
        let errors = {};
        if (!values.commentary || values.commentary.trim() === '') {
            errors.commentary = "El comentario no puede estar vacío.";
        }
        return errors;
    }

    const handleCancel = () => {
        dispatch(stopToCreateCommentary());
    }

    const handleCommentary = () => {
        dispatch(startToCreateCommentary());
    }


    return (
        <div className="row">
            {!creatingCommentary &&
                <div className="text-end">
                    <button type="button" className="btn btn-primary btn-sm" onClick={() => handleCommentary()}>
                        <i className="fas fa-plus-square"></i>
                    </button>
                </div>
            }
            {creatingCommentary &&
                <Formik
                    initialValues={initialValues}
                    validate={validateForm}
                    onSubmit={submitForm}
                    enableReinitialize="true"
                    validateOnMount="true"
                >
                    {(formik) => {
                        const {
                            errors,
                            touched,
                            isValid,
                            // values
                        } = formik;
                        // console.log(values);
                        return (
                            <Form className="p-2">
                                <div className="row mb-2">
                                    <div className="col">
                                        <Field
                                            as="textarea"
                                            name="commentary"
                                            id="commentary"
                                            placeholder="Escribe tu comentario"
                                            maxLength="1000"
                                            className={`form-control form-control-sm resize-none ${errors.commentary && touched.commentary ?
                                                "border-error" : null}`}
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
                                        Añadir
                                    </button>
                                </div>
                            </Form>
                        );
                    }}
                </Formik>
            }
        </div>
    )
}

export default CommentaryForm
