const fs = require('fs');
const path = require('path');

function processDir(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      processDir(fullPath);
    } else if (/\.(html|js|css|json)$/i.test(entry.name)) {
      try {
          let content = fs.readFileSync(fullPath, 'utf8');
          // Replace all variations of the absolute URL with the local relative path
          let newContent = content.replace(/https:\/\/international\.iitd\.ac\.in/gi, '/360%20degree/international.iitd.ac.in');
          newContent = newContent.replace(/http:\/\/international\.iitd\.ac\.in/gi, '/360%20degree/international.iitd.ac.in');
          
          if (content !== newContent) {
             fs.writeFileSync(fullPath, newContent, 'utf8');
             console.log("Rewrote:", fullPath);
          }
      } catch (e) {
          console.error("Failed on:", fullPath);
      }
    }
  }
}

console.log("Starting rewrite of local 360 degree folder...");
processDir(path.resolve('./public/360 degree'));
console.log("Rewrite complete!");
