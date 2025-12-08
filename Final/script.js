// 1. DATA: Add your books here
const defaultBooks = [
    {
        id: 1,
        title: "The Metamorphosis",
        author: "Franz Kafka",
        totalChapters: 3,
        cover: "https://m.media-amazon.com/images/I/61nlvcmPkGL._SY522_.jpg"
    },
    {
        id: 2,
        title: "Letters to Milena",
        author: "Franz Kafka",
        totalPages: 320,
        cover: "https://m.media-amazon.com/images/I/61fSle1komL._AC_UY436_FMwebp_QL65_.jpg"
    },
    {
        id: 3,
        title: "Heavens Official Blessing Vol 1",
        author: "Tian Guan Ci Fu",
        totalChapters: 31,
        cover: "https://m.media-amazon.com/images/I/91hhNgQ9c1L._SL1500_.jpg"
    }
];


let library = defaultBooks; 
let currentBook = null;


function init() {
    
    localStorage.setItem('myLibrary', JSON.stringify(library));
    renderShelf(library);
}


function renderShelf(booksToRender) {
    const container = document.getElementById('shelf-view');
    if (!container) return; 
    container.innerHTML = ''; 

    booksToRender.forEach(book => {
        const logs = book.logs || [];
        
        const card = document.createElement('div');
        card.className = 'book-card';
        card.onclick = () => openBook(book.id);
        
        card.innerHTML = `
            <div class="cover-placeholder" style="background-image: url('${book.cover}')"></div>
            <h3 class="book-title">${book.title}</h3>
            <p class="book-author">${book.author}</p>
        `;
        container.appendChild(card);
    });
}


function openBook(id) {
    currentBook = library.find(b => b.id === id);
    if (!currentBook.logs) currentBook.logs = [];

    document.getElementById('shelf-view').classList.add('hidden');
    document.getElementById('detail-view').classList.remove('hidden');

    document.getElementById('detail-title').innerText = currentBook.title;
    document.getElementById('detail-author').innerText = currentBook.author;
    document.getElementById('detail-cover').style.backgroundImage = `url('${currentBook.cover}')`;
    
    renderLogs();
    updateProgressUI();
}

function goBack() {
    document.getElementById('shelf-view').classList.remove('hidden');
    document.getElementById('detail-view').classList.add('hidden');
    renderShelf(library);
}

// SAVE LOG
function saveLog() {
    const chap = parseInt(document.getElementById('chapInput').value);
    const rate = document.getElementById('ratingInput').value;
    const note = document.getElementById('noteInput').value;

    if (!chap || !note) {
        alert("Please enter a chapter number and thoughts.");
        return;
    }

    currentBook.logs.unshift({
        chapter: chap,
        rating: rate,
        note: note,
        date: new Date().toLocaleDateString()
    });


    currentBook.readChapters = Math.max(currentBook.readChapters || 0, chap);

    localStorage.setItem('myLibrary', JSON.stringify(library));

    // Reset Inputs
    document.getElementById('chapInput').value = '';
    document.getElementById('noteInput').value = '';
    
    renderLogs();
    updateProgressUI();
}

// RENDER LOGS
function renderLogs() {
    const list = document.getElementById('logs-list');
    list.innerHTML = '';

    currentBook.logs.forEach(log => {
        const item = document.createElement('div');
        item.className = 'log-entry';
        item.innerHTML = `
            <div class="log-meta">Chapter ${log.chapter} • ${"★".repeat(log.rating)}</div>
            <div class="log-body">${log.note}</div>
        `;
        list.appendChild(item);
    });
}

function updateProgressUI() {
    let highestChap = 0;
    if (currentBook.logs.length > 0) {
        highestChap = Math.max(...currentBook.logs.map(l => l.chapter));
    }

    const percent = Math.min(100, Math.round((highestChap / currentBook.totalChapters) * 100));
    document.getElementById('detail-progress-bar').style.width = percent + "%";
    document.getElementById('detail-percentage').innerText = `${percent}% Complete`;
}

function filterBooks() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    const filtered = library.filter(b => b.title.toLowerCase().includes(query));
    renderShelf(filtered);
}

init();