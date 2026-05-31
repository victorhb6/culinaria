const aiBtn = document.getElementById('ai-btn');
const closeBtn = document.getElementById('close-btn');

aiBtn.addEventListener('click', () => {
    document.body.classList.add('sidebar-aberta');
});

closeBtn.addEventListener('click', () => {
    document.body.classList.remove('sidebar-aberta');
});