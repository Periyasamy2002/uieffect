// Simple JS for demo interactions
document.addEventListener('DOMContentLoaded', function(){
    console.log("Atula International site loaded.");
    const form = document.getElementById('contact-form');
    if(form){
        form.addEventListener('submit', function(e){
            e.preventDefault();
            alert('Thank you! Your message has been recorded (demo).');
            form.reset();
        });
    }

    // Initialize AOS
    if(typeof AOS !== 'undefined'){
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
            offset: 100
        });
    }

    // Initialize reveal-on-scroll animations
    initRevealAnimations();
});

function toggleDark() {
    document.body.classList.toggle("dark");
}

/* changed code: reveal animation setup */
function initRevealAnimations(){
    // Respect users who prefer reduced motion
    if(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches){
        document.querySelectorAll('section, header, .product-card, .info-box, .u3-box, .about-summary, .parallax-overlay, .slice-slider, .u2-about, .u3-vision, .u4-statement, .intro-section, .contact-area, .map-section, .tab-content').forEach(el=>{
            el.classList.add('visible'); // show everything immediately
        });
        return;
    }

    // Build unique set of elements to observe
    const selectors = ['header', 'section', '.product-card', '.info-box', '.u3-box', '.about-summary', '.parallax-overlay', '.slice-slider', '.u2-about', '.u3-vision', '.u4-statement', '.intro-section', '.contact-area', '.map-section', '.tab-content'];
    const elements = [];
    selectors.forEach(sel => document.querySelectorAll(sel).forEach(el => elements.push(el)));

    // Add base 'reveal' class and mark immediate children as stagger children
    elements.forEach(el => {
        if(!el.classList.contains('reveal')) el.classList.add('reveal');
        // small set of children for stagger effect
        Array.from(el.children).slice(0,8).forEach((ch, idx) => ch.classList.add('stagger-child'));
    });

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if(entry.isIntersecting){
                const el = entry.target;
                el.classList.add('visible');
                // apply small incremental transitionDelay to stagger children
                el.querySelectorAll('.stagger-child').forEach((child, i) => {
                    child.style.transitionDelay = (i * 70) + 'ms';
                    child.classList.add('visible'); // optional for child-specific rules
                });
                obs.unobserve(el);
            }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

    elements.forEach(el => observer.observe(el));
}
