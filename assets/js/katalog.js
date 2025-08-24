document.addEventListener('DOMContentLoaded', function () {
    
    // --- FUNGSI BERSAMA ---

    function setupHeaderScroll(headerElement) {
        if (!headerElement) return;
        let lastScrollTop = 0;
        window.addEventListener("scroll", () => {
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            if (scrollTop > lastScrollTop && scrollTop > headerElement.offsetHeight) {
                headerElement.classList.add('header-hidden');
            } else {
                headerElement.classList.remove('header-hidden');
            }
            lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
        }, false);
    }

    function setupMenuLogic(menuToggle, mobileMenu) {
        if (menuToggle && mobileMenu) {
            menuToggle.addEventListener('click', (e) => {
                e.stopPropagation();
                mobileMenu.classList.toggle('hidden');
            });
        }
        document.addEventListener('click', (event) => {
            if (mobileMenu && !mobileMenu.classList.contains('hidden') && !mobileMenu.contains(event.target) && !menuToggle.contains(event.target)) {
                mobileMenu.classList.add('hidden');
            }
        });
    }

    // --- ELEMEN DOM HALAMAN KATALOG ---
    const pageHeader = document.getElementById('page-header');
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const searchInput = document.getElementById('search-input');
    const horizontalListContainer = document.getElementById('horizontal-product-list');
    const verticalListContainer = document.getElementById('vertical-product-list');
    const horizontalSection = document.getElementById('horizontal-section');
    const verticalSection = document.getElementById('vertical-section');

    const allProducts = [
        { id: 'autocad', name: 'Autocad 2024', category: 'Software', imageUrl: 'https://seeklogo.com/images/A/autocad-logo-69326D7728-seeklogo.com.png', downloadUrl: 'https://docs.google.com/document/d/10crIM9GQiejAOxSbs3H2f8ijuOoXhUfM1h2FJSnyZqo/edit?usp=drive_link' },
        { id: 'revit', name: 'Revit 2024', category: 'Software', imageUrl: 'https://tse3.mm.bing.net/th/id/OIP.VqdEDYxixwasnYhFl015kQHaHa?rs=1&pid=ImgDetMain&o=7&rm=3', downloadUrl: 'https://docs.google.com/document/d/19zTvwSfoqpsj0t84WhZtHwZCwRvRWlJDTgy5Lzwr98A/edit?usp=drive_link' },
        { id: 'sketchup-2024', name: 'Sketchup 2024', category: 'Software', imageUrl: 'https://www.liblogo.com/img-logo/sk5372s17c-sketchup-logo-sketchup-cad-international.png', downloadUrl: 'https://docs.google.com/document/d/1kWYo84t5HBftGw5tDXH0UU_LkBK3P2ys-m3cJFjVrcE/edit?usp=drive_link' },
        { id: 'sketchup-2023', name: 'Sketchup 2023', category: 'Software', imageUrl: 'https://www.liblogo.com/img-logo/sk5372s17c-sketchup-logo-sketchup-cad-international.png', downloadUrl: 'https://docs.google.com/document/d/1f_DQzhiXifiTdmDKh_QWHYvXcsR6QBRFhjHwCAKw1ek/edit?usp=drive_link' },
        { id: 'dynamic-block', name: 'Dynamic Block AutoCad', category: 'Template', imageUrl: 'https://i.ytimg.com/vi/RfM7kVy_ZCc/maxresdefault.jpg', downloadUrl: 'https://drive.google.com/drive/folders/1gm2unasugMfV4nck_qR9mSJZDXiik__o?usp=drive_link' },
    ];

    // --- FUNGSI SPESIFIK HALAMAN KATALOG ---

    function setupDynamicHeaderImage() {
        if (!pageHeader) return;
        const timeBasedImages = {
            pagi: 'images/pagi.jpeg',
            siang: 'images/siang.jpeg',
            sore: 'images/sore.jpeg',
            malam: 'images/malam.jpeg',
        };
        const currentHour = new Date().getHours();
        let imageUrl;
        if (currentHour >= 5 && currentHour <= 10) imageUrl = timeBasedImages.pagi;
        else if (currentHour >= 11 && currentHour <= 14) imageUrl = timeBasedImages.siang;
        else if (currentHour >= 15 && currentHour <= 17) imageUrl = timeBasedImages.sore;
        else imageUrl = timeBasedImages.malam;
        pageHeader.style.backgroundImage = `url('${imageUrl}')`;
    }

    function renderHorizontalProducts(products) {
        if (!horizontalListContainer) return;
        horizontalListContainer.innerHTML = '';
        products.slice(0, 3).forEach(product => {
            const productCard = document.createElement('a');
            productCard.href = product.downloadUrl;
            productCard.target = "_blank"; // Buka di tab baru
            productCard.className = 'flex-shrink-0 w-40 bg-white rounded-xl shadow p-3 flex flex-col hover:shadow-lg transition-shadow';
            productCard.innerHTML = `
                <div class="bg-gray-100 rounded-lg mb-3"><img src="${product.imageUrl}" alt="${product.name}" class="w-full h-24 object-cover rounded-lg"></div>
                <div class="flex-grow flex flex-col justify-center text-center"><h3 class="font-bold text-gray-800 text-sm">${product.name}</h3></div>
                <div class="mt-3 w-full bg-purple-200 text-purple-800 font-semibold py-2 px-4 rounded-lg text-sm text-center">Unduh</div>
            `;
            horizontalListContainer.appendChild(productCard);
        });
    }

    function renderVerticalProducts(products) {
        if (!verticalListContainer) return;
        verticalListContainer.innerHTML = '';
        products.forEach(product => {
            const productRow = document.createElement('div');
            productRow.className = 'bg-white rounded-xl shadow p-3 flex items-center space-x-4';
            productRow.innerHTML = `
                <img src="${product.imageUrl}" alt="${product.name}" class="w-16 h-16 object-cover rounded-lg flex-shrink-0">
                <div class="flex-grow">
                    <h3 class="font-semibold text-gray-800">${product.name}</h3>
                    <p class="text-xs text-gray-500">${product.category}</p>
                </div>
                <a href="${product.downloadUrl}" target="_blank" class="bg-purple-200 text-purple-800 font-semibold py-2 px-5 rounded-lg text-sm hover:bg-purple-300 transition-colors">Unduh</a>
            `;
            verticalListContainer.appendChild(productRow);
        });
    }
    
    function renderAllProducts(products) {
        if (!horizontalSection || !verticalSection) return;
        if (products.length === 0) {
            horizontalSection.classList.add('hidden');
            verticalListContainer.innerHTML = `<p class="text-center text-gray-500 py-8">File tidak ditemukan.</p>`;
            verticalSection.classList.remove('hidden');
        } else {
            horizontalSection.classList.remove('hidden');
            verticalSection.classList.remove('hidden');
            renderHorizontalProducts(products);
            renderVerticalProducts(products);
        }
    }

    function handleSearch() {
        const query = searchInput.value.trim().toLowerCase();
        const filteredProducts = allProducts.filter(p => p.name.toLowerCase().includes(query) || p.category.toLowerCase().includes(query));
        renderAllProducts(filteredProducts);
    }

    // --- INISIALISASI ---
    setupMenuLogic(menuToggle, mobileMenu);
    setupHeaderScroll(pageHeader);
    setupDynamicHeaderImage();
    if(searchInput) {
        searchInput.addEventListener('input', handleSearch);
    }
    renderAllProducts(allProducts);
});

