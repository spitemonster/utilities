// find all images we want to replace and set our options for the intersection observer
let asyncImgs = document.getElementsByClassName('asyncImage')
let options = {
  rootMargin: '0px', // use default bounding box of root element and target element
  threshold: 0.5 // define 'intersecting' as half of the target element visible
}

// create our intersection observer and set the function that runs when intersecting
var observer = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      setSrcSet(entry.target)
    }
  })
}, options)

// how we take our 'data-srcset' attribute and convert it to the image's actual srcset
function setSrcSet (item) {
  // read the datasrcset
  let srcSet = item.dataset.srcset
  // get the last (read: largest width) item from the srcset
  let imgSrc = srcSet.split(',')[srcSet.split(',').length - 1].trim().split(' ')[0]
  // create new Image element to begin the background download
  let downloadingImage = new Image()

  // when the img src is finished downloading (which is why we pull the biggest image since it takes the longest)
  // set the srcset attribute to the data we grabbed above, remove class and remove the data attribute
  downloadingImage.onload = function () {
    item.setAttribute('srcset', srcSet)
    item.classList.remove('asyncImage')
    item.removeAttribute('data-srcset')
  }

  // set the src to start the image download
  downloadingImage.src = imgSrc
}

// set observer to watch all images with the classlist outlined above
for (let i = 0; i < asyncImgs.length; i++) {
  observer.observe(asyncImgs[i])
}
