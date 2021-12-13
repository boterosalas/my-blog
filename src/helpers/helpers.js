import _ from "lodash";
export const extractCharacters = (text, limit) => {
    if (text.length <= limit) {
        return text;
    } else {
        return `${text.substring(0, limit - 3)}...`;
    }
}

export const convertToSlug = (text) => {
    return text.toLowerCase().trim()
        .replace(/ /g, '-')
        .replace(/[^\w-]+/g, '');
}

export const getMoreSimilarPosts = (currentPost, posts, category, categories) => {
    const postsActiveSameCategory = posts.filter(post => (post.category_id === category.id) && (post.id !== currentPost.id) && (post.is_active));
    const activeCategories = categories.filter(cat => cat.is_active);
    const postsActiveCategory = postsActiveSameCategory.filter(post => {
        const currentCategory = activeCategories.filter(cat => cat.id === post.category_id)[0];
        if (currentCategory.is_active) return true;
        return false;
    });
    if (postsActiveCategory.length >= 3) {
        return postsActiveCategory.slice(0, 5);
    } else {
        const postsActiveNoneCategory = posts.filter(post => (post.id !== currentPost.id) && (post.is_active));
        const postsActiveWithOutCategory = postsActiveNoneCategory.filter(post => {
            const currentCategory = activeCategories.filter(cat => cat.id === post.category_id)[0];
            if (currentCategory.is_active) return true;
            return false;
        });
        return postsActiveWithOutCategory.slice(0, 5);
    }
}

export const getPostsMostVoted = (posts) => {
    let activePosts = JSON.parse(JSON.stringify(posts.filter(post => post.is_active)));
    const highs = [];
    for (let i = 0; i <= 2; i++) {
        const high = _.maxBy(activePosts, function (post) {
            return post.likes.length > 0 ? post : null;
        })
        if (high) {
            highs[i] = high;
            activePosts = activePosts.filter(post => post.id !== highs[i].id);
        }
    }
    return highs.filter(post => post);
}