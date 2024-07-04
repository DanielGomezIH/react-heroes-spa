import { render, screen } from '@testing-library/react';
import { AuthContext } from '../../src/auth';
import { PrivateRoute } from '../../src/router/PrivateRoute';
import { MemoryRouter, Routes, Route } from 'react-router-dom';


describe( 'Pruebas en <PrivateRoute/>', () => {

  test( 'Debe de mostrar el children si está autenticado', () => {

    Storage.prototype.setItem = jest.fn();

    const contextValue = {
      logged: true,
      user: {
        id: '123',
        name: 'Daniel'
      }
    };

    render(
      <AuthContext.Provider value={ contextValue }>
        <MemoryRouter initialEntries={ [ '/marvel' ] }>
          <PrivateRoute>
            <h1>Ruta Privada</h1>
          </PrivateRoute>
        </MemoryRouter>
      </AuthContext.Provider> );

    expect( screen.getByText( 'Ruta Privada' ) ).toBeTruthy();
    expect( localStorage.setItem ).toHaveBeenCalledWith( "lastPath", "/marvel" );
  } );

  test( 'Debe de navegar al login si no está autenticado', () => {

    const contextValue = {
      logged: false
    };

    render(
      <AuthContext.Provider value={ contextValue }>
        <MemoryRouter initialEntries={ [ '/marvel' ] }>
          <Routes>

            <Route path='marvel' element={
              <PrivateRoute>
                <h1>Ruta Privada</h1>
              </PrivateRoute>
            } />

            <Route path='login' element={ <h1>Página de login</h1> }></Route>
          </Routes>
        </MemoryRouter>
      </AuthContext.Provider>
    );

    expect( screen.getByText( 'Página de login' ) ).toBeTruthy();
  } );

} );