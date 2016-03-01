/**
 * @method Returns the first ancestor of the selected element matching the given function (fn) condition.
 * @param {Object} element that determines the search for the father.
 * @return {object} Returns the first ancestor.
 */
function closest(el, fn) {
	return el && (fn(el) ? el : closest(el.parentNode, fn));
};

/**
 * @class Contains methods useful for mobile applications and websites.
 * DOM Classes: cherry-link, cherry-menu-button, cherry-menu.
 */
function Cherry() {};

/**
 * @method Go back in the url based on browser history.
 * @return {void}
 */
Cherry.goBack = function() {
	window.history.back();
};

/**
 * @method To override to open search.
 * @param  {String} selector	Selector of the element that will fire the search box.
 * @param  {String} url url to go when user enter search.
 * @return {void}
 */
Cherry.openSearch = function(className, url) {
	// to override.
};

/**
 * @method Set the events of the elements with the given class that will fire the search when touched.
 * @param  {String} className of the element that will fire the search box.
 * @param  {String} url	Url of the search.
 * @return {void} onclick
 */
Cherry.setSearchTrigger = function(className, url) {
	var elements = document.getElementsByClassName(className);
	var element = null;
	for (var i = 0; i < elements.length; i++) {
		element = elements[i];
		element.addEventListener('touchstart', function(event) {
			Cherry.openSearch(className, url);
		}, false);
	};
};

/**
 * @method When clicking on element check if there is a link inside and go to the link url.
 * @param  {Object} handler handler containing the element clicked.
 * @return {void}
 */
Cherry.onLinkContainerClick = function(handler) {
	// select all link elements.
	var familyLink = handler.currentTarget.getElementsByTagName("a");
	if (familyLink.length > 0) {
		var urlTitle = familyLink[0].getAttribute("href");
		// redirect the user to the url of the element link.
		window.location = urlTitle;
	}
};

/**
 * @method Set the events of the elements with the given class that will fire their contained link when clicked.
 * @param  {String} className	Class name of the element/elements that contain the links.
 * @return {void}
 */
Cherry.setLinkContainer = function(className) {
	var elements = document.getElementsByClassName(className);
	Cherry.setLinkElements(elements);
};

/**
 * @method Apply styles and events to the element that will fire the link when clicked and to the links contained in the element.
 * @param  {Object} elements that contain the links and that will receive the new styles.
 * @return {void}
 */
Cherry.setLinkElements = function(elements) {
	var element = null;
	var aElements = null;

	for (var i = 0; i < elements.length; i++) {
		//element containing the links.
		element = elements[i];
		element.style.cursor = "pointer";

		// assign event on click to the element.
		element.onclick = Cherry.onLinkContainerClick;

		// assign styles to the links contained in the element.
		aElements = element.getElementsByTagName("a");
		for (var j = 0; j < aElements.length; j++) {
			aElements[j].style.textDecoration = "none";
		};
	}
};

/**
 * @method Apply link style on elements with class ".cherry-link" making the difference between a table an ul or other.
 * @return {void}
 */
Cherry.applyCherryLink = function() {
	var elements = document.getElementsByClassName("cherry-link");
	for (var i = 0; i < elements.length; i++) {
		var element = elements[i];
		if (element.tagName == "TABLE") {
			Cherry.setLinkElements(element.getElementsByTagName("tr"));
		} else if (element.tagName == "UL") {
			Cherry.setLinkElements(element.getElementsByTagName("li"));
		} else {
			Cherry.setLinkElements(element);
		}
	};
};

/**
 * @method Show the floating menu.
 * @param  {JQuery Object} button When clicked menu will be shown.
 * @param  {JQuery Object} menu   Menu to show.
 * @return {void}
 */
Cherry.showMenu = function(button, menu) {
	button.removeEventListener('touchstart', function(event) {
		Cherry.showMenu(button, menu);
	}, false);

	button.addEventListener('touchstart', function(event) {
		Cherry.hideMenu(button, menu);
	}, false);

	menu.style.display = "block";
};

/**
 * @method Hide the floating menu.
 * @param  {JQuery Object} button When clicked menu will be hidden.
 * @param  {JQuery Object} menu   Menu to be hide.
 * @return {void}
 */
Cherry.hideMenu = function(button, menu) {
	button.removeEventListener('touchstart', function(event) {
		Cherry.hideMenu(button, menu);
	}, false);

	button.addEventListener('touchstart', function(event) {
		Cherry.showMenu(button, menu);
	}, false);

	menu.style.display = "none";

};

/**
 * @method Apply floating menu comportment to button and menu
 * @param  {Object} button Button that will show/hide floating menu when pressed.
 * @param  {Object} menu   Floating menu.
 * @return {void}
 */
Cherry.menu = function(button, menu) {

	// assign event which controls the display of the menu.
	document.addEventListener('touchstart', function(event) {

		var parentElement = parentElement = closest(event.target, function(el) {
			return el == menu || el == button;
		});

		if (parentElement == null) {
			// Neither the menu nor button has been clicked, so hide the menu.
			Cherry.hideMenu(button, menu);
		}
	}, false);

	button.addEventListener('touchstart', function(event) {
		Cherry.showMenu(button, menu);
	}, false);
};

/**
 * @method Apply floating menu comportment to objects with "cherry-menu-button" (for button) and "cherry-menu" (for menu) classes.
 * @return {void}
 */
Cherry.applyCherryMenu = function() {
	var buttonElements = document.getElementsByClassName('cherry-menu-button');
	var menuElements = document.getElementsByClassName('cherry-menu');
	for (var i = 0; i < buttonElements.length; i++) {
		Cherry.menu(buttonElements[i], menuElements[i]);
	}
};

// code to apply when document is ready.
document.addEventListener("DOMContentLoaded", function(event) {
	// Apply link style on elements with class ".cherry-link" making the difference between a table an ul or other.
	Cherry.applyCherryLink();
	// Apply floating menu comportment to objects with "cherry-menu-button" (for button) and "cherry-menu" (for menu) classes.
	Cherry.applyCherryMenu();
});
