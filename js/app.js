// --- Render Functions ---

function createArtworkCard(work, delay = 0) {
    // Check if user provided a custom image, otherwise use placeholder
    const imgSrc = work.image ? work.image : `https://picsum.photos/seed/${work.imageSeed}/800/1000`;
    
    return `
    <div class="fade-entry group cursor-pointer" style="animation-delay: ${delay}ms">
        <div class="w-full ${work.aspect} bg-surface overflow-hidden relative mb-4 border border-gold-dim">
            <img src="${imgSrc}" alt="${work.title}" loading="lazy" class="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000 ease-out">
        </div>
        <div class="flex justify-between items-baseline text-gold">
            <h3 class="font-serif text-xl">${work.title}</h3>
            <span class="font-mono text-xs text-muted">${work.year}</span>
        </div>
        <p class="text-sm font-light text-paper mt-1">${work.type}</p>
    </div>
    `;
}

function createExperimentCard(item, delay = 0) {
    const imgSrc = item.image ? item.image : `https://picsum.photos/seed/${item.imageSeed}/600/400`;
    return `
    <div class="break-inside-avoid mb-8 fade-entry" style="animation-delay: ${delay}ms">
        <div class="bg-surface p-6 rounded-sm border border-gold-dim hover:border-gold transition-colors duration-500">
            <div class="aspect-video bg-surface-light w-full mb-4 overflow-hidden grayscale hover:grayscale-0 transition-all duration-700">
                <img src="${imgSrc}" loading="lazy" alt="Process" class="w-full h-full object-cover opacity-90">
            </div>
            <p class="font-mono text-xs text-muted mb-2">Exp. 0${item.id}</p>
            <p class="font-serif text-gold">Process study No. ${item.id}</p>
        </div>
    </div>
    `;
}

function createShopCard(item, delay = 0) {
    return `
    <div class="fade-entry group" style="animation-delay: ${delay}ms">
        <div class="aspect-square bg-surface mb-4 overflow-hidden border border-gold-dim">
            <img src="[https://picsum.photos/seed/$](https://picsum.photos/seed/$){item.imageSeed}/500/500" loading="lazy" alt="Print" class="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 opacity-90 group-hover:opacity-100">
        </div>
        <div class="flex justify-between items-start">
            <div>
                <h3 class="font-serif text-lg text-gold">${item.title}</h3>
                <p class="text-xs text-muted mt-1 uppercase tracking-wider">Limited Print</p>
            </div>
            <span class="font-mono text-sm text-paper">$${item.price}</span>
        </div>
        <a href="[https://ig.me/m/wigglenwow](https://ig.me/m/wigglenwow)" target="_blank" rel="noopener noreferrer" class="mt-4 block text-center w-full py-2 border border-gold-dim text-muted text-xs uppercase tracking-widest hover:bg-gold hover:text-midnight transition-colors">
            Order Now
        </a>
    </div>
    `;
}

// --- Initialization ---

function init() {
    // Render Previews
    
    // Randomize items for all Home Previews
    const shuffledArt = [...DATA.artworks].sort(() => 0.5 - Math.random());
    const shuffledExp = [...DATA.experiments].sort(() => 0.5 - Math.random());
    const shuffledShop = [...DATA.shop].sort(() => 0.5 - Math.random());
    
    document.getElementById('artworks-grid-preview').innerHTML = shuffledArt.slice(0, 6).map((w, i) => createArtworkCard(w, i * 100)).join('');
    document.getElementById('experiments-grid-preview').innerHTML = shuffledExp.slice(0, 6).map((w, i) => createExperimentCard(w, i * 100)).join('');
    document.getElementById('shop-grid-preview').innerHTML = shuffledShop.slice(0, 3).map((w, i) => createShopCard(w, i * 100)).join('');

    // Render Full Lists
    document.getElementById('artworks-grid-full').innerHTML = DATA.artworks.map(w => createArtworkCard(w)).join('');
    document.getElementById('experiments-grid-full').innerHTML = DATA.experiments.map(w => createExperimentCard(w)).join('');
    document.getElementById('shop-grid-full').innerHTML = DATA.shop.map(w => createShopCard(w)).join('');

    // Set Year
    document.getElementById('year').innerText = `© ${new Date().getFullYear()} Aryan Kumar Pawan`;

    // Initialize Icons
    lucide.createIcons();

    // Setup Scroll Listener for Nav Active States
    window.addEventListener('scroll', updateActiveNav);
}

