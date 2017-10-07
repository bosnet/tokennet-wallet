"use strict";

module.exports = require( "./index" );
module.exports.axios = require( "axios" );
module.exports.bluebird = require( "bluebird" );
module.exports.StellarBase = require( "libs/stellar-base" );

/*globals _*/
_.noConflict();
