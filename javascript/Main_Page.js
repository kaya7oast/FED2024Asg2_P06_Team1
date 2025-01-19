// drag and hold to turn carousell js
const track = document.querySelector('.carousel-track');
const items = Array.from(track.children);

let isDragging = false;
let startX = 0;
let currentTranslate = 0;
let previousTranslate = 0;
let animationID = 0;

const itemWidth = items[0].getBoundingClientRect().width;

track.addEventListener('mousedown', startDrag);
track.addEventListener('mousemove', drag);
track.addEventListener('mouseup', stopDrag);
track.addEventListener('mouseleave', stopDrag);
track.addEventListener('touchstart', startDrag);
track.addEventListener('touchmove', drag);
track.addEventListener('touchend', stopDrag);

function startDrag(e) {
  isDragging = true;
  startX = getPositionX(e);
  animationID = requestAnimationFrame(animation);
  track.style.cursor = 'grabbing';
}

function drag(e) {
  if (!isDragging) return;
  const currentX = getPositionX(e);
  const deltaX = currentX - startX;
  currentTranslate = previousTranslate + deltaX;
}

function stopDrag() {
  isDragging = false;
  cancelAnimationFrame(animationID);

  const currentIndex = Math.round(-currentTranslate / itemWidth);
  currentTranslate = -currentIndex * itemWidth;
  previousTranslate = currentTranslate;

  setCarouselPosition();
  track.style.cursor = 'grab';
}

function getPositionX(e) {
  return e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
}

function setCarouselPosition() {
  track.style.transform = `translateX(${currentTranslate}px)`;
}

function animation() {
  setCarouselPosition();
  if (isDragging) requestAnimationFrame(animation);
}
