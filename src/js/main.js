require.config({
    baseUrl: 'src/js/',
    paths: {
        'jq': 'jquery-1.11.2.min',
        'handlebars': "lib/handlebars-v4.0.11",

    }
})
require(['jq', 'handlebars'], function($, handlebars) {
    $.ajax({
        url: '/render2',
        dataType: 'json',
        success: function(res) {
            console.log(res);
        }
    })
})