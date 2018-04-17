$(document).ready(function() {
    product.getProduct();


    store.getHeader();
    store.getFooter();

});





var product = (function() {

    function _getProduct(){
        // get json data from file
        $.getJSON('../data/data.json', function(productData) {

            //use handlebar template to format and populate product page with product data
            $.get('../templates/product.template', function (source) {
                var productTemplate = Handlebars.compile(source);
                var product = productTemplate(productData);

                $('main').append(product);

            });
        });
    }



    return {
        getProduct:        _getProduct
    }
})();




// TODO: put this in a separate JS file
var store = (function() {

    function _getHeader() {
        // get data for header from JSON file
        $.getJSON('../data/data.json', function(headerData) {
            //use handlebar template to format and populate header section
            $.get('../templates/header.template', function (source) {
                var headerTemplate = Handlebars.compile(source);
                var header = headerTemplate(headerData);
                $('header').append(header);
            });

            $.get('../templates/hero.template', function (source) {
                var heroTemplate = Handlebars.compile(source);
                var hero = heroTemplate(headerData);
                $('header').after(hero);
            });
        });
    }

    function _getFooter() {
        // get data for footer from JSON file
        $.getJSON('../data/data.json', function(footerData) {
            //use handlebar template to format and populate footer section
            $.get('../templates/footer.template', function (source) {
                var footerTemplate = Handlebars.compile(source);
                var footer = footerTemplate(footerData.general);
                $('footer').append(footer);
            });

            $.get('../templates/contact.template', function (source) {
                var contactTemplate = Handlebars.compile(source);
                var contact = contactTemplate(footerData.contacts);
                $('footer .contact').append(contact);
            });
        });
    }

    return {
        getHeader:      _getHeader,
        getFooter:      _getFooter
    }
})();