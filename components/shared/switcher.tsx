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
            body: JSON.stringify({message: 'Petuh',users:["550269978"]}),  // Отправляем новое состояние
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
