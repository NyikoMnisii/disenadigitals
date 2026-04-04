const fetch = require('node-fetch');
const { parse } = require('node-html-parser');

async function decodeSecretMessage(url) {
  const response = await fetch(url);
  const html = await response.text();

  const doc = parse(html);

  const table = doc.querySelector('table');
  const rows = table.querySelectorAll('tr');

  const grid = {};

  for (let i = 1; i < rows.length; i++) {
    const cols = rows[i].querySelectorAll('td');
    if (cols.length === 3) {
      const x = parseInt(cols[0].textContent.trim());
      const char = cols[1].textContent.trim();
      const y = parseInt(cols[2].textContent.trim());
      grid[`${x},${y}`] = char;
    }
  }

  const positions = Object.keys(grid).map(k => k.split(',').map(Number));
  const maxX = Math.max(...positions.map(p => p[0]));
  const maxY = Math.max(...positions.map(p => p[1]));

  for (let row = 0; row <= maxY; row++) {
    let line = '';
    for (let col = 0; col <= maxX; col++) {
      line += grid[`${col},${row}`] || ' ';
    }
    console.log(line);
  }
}

// Call the function with the Google Doc URL
decodeSecretMessage("https://docs.google.com/document/d/e/2PACX-1vTMOmshQe8YvaRXi6gEPKKlsC6UpFJSMAk4mQjLm_u1gmHdVVTaeh7nBNFBRlui0sTZ-snGwZM4DBCT/pub");