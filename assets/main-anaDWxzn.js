(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const l of r.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&a(l)}).observe(document,{childList:!0,subtree:!0});function i(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(e){if(e.ep)return;e.ep=!0;const r=i(e);fetch(e.href,r)}})();const m="966531149549",d=[{title:"معصوب",items:[{id:"masoobi",name:"معصوبي",en:"Masoobi",price:14,cal:837},{id:"malaki",name:"ملكي",en:"Malaki",price:13,cal:744},{id:"areekah",name:"عريكة",en:"Areekah",price:12,cal:628},{id:"aburasha",name:"معصوب (أبو رشة)",en:"Masoob (Aburasha)",price:16,cal:923},{id:"feast",name:"وليمة",en:"Feast",price:36,cal:1884}]},{title:"مطبق",items:[{id:"chicken-cheese",name:"دجاج جبن",en:"Chicken, Cheese",price:12,cal:572},{id:"cheddar-veg",name:"خضار شيدر",en:"Cheddar, Vegetable",price:9,cal:490},{id:"oman",name:"بطاطس عمان",en:"Oman Potato",price:9,cal:330},{id:"hungarian",name:"هنغاري",en:"Hungarian",price:8,cal:417},{id:"cream-cheese",name:"جبن سائل",en:"Cream Cheese",price:8,cal:330},{id:"veg",name:"خضار",en:"Vegetable",price:7,cal:317},{id:"box",name:"بوكس",en:"Box",price:35,cal:1709}]},{title:"الإضافات",items:[{id:"cashew",name:"كاجو",en:"Cashew",price:2},{id:"cornflakes",name:"كورنفلكس",en:"Cornflakes",price:2}]},{title:"المشروبات",items:[{id:"karak",name:"كرك",en:"Karak",price:4,cal:122},{id:"soft",name:"مشروبات غازية",en:"Soft Drinks",price:3,cal:150}]}],o=Object.fromEntries(d.flatMap(n=>n.items).map(n=>[n.id,n])),s={},c=document.getElementById("menu-root");c.innerHTML=d.map(n=>`
  <div>
    <h3 class="mb-4 inline-block rounded-lg bg-brand px-4 py-1 text-2xl font-black text-neutral-900">${n.title}</h3>
    <div class="grid gap-3 md:grid-cols-2">
      ${n.items.map(t=>`
        <div class="flex items-center justify-between gap-3 rounded-2xl border border-neutral-200 p-4">
          <div>
            <p class="text-lg font-bold">${t.name}</p>
            <p class="text-sm text-neutral-500">${t.en}${t.cal?` · ${t.cal.toLocaleString("ar-SA")} سعرة`:""}</p>
          </div>
          <div class="flex items-center gap-3">
            <span class="text-xl font-black">${t.price} <span class="text-sm font-semibold">ر.س</span></span>
            <div class="flex items-center gap-2">
              <button data-minus="${t.id}" class="hidden h-9 w-9 rounded-full border-2 border-neutral-900 text-xl font-bold leading-none" aria-label="إنقاص">−</button>
              <span data-qty="${t.id}" class="hidden w-5 text-center font-bold">0</span>
              <button data-plus="${t.id}" class="h-9 w-9 rounded-full bg-neutral-900 text-xl font-bold leading-none text-brand" aria-label="إضافة">+</button>
            </div>
          </div>
        </div>`).join("")}
    </div>
  </div>`).join("");function u(){let n=0,t=0;for(const i in o){const a=s[i]||0;n+=a,t+=a*o[i].price;const e=c.querySelector(`[data-qty="${i}"]`),r=c.querySelector(`[data-minus="${i}"]`);e.textContent=a,e.classList.toggle("hidden",a===0),r.classList.toggle("hidden",a===0)}document.getElementById("cart-count").textContent=n,document.getElementById("cart-total").textContent=t,document.getElementById("cart-bar").classList.toggle("hidden",n===0)}c.addEventListener("click",n=>{const t=n.target.closest("[data-plus]"),i=n.target.closest("[data-minus]");t&&(s[t.dataset.plus]=(s[t.dataset.plus]||0)+1),i&&(s[i.dataset.minus]=Math.max(0,(s[i.dataset.minus]||0)-1)),(t||i)&&u()});document.getElementById("send-order").addEventListener("click",()=>{const n=Object.entries(s).filter(([,a])=>a>0).map(([a,e])=>`- ${o[a].name} × ${e} = ${e*o[a].price} ريال`),t=Object.entries(s).reduce((a,[e,r])=>a+r*o[e].price,0),i=`السلام عليكم، أبي أطلب من معصوبي:

${n.join(`
`)}

المجموع: ${t} ريال`;window.open(`https://wa.me/${m}?text=${encodeURIComponent(i)}`,"_blank")});document.querySelectorAll("[data-year]").forEach(n=>n.textContent=String(new Date().getFullYear()));
