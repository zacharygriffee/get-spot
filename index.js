function getSpot(offset = 1) {
    if (offset instanceof Error || offset?.message) {
        return getErrorSpot(offset);
    }
    offset = Math.max(offset, 1);
    if (offset !== offset) offset = 1;
    return rawParse(new Error().stack).slice(offset).map(x => extractEntryMetadata(x));
}

function getErrorSpot(error) {
    return extractEntryMetadata([rawParse(error.stack)[0]])[0];
}

function extractEntryMetadata(e) {
    return Object.assign(e, {
        calleeShort: e.calleeShort || ((e.callee || '').split('.'))[(e.callee || '').split('.').length - 1]
    })
}

function rawParse(str) {
    const entries = str.split('\n').map(line => {

        line = line.trim()

        let callee, fileLineColumn = [], planA, planB

        if ((planA = line.match(/at (.+) \(eval at .+ \((.+)\), .+\)/)) || // eval calls
            (planA = line.match(/at (.+) \((.+)\)/)) ||
            ((line.slice(0, 3) !== 'at ') && (planA = line.match(/(.*)@(.*)/)))) {

            callee = planA[1]
            fileLineColumn = (planA[2].match(/(.*):(\d+):(\d+)/) ||
                planA[2].match(/(.*):(\d+)/) || []).slice(1)

        } else if ((planB = line.match(/^(at\s+)*(.+):(\d+):(\d+)/))) {
            fileLineColumn = (planB).slice(2)

        } else {
            return undefined
        }

        return {
            file: fileLineColumn[0],
            beforeParse: line,
            callee: callee || '',
            line: parseInt(fileLineColumn[1] || '', 10) || undefined,
            column: parseInt(fileLineColumn[2] || '', 10) || undefined
        }
    })

    return entries.filter(x => (x !== undefined))
}

export {getSpot};
export default getSpot;