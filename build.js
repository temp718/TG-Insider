
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Ensure the dist directory exists
if (!fs.existsSync(path.resolve(__dirname, 'dist'))) {
  fs.mkdirSync(path.resolve(__dirname, 'dist'), { recursive: true });
}

console.log('Installing frontend dependencies...');
execSync('npm install', { stdio: 'inherit' });

console.log('Installing required dependencies for build...');
execSync('npm install @vitejs/plugin-react --save-dev', { stdio: 'inherit' });

console.log('Building frontend...');
try {
  execSync('npm run build', { stdio: 'inherit' });
  console.log('Frontend built successfully!');
} catch (error) {
  console.error('Failed to build frontend:', error);
  process.exit(1);
}

console.log('Installing server dependencies...');
execSync('cd server && npm install', { stdio: 'inherit' });

console.log('Build completed successfully!');

// Verify the build output
if (fs.existsSync(path.resolve(__dirname, 'dist/index.html'))) {
  console.log('Build verification: dist/index.html exists');
} else {
  console.error('Build verification failed: dist/index.html does not exist');
  process.exit(1);
}
