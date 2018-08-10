# Utilities

A collection of utility scripts, SCSS partials and mixins and other goodies that I've developed or modified that need a home to keep them up to date.

## Javascript

### asynchronousImageLoading.js
Utility to be utilized with the image optimizer that I've built to automate background loading of images and use of srcSet to increase page load speed and minimize page weight. On the HTML side, it expects an image tag in this format:

```HTML
<img class="asyncImage" src="/target--image-async.jpg"
                        data-srcSet="/target--image-xsmall.jpg 320w,
                                     /target--image-small.jpg 480w,
                                     /target--image-medium.jpg 960w,
                                     /target--image-large.jpg 1280w,
                                     /target--image-retina.jpg 2560w" />
```

It is up to the user to include the correct URLs and add an alt tag, but aside from that the script automates loading the srcSet in the background

## SCSS
