// Dynamic Theme Switcher & Dynamic Hero Background Switch
function toggleTheme() {
  const body = document.body;
  const themeIcon = document.getElementById('themeIcon');
  const heroImg = document.querySelector('.hero-img');
  
  body.classList.toggle('dark-mode');
  
  if (body.classList.contains('dark-mode')) {
    themeIcon.textContent = '☀️';
    localStorage.setItem('theme', 'dark');
    if (heroImg) heroImg.src = 'foto/hero1-bg.jpg';
  } else {
    themeIcon.textContent = '🌙';
    localStorage.setItem('theme', 'light');
    if (heroImg) heroImg.src = 'foto/hero-bg.jpg';
  }
}

// Check saved theme preference on load
window.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme');
  const heroImg = document.querySelector('.hero-img');
  
  if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
    document.getElementById('themeIcon').textContent = '☀️';
    if (heroImg) heroImg.src = 'foto/hero1-bg.jpg';
  } else {
    if (heroImg) heroImg.src = 'foto/hero-bg.jpg';
  }
});

// Mobile Menu Navbar Toggle System
function toggleMobileMenu() {
  const navLinks = document.getElementById('navLinks');
  navLinks.classList.toggle('active');
}

function closeMobileMenu() {
  const navLinks = document.getElementById('navLinks');
  if (navLinks.classList.contains('active')) {
    navLinks.classList.remove('active');
  }
}

// Currency Converter Calculation Logic
function convertCurrency() {
  const idr = parseFloat(document.getElementById('idrInput').value) || 0;
  
  const rateJPY = 0.0098;
  const rateCHF = 0.000055;
  const rateEUR = 0.000058;

  const jpy = (idr * rateJPY).toLocaleString('en-US', { maximumFractionDigits: 0 });
  const chf = (idr * rateCHF).toLocaleString('en-US', { maximumFractionDigits: 2 });
  const eur = (idr * rateEUR).toLocaleString('en-US', { maximumFractionDigits: 2 });

  document.getElementById('jpyResult').textContent = `¥ ${jpy}`;
  document.getElementById('chfResult').textContent = `CHF ${chf}`;
  document.getElementById('eurResult').textContent = `€ ${eur}`;
}
convertCurrency();

// Ambient Sound Audio Toggle
function toggleAudio() {
  const audio = document.getElementById('ambientAudio');
  const icon = document.getElementById('audioIcon');
  
  if (audio.paused) {
    audio.play();
    audio.volume = 0.2;
    icon.textContent = '🔊';
  } else {
    audio.pause();
    icon.textContent = '🔇';
  }
}

// Automatic Evergreen Countdown Timer (Otomatis Reset Setiap Bulan)
function getNextDepartureDate() {
  const now = new Date();
  let target = new Date(now.getFullYear(), now.getMonth(), 15, 9, 0, 0);

  if (now.getTime() >= target.getTime()) {
    target = new Date(now.getFullYear(), now.getMonth() + 1, 15, 9, 0, 0);
  }
  return target.getTime();
}

let targetDepartureDate = getNextDepartureDate();

function updateCountdown() {
  const now = new Date().getTime();
  let diff = targetDepartureDate - now;

  if (diff <= 0) {
    targetDepartureDate = getNextDepartureDate();
    diff = targetDepartureDate - now;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  document.getElementById('days').textContent = days < 10 ? '0' + days : days;
  document.getElementById('hours').textContent = hours < 10 ? '0' + hours : hours;
  document.getElementById('mins').textContent = minutes < 10 ? '0' + minutes : minutes;
  document.getElementById('secs').textContent = seconds < 10 ? '0' + seconds : seconds;
}

setInterval(updateCountdown, 1000);
updateCountdown();

// Copy to Clipboard & Toast Alert Notification
function copyToClipboard(text, message) {
  navigator.clipboard.writeText(text).then(() => {
    showToast(message);
  });
}

function showToast(message) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}

// FAQ Accordion Toggle System
function toggleAccordion(button) {
  const item = button.parentElement;
  const content = button.nextElementSibling;
  
  document.querySelectorAll('.accordion-item').forEach(otherItem => {
    if (otherItem !== item) {
      otherItem.classList.remove('active');
      otherItem.querySelector('.accordion-content').style.maxHeight = null;
    }
  });

  item.classList.toggle('active');
  if (item.classList.contains('active')) {
    content.style.maxHeight = content.scrollHeight + "px";
  } else {
    content.style.maxHeight = null;
  }
}

// Scroll Reveal
function revealOnScroll() {
  const reveals = document.querySelectorAll('.reveal');
  reveals.forEach(element => {
    const windowHeight = window.innerHeight;
    const elementTop = element.getBoundingClientRect().top;
    if (elementTop < windowHeight - 100) {
      element.classList.add('active');
    }
  });
}
window.addEventListener('scroll', revealOnScroll);
revealOnScroll();

// Navbar Blur
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 40) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Modals
function openBookingModal(packageName) {
  document.getElementById('modalPackageName').textContent = packageName;
  document.getElementById('bookingModal').style.display = 'flex';
}

function closeBookingModal() {
  document.getElementById('bookingModal').style.display = 'none';
}

function handleBookingSubmit(event) {
  event.preventDefault();
  closeBookingModal();
  document.getElementById('successModal').style.display = 'flex';
}

function closeSuccessModal() {
  document.getElementById('successModal').style.display = 'none';
}

