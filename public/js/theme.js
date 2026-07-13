document.addEventListener("DOMContentLoaded", () => {
    const themeToggleBtn = document.getElementById("theme-toggle");
    const themeIcon = document.getElementById("theme-icon");
    
    if (!themeToggleBtn || !themeIcon) return;

    // Synchronize icon state on load
    const currentTheme = document.documentElement.getAttribute("data-theme") || "dark";
    updateThemeIcon(currentTheme);

    // Click handler to toggle theme
    themeToggleBtn.addEventListener("click", () => {
        const currentTheme = document.documentElement.getAttribute("data-theme") || "dark";
        const newTheme = currentTheme === "dark" ? "light" : "dark";
        
        // Apply theme to document
        document.documentElement.setAttribute("data-theme", newTheme);
        // Persist theme selection
        localStorage.setItem("theme", newTheme);
        
        // Update the button icon
        updateThemeIcon(newTheme);
    });

    // Helper to switch icon classes with micro-transition
    function updateThemeIcon(theme) {
        if (theme === "light") {
            themeIcon.className = "fa-solid fa-sun text-warning"; // bright yellow sun icon
        } else {
            themeIcon.className = "fa-solid fa-moon"; // standard light/white moon icon
        }
        
        // Add a micro-animation click effect
        themeIcon.style.transform = "scale(0.8) rotate(-45deg)";
        setTimeout(() => {
            themeIcon.style.transform = "scale(1) rotate(0deg)";
        }, 150);
    }
});
