'use strict';

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

const ConsoleFace = require( '../ConsoleFace' );

/**
 * Initial client
 * @param {AsyncSteps} asi - async steps interface
 * @param {SimpleCCM} ccm - CCM interface
 * @param {object} [options] - options
 * @param {string} [options.logType] - type of logger
 */
const initFace = ( asi, ccm, options = {} ) => {
    let Impl = ConsoleFace;

    switch ( options.logType ) {
    case 'console':
    default:
            // use the default
    }

    Impl.register( asi, ccm, options );
};

exports = module.exports = {
    ConsoleFace,
    initFace,
};

Object.freeze( exports );

