'use strict';

/**
 * @file
 *
 * Copyright 2014-2017 FutoIn Project (https://futoin.org)
 * Copyright 2014-2017 Andrey Galkin <andrey@futoin.org>
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const { LogFace } = require( 'futoin-invoker' );

const PER_LINE = 16;

/**
 * Console-based AuditLog Native interface
 *
 * Register with ConsoleFace.register().
 *
 * NOTE: this is a lightweight console logger suitable
 * for stdout-based log collection.
 *
 * @class
 * @alias ConsoleFace
 * @augments LogFace
 */
class ConsoleFace extends LogFace {
    constructor( impl, info ) {
        super( impl, info );

        const { options } = info;
        this._console = options.console || console;
        this._timePart = options.logTime ? () => `${this._ts()} ` : () => '';
    }

    /**
    * AuditLog Native interface registration helper
    * @param {AsyncSteps} as - step interface
    * @param {AdvancedCCM} ccm - CCM instance
    * @param {object} [options={}] - registration options
    * @param {string} [options.version=1.0] - iface version
    * @alias LogFace.register
    */
    static register( as, ccm, options ) {
        options = options || {};
        const ifacever = options.version || '1.0';
        const iface = LogFace.spec( ifacever );

        options.nativeImpl = this;
        options.specDirs = [ iface ];

        ccm.register(
            as,
            ccm.SVC_LOG,
            iface.iface + ':' + iface.version,
            {},
            null,
            options
        );
    }

    /**
    * Log message
    * @param {string} lvl - debug|info|warn|error|security
    * @param {string} txt - message to log
    * @alias LogFace#msg
    */
    msg( lvl, txt ) {
        this._console.log( `${this._timePart()}${lvl}: ${txt}` );
    }

    /**
    * Log message
    * @param {string} lvl - debug|info|warn|error|security
    * @param {string} txt - message to log
    * @param {string} data - raw data
    * @alias LogFace#hexdump
    */
    hexdump( lvl, txt, data ) {
        const cnsl = this._console;
        cnsl.log( `${this._timePart()}${lvl}: ${txt} HEX:` );

        data = Buffer.from( data ).toString( 'hex' );

        for ( let i = 0, n; i < data.length; i = n ) {
            n = i + PER_LINE;
            cnsl.log( '|' + data.substring( i, n ) + '|' );
        }
    }

    _ts() {
        return new Date().toISOString();
    }
}

module.exports = ConsoleFace;
