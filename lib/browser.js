/**
 * @file
 *
 * Copyright 2019 FutoIn Project (https://futoin.org)
 * Copyright 2019 Andrey Galkin <andrey@futoin.org>
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

( function( window ) {
    'use strict';

    var futoin = window.FutoIn || window.futoin || {};

    if ( typeof futoin.Log === 'undefined' ) {
        var log_module = require( './main' );

        /**
         * **window.FutoInLog** - Browser-only reference to futoin-log
         * @global
         * @alias window.FutoInLog
         */
        window.FutoInLog = log_module;

        /**
         * **window.futoin.Log** - Browser-only reference to futoin-log
         * @global
         * @alias window.FutoIn.Log
         */
        futoin.Log = log_module;
        window.FutoIn = futoin;
        window.futoin = futoin;
    }

    if ( typeof module !== 'undefined' ) {
        module.exports = futoin.FutoInLog;
    }
} )( window );
