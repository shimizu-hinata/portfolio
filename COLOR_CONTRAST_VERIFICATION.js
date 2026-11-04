const themes = {
    light: {
        background: '#f3f6f8',
        section: '#e7eef3',
        surface: '#ffffff',
        raised: '#f8fafc',
        hero: '#10232e',
        text: '#17212b',
        secondary: '#405262',
        muted: '#4d5e6d',
        inverse: '#f4f7fa',
        inverseSecondary: '#d0dbe3',
        accent: '#075e68',
        accentStrong: '#064b54',
        accentOnHero: '#70dce8',
        link: '#075e68',
        linkHover: '#064b54',
        button: '#075e68',
        buttonHover: '#064b54',
        buttonText: '#ffffff',
        buttonOnHero: '#70dce8',
        buttonTextOnHero: '#10232e',
        codeBackground: '#e8eef2',
        codeText: '#17212b',
        inputBackground: '#ffffff',
        inputText: '#17212b',
        border: '#6e8496',
        focus: '#0b7285',
        tagSurface: 'rgba(244, 247, 250, 0.1)'
    },
    dark: {
        background: '#101820',
        section: '#17232d',
        surface: '#202e39',
        raised: '#2a3a46',
        hero: '#101820',
        text: '#edf3f7',
        secondary: '#c1ccd5',
        muted: '#a9b6c1',
        inverse: '#f4f7fa',
        inverseSecondary: '#c7d2dc',
        accent: '#4dd0e1',
        accentStrong: '#62dcea',
        accentOnHero: '#68d8e6',
        link: '#55d6e6',
        linkHover: '#8be5ef',
        button: '#4dd0e1',
        buttonHover: '#62dcea',
        buttonText: '#0c171c',
        buttonOnHero: '#4dd0e1',
        buttonTextOnHero: '#0c171c',
        codeBackground: '#0b1218',
        codeText: '#d7e6ee',
        inputBackground: '#192630',
        inputText: '#edf3f7',
        border: '#7b8fa0',
        focus: '#62dcea',
        tagSurface: 'rgba(244, 247, 250, 0.1)'
    }
};

function parseColor(value) {
    const hex = /^#([\da-f]{3}|[\da-f]{6})$/i.exec(value);
    if (hex) {
        const digits = hex[1].length === 3
            ? hex[1].split('').map(char => char + char).join('')
            : hex[1];
        return [
            parseInt(digits.slice(0, 2), 16),
            parseInt(digits.slice(2, 4), 16),
            parseInt(digits.slice(4, 6), 16),
            1
        ];
    }

    const rgba = /^rgba?\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)(?:\s*,\s*([\d.]+))?\s*\)$/i.exec(value);
    if (!rgba) throw new Error(`Unsupported color value: ${value}`);
    return [+rgba[1], +rgba[2], +rgba[3], rgba[4] === undefined ? 1 : +rgba[4]];
}

function composite(foreground, background) {
    return foreground.slice(0, 3).map((channel, index) =>
        channel * foreground[3] + background[index] * (1 - foreground[3])
    );
}

function luminance(color) {
    const channels = color.slice(0, 3).map(channel => {
        const normalized = channel / 255;
        return normalized <= 0.04045
            ? normalized / 12.92
            : ((normalized + 0.055) / 1.055) ** 2.4;
    });
    return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2];
}

function contrast(foreground, background) {
    const fg = parseColor(foreground);
    const bg = parseColor(background);
    const effectiveBackground = bg[3] < 1
        ? composite(bg, [255, 255, 255])
        : bg;
    const effectiveForeground = fg[3] < 1
        ? composite(fg, effectiveBackground)
        : fg;
    const light = Math.max(luminance(effectiveForeground), luminance(effectiveBackground));
    const dark = Math.min(luminance(effectiveForeground), luminance(effectiveBackground));
    return (light + 0.05) / (dark + 0.05);
}

const checks = [
    ['Primary text on page background', 'text', 'background', 4.5],
    ['Primary text on section background', 'text', 'section', 4.5],
    ['Primary text on card surface', 'text', 'surface', 4.5],
    ['Primary text on raised surface', 'text', 'raised', 4.5],
    ['Secondary text on page background', 'secondary', 'background', 4.5],
    ['Muted text on card surface', 'muted', 'surface', 4.5],
    ['Inverse text on dark hero', 'inverse', 'hero', 4.5],
    ['Inverse supporting text on dark hero', 'inverseSecondary', 'hero', 4.5],
    ['Link on page background', 'link', 'background', 4.5],
    ['Link on card surface', 'link', 'surface', 4.5],
    ['Hovered link on page background', 'linkHover', 'background', 4.5],
    ['Button text on button background', 'buttonText', 'button', 4.5],
    ['Button text on hover background', 'buttonText', 'buttonHover', 4.5],
    ['Button text on dark hero action', 'buttonTextOnHero', 'buttonOnHero', 4.5],
    ['Tag accent on translucent dark-hero surface', 'accentOnHero', 'tagSurface', 4.5],
    ['Code text on code background', 'codeText', 'codeBackground', 4.5],
    ['Input text on input background', 'inputText', 'inputBackground', 4.5],
    ['Focus indicator on page background', 'focus', 'background', 3],
    ['Component border against page background', 'border', 'background', 3],
    ['Component border against card surface', 'border', 'surface', 3],
    ['Component border against raised surface', 'border', 'raised', 3]
];

const results = [];
for (const [themeName, palette] of Object.entries(themes)) {
    for (const [name, foreground, background, minimum] of checks) {
        const backgroundColor = background === 'tagSurface'
            ? `rgb(${composite(parseColor(palette.tagSurface), parseColor(palette.hero)).map(Math.round).join(', ')})`
            : palette[background];
        const ratio = contrast(palette[foreground], backgroundColor);
        results.push({
            theme: themeName,
            name,
            foreground: palette[foreground],
            background: backgroundColor,
            ratio: Number(ratio.toFixed(2)),
            minimum,
            passed: ratio >= minimum
        });
    }
}

const failures = results.filter(result => !result.passed);
results.forEach(result => {
    console.log(`${result.passed ? 'PASS' : 'FAIL'} ${result.theme}: ${result.name} ${result.ratio}:1 (minimum ${result.minimum}:1)`);
});
console.log(`\n${results.length - failures.length}/${results.length} palette checks passed.`);
if (failures.length) process.exitCode = 1;
