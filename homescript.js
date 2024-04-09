const carousel = document.querySelector(".carousel"),
  firstImg = carousel.querySelectorAll("img")[0],
  arrowIcons = document.querySelectorAll(".wrapper i");

let autoPlayInterval;

const showHideIcons = () => {
  // showing and hiding prev/next icon according to carousel scroll left value
  let scrollWidth = carousel.scrollWidth - carousel.clientWidth; // getting max scrollable width
  arrowIcons[0].style.display = carousel.scrollLeft == 0 ? "none" : "block";
  arrowIcons[1].style.display = carousel.scrollLeft == scrollWidth ? "none" : "block";
}

arrowIcons.forEach(icon => {
  icon.addEventListener("click", () => {
    let firstImgWidth = firstImg.clientWidth + 14; // getting first img width & adding 14 margin value
    // if clicked icon is left, reduce width value from the carousel scroll left else add to it
    carousel.scrollLeft += icon.id == "left" ? -firstImgWidth : firstImgWidth;
    setTimeout(() => showHideIcons(), 60); // calling showHideIcons after 60ms
  });
});

const autoSlide = () => {
  let firstImgWidth = firstImg.clientWidth + 14; // getting first img width & adding 14 margin value
  const scrollAmount = firstImgWidth / 10; // Amount to scroll each step
  const targetScrollLeft = carousel.scrollLeft + firstImgWidth; // Full image width
  const animationDuration = 1000; // Animation duration in milliseconds

  // Smoothly animate the scrollLeft property
  const animateScroll = () => {
    const currentTime = Date.now();
    const elapsedTime = currentTime - startTime;
    const scrollProgress = Math.min(1, elapsedTime / animationDuration);
    const newScrollLeft = startScrollLeft + scrollProgress * (targetScrollLeft - startScrollLeft);

    carousel.scrollLeft = newScrollLeft;

    if (scrollProgress < 1) {
      requestAnimationFrame(animateScroll);
    } else {
      clearInterval(autoPlayInterval);
      if (carousel.scrollLeft >= carousel.scrollWidth - carousel.clientWidth) {
        // Return to the first image if scrolled to the end
        carousel.scrollLeft = 0;
      }
      showHideIcons();
    }
  };

  const startTime = Date.now();
  const startScrollLeft = carousel.scrollLeft;

  autoPlayInterval = setInterval(animateScroll, 20); // Start animation
}
 
autoPlayInterval = setInterval(autoSlide, 2000); // Start autoplay



