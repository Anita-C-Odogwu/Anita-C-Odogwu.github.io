const cards = document.querySelectorAll('.poem-card');
const commentBoxTitle = document.getElementById('commentBoxTitle');
const vMsg = document.getElementById('vMsg');
const postCommentBtn = document.getElementById('postCommentBtn');
const commentsDisplay = document.getElementById('commentsDisplay');
const rTopic = document.getElementById('rTopic');
const postRequestBtn = document.getElementById('postRequestBtn');
const requestsDisplay = document.getElementById('requestsDisplay');
let current = 0;
let savedCommentsByPoem = JSON.parse(localStorage.getItem('poetry_comments_by_poem')) || {};
function getPoemKey() {
    const titleElement = cards[current].querySelector('.poem-title');
    return titleElement ? titleElement.innerText.trim() : 'General';
}
function renderComments() {
    const currentPoemKey = getPoemKey();
    commentBoxTitle.innerText = `Comments for: "${currentPoemKey}"`;
    commentsDisplay.innerHTML = '';
    const currentComments = savedCommentsByPoem[currentPoemKey] || [];
    if(currentComments.length === 0) {
        commentsDisplay.innerHTML = '<div class="item-text" style="opacity: 0.5;">No comments yet for this specific poem. Be the first!</div>';
        return;
    }
    currentComments.forEach(c => {
        const b = document.createElement('div'); b.className = 'display-item';
        b.innerHTML = `<div class="item-text">💬 "${c.text}"</div>`;
        commentsDisplay.appendChild(b);
    });
}
function showCard(index) {
    cards.forEach(card => card.className = 'poem-card');
    if (index < 0) current = cards.length - 1;
    else if (index >= cards.length) current = 0;
    else current = index;
    cards[current].classList.add('active');
    let prevIndex = current - 1 < 0 ? cards.length - 1 : current - 1;
    cards[prevIndex].classList.add('prev');
    renderComments();
}
document.getElementById('prevBtn').addEventListener('click', () => showCard(current - 1));
document.getElementById('nextBtn').addEventListener('click', () => showCard(current + 1));
postCommentBtn.addEventListener('click', () => {
    if(!vMsg.value.trim()) return;
    const currentPoemKey = getPoemKey();
    if(!savedCommentsByPoem[currentPoemKey]) savedCommentsByPoem[currentPoemKey] = [];
    savedCommentsByPoem[currentPoemKey].unshift({ text: vMsg.value });
    localStorage.setItem('poetry_comments_by_poem', JSON.stringify(savedCommentsByPoem));
    renderComments(); vMsg.value = '';
});
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
showCard(0); renderRequests();
