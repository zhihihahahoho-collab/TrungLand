// Dữ liệu danh sách đất
// Dữ liệu danh sách 4 lô đất thực tế của Trung Land
const properties = [
    {
        id: "01",
        price: "380 Triệu",
        size: "180m² (6x30)",
        legal: "Sổ hồng riêng (Giá thực tế)",
        direction: "Đông Nam",
        media: [
            { type: 'video', src: 'videos/111.mp4' },
            { type: 'video', src: 'videos/1.mp4' },
            { type: 'image', src: 'photos/1.jpg' }
        ],
        desc: "Vị trí vàng tại Xã Minh Hòa, Dầu Tiếng, Bình Dương. Cách đường lớn 80m, view Hồ Dầu Tiếng chỉ 200m. Đường trước đất 10m. Đầy đủ tiện ích: Chợ, Ngân hàng, TT hành chính, Trường học các cấp. Hỗ trợ vay vốn ngân hàng."
    },
    {
        id: "02",
        price: "400 Triệu",
        size: "225m² (5x45)",
        legal: "Sổ hồng riêng, 100m² Thổ cư",
        direction: "Chính Nam",
        media: [
            { type: 'video', src: 'videos/2.mp4' },
            { type: 'image', src: 'photos/2.jpg' }
        ],
        desc: "Mặt tiền đường nhựa liên xã lộ giới 18m. Gần KCN Tân Quan, trường tiểu học và THCS Tân Quan. Đất sẵn thổ cư, xây dựng tự do, vị trí cực đẹp để đầu tư hoặc định cư."
    },
    {
        id: "03",
        price: "650 Triệu", // Giá ước tính dựa trên thị trường khu vực Dầu Tiếng cho lô 10m ngang
        size: "320m² (10x32)",
        legal: "Sổ hồng riêng, 100m² Thổ cư",
        direction: "Chính Nam",
        media: [
            { type: 'video', src: 'videos/3.mp4' }
        ],
        desc: "Lô góc ngang 10m cực hiếm. Diện tích lớn, đã có sẵn 100m² thổ cư. Sổ hồng riêng cầm tay. Phù hợp làm nhà vườn hoặc phân lô, tiềm năng sinh lời cao."
    }, 
    {
        id: "04",
        price: "270 Triệu",
        size: "230m² (5x46)",
        legal: "Sổ hồng riêng, 100m² Thổ cư",
        direction: "Chính Nam",
        media: [
            { type: 'video', src: 'videos/4.mp4' }
        ],
        desc: "Giá bán thực tế chỉ 270 triệu. Cách đường nhựa lớn 120m. Chỉ 5 phút di chuyển ra trung tâm xã: Thế giới di động, Điện máy xanh, Trạm y tế, Chợ. Đầy đủ tiện ích sống."
    }
];

// Giữ nguyên các hàm renderProperties, showDetail, scrollSlider... từ file cũ của bạn

// Hiển thị danh sách đất ra màn hình
function renderProperties() {
    const grid = document.getElementById('property-grid');
    if (!grid) return;

    grid.innerHTML = properties.map(p => {
        const cover = p.media[0];
        let displayHTML = (cover.type === 'video') 
            ? `<video class="w-full h-full object-cover" muted loop playsinline onmouseover="this.play()" onmouseout="this.pause()"><source src="${cover.src}" type="video/mp4"></video>` 
            : `<img src="${cover.src}" class="w-full h-full object-cover" loading="lazy">`;

        return `
        <div class="bg-white rounded-[2rem] overflow-hidden border border-slate-200 shadow-sm hover:shadow-2xl transition-all duration-500 group">
            <div class="h-64 bg-slate-900 relative overflow-hidden cursor-pointer" onclick="showDetail('${p.id}')">
                ${displayHTML}
                <div class="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[10px] font-bold italic shadow-sm">LÔ SỐ ${p.id}</div>
                <div class="absolute inset-0 bg-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
            <div class="p-6">
                <div class="flex justify-between items-center mb-5">
                    <span class="text-2xl font-black text-blue-600 italic tracking-tighter">${p.price}</span>
                    <span class="text-xs text-slate-400 font-bold uppercase tracking-widest">${p.size}</span>
                </div>
                <button onclick="showDetail('${p.id}')" class="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold hover:bg-blue-600 transition-all text-xs uppercase tracking-[2px] shadow-lg active:scale-95">Xem chi tiết</button>
            </div>
        </div>`;
    }).join('');
}

