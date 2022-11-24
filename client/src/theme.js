import { extendTheme } from '@chakra-ui/react';
import "@fontsource/roboto"


export const naturali_theme = extendTheme({
    colors: {
        logo: {
            orange: '#E47424'
            },
        web:{
            bg: '#010409',
            navBar: '#161B22',
            sideBar: '#0D1117',
            border: '#30363D',
            text: '#F0F6FC',
            text2: '#8B949E',
            error: "#F56565",
        }
    },
    fonts: {
        //body: `"Roboto", sans-serif`
    }
})