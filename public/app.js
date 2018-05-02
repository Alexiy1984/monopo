(function() {
  'use strict';

  var globals = typeof global === 'undefined' ? self : global;
  if (typeof globals.require === 'function') return;

  var modules = {};
  var cache = {};
  var aliases = {};
  var has = {}.hasOwnProperty;

  var expRe = /^\.\.?(\/|$)/;
  var expand = function(root, name) {
    var results = [], part;
    var parts = (expRe.test(name) ? root + '/' + name : name).split('/');
    for (var i = 0, length = parts.length; i < length; i++) {
      part = parts[i];
      if (part === '..') {
        results.pop();
      } else if (part !== '.' && part !== '') {
        results.push(part);
      }
    }
    return results.join('/');
  };

  var dirname = function(path) {
    return path.split('/').slice(0, -1).join('/');
  };

  var localRequire = function(path) {
    return function expanded(name) {
      var absolute = expand(dirname(path), name);
      return globals.require(absolute, path);
    };
  };

  var initModule = function(name, definition) {
    var hot = hmr && hmr.createHot(name);
    var module = {id: name, exports: {}, hot: hot};
    cache[name] = module;
    definition(module.exports, localRequire(name), module);
    return module.exports;
  };

  var expandAlias = function(name) {
    return aliases[name] ? expandAlias(aliases[name]) : name;
  };

  var _resolve = function(name, dep) {
    return expandAlias(expand(dirname(name), dep));
  };

  var require = function(name, loaderPath) {
    if (loaderPath == null) loaderPath = '/';
    var path = expandAlias(name);

    if (has.call(cache, path)) return cache[path].exports;
    if (has.call(modules, path)) return initModule(path, modules[path]);

    throw new Error("Cannot find module '" + name + "' from '" + loaderPath + "'");
  };

  require.alias = function(from, to) {
    aliases[to] = from;
  };

  var extRe = /\.[^.\/]+$/;
  var indexRe = /\/index(\.[^\/]+)?$/;
  var addExtensions = function(bundle) {
    if (extRe.test(bundle)) {
      var alias = bundle.replace(extRe, '');
      if (!has.call(aliases, alias) || aliases[alias].replace(extRe, '') === alias + '/index') {
        aliases[alias] = bundle;
      }
    }

    if (indexRe.test(bundle)) {
      var iAlias = bundle.replace(indexRe, '');
      if (!has.call(aliases, iAlias)) {
        aliases[iAlias] = bundle;
      }
    }
  };

  require.register = require.define = function(bundle, fn) {
    if (bundle && typeof bundle === 'object') {
      for (var key in bundle) {
        if (has.call(bundle, key)) {
          require.register(key, bundle[key]);
        }
      }
    } else {
      modules[bundle] = fn;
      delete cache[bundle];
      addExtensions(bundle);
    }
  };

  require.list = function() {
    var list = [];
    for (var item in modules) {
      if (has.call(modules, item)) {
        list.push(item);
      }
    }
    return list;
  };

  var hmr = globals._hmr && new globals._hmr(_resolve, require, modules, cache);
  require._cache = cache;
  require.hmr = hmr && hmr.wrap;
  require.brunch = true;
  globals.require = require;
})();

