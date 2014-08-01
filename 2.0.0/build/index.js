/*
combined files : 

kg/textDiff/2.0.0/index

*/
/**
 * @fileoverview 
 * @author moxiao<moxiao.hd@alibaba-inc.com>
 * @module textDiff
 **/
KISSY.add('kg/textDiff/2.0.0/index',function (S, Node,Base) {
    var EMPTY = '';
    var $ = Node.all;
    /**
     * 
     * @class TextDiff
     * @constructor
     * @extends Base
     */
    function TextDiff(comConfig) {
        var self = this;
        self.cfg = comConfig || {};
        self._init();
    }

	
	S.augment(TextDiff, Base, {
		_init : function(){
			var self = this;

			self.cfg = S.merge({
				wrapper1: '<b>',
				wrapper2: '</b>'
			}, self.cfg);
		},
		
		_getMinValue : function() {
			var minValue = 99999999999;
			for(var i = 0; i < arguments.length; i++){
				minValue = Math.min(arguments[i], minValue);
			}
			return minValue;
		},
		
		_minEditDistance : function(matrix, lengthA, lengthB) {
			var minValue = 999999999;
			for (var i = 1; i <= lengthA; i++) {
				if (matrix[i][lengthB + 1] < minValue) {
					minValue = matrix[i][lengthB + 1];
				}
			}
		
			for (var j = 1; j <= lengthB; j++) {
				if (matrix[lengthA + 1][j] < minValue) {
					minValue = matrix[lengthA + 1][j];
				}
			}
		
			return minValue;
		},
		
		_getDiffMatrix : function(strA, strB) {
			var lengthA = strA.length, lengthB = strB.length;
			var matrix = new Array(lengthA + 2);
			var i, j;
			
			for(i = 0; i < lengthA + 2; i++){
				matrix[i] = new Array(lengthB + 2);
			}
		
			for (i = 0; i <= lengthA; i++) {
				matrix[i][0] = i;
			}
		
			for (j = 0; j <= lengthB; j++) {
				matrix[0][j] = j;
			}
		
			for (i = 1; i <= lengthA; i++) {
				for (j = 1; j <= lengthB; j++) {
					matrix[i][j] = this._getMinValue(matrix[i - 1][j - 1] + (strA[i - 1] == strB[j - 1] ? 0 : 1), matrix[i - 1][j] + 1,
								matrix[i][j - 1] + 1);
				}
			}
		
			for (i = 1; i <= lengthA; i++) {
				matrix[i][lengthB + 1] = matrix[i][lengthB] + (lengthA - i);
			}
		
			for (j = 1; j <= lengthB; j++) {
				matrix[lengthA + 1][j] = matrix[lengthA][j] + (lengthB - j);
			}
		
			return matrix;
		},
			
		getDiff : function(a, b, wrapper1, wrapper2){
			a = a || '';
			b = b || '';
			wrapper1 = wrapper1 || this.cfg.wrapper1;
			wrapper2 = wrapper2 || this.cfg.wrapper2;
			
			if(a == null || b == null){
				return null;
			}
			
			if(a == ''){
				return [ a, wrapper1 + b + wrapper2 ];
			}
			
			if(b == ''){
				return [ wrapper1 + a + wrapper2, b ];
			}
			
			var strA = a.split('');
			var strB = b.split('');
			var lengthA = strA.length, lengthB = strB.length;
			var matrix = this._getDiffMatrix(strA, strB);
			var minValue = this._minEditDistance(matrix, lengthA, lengthB);
		
			// 反向回溯
			var recall = [];
			var i, j;
			for (i = 1; i <= lengthA; i++) {
				if (matrix[i][lengthB + 1] == minValue) {
					recall = [ i, lengthB ];
				}
			}
		
			for (j = 1; j <= lengthB; j++) {
				if (matrix[lengthA + 1][j] == minValue) {
					recall = [ lengthA, j ];
				}
			}
		
			var idxA = recall[0], idxB = recall[1];
			var changeCharactor;
			var listA = [];
			var listB = [];
			if (idxA < lengthA) {
				listA.push(wrapper1 + a.substring(idxA) + wrapper2);
			} else if (idxB < lengthB) {
				listB.push(wrapper1 + b.substring(idxB) + wrapper2);
			}
		
			for (idxA = recall[0], idxB = recall[1]; idxA != 0 && idxB != 0;) {
				minValue = this._getMinValue(matrix[idxA - 1][idxB - 1], matrix[idxA][idxB - 1], matrix[idxA - 1][idxB]);
				changeCharactor = minValue != matrix[idxA][idxB];
				if (matrix[idxA - 1][idxB - 1] == minValue) {
					if(changeCharactor){
						listA.push(wrapper1 + strA[idxA - 1] + wrapper2);
						listB.push(wrapper1 + strB[idxB - 1] + wrapper2);
					}else{
						listA.push(strA[idxA - 1]);
						listB.push(strB[idxB - 1]);
					}
					idxA--;
					idxB--;
				} else if (matrix[idxA][idxB - 1] == minValue) {
					if(changeCharactor){
						listB.push(wrapper1 + strB[idxB - 1] + wrapper2);
					}else{
						listA.push(strA[idxA - 1]);
						listB.push(strB[idxB - 1]);
					}
					idxB--;
				} else {
					if(changeCharactor){
						listA.push(wrapper1 + strA[idxA - 1] + wrapper2);
					}else{
						listA.push(strA[idxA - 1]);
						listB.push(strB[idxB - 1]);
					}
					idxA--;
				}
			}
		
			if (idxA != 0) {
				listA.push(wrapper1 + a.substring(0, idxA) + wrapper2);
			} else if (idxB != 0) {
				listB.push(wrapper1 + b.substring(0, idxB) + wrapper2);
			}
		
			listA.reverse();
			listB.reverse();
		
			var A = [];
			for (i = 0; i < listA.length; i++) {
				A.push(listA[i]);
			}
		
			var B = [];
			for (i = 0; i < listB.length; i++) {
				B.push(listB[i]);
			}
		
			return [ A.join('').replace(new RegExp(wrapper2 + wrapper1,"g"), ""),
					B.join('').replace(new RegExp(wrapper2 + wrapper1,"g"), "") ];
			
		}
	});
	
	return TextDiff;
}, {requires:['node', 'base']});




