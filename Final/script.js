
const defaultBooks = [
    {
        id: 1,
        title: "The Metamorphosis",
        author: "Franz Kafka",
        totalChapters: 3,
        cover: "https://m.media-amazon.com/images/I/61nlvcmPkGL._SY522_.jpg",
        pdf: "https://giove.isti.cnr.it/demo/eread/Libri/calm/Metamorphosis.pdf",
        
        reviews: "https://www.goodreads.com/book/show/485894.The_Metamorphosis",
        logs: [
            {
                chapter: 5,
                rating: 5,
                note: "After completing it I can say that I did not have any expectations how it would turn out. Its not to say that the ending was anything particularly unique or shouldve been. I just went into it with an open mind and lack of prediction. What shocked me was Gregors immediate acceptance of his metamorphosis. It took me around half way through to realize he was always aware of his transformation. It was something unfathomable to me because one would approach such a sudden grotesque change with one of disbelief. However Gregor did not so so. He even was so passionate to try to keep his employment despite his disabilities. When I saw of his frantic struggles to uphold his families fortunes and comfort I deeply understood as to why. They were all dependent of him, even in the way they frantically tried to redy him after his late rise from bed. He never for one moment stopped at the thought of continuing his work in support of his family. Thats why the progression of the story saddened me as it progressed.",
                date: "12/01/2025"
            },
            {
                chapter: 5,
                rating: 4,
                note: "Gregor’s overall composure through the progression of his adaptation to his newfound circumstances was even then met with trying his best to not be of disservice or complication to his family. Despite the fact that he himself lost most capabilities and was in the very body that had gone through the metamorphosis. He constantly clothed himself with blankets to hide the sight of his body, and was in appreciation to his sisters Greta efforts in anaylzing his eating patterns and living routines. He nonstop showed his appreciations inverbally which is not wrong to say that they did acknowledge. Afterall, hiding yourself for another persons comfort and abiding by the confinement to one room is an obvious act of submission. However my disappointment in the characters grew as the story progressed.",
                date: "11/28/2025"
            }
        ]
    },
    {
        id: 2,
        title: "Letters to Milena",
        author: "Franz Kafka",
        totalChapters: 320,
        cover: "https://m.media-amazon.com/images/I/61fSle1komL._AC_UY436_FMwebp_QL65_.jpg",
        pdf: "https://www.kkoworld.com/kitablar/frans_kafka_milenaya_mektublar-eng.pdf",
        
        reviews: "https://www.goodreads.com/book/show/21268.Letters_to_Milena",
        logs: []
    },
    {
        id: 3,
        title: "Heavens Official Blessing Vol 1",
        author: "Tian Guan Ci Fu",
        totalChapters: 31,
        cover: "https://m.media-amazon.com/images/I/91hhNgQ9c1L._SL1500_.jpg",
        pdf: "https://fliphtml5.com/silhp/dhtk/Heaven_Official%E2%80%99s_Blessing__Tian_Guan_Ci_Fu_Vol._1/352/",
        
        reviews: "https://www.goodreads.com/book/show/58701949-heaven-official-s-blessing-tian-guan-ci-fu-vol-1",
        logs: []
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
    document.getElementById('shelf-header').classList.add('hidden');
    document.getElementById('detail-view').classList.remove('hidden');

    document.getElementById('detail-title').innerText = currentBook.title;
    document.getElementById('detail-author').innerText = currentBook.author;
    
 
    const reviewBtn = document.getElementById('detail-review-link');
    if (currentBook.reviews) {
        reviewBtn.href = currentBook.reviews;
        reviewBtn.style.display = "inline-block";
    } else {
        reviewBtn.style.display = "none";
    }

   
    const coverEl = document.getElementById('detail-cover');
    coverEl.style.backgroundImage = `url('${currentBook.cover}')`;
    
    if (currentBook.pdf) {
        coverEl.style.cursor = "pointer";
        coverEl.title = "Click to Read Book";
        coverEl.onclick = () => window.open(currentBook.pdf, '_blank');
    } else {
        coverEl.style.cursor = "default";
        coverEl.title = "";
        coverEl.onclick = null;
    }
    
    renderLogs();
    updateProgressUI();
}

function goBack() {
    document.getElementById('shelf-view').classList.remove('hidden');
    document.getElementById('shelf-header').classList.remove('hidden');
    document.getElementById('detail-view').classList.add('hidden');
    renderShelf(library);
}


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

    localStorage.setItem('myLibrary', JSON.stringify(library));

    document.getElementById('chapInput').value = '';
    document.getElementById('noteInput').value = '';
    
    renderLogs();
    updateProgressUI();
}


function renderLogs() {
    const list = document.getElementById('logs-list');
    list.innerHTML = '';

    currentBook.logs.forEach(log => {
        const item = document.createElement('div');
        item.className = 'log-entry';
        
        const safeNote = log.note.replace(/'/g, "\\'");
        const safeTitle = currentBook.title.replace(/'/g, "\\'");

        item.innerHTML = `
            <div class="log-meta">
                <span>Chapter ${log.chapter} • ${"★".repeat(log.rating)}</span>
                <span>${log.date}</span>
            </div>
            <div class="log-body">${log.note}</div>
            <div class="log-actions">
                <span class="share-link" onclick="shareLog('${safeTitle}', ${log.chapter}, '${safeNote}', '${log.date}')">Copy Review Text</span>
            </div>
        `;
        list.appendChild(item);
    });
}

function shareLog(title, chap, note, date) {
    const text = `📚 Shelf Update (${date}): I read Chapter ${chap} of "${title}". Review: "${note}"`;
    navigator.clipboard.writeText(text).then(() => {
        alert("Review text copied to clipboard!");
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