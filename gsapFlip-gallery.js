// =============================================
// CONFIGURATION & CONSTS
// =============================================

// Easings Configuration
CustomEase.create("Easing-1", "0.37, 0.14, 0.02, 0.99");

// State Management -> False = Grid View, True = Gallery View
let isInGalleryView = false;

// DOM Elements

const showcaseSection = document.querySelector("#showcase");
const stickyReveal = document.querySelectorAll(".stickyselector");
const toggleReveal = document.querySelectorAll(".viewtoggle");
const viewToggle = document.querySelector('[data-element="view-toggle"]');
const itemsToAnimate = document.querySelectorAll("[data-view]");

// =============================================
// STICKY SELECTOR
// =============================================

// Fix for Sticky Selector Reveal

function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return rect.top <= window.innerHeight && rect.bottom >= 0;
}

function setInitialState() {
  if (isInViewport(showcaseSection)) {
    gsap.set(stickyReveal, { display: "block" });
    gsap.set(toggleReveal, { y: "0%" });
  } else {
    gsap.set(stickyReveal, { display: "none" });
    gsap.set(toggleReveal, { y: "150%" });
  }
}

// Sticky Selector Reveal animation

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

const leaveTimeline = gsap.timeline({
  scrollTrigger: {
    trigger: showcaseSection,
    start: "bottom bottom-=10%",
    end: "bottom center+=10%",
    scrub: true,
    invalidateOnRefresh: true,
  },
});

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

// =============================================
// MAIN - EVENT LISTENERS & INITIALIZATION
// =============================================

// Set initial state on load
setInitialState();

// Grid - Gallery Switch

viewToggle.addEventListener("click", () => {
  const animationsOnClick = gsap.timeline();

  // Switch button animations
  
  gsap.to(".switch-bg", {
    x: isInGalleryView ? "0%" : "100%",
    backgroundColor: isInGalleryView ? "#FAEDD1" : "#f63b2e",
    duration: 0.45,
    ease: "Easing-1",
  });

  gsap.to("[button-grid]", {
    color: isInGalleryView ? "#0B0E0B" : "#F63B2E",
    opacity: isInGalleryView ? 1 : 0.75,
    duration: 0.45,
    ease: "Easing-1",
  });

  gsap.to("[button-gallery]", {
    color: isInGalleryView ? "#FAEDD1" : "#0B0E0B",
    opacity: isInGalleryView ? 0.75 : 1,
    duration: 0.45,
    ease: "Easing-1",
  });

  // Thumbs selector animations

  gsap.to(".thumbselector", {
    marginTop: isInGalleryView ? "-100%" : "0%",
    opacity: isInGalleryView ? 0 : 1,
    duration: 0.45,
    ease: "Easing-1",
  });

  gsap.to(".cardthumb", { overflow: isInGalleryView ? "hidden" : "visible" });

  //

  if (!isInGalleryView) {
    // Grid to Gallery animations
    animationsOnClick
      .to(".productinfo", { y: "-100%", opacity: 0 }, 0)
      .to(".product-imgwrap", { borderStyle: "none" }, 0)
      .to(".showcasecopy", { opacity: 0, display: "none" }, 0)
      .to(".navbottom", { opacity: 0, display: "none" }, 0);

    // First Flip animation
    const gridState = Flip.getState(itemsToAnimate);
    itemsToAnimate.forEach((item) => {
      item.classList.add("transition");
    });

    Flip.from(gridState, {
      duration: 0.45,
      ease: "Easing-1",
      absolute: true,
      onStart: () => { },
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

            //
            // Flip animation for card thumbnails
            const thumbState = Flip.getState(".cardthumb");

            document.querySelectorAll(".cardthumb").forEach((thumb) => {
              thumb.classList.add("relative");
            });

            Flip.from(thumbState, {
              duration: 0.45,
              ease: "Easing-1",
            });

            //
            //
          },
        });
      },
    });
  } else {
    // Gallery to Grid animations
    animationsOnClick
      .to(".productinfo", { y: "0%", opacity: 1 }, 0)
      .to(".product-imgwrap", { borderStyle: "solid" }, 0)
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
        });
      },
    });
  }

  isInGalleryView = !isInGalleryView;
});