(function() {
var global = typeof window === 'undefined' ? this : window;
var __makeRelativeRequire = function(require, mappings, pref) {
  var none = {};
  var tryReq = function(name, pref) {
    var val;
    try {
      val = require(pref + '/node_modules/' + name);
      return val;
    } catch (e) {
      if (e.toString().indexOf('Cannot find module') === -1) {
        throw e;
      }

      if (pref.indexOf('node_modules') !== -1) {
        var s = pref.split('/');
        var i = s.lastIndexOf('node_modules');
        var newPref = s.slice(0, i).join('/');
        return tryReq(name, newPref);
      }
    }
    return none;
  };
  return function(name) {
    if (name in mappings) name = mappings[name];
    if (!name) return;
    if (name[0] !== '.' && pref) {
      var val = tryReq(name, pref);
      if (val !== none) return val;
    }
    return require(name);
  }
};
require.register("initialize.js", function(exports, require, module) {
document.addEventListener('DOMContentLoaded', function() {
  // do your setup here
  console.log('Initialized app');
});

});

require.register("main.js", function(exports, require, module) {
document.addEventListener('DOMContentLoaded', function() {

  console.log('main java-script  file initialized');

  function IdGet(idname) {return typeof i == 'object' ? i : document.getElementById(idname);}

  function ClassGet(classname) {return document.getElementsByClassName(classname);}


  function RemoveClass(element, classname) {
    var reg = new RegExp("\\b"+ classname+"\\b","g");
    element.className = element.className.replace(reg," ");
  }

  function AddClass(element, classname) {
    var arr;
    arr = element.className.split(" ");
    if (arr.indexOf(classname) == -1) {
      element.className += " " + classname;
    }
    element.className = element.className.replace(/\s+/g," ");
  }

  window.onload = function () {

    let logosvg = IdGet('JS-logo-svg');
    logosvg.setAttribute("style","fill: #fff");

    let menubutton = IdGet('JS-menu-button');
    let menubuttonclicked = false;
    
    function GetNumeredIds(idPrefix, num) {
      let numeredIds = [];
      for (let index = 1; index <= num; index++) {
        numeredIds[index] = IdGet( idPrefix + index);
      }
      return numeredIds
    }
    
    menubutton.onclick = function() {

      let rowsarray = GetNumeredIds('JS-row-',3);
      let minsizemenu = IdGet('JS-min-size-menu');
      let menuLines = GetNumeredIds('line-',3);
      let navmenuitems = GetNumeredIds('JS-nav-menu__item-',5);
      // let logosvg = IdGet('JS-logo-svg');
      let rotatedtext = IdGet('JS-rotated-text');
      let bottomarrow = IdGet('JS-bottom-arrow');
      let hiddenanimgroup = IdGet('JS-hidden-anim-group');

      if (!menubuttonclicked) {
        AddClass(menubutton,'nav-menu__menu-button_nohide');
        rowsarray.forEach(element => {AddClass(element,'block-hide')});
        RemoveClass(minsizemenu,'block-hide');
        AddClass(minsizemenu,'appeared');
        menuLines.forEach(element => {AddClass(element,'nav-menu__menu-button__line_dark')});
        AddClass(rotatedtext,'block-hide');
        AddClass(bottomarrow,'block-hide');
        AddClass(hiddenanimgroup,'block-hide');
        navmenuitems.forEach(element => {AddClass(element,'block-hide')});
        logosvg.setAttribute("style","fill: #000");
        menubuttonclicked = true;
      } 
      else {
        RemoveClass(menubutton,'nav-menu__menu-button_nohide');
        rowsarray.forEach(element => {RemoveClass(element,'block-hide')});
        AddClass(minsizemenu,'block-hide');
        RemoveClass(minsizemenu,'appeared');
        menuLines.forEach(element => {RemoveClass(element,'nav-menu__menu-button__line_dark')});
        RemoveClass(rotatedtext,'block-hide');
        RemoveClass(bottomarrow,'block-hide');
        RemoveClass(hiddenanimgroup,'block-hide');
        navmenuitems.forEach(element => {RemoveClass(element,'block-hide')});
        logosvg.setAttribute("style","fill: #fff");
        menubuttonclicked = false;
      }  
    };

    // вычисление высоты окна с учетом особенностей браузеров НАЧАЛО
    // var scrollHeight = Math.max(
    //   document.body.scrollHeight, document.documentElement.scrollHeight,
    //   document.body.offsetHeight, document.documentElement.offsetHeight,
    //   document.body.clientHeight, document.documentElement.clientHeight
    // );
    // console.log( 'Высота с учетом прокрутки: ' + scrollHeight );
    // вычисление высоты окна с учетом особенностей браузеров КОНЕЦ

    /*let svg =(IdGet('svg-1'));


    svg.addEventListener("mouseover", Overanim(svg));
    svg.addEventListener("mouseout",  Outanim(svg));


    function  Overanim (elem) {
      elem.setAttribute("class","svg-circle svg-circle-hovered");
      console.log(svg);
    }

    function  Outanim (elem) {
      elem.setAttribute("class","svg-circle");
    } ЧАСТЬ НЕРАБОЧЕГО КОДА ДЛЯ SVG*/

  }

  window.onresize = function() {
    //console.log( 'Размер окна: ' + document.documentElement.clientHeight );
  }

  window.onscroll = function() {
    //console.log( 'Текущая прокрутка сверху: ' + window.pageYOffset );

    if (window.pageYOffset > document.documentElement.clientHeight) {
      //console.log('succes');
      let secondblock = IdGet('second-vid-block');
      let rotatedtext = IdGet('JS-rotated-text');
      let hiddenanimgroup = IdGet('JS-hidden-anim-group');

      //console.log(secondblock);

      rotatedtext.innerHTML = 'next project';

      RemoveClass(secondblock,'video-div__centered-block_hidden');
      RemoveClass(hiddenanimgroup,'anim-group_hidden');

    }
    else if (window.pageYOffset <= document.documentElement.clientHeight){
      //console.log('failure');
      let secondblock = IdGet('second-vid-block');
      let hiddenmenu = IdGet('JS-hidden-menu');
      let rotatedtext = IdGet('JS-rotated-text');
      let hiddenanimgroup = IdGet('JS-hidden-anim-group');

      rotatedtext.innerHTML = 'scroll';

      AddClass(secondblock,'video-div__centered-block_hidden');
      AddClass(hiddenanimgroup,'anim-group_hidden');
    }

    if (window.pageYOffset > ((document.documentElement.clientHeight)*0.35))  {
      let hiddenmenu = IdGet('JS-hidden-menu');

      AddClass(hiddenmenu,'appeared');
      // RemoveClass(hiddenmenu,'row__inner_hidden');
    }

  }

});


});

require.register("works.js", function(exports, require, module) {
document.addEventListener('DOMContentLoaded', function() {

  console.log('works java-script  file initialized');
  
  function IdGet(idname) {return typeof i == 'object' ? i : document.getElementById(idname);}

  function ClassGet(classname) {return document.getElementsByClassName(classname);}

  function RemoveClass(element, classname) {
    var reg = new RegExp("\\b"+ classname+"\\b","g");
    element.className = element.className.replace(reg," ");
  }

  function AddClass(element, classname) {
    var arr;
    arr = element.className.split(" ");
    if (arr.indexOf(classname) == -1) {
      element.className += " " + classname;
    }
    element.className = element.className.replace(/\s+/g," ");
  }

  function GetCoords(element,attr) {
    element = IdGet(element); 
    var box = element.getBoundingClientRect();
    if (attr == 'left') {
      return box.left + pageXOffset;
    } else if (attr == 'top') {
      return box.top + pageYOffset;
    } else
    return {
      top: box.top + pageYOffset,
      left: box.left + pageXOffset
    };
  }

  function IsVisible(element, elemotop) {
    element = IdGet(element);
    console.log(element);
    let wscrollTop = window.pageYOffset || document.documentElement.scrollTop;
    let elemotop = GetCoords(element,'top');
    let elemotopwheight = elemoffcettop + element.offsetHeight;
    let wscrollHeight = Math.max(
      document.body.scrollHeight, document.documentElement.scrollHeight,
      document.body.offsetHeight, document.documentElement.offsetHeight,
      document.body.clientHeight, document.documentElement.clientHeight
    );
    return ((elemotopwheight <= wscrollTop + wscrollHeight) && (elemtop >= wscrollTop ));
  }

  function GetNumeredIds(idPrefix, num) {
    let numeredIds = [];
    for (let index = 1; index <= num; index++) {
      numeredIds[index] = IdGet( idPrefix + index);
    }
    return numeredIds
  }

  let linksarray = [];

  window.onload = function () {

    let logosvg = IdGet('JS-logo-svg');
    logosvg.setAttribute("style","fill: #fff");

    let menubutton = IdGet('JS-menu-button');
    let menubuttonclicked = false;
    // console.log(menubuttonclicked);
    // console.log(menubutton);

    AddClass(menubutton,'nav-menu__menu-button_nohide');

    let workarealinks = GetNumeredIds('JS-works-area-link-',6);

    for (let index = 1; index < workarealinks.length; index++) {
      linksarray[index] = GetCoords(workarealinks[index],'top');
    }

    for (let index = 3; index < workarealinks.length; index++) {
      AddClass(workarealinks[index],'works-area__inner__link_hidden');
    }

    menubutton.onclick = function() {

      let minsizemenu = IdGet('JS-min-size-menu');
      let logosvg = IdGet('JS-logo-svg');
      let worksarea = IdGet('JS-works-area');
      let menuLines = GetNumeredIds('line-',3);
      // let logosvg = IdGet('JS-logo-svg');
      
      if (!menubuttonclicked) {
        RemoveClass(minsizemenu,'block-hide');
        AddClass(worksarea,'block-hide');
        AddClass(minsizemenu,'appeared');
        menuLines.forEach(element => {AddClass(element,'nav-menu__menu-button__line_dark')});
        logosvg.setAttribute("style","fill: #000");
        menubuttonclicked = true;
      } else {
        AddClass(minsizemenu,'block-hide');
        RemoveClass(worksarea,'block-hide');
        RemoveClass(minsizemenu,'appeared');
        menuLines.forEach(element => {RemoveClass(element,'nav-menu__menu-button__line_dark')});
        logosvg.setAttribute("style","fill: #fff");
        menubuttonclicked = false;
      }
      
    }

  }

  window.onscroll = function() {
    let workarealinks = GetNumeredIds('JS-works-area-link-',6);

      // console.log(IsVisible('JS-works-area-link-1'));
      // console.log(GetCoords('JS-works-area-link-1', 'top'));
      console.log(linksarray);
  }


});

});

require.register("___globals___", function(exports, require, module) {
  
});})();require('___globals___');

