function cramersRule(matrix, freeTerms) {
	var det = detr(matrix),
		returnArray = [],
		i,
		tmpMatrix;
 
	for(i=0; i < matrix[0].length; i++) {
		var tmpMatrix = insertInTerms(matrix, freeTerms,i)
		returnArray.push(detr(tmpMatrix)/det)
	}
	return returnArray;
}

function insertInTerms(matrix, ins, at) {
	var tmpMatrix = clone(matrix),
		i;
	for(i=0; i < matrix.length; i++) {
		tmpMatrix[i][at] = ins[i];
	}
	return tmpMatrix;
}

function detr(mat) {
	var ans;
    ans = mat[0][0] * (mat[1][1] * mat[2][2] - mat[2][1] * mat[1][2])
        - mat[0][1] * (mat[1][0] * mat[2][2] - mat[1][2] * mat[2][0])
        + mat[0][2] * (mat[1][0] * mat[2][1] - mat[1][1] * mat[2][0]);
    return ans;
}

function clone(m) {
	return m.map(function(a){return a.slice();});
}
 