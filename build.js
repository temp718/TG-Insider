
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Log the current working directory
console.log('Current working directory:', process.cwd());

// Ensure the dist directory exists
const distPath = path.resolve(__dirname, 'dist');
if (!fs.existsSync(distPath)) {
  console.log(`Creating dist directory at: ${distPath}`);
  fs.mkdirSync(distPath, { recursive: true });
}

try {
  // Install dependencies with explicit error handling
  console.log('Installing dependencies...');
  execSync('npm install', { stdio: 'inherit' });
  console.log('Dependencies installed successfully!');

  // Build frontend with explicit error handling
  console.log('Building frontend...');
  execSync('npm run build', { stdio: 'inherit' });
  console.log('Frontend built successfully!');

  // Create a simple index.html if it doesn't exist (fallback)
  if (!fs.existsSync(path.resolve(__dirname, 'dist/index.html'))) {
    console.log('Creating fallback index.html...');
    const fallbackHtml = `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Telegram Insider</title>
        </head>
        <body>
          <div id="root">Loading...</div>
          <script src="/src/main.tsx" type="module"></script>
        </body>
      </html>
    `;
    fs.writeFileSync(path.resolve(__dirname, 'dist/index.html'), fallbackHtml);
    console.log('Fallback index.html created');
  }

  // Install server dependencies with explicit error handling
  console.log('Installing server dependencies...');
  execSync('cd server && npm install', { stdio: 'inherit' });
  console.log('Server dependencies installed successfully!');

  // Verify the build output
  if (fs.existsSync(path.resolve(__dirname, 'dist/index.html'))) {
    console.log('Build verification: dist/index.html exists');
    
    // List contents of dist directory for debugging
    const distContents = fs.readdirSync(path.resolve(__dirname, 'dist'));
    console.log('Contents of dist directory:', distContents);
    
    // Copy dist to server/public for easier serving
    const serverPublicPath = path.resolve(__dirname, 'server/public');
    if (!fs.existsSync(serverPublicPath)) {
      fs.mkdirSync(serverPublicPath, { recursive: true });
    }
    
    fs.cpSync(distPath, serverPublicPath, { recursive: true });
    console.log('Copied build files to server/public directory');
  } else {
    console.error('Build verification failed: dist/index.html does not exist');
    
    // Check if the directory exists but the file doesn't
    if (fs.existsSync(path.resolve(__dirname, 'dist'))) {
      console.log('dist directory exists, but index.html is missing');
      const distContents = fs.readdirSync(path.resolve(__dirname, 'dist'));
      console.log('Contents of dist directory:', distContents);
    }
    process.exit(1);
  }

  console.log('Build completed successfully!');
} catch (error) {
  console.error('Build process failed:', error);
  process.exit(1);
}
