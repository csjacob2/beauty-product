# Beautylish Front End Engineering Code Challenge
**_Build a responsive layout based on the included mockups (there are JPG and PSD files for the desktop and the mobile version). You'll find the necessary images and fonts in the images and fonts directories respectively. All initial content for the page is included in the data.json file._**

**_For each product in the mockup, create an Add to Bag button that POSTs data to our REST endpoint and displays a tooltip next to the button with information from the response._**

## Features
1. Breakpoint which allows two layouts: desktop and mobile.

2. Add to Bag button renders a tooltip on successful response from the server. Tooltip is styled differently for both mobile and desktop.
4. Developed in Chrome; tested in Firefox and Safari for desktop; tested on iPhone mobile, iPad tablet, Android mobile, in portrait and landscape.
7. Broke the groups of functions into two objects, the store and product object. These would technically be separate files (`product.js` and `store.js`) with their relevant properties and functions and included where necessary. These could then be packaged up with `Webpack.js` or another packaging app for production/distribution.
8. CSS is split into separate files (`_font.less` and `_styles.less`) and are then compiled together into one file (`styles.css`).
9. Handlebars.js is used to build multiple templates, allowing a very bare-bones `index.html`. This allows easy formatting/editing of each piece which can then propagate across all sections of the site.

## Issues discovered during development/testing
1. Popover library (Bootstrap Popovers) doesn't dismiss on mobile. This required a workaround function (line 8 in the JS file). For simplicity, it only works if the popover itself is clicked on, so this could leave several popovers up at the same time (only on mobile though). A proper solution would capture an open popover and close it if the screen is clicked (or a different library is used, Bootstrap Modals actually has no issues with dismissing on mobile).

2. Images for the variants were not included as properties in the `data.json` file, making it difficult to reference them properly. I originally thought about trying to build the image file name off the `id_string`, but this value has dashes while the image file name has underscores. My solution was to just add the image and pathname as a key/value pair into the json file. This leads to issue #3.
3. Chunks of data was actually missing from the `data.json` file, which I didn't realize initially. I assumed the inconsistencies between the mockup and data was just mistakes until email communications showed I was missing entire blocks (headline, hero_*). I added the data in that was included in the email and made corrections and judgement calls where I could.
4. Similar to #3, the `general.copy_1` was incorrect in the `data.json` file, so I corrected it to match the mockup image.
5. I also added the `callout_badge` property to the `product` object as this seemed odd to try to reference it in the `variant` object to add it as part of the main product name. Perhaps this is incorrect and I was supposed to write a conditional _"if any variants have a value in the key `callout_badge`, prefix `product_name` with the value"_? I wasn't sure how to approach it so I assumed the value was missing from `product`.
6. POST to the server didn't always work, I called this out in the email, so attempting to _Add To Bag_ may result in a fail (error will be printed to console, but "Waiting on Response" behavior will still be triggered).
7. Product CID **gpsuq** will return incorrect `name` and `id_string` in Success Response from server. I initially wrote a workaround for this using filter/map (line 71 in `functions.js`) which locates the value from an object using another value to match a key in the object from the json file, so I could get the correct data to populate the tooltip popover, but I was requested to still use the Success Response data in the email. The filter/map workaround is commented out.