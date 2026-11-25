/* ===== DATA PRODUK =====
   Untuk memakai foto asli dari Google: salin alamat gambar (klik kanan → Salin alamat gambar)
   lalu tempel di field "img". Jika kosong / gagal dimuat, otomatis tampil ilustrasi bawaan. */
const P=[
{id:1,nama:"Laptop Aero 14 Pro",kat:"Laptop",harga:12499000,unggulan:true,warna:"#8FA3E8",img:"",desc:"Layar 14 inci 2K, Intel Core i7, RAM 16 GB, SSD 512 GB."},
{id:2,nama:"Smartphone Nova X5",kat:"Smartphone",harga:6999000,unggulan:true,warna:"#FFB21E",img:"",desc:"Layar AMOLED 120Hz, kamera 108 MP, baterai 5000 mAh."},
{id:3,nama:"Headphone Wireless Beat",kat:"Aksesoris",harga:899000,unggulan:true,warna:"#E4572E",img:"",desc:"Noise cancelling aktif, baterai tahan 40 jam."},
{id:4,nama:"Smartwatch Fit Pulse",kat:"Aksesoris",harga:1499000,unggulan:false,warna:"#2EC4B6",img:"",desc:"Pantau detak jantung, tidur, dan 100+ mode olahraga."},
{id:5,nama:"Tablet Slate 11",kat:"Tablet",harga:4299000,unggulan:false,warna:"#9B5DE5",img:"",desc:"Layar 11 inci, 8 GB RAM, cocok untuk belajar dan hiburan."},
{id:6,nama:"Smartphone Lumo A3",kat:"Smartphone",harga:2899000,unggulan:false,warna:"#2D9CDB",img:"",desc:"Ringan dan terjangkau dengan kamera ganda 50 MP."},
{id:7,nama:"Laptop Slim Go 15",kat:"Laptop",harga:7899000,unggulan:false,warna:"#3AB795",img:"",desc:"Ryzen 5, RAM 8 GB, SSD 512 GB, bodi tipis 1,6 kg."},
{id:8,nama:"Mouse Gaming Swift",kat:"Aksesoris",harga:349000,unggulan:false,warna:"#F15BB5",img:"",desc:"Sensor 16.000 DPI, lampu RGB, 6 tombol programmable."}
];
const rp=n=>"Rp"+n.toLocaleString("id-ID");
const $=s=>document.querySelector(s);

/* ilustrasi bawaan per produk */
function art(p){
 const c=p.warna,d="#0E1A4B";
 const k=p.nama.toLowerCase();
 let s="";
 if(p.kat==="Laptop")s=`<rect x="60" y="40" width="180" height="115" rx="9" fill="${d}"/><rect x="68" y="48" width="164" height="99" rx="4" fill="${c}"/><circle cx="150" cy="100" r="22" fill="#fff" opacity=".35"/><path d="M30 165h240l-14 14H44z" fill="#C5CCE6"/><rect x="125" y="165" width="50" height="5" rx="2" fill="#9AA3C7"/>`;
 else if(p.kat==="Smartphone")s=`<rect x="100" y="12" width="100" height="180" rx="16" fill="${d}"/><rect x="107" y="22" width="86" height="160" rx="9" fill="${c}"/><circle cx="150" cy="30" r="3" fill="${d}"/><circle cx="150" cy="95" r="22" fill="#fff" opacity=".35"/><rect x="118" y="140" width="64" height="8" rx="4" fill="#fff" opacity=".5"/>`;
 else if(p.kat==="Tablet")s=`<rect x="55" y="25" width="190" height="150" rx="14" fill="${d}"/><rect x="64" y="34" width="172" height="132" rx="6" fill="${c}"/><circle cx="150" cy="100" r="26" fill="#fff" opacity=".35"/>`;
 else if(k.includes("headphone"))s=`<path d="M85 120V95a65 65 0 0 1 130 0v25" fill="none" stroke="${d}" stroke-width="12" stroke-linecap="round"/><rect x="68" y="105" width="32" height="58" rx="14" fill="${c}"/><rect x="200" y="105" width="32" height="58" rx="14" fill="${c}"/>`;
 else if(k.includes("watch"))s=`<rect x="125" y="10" width="50" height="40" fill="${d}"/><rect x="125" y="150" width="50" height="40" fill="${d}"/><rect x="100" y="45" width="100" height="110" rx="26" fill="${d}"/><rect x="108" y="53" width="84" height="94" rx="19" fill="${c}"/><path d="M118 105h16l8-16 12 30 8-14h12" fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>`;
 else s=`<path d="M150 20c-40 0-62 28-62 62v50c0 30 24 52 62 52s62-22 62-52V82c0-34-22-62-62-62z" fill="${d}"/><path d="M150 20c-40 0-62 28-62 62v14h124V82c0-34-22-62-62-62z" fill="${c}"/><rect x="144" y="40" width="12" height="34" rx="6" fill="#fff"/>`;
 return `<svg viewBox="0 0 300 200" role="img" aria-label="${p.nama}">${s}</svg>`;
}
function pic(p){
 if(!p.img)return art(p);
 return `<img src="${p.img}" alt="${p.nama}" loading="lazy" onerror="this.outerHTML=this.dataset.fb" data-fb='${art(p).replace(/'/g,"&#39;")}'>`;
}
function card(p){
 return `<article class="card"><div class="pic"><em>${p.kat}</em>${pic(p)}</div>
 <div class="info"><h3>${p.nama}</h3><p>${p.desc}</p><div class="price">${rp(p.harga)}</div>
 <div class="acts"><button class="det" onclick="detail(${p.id})">Lihat Detail</button><button class="add" onclick="add(${p.id})">+ Keranjang</button></div></div></article>`;
}

