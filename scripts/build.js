import { cp, mkdir, rm } from 'node:fs/promises';
await rm('dist',{recursive:true,force:true}); await mkdir('dist/src',{recursive:true});
await Promise.all([cp('index.html','dist/index.html'),cp('src/styles.css','dist/src/styles.css'),cp('src/app.js','dist/src/app.js')]);
console.log('Built static application in dist/');
