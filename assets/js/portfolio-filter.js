(function () {
    'use strict';

    document.addEventListener('DOMContentLoaded', function() {
        var filterBtns = document.querySelectorAll('.filter-btn');
        var portfolioItems = document.querySelectorAll('.minimal-card');
        var filterList = document.querySelector('.filter-button-list'); // コンテナを取得

        filterBtns.forEach(function(btn) {
            btn.addEventListener('click', function() {
                var filter = btn.getAttribute('data-filter');

                // Update active button
                filterBtns.forEach(function(b) { b.classList.remove('active'); });
                btn.classList.add('active');

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
                        item.style.animation = 'none';
                        item.offsetHeight; 
                        item.style.animation = null;
                    } else {
                        item.hidden = true;
                    }
                });
            });
        });
    });

})();
