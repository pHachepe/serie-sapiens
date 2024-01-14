# Serie Sapiens

Este proyecto es una aplicación desarrollada utilizando el framework Ionic. Está diseñado para proporcionar una experiencia de usuario fluida en plataformas móviles.

## Comenzando

Instala Node.js y npm en tu sistema.


Instala Angular CLI de forma global en tu sistema.

```
npm install -g @angular/cli
```

Instala Ionic CLI de forma global en tu sistema.

```
npm install -g @ionic/cli
```

Para comenzar a trabajar con este proyecto, clona el repositorio y ejecuta `npm install` para instalar las dependencias.

```
git clone https://github.com/pHachepe/serie-sapiens.git
cd serie-sapiens
npm install
```

## Desarrollo
Una vez descargado el proyecto, es necesario crear un archivo environment con las siguientes variables:
- `production`: Indica si el proyecto está en producción o no.
- `apiKey`: API Key de The Movie DB.
- `movieDBUrl`: URL base de la API de The Movie DB.
- `chatGPTUrl`: URL base de la API de Chat GPT.
- `imagesUrl`: URL base de las imágenes de The Movie DB.

Para iniciar el servidor de desarrollo, ejecuta:

```
ionic serve
```

## Construcción y Despliegue

Para construir el proyecto para producción en Android, ejecuta:

```
ionic capacitor build Android --prod
```

Para construir el proyecto para producción en iOS, ejecuta:

```
ionic capacitor build iOS --prod
```

## Generación de Iconos y Splash Screens
Para generar los iconos y splash screens de la aplicación, ejecuta:

```
npx capacitor-assets generate
npx cap sync
```

## Licencia

Este proyecto está licenciado bajo la Licencia MIT. Para más información, consulta el archivo [LICENSE](LICENSE) en este repositorio.

## Créditos y Reconocimientos

Este proyecto utiliza los siguientes recursos y bibliotecas de terceros:
- **TypeScript**: Un lenguaje de programación de código abierto desarrollado y mantenido por Microsoft. [Más información](https://www.typescriptlang.org/). Licencia Apache-2.0.
- **Angular**: Un framework para construir aplicaciones web y móviles en HTML, CSS y JavaScript/TypeScript. [Más información](https://angular.io/). Licencia MIT.
- **Capacitor**: Una plataforma de aplicaciones web nativas moderna. [Más información](https://capacitorjs.com/). Licencia MIT.
- **Ionic**: Un framework de UI para aplicaciones móviles y de escritorio. [Más información](https://ionicframework.com/). Licencia MIT.
- **RxJS**: Una biblioteca para programación reactiva usando Observables. [Más información](https://rxjs.dev/). Licencia Apache-2.0.
- **Swiper**: Un slider de toque moderno. [Más información](https://swiperjs.com/). Licencia MIT.
- **Tailwind CSS**: Un framework de CSS para un diseño rápido y receptivo. [Más información](https://tailwindcss.com/). Licencia MIT.
- **ESLint**: Un linter de código estático para identificar y reportar patrones en JavaScript. [Más información](https://eslint.org/). Licencia MIT.

Por favor, consulta sus respectivos sitios web o repositorios para obtener detalles más específicos sobre sus licencias y términos de uso.
