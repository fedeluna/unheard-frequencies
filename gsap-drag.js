// =============================================
// SLIDER CONFIGURATION
// =============================================

let draggableInstance = null;

function initSlider() {
  if (!draggableInstance) {
    const container = document.querySelector('.collectioncontainer');
    const slides = container.querySelectorAll('.productcard');
    const slideWidth = slides[0].offsetWidth;
    const totalSlides = slides.length;
    let currentSlide = 0;

    // Set initial styles
    container.style.overflow = 'hidden';
    container.style.cursor = 'grab';
    container.style.userSelect = 'none';
    container.style.display = 'flex';
    container.style.width = `${totalSlides * slideWidth}px`;

    // Set slide styles
    slides.forEach(slide => {
      slide.style.flexShrink = '0';
      slide.style.width = `${slideWidth}px`;
    });

    // Initialize Draggable
    draggableInstance = Draggable.create(container, {
      type: "x",
      bounds: {
        minX: -(totalSlides - 1) * slideWidth,
        maxX: 0
      },
      inertia: true,
      dragResistance: 0.1,
      edgeResistance: 0.5,
      onDragStart: function() {
        container.style.cursor = 'grabbing';
      },
      onDrag: function() {
        // Prevent dragging beyond bounds
        if (this.x > 0) this.x = 0;
        if (this.x < -(totalSlides - 1) * slideWidth) this.x = -(totalSlides - 1) * slideWidth;
      },
      onDragEnd: function() {
        container.style.cursor = 'grab';
        const x = this.x;
        const newSlide = Math.round(-x / slideWidth);
        
        if (newSlide !== currentSlide) {
          currentSlide = Math.max(0, Math.min(newSlide, totalSlides - 1));
          gsap.to(container, {
            x: -currentSlide * slideWidth,
            duration: 0.3,
            ease: "power2.out"
          });
        }
      }
    })[0];

    // Add touch support
    let touchStartX = 0;
    let touchEndX = 0;

    container.addEventListener('touchstart', e => {
      touchStartX = e.changedTouches[0].screenX;
    }, false);

    container.addEventListener('touchend', e => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    }, false);

    function handleSwipe() {
      const diff = touchStartX - touchEndX;
      if (Math.abs(diff) > 50) { // Minimum swipe distance
        if (diff > 0 && currentSlide < totalSlides - 1) {
          // Swipe left
          currentSlide++;
        } else if (diff < 0 && currentSlide > 0) {
          // Swipe right
          currentSlide--;
        }
        gsap.to(container, {
          x: -currentSlide * slideWidth,
          duration: 0.3,
          ease: "power2.out"
        });
      }
    }
  }
}

function destroySlider() {
  if (draggableInstance) {
    // Kill the draggable instance
    draggableInstance.kill();
    draggableInstance = null;
    
    const container = document.querySelector('.collectioncontainer');
    
    // Reset container styles
    container.style.cssText = '';
    
    // Reset all slides styles
    const slides = container.querySelectorAll('.productcard');
    slides.forEach(slide => {
      slide.style.cssText = '';
      // Remove any GSAP transforms
      gsap.set(slide, { clearProps: "all" });
    });
    
    // Force a reflow to ensure styles are applied
    container.offsetHeight;
  }
}

// Export functions for use in other files
export { initSlider, destroySlider }; 