/* jshint ignore:start */
(function() {
  var WebSocket = window.WebSocket || window.MozWebSocket;
  var br = window.brunch = (window.brunch || {});
  var ar = br['auto-reload'] = (br['auto-reload'] || {});
  if (!WebSocket || ar.disabled) return;
  if (window._ar) return;
  window._ar = true;

  var cacheBuster = function(url){
    var date = Math.round(Date.now() / 1000).toString();
    url = url.replace(/(\&|\\?)cacheBuster=\d*/, '');
    return url + (url.indexOf('?') >= 0 ? '&' : '?') +'cacheBuster=' + date;
  };

  var browser = navigator.userAgent.toLowerCase();
  var forceRepaint = ar.forceRepaint || browser.indexOf('chrome') > -1;

  var reloaders = {
    page: function(){
      window.location.reload(true);
    },

    stylesheet: function(){
      [].slice
        .call(document.querySelectorAll('link[rel=stylesheet]'))
        .filter(function(link) {
          var val = link.getAttribute('data-autoreload');
          return link.href && val != 'false';
        })
        .forEach(function(link) {
          link.href = cacheBuster(link.href);
        });

      // Hack to force page repaint after 25ms.
      if (forceRepaint) setTimeout(function() { document.body.offsetHeight; }, 25);
    },

    javascript: function(){
      var scripts = [].slice.call(document.querySelectorAll('script'));
      var textScripts = scripts.map(function(script) { return script.text }).filter(function(text) { return text.length > 0 });
      var srcScripts = scripts.filter(function(script) { return script.src });

      var loaded = 0;
      var all = srcScripts.length;
      var onLoad = function() {
        loaded = loaded + 1;
        if (loaded === all) {
          textScripts.forEach(function(script) { eval(script); });
        }
      }

      srcScripts
        .forEach(function(script) {
          var src = script.src;
          script.remove();
          var newScript = document.createElement('script');
          newScript.src = cacheBuster(src);
          newScript.async = true;
          newScript.onload = onLoad;
          document.head.appendChild(newScript);
        });
    }
  };
  var port = ar.port || 9485;
  var host = br.server || window.location.hostname || 'localhost';

  var connect = function(){
    var connection = new WebSocket('ws://' + host + ':' + port);
    connection.onmessage = function(event){
      if (ar.disabled) return;
      var message = event.data;
      var reloader = reloaders[message] || reloaders.page;
      reloader();
    };
    connection.onerror = function(){
      if (connection.readyState) connection.close();
    };
    connection.onclose = function(){
      window.setTimeout(connect, 1000);
    };
  };
  connect();
})();
/* jshint ignore:end */

;
//# sourceMappingURL=app.js.map