import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { HeroPage } from '../../../src/heroes/pages/HeroPage';

const heroId = 'marvel-thor';
const mockedUseNavigate = jest.fn();
const mockGetHeroById = jest.fn();

jest.mock( 'react-router-dom', () => ( {
  ...jest.requireActual( 'react-router-dom' ),
  useNavigate: () => mockedUseNavigate,
  useParams: () => ( { id: heroId } )
} ) );



describe( 'Pruebas en <HeroPage/>', () => {

  beforeEach( () => jest.clearAllMocks() );

  test( 'should first', () => {

    mockGetHeroById.mockReturnValue( null );

    render(
      <MemoryRouter initialEntries={ [ `/hero/${ heroId }` ] }>
        <HeroPage />
      </MemoryRouter>
    );

    screen.debug();

  } );

  // test( 'Debe mostrar la página con la información del heroe', () => {

  //   render(
  //     <MemoryRouter initialEntries={ [ `/hero/${ heroId }` ] }>
  //       <HeroPage />
  //     </MemoryRouter>
  //   );

  //   const heroTitle = screen.getByRole( 'heading', { level: 3 } );
  //   expect( heroTitle.innerHTML ).toBe( 'Thor' );

  // } );

  // test( 'Debe navegar a la página anterior al hacer click en el botón de regresar', () => {

  //   render(
  //     <MemoryRouter initialEntries={ [ `/hero/${ heroId }` ] }>
  //       <HeroPage />
  //     </MemoryRouter>
  //   );

  //   const button = screen.getByRole( 'button', { name: 'Regresar' } );
  //   fireEvent.click( button );

  //   expect( mockedUseNavigate ).toHaveBeenCalledWith( -1 );
  // } );

} );