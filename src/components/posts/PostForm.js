import React, { useEffect } from 'react';
import { Field, Form, Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { addPost, selectedPostToNull, selectPostCategoryToNull, updatePost } from '../../actions/posts';
import { convertToSlug, extractCharacters } from '../../helpers/helpers';

import './posts.scss';


const PostForm = ({ post }) => {

    const dispatch = useDispatch();
    const postsState = useSelector(state => state.posts);
    const authRedux = useSelector(state => state.auth);
    const { postSelected, posts } = postsState;


    const initialValues =
    {
        id: post.id,
        category_id: postsState.categoryPostSelected.id,
        user_id: authRedux.id,
        title: post.title,
        slug: post.slug,
        short_text: post.short_text,
        long_text: post.long_text,
        image: post.image,
        likes: post.likes,
        dislikes: post.dislikes,
        commentaries: post.commentaries,
        is_active: post.is_active,
        created_date: post.created_date,
        updated_date: post.updated_date
    }

    const submitForm = (values, { resetForm }) => {
        postSelected
            ? dispatch(updatePost(values, posts, resetForm))
            : dispatch(addPost(values, posts, resetForm));
    };

    const validateForm = (values) => {
        let errors = {};
        if (!values.title) {
            errors.title = "El title es obligatorio.";
        }
        if (!postSelected && !values.slug) {
            errors.slug = "La URL es obligatoria.";
        } else if (!postSelected && posts?.length > 0 && posts.filter(post => post.slug === values.slug)[0]) {
            errors.slug = "Ya existe esta URL.";
        }
        if (!values.short_text) {
            errors.short_text = "El texto corto es obligatorio.";
        } else if (values.short_text.length > 150) {
            errors.short_text = "El texto corto debe tener máximo 150 caracteres.";
        }
        if (!values.long_text) {
            errors.long_text = "El texto largo es obligatorio";
        } else if (values.long_text.length > 1000) {
            errors.short_text = "El contenido debe tener máximo 1000 caracteres.";
        }
        if (values.is_active !== true && values.is_active !== false) {
            errors.is_active = "El estado es obligatorio";
        }
        return errors;
    }

    const slugSuggested = (e, slugValue, setFieldValue) => {
        if (slugValue.trim().length === 0) {
            setFieldValue('slug', convertToSlug(e.target.value))
        }
    }

    const shorTextSuggested = (e, shortTextValue, setFieldValue) => {
        if (shortTextValue.trim().length === 0) {
            setFieldValue('short_text', extractCharacters(e.target.value, 150))
        }
    }

    const handleCancel = () => {
        dispatch(selectPostCategoryToNull());
        dispatch(selectedPostToNull());
    }

    useEffect(() => {
        return () => {
            dispatch(selectPostCategoryToNull());
            dispatch(selectedPostToNull());
        }
    }, [dispatch])

    return (

        <>
            {
                post.id === '' ?
                    <h1>Nuevo post</h1> : <h1>Actualizar post</h1>
            }
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
                        handleBlur,
                        values,
                        setFieldValue
                    } = formik;
                    return (
                        <Form>
                            <div className="form-switch p-0 m-0 mb-2 d-flex justify-content-between align-items-end">
                                <p className="">
                                    Categoría seleccionada: <b>{postsState.categoryPostSelected.name}</b>
                                </p>
                                <div className="d-flex flex-column align-items-end">
                                    <label htmlFor="is_active" className="p-0">{values.is_active ? 'Activo' : 'Inactivo'}</label>
                                    <Field className="form-check-input pointer p-0" type="checkbox" role="switch" id="is_active" name="is_active" />

                                    {errors.is_active && touched.is_active && (
                                        <span className="fs-8">{errors.is_active}</span>
                                    )}
                                </div>
                            </div>
                            <div className="row m-0 mb-2">
                                <div className="col col-sm-7 ps-0 pe-2">
                                    <label htmlFor="name" className="p-0">Título</label>
                                    <Field
                                        type="text"
                                        name="title"
                                        id="title"
                                        placeholder="Título"
                                        onBlur={(e) => { handleBlur(e); slugSuggested(e, values.slug, setFieldValue) }}
                                        className={`form-control form-control-sm ${errors.title && touched.title ?
                                            "border-error" : null}`}
                                    />
                                    {errors.title && touched.title && (
                                        <span className="fs-8">{errors.title}</span>
                                    )}
                                </div>
                                <div className="col col-sm-5 p-0">
                                    <label htmlFor="email" className="p-0">URL amigable</label>
                                    <Field
                                        type="text"
                                        name="slug"
                                        id="slug"
                                        placeholder="Slug"
                                        className={`form-control form-control-sm ${errors.slug && touched.slug ?
                                            "border-error" : null}`}
                                    />
                                    {errors.slug && touched.slug && (
                                        <span className="fs-8">{errors.slug}</span>
                                    )}
                                </div>

                            </div>
                            <div className="row m-0 mb-2">
                                <label htmlFor="long_text" className="p-0">Contenido</label>
                                <Field
                                    as="textarea"
                                    name="long_text"
                                    id="long_text"
                                    placeholder="Contenido"
                                    maxLength="1000"
                                    onBlur={(e) => { handleBlur(e); shorTextSuggested(e, values.short_text, setFieldValue) }}
                                    className={`content-textarea resize-none form-control form-control-sm ${errors.long_text && touched.long_text ?
                                        "border-error" : null}`}
                                />
                                {errors.long_text && touched.long_text && (
                                    <span className="fs-8">{errors.long_text}</span>
                                )}
                            </div>
                            <div className="row m-0 mb-2">
                                <label htmlFor="short_text" className="p-0">Texto corto</label>
                                <Field
                                    as="textarea"
                                    name="short_text"
                                    id="short_text"
                                    placeholder="Texto corto"
                                    maxLength="150"
                                    className={`shortText-textarea resize-none form-control form-control-sm ${errors.short_text && touched.short_text ?
                                        "border-error" : null}`}
                                />
                                {errors.short_text && touched.short_text && (
                                    <span className="fs-8">{errors.short_text}</span>
                                )}
                            </div>
                            <div className="row m-0 mb-2">
                                <label htmlFor="image" className="p-0">Imagen</label>
                                <input id="image" className="p-0" name="image" type="file" accept="image/*" multiple={false} onChange={(event) => {
                                    setFieldValue('image', URL.createObjectURL(event.currentTarget.files[0]));
                                }} />
                                {errors.image && touched.image && (
                                    <span className="fs-8">{errors.image}</span>
                                )}
                            </div>
                            <div className="d-grid gap-2 row m-0 mb-2">
                                <button
                                    type="submit"
                                    className={`btn pointer btn-outline-primary ${isValid ? "" : "disabled-btn"}`}
                                // disabled={!isValid}
                                >
                                    {postSelected ? 'Actualizar' : 'Registrar'}
                                </button>
                                <button
                                    type="button"
                                    className="btn pointer btn-outline-danger"
                                    onClick={handleCancel}>
                                    Cancelar
                                </button>
                            </div>
                        </Form>
                    );
                }}
            </Formik >
        </>

    )
}

export default PostForm;