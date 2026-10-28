// New motion stays confined to the redesigned content.
if(!matchMedia('(prefers-reduced-motion: reduce)').matches){
 const reveal=new IntersectionObserver(entries=>entries.forEach(({isIntersecting,target})=>{if(isIntersecting){target.classList.add('editorial-enter');reveal.unobserve(target)}}),{threshold:.1});
 document.querySelectorAll('.island-intro,.island-notes,.editorial-section .section-header,.villa-card,.exp-card,.gastro-text,.reserve-inner').forEach(el=>reveal.observe(el));
}

const heroVisibility=new IntersectionObserver(([entry])=>document.body.classList.toggle('reading-content',!entry.isIntersecting),{threshold:0});
heroVisibility.observe(document.getElementById('hero'));
