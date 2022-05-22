/* eslint-disable @next/next/inline-script-id */
import Document, { Html, Head, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          {/* code that you want to add to the header */}
        </Head>
        <body>
          <Main />
          <NextScript />
          {/* <!-- Messenger Chat Plugin Code --> */}
          <div id="fb-root"></div>

          {/* <!-- Your Chat Plugin code --> */}
          <div id="fb-customer-chat" className="fb-customerchat"></div>

          <script dangerouslySetInnerHTML={{
            __html: `
				var chatbox = document.getElementById('fb-customer-chat');
				chatbox.setAttribute("page_id", "104657677549573");
				chatbox.setAttribute("attribution", "biz_inbox");	
				`
          }} />

          {/* <!-- Your SDK code --> */}
          <script dangerouslySetInnerHTML={{
            __html: `
			window.fbAsyncInit = function() {
        FB.init({
          xfbml            : true,
          version          : 'v13.0'
        });
      };

      (function(d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s); js.id = id;
        js.src = 'https://connect.facebook.net/en_US/sdk/xfbml.customerchat.js';
        fjs.parentNode.insertBefore(js, fjs);
      }(document, 'script', 'facebook-jssdk'));
			`
          }} />
        </body>
      </Html>
    );
  }
}