'use strict';

$(function () {


	// map

	ymaps.ready(init);
	var Map;
	var Placemark;

	function init(){
		Map = new ymaps.Map("map", {
			center: [55.58023669, 37.68833274],
			zoom: 14
		});
		Placemark = new ymaps.Placemark([55.58296634, 37.69228953], {
			hintContent: 'Москва, Загорьевская улица, 23к1',
	  	}, {
			preset: 'islands#greenDotIconWithCaption',
			iconColor: '#f0433d'
		});

		Map.geoObjects.add(Placemark);
		Map.behaviors.disable(['scrollZoom']);
	}

	// menu

	$('.filter__item').on('click', function(e){
		var menu = $(this).find('.menu__dropdown');
		if (menu.is(':hidden')) {
			menu.show();
			e.stopPropagation();
		}
	});

	$('.menu__dropdown').on('click', function(e) {
		var clickedItem = $(this);
		var menuElement = clickedItem.parent().find('.filter__text')
		var text = clickedItem.text();
		clickedItem.text(menuElement.text());
		menuElement.text(text);

		var filterText = $('.filter__text').text();

		if (filterText.indexOf('Квартиру') > -1) {
			$('.filter__text-rooms span').text('Комнат');
		} else if (filterText.indexOf('Комнату') > -1 ) {
			$('.filter__text-rooms span').text('Метраж');
		}
	});

	$(window).on('click', function (e) {
		$('.menu__dropdown').hide();
	})

	//slider

	var items = $('.similar-slider__item').toArray();

	var indexHash = {};

	slideTo(0, $('.similar-slider__list'));
	slideTo(0, $('.apartments-info__photo-list'));

	function slideTo(index, sliderContent) {
		var items = sliderContent.children().toArray();
		var result = 0;
		for (var i = 0; i < index; i++) {
			result -= $(items[i]).outerWidth(true);
		}

		sliderContent.animate({marginLeft: result}, 500);
		indexHash[sliderContent.selector] = index;
	}

	$('.similar__arrow-right').on('click', function () {
		var currentItemIndex = indexHash['.similar-slider__list'] || 0;
		if (currentItemIndex == items.length - 1) {
			currentItemIndex = - 1;
		}
		slideTo(++currentItemIndex, $('.similar-slider__list'));
	})

	$('.similar__arrow-left').on('click', function () {
		var currentItemIndex = indexHash['.similar-slider__list'] || 0;
		if (currentItemIndex == 0) {
			currentItemIndex = items.length;
		}
		slideTo(--currentItemIndex, $('.similar-slider__list'));
	})

	$('.apartments-info__photo-arrow_right').on('click', function () {
		var currentItemIndex = indexHash['.apartments-info__photo-list'] || 0;
		if (currentItemIndex == items.length - 1) {
			currentItemIndex = - 1;
		}
		slideTo(++currentItemIndex, $('.apartments-info__photo-list'));
	})

	$('.apartments-info__photo-arrow_left').on('click', function () {
		var currentItemIndex = indexHash['.apartments-info__photo-list'] || 0;
		if (currentItemIndex == 0) {
			currentItemIndex = items.length;
		}
		slideTo(--currentItemIndex, $('.apartments-info__photo-list'));
	})

	// ajax

	$('.apartments-list__icon').on('click', function () {
		var children = $(this).children();
		var selected;
		if(children.hasClass('apartments-list__star-active')) {
			children.removeClass('apartments-list__star-active');
			children.addClass('apartments-list__star')
			selected = false;
		} else {
			children.addClass('apartments-list__star-active');
			children.removeClass('apartments-list__star')
			selected = true;
		}

		$.ajax({
			url: '/favorites',
			data: {
				selected: selected ? 1 : 0,
				id: $(this).parent().attr('href').substring(1)
			}
		})
	})



});

