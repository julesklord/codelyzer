import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import test from 'node:test';

const __dirname = dirname(fileURLToPath(import.meta.url));
const appSource = readFileSync(join(__dirname, '..', 'src', 'App.jsx'), 'utf8');
const packageJson = JSON.parse(readFileSync(join(__dirname, '..', 'package.json'), 'utf8'));

test('project contains 3d-force-graph dependency', () => {
  assert.ok(
    packageJson.dependencies['3d-force-graph'] || appSource.includes("import ForceGraph3D from '3d-force-graph'"),
    '3d-force-graph dependency or import is missing'
  );
});

test('src/App.jsx includes graph3d selector and container element', () => {
  assert.ok(appSource.includes("value:'graph3d'") || appSource.includes('value: "graph3d"'), '3D graph option is missing in vizType selector dropdown');
  assert.ok(appSource.includes("vizType==='graph3d'") || appSource.includes('vizType === "graph3d"'), 'vizType active class check is missing');
  assert.ok(appSource.includes('ref:graph3dRef') || appSource.includes('ref={graph3dRef}'), '3D graph container div with ref:graph3dRef is missing');
});

test('src/App.jsx React app defines graph3dRef and graph3dInstanceRef refs', () => {
  assert.ok(appSource.includes('var graph3dRef=useRef(null);') || appSource.includes('graph3dRef = useRef('), 'graph3dRef useRef initialization is missing');
  assert.ok(appSource.includes('var graph3dInstanceRef=useRef(null);') || appSource.includes('graph3dInstanceRef = useRef('), 'graph3dInstanceRef useRef initialization is missing');
});

test('src/App.jsx React app implements useEffect for 3D force graph rendering', () => {
  assert.ok(appSource.includes("graphConfig.vizType!=='graph3d'") || appSource.includes('graphConfig.vizType !== "graph3d"'), '3D Graph useEffect unmount check is missing');
  assert.ok(appSource.includes('graph3dInstanceRef.current.pauseAnimation()'), '3D Graph cleanup pauseAnimation is missing');
  assert.ok(appSource.includes('graph3dInstanceRef.current.graphData({nodes:[],links:[]})'), '3D Graph cleanup graphData is missing');
});
