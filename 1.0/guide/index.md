## 综述

textDiff是进行文本diff的工具，如果是超过8000个字符以上的长文本，请谨慎使用，内存消耗会很大。8000以下短文本请放心使用。

* 版本：1.0
* 作者：moxiao
* demo：[http://gallery.kissyui.com/textDiff/1.0/demo/index.html](http://gallery.kissyui.com/textDiff/1.0/demo/index.html)

## 初始化组件

    S.use('gallery/textDiff/1.0/index', function (S, TextDiff) {
         var textDiff = new TextDiff({
                 wrapper1: '<b>', //异常字符包装前缀，可选，默认<b>
                 wrapper1: '</b>' //异常字符包装后缀，可选，默认</b>
         });
    })

## API说明

### getDiff(a, b, [wrapper1, wrapper2])
    获取a,b字符串的diff结果。
    返回[diffA, diffB]
    diffA和diffB是a,b对比的结果，不同的字符会用wrapper1和wrapper2包裹。

