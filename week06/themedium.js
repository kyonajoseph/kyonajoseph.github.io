
const images = [
  'assets/whole_earth.jpg',
  'assets/soft_tech.jpg',
  'assets/energy_primer.jpg',
  'assets/doing_drag.jpg',
  'assets/whole_earth_2.png'
];

let currentIndex = 0;
const galleryImage = document.getElementById('galleryImage');
const nextBtn = document.getElementById('nextBtn');
nextBtn.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % images.length;
  galleryImage.src = images[currentIndex];
});


