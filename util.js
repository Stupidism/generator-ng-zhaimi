'use strict';
var path = require('path');
var fs = require('fs');
var lodash = require('lodash');

module.exports = {
  rewrite: rewrite,
  rewriteFile: rewriteFile,
  appName: appName,
  copyTemplates: copyTemplates,
  relativeUrl: relativeUrl
};

function rewriteFile (args) {
  args.path = args.path || process.cwd();
  var fullPath = path.join(args.path, args.file);

  args.haystack = fs.readFileSync(fullPath, 'utf8');
  var body = rewrite(args);

  fs.writeFileSync(fullPath, body);
}

function escapeRegExp (str) {
  return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
}

function rewrite (args) {
  // check if splicable is already in the body text
  var re = new RegExp(args.splicable.map(function (line) {
    return '\s*' + escapeRegExp(line);
  }).join('\n'));

  if (re.test(args.haystack)) {
    return args.haystack;
  }

  var lines = args.haystack.split('\n');

  var startBuildLineIndex = -1;
  var endBuildLineIndex = lines.length;
  var toInjectLines = [];
  var toInjectLineIndex = -1;

  lines.forEach(function (line, i) {
    // firstly get the startBuildLineIndex
    if (line.indexOf(args.startbuild) !== -1) {
      startBuildLineIndex = i;
      toInjectLines = addSpacesForLines(args.splicable, line);

      toInjectLines = toInjectLines.sort(function(a, b) {
          return a > b;
        });

      if (toInjectLines.length) {
        toInjectLineIndex = 0;
      }
      return;
    }
    // block lines before startBuildLine or after endBuildLine
    // give up if no lines to inject
    if (startBuildLineIndex === -1 || i > endBuildLineIndex ||
     toInjectLineIndex >= toInjectLines.length) {
      return;
    }

    // try inject when still have lines to inject
    if (toInjectLineIndex >= 0) {
      // if last line => must inject, endBuildLineIndex = curLineIndex + 1
      // else if bigger => inject later, return
      // else if equal => skip duplicated line with index increased
      if (line.indexOf(args.endbuild) !== -1) {
        endBuildLineIndex = i + 1;
      } else if (toInjectLines[toInjectLineIndex] > line) {
        return;
      } else if (toInjectLines[toInjectLineIndex] === line) {
        console.log('duplicated line: ' + line);
        toInjectLineIndex++;
        return;
      }
      lines.splice(i, 0, toInjectLines[toInjectLineIndex]);
      toInjectLineIndex++;
    }
  });

  function addSpacesForLines(lines, templateLine) {
    var spaceStr = '';
    while (templateLine.charAt(spaceStr.length) === ' ') {
      spaceStr += ' ';
    }
    return lines.map(function (line) {
      return spaceStr + line;
    });
  }

  return lines.join('\n');
}

function appName (self) {
  var counter = 0, suffix = self.options['app-suffix'];
  // Have to check this because of generator bug #386
  process.argv.forEach(function(val) {
    if (val.indexOf('--app-suffix') > -1) {
      counter++;
    }
  });
  if (counter === 0 || (typeof suffix === 'boolean' && suffix)) {
    suffix = 'App';
  }
  return suffix ? self.lodash.classify(suffix) : '';
}

function createFileName (template, fileName) {
  // Find matches for parans
  var filterMatches = template.match(/\(([^)]+)\)/g);
  var filter = '';
  if(filterMatches) {
    filter = filterMatches[0].replace('(', '').replace(')', '');
    template = template.replace(filterMatches[0], '');
  }

  return { name: template.replace('name', fileName), filter: filter };
}

function templateIsUsable (processedName, self) {
  var filters = self.config.get('filters') || [];
  var include = true;

  if(processedName.filter && filters.indexOf(processedName.filter) === -1) {
    include = false;
  }

  var index = processedName.name.lastIndexOf('.');
  var ext = processedName.name.slice(index + 1);
  var extensions = self.config.get('extensions') || [];
  if(extensions.indexOf(ext) >= 0 && include) {
    return true;
  }
  return false;
}

function copyTemplates (self, type, templateDir, configName) {
  templateDir = templateDir || path.join(self.sourceRoot(), type);
  configName = configName || type + 'Templates';

  if(self.config.get(configName)) {
    templateDir = path.join(process.cwd(), self.config.get(configName));
  }
  fs.readdirSync(templateDir)
    .forEach(function(template) {
      var processedName = createFileName(template, self.fileName);

      var fileName = processedName.name;
      var templateFile = path.join(templateDir, template);

      if(templateIsUsable(processedName, self)) {
        self.fs.copyTpl(templateFile, path.join(self.dir, fileName), self);
      }
    });
};

function relativeUrl(basePath, targetPath) {
  var relativePath = path.relative(basePath, targetPath);
  return relativePath.split(path.sep).join('/');
}
