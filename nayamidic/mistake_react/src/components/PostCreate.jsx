import React, { useState } from 'react';
import { useContext } from 'react';
import { UserContext } from "./UserContext";

const getCookie = (name) => {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

const PostCreate = ({onClose}) => {
    const [categories, setCategories] = useState('');
    const [text, setText] = useState('');
    const { user_id } = useContext(UserContext)
    const csrftoken = getCookie('csrftoken');
    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('http://localhost:8000/mistake/post-create/', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken
            },
            body: JSON.stringify({ categories, text, "user":user_id })
        })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                alert(data.error)
            } else {
                alert(data.message)
            }
        });
    };

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <div style={{
                backgroundColor: '#fff',
                padding: '20px',
                borderRadius: '10px'
            }}>
                <button onClick={onClose}>X</button>
                <form onSubmit={handleSubmit}>
                    <label>
                        カテゴリ:
                        <select value={categories} onChange={e => setCategories(e.target.value)}>
                            <option value="">選択してください</option>
                            <option value="仕事">仕事</option>
                            <option value="学校">学校</option>
                            <option value="ギャンブル">ギャンブル</option>
                        </select>
                    </label>
                    <label>
                        テキスト:
                        <textarea 
                            value={text} 
                            onChange={e => setText(e.target.value)}
                            maxLength={150}
                            required
                        />
                    </label>
                    <button type="submit">投稿</button>
                </form>
            </div>
        </div>
    )}    

export default PostCreate;
