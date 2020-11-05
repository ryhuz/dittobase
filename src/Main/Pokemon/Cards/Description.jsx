import React from 'react'
import { Container } from 'react-bootstrap';
import { Col } from 'react-bootstrap'

function Description({ desc }) {
    function fixName(name) {
        if (name.split('-').length === 1) {
            return name[0].toUpperCase() + name.slice(1);
        } else {
            let temp = name.split('-');
            let final = "";
            temp.forEach(x => {
                final += x[0].toUpperCase() + x.slice(1) + ' ';
            });
            return final;
        }
        return '';
    }
    return (
        <Col className="my-3">
            <h3 className="ml-3">Pokédex Entries</h3>
            <Container>
                <table className="table border rounded-lg">
                    <thead className="border rounded-lg" id="poke-desc-head">
                        <tr className="border rounded-lg">
                            <th scope="col" width="8.8%" className="border rounded-lg poke-desc-version text-right"><div>Version</div></th>
                            <th scope="col" className="border rounded-lg poke-desc-desc"><div>Description</div></th>
                        </tr>
                    </thead>
                </table>
                <table className="table table-hover border rounded-lg" id="poke-desc-table">
                    <tbody id="poke-desc-body">
                        {desc.map((el, index) => (
                            (Array.isArray(el.version) ?
                                <>
                                    <tr key={index} className="border rounded-lg">
                                        <td width="8%" className="text-right poke-desc-version">
                                            {el.version[0].name && fixName(el.version[0].name)}
                                        </td>
                                        <td className="border rounded-lg align-middle" rowSpan={2}>
                                            {el.flavor_text}
                                        </td>
                                    </tr>
                                    <tr key={`${index}-shared`} className="border rounded-lg">
                                        <td className="text-right poke-desc-version">
                                            {el.version[1].name && fixName(el.version[1].name)}
                                        </td>
                                    </tr>
                                </> :
                                <tr key={index} className="border rounded-lg">
                                    <td className="text-right poke-desc-version">
                                        {el.version.name && fixName(el.version.name)}
                                    </td>
                                    <td className="border rounded-lg">
                                        {el.flavor_text}
                                    </td>
                                </tr>
                            )
                        ))}
                    </tbody>
                </table>
            </Container>
        </Col>
    )
}

export default Description
