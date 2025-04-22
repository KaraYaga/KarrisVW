/*
	Read Only by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var $window = $(window),
		$body = $('body'),
		$header = $('#header'),
		$titleBar = null,
		$nav = $('#nav'),
		$wrapper = $('#wrapper');

	// Breakpoints.
		breakpoints({
			xlarge:   [ '1281px',  '1680px' ],
			large:    [ '1025px',  '1280px' ],
			medium:   [ '737px',   '1024px' ],
			small:    [ '481px',   '736px'  ],
			xsmall:   [ null,      '480px'  ],
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Tweaks/fixes.

		// Polyfill: Object fit.
			if (!browser.canUse('object-fit')) {

				$('.image[data-position]').each(function() {

					var $this = $(this),
						$img = $this.children('img');

					// Apply img as background.
						$this
							.css('background-image', 'url("' + $img.attr('src') + '")')
							.css('background-position', $this.data('position'))
							.css('background-size', 'cover')
							.css('background-repeat', 'no-repeat');

					// Hide img.
						$img
							.css('opacity', '0');

				});

			}

	// Header Panel.

		// Nav.
			var $nav_a = $nav.find('a');

			$nav_a
				.addClass('scrolly')
				.on('click', function() {

					var $this = $(this);

					// External link? Bail.
						if ($this.attr('href').charAt(0) != '#')
							return;

					// Deactivate all links.
						$nav_a.removeClass('active');

					// Activate link *and* lock it (so Scrollex doesn't try to activate other links as we're scrolling to this one's section).
						$this
							.addClass('active')
							.addClass('active-locked');

				})
				.each(function() {

					var	$this = $(this),
						id = $this.attr('href'),
						$section = $(id);

					// No section for this link? Bail.
						if ($section.length < 1)
							return;

					// Scrollex.
						$section.scrollex({
							mode: 'middle',
							top: '5vh',
							bottom: '5vh',
							initialize: function() {

								// Deactivate section.
									$section.addClass('inactive');

							},
							enter: function() {

								// Activate section.
									$section.removeClass('inactive');

								// No locked links? Deactivate all links and activate this section's one.
									if ($nav_a.filter('.active-locked').length == 0) {

										$nav_a.removeClass('active');
										$this.addClass('active');

									}

								// Otherwise, if this section's link is the one that's locked, unlock it.
									else if ($this.hasClass('active-locked'))
										$this.removeClass('active-locked');

							}
						});

				});

		// Title Bar.
			$titleBar = $(
				'<div id="titleBar">' +
					'<a href="#header" class="toggle"></a>' +
					'<span class="title">' + $('#logo').html() + '</span>' +
				'</div>'
			)
				.appendTo($body);

		// Panel.
			$header
				.panel({
					delay: 500,
					hideOnClick: true,
					hideOnSwipe: true,
					resetScroll: true,
					resetForms: true,
					side: 'right',
					target: $body,
					visibleClass: 'header-visible'
				});

	// Scrolly.
		$('.scrolly').scrolly({
			speed: 1000,
			offset: function() {

				if (breakpoints.active('<=medium'))
					return $titleBar.height();

				return 0;

			}
		});

})(jQuery);

///MY ADDITIONS
// Modal Setup

function openModal(projectId) {
	// Find the modal and elements inside it
	const $modal = $('#project-modal');
	const $modalTitle = $modal.find('.modal-title');
	const $modalDesc = $modal.find('.modal-description');
	const $modalImg = $modal.find('.modal-image');
	const $videoFrame = $modal.find('.modal-video');
	const linkContainer = $modal.find('.modal-links')[0];  // This is a plain DOM element (not jQuery)
  
	const data = {
	  DemoReel2025: {
		title: '2025 DemoReel',
		video: 'https://www.youtube.com/embed/1Rp6AXl80rY?autoplay=1',
		links: []
	  },
	  leech: {
		title: 'L.E.E.C.H',
		video: 'https://www.youtube.com/embed/heLmN15bNNM?autoplay=1',
		links: 
		[
			{label : 'GitHub', url: 'https://github.com/KaraYaga/L.E.E.C.H_Prototype', icon: 'fa-brands fa-github'},
		]
	  },
	  BP: {
		title: 'Bubble Popper!',
		video: 'https://www.youtube.com/embed/H2MdBFFn6f4?autoplay=1',
		links: [
			{ label: 'LinkedIn', url: 'https://www.linkedin.com/posts/kvwebb_globalgamejam-artfx-gamedev-activity-7299728797275152384-07Cu?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAAE4Gz24Bn0wUTsjcUJhbOqQcJAefb1kvo4g', icon: 'fa-brands fa-linkedin' },
			{ label: 'Global Game Jam', url: 'https://globalgamejam.org/games/2025/bubble-popper-have-nice-trip-5', icon: 'fa fa-gamepad' }
		]
	  }
	};
  
	const project = data[projectId];
	if (!project) return;
  
	// Set the modal title and description
	$modalTitle.text(project.title);
	$modalDesc.text(project.description);
  
	// Show video or image
	if (project.video) {
	  $modalImg.hide();
	  $videoFrame.show();
	  $videoFrame.attr('src', project.video);
	} else {
	  $videoFrame.hide();
	  $modalImg.show().attr('src', project.image || '');
	}
  
	// Add links if available
	linkContainer.innerHTML = '';  // Clear previous links
	if (project.links) {
	  project.links.forEach(link => {
		const a = document.createElement('a');
		a.href = link.url;
		a.target = '_blank';
		a.textContent = link.label;
		a.style.marginRight = '1em';
		a.style.fontWeight = 'bold';
		a.style.color = '#0077cc';
		linkContainer.appendChild(a);
	  });
	}
  
	// Show the modal
	$modal.fadeIn(200);
  }
  
  // Close modal and stop video
  $modal.find('.close').on('click', () => {
	$modal.fadeOut(200);
	$videoFrame.attr('src', '');  // Stop video
  });
  
  $modal.on('click', function (e) {
	if ($(e.target).is($modal)) {
	  $modal.fadeOut(200);
	  $videoFrame.attr('src', '');  // Stop video
	}
  });