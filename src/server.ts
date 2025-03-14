import { CommonEngine, } from '@angular/ssr/node';
import { render } from '@netlify/angular-runtime/common-engine'


const commonEngine = new CommonEngine();

export async function netlifyCommonEngineHandler(request: Request, context: any): Promise<Response> {
  try {    
    return await render(commonEngine)
  } catch (error) {
    console.log('Error en netlifyCommonEngineHandler')
  }
  return new Promise<Response>(res=>res);
}
/**
 * Example Express Rest API endpoints can be defined here.
 * Uncomment and define endpoints as necessary.
 *
 * Example:
 * ```ts
 * app.get('/api/**', (req, res) => {
 *   // Handle API request
 * });
 * ```
 */

/**
 * Serve static files from /browser
 */
// app.get(
//   '**',
//   express.static(browserDistFolder, {
//     maxAge: '1y',
//     index: 'index.html'
//   }),
// );

// /**
//  * Handle all other requests by rendering the Angular application.
//  */
// app.get('**', (req, res, next) => {
//   const { protocol, originalUrl, baseUrl, headers } = req;

//   commonEngine
//     .render({
//       bootstrap,
//       documentFilePath: indexHtml,
//       url: `${protocol}://${headers.host}${originalUrl}`,
//       publicPath: browserDistFolder,
//       providers: [{ provide: APP_BASE_HREF, useValue: baseUrl }],
//     })
//     .then((html) => res.send(html))
//     .catch((err) => next(err));
// });

// /**
//  * Start the server if this module is the main entry point.
//  * The server listens on the port defined by the `PORT` environment variable, or defaults to 4000.
//  */
// if (isMainModule(import.meta.url)) {
//   const port = process.env['PORT'] || 4000;
//   app.listen(port, () => {
//     console.log(`Node Express server listening on http://localhost:${port}`);
//   });
// }

// export default app;
