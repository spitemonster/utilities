// find all images we want to replace and set our options for the intersection observer
let asyncImgs = document.getElementsByClassName('asyncImage')
let options = {
  rootMargin: '0px', // use default bounding box of root element and target element
  threshold: 0.5 // define 'intersecting' as half of the target element visible
}

// create our intersection observer and set the function that runs when intersecting
let observer = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      setSrcSet(entry.target)
    }
  })
}, options)

function setSrcSet (item) {
  // read the datasrcset
  let srcSet = item.dataset.srcset
  // split srcSet into an array
  let imgSrc = srcSet.split(',')
  // create empty object to populate with sizes and urls
  let sizes = {}
  // get browser width to load smallest image possible
  let width = window.innerWidth
  let sizeIndex
  let ratio = 0
  let sizeKeys = []
  // create new Image element to begin the background download
  let downloadingImage = new Image()

  // get each size from the imgSrc array and use the size as the key and the url as the value and also push the size to an array for the later loop
  imgSrc.forEach((img) => {
    let size = img.trim().split(' ')[1].replace('w', '')
    let url = img.trim().split(' ')[0]
    sizeKeys.push(size)
    sizes[size.toString()] = url
  })

  // loop through all the keys and find the one with the highest ratio to the window width, unless we're at retina size in which case load the retina image
  sizeKeys.forEach((key) => {
    let k = Number(key)
    if (((k / width) > ratio && width > k) || k >= 2560) {
      ratio = k / width
      sizeIndex = key
    }
  })

  // when the img src is finished downloading (which is why we pull the biggest image since it takes the longest)
  // set the srcset attribute to the data we grabbed above, remove class and remove the data attribute
  downloadingImage.onload = function () {
    item.setAttribute('srcset', srcSet)
    item.classList.remove('asyncImage')
    item.removeAttribute('data-srcset')
  }

  // set the src to start the image download
  downloadingImage.src = sizes[sizeIndex]
}

// set observer to watch all images with the classlist outlined above
for (let i = 0; i < asyncImgs.length; i++) {
  observer.observe(asyncImgs[i])
}
