export const DARK_COLORS=['#00f0ff','#cc66ff','#ffe600','#00ff66','#ff9000','#ff007f','#ff3b30','#84cc16'];
export const LIGHT_COLORS=['#0066cc','#800080','#d97706','#009933','#c2410c','#cc0066','#cc0000','#4f7c0f'];

export const DARK_LAYER_COLORS={ui:'#00f0ff',components:'#cc66ff',services:'#ffb300',utils:'#00ff66',data:'#ff007f',config:'#e2e8f0',test:'#ff3b30',modules:'#3b82f6',forms:'#cc66ff',classes:'#ffb300',note:'#a78bfa'};
export const LIGHT_LAYER_COLORS={ui:'#0066cc',components:'#800080',services:'#d97706',utils:'#009933',data:'#cc0066',config:'#4a5568',test:'#cc0000',modules:'#1d4ed8',forms:'#800080',classes:'#d97706',note:'#5c1380'};

export let COLORS = DARK_COLORS;
export let LAYER_COLORS = DARK_LAYER_COLORS;

// Glassmorphism Palettes
export const GLASS_DARK_COLORS = ['#38bdf8', '#c084fc', '#f472b6', '#34d399', '#fbbf24', '#f87171', '#60a5fa', '#818cf8'];
export const GLASS_LIGHT_COLORS = ['#0284c7', '#7c3aed', '#db2777', '#059669', '#d97706', '#dc2626', '#2563eb', '#4f46e5'];

export const GLASS_DARK_LAYER_COLORS = {ui:'#38bdf8',components:'#c084fc',services:'#fbbf24',utils:'#34d399',data:'#f472b6',config:'#94a3b8',test:'#f87171',modules:'#60a5fa',forms:'#c084fc',classes:'#fbbf24',note:'#818cf8'};
export const GLASS_LIGHT_LAYER_COLORS = {ui:'#0284c7',components:'#7c3aed',services:'#d97706',utils:'#059669',data:'#db2777',config:'#64748b',test:'#dc2626',modules:'#2563eb',forms:'#7c3aed',classes:'#d97706',note:'#4f46e5'};

// Cyberpunk Palettes
export const CYBER_DARK_COLORS = ['#ff007f', '#00ffff', '#ffe600', '#00ff66', '#d300ff', '#ff5e00', '#ff003c', '#00ffcc'];
export const CYBER_LIGHT_COLORS = ['#7f00ff', '#0066cc', '#d97706', '#00b853', '#ea580c', '#db2777', '#dc2626', '#4f7c0f'];

export const CYBER_DARK_LAYER_COLORS = {ui:'#00ffff',components:'#ff007f',services:'#ffe600',utils:'#00ff66',data:'#d300ff',config:'#ffffff',test:'#ff003c',modules:'#ff5e00',forms:'#ff007f',classes:'#ffe600',note:'#00ffcc'};
export const CYBER_LIGHT_LAYER_COLORS = {ui:'#7f00ff',components:'#0066cc',services:'#d97706',utils:'#00b853',data:'#db2777',config:'#24004d',test:'#dc2626',modules:'#ea580c',forms:'#7f00ff',classes:'#d97706',note:'#4f7c0f'};

export function getColors() { return COLORS; }
export function getLayerColors() { return LAYER_COLORS; }
export function setColors(newColors) { COLORS = newColors; }
export function setLayerColors(newLayerColors) { LAYER_COLORS = newLayerColors; }
