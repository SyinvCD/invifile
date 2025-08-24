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

    // FUNGSI BARU: Mengatur gambar header dinamis
    function setupDynamicHeaderImage(headerElement) {
        if (!headerElement) return;
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
        headerElement.style.backgroundImage = `url('${imageUrl}')`;
    }

    // --- DATA PORTOFOLIO ---
    const githubRepositories = [
        { 
            id: 'repo-1', 
            title: 'SyinvCD/CloseBetaTesting12', 
            url: 'https://github.com/SyinvCD/CloseBetaTesting12',
            description: 'Versi awal dari website ini.',
            language: 'JavaScript',
            languageColor: 'bg-yellow-400',
            stars: 0,
            forks: 0
        },
        { 
            id: 'repo-2', 
            title: 'CloseBetaTesting11', 
            url: 'https://github.com/SyinvCD/CloseBetaTesting11',
            description: 'Close beta testing untuk website yang sudah beberapa kali dicoba oleh pengguna.',
            language: 'JavaScript',
            languageColor: 'bg-yellow-400',
            stars: 0,
            forks: 0
        },
    ];

    // --- ELEMEN DOM ---
    const pageHeader = document.getElementById('page-header');
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const projectsGrid = document.getElementById('pinned-projects-grid');

    // --- FUNGSI RENDER ---
    function renderRepositories(repos) {
        if (!projectsGrid) return;
        projectsGrid.innerHTML = '';
        repos.forEach(repo => {
            const card = document.createElement('a');
            card.href = repo.url;
            card.target = "_blank";
            card.className = 'project-card block';
            
            card.innerHTML = `
                <div class="flex items-center space-x-2 mb-2">
                    <i class="far fa-bookmark text-gray-500"></i>
                    <h3 class="font-bold text-purple-600 hover:underline">${repo.title}</h3>
                </div>
                <p class="text-gray-600 text-sm mb-3">${repo.description}</p>
                <div class="flex items-center space-x-4 text-sm text-gray-500">
                    <span class="flex items-center space-x-1">
                        <span class="h-3 w-3 rounded-full ${repo.languageColor || 'bg-gray-400'}"></span>
                        <span>${repo.language}</span>
                    </span>
                    <span class="flex items-center space-x-1">
                        <i class="far fa-star"></i>
                        <span>${repo.stars}</span>
                    </span>
                     <span class="flex items-center space-x-1">
                        <i class="fas fa-code-branch"></i>
                        <span>${repo.forks}</span>
                    </span>
                </div>
            `;
            projectsGrid.appendChild(card);
        });
    }

    // --- INISIALISASI ---
    setupMenuLogic(menuToggle, mobileMenu);
    setupHeaderScroll(pageHeader);
    setupDynamicHeaderImage(pageHeader); // Memanggil fungsi gambar dinamis
    renderRepositories(githubRepositories);
});
