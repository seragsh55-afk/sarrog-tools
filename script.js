let index = 0;
function moveSlide(step){const slides=document.getElementById('slides'); if(!slides) return; index=(index+step+3)%3; slides.style.transform=`translateX(${index*100}%)`;}
setInterval(()=>moveSlide(1), 4000);
function toggleTheme(){const b=document.body; b.dataset.theme=b.dataset.theme==='light'?'':'light'; localStorage.setItem('theme', b.dataset.theme);}
window.onload=()=>{const s=localStorage.getItem('theme'); if(s) document.body.dataset.theme=s; renderCustomTools();}

const toolsDB=[
  {name:"مولد النصوص AI", page:"tools.html", icon:"🤖", desc:"اكتب مقالات"},
  {name:"مولد الصور", page:"tools.html", icon:"🖼️", desc:"حول النص لصورة"},
  {name:"ChatGPT", page:"ai.html", icon:"✍️", desc:"للكتابة"},
];

function renderCustomTools(){
  let custom=JSON.parse(localStorage.getItem('sarrog_custom_tools')||'[]');
  custom.forEach(t=>{
    let grid=document.querySelector(`body:has(a[href="${t.page}"]).tools-grid`) || document.querySelectorAll('.tools-grid')[0];
    // نضيفها في كل الشبكات اللي في صفحتها
    document.querySelectorAll('.tools-grid').forEach(g=>{
        // تحقق بسيط لو الصفحة الحالية هي نفسها
        if(window.location.href.includes(t.page) || (t.page==='tools.html' && window.location.href.includes('tools'))){
            const card=document.createElement('div'); card.className='tool-card';
            card.innerHTML=`<div class="tool-icon">${t.icon}</div><h3>${t.name}</h3><p>${t.desc}</p><a href="${t.link}" style="color:var(--accent)">فتح</a>`;
            g.appendChild(card);
        }
    });
  });
}
function searchTools(){const input=document.getElementById('searchInput').value.toLowerCase(); const results=document.getElementById('searchResults'); results.innerHTML=""; if(input.length<2){results.style.display="none"; return;}
let all=[...toolsDB,...JSON.parse(localStorage.getItem('sarrog_custom_tools')||'[]')];
const filtered=all.filter(t=>t.name.toLowerCase().includes(input));
if(filtered.length>0){filtered.forEach(t=>{results.innerHTML+=`<div class="search-item" onclick="window.location='${t.page}'">${t.icon} ${t.name}</div>`;}); results.style.display="block";} else {results.innerHTML=`<div class="search-item">لا توجد نتائج</div>`; results.style.display="block";}}
