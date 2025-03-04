import React, { useEffect, useState } from 'react';
import "./SearchBarComponent.css";
import lupaImg from "../SearchBarComponent/imgs/lupa.svg";
import calendarImg from "../SearchBarComponent/imgs/calendar.svg";
import DatePicker from 'react-datepicker'; // Importar el componente DatePicker
import 'react-datepicker/dist/react-datepicker.css';

const SearchBarComponent = () => {
    const [categorias, setCategorias] = useState([]);
    const [ciudades, setCiudades] = useState([]);
    const [selectedCategoria, setSelectedCategoria] = useState('');
    const [selectedCiudad, setSelectedCiudad] = useState('');
    const [startDate, setStartDate] = useState(null); // Definición de estado para la fecha seleccionada
    const [inputBuscar, setInputBuscar] = useState(''); // Nuevo estado para el campo de búsqueda

    // Función para cargar las categorías desde el backend
    const fetchCategorias = async () => {
        try {
            const response = await fetch('/api/categorias'); // Cambia esta URL por la correcta de tu backend
            const data = await response.json();
            setCategorias(data);
        } catch (error) {
            console.error('Error al cargar categorías:', error);
        }
    };

    // Función para cargar las ciudades desde el backend
    const fetchCiudades = async () => {
        try {
            const response = await fetch(''); // Cambia esta URL por la correcta de tu backend
            const data = await response.json();
            setCiudades(data);
        } catch (error) {
            console.error('Error al cargar ciudades:', error);
        }
    };

    useEffect(() => {
        fetchCategorias();
        fetchCiudades();
    }, []);

    // Función para limpiar los campos
    const handleLimpiar = () => {
        setSelectedCategoria(''); // Limpiar la categoría seleccionada
        setSelectedCiudad(''); // Limpiar la ciudad seleccionada
        setStartDate(null); // Limpiar la fecha seleccionada
        setInputBuscar(''); // Limpiar el input de búsqueda
    };

    return (
        <div className="contenedorSearch">
            <div>
                <div className="search-bar">
                    <div className="search-input">
                        <img src={lupaImg} className="button-iconSearch" />
                        <input
                            className="inputBuscar"
                            type="text"
                            placeholder="Buscar eventos o escenarios"
                            value={inputBuscar} // Asignar el valor del estado
                            onChange={(e) => setInputBuscar(e.target.value)} // Actualizar el estado con el valor del input
                        />
                    </div>

                    <select
                        value={selectedCategoria}
                        onChange={(e) => setSelectedCategoria(e.target.value)}
                        className="filter-select"
                    >
                        <option className="filter-select-text" value="">Categoría</option>
                        {categorias.map((categoria) => (
                            <option key={categoria.id} value={categoria.name}>
                                {categoria.name}
                            </option>
                        ))}
                    </select>

                    <div className="search-input-calendar">
                        <img src={calendarImg} className="button-iconSearch" />

                        <DatePicker
                            selected={startDate}
                            onChange={(date) => setStartDate(date)} // Actualiza el estado con la fecha seleccionada
                            className="date-picker" // Clase CSS para estilos
                            placeholderText="Fecha" // Texto de marcador de posición
                            dateFormat="dd/MM/yyyy" // Formato de la fecha
                        />
                    </div>

                    <select
                        value={selectedCiudad}
                        onChange={(e) => setSelectedCiudad(e.target.value)}
                        className="filter-select"
                    >
                        <option className="filter-select-text" value="">Ciudad</option>
                        {ciudades.map((ciudad) => (
                            <option key={ciudad.id} value={ciudad.name}>
                                {ciudad.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="contenedorBotones">
                    <button className="botonBuscar">
                        Buscar
                    </button>

                    <button className="botonBuscar" onClick={handleLimpiar}>
                        Limpiar
                    </button>
                </div>
            </div>
        </div>
    );
};

export { SearchBarComponent };
