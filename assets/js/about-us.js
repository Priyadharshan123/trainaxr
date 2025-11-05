// About Us interactivity: accordion + expandable team cards
 document.addEventListener('DOMContentLoaded', function() {
            var coll = document.getElementsByClassName("collapsible");
            for (var i = 0; i < coll.length; i++) {
                coll[i].addEventListener("click", function() {
                    // Close all other open sections first
                    var allCollapsible = document.getElementsByClassName("collapsible");
                    for (var j = 0; j < allCollapsible.length; j++) {
                        if (allCollapsible[j] !== this) {
                            allCollapsible[j].classList.remove("active");
                            allCollapsible[j].setAttribute('aria-expanded', 'false');
                            var otherContent = allCollapsible[j].nextElementSibling;
                            if (otherContent.style.maxHeight) {
                                otherContent.style.maxHeight = null;
                            }
                        }
                    }
                    
                    // Toggle the clicked section
                    this.classList.toggle("active");
                    var content = this.nextElementSibling;
                    if (content.style.maxHeight) {
                        content.style.maxHeight = null;
                        this.setAttribute('aria-expanded', 'false');
                    } else {
                        content.style.maxHeight = content.scrollHeight + "px";
                        this.setAttribute('aria-expanded', 'true');
                    }
                });
            }
        });

    // Team cards expand
    var teamCards = document.querySelectorAll('.team-card');
    teamCards.forEach(function (card) {
        card.addEventListener('click', function (event) {
            // Prevent click from bubbling to document
            event.stopPropagation();
            
            var open = card.classList.contains('open');
            // close siblings
            teamCards.forEach(function (c) { c.classList.remove('open'); });
            if (!open) card.classList.add('open');
        });
    });

    // Close team cards when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.team-card')) {
            teamCards.forEach(function(card) {
                card.classList.remove('open');
            });
        }
    });

    // Initialize open state for any sections that have .open on load
    document.querySelectorAll('.accordion .collapsible[aria-expanded="true"]').forEach(function (btn) {
        var content = btn.nextElementSibling;
        if (content) content.style.maxHeight = content.scrollHeight + 'px';
    });
});
