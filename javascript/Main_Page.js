const track = document.querySelector('.carousel-track');
const items = Array.from(track.children);
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');

let isDragging = false;
let startX = 0;
let currentTranslate = 0;
let previousTranslate = 0;
let animationID = 0;

const visibleItems = 5;
const itemWidth = items[0].getBoundingClientRect().width;

// Clone items for infinite loop illusion
const clones = [];
for (let i = 0; i < visibleItems; i++) {
  const cloneStart = items[i].cloneNode(true);
  const cloneEnd = items[items.length - 1 - i].cloneNode(true);
  cloneStart.setAttribute('aria-hidden', 'true');
  cloneEnd.setAttribute('aria-hidden', 'true');
  clones.push(cloneStart, cloneEnd);
  track.appendChild(cloneStart);
  track.insertBefore(cloneEnd, items[0]);
}

const totalItems = track.children.length;

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

  if (currentIndex < visibleItems) {
    setTimeout(() => {
      track.style.transition = 'none';
      currentTranslate = -(totalItems - 2 * visibleItems) * itemWidth;
      previousTranslate = currentTranslate;
      setCarouselPosition();
    }, 300);
  } else if (currentIndex >= totalItems - visibleItems) {
    setTimeout(() => {
      track.style.transition = 'none';
      currentTranslate = -visibleItems * itemWidth;
      previousTranslate = currentTranslate;
      setCarouselPosition();
    }, 300);
  }

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

function moveToNext() {
  if (isDragging) return;
  const nextIndex = Math.round(-currentTranslate / itemWidth) + 1;
  currentTranslate = -nextIndex * itemWidth;
  previousTranslate = currentTranslate;
  setCarouselPosition();

  if (nextIndex >= totalItems - visibleItems) {
    setTimeout(() => {
      track.style.transition = 'none';
      currentTranslate = -visibleItems * itemWidth;
      previousTranslate = currentTranslate;
      setCarouselPosition();
    }, 300);
  }
}

function moveToPrev() {
  if (isDragging) return;
  const prevIndex = Math.round(-currentTranslate / itemWidth) - 1;
  currentTranslate = -prevIndex * itemWidth;
  previousTranslate = currentTranslate;
  setCarouselPosition();

  if (prevIndex < visibleItems) {
    setTimeout(() => {
      track.style.transition = 'none';
      currentTranslate = -(totalItems - 2 * visibleItems) * itemWidth;
      previousTranslate = currentTranslate;
      setCarouselPosition();
    }, 300);
  }
}

track.addEventListener('mousedown', startDrag);
track.addEventListener('mousemove', drag);
track.addEventListener('mouseup', stopDrag);
track.addEventListener('mouseleave', stopDrag);
track.addEventListener('touchstart', startDrag);
track.addEventListener('touchmove', drag);
track.addEventListener('touchend', stopDrag);

prevButton.addEventListener('click', moveToPrev);
nextButton.addEventListener('click', moveToNext);

