import React, { useEffect } from 'react';
import { Field, Form, Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { addCategory, selectedCategoryToNull, stopToCreateCategory, updateCategory } from '../../actions/categories';


const CategoryForm = ({ category }) => {

    const dispatch = useDispatch();
    const categoriesState = useSelector(state => state.categories);
    const { categorySelected, startCreatingCategory } = categoriesState;

    const initialValues =
    {
        id: category.id,
        name: category.name,
        is_active: category.is_active,
        created_date: category.created_date,
        updated_date: category.updated_date
    }

    const submitForm = (values, { resetForm }) => {
        categorySelected
            ? dispatch(updateCategory(values, resetForm))
            : dispatch(addCategory(values, resetForm));
    };

    const validateForm = (values) => {
        let errors = {};
        if (!values.name) {
            errors.name = "El nombre es obligatorio.";
        }
        if ((values.is_active === null) || (values.is_active === '')) {
            errors.is_active = "El estado de la categoría es obligatorio.";
        }
        return errors;
    }

    const handleCancel = () => {
        dispatch(selectedCategoryToNull());
        dispatch(stopToCreateCategory());
    }
    
    useEffect(() => {
        return () => {
            dispatch(selectedCategoryToNull());
            dispatch(stopToCreateCategory());
        }
    }, [dispatch])

    return (
        <>
            {
                startCreatingCategory ?
                    <h1>Nueva categoría</h1> : <h1>Actualizar categoría</h1>
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
                        values
                    } = formik;
                    return (
                        <Form className="p-5 p-sm-3">
                            <div className="row mb-2">
                                <div className="col-10">
                                    <label htmlFor="name">Nombre categoría</label>
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
                            <div className="mb-2">
                                <div className="d-grid gap-2">
                                    <button
                                        type="submit"
                                        className={`btn pointer btn-outline-primary ${isValid ? "" : "disabled-btn"}`}
                                    >
                                        {categorySelected ? 'Actualizar' : 'Registrar'}
                                    </button>
                                    {
                                        ((categorySelected !== null) || (startCreatingCategory)) &&
                                        <button
                                            className="btn pointer btn-outline-danger"
                                            onClick={handleCancel}
                                            type="button">
                                            Cancelar
                                        </button>
                                    }
                                </div>
                            </div>
                        </Form>
                    );
                }}
            </Formik>
        </>)
}

export default CategoryForm;
