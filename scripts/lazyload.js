// get our elements based on classname
const images = document.querySelectorAll('.lazy-load')

// intersectionobserver config. if half of the image frame (0.5) is within 0px of the viewport frame...
const config = {
  rootMargin: '0px 0px',
  threshold: 0.5
}

// The observer for the images on the page
let lazyObserver = new IntersectionObserver(onIntersection, config)

// attach observer to each image
images.forEach(image => {
  lazyObserver.observe(image)
})

// runs when the image intersects with the threshold established above
function onIntersection (entries) {
  // Loop through the entries
  entries.forEach(entry => {
    // Are we in viewport?
    if (entry.intersectionRatio > 0) {
      // Stop watching and load the image
      observer.unobserve(entry.target)
      preloadImage(entry.target)
    }
  })
}

// begin loading the image with a js image instance
function preloadImage (target) {
  let src = target.dataset.src
  let srcSet
  let img = new Image()

  // if no src is set, don't run. also, fix your markup you dummy.
  if (!src) {
    return
  }

  if (target.dataset.srcset) {
    srcSet = target.dataset.srcset
  }

  // once the image is loaded, set the target image src, remove the data-src attribute and, if applicable, remove data-srcset and append a srcset attribute
  img.onload = () => {
    target.setAttribute('src', src)
    target.removeAttribute('data-src')

    if (srcSet) {
      target.removeAttribute('data-srcset')
      target.setAttribute('srcset', srcSet)
    }
  }

  img.src = src
}
