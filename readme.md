# Generic Cosmetic Concept
**_Build a responsive layout based on the included mockups. Images and fonts in the images, fonts and data.json data are provided, along with typography and colors in a spec._**

**_For each product in the mockup, create an Add to Bag button that POSTs data to a REST endpoint and displays a tooltip next to the button with information from the response._**

## Features
1. Breakpoint which allows two layouts: desktop and mobile.

2. Add to Bag button renders a tooltip on successful response from the server. Tooltip is styled differently for both mobile and desktop.
3. Developed in Chrome; tested in Firefox and Safari for desktop; tested on iPhone mobile, iPad tablet, Android mobile, in portrait and landscape.
4. Broke the groups of functions into two objects, the store and product object. These would technically be separate files (`product.js` and `store.js`) with their relevant properties and functions and included where necessary.
5. Handlebars.js is used to build multiple templates, allowing a very bare-bones `index.html`.

## Issues discovered during development/testing
1. Popover library (Bootstrap Popovers) doesn't dismiss on mobile. This required a workaround function (line 8 in the JS file). For simplicity, it only works if the popover itself is clicked on, so this could leave several popovers up at the same time (only on mobile though). A proper solution would capture an open popover and close it if the screen is clicked (or a different library is used, Bootstrap Modals actually has no issues with dismissing on mobile).