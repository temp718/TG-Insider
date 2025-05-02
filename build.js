
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Ensure the dist directory exists
if (!fs.existsSync(path.resolve(__dirname, 'dist'))) {
  fs.mkdirSync(path.resolve(__dirname, 'dist'), { recursive: true });
}

// Install dependencies with explicit error handling
try {
  console.log('Installing dependencies...');
  execSync('npm install', { stdio: 'inherit' });
  console.log('Dependencies installed successfully!');
} catch (error) {
  console.error('Failed to install dependencies:', error);
  process.exit(1);
}

// Build frontend with explicit error handling
try {
  console.log('Building frontend...');
  execSync('npm run build', { stdio: 'inherit' });
  console.log('Frontend built successfully!');
} catch (error) {
  console.error('Failed to build frontend:', error);
  process.exit(1);
}

// Install server dependencies with explicit error handling
try {
  console.log('Installing server dependencies...');
  execSync('cd server && npm install', { stdio: 'inherit' });
  console.log('Server dependencies installed successfully!');
} catch (error) {
  console.error('Failed to install server dependencies:', error);
  process.exit(1);
}

// Verify the build output
if (fs.existsSync(path.resolve(__dirname, 'dist/index.html'))) {
  console.log('Build verification: dist/index.html exists');
} else {
  console.error('Build verification failed: dist/index.html does not exist');
  process.exit(1);
}

console.log('Build completed successfully!');
