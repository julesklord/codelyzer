import JSZip from 'jszip';
import {
  Parser,
  buildAnalysisData,
  getArchiveRootPrefix,
  normalizeExcludePath,
  shouldSkipArchivePath,
  shouldExcludeFile,
  compileExcludePatterns
} from './parser.js';

self.onmessage = async function(event) {
  var payload = event.data || {};
  var excludePatterns = payload.excludePatterns || [];
  
  // Compile patterns if they are strings/raw
  var compiledPatterns = excludePatterns;
  if (excludePatterns.length > 0 && typeof excludePatterns[0] === 'string') {
    compiledPatterns = compileExcludePatterns(excludePatterns);
  }

  try {
    var analyzed = [];
    var allFns = [];
    
    if (payload.zipFile) {
      // MODE 1: ZIP FILE ANALYSIS
      self.postMessage({ type: 'progress', message: 'Reading ZIP archive...' });
      var zip = await JSZip.loadAsync(payload.zipFile);
      var rawEntries = Object.keys(zip.files).sort().reduce(function(acc, name) {
        var entry = zip.files[name];
        if (entry && !entry.dir) {
          acc.push(entry);
        }
        return acc;
      }, []);
      
      var rootPrefix = getArchiveRootPrefix(rawEntries.map(function(entry) {
        return entry.name;
      }));
      var filesToProcess = [];
      var dirCache = new Map();
      
      rawEntries.forEach(function(entry) {
        var rawPath = normalizeExcludePath(entry.name);
        if (!rawPath || rawPath.endsWith('/')) return;
        var entryPath = rootPrefix && rawPath.indexOf(rootPrefix) === 0 ? rawPath.slice(rootPrefix.length) : rawPath;
        entryPath = normalizeExcludePath(entryPath);
        if (!entryPath || shouldSkipArchivePath(entryPath, compiledPatterns, dirCache)) return;
        var parts = entryPath.split('/').filter(Boolean);
        var name = parts[parts.length - 1] || '';
        if (!name || name === '.DS_Store' || shouldExcludeFile(entryPath, name, compiledPatterns)) return;
        var folder = parts.length > 1 ? parts.slice(0, -1).join('/') : 'root';
        filesToProcess.push({
          path: entryPath,
          name: name,
          folder: folder,
          size: entry._data && entry._data.uncompressedSize ? entry._data.uncompressedSize : 0,
          isCode: Parser.isCode(name),
          entry: entry
        });
      });
      
      var max = filesToProcess.length;
      for (var i = 0; i < max; i++) {
        var f = filesToProcess[i];
        if (i > 0 && i % 30 === 0) {
          self.postMessage({ type: 'progress', message: 'Analyzing ' + (i + 1) + '/' + max + ': ' + f.name });
        }
        
        var content = await f.entry.async('string');
        var layer = Parser.detectLayer(f.path);
        var isCodeFile = f.isCode !== false && Parser.isCode(f.name);
        
        if (isCodeFile) {
          var actualIsCode = !Parser.isScriptContainer(f.path) || Parser.hasEmbeddedCode(content, f.path);
          var fns = actualIsCode ? Parser.extract(content, f.path) : [];
          analyzed.push({
            path: f.path,
            name: f.name,
            folder: f.folder,
            content: content,
            functions: fns,
            lines: content.split('\n').length,
            layer: layer,
            churn: 0,
            isCode: actualIsCode
          });
          if (actualIsCode) {
            fns.forEach(function(fn) {
              allFns.push(Object.assign({}, fn, { folder: f.folder, layer: layer }));
            });
          }
        } else {
          analyzed.push({
            path: f.path,
            name: f.name,
            folder: f.folder,
            content: content || '',
            functions: [],
            lines: content ? content.split('\n').length : 0,
            layer: layer,
            churn: 0,
            isCode: false
          });
        }
      }
      
    } else if (payload.localFiles) {
      // MODE 2: LOCAL FILES/FOLDER ANALYSIS
      self.postMessage({ type: 'progress', message: 'Scanning local folder...' });
      var fileObjs = payload.localFiles;
      
      var rawPaths = fileObjs.map(function(f) {
        return f.path || f.name;
      });
      var rootPrefix = getArchiveRootPrefix(rawPaths);
      var filesToProcess = [];
      var dirCache = new Map();
      
      fileObjs.forEach(function(fileObj) {
        var rawPath = normalizeExcludePath(fileObj.path || fileObj.name);
        if (!rawPath || rawPath.endsWith('/')) return;
        var entryPath = rootPrefix && rawPath.indexOf(rootPrefix) === 0 ? rawPath.slice(rootPrefix.length) : rawPath;
        entryPath = normalizeExcludePath(entryPath);
        if (!entryPath || shouldSkipArchivePath(entryPath, compiledPatterns, dirCache)) return;
        var parts = entryPath.split('/').filter(Boolean);
        var name = parts[parts.length - 1] || '';
        if (!name || name === '.DS_Store' || shouldExcludeFile(entryPath, name, compiledPatterns)) return;
        var folder = parts.length > 1 ? parts.slice(0, -1).join('/') : 'root';
        filesToProcess.push({
          path: entryPath,
          name: name,
          folder: folder,
          size: fileObj.size || 0,
          isCode: Parser.isCode(name),
          file: fileObj.file
        });
      });
      
      var max = filesToProcess.length;
      for (var i = 0; i < max; i++) {
        var f = filesToProcess[i];
        if (i > 0 && i % 30 === 0) {
          self.postMessage({ type: 'progress', message: 'Analyzing ' + (i + 1) + '/' + max + ': ' + f.name });
        }
        
        var content = '';
        try {
          content = await f.file.text();
        } catch (readErr) {
          content = '';
        }
        
        var layer = Parser.detectLayer(f.path);
        var isCodeFile = f.isCode !== false && Parser.isCode(f.name);
        
        if (isCodeFile) {
          var actualIsCode = !Parser.isScriptContainer(f.path) || Parser.hasEmbeddedCode(content, f.path);
          var fns = actualIsCode ? Parser.extract(content, f.path) : [];
          analyzed.push({
            path: f.path,
            name: f.name,
            folder: f.folder,
            content: content,
            functions: fns,
            lines: content.split('\n').length,
            layer: layer,
            churn: 0,
            isCode: actualIsCode
          });
          if (actualIsCode) {
            fns.forEach(function(fn) {
              allFns.push(Object.assign({}, fn, { folder: f.folder, layer: layer }));
            });
          }
        } else {
          analyzed.push({
            path: f.path,
            name: f.name,
            folder: f.folder,
            content: content || '',
            functions: [],
            lines: content ? content.split('\n').length : 0,
            layer: layer,
            churn: 0,
            isCode: false
          });
        }
      }
      
    } else {
      // MODE 3: PRE-ANALYZED DATA (GITHUB / COMPATIBILITY MODE)
      analyzed = payload.analyzed || [];
      allFns = payload.allFns || [];
    }
    
    // Now run buildAnalysisData on the prepared analyzed/allFns arrays
    var data = await buildAnalysisData({
      analyzed: analyzed,
      allFns: allFns,
      excludePatterns: excludePatterns,
      progress: function(message) {
        self.postMessage({ type: 'progress', message: message });
      },
      yieldFn: function() {
        return Promise.resolve();
      }
    });
    
    self.postMessage({ type: 'done', data: data });
    
  } catch (error) {
    self.postMessage({ type: 'error', message: error && error.message ? error.message : String(error) });
  }
};
