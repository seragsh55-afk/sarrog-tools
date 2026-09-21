// ads-loader.js - عرض الإعلانات والتسويق في الرئيسية
fetch('settings.json?v='+Date.now()).then(r=>r.json()).then(s=>{
 if(!s) return;
 // دالة مساعدة لإضافة بنر
 const addBanner=(img,link,code,selector,before=true)=>{
   if(!img &&!code) return;
   const div=document.createElement('div');
   div.className='dynamic-ad';
   div.style.cssText='max-width:1100px;margin:16px auto;text-align:center;animation:fadeIn.5s';
   if(code) div.innerHTML=code;
   else div.innerHTML=`<a href="${link||'#'}" target="_blank"><img src="${img}" style="max-width:100%;border-radius:12px;box-shadow:0 4px 15px rgba(0,0,0,.3);max-height:150px;object-fit:cover"></a>`;
   const ref=document.querySelector(selector);
   if(ref) before? ref.before(div) : ref.after(div);
 };

 // 1. علوي
 if(s.topAdStatus==='show') addBanner(s.topAdImgData,s.topAdLink,s.topAdCode,'.hero,.slider, header','afterend');
 // 2. وسطي
 if(s.midAdStatus==='show') addBanner(s.midAdImgData,s.midAdLink,s.midAdCode,'#tools-container, #tools','afterend');
 // 3. سفلي
 if(s.bottomAdStatus==='show') addBanner(s.bottomAdImgData,s.bottomAdLink,'','footer','beforebegin');

 // بنر تسويقي
 if(s.marketingStatus==='show' && s.marketingTitle){
   const m=document.createElement('section');
   m.style.cssText=`max-width:1100px;margin:20px auto;padding:30px;border-radius:16px;text-align:center;color:#fff;background:${s.marketingImgData?`url(${s.marketingImgData}) center/cover`:'linear-gradient(135deg,#4aa8ff,#7c3aed)'};position:relative;overflow:hidden`;
   m.innerHTML=`<div style="position:relative;z-index:2"><h2 style="margin:0 0 8px;font-size:24px">${s.marketingTitle}</h2><p style="opacity:.9">${s.marketingDesc||''}</p>${s.marketingBtnText?`<a href="${s.marketingBtnLink||'#'}" target="_blank" style="display:inline-block;background:#fff;color:#000;padding:12px 24px;border-radius:25px;text-decoration:none;margin-top:12px;font-weight:700">${s.marketingBtnText}</a>`:''}</div>`;
   document.querySelector('#tools-container, #tools')?.before(m);
 }

 // بوب اب
 if(s.popupStatus==='show'){
   setTimeout(()=>{
     const pop=document.createElement('div');
     pop.style.cssText='position:fixed;inset:0;background:rgba(0,0,0,.7);display:flex;align-items:center;justify-content:center;z-index:99999;padding:20px;backdrop-filter:blur(3px)';
     pop.innerHTML=`<div style="background:#171a21;padding:22px;border-radius:16px;max-width:380px;text-align:center;position:relative;border:1px solid #232733">
       <span onclick="this.parentElement.parentElement.remove()" style="position:absolute;top:8px;right:12px;cursor:pointer;font-size:22px">✖</span>
       ${s.popupImgData?`<img src="${s.popupImgData}" style="max-width:100%;border-radius:10px;margin-bottom:10px">`:''}
       <h3 style="margin:10px 0">${s.popupText||'عرض خاص!'}</h3>
       ${s.popupLink?`<a href="${s.popupLink}" target="_blank" style="display:block;background:var(--accent,#4aa8ff);color:#fff;padding:12px;border-radius:10px;text-decoration:none;margin-top:12px;font-weight:700">فتح العرض 🚀</a>`:''}
     </div>`;
     document.body.appendChild(pop);
   },(parseInt(s.popupDelay)||3)*1000);
 }

 // AdSense عام
 if(s.adsenseCode){
   const d=document.createElement('div');
   d.innerHTML=s.adsenseCode;
   document.head.appendChild(d);
 }

 // تطبيق بيانات التواصل
 if(s.email){ document.querySelectorAll('a[href^="mailto:"]').forEach(a=>{a.href='mailto:'+s.email; a.textContent='📧 '+s.email;}); }
 if(s.phone){ document.querySelectorAll('a[href^="tel:"]').forEach(a=>{a.href='tel:'+s.phone; a.textContent='📞 '+s.phone;}); }
 if(s.footerText){ const c=document.querySelector('.copy, footer p'); if(c) c.textContent=s.footerText; }
 if(s.logo){ document.querySelectorAll('.brand img,.logo img').forEach(img=>img.src=s.logo); }
}).catch(()=>{});