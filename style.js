(function (blink) {
	'use strict';

	var edinunStyle = function () {
			blink.theme.styles.basic.apply(this, arguments);
		},
		page = blink.currentPage;

	edinunStyle.prototype = {
		//BK-15873 añadimos el estilo basic como parent para la herencia de los estilos del CKEditor
		parent: blink.theme.styles.basic.prototype,
		bodyClassName: 'content_type_clase_edinun',
		extraPlugins: ['image2'],
		ckEditorStyles: {
			name: 'edinun',
			styles: [

				{ name: 'Título 1', element: 'h4', attributes: { 'class': 'bck-title1'} },
				{ name: 'Título 2', element: 'h4', attributes: { 'class': 'bck-title2'} },
				{ name: 'Título 3', element: 'h4', attributes: { 'class': 'bck-title3'} },
				{ name: 'Título 4', element: 'h4', attributes: { 'class': 'bck-title4'} },
				{ name: 'Título 5', element: 'h4', attributes: { 'class': 'bck-title5'} },
				{ name: 'Título 6', element: 'h4', attributes: { 'class': 'bck-title6'} },

				{ name: 'Lista Ordenada 1', element: 'ol', attributes: { 'class': 'bck-ol bck-ol-1' } },
				{ name: 'Lista Ordenada 2', element: 'ol', attributes: { 'class': 'bck-ol bck-ol-2' } },
				{ name: 'Lista Ordenada 3', element: 'ol', attributes: { 'class': 'bck-ol bck-ol-3' } },
				{ name: 'Lista Ordenada 4', element: 'ol', attributes: { 'class': 'bck-ol bck-ol-4' } },
				{ name: 'Lista Ordenada 5', element: 'ol', attributes: { 'class': 'bck-ol bck-ol-5' } },
				{ name: 'Lista Ordenada 6', element: 'ol', attributes: { 'class': 'bck-ol bck-ol-6' } },

				{ name: 'Lista Desordenada 1', element: 'ul', attributes: { 'class': 'bck-ul bck-ul-1' } },
				{ name: 'Lista Desordenada 2', element: 'ul', attributes: { 'class': 'bck-ul bck-ul-2' } },
				{ name: 'Lista Desordenada 3', element: 'ul', attributes: { 'class': 'bck-ul bck-ul-3' } },
				{ name: 'Lista Desordenada 4', element: 'ul', attributes: { 'class': 'bck-ul bck-ul-4' } },
				{ name: 'Lista Desordenada 5', element: 'ul', attributes: { 'class': 'bck-ul bck-ul-5' } },
				{ name: 'Lista Desordenada 6', element: 'ul', attributes: { 'class': 'bck-ul bck-ul-6' } },

				{ name: 'Énfasis', element: 'span', attributes: { 'class': 'bck-enfasis' }},
				{ name: 'Enunciado actividad', element: 'h4', attributes: { 'class': 'bck-title-activity' }},

				{ name: 'Tabla centrada', element: 'table', type: 'bck-stack-class', attributes: { 'class': 'bck-table-center'} },
				{ name: 'Celda encabezado', element: 'td', attributes: { 'class': 'bck-td' } },
				{ name: 'Celda 1', element: 'td', attributes: { 'class': 'bck-td-1' } },
				{ name: 'Celda 2', element: 'td', attributes: { 'class': 'bck-td-2' } },
				{ name: 'Celda 3', element: 'td', attributes: { 'class': 'bck-td-3' } },
				{ name: 'Celda 4', element: 'td', attributes: { 'class': 'bck-td-4' } },
				{ name: 'Celda 5', element: 'td', attributes: { 'class': 'bck-td-5' } },
				{ name: 'Celda 6', element: 'td', attributes: { 'class': 'bck-td-6' } },

				{ name: 'Caja 1', type: 'widget', widget: 'blink_box', attributes: { 'class': 'box-1' } },
				{ name: 'Caja 2', type: 'widget', widget: 'blink_box', attributes: { 'class': 'box-2' } },
				{ name: 'Caja 3', type: 'widget', widget: 'blink_box', attributes: { 'class': 'box-3' } },
				{ name: 'Caja 4', type: 'widget', widget: 'blink_box', attributes: { 'class': 'box-4' } },
				{ name: 'Caja 5', type: 'widget', widget: 'blink_box', attributes: { 'class': 'box-5' } },
				{ name: 'Caja 6', type: 'widget', widget: 'blink_box', attributes: { 'class': 'box-6' } }
			]
		},

		init: function (scope) {
			var that = scope || this;
			//BK-15873 Utilizamos this.parent declarada al inicio de la clase
			this.parent.init.call(that);
			that.addActivityTitle();
			if(window.esWeb) return;
			that.addPageNumber();
			that.formatCarouselindicators();
			that.addSlideNavigators();
		},

		removeFinalSlide: function (scope, remove) {
			var that = scope || this;
			//BK-15873 Utilizamos this.parent declarada al inicio de la clase
			var removeFinalSlide = ((typeof remove !== "undefined") ? remove : true);
			this.parent.removeFinalSlide.call(that, removeFinalSlide);
		},

		addActivityTitle: function () {
			if (!blink.courseInfo || !blink.courseInfo.unit) return;
			$('.libro-left').find('.title').html(function () {
				return $(this).html() + ' > ' + blink.courseInfo.unit;
			})
		},

		addPageNumber: function() {
			$('.js-slider-item').each(function(i,e) {
				var idPage = $(e).attr('id');
				var page = parseInt(idPage.replace("slider-item-", ""))+1;
				$(e).find('.header').prepend('<div class="single-pagination"><div class="page">'+page+'</div></div>');
			});
		},


		formatCarouselindicators: function () {
			var $navbarBottom = $('.navbar-bottom'),
				$carouselIndicators = $('.slider-indicators').find('li');
			$navbarBottom.find('li').tooltip('destroy');

			var dropDown = '' +
					'<div class="dropdown">' +
						'<button id="dLabel" type="button" data-toggle="dropdown" aria-haspopup="true" role="button" aria-expanded="false">' +
							'Índice' +
							'<span class="caret"></span>' +
						'</button>' +
						'<ul class="dropdown-menu" role="menu" aria-labelledby="dLabel">';

			var navigatorIndex = 0;
			for (var index = 0; index < window.secuencia.length; index++) {
				var slide = eval('t'+index+'_slide'),
					slideTitle = slide.title;

				if (slide.isConcatenate) continue;

				dropDown += '<li role="presentation"><a role="menuitem">' + (navigatorIndex+1) + '. ' + stripHTML(slideTitle) + '</a></li>';
				$navbarBottom.find('li').eq(navigatorIndex).html('<span title="'+ stripHTML(slideTitle) +'">'+(navigatorIndex+1)+'</span>');
				navigatorIndex++;

			};

			dropDown += '' +
						'</ul>' +
					'</div>';

			//BK-18572 Ajustar estilo en UX
			var tmpux = '';
			blink.hasOwnProperty('checkFromUX') && blink.checkFromUX(function() { tmpux = ' tmpux'});

			$navbarBottom
				.attr('class', 'publisher-navbar'+tmpux)
				.wrapInner('<div class="navbar-content"></div>')
				.find('ol')
					.before(dropDown)
					.wrap('<div id="top-navigator"/>')
					.end()
				.find('.dropdown').find('li')
					.on('click', function (event) {
						$navbarBottom.find('ol').find('li').eq($(this).index()).trigger('click');
					});

			if (!blink.hasTouch) {
				$navbarBottom
					.find('ol').find('span')
						.tooltip({
							placement: 'bottom',
							container: 'body'
						});
			}
		},

		//BK15873 Quitamos la funcion getEditorStyles para que herede de parent
	};

	edinunStyle.prototype = _.extend({}, new blink.theme.styles.basic(), edinunStyle.prototype);

	blink.theme.styles.edinun = edinunStyle;

})( blink );

$(document).ready(function () {

    $('.item').find('.header').find('.title')
		.filter(function () {
			return $(this).find('.empty').length;
		}).hideBlink();

    $('.item').find('.header').find('.title')
		.filter(function () {
			return !$(this).find('.empty').length;
		})
		.each(function () {
			var $header = $(this).find('h3');
			$header.length && $header.html($header.html().replace(' ', ''));
		});

	// BK-8433 cambiamos el logo de las slides por el del dominio
	var src_logo = $('.content_type_clase_edinun').find('.logo_slide').attr('logo_dominio');
	if (typeof(src_logo) != 'undefined' && src_logo && src_logo != '' && src_logo.indexOf('gif1x1.gif') == -1) {
		$('.content_type_clase_edinun').find('.logo-publisher').css('background-image', "url('"+src_logo+"')");
	}
});
