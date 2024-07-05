import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { HeroPage } from '../../../src/heroes/pages/HeroPage';
import { getHeroById } from '../../../src/heroes/helpers';

const heroId = 'marvel-thor';
const mockedUseNavigate = jest.fn();

jest.mock( '../../../src/heroes/helpers' );

jest.mock( 'react-router-dom', () => ( {
  ...jest.requireActual( 'react-router-dom' ),
  useNavigate: () => mockedUseNavigate,
  useParams: () => ( { id: heroId } ),
} ) );

describe( 'Pruebas en <HeroPage/>', () => {

  beforeEach( () => {
    jest.clearAllMocks();
  } );

  test( 'Debe mostrar la página con la información del heroe', () => {
    getHeroById.mockReturnValue( {
      id: heroId,
      superhero: 'Thor',
      publisher: 'Marvel Comics',
      alter_ego: 'Thor Odinson',
      first_appearance: 'Journey into Mystery #83',
      characters: 'Thor Odinson',
    } );

    render(
      <MemoryRouter>
        <HeroPage />
      </MemoryRouter>
    );

    const heroTitle = screen.getByRole( 'heading', { level: 3 } );
    expect( heroTitle.innerHTML ).toBe( 'Thor' );
    expect( getHeroById ).toHaveBeenCalledWith( heroId );
  } );

  test( 'Debe navegar a la página anterior al hacer click en el botón de regresar', () => {
    render(
      <MemoryRouter>
        <HeroPage />
      </MemoryRouter>
    );

    const button = screen.getByRole( 'button', { name: 'Regresar' } );
    fireEvent.click( button );

    expect( mockedUseNavigate ).toHaveBeenCalledWith( -1 );
  } );

  test( 'Debe redireccionar si no se encuentra el heroe', () => {
    getHeroById.mockReturnValue( undefined );

    render(
      <MemoryRouter>
        <HeroPage />
      </MemoryRouter>
    );

    expect( mockedUseNavigate ).not.toHaveBeenCalled();
  } );
} );
