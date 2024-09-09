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
            body: JSON.stringify({message: 'Petuh',users:["550269978"],img:'https://upload.wikimedia.org/wikipedia/ru/b/bb/%D0%9E%D0%B1%D0%BB%D0%BE%D0%B6%D0%BA%D0%B0_%D0%BA%D0%BE%D0%BC%D0%BF%D1%8C%D1%8E%D1%82%D0%B5%D1%80%D0%BD%D0%BE%D0%B9_%D0%B8%D0%B3%D1%80%D1%8B_Cyberpunk_2077.jpg'}),  // Отправляем новое состояние
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
