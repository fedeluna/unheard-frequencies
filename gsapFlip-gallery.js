//
//
//
//
//

// FIX FOR STICKY SELECTOR REVEAL

const showcaseSection = document.querySelector("#showcase"); // Replace with your section ID
const stickyReveal = document.querySelectorAll(".stickyselector");
const toggleReveal = document.querySelectorAll(".viewtoggle");

// Function to check if element is in viewport
function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return rect.top <= window.innerHeight && rect.bottom >= 0;
}

// Set initial state based on viewport visibility
function setInitialState() {
  if (isInViewport(showcaseSection)) {
    gsap.set(stickyReveal, { display: "block" });
    gsap.set(toggleReveal, { y: "0%" });
  } else {
    gsap.set(stickyReveal, { display: "none" });
    gsap.set(toggleReveal, { y: "150%" });
  }
}

// Set initial state on load
setInitialState();

// Create timeline for the enter animation
const enterTimeline = gsap.timeline({
  scrollTrigger: {
    trigger: showcaseSection,
    start: "top bottom-=20%",
    end: "top+=10% bottom-=20%",
    scrub: true,
    invalidateOnRefresh: true,
    onRefresh: setInitialState,
  },
});

// Create timeline for the leave animation
const leaveTimeline = gsap.timeline({
  scrollTrigger: {
    trigger: showcaseSection,
    start: "bottom bottom-=10%",
    end: "bottom center+=10%",
    scrub: true,
    invalidateOnRefresh: true,
  },
});

// Add animations to the enter timeline
enterTimeline
  .fromTo(
    stickyReveal,
    {
      display: "none",
    },
    {
      display: "block",
    }
  )
  .fromTo(
    toggleReveal,
    {
      y: "150%",
    },
    {
      y: "0%",
    },
    "<"
  );

// Add animations to the leave timeline
leaveTimeline
  .fromTo(
    stickyReveal,
    {
      display: "block",
    },
    {
      display: "none",
    }
  )
  .fromTo(
    toggleReveal,
    {
      y: "0%",
    },
    {
      y: "150%",
    },
    "<"
  );

//
//
//
//
//

// GSAP FLIP GALLERY

const viewToggle = document.querySelector('[data-element="view-toggle"]');
const itemsToAnimate = document.querySelectorAll("[data-view]");

// Easings Configuration
CustomEase.create("Easing-1", "0.37, 0.14, 0.02, 0.99");

// Sticky Selector Reveal animation

// State Management
let isInGalleryView = false;

// Grid - Gallery Switch

viewToggle.addEventListener("click", () => {
  const animationsOnClick = gsap.timeline();

  gsap.to(".switch-bg", {
    x: "100%",
    backgroundColor: "#f63b2e",
    duration: 0.45,
    ease: "Easing-1",
  });

  gsap.to("[button-grid]", {
    color: "#F63B2E",
    opacity: 0.75,
    duration: 0.45,
    ease: "Easing-1",
  });

  gsap.to("[button-gallery]", {
    color: "#0B0E0B",
    opacity: 1,
    duration: 0.45,
    ease: "Easing-1",
  });

  if (!isInGalleryView) {
    animationsOnClick
      .to(".productinfo", { y: "-100%", opacity: 0 }, 0)
      .to(".product-imgwrap", { borderStyle: "none" }, 0)
      .to(".thumbselector", { y: 0 }, 0)
      .to(".showcasecopy", { opacity: 0, display: "none" }, 0)
      .to(".navbottom", { opacity: 0, display: "none" }, 0);

    const gridState = Flip.getState(itemsToAnimate);

    itemsToAnimate.forEach((item) => {
      item.classList.add("transition");
    });

    Flip.from(gridState, {
      duration: 0.45,
      ease: "Easing-1",
      absolute: true,
      onStart: () => {},
      onUpdate: function (progress) {},
      onComplete: () => {
        const transitionState = Flip.getState(itemsToAnimate);

        gsap.to(".collectionwrapper", {
          backgroundColor: "#0B0E0B",
          duration: 0.8,
          ease: "Easing-1",
        });

        itemsToAnimate.forEach((item) => {
          item.classList.add("gallery");
        });

        Flip.from(transitionState, {
          duration: 0.8,
          ease: "Easing-1",
          absolute: true,
          onStart: () => {
            gsap.to(".stickyselector", {
              scaleX: 1,
              scaleY: 1,
              scaleZ: 1,
              duration: 0.8,
              ease: "Easing-1",
            });
          },
          onComplete: () => {},
        });
      },
    });
  } else {
    // Gallery view to initial state animations

    gsap.to(".switch-bg", {
      x: "0%",
      backgroundColor: "#FAEDD1",
      duration: 0.45,
      ease: "Easing-1",
    });
  
    gsap.to("[button-grid]", {
      color: "#0B0E0B",
      opacity: 1,
      duration: 0.45,
      ease: "Easing-1",
    });
  
    gsap.to("[button-gallery]", {
      color: "#FAEDD1",
      opacity: 0.75,
      duration: 0.45,
      ease: "Easing-1",
    });

    animationsOnClick
      .to(".productinfo", { y: "0%", opacity: 1 }, 0)
      .to(".product-imgwrap", { borderStyle: "solid" }, 0)
      .to(".thumbselector", { y: "-320%" }, 0)
      .to(".showcasecopy", { opacity: 1, display: "flex" }, 0)
      .to(".navbottom", { opacity: 1, display: "flex" }, 0);

    const gridState = Flip.getState(itemsToAnimate);

    itemsToAnimate.forEach((item) => {
      item.classList.remove("gallery");
    });

    Flip.from(gridState, {
      duration: 0.5,
      ease: "Easing-1",
      absolute: true,
      onStart: () => {
        gsap.to(".collectionwrapper", {
          backgroundColor: "rgba(11, 14, 11, 0)",
          duration: 0.9,
          ease: "Easing-1",
        });
      },
      onComplete: () => {
        const transitionState = Flip.getState(itemsToAnimate);

        itemsToAnimate.forEach((item) => {
          item.classList.remove("transition");
        });

        Flip.from(transitionState, {
          duration: 0.9,
          ease: "Easing-1",
          absolute: true,
          onStart: () => {
            gsap.to(".stickyselector", {
              scaleX: 1.35,
              scaleY: 1.35,
              scaleZ: 1,
              duration: 0.8,
              ease: "Easing-1",
            });
          },
          onComplete: () => {},
        });
      },
    });
  }

  isInGalleryView = !isInGalleryView;
});
