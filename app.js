// Презентация инженер ПТО - JavaScript функциональность

// Глобальные переменные
let currentSlide = 1;
const totalSlides = 10;
let currentQuestion = 1;
let userAnswers = [];
let quizScore = 0;

// Данные расширенной викторины (5 вопросов)
const quizData = [
    {
        question: "Какое образование требуется для работы инженером ПТО?",
        options: [
            "Только высшее техническое",
            "Высшее или среднее профессиональное + опыт работы",
            "Любое высшее образование", 
            "Достаточно курсов повышения квалификации"
        ],
        correct: 1,
        explanation: "По профстандарту требуется высшее техническое образование или среднее профессиональное с опытом работы от 3 лет, либо переподготовка."
    },
    {
        question: "Что НЕ входит в обязанности инженера ПТО?",
        options: [
            "Составление смет",
            "Контроль качества работ", 
            "Непосредственное выполнение строительных работ",
            "Ведение исполнительной документации"
        ],
        correct: 2,
        explanation: "Инженер ПТО занимается планированием, контролем и документооборотом, но не выполняет строительные работы непосредственно."
    },
    {
        question: "Какая средняя зарплата инженера ПТО в Москве?",
        options: [
            "50-80 тысяч рублей",
            "100-300 тысяч рублей",
            "30-50 тысяч рублей",
            "500+ тысяч рублей"
        ],
        correct: 1,
        explanation: "В Москве инженеры ПТО зарабатывают от 100 до 300 тысяч рублей в зависимости от опыта и квалификации."
    },
    {
        question: "Как ИИ помогает инженеру ПТО в работе?",
        options: [
            "Автоматизация расчетов и проверка документов",
            "Прогнозирование рисков и оптимизация планов",
            "Анализ данных с датчиков на стройке",
            "Все вышеперечисленное"
        ],
        correct: 3,
        explanation: "Искусственный интеллект помогает современному инженеру ПТО во всех аспектах работы - от автоматизации рутинных задач до продвинутой аналитики."
    },
    {
        question: "Почему инженеру ПТО важно постоянно учиться?",
        options: [
            "Изменения в нормативной базе и технологиях",
            "Появление новых материалов и методов строительства",
            "Цифровизация отрасли и новые инструменты", 
            "Все вышеперечисленное"
        ],
        correct: 3,
        explanation: "Строительная отрасль постоянно развивается - меняются нормы, технологии, материалы. Инженер ПТО должен быть в курсе всех новшеств."
    }
];

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    updateProgressBar();
    setupEventListeners();
    setupInteractiveElements();
    console.log('Расширенная презентация "Профессия инженер ПТО" загружена успешно!');
});

// Настройка слушателей событий
function setupEventListeners() {
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const homeBtn = document.getElementById('home-btn');
    
    if (prevBtn) {
        prevBtn.addEventListener('click', function(e) {
            e.preventDefault();
            prevSlide();
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', function(e) {
            e.preventDefault();
            nextSlide();
        });
    }
    
    if (homeBtn) {
        homeBtn.addEventListener('click', function(e) {
            e.preventDefault();
            goToStart();
        });
    }
}

