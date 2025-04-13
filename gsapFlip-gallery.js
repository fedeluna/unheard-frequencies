// Call implicated DOM Elements
const viewToggle = document.querySelector('[data-element="view-toggle"]');
const itemsToAnimate = document.querySelectorAll("[data-view]");

// Easings Configuration
CustomEase.create("Easing-1", "0.37, 0.14, 0.02, 0.99");

// State Management
let isInGalleryView = false;

// Grid - Gallery Switch

viewToggle.addEventListener("click", () => {
  const animationsOnClick = gsap.timeline();

  if (!isInGalleryView) {
    animationsOnClick
      .to(".productinfo", { y: "-100%", opacity: 0 }, 0)
      .to(".product-imgwrap", { borderStyle: "none" }, 0)
      // .to(".stickyselector", { position: "fixed", bottom: "1em" }, 0)
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
            // gsap.to(".stickyselector", {
            //   scale: 1.1,
            //   duration: 0.8,
            //   ease: "Easing-1",
            // });
          },
          onComplete: () => {},
        });
      },
    });
  } else {
    // Gallery view to initial state animations

    animationsOnClick
      .to(".productinfo", { y: "0%", opacity: 1 }, 0)
      .to(".product-imgwrap", { borderStyle: "solid" }, 0)
      // .to(".stickyselector", { scale: 1.35, bottom: "1.5em" }, 0)
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
          onStart: () => {},
          onComplete: () => {
            // gsap.to(".stickyselector", {
            //   position: "sticky",
            //   duration: 0.5,
            //   ease: "Easing-1",
            // });
          },
        });
      },
    });
  }

  isInGalleryView = !isInGalleryView;
});
