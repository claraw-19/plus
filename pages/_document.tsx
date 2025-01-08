import Document from "next/document";
import { ServerStyleSheet as SCServerStyleSheet } from "styled-components";
import { ServerStyleSheets as MUIServerStyleSheets } from "@mui/styles";

export default class SchulLVDocument extends Document {
  static async getInitialProps(ctx: any) {
    const muiSheets = new MUIServerStyleSheets();
    const scSheet = new SCServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App: React.ComponentType<any>) => (props: any) => {
            return scSheet.collectStyles(muiSheets.collect(<App {...props} />));
          },
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {muiSheets.getStyleElement()}
            {scSheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      scSheet.seal();
    }
  }
}