// Настройка интерактивных элементов
function setupInteractiveElements() {
    // Настройка кликов для задач (Слайд 3)
    const taskCards = document.querySelectorAll('.interactive-task');
    taskCards.forEach((card, index) => {
        card.addEventListener('click', function() {
            const detailIds = ['smety-details', 'planning-details', 'docs-details', 'control-details', 'coordination-details'];
            if (detailIds[index]) {
                toggleTaskDetails(detailIds[index]);
            }
        });
    });

    // Настройка кликов для временной шкалы (Слайд 4)
    const timelineItems = document.querySelectorAll('.timeline-item.expandable');
    timelineItems.forEach(item => {
        item.addEventListener('click', function() {
            toggleDetail(this);
        });
    });

    // Настройка кликов для коллег (Слайд 5)
    const colleagueCards = document.querySelectorAll('.interactive-colleague');
    colleagueCards.forEach((card, index) => {
        card.addEventListener('click', function() {
            const detailIds = ['prorab-details', 'smetchik-details', 'proekt-details', 'zakazchik-details', 'nadzor-details'];
            if (detailIds[index]) {
                toggleColleagueDetails(detailIds[index]);
            }
        });
    });

    // Настройка кликов для навыков (Слайд 6)
    const skillCategories = document.querySelectorAll('.skill-category');
    skillCategories.forEach((category, index) => {
        category.addEventListener('click', function() {
            const detailIds = ['technical-skills', 'analytical-skills', 'communication-skills', 'personal-skills', 'digital-skills'];
            if (detailIds[index]) {
                toggleSkillDetails(detailIds[index]);
            }
        });
    });

    // Настройка кликов для карьерной лестницы (Слайд 9)
    const careerSteps = document.querySelectorAll('.interactive-step');
    careerSteps.forEach((step, index) => {
        step.addEventListener('click', function() {
            const detailIds = ['step-7', 'step-6', 'step-5', 'step-4', 'step-3', 'step-2', 'step-1'];
            if (detailIds[index]) {
                toggleCareerDetails(detailIds[index]);
            }
        });
    });
}

// Начать презентацию - ИСПРАВЛЕНО
function startPresentation() {
    console.log('Starting presentation...');
    currentSlide = 2;
    showSlide(currentSlide);
    updateProgressBar();
    showNavigation();
}

// Показать текущий слайд
function showSlide(slideNumber) {
    console.log('Showing slide:', slideNumber);
    // Скрыть все слайды
    const slides = document.querySelectorAll('.slide');
    slides.forEach(slide => slide.classList.remove('active'));
    
    // Показать нужный слайд
    const targetSlide = document.getElementById(`slide-${slideNumber}`);
    if (targetSlide) {
        targetSlide.classList.add('active');
    }
    
    // Обновить навигацию
    updateNavigation();
}

// Следующий слайд
function nextSlide() {
    if (currentSlide < totalSlides) {
        currentSlide++;
        showSlide(currentSlide);
        updateProgressBar();
    }
}

// Предыдущий слайд
function prevSlide() {
    if (currentSlide > 1) {
        currentSlide--;
        showSlide(currentSlide);
        updateProgressBar();
    }
}

// Вернуться в начало
function goToStart() {
    currentSlide = 1;
    showSlide(currentSlide);
    updateProgressBar();
    hideNavigation();
    resetPresentation();
}

// Показать навигацию
function showNavigation() {
    const navigation = document.querySelector('.navigation');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const homeBtn = document.getElementById('home-btn');
    
    if (navigation) navigation.style.display = 'flex';
    if (prevBtn) prevBtn.style.display = 'inline-flex';
    if (nextBtn) nextBtn.style.display = 'inline-flex';
    if (homeBtn) homeBtn.style.display = 'inline-flex';
}

// Скрыть навигацию
function hideNavigation() {
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const homeBtn = document.getElementById('home-btn');
    
    if (prevBtn) prevBtn.style.display = 'none';
    if (nextBtn) nextBtn.style.display = 'none';
    if (homeBtn) homeBtn.style.display = 'none';
}

// Обновить состояние навигации
function updateNavigation() {
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    
    if (prevBtn) {
        prevBtn.style.display = currentSlide > 1 ? 'inline-flex' : 'none';
    }
    
    if (nextBtn) {
        if (currentSlide === totalSlides) {
            nextBtn.style.display = 'none';
        } else {
            nextBtn.style.display = 'inline-flex';
        }
    }
}

// Обновить прогресс-бар
function updateProgressBar() {
    const progressFill = document.getElementById('progress-fill');
    const progressText = document.getElementById('progress-text');
    
    const percentage = (currentSlide / totalSlides) * 100;
    
    if (progressFill) {
        progressFill.style.width = `${percentage}%`;
    }
    
    if (progressText) {
        progressText.textContent = `${currentSlide} / ${totalSlides}`;
    }
}

// Показать/скрыть детали - ИСПРАВЛЕНО
function showDetails(elementId) {
    console.log('Showing details for:', elementId);
    const element = document.getElementById(elementId);
    if (element) {
        if (element.classList.contains('hidden')) {
            element.classList.remove('hidden');
        } else {
            element.classList.add('hidden');
        }
    } else {
        console.log('Element not found:', elementId);
    }
}

