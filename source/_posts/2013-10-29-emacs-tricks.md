---
layout: default
tags : other
comments : true
tags :
- javascript
codesyntax : true
title : 在emacs内实现html标签 和 html实体 的相互转换
---

输出html代码的时候希望将其转义后输出，像这样的

```
&lt;h1&gt;this is h1&lt;/h1&gt;
```

但是在编辑的时候形态是这样的

```
<h1>this is h1</h1>
```
如果借用外部的资源是很好解决的，只需将 `<` 替换为 &amp;lt; `>`
替换为 &amp;gt;即可.

使用emacs的话，写两个elisp函数即可：

<pre><code class="lisp">
(defun region-entity-to-html (start end)
  "Replace entities to html in region …."
  (interactive "r")
  (save-restriction
        (narrow-to-region start end)

        (goto-char (point-min))
        (while (search-forward "&lt;" nil t) (replace-match "<" nil t))

        (goto-char (point-min))
        (while (search-forward "&gt;" nil t) (replace-match ">" nil t))

        ;; more here
        )
  )


(defun region-html-to-entity (start end)
  "Replace html to entities in region …."
  (interactive "r")
  (save-restriction
        (narrow-to-region start end)

        (goto-char (point-min))
        (while (search-forward "<" nil t) (replace-match "&lt;" nil t))

        (goto-char (point-min))
        (while (search-forward ">" nil t) (replace-match "&gt;" nil t))

        ;; more here
        )
  )</code></pre>

将这两个函数放到~/.emacs中，以后要想将一段html转为html，只需
选中这段文本，然后执行命令M-x region-html-to-entity 或者 region-entity-to-html
