/* Portfolio-specific behavior. Keep page content declarative through data-* attributes. */
(function () {
	'use strict';

	function getHashTarget() {
		var id = decodeURIComponent(window.location.hash.slice(1));
		return id ? document.getElementById(id) : null;
	}

	function scrollToTop() {
		var target = getHashTarget();
		if (target) {
			target.scrollIntoView();
			return;
		}
		window.scrollTo(0, 0);
		document.documentElement.scrollTop = 0;
		document.body.scrollTop = 0;
	}

	function initializeScrollPosition() {
		if ('scrollRestoration' in window.history) {
			window.history.scrollRestoration = 'manual';
		}

		document.addEventListener('DOMContentLoaded', scrollToTop);
		window.addEventListener('load', scrollToTop);
		window.addEventListener('pageshow', function () {
			scrollToTop();
			window.requestAnimationFrame(scrollToTop);
		});
		window.addEventListener('beforeunload', scrollToTop);
	}

	function getDriveFileId(url) {
		var match = url.match(/drive\.google\.com\/file\/d\/([^/]+)/i);
		return match ? match[1] : '';
	}

	function getDrivePreviewUrl(url) {
		var fileId = getDriveFileId(url);
		if (!fileId) return '';
		return 'https://drive.google.com/file/d/' + fileId + '/preview';
	}

	function getDriveDirectVideoUrl(url) {
		var fileId = getDriveFileId(url);
		if (!fileId) return '';
		return 'https://drive.google.com/uc?export=download&id=' + fileId;
	}

	function getYouTubeEmbedUrl(url) {
		var match = url.match(/(?:youtube\.com\/(?:embed\/|watch\?(?:.*&)?v=)|youtu\.be\/)([\w-]{11})/i);
		return match ? 'https://www.youtube.com/embed/' + match[1] : '';
	}

	function shouldPreferNativeVideo(player) {
		if (player.getAttribute('data-video-mode') === 'native') return true;
		return !!player.closest('.mini-work-card');
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
		return video;
	}

	function createDriveVideoWithIframeFallback(container, directUrl, previewUrl) {
		var video = createVideoPlayer(container, directUrl);

		video.addEventListener('error', function () {
			container.classList.remove('is-custom-video', 'is-playing', 'is-portrait-video');
			container.textContent = '';
			container.appendChild(createIframe(previewUrl));
		}, { once: true });
	}

	function hydrateVideoPlayers() {
		var players = document.querySelectorAll('.js-video-player[data-video-url]');
		for (var index = 0; index < players.length; index++) {
			var player = players[index];
			var url = (player.getAttribute('data-video-url') || '').trim();
			var previewUrl = getDrivePreviewUrl(url);
			var directDriveUrl = getDriveDirectVideoUrl(url);
			var youTubeUrl = getYouTubeEmbedUrl(url);

			if (youTubeUrl) {
				player.textContent = '';
				player.appendChild(createIframe(youTubeUrl));
				continue;
			}

			if (previewUrl && shouldPreferNativeVideo(player) && directDriveUrl) {
				player.textContent = '';
				createDriveVideoWithIframeFallback(player, directDriveUrl, previewUrl);
				continue;
			}

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

	function initializeSiteNavigation() {
		var shell = document.createElement('div');
		var toggle = document.createElement('button');
		var backdrop = document.createElement('button');
		var panel = document.createElement('div');
		var panelHeader = document.createElement('div');
		var title = document.createElement('h2');
		var closeButton = document.createElement('button');
		var navigation = document.createElement('nav');
		var pageNavigationGroup = document.createElement('section');
		var pageNavigationLabel = document.createElement('p');
		var primaryLinks = document.createElement('ul');
		var projects = document.createElement('details');
		var projectsSummary = document.createElement('summary');
		var projectLinks = document.createElement('ul');
		var projectToc = document.querySelector('.project-toc');
		var wrapper = document.getElementById('wrapper');
		var currentPage = window.location.pathname.split('/').pop() || 'index.html';
		var closeTimer;
		var isClosing = false;
		var shouldRestoreFocus = false;

		shell.className = 'site-menu-shell';
		toggle.type = 'button';
		toggle.className = 'site-menu-toggle';
		toggle.setAttribute('aria-controls', 'site-menu-panel');
		toggle.setAttribute('aria-expanded', 'false');
		toggle.setAttribute('aria-haspopup', 'dialog');
		toggle.setAttribute('aria-label', 'メニューを開く');
		toggle.innerHTML = '<span class="site-menu-icon" aria-hidden="true"><span></span><span></span><span></span></span>';

		backdrop.type = 'button';
		backdrop.className = 'site-menu-backdrop';
		backdrop.setAttribute('aria-label', 'メニューを閉じる');
		backdrop.setAttribute('aria-hidden', 'true');
		backdrop.inert = true;

		panel.id = 'site-menu-panel';
		panel.className = 'site-menu-panel';
		panel.setAttribute('role', 'dialog');
		panel.setAttribute('aria-modal', 'true');
		panel.setAttribute('aria-labelledby', 'site-menu-title');
		panel.setAttribute('tabindex', '-1');
		panel.setAttribute('aria-hidden', 'true');
		panel.inert = true;

		panelHeader.className = 'site-menu-header';
		title.id = 'site-menu-title';
		title.textContent = 'ページを移動';
		closeButton.type = 'button';
		closeButton.className = 'site-menu-close';
		closeButton.setAttribute('aria-label', 'メニューを閉じる');
		closeButton.innerHTML = '<span class="site-menu-close-icon" aria-hidden="true"></span>';
		panelHeader.appendChild(title);
		panelHeader.appendChild(closeButton);

		navigation.setAttribute('aria-label', 'サイト内ナビゲーション');
		pageNavigationGroup.className = 'site-menu-page-navigation';
		pageNavigationLabel.className = 'site-menu-section-label';
		pageNavigationLabel.textContent = 'このページ';
		primaryLinks.className = 'site-menu-links';
		projects.className = 'site-menu-projects';
		projectsSummary.textContent = '他の作品へ移動';
		projectLinks.className = 'site-menu-links';

		function createLink(label, href, list) {
			var item = document.createElement('li');
			var link = document.createElement('a');
			link.href = href;
			link.textContent = label;
			if (href.split('#')[0] === currentPage) {
				link.setAttribute('aria-current', 'page');
			}
			item.appendChild(link);
			list.appendChild(item);
		}

		if (projectToc) {
			var pageNavigation = projectToc.cloneNode(true);
			pageNavigation.className = 'site-menu-page-toc';
			pageNavigation.setAttribute('aria-label', 'このページ内の目次');
			pageNavigation.removeAttribute('id');
			pageNavigation.querySelectorAll('[id]').forEach(function (element) {
				element.removeAttribute('id');
			});
			pageNavigationGroup.appendChild(pageNavigationLabel);
			pageNavigationGroup.appendChild(pageNavigation);
			navigation.appendChild(pageNavigationGroup);
		}

		createLink('トップページ', 'index.html', primaryLinks);
		createLink('主要作品', 'index.html#projects', primaryLinks);
		createLink('作品の実装例', 'index.html#implementation-examples', primaryLinks);
		createLink('簡易マニュアル', 'manual.html', primaryLinks);
		[
			['Kaomoji Clash', 'kaomoji.html'],
			['Bomb Crash', 'bombcrash.html'],
			['Algomate Colony', 'algomate.html'],
			['指道場（FingerDojo）', 'fingerdojo.html'],
			['Kaomoji Clash / Reloaded', 'kaomoji-reloaded.html'],
			['AbsoluteColor', 'absolutecolor.html'],
			['超回転！ぶーめらんブレード', 'swordslicer.html']
		].forEach(function (project) {
			createLink(project[0], project[1], projectLinks);
		});

		projects.appendChild(projectsSummary);
		projects.appendChild(projectLinks);
		navigation.appendChild(primaryLinks);
		navigation.appendChild(projects);
		panel.appendChild(panelHeader);
		panel.appendChild(navigation);
		shell.appendChild(toggle);
		shell.appendChild(backdrop);
		shell.appendChild(panel);
		document.body.appendChild(shell);

		function finishClose(restoreFocus) {
			window.clearTimeout(closeTimer);
			panel.setAttribute('aria-hidden', 'true');
			panel.inert = true;
			backdrop.setAttribute('aria-hidden', 'true');
			backdrop.inert = true;
			toggle.hidden = false;
			document.body.classList.remove('is-site-menu-open');
			if (wrapper) {
				wrapper.removeAttribute('aria-hidden');
				wrapper.removeAttribute('inert');
			}
			isClosing = false;
			shouldRestoreFocus = false;
			if (restoreFocus) toggle.focus();
		}

		function closeMenu(restoreFocus) {
			if (panel.inert || isClosing) return;
			isClosing = true;
			shouldRestoreFocus = restoreFocus;
			panel.classList.remove('is-open');
			backdrop.classList.remove('is-open');
			toggle.setAttribute('aria-expanded', 'false');
			toggle.setAttribute('aria-label', 'メニューを開く');
			if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
				finishClose(restoreFocus);
				return;
			}
			closeTimer = window.setTimeout(function () {
				finishClose(restoreFocus);
			}, 360);
		}

		function openMenu() {
			if (!panel.inert || isClosing) return;
			window.clearTimeout(closeTimer);
			isClosing = false;
			toggle.hidden = true;
			toggle.setAttribute('aria-expanded', 'true');
			toggle.setAttribute('aria-label', 'メニューを閉じる');
			panel.setAttribute('aria-hidden', 'false');
			panel.inert = false;
			backdrop.setAttribute('aria-hidden', 'false');
			backdrop.inert = false;
			document.body.classList.add('is-site-menu-open');
			if (wrapper) {
				wrapper.setAttribute('aria-hidden', 'true');
				wrapper.setAttribute('inert', '');
			}
			void panel.offsetWidth;
			void backdrop.offsetWidth;
			panel.classList.add('is-open');
			backdrop.classList.add('is-open');
			closeButton.focus({ preventScroll: true });
		}

		toggle.addEventListener('click', function () {
			if (panel.inert) {
				openMenu();
			} else {
				closeMenu(true);
			}
		});
		closeButton.addEventListener('click', function () {
			closeMenu(true);
		});
		backdrop.addEventListener('click', function () {
			closeMenu(true);
		});
		navigation.addEventListener('click', function (event) {
			if (event.target.closest('a')) closeMenu(false);
		});
		panel.addEventListener('transitionend', function (event) {
			if (isClosing && event.target === panel && event.propertyName === 'transform') {
				finishClose(shouldRestoreFocus);
			}
		});
		document.addEventListener('keydown', function (event) {
			if (panel.inert || isClosing) return;
			if (event.key === 'Escape') {
				closeMenu(true);
				return;
			}
			if (event.key !== 'Tab') return;

			var focusable = Array.prototype.filter.call(
				panel.querySelectorAll('button:not([disabled]), a[href], summary'),
				function (element) {
					return element.getClientRects().length > 0;
				}
			);
			var first = focusable[0];
			var last = focusable[focusable.length - 1];
			if (event.shiftKey && document.activeElement === first) {
				event.preventDefault();
				last.focus();
			} else if (!event.shiftKey && document.activeElement === last) {
				event.preventDefault();
				first.focus();
			}
		});
	}

	function initializeThemeSwitcher() {
		var group = document.createElement('div');
		group.className = 'theme-switch';
		group.setAttribute('role', 'group');
		group.setAttribute('aria-label', '表示テーマ');

		[
			{ theme: 'light', label: '☀テラコッタ' },
			{ theme: 'dark', label: '☾ナイト' }
		].forEach(function (option) {
			var button = document.createElement('button');
			button.type = 'button';
			button.className = 'theme-switch-button';
			button.setAttribute('data-theme-choice', option.theme);
			button.textContent = option.label;
			button.addEventListener('click', function () {
				document.documentElement.setAttribute('data-theme', option.theme);
				try {
					window.localStorage.setItem('portfolio-theme', option.theme);
				} catch (error) {
					// Keep the current-page choice even when storage is unavailable.
				}
				updateThemeSwitcher(group, option.theme);
			});
			group.appendChild(button);
		});

		document.body.appendChild(group);
		updateThemeSwitcher(group, document.documentElement.getAttribute('data-theme'));
	}

	function updateThemeSwitcher(group, theme) {
		group.querySelectorAll('[data-theme-choice]').forEach(function (button) {
			var isSelected = button.getAttribute('data-theme-choice') === theme;
			button.setAttribute('aria-pressed', String(isSelected));
			button.classList.toggle('is-selected', isSelected);
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

	function initializeReadingExperience() {
		if (!('IntersectionObserver' in window)) return;

		var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		if (!prefersReducedMotion) {
			var revealTargets = document.querySelectorAll(
				'#main .portfolio-hero, #main .portfolio-section, #main .strengths-section, #main .post > header.project-header, #main .post > section, #main .design-flow-card, #main .design-flow-steps li, #main .implementation-grid article, #main .strength-card, #main .infographic-step'
			);
			var revealObserver = new IntersectionObserver(function (entries, observer) {
				entries.forEach(function (entry) {
					if (!entry.isIntersecting) return;
					entry.target.classList.add('is-visible');
					observer.unobserve(entry.target);
				});
			}, { rootMargin: '0px 0px -8% 0px', threshold: 0.06 });

			revealTargets.forEach(function (target, index) {
				if (target.hidden || target.getBoundingClientRect().top < window.innerHeight * 0.88) return;
				target.style.setProperty('--reveal-delay', (index % 4) * 70 + 'ms');
				target.classList.add('portfolio-reveal-pending');
				revealObserver.observe(target);
			});
		}

		var toc = document.querySelector('.project-toc');
		if (!toc) return;

		var links = Array.from(document.querySelectorAll('.project-toc a[href^="#"], .site-menu-page-toc a[href^="#"]'));
		var sections = Array.from(toc.querySelectorAll('a[href^="#"]')).map(function (link) {
			return document.getElementById(decodeURIComponent(link.hash.slice(1)));
		}).filter(Boolean);
		if (!sections.length) return;

		function updateCurrentSection() {
			var current = null;
			var marker = window.innerHeight * 0.3;
			sections.forEach(function (section) {
				if (section.getBoundingClientRect().top <= marker) current = section;
			});
			links.forEach(function (link) {
				if (current && decodeURIComponent(link.hash.slice(1)) === current.id) {
					link.setAttribute('aria-current', 'location');
				} else {
					link.removeAttribute('aria-current');
				}
			});
		}

		window.addEventListener('scroll', updateCurrentSection, { passive: true });
		window.addEventListener('resize', updateCurrentSection, { passive: true });
		updateCurrentSection();
	}

	initializeScrollPosition();
	initializeSiteNavigation();
	initializeThemeSwitcher();
	hydrateVideoPlayers();
	initializeStoryToggles();
	showSelectedPost();
	initializeReadingExperience();
})();
