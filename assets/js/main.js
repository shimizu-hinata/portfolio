/*
	Future Imperfect by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var	$window = $(window),
		$body = $('body'),
		$menu = $('#menu'),
		$sidebar = $('#sidebar'),
		$main = $('#main');

	// Always start from the top when opening this site.
		function forceScrollTop() {
			window.scrollTo(0, 0);
			document.documentElement.scrollTop = 0;
			document.body.scrollTop = 0;
		}

		if ('scrollRestoration' in window.history) {
			window.history.scrollRestoration = 'manual';
		}

		document.addEventListener('DOMContentLoaded', forceScrollTop);

		$window.on('pageshow', function() {
			forceScrollTop();
			window.requestAnimationFrame(forceScrollTop);
		});

		$window.on('beforeunload', forceScrollTop);

	// Breakpoints.
		breakpoints({
			xlarge:   [ '1281px',  '1680px' ],
			large:    [ '981px',   '1280px' ],
			medium:   [ '737px',   '980px'  ],
			small:    [ '481px',   '736px'  ],
			xsmall:   [ null,      '480px'  ]
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			forceScrollTop();
			window.requestAnimationFrame(forceScrollTop);
			window.setTimeout(forceScrollTop, 0);
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Menu.
		$menu
			.appendTo($body)
			.panel({
				delay: 500,
				hideOnClick: true,
				hideOnSwipe: true,
				resetScroll: true,
				resetForms: true,
				side: 'right',
				target: $body,
				visibleClass: 'is-menu-visible'
			});

	// Search (header).
		var $search = $('#search'),
			$search_input = $search.find('input');

		$body
			.on('click', '[href="#search"]', function(event) {

				event.preventDefault();

				// Not visible?
					if (!$search.hasClass('visible')) {

						// Reset form.
							$search[0].reset();

						// Show.
							$search.addClass('visible');

						// Focus input.
							$search_input.focus();

					}

			});

		$search_input
			.on('keydown', function(event) {

				if (event.keyCode == 27)
					$search_input.blur();

			})
			.on('blur', function() {
				window.setTimeout(function() {
					$search.removeClass('visible');
				}, 100);
			});

	// Intro.
		var $intro = $('#intro');

		// Move to main on <=large, back to sidebar on >large.
			breakpoints.on('<=large', function() {
				$intro.prependTo($main);
			});

			breakpoints.on('>large', function() {
				$intro.prependTo($sidebar);
			});

	// Video embeds.
		function extractDriveFileId(rawUrl) {
			var match = rawUrl.match(/\/file\/d\/([^/]+)/i);
			return match ? match[1] : '';
		}

		function toDrivePreviewUrl(rawUrl) {
			if (!rawUrl || rawUrl.indexOf('drive.google.com') === -1)
				return '';

			if (rawUrl.indexOf('/preview') !== -1)
				return rawUrl;

			var fileId = extractDriveFileId(rawUrl);
			return fileId ? 'https://drive.google.com/file/d/' + fileId + '/preview' : '';
		}

		function appendIframe(container, previewUrl) {
			var frame = document.createElement('iframe');
			frame.src = previewUrl;
			frame.style.display = 'block';
			frame.style.width = '100%';
			frame.style.aspectRatio = '16 / 9';
			frame.style.height = 'auto';
			frame.style.border = '0';
			frame.allow = 'autoplay; fullscreen';
			frame.allowFullscreen = true;
			frame.loading = 'lazy';
			container.innerHTML = '';
			container.appendChild(frame);
		}

		(function hydrateVideoPlayers() {
			var players = document.querySelectorAll('.js-video-player[data-video-url]');

			for (var i = 0; i < players.length; i++) {
				var container = players[i];
				var rawUrl = (container.getAttribute('data-video-url') || '').trim();
				if (!rawUrl)
					continue;

				var drivePreviewUrl = toDrivePreviewUrl(rawUrl);
				if (drivePreviewUrl) {
					appendIframe(container, drivePreviewUrl);
					continue;
				}

				if (/\.(mp4|webm|ogg)(\?|#|$)/i.test(rawUrl)) {
					var video = document.createElement('video');
					var source = document.createElement('source');
					video.controls = true;
					video.preload = 'metadata';
					video.style.width = '100%';
					video.style.height = 'auto';
					video.style.display = 'block';
					source.src = rawUrl;
					video.appendChild(source);
					container.innerHTML = '';
					container.appendChild(video);
				}
			}
		})();

})(jQuery);
