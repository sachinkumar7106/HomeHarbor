document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("search-input");
    const suggestionsDropdown = document.getElementById("search-suggestions");
    
    if (!searchInput || !suggestionsDropdown) return;
    
    let activeIndex = -1;
    let debounceTimeout = null;
    let suggestionsData = [];

    // Helper function to escape HTML output
    function escapeHTML(str) {
        if (!str) return "";
        return str
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }

    // Function to render suggestions dropdown
    function renderSuggestions(suggestions) {
        suggestionsData = suggestions;
        activeIndex = -1;
        
        if (suggestions.length === 0) {
            suggestionsDropdown.innerHTML = `
                <div class="suggestion-empty">
                    No matching destinations found
                </div>
            `;
        } else {
            const htmlContent = suggestions.map((item, index) => {
                const imgUrl = item.image && item.image.url ? item.image.url : "/images/placeholder.jpg";
                return `
                    <a href="/listings/${item._id}" class="suggestion-item" data-index="${index}">
                        <img src="${imgUrl}" class="suggestion-img" alt="${escapeHTML(item.title)}" onerror="this.src='/images/placeholder.jpg';">
                        <div class="suggestion-info">
                            <h6 class="suggestion-title">${escapeHTML(item.title)}</h6>
                            <p class="suggestion-loc">${escapeHTML(item.location)}, ${escapeHTML(item.country)}</p>
                        </div>
                    </a>
                `;
            }).join("");
            suggestionsDropdown.innerHTML = htmlContent;
        }
        
        suggestionsDropdown.classList.remove("d-none");
    }

    // Function to fetch suggestions
    async function fetchSuggestions(query) {
        if (!query.trim()) {
            suggestionsDropdown.classList.add("d-none");
            suggestionsDropdown.innerHTML = "";
            suggestionsData = [];
            return;
        }

        try {
            const response = await fetch(`/listings/suggest?q=${encodeURIComponent(query)}`);
            if (!response.ok) throw new Error("Network response was not ok");
            const suggestions = await response.json();
            renderSuggestions(suggestions);
        } catch (error) {
            console.error("Error fetching search suggestions:", error);
        }
    }

    // Debounce wrapper
    function debounce(callback, delay) {
        return function (...args) {
            clearTimeout(debounceTimeout);
            debounceTimeout = setTimeout(() => {
                callback.apply(this, args);
            }, delay);
        };
    }

    const debouncedFetch = debounce((val) => fetchSuggestions(val), 250);

    // Input events
    searchInput.addEventListener("input", (e) => {
        const value = e.target.value;
        if (!value.trim()) {
            suggestionsDropdown.classList.add("d-none");
            suggestionsDropdown.innerHTML = "";
            suggestionsData = [];
            activeIndex = -1;
        } else {
            debouncedFetch(value);
        }
    });

    // Focus events
    searchInput.addEventListener("focus", () => {
        if (searchInput.value.trim() && suggestionsDropdown.children.length > 0) {
            suggestionsDropdown.classList.remove("d-none");
        }
    });

    // Keyboard navigation
    searchInput.addEventListener("keydown", (e) => {
        const items = suggestionsDropdown.querySelectorAll(".suggestion-item");
        if (suggestionsDropdown.classList.contains("d-none") || items.length === 0) {
            return;
        }

        if (e.key === "ArrowDown") {
            e.preventDefault();
            if (activeIndex < items.length - 1) {
                if (activeIndex >= 0) items[activeIndex].classList.remove("active");
                activeIndex++;
                items[activeIndex].classList.add("active");
                // Auto-fill input value (optional, but let's keep it highlighted and update text)
                searchInput.value = suggestionsData[activeIndex].title;
            }
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            if (activeIndex > 0) {
                items[activeIndex].classList.remove("active");
                activeIndex--;
                items[activeIndex].classList.add("active");
                searchInput.value = suggestionsData[activeIndex].title;
            } else if (activeIndex === 0) {
                items[activeIndex].classList.remove("active");
                activeIndex = -1;
                // restore typed value? Not tracked, but default behavior is fine
            }
        } else if (e.key === "Enter") {
            if (activeIndex >= 0 && activeIndex < items.length) {
                e.preventDefault();
                // Navigate directly to listing details
                window.location.href = items[activeIndex].getAttribute("href");
            }
        } else if (e.key === "Escape") {
            suggestionsDropdown.classList.add("d-none");
            searchInput.blur();
        }
    });

    // Close suggestions dropdown when clicking outside
    document.addEventListener("click", (e) => {
        if (!searchInput.contains(e.target) && !suggestionsDropdown.contains(e.target)) {
            suggestionsDropdown.classList.add("d-none");
        }
    });
});