// Переключить детали задач (Слайд 3) - ИСПРАВЛЕНО
function toggleTaskDetails(detailId) {
    console.log('Toggling task details:', detailId);
    const detailElement = document.getElementById(detailId);
    if (detailElement) {
        if (detailElement.classList.contains('hidden')) {
            // Скрыть все другие детали задач
            const allTaskDetails = document.querySelectorAll('.task-details');
            allTaskDetails.forEach(detail => detail.classList.add('hidden'));
            
            // Показать выбранную деталь
            detailElement.classList.remove('hidden');
        } else {
            detailElement.classList.add('hidden');
        }
    } else {
        console.log('Task detail element not found:', detailId);
    }
}

// Показать структуру отдела - ИСПРАВЛЕНО
function showDepartmentStructure() {
    console.log('Showing department structure...');
    const structure = document.getElementById('department-structure');
    if (structure) {
        structure.classList.remove('hidden');
        
        // Также настроить клики для карточек коллег если еще не настроены
        setTimeout(() => {
            const colleagueCards = document.querySelectorAll('.interactive-colleague');
            colleagueCards.forEach((card, index) => {
                const detailIds = ['prorab-details', 'smetchik-details', 'proekt-details', 'zakazchik-details', 'nadzor-details'];
                card.onclick = function() {
                    if (detailIds[index]) {
                        toggleColleagueDetails(detailIds[index]);
                    }
                };
            });
        }, 100);
    } else {
        console.log('Department structure element not found');
    }
}

// Переключить детали коллег (Слайд 5) - ИСПРАВЛЕНО
function toggleColleagueDetails(detailId) {
    console.log('Toggling colleague details:', detailId);
    const detailElement = document.getElementById(detailId);
    if (detailElement) {
        if (detailElement.classList.contains('hidden')) {
            // Скрыть все другие детали коллег
            const allColleagueDetails = document.querySelectorAll('.colleague-details');
            allColleagueDetails.forEach(detail => detail.classList.add('hidden'));
            
            // Показать выбранную деталь
            detailElement.classList.remove('hidden');
        } else {
            detailElement.classList.add('hidden');
        }
    } else {
        console.log('Colleague detail element not found:', detailId);
    }
}

// Переключить детали навыков (Слайд 6) - ИСПРАВЛЕНО
function toggleSkillDetails(detailId) {
    console.log('Toggling skill details:', detailId);
    const detailElement = document.getElementById(detailId);
    if (detailElement) {
        if (detailElement.classList.contains('hidden')) {
            // Скрыть все другие детали навыков
            const allSkillDetails = document.querySelectorAll('.skill-details');
            allSkillDetails.forEach(detail => detail.classList.add('hidden'));
            
            // Показать выбранную деталь
            detailElement.classList.remove('hidden');
        } else {
            detailElement.classList.add('hidden');
        }
    } else {
        console.log('Skill detail element not found:', detailId);
    }
}

// Переключить детали карьерной лестницы (Слайд 9) - ИСПРАВЛЕНО
function toggleCareerDetails(detailId) {
    console.log('Toggling career details:', detailId);
    const detailElement = document.getElementById(detailId);
    if (detailElement) {
        if (detailElement.classList.contains('hidden')) {
            // Скрыть все другие детали карьеры
            const allCareerDetails = document.querySelectorAll('.career-details');
            allCareerDetails.forEach(detail => detail.classList.add('hidden'));
            
            // Показать выбранную деталь
            detailElement.classList.remove('hidden');
        } else {
            detailElement.classList.add('hidden');
        }
    } else {
        console.log('Career detail element not found:', detailId);
    }
}

// Переключить детали в timeline - ИСПРАВЛЕНО
function toggleDetail(element) {
    console.log('Toggling timeline detail...');
    if (element) {
        element.classList.toggle('expanded');
    }
}

