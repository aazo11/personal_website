const fs = require('fs');
const path = require('path');

const blogDir = path.join(__dirname, '..', 'blog');
const publicBlogDir = path.join(__dirname, '..', 'public', 'blog');

// Create public/blog directory if it doesn't exist
if (!fs.existsSync(publicBlogDir)) {
  fs.mkdirSync(publicBlogDir, { recursive: true });
}

// Function to copy images recursively
function copyBlogImages(dir, relativePath = '') {
  const items = fs.readdirSync(dir, { withFileTypes: true });
  
  items.forEach(item => {
    if (item.isDirectory()) {
      const newRelativePath = path.join(relativePath, item.name);
      const targetDir = path.join(publicBlogDir, newRelativePath);
      
      // Create target directory if it doesn't exist
      if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true });
      }
      
      // Recursively copy from subdirectory
      copyBlogImages(path.join(dir, item.name), newRelativePath);
    } else if (item.isFile() && /\.(jpg|jpeg|png|gif|webp|avif|svg)$/i.test(item.name)) {
      // Copy image files
      const sourcePath = path.join(dir, item.name);
      const targetPath = path.join(publicBlogDir, relativePath, item.name);
      fs.copyFileSync(sourcePath, targetPath);
      console.log(`Copied: ${relativePath}/${item.name}`);
    }
  });
}

console.log('Copying blog images to public folder...');
copyBlogImages(blogDir);
console.log('Done!');