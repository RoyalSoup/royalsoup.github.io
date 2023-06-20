let currentIndex = 0;
const items = document.querySelectorAll('.carousel-item');
const itemCount = items.length;

const cycleItems = () => {
    for (let i = 0; i < itemCount; i++) {
        items[i].style.display = 'none';
    }
    const orientation = window.innerWidth > window.innerHeight ? 'landscape' : 'portrait';
    let newItemIndex = currentIndex;
    let newItem = items[newItemIndex];
    while (newItem.dataset.orientation !== orientation && newItem.dataset.orientation !== 'square') {
        newItemIndex = (newItemIndex + 1) % itemCount;
        newItem = items[newItemIndex];
    }
    newItem.style.display = 'block';
    currentIndex = newItemIndex;
}

window.addEventListener('resize', cycleItems);

document.getElementById('prev').addEventListener('click', () => {
    currentIndex -= 1;
    if (currentIndex < 0) currentIndex = itemCount - 1;
    cycleItems();
});

document.getElementById('next').addEventListener('click', () => {
    currentIndex += 1;
    if (currentIndex >= itemCount) currentIndex = 0;
    cycleItems();
});

cycleItems();
