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

//MY ADDITIONS
// Modal Setup
const $modal = $('#project-modal');
const $modalTitle = $modal.find('.modal-title');
const $modalDesc = $modal.find('.modal-description');
const $modalImg = $modal.find('.modal-image');
const $videoFrame = $modal.find('.modal-video');
const linkContainer = $modal.find('.modal-links')[0]; // Get DOM element

// Modal Function
function openModal(projectId) {
  const data = {
    DemoReel2025: {
      title: '2025 DemoReel',
      description: 'An overview of my 2024-2025 studies.',
      video: 'https://www.youtube.com/embed/1Rp6AXl80rY?autoplay=1', // Video URL with autoplay
      links: []
    },
    leech: {
      title: 'L.E.E.C.H',
      description: 'A satirical narrative game I prototyped in Unreal...',
      image: 'images/LEECH.png',
      links: []
    },
    BP: {
      title: 'Bubble Popper!',
      description: 'Created in 2 days during the 2025 Global Game Jam...',
      image: 'images/BubblePopper.png',
      links: [
        { label: 'LinkedIn', url: 'https://www.linkedin.com/in/kvwebb' },
        { label: 'Global Game Jam', url: 'https://globalgamejam.org/2025/games/bubble-popper' }
      ]
    }
  };

  const project = data[projectId];
  if (!project) return;

  // Set Title and Description
  $modalTitle.text(project.title);
  $modalDesc.text(project.description);

  // Handle media (image or video)
  if (project.video) {
    $modalImg.hide();
    $videoFrame.show();
    $videoFrame.attr('src', project.video); // Set video source
  } else {
    $videoFrame.hide();
    $modalImg.show();
    $modalImg.attr('src', project.image || ''); // Show image if no video
  }

  // Handle Links
  linkContainer.innerHTML = ''; // Clear previous links
  if (project.links && project.links.length > 0) {
    project.links.forEach(link => {
      const a = document.createElement('a');
      a.href = link.url;
      a.target = '_blank';
      a.textContent = link.label;
      a.style.marginRight = '1em';
      a.style.display = 'inline-block';
      a.style.fontWeight = 'bold';
      a.style.color = '#0077cc';
      linkContainer.appendChild(a);
    });
  }

  // Show modal
  $modal.fadeIn(200);
}

// Close modal on X or outside click
$modal.find('.close').on('click', function () {
  $modal.fadeOut(200);
  $videoFrame.attr('src', ''); // Stop the video by clearing the iframe src
});

$modal.on('click', function (e) {
  if ($(e.target).is($modal)) {
    $modal.fadeOut(200);
    $videoFrame.attr('src', ''); // Stop the video by clearing the iframe src
  }
});