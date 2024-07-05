import { fireEvent, render, screen } from '@testing-library/react';
import { SearchPage } from '../../../src/heroes/pages/SearchPage';
import { MemoryRouter } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const mockedUseNavigate = jest.fn();

jest.mock( 'react-router-dom', () => ( {
  ...jest.requireActual( 'react-router-dom' ),
  useNavigate: () => mockedUseNavigate,
} ) );


describe( 'Pruebas en <SearchPage/>', () => {

  beforeEach( () => jest.clearAllMocks() );

  test( 'Debe mostrarse correctamente con valores por defecto', () => {

    const { container } = render(
      <MemoryRouter>
        <SearchPage />
      </MemoryRouter>
    );

    expect( container ).toMatchSnapshot();
  } );

  test( 'Debe de mostrar a Batman y el input con el valor del queryString', () => {

    render(
      <MemoryRouter initialEntries={ [ '/search?q=batman' ] }>
        <SearchPage />
      </MemoryRouter>
    );

    const input = screen.getByRole( 'textbox' );
    const img = screen.getByRole( 'img' );
    const alertPrimary = screen.getByLabelText( 'alert-primary' );

    expect( input.value ).toBe( 'batman' );
    expect( img.src ).toContain( '/assets/heroes/dc-batman.jpg' );
    expect( alertPrimary.style.display ).toBe( 'none' );
  } );

  test( 'Debe de mostrar un error si no se encuentra el hero (batman123)', () => {

    render(
      <MemoryRouter initialEntries={ [ '/search?q=batman123' ] }>
        <SearchPage />
      </MemoryRouter>
    );

    const alertDanger = screen.getByLabelText( 'alert-danger' );

    expect( alertDanger.style.display ).toBe( '' );
    expect( alertDanger.innerHTML ).toContain( 'No hero with <b>batman123</b>' );
  } );

  test( 'Debe de llamar el navigate a la pantalla nueva', () => {

    render(
      <MemoryRouter initialEntries={ [ '/search' ] }>
        <SearchPage />
      </MemoryRouter>
    );

    const input = screen.getByRole( 'textbox' );
    fireEvent.change( input, { target: { value: 'Superman' } } );

    const form = screen.getByLabelText( 'form' );
    fireEvent.submit( form );

    expect( mockedUseNavigate ).toHaveBeenCalledWith( "?q=Superman" );
  } );

} );