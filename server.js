const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const server = http.createServer((req, res) => {
    // Parse URL and decode it to handle spaces
    const parsedUrl = url.parse(req.url, true);
    let pathname = decodeURIComponent(parsedUrl.pathname);
    
    // Default to index.html
    if (pathname === '/') {
        pathname = 'index.html';
    }

    // Sanitize and normalize the path, remove any leading slashes so Windows path.join doesn't escape the dir
    const normalizedPath = path
        .normalize(pathname)
        .replace(/^([/\\])+/, '')       // remove any leading / or \
        .replace(/\.\.[/\\]/g, '');   // prevent directory traversal

    // Build file path safely within current directory
    let filePath = path.join(__dirname, normalizedPath);
    
    // Get file extension
    const extname = String(path.extname(filePath)).toLowerCase();
    
    // Define MIME types
    const mimeTypes = {
        '.html': 'text/html',
        '.js': 'text/javascript',
        '.css': 'text/css',
        '.json': 'application/json',
        '.png': 'image/png',
        '.jpg': 'image/jpg',
        '.jpeg': 'image/jpeg',
        '.gif': 'image/gif',
        '.svg': 'image/svg+xml',
        '.wav': 'audio/wav',
        '.mp4': 'video/mp4',
        '.woff': 'application/font-woff',
        '.ttf': 'application/font-ttf',
        '.eot': 'application/vnd.ms-fontobject',
        '.otf': 'application/font-otf',
        '.wasm': 'application/wasm'
    };
    
    const contentType = mimeTypes[extname] || 'application/octet-stream';
    
    // Check if file exists
    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            console.log(`File not found: ${filePath}`);
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('404 - File Not Found');
            return;
        }
        
        // Read and serve file
        fs.readFile(filePath, (error, content) => {
            if (error) {
                console.log(`Error reading file: ${error}`);
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('500 - Internal Server Error');
            } else {
                console.log(`Serving: ${filePath}`);
                res.writeHead(200, { 'Content-Type': contentType });
                res.end(content);
            }
        });
    });
});

const PORT = process.env.PORT || 8001;
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
    console.log(`Current directory: ${__dirname}`);
});
