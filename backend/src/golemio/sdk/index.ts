/* tslint:disable */
/* eslint-disable */
/**
 * Golemio API
 * <p><img src=\"https://storage.golemio.cz/golemiocz/images/golemioapi_logos.png\" alt=\"Logos\" /></p> <p><b>Toto je dokumentace REST API projektu pražské datové platformy Golemio.</b></p> <p>Veškeré dotazy prosím směřujte na <a href=\"mailto:golemio@operatorict.cz?subject=golemioapi\">golemio@operatorict.cz</a>.</p> <p>Dokumentace je v anglickém jazyce. Více informací o projektu naleznete na <a href=\"https://www.golemio.cz/\">www.golemio.cz</a>.</p> <H1>Description</H1> <p><b>This documentation covers the RESTful API of the Golemio Prague Data Platform project, specifically detailing the Output Gateway API.</b></p> <p>Support is accessible via <a href=\"mailto:golemio@operatorict.cz?subject=golemioapi\">golemio@operatorict.cz</a>.</p> <p>For more information about Golemio, please visit the website <a href=\"https://www.golemio.cz/\">www.golemio.cz</a>.</p> <H2>Golemio API documentation:</H2> <li>👉 Main Golemio API</li> <li><a href=\"https://api.golemio.cz/docs/public-openapi/\">Open Data Golemio API</a></li> <li><a href=\"https://api.golemio.cz/input-gateway/docs/openapi/\">Golemio Input Gateway API</a></li> <li><a href=\"https://api.golemio.cz/pid/docs/openapi/\">Public Transport Golemio API</a></li> <li><a href=\"https://api.golemio.cz/pid/input-gateway/docs/openapi/\">Public Transport Golemio Input Gateway API</a></li> <H1>General info</H1> <H2>Authorization</H2> <p>Generate your token at <a href=\"https://api.golemio.cz/api-keys\">api.golemio.cz/api-keys</a>.</p> <p><b>Use the token as the value of the X-Access-Token header.</b></p> <H1>Usage</H1> <H2>Pagination</H2> <p>The API returns a maximum of 10,000 objects/rows per request. You can specify a lower number by adding the <code>?limit</code> URL parameter.</p> <p>     This limit may vary depending on the specific route; please refer to the description of parameters for each route. To retrieve more data, use multiple requests with the <code>?limit&offset</code> parameters.     Refer to the examples below. </p> <H2>Requests rate</H2> <p>By default, each API key has a rate limit of 20 requests per 8 seconds.</p> <H2>Compression</H2> <p>By default, the Content-Encoding header is set to gzip (if requested). If the raw response is less than 1 KB, the data is returned uncompressed, and the Content-Encoding header is not set.</p> <H2>Open Data</H2> <p><img src=\"https://img.shields.io/badge/opendata-available-green\" alt=\"golemioapi-opendata-badge\" /></p> <p>This badge indicates that the data is available for public use as Open Data.</p>
 *
 * The version of the OpenAPI document: 1.0.0
 * Contact: golemio@operatorict.cz
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

export * from "./api";
export * from "./configuration";

