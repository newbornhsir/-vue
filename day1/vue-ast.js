(function(global, factory){
  global.Vue = factory()
}(this,(function(){
  // 一些匹配的正则表达式，没仔细研究
  var ncname = '[a-zA-Z_][\\w\\-\\.]*';
  var qnameCapture = "((?:" + ncname + "\\:)?" + ncname + ")";
  var startTagOpen = new RegExp(("^<" + qnameCapture));
  var startTagClose = /^\s*(\/?)>/;
  var endTag = new RegExp(("^<\\/" + qnameCapture + "[^>]*>"));
  var attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/;
  function makeMap (
    str,
    expectsLowerCase
  ) {
    var map = Object.create(null);
    var list = str.split(',');
    for (var i = 0; i < list.length; i++) {
      map[list[i]] = true;
    }
    return expectsLowerCase
      ? function (val) { return map[val.toLowerCase()]; }
      : function (val) { return map[val]; }
  }
  function makeAttrsMap (attrs) {
    var map = {};
    for (var i = 0, l = attrs.length; i < l; i++) {
      map[attrs[i].name] = attrs[i].value;
    }
    return map
  }
  var isUnaryTag$$1 = makeMap(
    'area,base,br,col,embed,frame,hr,img,input,isindex,keygen,' +
    'link,meta,param,source,track,wbr'
  );
  function parseHTML(html,options) {
    var index = 0,lastTag, stack = [],last;
    while (html) {
      last = html;
      if (!lastTag || ['script','style','textarea'].indexOf(lastTag.toLowerCase())<0) {
        var textEnd = html.indexOf("<");
        if (0 === textEnd) {
          // 匹配关闭标签
          // 匹配结果的形式： ["</div>", "div", index: 0, input: "</div></div>"]
          var endMatch = html.match(endTag);
          if (endMatch) {
            var curIndex = index;
            advance(endMatch[0].length);
            parseEndTag(endMatch[1], curIndex, index);
            continue
          }
          // 匹配开始的标签
          var startTagMatch = matchStartTag();
          if (startTagMatch) {
            handleStartTag(startTagMatch);
            continue
          }

        }
        // 处理文本
        // 初始化为undefined
        var text = (void 0), rest = (void 0), next = (void 0);
        if (textEnd >= 0) {
          // <可能是文本的第一个，但不是标签
          rest = html.slice(textEnd)
          while (!endTag.test(rest) && !startTagOpen.test(rest)) {
            // 修改索引，继续截取
            next = rest.indexOf("<",1);
            textEnd += next;
            rest = html.slice(textEnd);
          }
          text = html.substring(0,textEnd);
          advance(textEnd);
        }
        if (textEnd < 0) {
          // 都是文本
          text = html;
          html = '';
        }
        // 处理文本节点
        text && options.char(text);
      } else {
        // 这部分暂时没用到
      }
    }
    function advance(n) {
      // 修改起始索引和html
      index += n;
      html = html.substring(n);
    }
    function parseEndTag(tagName, start, end) {
      var pos, lowerCasedTagName;
      if (start == null) { start = index; }
      if (end == null) { end = index; }
      lowerCasedTagName = tagName ? tagName.toLowerCase() : lowerCasedTagName;
      if (tagName) {
        // 先入后出，应该为stack中最后一个元素
        // 这里应该是做一次验证
        for (pos = stack.length -1; pos >= 0; pos --) {
          if (stack[pos].lowerCasedTag === lowerCasedTagName) {
            break
          }
        }
      } else {
        pos = 0;
      }
      if (pos >= 0) {
        for (var i = stack.length - 1; i >= pos; i--) {
          // 再次确认
          if (i > pos || !tagName ) {
            console.log("tag <" + (stack[i].tag) + "> has no matching end tag.");
          }
          // 父级函数处理父子关系
          options.end(stack[i].tag, start, end);
        }
        // 出栈
        stack.length = pos;
        lastTag = pos && stack[pos - 1].tag;
      } else if (lowerCasedTagName === 'br') {
        // 初步实现，这部分暂时没用到
        if (options.start) {
          options.start(tagName, [], true, start, end);
        }
      } else if (lowerCasedTagName === 'p') {
        // 初步实现，这部分暂时没用到
        if (options.start) {
          options.start(tagName, [], false, start, end);
        }
        if (options.end) {
          options.end(tagName, start, end);
        }
      }
    }
    function matchStartTag() {
      // ["<div", "div", index: 0, input: "<div class="demo">{{name}}</div></div>"]
      var start = html.match(startTagOpen);
      if (start) {
        var match = {
          tagName: start[1],
          attrs: [],
          start: index
        };
        advance(start[0].length);
        var end, attr;
        while (!(end = html.match(startTagClose)) && (attr = html.match(attribute))) {
          /*
           * 获取标签内的属性
           * [" class="demo"", "class",
           *  "=", "demo", undefined, undefined,
           * index: 0, input: " class="demo">{{name}}</div></div>"]
           */
          advance(attr[0].length);
          match.attrs.push(attr);
        }
        if (end) {
          // [">", "", index: 0, input: ">{{name}}</div></div>"]
          match.unarySlash = end[1];// 暂时不明白用来做什么
          advance(end[0].length);
          match.end = index;
          return match
        }
      }
    }
    function handleStartTag(match) {
      //{tagName: "div", attrs: Array(1), start: 23, unarySlash: "", end: 41}
      var tagName = match.tagName;
      var unarySlash = match.unarySlash;
      // 判断是否为自闭合标签
      var unary = isUnaryTag$$1(tagName) || !!unarySlash;
      var l = match.attrs.length;
      var attrs = new Array(l);
      for (var i = 0; i < l; i++) {
        var args = match.attrs[i];
        var value = args[3] || args[4] || args[5] || '';
        attrs[i] = {
          name: args[1],
          value: value
        };
      }

      if (!unary) {
        /*
         * 非自闭合标签放入stack中，处理父子关系，
         * 自闭合标签只有父级关系，父级关系在父级函数中已经确认，不需要在处理父子关系，所以不需要入栈
         */
        stack.push({ tag: tagName, lowerCasedTag: tagName.toLowerCase(), attrs: attrs });
        lastTag = tagName;
      }

      if (options.start) {
        options.start(tagName, attrs, unary, match.start, match.end);
      }
    }
  }
  function parseText(text,delimiters) {
    var tagRE = /\{\{((?:.|\n)+?)\}\}/g;
    if (!tagRE.test(text)) {
      return
    }
    var tokens = [];
    var rawTokens = [];
    var lastIndex = tagRE.lastIndex = 0;
    var match, index, tokenValue;
    while ((match = tagRE.exec(text))) {
      //["{{name}}", "name", index: 0, input: "{{name}}"]
      index = match.index;
      // push text token
      if (index > lastIndex) {
        rawTokens.push(tokenValue = text.slice(lastIndex, index));
        tokens.push(JSON.stringify(tokenValue));
      }
      // tag token
      var exp = match[1].trim();
      tokens.push(("_s(" + exp + ")"));
      rawTokens.push({ '@binding': exp });
      lastIndex = index + match[0].length;
    }
    if (lastIndex < text.length) {
      rawTokens.push(tokenValue = text.slice(lastIndex));
      tokens.push(JSON.stringify(tokenValue));
    }
    return {
      expression: tokens.join('+'),
      tokens: rawTokens
    }
  }
  function parse (template) {
    var root,parent,stack = [];
    parseHTML(template,{
      start: function (tag, attrs, unary) {
        var element = {
          type: 1,
          tag: tag,
          attrsList: attrs,
          attrsMap: makeAttrsMap(attrs),
          parent: parent,
          children: []
        };
        var l = element.attrsList.length;
        for (var i = 0; i < l; i++) {
          if (!element.attrs) {
            element.attrs = [];
          }
          element.attrs.push({name: element.attrsList[i].name,value: element.attrsList[i].value});
        }
        if (!root) {
          // 开始root为undefined,第一次入栈的时候是根元素
          root = element;
        }
        if(parent){
          parent.children.push(element);
          element.parent = parent;
        }
        if (!unary) {
          // 非闭合标签才需要继续处理children,所以需要入栈
          parent = element;
          stack.push(element);
        } else {
          /*
           * 自闭合标签如何处理？？
           */
          // closeElement(element)
        }
      },
      end: function () {
        var element = stack[stack.length-1];
        var lastNode = element.children[element.children.length - 1];
        if (lastNode && lastNode.type === 3 && lastNode.text === ' ') {
          element.children.pop();
        }
        // 出栈
        stack.length -= 1;
        parent = stack[stack.length - 1];
      },
      char: function (text) {
        if (!parent) {
          // 正常情况不会出现,因为肯定有一个根结点
          // console.log("error");
          // console.log(text);

          return
        }
        var children = parent.children;
        if (text) {
          var res;
          // 解析{{}}
          if (text !== ' ' && (res = parseText(text))) {
            children.push({
              type: 2,
              expression: res.expression,
              tokens: res.tokens,
              text: text
            });
          } else if (text !== ' ' || !children.length || children[children.length - 1].text !== ' ') {
            children.push({
              type: 3,
              text: text
            });
          }
        }
      }
    });
    return root;
  }
  function Vue$3(options){
    this._init(options)
  }
  Vue$3.prototype._init = function (options) {
    var el, template,ast;
    el = document.querySelector(options.el);
    if (el) {
      template = el.outerHTML.trim();
      ast = parse(template);
      console.log(ast);
    }
  };
  return Vue$3;
})));