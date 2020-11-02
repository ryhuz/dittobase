import React from 'react'

function Description({desc}) {
    return (
        <>
            <table className="table table-hover border rounded-lg">
                <thead className="border rounded-lg" id="poke-desc-head">
                    <tr className="border rounded-lg">
                        <th scope="col" className="border rounded-lg poke-desc-version"><div>Version</div></th>
                        <th scope="col" className="border rounded-lg poke-desc-desc"><div>Description</div></th>
                    </tr>
                </thead>
            </table>
            <table className="table table-hover border rounded-lg" id="poke-desc-table">
                <tbody id="poke-desc-body">
                    {desc.map((el, index) => (
                        <tr key={index} className="border rounded-lg">
                            <td className="text-center poke-desc-version">
                                {Array.isArray(el.version) ?
                                    el.version.map((x, i) => (
                                        <div className="border rounded-lg" key={i}>
                                            {x.name ? x.name[0].toUpperCase() + x.name.slice(1) : ""}
                                        </div>
                                    )) :
                                    <div className="border rounded-lg mt-2">
                                        {(el.version.name[0].toUpperCase() + el.version.name.slice(1))}
                                    </div>
                                }
                            </td>
                            <td className="border rounded-lg">
                                <div className="border rounded-lg pl-2 poke-desc-desc">
                                    {el.flavor_text}
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}

export default Description
