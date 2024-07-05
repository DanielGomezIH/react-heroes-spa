import { render, screen } from '@testing-library/react';
import { AppRouter } from '../../src/router/AppRouter';
import { MemoryRouter } from 'react-router-dom';
import { AuthContext } from '../../src/auth';

describe( 'Pruebas en <AppRouter>', () => {

  test( 'Debe de mostrar el login si no está autenticado', () => {

    const contextValue = {
      logged: false
    };

    render(
      <AuthContext.Provider value={ contextValue }>
        <MemoryRouter initialEntries={ [ '/marvel' ] }>
          <AppRouter />
        </MemoryRouter>
      </AuthContext.Provider>
    );

    expect( screen.getAllByText( 'Login' ).length ).toBe( 2 );
  } );

  test( 'Debe de mostrar la página de marvel si está autenticado', () => {

    const contextValue = {
      logged: true,
      user: {
        id: '123',
        name: 'Daniel'
      }
    };

    render(
      <AuthContext.Provider value={ contextValue }>
        <MemoryRouter initialEntries={ [ '/login' ] }>
          <AppRouter />
        </MemoryRouter>
      </AuthContext.Provider>
    );

    expect( screen.getByRole( 'heading', { level: 1, name: 'Marvel Comics' } ) ).toBeTruthy();
    expect( screen.getAllByText( 'Marvel' ).length ).toBeGreaterThanOrEqual( 1 );
  } );
} );