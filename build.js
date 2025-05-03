
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
