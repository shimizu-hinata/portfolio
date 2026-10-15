(function () {
    'use strict';

    document.addEventListener('DOMContentLoaded', function() {
        var filterBtns = document.querySelectorAll('.filter-btn');
        var portfolioItems = document.querySelectorAll('.minimal-card');

        filterBtns.forEach(function(btn) {
            btn.addEventListener('click', function() {
                var filter = btn.getAttribute('data-filter');

                // Update active button
                filterBtns.forEach(function(button) {
                    button.classList.remove('active');
                    button.setAttribute('aria-pressed', 'false');
                });
                btn.classList.add('active');
                btn.setAttribute('aria-pressed', 'true');

                // --- 追加: ボタンを中央にスクロール ---
                btn.scrollIntoView({
                    behavior: 'smooth',
                    block: 'nearest',
                    inline: 'center'
                });

                // Filter items
                portfolioItems.forEach(function(item) {
                    if (filter === 'all' || item.getAttribute('data-category') === filter) {
                        item.hidden = false;
                    } else {
                        item.hidden = true;
                    }
                });
            });
        });
    });

})();
