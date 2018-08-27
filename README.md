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

It is up to the user to include the correct URLs and add an alt tag, but aside from that the script automates loading the srcSet in the background by preloading the most appropriately sized image.

## SCSS

### reset.scss

SCSS partial of my own css reset. I add to this slowly as I discover elements behaving in a way I don't like. Normalize is great, but it is 5x larger than my reset at time of writing, though admittedly it's still terribly small. What can I say, I'm pedantic.

### fluidtype.scss

This mixin takes a minimum and maximum font size, line height multiplier and an optional min and max viewport width and outputs a set of media queries that scale the font size of whatever includes it. It spits out TERRIBLE css (see below) but not terrible enough for me to not want to use it. Min and max viewport widths are optional and default to 400px for min and 2560px for max. Basically what this means is that in a 400px wide viewport or smaller, the font size is the min font size. 2560px or larger the font size is the max font size. In between the font size is calculated based on the viewport width but is somewhere between the min and max. Usage and explanation follows:

```
p {
  @include fluidtype(12px, 16px, 1.25);
}
```

compiles to:

```
@media (max-width: 400px) {
  p {
    font-size: 12px;
    line-height: calc(12px * 1.25);
  }
}
@media (min-width: 400px) and (max-width: 2560px) {
  p {
    font-size: calc(12px + (16 - 12) * (100vw - 400px) / (2560 - 400));
    line-height: calc(calc(12px + (16 - 12) * (100vw - 400px) / (2560 - 400)) * 1.25);
  }
}
@media (min-width: 2560px) {
  p {
    font-size: 16px;
    line-height: calc(16px * 1.25);
  }
}
```

The magic (and ugliness) is in the `@media (min-width: 400px) and (max-width: 2560px)`. It's ugly, but it works and I haven't run into a situation where it *didn't* work precisely as I expected. Recommended use is to change the viewport max and min as well. I had no reason to use those defaults other than using a 2560px monitor at work.

### autogrid.scss

Honestly kind of useless. Give the mixin a minimum width and a number of cells, and using flexbox or CSS Grid (depending on support), it makes a multi-column grid that, below the min width, breaks into rows instead. This is the kind of thing Flexbox does really well on its own, but I love taking something simple and making it complicated.
