$(document).ready(function() {
    product.getProduct();

    store.getHeader();
    store.getFooter();

    // workaround for the popover not dismissing on mobile
    $(document).click(function (e) {
        if ($(e.target).parents('.popover').length)  {
            $('.popover').popover('hide');
        }
    });
});

var product = (function() {

    function _getProduct(){
        // get json data from file
        $.getJSON('../data/data.json', function(productData) {

            //load products to page, once they're up there, attach click handlers and poppers
            new Promise(function (resolve, reject) {
                //use handlebar template to format and populate product page with product data
                $.get('../templates/product.template', function (source) {
                    var productTemplate = Handlebars.compile(source);
                    var product = productTemplate(productData);

                    $('main').append(product);
                    resolve();
                });
            })
            .then(function() {
                attachClickHandlers();
            });
        });
    }

    function attachClickHandlers() {
        //attach handler to "add to bag" button to control adding product to bag
        $('button.add-to-bag').click(addToBag);
    }

    function addToBag() {
        // get the cid of the product
        // (this could technically work for both products with and without variants)
        var cid = $(this).closest('[id]').data('productcid');
        var url = 'https://www.beautylish.com/rest/interview-variant';

        $.ajax({
            url: url,
            method: 'POST',
            dataType: 'json',
            data: {cid: cid},
            beforeSend: function(){
                $('#cid-' + cid + ' .add-to-bag').html('Adding....');
            }
        }).done(function(data) {
            //show popover if successful
            getPopover(data);
        }).fail(function(error){
            console.log(error);
        });
    }

    function getPopover(data) {
        // attach popovers to button with json data

        $.getJSON('../data/data.json', function(productData) {

            /*
             // this was used to get the product data from the json file because the success response was incorrect
             // as per email discussion with Sameer, using incorrect success response instead to populate the popover
             var productName = productData.variants.filter(function (item) {
             return item.cid === data.cid
             }).map(function (item) {
             return item.name;
             });
             */

            var addToBagTemplate = '<div class="atb popover" role="tooltip">' +
                '<div class="arrow"></div>' +
                '<h3 class="popover-header"></h3>' +
                '<div class="popover-body"></div>' +
                '</div>';

            var addToBagContent = '<div class="text-header">ADDED</div>' +
                '<div class="product-name">'+ productData.product.name + '<br>'+
                '' + data.name + '</div>' +
                '<button class="view-bag">View Bag &#9654;</button></button></div>';

            $('#cid-' + data.cid + ' .add-to-bag').popover({
                title: productData.brand.name,
                placement: 'left',
                trigger: 'focus',
                html: true,
                content: addToBagContent,
                template: addToBagTemplate,
                offset: '40px'
            });

            $('#cid-' + data.cid + ' .add-to-bag').html('Added!');
            $('#cid-' + data.cid + ' .add-to-bag').popover('show');
        });
    }

    return {
        getProduct:     _getProduct
    }
})();

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