// Выбор образования в опросе
function selectEducation(choice) {
    // Убрать выделение с других кнопок в конкретном разделе
    const slideButtons = document.querySelectorAll('#slide-7 .survey-btn');
    slideButtons.forEach(btn => btn.classList.remove('selected'));
    
    // Выделить выбранную кнопку
    const clickedButton = event.target;
    clickedButton.classList.add('selected');
    
    // Показать результат
    const resultDiv = document.getElementById('education-result');
    let message = '';
    
    switch(choice) {
        case 'higher':
            message = '🎓 Отличный выбор! Высшее техническое образование - прямой путь в профессию.';
            break;
        case 'middle':
            message = '📚 Хорошая база! С опытом работы вы сможете расти в профессии.';
            break;
        case 'courses':
            message = '🚀 Курсы переподготовки - быстрый способ войти в профессию!';
            break;
        case 'other':
            message = '🤔 Рассмотрите возможность получения профильного образования или курсов.';
            break;
    }
    
    if (resultDiv) {
        resultDiv.textContent = message;
        resultDiv.classList.remove('hidden');
    }
}

// Выбор приоритета в опросе
function selectPriority(choice) {
    // Убрать выделение с других кнопок в конкретном разделе
    const slideButtons = document.querySelectorAll('#slide-8 .survey-btn');
    slideButtons.forEach(btn => btn.classList.remove('selected'));
    
    // Выделить выбранную кнопку
    const clickedButton = event.target;
    clickedButton.classList.add('selected');
    
    // Показать результат
    const resultDiv = document.getElementById('priority-result');
    let message = '';
    
    switch(choice) {
        case 'stability':
            message = '💼 Профессия инженера ПТО обеспечивает стабильную работу в растущей отрасли!';
            break;
        case 'growth':
            message = '📈 В строительстве много возможностей для карьерного роста - от инженера до директора!';
            break;
        case 'projects':
            message = '🏗️ Каждый объект уникален - скучать не придётся!';
            break;
    }
    
    if (resultDiv) {
        resultDiv.textContent = message;
        resultDiv.classList.remove('hidden');
    }
}

// Выбор ответа в викторине - ИСПРАВЛЕНО
function selectAnswer(questionNum, answerIndex) {
    console.log('Selecting answer:', questionNum, answerIndex);
    const question = quizData[questionNum - 1];
    const isCorrect = answerIndex === question.correct;
    
    // Сохранить ответ пользователя
    userAnswers[questionNum - 1] = {
        selected: answerIndex,
        correct: isCorrect
    };
    
    // Пересчитать счет
    quizScore = userAnswers.filter(answer => answer && answer.correct).length;
    
    // Выделить кнопки
    const options = document.querySelectorAll(`#question-${questionNum} .quiz-option`);
    options.forEach((option, index) => {
        option.classList.remove('correct', 'incorrect');
        if (index === question.correct) {
            option.classList.add('correct');
        } else if (index === answerIndex && !isCorrect) {
            option.classList.add('incorrect');
        }
        option.disabled = true;
    });
    
    // Показать объяснение
    const explanation = document.getElementById(`explanation-${questionNum}`);
    if (explanation) {
        explanation.textContent = question.explanation;
        explanation.classList.remove('hidden');
    }
    
    // Обновить кнопки навигации викторины
    updateQuizNavigation();
}

// Следующий вопрос викторины - ИСПРАВЛЕНО
function nextQuestion() {
    console.log('Next question, current:', currentQuestion, 'total:', quizData.length);
    if (currentQuestion < quizData.length) {
        // Скрыть текущий вопрос
        const currentQuestionElement = document.getElementById(`question-${currentQuestion}`);
        if (currentQuestionElement) {
            currentQuestionElement.classList.remove('active');
        }
        
        // Показать следующий вопрос
        currentQuestion++;
        const nextQuestionElement = document.getElementById(`question-${currentQuestion}`);
        if (nextQuestionElement) {
            nextQuestionElement.classList.add('active');
        }
        
        updateQuizNavigation();
    }
}

