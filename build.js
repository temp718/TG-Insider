
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Ensure the dist directory exists
if (!fs.existsSync(path.resolve(__dirname, 'dist'))) {
  fs.mkdirSync(path.resolve(__dirname, 'dist'), { recursive: true });
}

console.log('Installing frontend dependencies...');
execSync('npm install', { stdio: 'inherit' });

console.log('Building frontend...');
execSync('npm run build', { stdio: 'inherit' });

console.log('Installing server dependencies...');
execSync('cd server && npm install', { stdio: 'inherit' });

console.log('Build completed successfully!');
