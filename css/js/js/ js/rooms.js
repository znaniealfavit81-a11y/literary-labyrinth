// Функция для проверки прогресса квеста
function checkQuestProgress() {
    const questStarted = localStorage.getItem('questStarted');
    const currentRoom = localStorage.getItem('currentRoom') || '1';
    
    if (!questStarted) {
        window.location.href = 'index.html';
        return false;
    }
    
    return true;
}

// Функция для перехода к следующей комнате
function goToNextRoom(currentRoom) {
    const nextRoom = parseInt(currentRoom) + 1;
    localStorage.setItem('currentRoom', nextRoom.toString());
    
    // Перенаправляем на следующую комнату
    window.location.href = `room${nextRoom}.html`;
}

// Функция для отображения прогресса
function updateProgress() {
    const currentRoom = localStorage.getItem('currentRoom') || '1';
    const progressPercent = (parseInt(currentRoom) - 1) * 10;
    
    const progressBar = document.querySelector('.progress-fill');
    if (progressBar) {
        progressBar.style.width = `${progressPercent}%`;
    }
    
    const progressText = document.querySelector('.progress p');
    if (progressText) {
        progressText.textContent = `Прогресс: ${currentRoom} из 10 комнат`;
    }
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    // Проверяем, запущен ли квест
    if (!window.location.pathname.endsWith('index.html') && 
        !window.location.pathname.endsWith('prolog.html')) {
        if (!checkQuestProgress()) {
            return;
        }
    }
    
    // Обновляем прогресс на страницах комнат
    if (window.location.pathname.includes('room')) {
        updateProgress();
    }
    
    // Добавляем обработчики для кнопок "Далее" в комнатах
    const nextRoomButtons = document.querySelectorAll('.next-room-btn');
    nextRoomButtons.forEach(button => {
        button.addEventListener('click', function() {
            const currentRoom = localStorage.getItem('currentRoom') || '1';
            goToNextRoom(currentRoom);
        });
    });
});
