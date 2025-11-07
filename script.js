async function fetchUsers() {
  const res = await fetch('/api/users');
  const users = await res.json();
  const tbody = document.querySelector('#userTable tbody');
  tbody.innerHTML = '';
  users.forEach(user => {
    const row = `<tr>
      <td>${user.name}</td>
      <td>${user.genre}</td>
      <td>${user.mood}</td>
      <td>${user.vibe}</td>
      <td>${user.loudness}</td>
      <td>${user.favoriteTrack}</td>
    </tr>`;
    tbody.insertAdjacentHTML('beforeend', row);
  });
}

document.querySelector('#musicForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const data = {
    name: document.getElementById('name').value,
    genre: document.getElementById('genre').value,
    mood: document.getElementById('mood').value,
    vibe: document.getElementById('vibe').value,
    loudness: document.getElementById('loudness').value,
    favoriteTrack: document.getElementById('favoriteTrack').value
  };
  await fetch('/api/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  document.getElementById('musicForm').reset();
  fetchUsers();
});

fetchUsers();
