import {component$, useStyles$} from '@builder.io/qwik';
import {QwikCityProvider, RouterOutlet, ServiceWorkerRegister} from '@builder.io/qwik-city';
import {RouterHead} from './components/router-head/router-head';

import globalStyles from './global.scss?inline';
import {QwikPartytown} from "~/components/partytown/partytown";

export default component$(() => {
  /**
   * The root of a QwikCity site always start with the <QwikCityProvider> component,
   * immediately followed by the document's <head> and <body>.
   *
   * Dont remove the `<head>` and `<body>` elements.
   */
  useStyles$(globalStyles);


  return (
    <QwikCityProvider>
      <head>
        <meta charSet="utf-8" />
        <link rel="manifest" href="/manifest.json" />
        <RouterHead />
        <QwikPartytown debug={true} forward={['hljs']}/>
        <script
            async
            type="text/partytown"
            src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/highlight.min.js"
        />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/styles/default.min.css"></link>
      </head>
      <body lang="en">
        <RouterOutlet />
        <ServiceWorkerRegister />
      </body>
    </QwikCityProvider>
  );
});
