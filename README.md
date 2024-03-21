# flyapi

![GitHub](https://img.shields.io/github/license/steelWinds/flyapi)
![GitHub package.json version](https://img.shields.io/github/package-json/v/steelWinds/flyapi)
![npm bundle size](https://img.shields.io/bundlephobia/minzip/%40steelwindshellahillz%2Fflyapi)
![Codecov](https://img.shields.io/codecov/c/github/steelWinds/flyapi)

</br>

<div align="center">
  <a href=>
		<img width="300" height="230" src="./public/logo.svg">
	</a>
</div>

# About The Project

### Built with
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![NPM](https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white)
![RollupJS](https://img.shields.io/badge/RollupJS-ef3335?style=for-the-badge&logo=rollup.js&logoColor=white)

## Getting Started

### Installation
1. Clone the repo
   ```bash
   git clone https://github.com/steelWinds/identavatar
   ```
2. Install modules
   ```bash
   go mod tidy
   ```
3. Build docker image and run it
   ```bash
   make build
   ```
3. Or run docker-compose with Air
   ```bash
   make up
   ```
### Usage

#### Query params:
- ```squares: Int (required)``` - amount of squares
- ```size: Int (required)``` - size of square 
- ```word: String (required)``` - your word 

#### Example
```bash
http://localhost:3180/?squares=6&size=30&word=mycoolword
```
## License

Distributed under the MPL v2 License. See LICENSE.txt for more information.

## Contact

[@steelWinds](https://github.com/steelWinds) | kirillsurov0@gmail.com | [t.me/bladeVrtx](https://t.me/bladeVrtx)
