[![BCH compliance](https://bettercodehub.com/edge/badge/legalthings/lto-network-frontend?branch=master)](https://bettercodehub.com/)

# LTO Network Frontend
<a href="https://github.com/legalthings/lto-network-frontend/"><img src="https://lto.network/img/meta.png"></a>

## Description | Repository content

The project is a momorepo based project. 
By now there are two main projects:
1. Explorer
1. Wallet

## Requirements

Before getting started you would need:
1. `git` installed locally in your computer
1. `npm` installed locally in your computer. It can be done with this `npm install npm@latest -g`. [Check npm documentation](https://docs.npmjs.com/)
1. Make sure that you have Node 10.9 or later installed. See instructions [here](https://nodejs.org/en/download/). The Angular CLI requires Node 8, but development requires Node 10.
1. Install Angular CLI. It can be done with `npm install -g @angular/cli`. The Angular CLI is a command-line interface tool that you use to initialize, develop, scaffold, and maintain Angular applications. You can use the tool directly in a command shell, or indirectly through an interactive UI such as Angular Console. [Angular CLI reference](https://angular.io/cli#cli-command-reference)

## Installation

To get started locally, follow these instructions:
If you haven't done it already, make a fork of this [repo](https://github.com/legalthings/lto-network-frontend/fork).
1. Clone to your local computer using `git`.
1. Make sure that you have Node 10.9 or later installed. See instructions [here](https://nodejs.org/en/download/). The Angular CLI requires Node 8, but development requires Node 10.
1. Enter project main directory and install npm modules (dependecies): `npm install`.

## Getting Started - Local Development

1. If you want to run `explorer` project, you need to use `ng serve explorer`.
1. If you want to run `wallet` project, you need to use `ng serve wallet`.
1. Running `ng serve` will deploy the angular cli default for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.