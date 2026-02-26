// Emergency scroll fix - run this in console if scroll is stuck
(function() {
    // Remove any stuck modals
    const modals = document.querySelectorAll('.modal');
    modals.forEach(m => m.remove());
    
    // Restore body scroll
    document.body.style.overflow = '';
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.width = '';
    
    // Restore html scroll
    document.documentElement.style.overflow = '';
    
    console.log('✅ Scroll restored!');
})();
