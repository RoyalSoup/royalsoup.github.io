var images = [
  {
    src: "images/image1.jpg",
    orientation: "landscape"
  },
  {
    src: "images/image2.jpg",
    orientation: "portrait"
  },
  {
    src: "images/image3.jpg",
    orientation: "portrait"
  },
  {
    src: "images/image4.jpg",
    orientation: "landscape"
  },
];

var currentIndex = {
  "portrait": 0,
  "landscape": 0
};

var currentOrientation = window.innerWidth > window.innerHeight ? "landscape" : "portrait";

function filterImages() {
  if (window.innerWidth > 767) {
    return images;
  } else {
    return images.filter(image => image.orientation === currentOrientation);
  }
}

function changeImage(event, isNext) {
  var filteredImages = filterImages();
  var carouselImage = document.querySelector('.carousel-image');

  if (isNext) {
    currentIndex[currentOrientation]++;
  } else {
    currentIndex[currentOrientation]--;
  }

  if (currentIndex[currentOrientation] < 0) {
    currentIndex[currentOrientation] = filteredImages.length - 1;
  } else if (currentIndex[currentOrientation] >= filteredImages.length) {
    currentIndex[currentOrientation] = 0;
  }

  carouselImage.src = filteredImages[currentIndex[currentOrientation]].src;
}

function displayCurrentImage() {
  var filteredImages = filterImages();
  var carouselImage = document.querySelector('.carousel-image');
  carouselImage.src = filteredImages[currentIndex[currentOrientation]].src;
}

// Click events for navigation
document.querySelector('.carousel').addEventListener('click', function(event) {
  var isNext = true;

  // Check if clicked on arrow
  if (event.target.classList.contains('arrow-left')) {
    isNext = false;
  } else if (event.target.classList.contains('arrow-right')) {
    isNext = true;
  } else {
    // If not clicked on arrow, calculate based on click position
    var rect = event.currentTarget.getBoundingClientRect();
    var x = event.clientX - rect.left; //x position within the carousel
    isNext = x > rect.width / 2;
  }
  
  changeImage(event, isNext);
});

// Monitor for screen orientation change
window.addEventListener("resize", function() {
  var newOrientation = window.innerWidth > window.innerHeight ? "landscape" : "portrait";
  if (newOrientation !== currentOrientation) {
    currentOrientation = newOrientation;
    displayCurrentImage(); // refresh the image
  }
});

// Initial load
displayCurrentImage();
