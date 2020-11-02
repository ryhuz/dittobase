import React from 'react'

function Stats({stats}) {
    function fixName (name){
        if(name === 'hp'){
            return 'HP';
        }else if(name.split('-').length === 1){
            return name[0].toUpperCase()+name.slice(1);
        }else{
            let temp = name.split('-');
            return temp[0][0].toUpperCase()+temp[0].slice(1) + ' ' + temp[1][0].toUpperCase()+temp[1].slice(1);
        }
        return '';
    }
    return (
        <>
            <table className="table table-hover border rounded-lg">
                <thead className="border rounded-lg">
                    <tr className="border rounded-lg">
                        <th colSpan = "2" scope="col" className="border rounded-lg text-center"><div>Stats</div></th>
                    </tr>
                </thead>
                <tbody>
                    {stats.length && stats.map((el, index) => (
                        <tr key={index} className="border rounded-lg">
                        <td className="text-center border rounded-lg" width ="70%">
                            {fixName(el.name)}
                        </td>
                        <td className="text-center border rounded-lg" width ="30%">
                            {el.base_stat}
                        </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}

export default Stats


/* 
{desc.map((el, index) => (
                        <tr key={index} className="border rounded-lg">
                            <td className="text-center">
                                {Array.isArray(el.version) ?
                                    el.version.map((x) => (
                                        <div className="border rounded-lg">
                                            {x.name ? x.name[0].toUpperCase() + x.name.slice(1) : ""}
                                        </div>
                                    )) :
                                    <div className="border rounded-lg mt-2">
                                        {(el.version.name[0].toUpperCase() + el.version.name.slice(1))}
                                    </div>
                                }
                            </td>
                            <td className="border rounded-lg">
                                <div className="border rounded-lg pl-2 ">
                                    {el.flavor_text}
                                </div>
                            </td>
                        </tr>
                    ))}
*/