// Mở modal chi tiết
function showDetail(id) {
    const p = properties.find(item => item.id === id);
    if(!p) return;
    
    const modal = document.getElementById('detail-modal');
    const content = document.getElementById('modal-content');

    const mediaListHTML = p.media.map(m => {
        return (m.type === 'video')
            ? `<div class="flex-shrink-0 w-full snap-center h-full bg-black flex items-center justify-center"><video controls class="max-w-full max-h-full"><source src="${m.src}" type="video/mp4"></video></div>`
            : `<div class="flex-shrink-0 w-full snap-center h-full bg-slate-100 flex items-center justify-center"><img src="${m.src}" class="max-w-full max-h-full object-contain"></div>`;
    }).join('');

    content.innerHTML = `
        <div class="space-y-8 animate-modal">
            <h2 class="text-4xl font-black italic text-slate-900 tracking-tighter uppercase underline decoration-blue-600 decoration-4">LÔ ĐẤT SỐ ${p.id}</h2>
            <div class="relative group">
                <button onclick="scrollSlider(-1)" class="nav-btn absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full hidden md:flex items-center justify-center text-xl font-bold text-slate-900">❮</button>
                <div id="media-slider" class="aspect-video rounded-[2rem] overflow-hidden bg-black shadow-2xl flex overflow-x-auto snap-x snap-mandatory no-scrollbar">
                    ${mediaListHTML}
                </div>
                <button onclick="scrollSlider(1)" class="nav-btn absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full hidden md:flex items-center justify-center text-xl font-bold text-slate-900">❯</button>
                <div class="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 text-white px-4 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase">${p.media.length} MEDIA</div>
            </div>
            <div class="grid md:grid-cols-2 gap-12 italic">
                <div class="space-y-4 text-sm">
                    <h3 class="text-xl font-black border-l-4 border-blue-600 pl-4 uppercase">Thông số kỹ thuật</h3>
                    <p class="flex justify-between border-b border-slate-100 pb-2"><span>📐 Diện tích:</span> <b>${p.size}</b></p>
                    <p class="flex justify-between border-b border-slate-100 pb-2"><span>🧭 Hướng:</span> <b>${p.direction}</b></p>
                    <p class="flex justify-between border-b border-slate-100 pb-2"><span>⚖️ Pháp lý:</span> <b class="text-blue-600">${p.legal}</b></p>
                </div>
                <div class="space-y-4">
                    <h3 class="text-xl font-black border-l-4 border-blue-600 pl-4 uppercase">Mô tả thực địa</h3>
                    <p class="text-slate-600 text-sm leading-relaxed">${p.desc}</p>
                    <a href="https://zalo.me/0966059859" target="_blank" class="block text-center bg-green-500 text-white py-4 rounded-2xl font-bold shadow-lg hover:bg-green-600 transition-transform active:scale-95 uppercase text-xs tracking-widest">Gửi sổ qua Zalo</a>
                </div>
            </div>
        </div>`;
    
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

// Chuyển ảnh trong slider
function scrollSlider(direction) {
    const slider = document.getElementById('media-slider');
    if (slider) slider.scrollBy({ left: direction * slider.clientWidth, behavior: 'smooth' });
}

// Đóng modal chi tiết
function closeDetail() {
    document.getElementById('detail-modal').classList.add('hidden');
    document.body.style.overflow = 'auto';
    document.querySelectorAll('#modal-content video').forEach(v => v.pause());
}

// Modal Về tôi
function showAboutMe() { 
    document.getElementById('about-modal').classList.remove('hidden'); 
    document.body.style.overflow = 'hidden'; 
}

function closeAboutMe() { 
    document.getElementById('about-modal').classList.add('hidden'); 
    document.body.style.overflow = 'auto'; 
}

// Khởi chạy
window.onload = renderProperties;