import "./style.css";

const WHATSAPP = "966531149549";

const MENU = [
  {
    title: "معصوب",
    items: [
      { id: "masoobi", name: "معصوبي", en: "Masoobi", price: 14, cal: 837 },
      { id: "malaki", name: "ملكي", en: "Malaki", price: 13, cal: 744 },
      { id: "areekah", name: "عريكة", en: "Areekah", price: 12, cal: 628 },
      { id: "aburasha", name: "معصوب (أبو رشة)", en: "Masoob (Aburasha)", price: 16, cal: 923 },
      { id: "feast", name: "وليمة", en: "Feast", price: 36, cal: 1884 },
    ],
  },
  {
    title: "مطبق",
    items: [
      { id: "chicken-cheese", name: "دجاج جبن", en: "Chicken, Cheese", price: 12, cal: 572 },
      { id: "cheddar-veg", name: "خضار شيدر", en: "Cheddar, Vegetable", price: 9, cal: 490 },
      { id: "oman", name: "بطاطس عمان", en: "Oman Potato", price: 9, cal: 330 },
      { id: "hungarian", name: "هنغاري", en: "Hungarian", price: 8, cal: 417 },
      { id: "cream-cheese", name: "جبن سائل", en: "Cream Cheese", price: 8, cal: 330 },
      { id: "veg", name: "خضار", en: "Vegetable", price: 7, cal: 317 },
      { id: "box", name: "بوكس", en: "Box", price: 35, cal: 1709 },
    ],
  },
  {
    title: "الإضافات",
    items: [
      { id: "cashew", name: "كاجو", en: "Cashew", price: 2 },
      { id: "cornflakes", name: "كورنفلكس", en: "Cornflakes", price: 2 },
    ],
  },
  {
    title: "المشروبات",
    items: [
      { id: "karak", name: "كرك", en: "Karak", price: 4, cal: 122 },
      { id: "soft", name: "مشروبات غازية", en: "Soft Drinks", price: 3, cal: 150 },
    ],
  },
];

const ALL = Object.fromEntries(MENU.flatMap((s) => s.items).map((i) => [i.id, i]));
const cart = {};

const root = document.getElementById("menu-root");
root.innerHTML = MENU.map(
  (sec) => `
  <div>
    <h3 class="mb-4 inline-block rounded-lg bg-brand px-4 py-1 text-2xl font-black text-neutral-900">${sec.title}</h3>
    <div class="grid gap-3 md:grid-cols-2">
      ${sec.items
        .map(
          (it) => `
        <div class="flex items-center justify-between gap-3 rounded-2xl border border-neutral-200 p-4">
          <div>
            <p class="text-lg font-bold">${it.name}</p>
            <p class="text-sm text-neutral-500">${it.en}${it.cal ? ` · ${it.cal.toLocaleString("ar-SA")} سعرة` : ""}</p>
          </div>
          <div class="flex items-center gap-3">
            <span class="text-xl font-black">${it.price} <span class="text-sm font-semibold">ر.س</span></span>
            <div class="flex items-center gap-2">
              <button data-minus="${it.id}" class="hidden h-9 w-9 rounded-full border-2 border-neutral-900 text-xl font-bold leading-none" aria-label="إنقاص">−</button>
              <span data-qty="${it.id}" class="hidden w-5 text-center font-bold">0</span>
              <button data-plus="${it.id}" class="h-9 w-9 rounded-full bg-neutral-900 text-xl font-bold leading-none text-brand" aria-label="إضافة">+</button>
            </div>
          </div>
        </div>`
        )
        .join("")}
    </div>
  </div>`
).join("");

function render() {
  let count = 0,
    total = 0;
  for (const id in ALL) {
    const q = cart[id] || 0;
    count += q;
    total += q * ALL[id].price;
    const qty = root.querySelector(`[data-qty="${id}"]`);
    const minus = root.querySelector(`[data-minus="${id}"]`);
    qty.textContent = q;
    qty.classList.toggle("hidden", q === 0);
    minus.classList.toggle("hidden", q === 0);
  }
  document.getElementById("cart-count").textContent = count;
  document.getElementById("cart-total").textContent = total;
  document.getElementById("cart-bar").classList.toggle("hidden", count === 0);
}

root.addEventListener("click", (e) => {
  const plus = e.target.closest("[data-plus]");
  const minus = e.target.closest("[data-minus]");
  if (plus) cart[plus.dataset.plus] = (cart[plus.dataset.plus] || 0) + 1;
  if (minus) cart[minus.dataset.minus] = Math.max(0, (cart[minus.dataset.minus] || 0) - 1);
  if (plus || minus) render();
});

document.getElementById("send-order").addEventListener("click", () => {
  const lines = Object.entries(cart)
    .filter(([, q]) => q > 0)
    .map(([id, q]) => `- ${ALL[id].name} × ${q} = ${q * ALL[id].price} ريال`);
  const total = Object.entries(cart).reduce((s, [id, q]) => s + q * ALL[id].price, 0);
  const msg = `السلام عليكم، أبي أطلب من معصوبي:\n\n${lines.join("\n")}\n\nالمجموع: ${total} ريال`;
  window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`, "_blank");
});

document.querySelectorAll("[data-year]").forEach((el) => (el.textContent = String(new Date().getFullYear())));
