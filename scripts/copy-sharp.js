const fs = require('fs');
const path = require('path');

// Copy sharp to standalone folder
const sourceDir = path.join(__dirname, '..', 'node_modules', 'sharp');
const targetDir = path.join(__dirname, '..', '.next', 'standalone', 'node_modules', 'sharp');

if (fs.existsSync(sourceDir) && fs.existsSync(path.join(__dirname, '..', '.next', 'standalone'))) {
  // Create target directory if it doesn't exist
  const targetParent = path.dirname(targetDir);
  if (!fs.existsSync(targetParent)) {
    fs.mkdirSync(targetParent, { recursive: true });
  }

  // Copy sharp directory
  function copyRecursiveSync(src, dest) {
    const exists = fs.existsSync(src);
    const stats = exists && fs.statSync(src);
    const isDirectory = exists && stats.isDirectory();
    
    if (isDirectory) {
      if (!fs.existsSync(dest)) {
        fs.mkdirSync(dest, { recursive: true });
      }
      fs.readdirSync(src).forEach(childItemName => {
        copyRecursiveSync(
          path.join(src, childItemName),
          path.join(dest, childItemName)
        );
      });
    } else {
      fs.copyFileSync(src, dest);
    }
  }

  try {
    copyRecursiveSync(sourceDir, targetDir);
    console.log('✅ Sharp copied to standalone folder');
  } catch (error) {
    console.error('❌ Error copying sharp:', error);
    process.exit(1);
  }
} else {
  console.log('⚠️  Sharp or standalone folder not found, skipping copy');
}
