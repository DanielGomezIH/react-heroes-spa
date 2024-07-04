import { authReducer } from '../../../src/auth/context/authReducer';
import { types } from '../../../src/auth/types/types';

describe( 'Pruebas en la función authReducer', () => {



  test( 'Debe de retornar el estado por defecto', () => {

    const state = authReducer( { logged: false }, {} );

    expect( state ).toEqual( { logged: false } );

  } );

  test( 'Debe de (login) llamar al login, autenticar y establecer el usuario y logged en true', () => {

    const user = {
      id: '123',
      name: 'Daniel',
    };

    const action = {
      type: types.login,
      payload: user
    };

    const state = authReducer( { logged: false }, action );

    expect( state ).toEqual( { logged: true, user: action.payload } );

  } );

  test( 'Debe de (logout) borrar el name del usuario y logged en false', () => {

    const user = {
      id: '123',
      name: 'Daniel',
    };

    const state = {
      logged: true,
      user
    };

    const action = {
      type: types.logout,
    };

    const newState = authReducer( state, action );

    expect( newState ).toEqual( { logged: false } );
  } );
} );

