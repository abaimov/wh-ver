'use client';

import {useState} from 'react';

export default function Switcher() {
    const [isDeleteMode, setIsDeleteMode] = useState(false);

    const toggleMode = async () => {
        await fetch('/api/test', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                message: 'Petuh',
                users: ["550269978"],
                img: 'https://images.unsplash.com/photo-1445053023192-8d45cb66099d?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
            }),  // Отправляем новое состояние
        });
    };

    return (
        <div>
            <button onClick={toggleMode}>
                отправить
            </button>
        </div>
    );
}
