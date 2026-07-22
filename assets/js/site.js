/* Portfolio-specific behavior. Keep page content declarative through data-* attributes. */
(function () {
	'use strict';

	function scrollToTop() {
		window.scrollTo(0, 0);
		document.documentElement.scrollTop = 0;
		document.body.scrollTop = 0;
	}

	function initializeScrollPosition() {
		if ('scrollRestoration' in window.history) {
			window.history.scrollRestoration = 'manual';
		}

		document.addEventListener('DOMContentLoaded', scrollToTop);
		window.addEventListener('pageshow', function () {
			scrollToTop();
			window.requestAnimationFrame(scrollToTop);
		});
		window.addEventListener('beforeunload', scrollToTop);
	}

	function getDrivePreviewUrl(url) {
		var match = url.match(/drive\.google\.com\/file\/d\/([^/]+)/i);
		if (!match) return '';
		return 'https://drive.google.com/file/d/' + match[1] + '/preview';
	}

	function createIframe(url) {
		var frame = document.createElement('iframe');
		frame.src = url;
		frame.title = '作品紹介動画';
		frame.allow = 'autoplay; fullscreen';
		frame.allowFullscreen = true;
		frame.loading = 'lazy';
		return frame;
	}

	function createVideoPlayer(container, url) {
		var video = document.createElement('video');
		var toggle = document.createElement('button');

		video.src = url;
		video.playsInline = true;
		video.preload = 'metadata';
		video.setAttribute('playsinline', '');

		toggle.type = 'button';
		toggle.className = 'video-play-toggle';
		toggle.setAttribute('aria-label', '動画を再生');
		toggle.innerHTML = '<span aria-hidden="true"></span>';

		function updatePlaybackState() {
			var isPlaying = !video.paused && !video.ended;
			container.classList.toggle('is-playing', isPlaying);
			toggle.setAttribute('aria-label', isPlaying ? '動画を一時停止' : '動画を再生');
		}

		function togglePlayback() {
			if (video.paused || video.ended) {
				video.play();
				return;
			}
			video.pause();
		}

		video.addEventListener('loadedmetadata', function () {
			container.classList.toggle('is-portrait-video', video.videoHeight > video.videoWidth);
		});
		video.addEventListener('play', updatePlaybackState);
		video.addEventListener('pause', updatePlaybackState);
		video.addEventListener('ended', updatePlaybackState);
		video.addEventListener('click', togglePlayback);
		toggle.addEventListener('click', togglePlayback);

		container.classList.add('is-custom-video');
		container.appendChild(video);
		container.appendChild(toggle);
	}

	function hydrateVideoPlayers() {
		var players = document.querySelectorAll('.js-video-player[data-video-url]');
		for (var index = 0; index < players.length; index++) {
			var player = players[index];
			var url = (player.getAttribute('data-video-url') || '').trim();
			var previewUrl = getDrivePreviewUrl(url);
			if (previewUrl) {
				player.textContent = '';
				player.appendChild(createIframe(previewUrl));
				continue;
			}

			if (/\.(mp4|webm|ogg)(\?|#|$)/i.test(url)) {
				player.textContent = '';
				createVideoPlayer(player, url);
			}
		}
	}

	function initializeStoryToggles() {
		document.addEventListener('click', function (event) {
			var button = event.target.closest('.js-story-toggle');
			if (!button) return;

			var section = button.closest('section');
			var content = section && section.querySelector('.js-story-content');
			if (!content) return;

			var isExpanded = button.getAttribute('aria-expanded') === 'true';
			content.hidden = isExpanded;
			button.setAttribute('aria-expanded', String(!isExpanded));
			button.textContent = isExpanded ? 'ストーリーを表示' : 'ストーリーを閉じる';
		});
	}

	function showSelectedPost() {
		var selectedPost = new URLSearchParams(window.location.search).get('post');
		var posts = document.querySelectorAll('#main .post[data-post]');
		if (!selectedPost || !posts.length) return;

		var hasMatch = false;
		for (var index = 0; index < posts.length; index++) {
			var isSelected = posts[index].getAttribute('data-post') === selectedPost;
			posts[index].hidden = !isSelected;
			hasMatch = hasMatch || isSelected;
		}

		if (!hasMatch) posts[0].hidden = false;
	}

	initializeScrollPosition();
	hydrateVideoPlayers();
	initializeStoryToggles();
	showSelectedPost();
})();