/* ===== katalog: pencarian + filter ===== */
let kat="Semua";
const cats=["Semua",...new Set(P.map(p=>p.kat))];
function renderChips(){
 $("#chips").innerHTML=cats.map(c=>`<button class="chip ${c===kat?"on":""}" onclick="setKat('${c}')">${c}</button>`).join("");
}
function setKat(c){kat=c;renderChips();renderGrid()}
function renderGrid(){
 const q=$("#q").value.trim().toLowerCase();
 const r=P.filter(p=>(kat==="Semua"||p.kat===kat)&&p.nama.toLowerCase().includes(q));
 $("#grid").innerHTML=r.length?r.map(card).join(""):`<div class="empty">Produk tidak ditemukan. Coba kata kunci atau kategori lain.</div>`;
}
$("#q").addEventListener("input",renderGrid);

/* ===== keranjang ===== */
let cart={};
function add(id){cart[id]=(cart[id]||0)+1;upd();toast(P.find(p=>p.id===id).nama+" ditambahkan")}
function chg(id,n){cart[id]+=n;if(cart[id]<=0)delete cart[id];upd()}
function del(id){delete cart[id];upd()}
function upd(){
 const ids=Object.keys(cart);
 const q=ids.reduce((a,i)=>a+cart[i],0);
 const t=ids.reduce((a,i)=>a+cart[i]*P.find(p=>p.id==i).harga,0);
 $("#cnt").textContent=q;$("#tq").textContent=q;$("#tp").textContent=rp(t);
 $("#items").innerHTML=ids.length?ids.map(i=>{const p=P.find(x=>x.id==i);
  return `<div class="it"><div class="th">${pic(p)}</div><div><b>${p.nama}</b><br><small>${rp(p.harga)}</small>
  <div class="qty"><button onclick="chg(${i},-1)" aria-label="Kurangi">−</button><span>${cart[i]}</span><button onclick="chg(${i},1)" aria-label="Tambah">+</button></div></div>
  <div style="text-align:right"><b>${rp(p.harga*cart[i])}</b><br><button class="rm" onclick="del(${i})">Hapus</button></div></div>`}).join("")
  :`<p class="empty" style="padding:50px 0">Keranjang masih kosong. Pilih produk di katalog.</p>`;
}
const drawer=$("#drawer"),ov=$("#ov");
function openCart(o){drawer.classList.toggle("open",o);ov.classList.toggle("open",o)}
$("#openCart").onclick=()=>openCart(true);
$("#closeCart").onclick=ov.onclick=()=>openCart(false);
$("#checkout").onclick=()=>{
 if(!Object.keys(cart).length){toast("Keranjang masih kosong");return}
 toast("Terima kasih! Pesanan "+$("#tp").textContent+" diterima.");cart={};upd();openCart(false)};

/* ===== detail & toast ===== */
function detail(id){
 const p=P.find(x=>x.id===id);
 $("#mb").innerHTML=`<div class="pic">${pic(p)}</div><div class="mi"><button class="x" onclick="closeM()" aria-label="Tutup">✕</button>
 <span class="tag" style="align-self:flex-start;margin:0">${p.kat}</span><h2>${p.nama}</h2><p>${p.desc}</p><div class="price">${rp(p.harga)}</div>
 <button class="btn" onclick="add(${p.id});closeM()">Tambah ke Keranjang</button></div>`;
 $("#modal").classList.add("open");
}
function closeM(){$("#modal").classList.remove("open")}
$("#modal").onclick=e=>{if(e.target.id==="modal")closeM()};
document.addEventListener("keydown",e=>{if(e.key==="Escape"){closeM();openCart(false)}});
let tt;function toast(m){const t=$("#toast");t.textContent=m;t.classList.add("show");clearTimeout(tt);tt=setTimeout(()=>t.classList.remove("show"),2200)}

/* menu mobile */
$("#burger").onclick=()=>$("#nav").classList.toggle("open");
$("#nav").onclick=()=>$("#nav").classList.remove("open");

/* init */
$("#heroimg").innerHTML=pic(P[1]);
$("#featGrid").innerHTML=P.filter(p=>p.unggulan).map(card).join("");
renderChips();renderGrid();upd();
