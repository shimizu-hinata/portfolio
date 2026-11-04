/**
 * Contrast Ratio Calculator for Accessibility Verification
 * Calculates WCAG contrast ratios between colors
 */

// Color conversion utilities
function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

// Calculate relative luminance as per WCAG
function getLuminance(rgb) {
    if (!rgb) return 0; // Handle null/undefined
    const [r, g, b] = [rgb.r, rgb.g, rgb.b].map(x => {
        x = x / 255;
        return x <= 0.03928 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

// Calculate contrast ratio between two colors
function getContrastRatio(color1, color2) {
    const lum1 = getLuminance(hexToRgb(color1));
    const lum2 = getLuminance(hexToRgb(color2));
    const lighter = Math.max(lum1, lum2);
    const darker = Math.min(lum1, lum2);
    return ((lighter + 0.05) / (darker + 0.05)).toFixed(2);
}

// Test color combinations
const colorTests = [
    // Format: { name, foreground, background, minRequired }
    // minRequired: 4.5 for normal text, 3 for large text, 3 for UI components
    
    // PRIMARY TEXT ON BACKGROUNDS
    { name: "Main text on primary bg", fg: "#e8ecf1", bg: "#0f1419", minRequired: 4.5 },
    { name: "Main text on secondary bg", fg: "#e8ecf1", bg: "#1a2332", minRequired: 4.5 },
    { name: "Main text on surface", fg: "#e8ecf1", bg: "#1e2d3a", minRequired: 4.5 },
    
    // SECONDARY TEXT ON BACKGROUNDS
    { name: "Secondary text on primary bg", fg: "#b0b8c1", bg: "#0f1419", minRequired: 4.5 },
    { name: "Secondary text on secondary bg", fg: "#b0b8c1", bg: "#1a2332", minRequired: 4.5 },
    
    // MUTED TEXT
    { name: "Muted text on primary bg", fg: "#8a9299", bg: "#0f1419", minRequired: 4.5 },
    { name: "Muted text on secondary bg", fg: "#8a9299", bg: "#1a2332", minRequired: 4.5 },
    
    // ACCENT/LINKS
    { name: "Accent on primary bg", fg: "#4dd0e1", bg: "#0f1419", minRequired: 3 },
    { name: "Accent on secondary bg", fg: "#4dd0e1", bg: "#1a2332", minRequired: 3 },
    { name: "Accent on surface", fg: "#4dd0e1", bg: "#1e2d3a", minRequired: 3 },
    
    // BUTTONS
    { name: "Button (accent bg, dark text)", fg: "#0f1419", bg: "#4dd0e1", minRequired: 4.5 },
    
    // HEADINGS (Typically larger text, 3:1 minimum)
    { name: "Heading on primary bg", fg: "#e8ecf1", bg: "#0f1419", minRequired: 3 },
    
    // BORDERS/DIVIDERS (requires 3:1 minimum for visibility)
    // Note: RGBA colors are harder to test, skipping for now
    // { name: "Border (cyan with opacity) on primary", fg: "rgba(77, 208, 225, 0.3)", bg: "#0f1419", minRequired: 3 },
];

// Run tests
console.log("=== WCAG Contrast Ratio Verification ===\n");
console.log("Format: Name | Foreground | Background | Ratio | Required | Status\n");

let allPassed = true;
const results = [];

colorTests.forEach(test => {
    const ratio = getContrastRatio(test.fg, test.bg);
    const passed = ratio >= test.minRequired;
    const status = passed ? "✓ PASS" : "✗ FAIL";
    
    if (!passed) allPassed = false;
    
    const line = `${test.name.padEnd(35)} | ${test.fg.padEnd(20)} | ${test.bg.padEnd(20)} | ${ratio}:1 | ${test.minRequired}:1 required | ${status}`;
    console.log(line);
    
    results.push({
        name: test.name,
        foreground: test.fg,
        background: test.bg,
        ratio: parseFloat(ratio),
        required: test.minRequired,
        pass: passed
    });
});

console.log("\n=== Summary ===");
const passCount = results.filter(r => r.pass).length;
const totalCount = results.length;
console.log(`Passed: ${passCount}/${totalCount}`);
console.log(`All colors meet WCAG requirements: ${allPassed ? "✓ YES" : "✗ NO"}`);

if (!allPassed) {
    console.log("\n=== Failed Tests (need adjustment) ===");
    results.filter(r => !r.pass).forEach(r => {
        const gap = (r.required - r.ratio).toFixed(2);
        console.log(`- ${r.name}: ${r.ratio}:1 (needs +${gap}:1)`);
    });
}

// Export results as JSON for reporting
const report = {
    timestamp: new Date().toISOString(),
    total_tests: totalCount,
    passed: passCount,
    failed: totalCount - passCount,
    all_wcag_compliant: allPassed,
    results: results
};

console.log("\n=== JSON Report ===");
console.log(JSON.stringify(report, null, 2));
