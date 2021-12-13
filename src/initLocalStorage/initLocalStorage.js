import { types } from "../types/types";

import { initAdmin } from './constUsers';
import { posts } from './constPosts';
import { category } from './constCategories';


// Cargar usuario administrador en localStorage
(() => {
    const lclStrgUsers = JSON.parse(localStorage.getItem(types.usersLocalStorage)) || [];
    if (lclStrgUsers.length > 0) {
        const admin = lclStrgUsers.filter(user => user.email?.toLowerCase() === 'admin@admin.com')[0];
        if (admin) {
            if (!admin.is_active) {
                const lclStrgWithOutAdmin = lclStrgUsers.filter(user => user.email.toLowerCase() !== 'admin@admin.com');
                admin.is_active = true;
                lclStrgWithOutAdmin.push(admin);
                localStorage.setItem(types.usersLocalStorage, JSON.stringify(lclStrgWithOutAdmin));
                return;
            }
        } else {
            lclStrgUsers.push(initAdmin);
        }
    } else {
        lclStrgUsers.push(initAdmin);
    }
    localStorage.setItem(types.usersLocalStorage, JSON.stringify(lclStrgUsers));
})();

// Cargar categoría en localStorage
(() => {
    const lclStrgCategories = JSON.parse(localStorage.getItem(types.categoriesLocalStorage)) || [];
    if (lclStrgCategories.length > 0) {
        const movies = lclStrgCategories.filter(cat => cat.name?.toLowerCase() === 'películas')[0];
        if (movies) {
            if (!movies.is_active) {
                const lclStrgWithOutMovie = lclStrgCategories.filter(cat => cat.name.toLowerCase() !== 'películas');
                movies.is_active = true;
                lclStrgWithOutMovie.push(movies);
                localStorage.setItem(types.categoriesLocalStorage, JSON.stringify(lclStrgWithOutMovie))
                return;
            }
        } else {
            lclStrgCategories.push(category)
        }
    } else {
        lclStrgCategories.push(category)
    }
    localStorage.setItem(types.categoriesLocalStorage, JSON.stringify(lclStrgCategories))
})();

// Cargar posts en localStorage
(() => {
    const lclStrgPosts = JSON.parse(localStorage.getItem(types.postsLocalStorage)) || [];
    if (lclStrgPosts.length === 0) {
        localStorage.setItem(types.postsLocalStorage, JSON.stringify(posts));
        return;
    }
    localStorage.setItem(types.postsLocalStorage, JSON.stringify(lclStrgPosts))
})();

window.onbeforeunload = () => {
    return '';
}