function toggleTodo(id, isComplete) {
  const titleEl = document.querySelector(`.todo-title[data-id='${id}']`);

  if (titleEl) {
    titleEl.classList.toggle('todo-completed', isComplete);
  }

  fetch(`/posts/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ isComplete }),
  }).catch(err => {
    console.error('Failed to update todo', err);
  });
}