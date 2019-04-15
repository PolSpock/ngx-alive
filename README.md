
# NgxAlive

## Usage
This library add visual Component using Angular Material in your Angular Project.

He checks the web services provided in params and display colors to inform if the services are alive or not.
(Currently in french only)

This library was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.1.10.

## Example
Add this line to your component to implement this component :

    <lib-ngx-alive [urlsParams]="[{url: 'https://www.google.com/', libelle: 'google', description:'the main service', priority: 3 }, {url: 'https://jsonplaceholder.typicode.com/todos/1', libelle: 'APITester', description: 'tester', priority: 1}]" [supportMail]="'dofus@dofus.com'" [checkInterval]="1"></lib-ngx-alive>

## Params
1. [urlsParams] = Array of URLs to check (default ''). Must be an array and can implement properties per object :

		url - the http url
		libelle - the short name for human reading
		description - short description of the service
		priority - number, low to hight priority

	Example :

	    { url: 'https://www.google.com/', libelle: 'google', description:'the main service', priority: 3 }

2. [supportMail] = String of email to contact in case of problem (default '')
3. [checkInterval] = Number (in minute) between each check from urls params (default 5)

## Peer Dependencies
"@angular/common": "^6.1.10",
"@angular/core": "^6.1.10",
"@angular/material": "^6.4.7"

## Running unit tests
Run `ng test ngxAlive` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Further help
To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
