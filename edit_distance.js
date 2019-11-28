function makeANode (pn, qn, parent, children) {
    return {
        name: makeParent(pn,qn),
        parent: parent,
        children: children
    }
}

function makeParent(pn, qn) {
    return `pn=${pn}, qn=${qn}`;
}

function findMinOperation(p, q, pn, qn, visited) {
    if (pn < 0 && qn < 0) {
        return [0, makeANode(0, 0, null,[])];
    } else if (pn < 0) {
        return [qn - pn, makeANode(pn, qn, "Crap",[]) ];
    } else if (qn < 0) {
        return [pn - qn, makeANode(pn, qn, "Crap",[]) ];
    }

    // if (visited[pn][qn] != 105) {
    //     [visited[pn][qn], makeANode(0, 0, null,[])];
    // }

    const node = makeANode(pn, qn, null, []);
    if (p[pn] != q[qn]) {
        const [ insert, inserto ] = findMinOperation(p, q, pn, qn - 1, visited);
        const [ replace, replaceo ] = findMinOperation(p, q, pn - 1, qn - 1, visited);
        const [ removee, removeeo ] = findMinOperation(p, q, pn - 1, qn, visited);

        node.children.push(inserto);
        node.children.push(replaceo);
        node.children.push(removeeo);
        visited[pn][qn] = Math.min(Math.min(1+ insert, 1+replace), 1+ removee);
    } else {
        const [pass, passO] = findMinOperation(p, q, pn - 1, qn - 1, visited);
        visited[pn][qn] = pass;
        node.children.push(passO);
    }
    return [visited[pn][qn], {...node}];
}

function generateTree (p, q, pn, qn) {
    const visited = [];
    const MAX = 105;
    for (var i = 0; i < Math.max(pn, qn) + 1; i++) {
        visited[i]= [];
        for (var j = 0; j < Math.max(pn, qn) + 1; j++) {
            visited[i][j] = MAX;
        }
    }
    return findMinOperation(p, q, pn, qn, visited);
}

