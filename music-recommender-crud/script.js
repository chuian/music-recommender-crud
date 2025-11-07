async function fetchUsers() {
  const res = await fetch('/api/users');
  const data = await res.json();
  const list = document.getElementById('userList');
  list.innerHTML = data.users.map(u => `<p><strong>${u.name}</strong> - ${u.genre} - ${u.mood}</p>`).join('');
}

document.getElementById('tasteForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const body = {
    name: document.getElementById('name').value,
    genre: document.getElementById('genre').value,
    mood: document.getElementById('mood').value,
    vibe: document.getElementById('vibe').value,
    loudness: document.getElementById('loudness').value,
    favoriteTrack: document.getElementById('favoriteTrack').value,
  };

  const res = await fetch('/api/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  const recommend = await fetch(`/api/recommend?genre=${body.genre}`);
  const songs = await recommend.json();

  document.getElementById('recommendations').innerHTML =
    '<h3>Recommended Tracks:</h3>' +
    songs.tracks.map(t => `<p>🎵 ${t}</p>`).join('');

  fetchUsers();
});

fetchUsers();
