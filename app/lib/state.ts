// app/lib/state.ts

let isDeleteMode = false;

// Функция для изменения режима
export function setDeleteMode(value: boolean) {
    isDeleteMode = value;
    console.log('Delete mode set to:', value);  // Логируем изменения
}

// Функция для получения текущего режима
export function getDeleteMode() {
    return isDeleteMode;
}
