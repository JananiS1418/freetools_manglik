document.addEventListener('DOMContentLoaded', function() {
    const calcForm = document.getElementById('calcForm');
    const calcBtn = document.getElementById('calcBtn');
    const resultSection = document.getElementById('resultSection');

    if (calcForm && calcBtn && resultSection) {
        calcForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Prevent double submission animation
            if (calcBtn.disabled) return;

            // 1. Start loading state
            calcBtn.disabled = true;
            const originalText = calcBtn.innerHTML;
            
            // Loading sequence
            calcBtn.innerHTML = '<span class="icon">✨</span> Analyzing Birth Chart...';
            
            setTimeout(() => {
                calcBtn.innerHTML = '<span class="icon">✨</span> Checking Mars Position...';
            }, 300);

            setTimeout(() => {
                calcBtn.innerHTML = '<span class="icon">✨</span> Calculating Manglik Dosha...';
            }, 600);

            // 2. Reveal results after loading
            setTimeout(() => {
                // Restore button state
                calcBtn.innerHTML = originalText;
                calcBtn.disabled = false;

                // Show the section
                resultSection.style.display = 'block';

                // Force a reflow so CSS transitions work
                void resultSection.offsetWidth;

                // Scroll smoothly to the result section
                resultSection.scrollIntoView({ behavior: 'smooth', block: 'start' });

                // Add animation class slightly after scroll starts
                setTimeout(() => {
                    resultSection.classList.add('animated');
                    
                    // Add some CSS classes to the cards for fade up
                    const cards = resultSection.querySelectorAll('.result-card, .stats-grid');
                    cards.forEach(card => card.classList.add('fade-up-anim'));
                    
                    createConfetti();
                }, 200);

            }, 1000); // Wait 1 second before showing results
        });
    }

    function createConfetti() {
        const container = document.getElementById('successParticles');
        if (!container) return;

        // Clear existing
        container.innerHTML = '';

        for (let i = 0; i < 30; i++) {
            const particle = document.createElement('div');
            
            // Random properties
            const size = Math.random() * 8 + 4;
            const x = Math.random() * 100;
            const y = Math.random() * 100;
            const duration = Math.random() * 2 + 1;
            const delay = Math.random() * 0.5;
            
            particle.style.position = 'absolute';
            particle.style.left = `${x}%`;
            particle.style.top = `${y}%`;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.backgroundColor = Math.random() > 0.5 ? '#D4AF37' : '#22c55e';
            particle.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
            particle.style.opacity = '0';
            particle.style.boxShadow = '0 0 10px rgba(212, 175, 55, 0.5)';
            
            // Animate using Web Animations API
            particle.animate([
                { opacity: 0, transform: `translate(0, 0) scale(0)` },
                { opacity: 1, transform: `translate(${(Math.random() - 0.5) * 100}px, ${(Math.random() - 0.5) * 100}px) scale(1)` },
                { opacity: 0, transform: `translate(${(Math.random() - 0.5) * 200}px, ${(Math.random() - 0.5) * 200}px) scale(0)` }
            ], {
                duration: duration * 1000,
                delay: delay * 1000,
                easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
                fill: 'forwards'
            });

            container.appendChild(particle);
        }
    }
});
