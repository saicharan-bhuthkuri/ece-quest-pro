const fs = require('fs');

const b64 = 'data:image/png;base64,' + fs.readFileSync('images.png').toString('base64');

// Update app.html
let appHtml = fs.readFileSync('app.html', 'utf8');
appHtml = appHtml.replace(/<img src="[^"]*" alt="ECE" class="brand-logo-img">/g, `<img src="${b64}" alt="ECE" class="brand-logo-img">`);
appHtml = appHtml.replace(/<link rel="icon" href="[^"]*">/g, `<link rel="icon" href="${b64}">`);
fs.writeFileSync('app.html', appHtml);

// Update index.html
let idxHtml = fs.readFileSync('index.html', 'utf8');
idxHtml = idxHtml.replace(/<img src="[^"]*" alt="ECE" class="brand-logo-img">/g, `<img src="${b64}" alt="ECE" class="brand-logo-img">`);
fs.writeFileSync('index.html', idxHtml);

// Update dashboard.html
let dashHtml = fs.readFileSync('dashboard.html', 'utf8');
dashHtml = dashHtml.replace(/<img src="[^"]*" alt="ECE" class="brand-logo-img">/g, `<img src="${b64}" alt="ECE" class="brand-logo-img">`);
fs.writeFileSync('dashboard.html', dashHtml);

// Update app.js
let appJs = fs.readFileSync('app.js', 'utf8');
appJs = appJs.replace(/<img src="app-logo\.png"/g, `<img src="${b64}"`);
fs.writeFileSync('app.js', appJs);

console.log('Successfully embedded inline base64 logo in app.html, index.html, dashboard.html, and app.js');
