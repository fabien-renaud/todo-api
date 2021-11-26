const {build} = require('esbuild');

// Build sources
build({
    entryPoints: [`src/index.ts`],
    platform: 'node',
    minify: true,
    bundle: true,
    target: 'es2019',
    outfile: `build/index.js`
}).catch((err) => {
    process.stderr.write(err.stderr);
    process.exit(1);
});
