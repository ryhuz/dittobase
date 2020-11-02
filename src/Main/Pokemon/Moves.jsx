import React from 'react'

function Moves({ moves }) {
    let sortedMoves = [];
    function sortByVersion() {
        let order = [
            "red-blue", "yellow", "gold-silver", "crystal",
            "ruby-sapphire", "emerald", "firered-leafgreen", "diamond-pearl",
            "platinum", "heartgold-soulsilver", "black-white", "colosseum", "xd",
            "black-2-white-2", "x-y", "omega-ruby-alpha-sapphire", "sun-moon",
            "ultra-sun-ultra-moon", "lets-go", "sword-shield"
        ]
        function sortMoveLearnMethod(list) {
            let sortedMethod = [];
            let methodOrder = ['egg', 'level-up', 'machine', 'tutor'];
            methodOrder.forEach(m => {
                if (list.hasOwnProperty(m)) {
                    sortedMethod.push({ method: m, moves: list[m] });
                }
            })
            return sortedMethod;
        }
        order.forEach(v => {
            if (moves.hasOwnProperty(v)) {
                sortedMoves.push({ name: v, moves: sortMoveLearnMethod(moves[v]) })
            }
        })
    }
    function generateMoves() {
        let max = 0;
        let finalTable = [];
        sortedMoves.forEach(el => {
            el.moves.forEach(elel => {
                if (elel.moves.length > max) {
                    max = elel.moves.length;
                }
            })
        })
        let count = 0;
        finalTable.push(
            <tr className="border rounded-lg">
                {sortedMoves.map(x => (
                    <td className="border rounded-lg h5 text-center" colSpan={x.moves.length /* + 1 */}>{x.name}</td>
                ))}
            </tr>
        );
        finalTable.push(
            <tr className="border rounded-lg">
                {sortedMoves.map(x => (
                    x.moves.map(mName => (
                        <td className="border rounded-lg h6 text-center" /* colSpan={mName.method === 'level-up' ? "2" : "1"} */>{mName.method}</td>
                    ))
                ))}
            </tr>
        );
        while (count < max) {
            finalTable.push(
                <tr className="border rounded-lg">
                    {sortedMoves.map(x => (
                        x.moves.map(move => (
                            <td className={move.moves[count] && "border rounded-lg data"}>{move.moves[count] && move.moves[count].name}</td>
                        ))
                    ))}
                </tr>
            );
            count++;
        }
        return (finalTable);
    }

    sortByVersion();
    generateMoves();
    console.log(sortedMoves);
    return (
        <>
            <table className="table table-hover border rounded-lg">
                <thead className="border rounded-lg">
                    <tr className="border rounded-lg">
                        <th colspan="2" scope="col" className="border rounded-lg text-center"><div>Moves</div></th>
                    </tr>
                </thead>
            </table>
            <div id="poke-moves-body">
                <table >
                    <tbody>
                        {generateMoves()}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default Moves
