// Menjalankan script setelah seluruh konten halaman dimuat
document.addEventListener('DOMContentLoaded', function () {

    const pageHeader = document.getElementById('page-header');
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');

    // --- LOGIKA UNTUK MENU TOGGLE ---
    function setupMenuLogic() {
        if (menuToggle && mobileMenu) {
            // Tampilkan/sembunyikan menu saat tombol di-klik
            menuToggle.addEventListener('click', (e) => {
                e.stopPropagation(); // Mencegah event klik menyebar ke elemen lain
                mobileMenu.classList.toggle('hidden');
            });
        }

        // Tutup menu jika pengguna mengklik di luar area menu
        document.addEventListener('click', (event) => {
            if (mobileMenu && !mobileMenu.classList.contains('hidden') && !mobileMenu.contains(event.target) && !menuToggle.contains(event.target)) {
                mobileMenu.classList.add('hidden');
            }
        });
    }

    // --- FUNGSI BARU: MENGATUR GAMBAR HEADER BERDASARKAN WAKTU ---
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

    // --- FUNGSI BARU: MENYEMBUNYIKAN HEADER SAAT SCROLL ---
    function setupHeaderScroll() {
        if (!pageHeader) return;

        let lastScrollTop = 0;
        window.addEventListener("scroll", () => {
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            // Jika scroll ke bawah dan sudah melewati tinggi header
            if (scrollTop > lastScrollTop && scrollTop > pageHeader.offsetHeight) {
                pageHeader.classList.add('header-hidden');
            } else {
                // Jika scroll ke atas
                pageHeader.classList.remove('header-hidden');
            }
            // Update posisi scroll terakhir
            lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
        }, false);
    }


    // --- INISIALISASI SEMUA FUNGSI ---
    setupMenuLogic();
    setupDynamicHeaderImage();
    setupHeaderScroll();
});
