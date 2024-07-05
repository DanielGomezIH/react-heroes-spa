import { getHeroById } from '../../../src/heroes/helpers';

describe( 'Pruebas en la función getHeroesById', () => {

  test( 'Debe retornar un heroe si el Id coincide', () => {

    const heroId = 'dc-superman';

    const hero = getHeroById( heroId );

    expect( hero ).toEqual( {
      id: 'dc-superman',
      superhero: 'Superman',
      publisher: 'DC Comics',
      alter_ego: 'Kal-El',
      first_appearance: 'Action Comics #1',
      characters: 'Kal-El'
    } );
  } );

} );