// --- Data Generation & Automation ---
const generateItems = (count, category) => {
    return Array.from({ length: count }, (_, i) => ({
        id: i + 1,
        title: `${category} No. ${i + 1}`,
        year: 2020 + (i % 5),
        type: ['Oil on Canvas', 'Charcoal', 'Digital', 'Mixed Media'][i % 4],
        aspect: 'aspect-[3/4]', 
        price: 80 + (i * 10),
        imageSeed: i + (category === 'Art' ? 100 : category === 'Exp' ? 500 : 800)
    }));
};

// 1. Map your medium codes to full words
const mediumMap = {
    'w': 'Watercolor',
    'e': 'Color Pencils',
    'c': 'Charcoal',
    'a': 'Acrylic',
    'g': 'Graphite',
    'p': 'Pen',
    'o': 'Oil' 
};

// 2. All the image files from your GitHub folder
const artworkFiles = [
    "a_n_krishnaji.jpg", "a_o_lady.jpg", "a_o_suit.jpg",
    "c_o_robin.jpg", "c_o_spiderman.jpg",
    "e_o_colorfulgirl.jpg", "e_o_drstrange.jpg", "e_o_mythpat.jpg",
    "g_o_child.jpg", "g_o_oldlady.jpg",
    "o_n_santaclaus.jpg", "o_n_spiderman.jpg", "o_o_derek.jpg",
    "p_o_berlin.jpg", "p_o_hulk.jpg", "p_o_ironman.jpg", "p_o_loki.jpg", "p_o_mrbean.jpg", "p_o_spiderman.jpg", "p_o_teenwolf.jpg", "p_o_wanda.jpg",
    "w_n_boii.jpg", "w_n_joyce.jpg", "w_n_will.jpg", "w_o_2faces.jpg", "w_o_dobbie.jpg", "w_o_dragon.jpg", "w_o_ghostgirl.jpg", "w_o_love.jpg", "w_o_metro.jpg"
];

// 3. The magic function that reads the name
const parseArtwork = (filename, index) => {
    // Split by underscore to just grab the very first letter (medium code)
    const mediumCode = filename.split('_')[0]; 
    
    return {
        id: index + 1,
        title: `Artwork No. ${index + 1}`, // Generic uniform title
        year: '2024', // Standard uniform year
        // Automatically assigns medium from our map based on the first letter!
        type: mediumMap[mediumCode] || 'Mixed Media', 
        aspect: 'aspect-[3/4]',
        image: `images/${filename}`
    };
};

const DATA = {
    // Automatically process every file in your list
    artworks: artworkFiles.map((file, i) => parseArtwork(file, i)),
    
    experiments: [
        // Load custom experiments from your screenshots
        { id: 1, title: 'Process study No. 1', year: 'Archive', type: 'Experiment', imageSeed: 501, image: 'images/exp1.jpg' },
        { id: 2, title: 'Process study No. 2', year: 'Archive', type: 'Experiment', imageSeed: 502, image: 'images/exp2.jpg' },
        ...generateItems(38, 'Exp')
    ],
    shop: generateItems(30, 'Print')
};
