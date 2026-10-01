import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join } from 'node:path';
const types={'.html':'text/html','.css':'text/css','.js':'text/javascript'};
createServer(async(req,res)=>{try{const path=req.url==='/'?'index.html':req.url.split('?')[0].replace(/^\//,'');const data=await readFile(join(process.cwd(),path));res.writeHead(200,{'Content-Type':types[extname(path)]||'application/octet-stream'});res.end(data)}catch{res.writeHead(404);res.end('Not found')}}).listen(4173,()=>console.log('FrameFlow: http://localhost:4173'));