// Предыдущий вопрос викторины - ИСПРАВЛЕНО
function prevQuestion() {
    console.log('Previous question, current:', currentQuestion);
    if (currentQuestion > 1) {
        // Скрыть текущий вопрос
        const currentQuestionElement = document.getElementById(`question-${currentQuestion}`);
        if (currentQuestionElement) {
            currentQuestionElement.classList.remove('active');
        }
        
        // Показать предыдущий вопрос
        currentQuestion--;
        const prevQuestionElement = document.getElementById(`question-${currentQuestion}`);
        if (prevQuestionElement) {
            prevQuestionElement.classList.add('active');
        }
        
        updateQuizNavigation();
    }
}

// Обновить навигацию викторины - ИСПРАВЛЕНО
function updateQuizNavigation() {
    console.log('Updating quiz navigation, current question:', currentQuestion);
    const prevQuestionBtn = document.getElementById('prev-question');
    const nextQuestionBtn = document.getElementById('next-question');
    const showResultsBtn = document.getElementById('show-results');
    
    // Показать/скрыть кнопку "Предыдущий"
    if (prevQuestionBtn) {
        prevQuestionBtn.style.display = currentQuestion > 1 ? 'inline-flex' : 'none';
    }
    
    // Показать/скрыть кнопки в зависимости от текущего вопроса
    if (currentQuestion === quizData.length) {
        // Последний вопрос
        if (nextQuestionBtn) nextQuestionBtn.style.display = 'none';
        if (showResultsBtn) showResultsBtn.style.display = 'inline-flex';
    } else {
        // Не последний вопрос
        if (nextQuestionBtn) nextQuestionBtn.style.display = 'inline-flex';
        if (showResultsBtn) showResultsBtn.style.display = 'none';
    }
}

// Показать результаты викторины - ИСПРАВЛЕНО
function showResults() {
    console.log('Showing quiz results, score:', quizScore, 'total:', quizData.length);
    
    // Скрыть вопросы и навигацию
    const questions = document.querySelectorAll('.quiz-question');
    questions.forEach(q => q.classList.remove('active'));
    
    const controls = document.querySelector('.quiz-controls');
    if (controls) controls.style.display = 'none';
    
    // Показать результаты
    const resultsDiv = document.getElementById('quiz-results');
    const scoreDiv = document.getElementById('final-score');
    const messageDiv = document.getElementById('result-message');
    
    if (resultsDiv) {
        resultsDiv.classList.remove('hidden');
        resultsDiv.style.display = 'block';
    }
    
    if (scoreDiv) {
        scoreDiv.textContent = `${quizScore} из ${quizData.length}`;
    }
    
    if (messageDiv) {
        let message = '';
        const percentage = (quizScore / quizData.length) * 100;
        
        if (percentage === 100) {
            message = '🎉 Отлично! Вы отлично знаете профессию инженера ПТО! Готовы к работе в современной строительной отрасли!';
        } else if (percentage >= 80) {
            message = '👍 Очень хорошо! У вас отличные знания о профессии, включая современные тренды.';
        } else if (percentage >= 60) {
            message = '✅ Хорошо! У вас есть базовые знания о профессии, стоит изучить современные технологии.';
        } else {
            message = '📚 Рекомендуем изучить материал ещё раз, особенно про роль ИИ и важность обучения.';
        }
        
        messageDiv.textContent = message;
    }
}

// Перезапустить презентацию
function restartPresentation() {
    // Сбросить все переменные
    currentSlide = 1;
    currentQuestion = 1;
    userAnswers = [];
    quizScore = 0;
    
    // Перейти к первому слайду
    goToStart();
    
    // Сбросить состояние викторины
    resetQuiz();
    
    // Сбросить все интерактивные элементы
    resetInteractiveElements();
}

// Сбросить состояние презентации
function resetPresentation() {
    currentQuestion = 1;
    userAnswers = [];
    quizScore = 0;
    resetQuiz();
    resetInteractiveElements();
}

