// find all images we want to replace and set our options for the intersection observer
let asyncImgs = document.getElementsByClassName('asyncImage')
let options = {
  rootMargin: '0px', // use default bounding box of root element and target element
  threshold: 0.5 // define 'intersecting' as half of the target element visible
}

// create our intersection observer and set the function that runs when intersecting
let observer = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting && entry.target.dataset.srcset) {
      setSrcSet(entry.target)
    }
  })
}, options)

// we want to find the image that is closest to the size of the image box without being too big, so this function accomplishes that.
// get all async images, split into arrays for sizes and image urls, loop through sizes, find the one nearest to image box size without being bigger, set index based on which one that is. if there is only one size, we just use the one size.

function setSrcSet (item) {
  let ratio = 0
  let srcSet = item.dataset.srcset
  let images = []
  let sizes = []
  let targetWidth = item.offsetWidth
  let downloadingImage = new Image()
  let index = 0
  let imgSrc = srcSet.split(',').map((item) => {
    return item.trim()
  })

  imgSrc.forEach((img) => {
    images.push(img.split(' ')[0])
    sizes.push(Number(img.split(' ')[1].replace('w', '')))
  })

  if (sizes.length > 1) {
    for (let i = 0; i < sizes.length; i++) {
      let s = sizes[i] / targetWidth

      if (s > ratio && s <= 1) {
        ratio = s
        index = i
      }
    }
  }

  downloadingImage.onload = function () {
    item.setAttribute('srcset', srcSet)
    item.classList.remove('asyncImage')
    item.removeAttribute('data-srcset')
  }
  downloadingImage.src = images[index]
}

for (let i = 0; i < asyncImgs.length; i++) {
  observer.observe(asyncImgs[i])
}
