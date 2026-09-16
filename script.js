let index = 0;
function moveSlide(step){const slides = document.getElementById('slides'); if(!slides) return;
index = (index + step + 3) % 3; slides.style.transform = `translateX(${index * 100}%)`;}
setInterval(()=>moveSlide(1), 4000);

function toggleTheme(){const body = document.body; body.dataset.theme = body.dataset.theme === 'light' ? '' : 'light';
localStorage.setItem('theme', body.dataset.theme);}
window.onload = () => {const saved = localStorage.getItem('theme'); if(saved) document.body.dataset.theme = saved;}

const toolsDB = [
  {name: "مولد النصوص AI", page: "tools.html", icon: "🤖"},
  {name: "مولد الصور", page: "tools.html", icon: "🖼️"},
  {name: "ChatGPT", page: "ai.html", icon: "✍️"},
  {name: "Midjourney", page: "ai.html", icon: "🎨"},
  {name: "قالب موقع شخصي", page: "projects.html", icon: "📦"}
];
function searchTools(){const input = document.getElementById('searchInput').value.toLowerCase(); const results = document.getElementById('searchResults');
results.innerHTML = ""; if(input.length < 2){ results.style.display = "none"; return; }
const filtered = toolsDB.filter(t => t.name.toLowerCase().includes(input));
if(filtered.length > 0){filtered.forEach(t => {results.innerHTML += `<div class="search-item" onclick="window.location='${t.page}'">${t.icon} ${t.name}</div>`;});
results.style.display = "block";} else {results.innerHTML = `<div class="search-item">لا توجد نتائج</div>`; results.style.display = "block";}}