// app.js — логика для удаления карточки по ID (работает с локальным массивом)
// В реальной интеграции замени операции на fetch к API (DELETE /api/products/:id)

let cards = [
  { id: 1, name: "Платье", price: 49.99 },
  { id: 2, name: "Сумка", price: 29.50 },
  { id: 3, name: "Шарф", price: 14.00 },
  { id: 4, name: "Куртка", price: 89.00 }
];

const form = document.getElementById('delete-form');
const input = document.getElementById('delete-id');
const message = document.getElementById('message');
const cardList = document.getElementById('card-list');
const showAllBtn = document.getElementById('show-all');

function renderCards() {
  cardList.innerHTML = '';
  if (cards.length === 0) {
    cardList.innerHTML = '<p class="muted">Карточек пока нет.</p>';
    return;
  }
  cards.forEach(card => {
    const div = document.createElement('div');
    div.className = 'card';
    div.innerHTML = `
      <div class="id">ID: ${card.id}</div>
      <div class="name">${escapeHtml(card.name)}</div>
      <div class="price">Цена: ${Number(card.price).toFixed(2)} €</div>
    `;
    cardList.appendChild(div);
  });
}

function showMessage(text, type = 'info') {
  message.textContent = text;
  if (type === 'success') {
    message.style.color = getComputedStyle(document.documentElement).getPropertyValue('--success').trim() || 'green';
  } else if (type === 'error') {
    message.style.color = getComputedStyle(document.documentElement).getPropertyValue('--danger').trim() || 'red';
  } else {
    message.style.color = '';
  }
}

// Простая санитизация для вывода (чтобы избежать вставки HTML)
function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const idToDelete = Number(input.value);
  if (!Number.isInteger(idToDelete) || idToDelete <= 0) {
    showMessage('Введите корректный положительный ID.', 'error');
    return;
  }

  const index = cards.findIndex(c => c.id === idToDelete);
  if (index !== -1) {
    // Эмулируем удаление — в продакшне отправь DELETE-запрос к серверу
    const removed = cards.splice(index, 1)[0];
    renderCards();
    showMessage(`Карточка с ID ${idToDelete} (${removed.name}) успешно удалена.`, 'success');
  } else {
    showMessage(`Карточка с ID ${idToDelete} не найдена.`, 'error');
  }

  form.reset();
});

// Быстрая кнопка для перерисовки/показа карточек
showAllBtn.addEventListener('click', () => {
  renderCards();
  showMessage('Список обновлён.');
});

// Инициализация
renderCards();







// проверка на уникальность id, когда владелец сайта будет добавлять новую карточку

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const newId = Number(inputId.value);

  // проверка уникальности
  const exists = existingCards.some(card => card.id === newId);
  if (exists) {
    message.textContent = `ID ${newId} уже существует. Выберите другой.`;
    message.style.color = 'red';
    return;
  }

  // если уникальный — добавляем карточку
  existingCards.push({ id: newId, name: "Новый товар" });
  message.textContent = `Карточка с ID ${newId} успешно добавлена!`;
  message.style.color = 'green';
  form.reset();
});