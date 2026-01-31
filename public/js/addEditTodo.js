const todoModal = document.getElementById('createPostModal');
const form = document.getElementById('todoForm');
const titleEl = document.querySelector('.modal-title');
const submitBtn = document.getElementById('todoSubmitBtn');
const titleInput = document.getElementById('todoTitleInput');
const descriptionInput = document.getElementById('todoDescriptionInput');

todoModal.addEventListener('show.bs.modal', (e) => {
  const button = e.relatedTarget;

  // CREATE MODE
  if (!button?.dataset.id) {
    titleEl.textContent = 'Create todo';
    submitBtn.textContent = 'Create';
    form.action = '/submit';

    titleInput.value = '';
    descriptionInput.value = '';
    return;
  }

  // EDIT MODE
  titleEl.textContent = 'Edit todo';
  submitBtn.textContent = 'Save changes';
  form.action = `/edit/${button.dataset.id}`;

  titleInput.value = button.dataset.title;
  descriptionInput.value = button.dataset.text || '';
});
