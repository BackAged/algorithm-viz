const INSERT = "INSERT";
const REMOVE = "REMOVE";
const REPLACE = "REPLACE";

function makeANode (pn, qn, parent, children, colorCode) {
    return {
        colorCode,
        name: makeParent(pn,qn),
        parent: parent,
        children: children
    }
}

function makeParent(pn, qn) {
    return `pn=${pn}, qn=${qn}`;
}

function findMinOperation(p, q, pn, qn, visited, state) {
    const node = makeANode(pn, qn, null, [], state);

    if (pn < 0 && qn < 0) {
        return [0, {...node, name:'*'}];
    } else if (pn < 0) {
        const [ t, to ] = findMinOperation(p, q, pn, qn - 1, visited, INSERT);
        node.children.push(to);
        return [t+1, {...node}];
    } else if (qn < 0) {
        const [ t, to ] =findMinOperation(p, q, pn-1, qn, visited, REMOVE);
        node.children.push(to);
        return [t+1, {...node}];
    }

    // if (visited[pn][qn] && visited[pn][qn]!= 105) {
    //     return [visited[pn][qn], makeANode(0, 0, null,[], state)];
    // }

    if (p[pn] != q[qn]) {
        const [ insert, inserto ] = findMinOperation(p, q, pn, qn - 1, visited, INSERT);
        const [ replace, replaceo ] = findMinOperation(p, q, pn - 1, qn - 1, visited, REPLACE);
        const [ removee, removeeo ] = findMinOperation(p, q, pn - 1, qn, visited, REMOVE);

        node.children.push(inserto);
        node.children.push(replaceo);
        node.children.push(removeeo);
        visited[pn][qn] = Math.min(Math.min(1+ insert, 1+replace), 1+ removee);
    } else {
        const [pass, passO] = findMinOperation(p, q, pn - 1, qn - 1, visited, "YELLOW");
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
    return findMinOperation(p, q, pn-1, qn-1, visited, "BLACK");
}