// Сбросить викторину
function resetQuiz() {
    currentQuestion = 1;
    
    // Сбросить состояние вопросов
    const questions = document.querySelectorAll('.quiz-question');
    questions.forEach((question, index) => {
        if (index === 0) {
            question.classList.add('active');
        } else {
            question.classList.remove('active');
        }
        
        // Сбросить состояние опций
        const options = question.querySelectorAll('.quiz-option');
        options.forEach(option => {
            option.classList.remove('correct', 'incorrect');
            option.disabled = false;
        });
        
        // Скрыть объяснения
        const explanation = question.querySelector('.quiz-explanation');
        if (explanation) explanation.classList.add('hidden');
    });
    
    // Сбросить результаты
    const results = document.getElementById('quiz-results');
    if (results) {
        results.classList.add('hidden');
        results.style.display = 'none';
    }
    
    // Показать навигацию викторины
    const controls = document.querySelector('.quiz-controls');
    if (controls) controls.style.display = 'flex';
    
    // Обновить навигацию
    updateQuizNavigation();
}

// Сбросить интерактивные элементы
function resetInteractiveElements() {
    // Скрыть все раскрывающиеся блоки
    const detailBlocks = document.querySelectorAll('.details-block');
    detailBlocks.forEach(block => block.classList.add('hidden'));
    
    // Скрыть все детали задач
    const taskDetails = document.querySelectorAll('.task-details');
    taskDetails.forEach(detail => detail.classList.add('hidden'));
    
    // Скрыть все детали коллег
    const colleagueDetails = document.querySelectorAll('.colleague-details');
    colleagueDetails.forEach(detail => detail.classList.add('hidden'));
    
    // Скрыть все детали навыков
    const skillDetails = document.querySelectorAll('.skill-details');
    skillDetails.forEach(detail => detail.classList.add('hidden'));
    
    // Скрыть все детали карьеры
    const careerDetails = document.querySelectorAll('.career-details');
    careerDetails.forEach(detail => detail.classList.add('hidden'));
    
    // Скрыть структуру отдела
    const structure = document.getElementById('department-structure');
    if (structure) structure.classList.add('hidden');
    
    // Сбросить timeline
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach(item => item.classList.remove('expanded'));
    
    // Сбросить опросы
    const surveyButtons = document.querySelectorAll('.survey-btn');
    surveyButtons.forEach(btn => btn.classList.remove('selected'));
    
    const surveyResults = document.querySelectorAll('.survey-result');
    surveyResults.forEach(result => result.classList.add('hidden'));
}

// Клавиатурная навигация
document.addEventListener('keydown', function(event) {
    if (currentSlide !== 10) { // Не на слайде с тестом
        switch(event.key) {
            case 'ArrowRight':
            case ' ':
                event.preventDefault();
                if (currentSlide < totalSlides) {
                    nextSlide();
                }
                break;
            case 'ArrowLeft':
                event.preventDefault();
                if (currentSlide > 1) {
                    prevSlide();
                }
                break;
            case 'Home':
                event.preventDefault();
                goToStart();
                break;
            case 'Escape':
                event.preventDefault();
                // Скрыть все открытые детали
                const allDetails = document.querySelectorAll('.details-block, .task-details, .colleague-details, .skill-details, .career-details');
                allDetails.forEach(detail => detail.classList.add('hidden'));
                break;
        }
    } else {
        // На слайде с тестом
        switch(event.key) {
            case 'ArrowRight':
                event.preventDefault();
                if (currentQuestion < quizData.length) {
                    nextQuestion();
                } else {
                    showResults();
                }
                break;
            case 'ArrowLeft':
                event.preventDefault();
                if (currentQuestion > 1) {
                    prevQuestion();
                }
                break;
            case 'Enter':
                event.preventDefault();
                const showResultsBtn = document.getElementById('show-results');
                if (showResultsBtn && showResultsBtn.style.display !== 'none') {
                    showResults();
                }
                break;
        }
    }
});

// Глобальная функция для кнопки в HTML
window.startPresentation = startPresentation;
window.showDetails = showDetails;
window.showDepartmentStructure = showDepartmentStructure;
window.toggleDetail = toggleDetail;
window.selectEducation = selectEducation;
window.selectPriority = selectPriority;
window.selectAnswer = selectAnswer;
window.nextQuestion = nextQuestion;
window.prevQuestion = prevQuestion;
window.showResults = showResults;
window.restartPresentation = restartPresentation;

console.log('Расширенная презентация "Профессия инженер ПТО" с исправленной интерактивностью загружена успешно!');