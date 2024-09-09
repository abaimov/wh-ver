// app/lib/globalState.ts

let isDeleteMode = false;  // Глобальное состояние

// Функция для изменения состояния
export function setDeleteMode(value: boolean) {
    isDeleteMode = value;
}

// Функция для получения текущего состояния
export function getDeleteMode() {
    return isDeleteMode;
}