function handleReviewSubmit(event) {
  event.preventDefault();
  const name = document.getElementById('reviewerName').value;
  const rating = document.getElementById('starRating').value;
  const comment = document.getElementById('reviewerComment').value;
  const starsText = '★'.repeat(rating) + '☆'.repeat(5 - rating);
  
  const card = document.createElement('div');
  card.className = 'testimonial-card reveal active';
  card.innerHTML = `
    <div class="stars">${starsText}</div>
    <p class="review-text">"${comment}"</p>
    <div class="reviewer-info">
      <h4>${name}</h4>
      <span>Verified Luxury Traveler</span>
    </div>
  `;
  
  document.getElementById('testimonialList').prepend(card);
  document.getElementById('reviewForm').reset();
  alert('Terima kasih! Ulasan & rating Anda telah berhasil ditampilkan.');
}

// Itinerary Data & Carousel
const itineraryData = {
  japan: {
    title: 'Japan: Eternal Grace',
    duration: '7 Days / 6 Nights',
    tag: 'EAST ASIA PRIVATE EXPEDITION',
    desc: 'Transfer jet charter dari Tokyo ke Kyoto dengan akses tempat suci eksklusif.',
    images: ['foto/dest-japan1.jpg', 'foto/dest-japan2.jpg', 'foto/dest-japan3.jpg'],
    timeline: [
      { day: 'Day 1 - 2: Tokyo Metropolis', text: 'Kedatangan via VIP fast-track, menginap di Aman Tokyo, dan helikopter tour Mount Fuji.' },
      { day: 'Day 3 - 5: Kyoto Ancient Heritage', text: 'Private tea ceremony bersama Gion Master dan menginap di privat Ryokan bersejarah.' },
      { day: 'Day 6 - 7: Osaka Michelin Dining', text: 'Santap malam eksklusif di restoran 3-Star Michelin dan kepulangan.' }
    ]
  },
  switzerland: {
    title: 'Switzerland: Alpine Peaks',
    duration: '8 Days / 7 Nights',
    tag: 'CENTRAL EUROPE ALPINE EXPEDITION',
    desc: 'Pengalaman kereta panorama Glacier Express privat menembus jajaran puncak salju Matterhorn.',
    images: ['foto/dest-switzerland.jpg', 'foto/dest-switzerland2.jpg', 'foto/dest-switzerland3.jpg'],
    timeline: [
      { day: 'Day 1 - 3: Zurich & St. Moritz', text: 'Private charter transfer ke Badrutt’s Palace Hotel dan yacht cruise Lake Zurich.' },
      { day: 'Day 4 - 6: Zermatt Matterhorn Chalet', text: 'Helicopter ski safari dan menginap di private Alpine chalet dengan spa es.' },
      { day: 'Day 7 - 8: Geneva & Departure', text: 'Belanja privat jam tangan horologi terbatas dan kepulangan.' }
    ]
  },
  croatia: {
    title: 'Croatia & Aurora Lights',
    duration: '6 Days / 5 Nights',
    tag: 'SOUTH-EAST EUROPE & AURORA HUNT',
    desc: 'Eksplorasi Pesisir Adriatik dengan super-yacht menuju titik pandang Aurora Borealis.',
    images: ['foto/dest-croatia.jpg', 'foto/dest-croatia2.jpg', 'foto/dest-croatia3.jpg'],
    timeline: [
      { day: 'Day 1 - 2: Dubrovnik Old Town', text: 'Tur privat benteng abad pertengahan tanpa gangguan turis umum.' },
      { day: 'Day 3 - 4: Plitvice Lakes Sanctuary', text: 'Menginap di villa kaca terisolasi menatap danau es kristal.' },
      { day: 'Day 5 - 6: Northern Sky Aurora Night', text: 'Penerbangan malam privat menatap tarian aurora borealis di langit malam.' }
    ]
  }
};

let currentSlideIndex = 0;
let currentActiveImages = [];

function openItineraryModal(key) {
  const data = itineraryData[key];
  if (!data) return;

  document.getElementById('itinTitle').textContent = data.title;
  document.getElementById('itinDuration').textContent = data.duration;
  document.getElementById('itinTag').textContent = data.tag;
  document.getElementById('itinMapDesc').textContent = data.desc;

  currentActiveImages = data.images;
  currentSlideIndex = 0;
  updateCarouselImage();

  const timelineElem = document.getElementById('itinTimeline');
  timelineElem.innerHTML = data.timeline.map(item => `
    <div class="timeline-item">
      <h4>${item.day}</h4>
      <p>${item.text}</p>
    </div>
  `).join('');

  document.getElementById('itineraryModal').style.display = 'flex';
}

function closeItineraryModal() {
  document.getElementById('itineraryModal').style.display = 'none';
}

function moveSlide(direction) {
  currentSlideIndex += direction;
  if (currentSlideIndex < 0) {
    currentSlideIndex = currentActiveImages.length - 1;
  } else if (currentSlideIndex >= currentActiveImages.length) {
    currentSlideIndex = 0;
  }
  updateCarouselImage();
}

function updateCarouselImage() {
  const imgElem = document.getElementById('carouselImg');
  const captionElem = document.getElementById('carouselCaption');
  imgElem.src = currentActiveImages[currentSlideIndex];
  captionElem.textContent = `Slide ${currentSlideIndex + 1} of ${currentActiveImages.length}`;
}

window.onclick = function(event) {
  ['bookingModal', 'successModal', 'itineraryModal'].forEach(id => {
    const modal = document.getElementById(id);
    if (event.target === modal) {
      modal.style.display = 'none';
    }
  });
};