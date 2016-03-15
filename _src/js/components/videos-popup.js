var $ = require('jquery');
var fancybox = require('fancybox');

$(document).ready(function() {
	$(".media").fancybox({
        padding     : 0,
		maxWidth	: '80%',
		maxHeight	: '80%',
		fitToView	: true,
		width		: '80%',
		height		: '80%',
		autoSize	: true,
		closeClick	: false,
		openEffect	: 'none',
		closeEffect	: 'none'
	});
});