// --- Navigation Logic ---

function updateActiveNav() {
    const sections = ['home', 'artworks', 'experiments', 'shop', 'custom', 'about'];
    const scrollPos = window.scrollY + 250; 
    
    // Only update if we are in home view
    if(document.getElementById('view-home').classList.contains('hidden')) {
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('text-gold', 'font-normal');
            link.classList.add('text-muted');
        });
        return;
    }

    sections.forEach(section => {
        const el = document.getElementById(section);
        if (el && el.offsetTop <= scrollPos && (el.offsetTop + el.offsetHeight) > scrollPos) {
            document.querySelectorAll('.nav-link').forEach(link => {
                if (link.dataset.target === section) {
                    link.classList.add('text-gold', 'font-normal');
                    link.classList.remove('text-muted');
                    // Add underline effect
                    link.classList.add('after:content-[""]', 'after:absolute', 'after:-bottom-1', 'after:left-0', 'after:w-full', 'after:h-px', 'after:bg-gold');
                } else {
                    link.classList.remove('text-gold', 'font-normal', 'after:content-[""]', 'after:absolute', 'after:-bottom-1', 'after:left-0', 'after:w-full', 'after:h-px', 'after:bg-gold');
                    link.classList.add('text-muted');
                }
            });
        }
    });
}

function switchView(viewId, pushToHistory = true) {
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Hide all views
    document.querySelectorAll('.view-section').forEach(el => {
        el.classList.add('hidden');
    });

    // Show target view
    const target = document.getElementById(viewId);
    if (target) {
        target.classList.remove('hidden');
        target.classList.add('animate-fade-in-up'); // Re-trigger animation
    }

    // Update Icons (in case they need re-render)
    lucide.createIcons();
    
    // Force nav update
    if(viewId !== 'view-home') {
         document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('text-gold', 'after:bg-gold'));
    }

    // Update Browser History so the Back button works
    if (pushToHistory) {
        const hash = viewId === 'view-home' ? '' : '#' + viewId.replace('view-', '');
        history.pushState({ viewId: viewId }, '', window.location.pathname + window.location.search + hash);
    }
}

function navigateTo(target) {
    const homeView = document.getElementById('view-home');
    
    // If we are not on home view, go there first
    if (homeView.classList.contains('hidden')) {
        switchView('view-home');
        // Wait for view switch then scroll
        setTimeout(() => {
            const el = document.getElementById(target);
            if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
    } else {
        // Just scroll
        const el = document.getElementById(target);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
}

function scrollToSection(id) {
    navigateTo(id);
}

// Handle Browser Back/Forward Buttons
window.addEventListener('popstate', (event) => {
    if (event.state && event.state.viewId) {
        switchView(event.state.viewId, false);
    } else {
        const hash = window.location.hash;
        if (hash) {
            const viewId = 'view-' + hash.substring(1);
            if (document.getElementById(viewId)) {
                switchView(viewId, false);
                return;
            }
        }
        switchView('view-home', false);
    }
});

// Run Init and setup initial history state
window.addEventListener('DOMContentLoaded', () => {
    init();

    // Handle direct links (e.g., user refreshes page while looking at full archive)
    const hash = window.location.hash;
    let startView = 'view-home';
    if (hash) {
        const possibleView = 'view-' + hash.substring(1);
        if (document.getElementById(possibleView)) {
            startView = possibleView;
        }
    }
    
    // Set the initial history state
    history.replaceState({ viewId: startView }, '', window.location.href);
    
    // If starting on a subpage, switch to it without pushing history again
    if (startView !== 'view-home') {
        switchView(startView, false);
    }
});
