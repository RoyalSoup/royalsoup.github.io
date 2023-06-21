let currentIndex = 0;
let items = document.querySelectorAll('.carousel-item');
let itemCount = items.length;

const cycleItems = () => {
    for (let i = 0; i < itemCount; i++) {
        items[i].style.display = 'none';
    }
    items[currentIndex].style.display = 'block';
}

const prevItem = () => {
    currentIndex -= 1;
    if (currentIndex < 0) currentIndex = itemCount - 1;
    cycleItems();
};

const nextItem = () => {
    currentIndex += 1;
    if (currentIndex >= itemCount) currentIndex = 0;
    cycleItems();
};

document.addEventListener('keydown', (event) => {
    switch (event.code) {
        case "ArrowLeft": // Left arrow key
            prevItem();
            break;
        case "ArrowRight": // Right arrow key
            nextItem();
            break;
    }
});

document.getElementById('carousel').addEventListener('click', (event) => {
    if (event.clientX < window.innerWidth / 2) {
        prevItem();
    } else {
        nextItem();
    }
});

const checkOrientation = () => {
    // Determine whether the device is likely to be a mobile device based on its width
    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    const orientation = screen.width > screen.height ? "landscape" : "portrait";
    if (isMobile) {
        items = document.querySelectorAll(`.carousel-item.${orientation}, .carousel-item.square`);
    } else {
        items = document.querySelectorAll('.carousel-item');
    }
    itemCount = items.length;
    currentIndex = 0;
    cycleItems();

    // Check device pixel ratio and adjust the font size of h1
    const pixelRatio = window.devicePixelRatio;
    const h1 = document.querySelector('h1');
    if (pixelRatio > 1 && isMobile) {
        h1.style.fontSize = '2.5em';
    } else {
        h1.style.fontSize = '1.2em';
    }
}

window.addEventListener('resize', checkOrientation);
window.addEventListener('orientationchange', checkOrientation);
checkOrientation();
