const http = require('http');
const fs = require('fs');
const path = require('path');

const MIME = {'.html':'text/html','.css':'text/css','.js':'application/javascript','.svg':'image/svg+xml','.jpg':'image/jpeg','.png':'image/png','.json':'application/json'};
const PORT = 8080;
const ROOT = path.join(__dirname, '..');

http.createServer((req, res) => {
  let filePath = path.join(ROOT, decodeURIComponent(req.url.split('?')[0]));
  if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) filePath = path.join(filePath, 'index.html');
  if (!fs.existsSync(filePath)) { res.writeHead(404); res.end('No encontrado'); return; }
  const ext = path.extname(filePath);
  res.writeHead(200, {'Content-Type': MIME[ext]||'application/octet-stream','Cache-Control':'no-cache'});
  fs.createReadStream(filePath).pipe(res);
}).listen(PORT, () => console.log('Servidor en http://localhost:' + PORT));
