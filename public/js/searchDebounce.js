const input = document.getElementById('searchInput');

let timeout;

input.addEventListener('input', () => {
  clearTimeout(timeout);

  timeout = setTimeout(() => {
    const value = input.value.trim();
    const params = new URLSearchParams(window.location.search);

    if (value) {
      params.set('q', value);
    } else {
      params.delete('q');
    }

    window.location.href = `/?${params.toString()}`;
  }, 500);
});