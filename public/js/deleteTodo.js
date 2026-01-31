let todoId = null;
const deleteModal = document.getElementById('deleteConfirmModal');

deleteModal.addEventListener('show.bs.modal', (e) => {
  const button = e.relatedTarget;
  todoId = button.dataset.id;
});

document
  .getElementById('confirmDeleteBtn')
  .addEventListener('click', () => {
    if (!todoId) return;

    fetch(`/delete/${todoId}`, { method: 'DELETE' })
      .then(() => {
        window.location.href = '/';
      }).catch(err => {
        console.error('Failed to delete todo', err);
      });
  });