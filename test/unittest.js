'use strict';

const expect = require( 'chai' ).expect;
const { Writable } = require( 'stream' );

const $as_test = require( 'futoin-asyncsteps/testcase' );
const AdvancedCCM = require( 'futoin-invoker/AdvancedCCM' );
const Executor = require( 'futoin-executor/Executor' );
const SpecTools = require( 'futoin-invoker/SpecTools' );

require( 'futoin-invoker/lib/JSONCoder' ).register();

const {
    ConsoleFace,
    initFace,
} = require( '../lib/main' );

SpecTools.on( 'error', ( ...args ) => console.log( args ) );

class MockWritable extends Writable {
    _write( chunk, enc, next ) {
        this.last_chunk = ( this.last_chunk || '' ) + chunk.toString();
        next();
    }
}

// NOTE: required this way for Webpack
const { Console } = require( 'console' );

const create_console = ( stdout, stderr ) => {
    if ( Console ) {
        return new Console( stdout, stderr );
    }

    return {
        log: ( m ) => {
            stdout._write( `${m}\n`, 'utf8', () => {} );
        },
    };
};

describe( 'ConsoleFace', function() {
    const levels = [
        'debug',
        'info',
        'warn',
        'error',
        'security',
    ];

    it( 'should register', $as_test( ( asi ) => {
        const ccm = new AdvancedCCM();
        initFace( asi, ccm );
        asi.add( asi => {
            if ( Console ) {
                expect( ccm.log()._console ).instanceOf( Console );
            }
        } );
    } ) );

    it( 'should log correctly without time', $as_test( ( asi ) => {
        const ccm = new AdvancedCCM();
        const out = new MockWritable();
        ConsoleFace.register( asi, ccm, {
            console: create_console( out, out ),
            logLevel: 'debug',
        } );

        asi.forEach( levels, ( asi, _, lvl ) => {
            out.last_chunk = '';
            ccm.log()[lvl]( 'test 123' );
            expect( out.last_chunk ).equal( `${lvl}: test 123\n` );
        } );
    } ) );

    it( 'should log correctly with time', $as_test( ( asi ) => {
        const ccm = new AdvancedCCM();
        const out = new MockWritable();
        const ts = '2019-11-07T02:25:40.113Z';

        class MockConsoleFace extends ConsoleFace {
            _ts() {
                return ts;
            }
        }

        MockConsoleFace.register( asi, ccm, {
            console: create_console( out, out ),
            logTime: true,
            logLevel: 'debug',
        } );

        asi.forEach( levels, ( asi, _, lvl ) => {
            out.last_chunk = '';
            ccm.log()[lvl]( 'test 123' );
            expect( out.last_chunk ).equal( `${ts} ${lvl}: test 123\n` );
        } );
    } ) );

    it( 'should hexdump correctly without time', $as_test( ( asi ) => {
        const ccm = new AdvancedCCM();
        const out = new MockWritable();
        const hd = '|0123456789abcdef|\n|0123456789abcdef|\n|0123456789abcdef|\n|0123456789abcdef|\n|0123456789abcdef|\n|dead|';
        ConsoleFace.register( asi, ccm, {
            console: create_console( out, out ),
            logLevel: 'debug',
        } );

        asi.forEach( levels, ( asi, _, lvl ) => {
            out.last_chunk = '';
            ccm.log().hexdump( lvl, 'test 123', Buffer.from( hd.replace( /[\n|]/g, '' ), 'hex' ) );
            expect( out.last_chunk ).equal( `${lvl}: test 123 HEX:\n${hd}\n` );
        } );
    } ) );

    it( 'should hexdump correctly with time', $as_test( ( asi ) => {
        const ccm = new AdvancedCCM();
        const out = new MockWritable();
        const ts = '2019-11-07T02:25:40.113Z';
        const hd = '|0123456789abcdef|\n|0123456789abcdef|\n|0123456789abcdef|\n|0123456789abcdef|\n|0123456789abcdef|\n|dead|';

        class MockConsoleFace extends ConsoleFace {
            _ts() {
                return ts;
            }
        }

        MockConsoleFace.register( asi, ccm, {
            console: create_console( out, out ),
            logLevel: 'debug',
            logTime: true,
        } );

        asi.forEach( levels, ( asi, _, lvl ) => {
            out.last_chunk = '';
            ccm.log().hexdump( lvl, 'test 123', Buffer.from( hd.replace( /[\n|]/g, '' ), 'hex' ) );
            expect( out.last_chunk ).equal( `${ts} ${lvl}: test 123 HEX:\n${hd}\n` );
        } );
    } ) );

    it( 'should handle logLevel', $as_test( ( asi ) => {
        const ccm = new AdvancedCCM();
        const out = new MockWritable();
        initFace( asi, ccm, {
            console: create_console( out, out ),
        } );

        asi.forEach( levels, ( asi, i, lvl ) => {
            out.last_chunk = '';
            ccm.log()[lvl]( 'test 123' );
            ccm.log().hexdump( lvl, 'test 123', 'abc', 'hex' );
            expect( out.last_chunk ).equal( i > 0 ? `${lvl}: test 123\n${lvl}: test 123 HEX:\n|616263|\n` : '' );
        } );
    } ) );
} );


