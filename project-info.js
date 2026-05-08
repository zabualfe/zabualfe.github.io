/* Fullscreen lightbox for project image thumbnails (videos stay inline in the card). */
const lightboxOverlay = document.getElementById("lightboxOverlay");
const lightboxImage = document.getElementById("lightboxImage");
const closeLightbox = document.getElementById("closeLightbox");
const lightboxPrev = document.getElementById("lightboxPrev");
const lightboxNext = document.getElementById("lightboxNext");

let currentImageList = [];
let currentImageIndex = 0;

function openLightbox(index) {
  if (!lightboxOverlay || !lightboxImage || !currentImageList.length) return;
  currentImageIndex = index;
  const img = lightboxImage;
  const isVideo = /\.(mp4)$/i.test(currentImageList[currentImageIndex]);
  const showNav = currentImageList.length > 1;

  if (lightboxPrev) lightboxPrev.style.display = showNav ? "" : "none";
  if (lightboxNext) lightboxNext.style.display = showNav ? "" : "none";

  img.style.display = "none";
  const existingVideo = document.getElementById("lightboxVideo");
  if (existingVideo) existingVideo.remove();

  if (isVideo) {
    const video = document.createElement("video");
    video.id = "lightboxVideo";
    video.src = currentImageList[currentImageIndex];
    video.controls = true;
    video.autoplay = true;
    video.style.maxWidth = "90%";
    video.style.maxHeight = "90%";
    video.style.borderRadius = "0.5rem";
    video.style.boxShadow = "0 0 1rem rgba(0,0,0,0.6)";
    lightboxOverlay.appendChild(video);
  } else {
    img.src = currentImageList[currentImageIndex];
    img.onload = () => {
      img.style.opacity = 1;
      img.style.transform = "scale(1)";
      img.style.display = "block";
    };
  }

  lightboxOverlay.style.display = "flex";
  requestAnimationFrame(() => {
    lightboxOverlay.style.opacity = 1;
    lightboxOverlay.style.pointerEvents = "auto";
  });
}

function closeLightboxOverlay() {
  if (!lightboxOverlay) return;
  lightboxOverlay.style.opacity = 0;
  lightboxOverlay.style.pointerEvents = "none";
  setTimeout(() => {
    lightboxOverlay.style.display = "none";
    const video = document.getElementById("lightboxVideo");
    if (video) video.remove();
  }, 400);
}

function showPrevImage() {
  if (currentImageList.length < 2) return;
  currentImageIndex = (currentImageIndex - 1 + currentImageList.length) % currentImageList.length;
  openLightbox(currentImageIndex);
}

function showNextImage() {
  if (currentImageList.length < 2) return;
  currentImageIndex = (currentImageIndex + 1) % currentImageList.length;
  openLightbox(currentImageIndex);
}

function openProjectLightbox(sources, index) {
  currentImageList = sources || [];
  if (!currentImageList.length) return;
  openLightbox(Math.max(0, Math.min(index || 0, currentImageList.length - 1)));
}

window.openProjectLightbox = openProjectLightbox;
window.openLightbox = openLightbox;

if (closeLightbox) closeLightbox.onclick = closeLightboxOverlay;
if (lightboxPrev) lightboxPrev.onclick = showPrevImage;
if (lightboxNext) lightboxNext.onclick = showNextImage;

window.onclick = (e) => {
  if (e.target === lightboxOverlay) closeLightboxOverlay();
};

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeLightboxOverlay();
  if (lightboxOverlay && lightboxOverlay.style.display === "flex") {
    if (e.key === "ArrowLeft") showPrevImage();
    if (e.key === "ArrowRight") showNextImage();
  }
});
