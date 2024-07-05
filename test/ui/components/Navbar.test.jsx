import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, useNavigate } from 'react-router-dom';

import { AuthContext } from '../../../src/auth/context/AuthContext';
import { Navbar } from '../../../src/ui';

//* Mock del hook useNavigate de react-router-dom

//* ...jest.requireActual('react-router-dom') - esparce el resto de propiedades que tenga la librería, para solo sobreescribir lo que necesitemos, en este caso, useNavigate

const mockedUseNavigate = jest.fn();

jest.mock( 'react-router-dom', () => ( {
  ...jest.requireActual( 'react-router-dom' ),
  useNavigate: () => mockedUseNavigate
} ) );

describe( 'Pruebas en el <Navbar/>', () => {

  const contextValue = {
    logged: true,
    user: {
      id: '123',
      name: 'Daniel'
    },
    logout: jest.fn()
  };

  beforeEach( () => jest.clearAllMocks() );

  test( 'Debe mostrar el nombre del usuario en el Navbar', () => {

    render(
      <AuthContext.Provider value={ contextValue }>
        <MemoryRouter>
          <Navbar />
        </MemoryRouter>
      </AuthContext.Provider>
    );

    expect( screen.getByText( 'Daniel' ).innerHTML ).toBe( contextValue.user.name );
  } );

  test( 'Debe de llamar el logout y navigate cuando se hace click en el botón', () => {

    render(
      <AuthContext.Provider value={ contextValue }>
        <MemoryRouter >
          <Navbar />
        </MemoryRouter>
      </AuthContext.Provider>
    );

    const logoutBtn = screen.getByRole( 'button', { name: 'Logout' } );
    fireEvent.click( logoutBtn );

    expect( contextValue.logout ).toHaveBeenCalled();
    expect( mockedUseNavigate ).toHaveBeenCalledWith( "/login", { "replace": true } );

  } );
} );