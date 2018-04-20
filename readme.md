Developed in Chrome.
Tested on iphone, iPad, android, both portrait and landscape.
Tested on firefox



Some issues:
* popover library doesn't dismiss popovers on mobile, so wrote a function to dismiss popovers if clicked on (line 8 in JS). This only works if the popover itself is clicked on, so this will leave popovers up if they're not directly clicked (only mobile though)




* added image to data.json file
    - could have changed the names of the jpg images in the asset directory instead to match the id string in the json file

* post doesn't always work, occasionally returns a fail


* product with CID 'gpsuq' returns incorrect response data on successful post (name and id_string). told to use the incorrect data on response


* corrected copy in general.copy_1 to match mock up
* missing data in product (headline, hero_*)
* added image property to variants
* added callout_badge property to product (maybe this shouldn't have been and a "if callout_badge key exists in variants, add to title" condition used instead?) wasn't sure how to approach this
