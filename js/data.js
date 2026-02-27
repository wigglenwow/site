// --- Data Generation ---
const generateItems = (count, category) => {
    return Array.from({ length: count }, (_, i) => ({
        id: i + 1,
        title: `${category} No. ${i + 1}`,
        year: 2020 + (i % 5),
        type: ['Oil on Canvas', 'Charcoal', 'Digital', 'Mixed Media'][i % 4],
        aspect: 'aspect-[3/4]', // Unified ratio for all generated items
        price: 80 + (i * 10),
        imageSeed: i + (category === 'Art' ? 100 : category === 'Exp' ? 500 : 800)
    }));
};

const DATA = {
    artworks: [
        { id: 1, title: "Midnight Reflection", year: "2024", type: "Oil on Canvas", aspect: "aspect-[3/4]", image: "images/Screenshot 2026-01-03 005840.png" },
        { id: 2, title: "Golden Silence", year: "2024", type: "Charcoal", aspect: "aspect-[3/4]", image: "images/Screenshot 2026-01-03 005752.png" },
        { id: 3, title: "Obsidian", year: "2023", type: "Mixed Media", aspect: "aspect-[3/4]", image: "images/Screenshot 2026-01-03 005903.png" },
        { id: 4, title: "Ethereal Dust", year: "2023", type: "Digital", aspect: "aspect-[3/4]", image: "images/image_2ec881.png" },
        { id: 5, title: "Shadow Play", year: "2022", type: "Photography", aspect: "aspect-[3/4]", image: "images/image_2ecbae.png" },
        { id: 6, title: "Void Texture", year: "2022", type: "Oil", aspect: "aspect-[3/4]", image: "images/image_49a8b9.png" },
        { id: 7, title: "Luminescent", year: "2021", type: "Acrylic", aspect: "aspect-[3/4]", image: "images/image_49a87b.png" },
        // Filler items to make the archive look full. 
        ...generateItems(15, 'Archive Study')
    ],
    experiments: generateItems(40, 'Exp'),
    shop: generateItems(30, 'Print')
};
