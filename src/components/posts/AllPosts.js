import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectPost, selectPostCategory } from '../../actions/posts';
import { types } from '../../types/types';
import { selectCategoryAlert } from './selectCategoryAlert';

import './posts.scss';

const AllPosts = () => {

    const dispatch = useDispatch();
    const postsState = useSelector(state => state.posts);
    const { posts } = postsState;
    const categoriesState = useSelector(state => state.categories);
    const { categories } = categoriesState;
    const authState = useSelector(state => state.auth);
    const [postsToDisplay, setPostsToDisplay] = useState([]);
    const navigate = useNavigate();

    const getCategoryNameById = (id) => {
        const category = categories.filter(cat => cat.id === id)[0];
        return category.name;
    }

    useEffect(() => {
        const postsWithActiveCategory = posts.filter(post => {
            const category = categories.filter(cat => cat.id === post.category_id)[0];
            if (category && category.is_active) {
                return post;
            }
            return false;
        });
        const postsActives = postsWithActiveCategory.filter(post => (post.is_active) || (authState.id === post.user_id));
        setPostsToDisplay(postsActives);
    }, [posts, categories, authState])


    const redirectToDetail = (slug) => {
        navigate(slug)
    }

    const getCategoryById = (id) => {
        const lclStrg = JSON.parse(localStorage.getItem(types.categoriesLocalStorage));
        return lclStrg.filter(category => parseInt(category.id) === parseInt(id))[0];
    }

    const getUserById = (id) => {
        const lclStrg = JSON.parse(localStorage.getItem(types.usersLocalStorage));
        return lclStrg.filter(user => parseInt(user.id) === parseInt(id))[0];
    }

    const handleEdit = (post) => {
        const category = getCategoryById(post.category_id);
        dispatch(selectPostCategory(category));
        dispatch(selectPost(post));
    }

    const handleChangeCategory = (catId) => {
        let postsActives;
        const postsWithActiveCategory = posts.filter(post => {
            const category = categories.filter(cat => cat.id === post.category_id)[0];
            if (category && category.is_active) {
                return post;
            }
            return false;
        });
        if (catId !== 'null') {
            postsActives = postsWithActiveCategory.filter(post => (parseInt(post.category_id) === parseInt(catId)) && ((post.is_active) || (authState.id === post.user_id)));
        } else {
            postsActives = postsWithActiveCategory.filter(post => (post.is_active) || (authState.id === post.user_id));
        }
        setPostsToDisplay(postsActives);

    }

    const getActiveCategories = (cats) => {
        return cats.filter(cat => cat.is_active);
    }

    return (
        <>
            <div className="d-flex justify-content-between align-items-end mb-3">
                <h1>Posts</h1>
                <button className="btn btn-primary" type="button" onClick={() => selectCategoryAlert(getActiveCategories(categories), dispatch)}>Nuevo</button>
            </div>
            <p className="mb-0">
                En este espacio puedes encontrar todos los posts creados por todos los usuarios incluyendo los tuyos. En los posts que tú
                creaste vas a encontrar un ícono de lápiz al poner el cursor sobre el post (efecto :hover), puedes hacer click sobre este ícono para editar tu post.
            </p>
            <p className="mb-0">
                Cuando un post esté desactivado solo podrá verlo quien haya creado ese post y tendrá un aviso de color rojo especificando que el post está desactivado.
            </p>
            <p className="mb-0">
                Puedes utilizar el desplegable para filtrar los posts por categoría y puedes crear un nuevo post haciendo click en el botón 'NUEVO' en la parte superior a la derecha.
            </p>
            <div className="row justify-content-end mt-5">
                <div className="col-6 text-end">
                    <label htmlFor="select-category">Filtrar por categoría:</label>
                    <select name="select-category" id="select-category" className="form-select" aria-label="Default select example" onChange={(e) => handleChangeCategory(e.target.value)}>
                        <option value="null">Todas</option>
                        {
                            categories.map(category => {
                                return (
                                    category.is_active && <option key={category.id} value={category.id}>{category.name}</option>
                                )
                            })
                        }
                    </select>
                </div>
            </div>
            <hr />
            <div className="d-flex flex-row flex-wrap align-items-start justify-content-around mt-3">
                {
                    postsToDisplay?.length > 0 && postsToDisplay.map(post => {
                        return (
                            <div className="card mb-3 me-2" style={{ 'maxWidth': '520px' }} key={post.id}>
                                <div className="row g-0">
                                    <div className="col-md-4">
                                        <img src={post.image} onError={(e) => { e.target.onerror = null; e.target.src = 'https://www.fabricocina.com/wp-content/uploads/2018/06/image_large.png' }} className="rounded-start post-image" onClick={post.is_active ? () => { redirectToDetail(post.slug) } : undefined} alt={post.title} />
                                    </div>
                                    <div className="col-md-8 pencil-container d-flex flex-column justify-content-between">
                                        {(authState.id === post.user_id) && <i className="fas fa-pencil-alt edit-pencil" onClick={() => handleEdit(post)}></i>}
                                        <div>
                                            <div className="card-body">
                                                <h5 className="card-title mb-0 pb-0">
                                                    <span className="pointer" onClick={post.is_active ? () => { redirectToDetail(post.slug) } : undefined}>{post.title}</span>
                                                </h5>
                                                {!post.is_active && <p className="m-0 p-0 category-text italic text-danger">Post desactivo</p>}
                                                <p className="mt-0 pt-0 category-text">{getCategoryNameById(post.category_id)}</p>
                                                <p className="card-text">{post.short_text}</p>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="d-flex justify-content-between align-items-end px-3 mb-3">
                                                <div>
                                                    <p className="m-0"><small className="text-muted">Última actualización: <span className="italic">{post.updated_date}</span></small></p>
                                                    <p className="m-0"><small className="text-muted">Creado por: <span className="italic">{getUserById(post.user_id).name}</span></small></p>
                                                </div>
                                                <div className="d-flex">
                                                    <div className="d-flex flex-column">
                                                        <i className={`fa-thumbs-down far fa-sm ${post.dislikes.includes(authState.id) ? 'fas' : 'far'}`}></i>
                                                        <span>{post.dislikes.length}</span>
                                                    </div>
                                                    <div className="d-flex flex-column ms-3">
                                                        <i className={`fa-thumbs-up far fa-sm ${post.likes.includes(authState.id) ? 'fas' : 'far'}`}></i>
                                                        <span>{post.likes.length}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}

export default AllPosts
