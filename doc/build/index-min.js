/*! textDiff - v2.0.0 - 2013-09-27 2:36:05 PM
* Copyright (c) 2013 moxiao; Licensed  */
KISSY.add("kg/textDiff/2.0.0/index",function(a,b,c){function d(a){var b=this;b.cfg=a||{},b._init()}return b.all,a.augment(d,c,{_init:function(){var b=this;b.cfg=a.merge({wrapper1:"<b>",wrapper2:"</b>"},b.cfg)},_getMinValue:function(){for(var a=99999999999,b=0;b<arguments.length;b++)a=Math.min(arguments[b],a);return a},_minEditDistance:function(a,b,c){for(var d=999999999,e=1;b>=e;e++)a[e][c+1]<d&&(d=a[e][c+1]);for(var f=1;c>=f;f++)a[b+1][f]<d&&(d=a[b+1][f]);return d},_getDiffMatrix:function(a,b){var c,d,e=a.length,f=b.length,g=new Array(e+2);for(c=0;e+2>c;c++)g[c]=new Array(f+2);for(c=0;e>=c;c++)g[c][0]=c;for(d=0;f>=d;d++)g[0][d]=d;for(c=1;e>=c;c++)for(d=1;f>=d;d++)g[c][d]=this._getMinValue(g[c-1][d-1]+(a[c-1]==b[d-1]?0:1),g[c-1][d]+1,g[c][d-1]+1);for(c=1;e>=c;c++)g[c][f+1]=g[c][f]+(e-c);for(d=1;f>=d;d++)g[e+1][d]=g[e][d]+(f-d);return g},getDiff:function(a,b,c,d){if(a=a||"",b=b||"",c=c||this.cfg.wrapper1,d=d||this.cfg.wrapper2,null==a||null==b)return null;if(""==a)return[a,c+b+d];if(""==b)return[c+a+d,b];var e,f,g=a.split(""),h=b.split(""),i=g.length,j=h.length,k=this._getDiffMatrix(g,h),l=this._minEditDistance(k,i,j),m=[];for(e=1;i>=e;e++)k[e][j+1]==l&&(m=[e,j]);for(f=1;j>=f;f++)k[i+1][f]==l&&(m=[i,f]);var n,o=m[0],p=m[1],q=[],r=[];for(i>o?q.push(c+a.substring(o)+d):j>p&&r.push(c+b.substring(p)+d),o=m[0],p=m[1];0!=o&&0!=p;)l=this._getMinValue(k[o-1][p-1],k[o][p-1],k[o-1][p]),n=l!=k[o][p],k[o-1][p-1]==l?(n?(q.push(c+g[o-1]+d),r.push(c+h[p-1]+d)):(q.push(g[o-1]),r.push(h[p-1])),o--,p--):k[o][p-1]==l?(n?r.push(c+h[p-1]+d):(q.push(g[o-1]),r.push(h[p-1])),p--):(n?q.push(c+g[o-1]+d):(q.push(g[o-1]),r.push(h[p-1])),o--);0!=o?q.push(c+a.substring(0,o)+d):0!=p&&r.push(c+b.substring(0,p)+d),q.reverse(),r.reverse();var s=[];for(e=0;e<q.length;e++)s.push(q[e]);var t=[];for(e=0;e<r.length;e++)t.push(r[e]);return[s.join("").replace(new RegExp(d+c,"g"),""),t.join("").replace(new RegExp(d+c,"g"),"")]}}),d},{requires:["node","base"]});