'use client';

import { useState } from 'react';

export default function Switcher() {
    const [isDeleteMode, setIsDeleteMode] = useState(false);

    const toggleMode = async () => {
        const newMode = !isDeleteMode;
        setIsDeleteMode(newMode);

        // Отправляем команду на сервер для переключения режима
        await fetch('/api/test', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ value: newMode }),  // Отправляем новое состояние
        });
    };

    return (
        <div>
            <h1>{isDeleteMode ? 'Режим SUPER' : 'Режим HEELLLLLL'}</h1>
            <button onClick={toggleMode}>
                Переключить режим
            </button>
        </div>
    );
}
