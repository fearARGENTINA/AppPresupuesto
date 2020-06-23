import React, { useState } from 'react';
import Error from "./Error";
import shortid from "shortid";
import PropTypes from 'prop-types';

const Formulario = ({ guardarGasto, guardarCrearGasto }) => {

    const [nombre, guardarNombre] = useState("");
    const [cantidad, guardarCantidad] = useState(0);
    const [error, guardarError] = useState(false);

    const agregarGasto = e => {
        e.preventDefault();

        // Validar
        if( cantidad < 1 || isNaN(cantidad) || nombre.trim() === "" ) {
            guardarError(true);
            return;
        }
        guardarError(false);

        // Construir el gasto
        const gasto = {
            nombre,
            cantidad,
            id: shortid.generate()
        };
        
        // Pasar el gasto al componente principal
        guardarGasto(gasto);
        guardarCrearGasto(true);
        
        // Resetear el formulario
        guardarNombre("");
        guardarCantidad(0);
    }

    return (
        <form
            onSubmit={agregarGasto}
        >
            <h2>Agrega tus gastos aqui</h2>

            {
                error ? <Error mensaje="Ambos campos son obligatorios o presupuesto incorrecto" /> : null
            }

            <div className="campo">
                <label>Nombre del gasto</label>
                <input
                    type="text"
                    className="u-full-width"
                    placeholder="Ej. Transporte"
                    value={nombre}
                    onChange ={ e => guardarNombre(e.target.value) }
                />
                <label>Cantidad gasto</label>
                <input
                    type="number"
                    className="u-full-width"
                    placeholder="300"
                    value={cantidad}
                    onChange={ e => guardarCantidad(parseInt(e.target.value, 10)) }
                />
                <input
                    type="submit"
                    className="button-primary u-full-width"
                    value="Agregar gasto"
                />
            </div>
        </form>
    );
}

Formulario.propTypes = {
    guardarGasto: PropTypes.func.isRequired,
    guardarCrearGasto: PropTypes.func.isRequired,
};

export default Formulario;