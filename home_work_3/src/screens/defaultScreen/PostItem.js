import React, {Component} from 'react';

const thisCallback = (itemId, callback) => {

    callback && itemId && callback(itemId);
};

const PostItem = ({commentId, comment, createdAt, login, callback}) => (
    <div
        style={{marginTop: 10, padding: 10,borderBottomColor: 'gray', borderBottomWidth: 3, borderBottomStyle: 'dotted'}}
        onClick={() => callback(commentId)}
    >
        <pre>
            <p>{comment}</p>
        </pre>
        <p>Дата публикации : <span>{createdAt}</span></p>
        <p>Автор : <span>{login}</span></p>
    </div>
);


export const MyPosts = ({commentId, comment, createdAt, userId, onDell, onUpdate}) => (
    <div
        style={{marginTop: 10, padding: 10,borderBottomColor: 'gray', borderBottomWidth: 3, borderBottomStyle: 'dotted'}}
    >
        <pre>
            <p>{comment}</p>
        </pre>
            <p>Дата публикации : <span>{createdAt}</span></p>
        <p
            onClick={() => onDell(commentId, userId)}
            style={{cursor:'pointer'}}

        >Удалить</p>
        <p
            onClick={() => onUpdate(commentId, comment)}
            style={{cursor:'pointer'}}

        >Изменить</p>
    </div>
);


export default PostItem;

