import Document, {Html, Head, Main, NextScript} from 'next/document'

export default class MyDocument extends Document {
    render(){
        return(
            <Html>
                <Head>
                    <title>ignews</title>
                </Head>
                    <link rel="preconnect" href="https://fonts.googleapis.com"/>
                    <link rel="shortcut icon" href="favicon.png" type="images/png" />
                    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700;900&display=swap" rel="stylesheet"/>
                <body>
                    <Main/>
                    <NextScript/>
                </body>
            </Html>
        )
    }
}