
import { extendTheme } from "@chakra-ui/react";
import { StepsTheme as Steps } from "chakra-ui-steps";
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
        },
        gray: {
            gray1: '#4A5568',
        }
    },
    fonts: {
        //body: `"Roboto", sans-serif`
    },
    components: {
        Steps,
        // Input: {
        //     baseStyle: {
        //       field: {
        //         _autofill: {
        //           boxShadow: '0 0 0px 1000px #0D1117 inset',
        //           transition: 'background-color 5000s ease-in-out 0s',
        //           color: 'white'
        //         },
        //         _focus: {
        //             backgroundColor: 'transparent',
        //           },
        //       },
        //     },
        //   }
      },
})