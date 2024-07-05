import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { HeroesRoutes } from '../../../src/heroes/routes/HeroesRoutes';
import { AuthContext } from '../../../src/auth/context/AuthContext';
import { renderHook } from '@testing-library/react';
import { useNavigate } from 'react-router-dom';

describe( 'Pruebas en <HeroesRoutes/>', () => {

  const contextValue = {
    logged: true,
    user: {
      id: '123',
      name: 'Daniel'
    },
  };

  test( 'Debe de mostrar el componente de Marvel', () => {

    render(
      <AuthContext.Provider value={ contextValue }>
        <MemoryRouter initialEntries={ [ '/marvel' ] }>
          <HeroesRoutes />
        </MemoryRouter>
      </AuthContext.Provider>
    );

    expect( screen.getAllByText( 'Marvel' ).length ).toBeGreaterThanOrEqual( 1 );
  } );

  test( 'Debe de mostrar el componente de DC', () => {

    render(
      <AuthContext.Provider value={ contextValue }>
        <MemoryRouter initialEntries={ [ '/dc' ] }>
          <HeroesRoutes />
        </MemoryRouter>
      </AuthContext.Provider>
    );

    expect( screen.getAllByText( 'DC Comics' ).length ).toBeGreaterThanOrEqual( 1 );
  } );
} );