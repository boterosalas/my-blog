import React from 'react';
import MostVotedPosts from './MostVotedPosts';

import './home.scss'

const Home = () => {
    return (
        <>
            <h1>Bienvenido a MyBlog</h1>
            <p>Este es un espacio para compartir ideas con otros usuarios por medio de posts que puedes crear al entrar a la
                sección de posts desde arriba en el menú.
            </p>
            <p>También puedes comentar un post publicado por otro usuario o darle like/dislike y hacerle saber lo que piensas acerca de su post. Procura
                manejar un lenguaje moderado para evitar discusiones en los comentarios. Igualmente recuerda que puedes administrar
                los posts que tú mism@ subes por si en algún momento quieres desactivarlo para que otros usuarios no lo puedan ver
                ni comentar.
            </p>
            <div className="row">
                <div className="col-8">
                    <MostVotedPosts />
                </div>
            </div>
        </>
    )
}

export default Home
