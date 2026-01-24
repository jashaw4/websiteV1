document.addEventListener('DOMContentLoaded', function() {
    const signaturePaths = document.querySelectorAll('.signature-path');
    const signatureSVG = document.getElementById('animated-signature-svg');

    // Get path lengths and set initial state for each path
    signaturePaths.forEach(path => {
        const pathLength = path.getTotalLength();
        path.setAttribute('data-length', pathLength); // Store length as data attribute
        path.style.strokeDasharray = pathLength;
        path.style.strokeDashoffset = pathLength;
        path.style.transition = 'none'; // Disable transition initially
    });

    // Function to play the animation for all paths
    function playSignatureAnimation() {
        signaturePaths.forEach(path => {
            const pathLength = path.getAttribute('data-length');

            // Reset the animation to its start state (hidden)
            path.style.transition = 'none';
            path.style.strokeDashoffset = pathLength;

            // Force a reflow/repaint to apply the reset instantly
            void path.offsetWidth;

            // Apply the transition and trigger the animation
            path.style.transition = 'stroke-dashoffset 3s ease-out'; // Animation duration matching CSS keyframes
            path.style.strokeDashoffset = 0;
        });
    }

    // Add click listener to the SVG
    if (signatureSVG) {
        signatureSVG.addEventListener('click', function(e) {
            e.preventDefault(); // Prevent default link behavior if it's wrapped in <a>
            playSignatureAnimation();
        });
    }

    // Optionally, play animation once on page load as well
    // playSignatureAnimation();
});