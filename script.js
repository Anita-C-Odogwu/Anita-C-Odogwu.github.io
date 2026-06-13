const cards = document.querySelectorAll('.poem-card');
let current = 0;
function showCard(index) {
    cards.forEach(card => card.className = 'poem-card');
    if (index < 0) current = cards.length - 1;
    else if (index >= cards.length) current = 0;
    else current = index;
    cards[current].classList.add('active');
    let prevIndex = current - 1 < 0 ? cards.length - 1 : current - 1;
    cards[prevIndex].classList.add('prev');
}
document.getElementById('prevBtn').addEventListener('click', () => showCard(current - 1));
document.getElementById('nextBtn').addEventListener('click', () => showCard(current + 1));

const vMsg = document.getElementById('vMsg');
const postCommentBtn = document.getElementById('postCommentBtn');
const commentsDisplay = document.getElementById('commentsDisplay');
let savedComments = JSON.parse(localStorage.getItem('poetry_comments')) || [{ text: "Your poems are absolutely powerful, Anita!" }];
function renderComments() {
    commentsDisplay.innerHTML = '';
    savedComments.forEach(c => {
        const b = document.createElement('div'); b.className = 'display-item';
        b.innerHTML = `<div class="item-text">💬 "${c.text}"</div>`;
        commentsDisplay.appendChild(b);
    });
}
postCommentBtn.addEventListener('click', () => {
    if(!vMsg.value.trim()) return;
    savedComments.unshift({ text: vMsg.value });
    localStorage.setItem('poetry_comments', JSON.stringify(savedComments));
    renderComments(); vMsg.value = '';
});
renderComments();

const rTopic = document.getElementById('rTopic');
const postRequestBtn = document.getElementById('postRequestBtn');
const requestsDisplay = document.getElementById('requestsDisplay');
let savedRequests = JSON.parse(localStorage.getItem('poetry_requests')) || [{ text: "Write a poem about a bird leaving its cage." }];
function renderRequests() {
    requestsDisplay.innerHTML = '';
    savedRequests.forEach(r => {
        const b = document.createElement('div'); b.className = 'display-item';
        b.innerHTML = `<div class="item-text">💡 "${r.text}"</div>`;
        requestsDisplay.appendChild(b);
    });
}
postRequestBtn.addEventListener('click', () => {
    if(!rTopic.value.trim()) return;
    savedRequests.unshift({ text: rTopic.value });
    localStorage.setItem('poetry_requests', JSON.stringify(savedRequests));
    renderRequests(); rTopic.value = '';
});
renderRequests();
