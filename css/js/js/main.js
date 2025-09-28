// Функция для старта квеста
function startQuest() {
    localStorage.setItem('questStarted', 'true');
    localStorage.setItem('currentRoom', '1');
    localStorage.setItem('correctAnswers', '0');
    localStorage.setItem('totalQuestions', '0');
    
    window.location.href = 'room1.html';
}

// Функция для показа дополнительной информации
function showMoreInfo() {
    document.getElementById('more-info').classList.remove('hidden');
}

// Функция для проверки пазла
function checkPuzzle() {
    const slots = document.querySelectorAll('.puzzle-slot');
    let isCorrect = true;
    
    // Проверяем правильный порядок
    const correctOrder = [
        "Иван находит лягушку",
        "Лягушка превращается в Василису",
        "Кощей похищает Василису",
        "Иван спасает Василису"
    ];
    
    for (let i = 0; i < slots.length; i++) {
        const item = slots[i].querySelector('.puzzle-item');
        if (!item || item.textContent.trim() !== correctOrder[i]) {
            isCorrect = false;
            break;
        }
    }
    
    const resultElement = document.getElementById('puzzle-result');
    
    if (isCorrect) {
        resultElement.textContent = 'Отлично! Вы правильно собрали сюжет сказки!';
        resultElement.className = 'result success';
        
        // Увеличиваем счетчик правильных ответов
        let correct = parseInt(localStorage.getItem('correctAnswers') || '0');
        localStorage.setItem('correctAnswers', (correct + 1).toString());
    } else {
        resultElement.textContent = 'Попробуйте еще раз. Подумайте о правильном порядке событий.';
        resultElement.className = 'result error';
    }
}

// Функция для проверки викторины
function checkQuiz() {
    const selected = document.querySelector('input[name="hero"]:checked').value;
    const resultElement = document.getElementById('quiz-result');
    
    if (selected === 'ivan-peasant') {
        resultElement.textContent = 'Верно! Иван-крестьянский сын победил Чудо-юдо!';
        resultElement.className = 'result success';
        
        // Увеличиваем счетчик правильных ответов
        let correct = parseInt(localStorage.getItem('correctAnswers') || '0');
        localStorage.setItem('correctAnswers', (correct + 1).toString());
    } else {
        resultElement.textContent = 'Неверно. Вспомните, кто из героев победил Чудо-юдо.';
        resultElement.className = 'result error';
    }
}

// Функция для проверки "Правда или вымысел"
function checkTF(taskId, isCorrect) {
    const resultElement = document.getElementById(`tf-result-${taskId}`);
    
    if (isCorrect) {
        resultElement.textContent = 'Верно!';
        resultElement.className = 'result success';
        
        // Увеличиваем счетчик правильных ответов
        let correct = parseInt(localStorage.getItem('correctAnswers') || '0');
        localStorage.setItem('correctAnswers', (correct + 1).toString());
    } else {
        resultElement.textContent = 'Неверно. Подумайте еще раз.';
        resultElement.className = 'result error';
    }
    
    // Проверяем, выполнены ли все задания в комнате
    checkRoomCompletion();
}

// Проверка завершения комнаты
function checkRoomCompletion() {
    const puzzleResult = document.getElementById('puzzle-result').classList.contains('success');
    const quizResult = document.getElementById('quiz-result').classList.contains('success');
    const tf1Result = document.getElementById('tf-result-1').classList.contains('success');
    const tf2Result = document.getElementById('tf-result-2').classList.contains('success');
    
    if (puzzleResult && quizResult && tf1Result && tf2Result) {
        document.getElementById('room-complete').classList.remove('hidden');
    }
}

// Генерация сертификата
function generateCertificate() {
    const studentName = document.getElementById('student-name').value;
    
    if (!studentName) {
        alert('Пожалуйста, введите ваше имя');
        return;
    }
    
    // Здесь можно добавить логику сохранения результата
    document.getElementById('share-options').classList.remove('hidden');
    
    // Обновляем текст в сертификате
    document.querySelector('.student-name input').value = studentName;
}

// Печать сертификата
function printCertificate() {
    window.print();
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    // Добавляем обработчики перетаскивания для пазлов
    const puzzleItems = document.querySelectorAll('.puzzle-item');
    const puzzleSlots = document.querySelectorAll('.puzzle-slot');
    
    puzzleItems.forEach(item => {
        item.addEventListener('dragstart', function(e) {
            e.dataTransfer.setData('text/plain', this.textContent);
            this.classList.add('dragging');
        });
        
        item.addEventListener('dragend', function() {
            this.classList.remove('dragging');
        });
    });
    
    puzzleSlots.forEach(slot => {
        slot.addEventListener('dragover', function(e) {
            e.preventDefault();
        });
        
        slot.addEventListener('drop', function(e) {
            e.preventDefault();
            const data = e.dataTransfer.getData('text/plain');
            
            // Очищаем слот
            this.innerHTML = '';
            
            // Создаем новый элемент
            const newItem = document.createElement('div');
            newItem.className = 'puzzle-item';
            newItem.draggable = true;
            newItem.textContent = data;
            
            // Добавляем обработчики для нового элемента
            newItem.addEventListener('dragstart', function(e) {
                e.dataTransfer.setData('text/plain', this.textContent);
                this.classList.add('dragging');
            });
            
            newItem.addEventListener('dragend', function() {
                this.classList.remove('dragging');
            });
            
            this.appendChild(newItem);
        });
    });
    
    // Проверяем, завершена ли комната (для комнаты 1)
    if (window.location.pathname.endsWith('room1.html')) {
        checkRoomCompletion();
    }
});
