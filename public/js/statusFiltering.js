document.querySelectorAll('.dropdown-item').forEach(item => {
  item.addEventListener('click', e => {
    e.preventDefault();

    const status = item.dataset.status;
    const params = new URLSearchParams(window.location.search);

    if (status) {
      params.set('status', status);
    } else {
      params.delete('status');
    }

    window.location.href = `/posts?${params.toString()}`;
  });
});