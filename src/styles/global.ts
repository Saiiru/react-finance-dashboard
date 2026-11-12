import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    :root {
      
        --blue: #5429CC;
        --blue-light: #6933ff;
        --green: #33CC95;
        --red:  #E62E4D;
       
        --text-title: #363F5F;
        --text-body: #969CB3;

        --background: #f0f2f5;
        --shape: #FFFFFF;
    }


    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    html {
        @media (max-width: 1080px) {
            font-size: 93.75%; //15px
        }
        @media (max-width: 720px) {
            font-size: 87.5%; //14
        }
    }

    body {
        background: var(--background);
        -webkit-font-smoothing: antialiased; 
    }

    body, input, textarea button {
        font-family: 'Poppins', 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
        font-weight: 400;

    }
    h1,h2,h3,h4,h5,h6,strong{
        font-family: 'Poppins', 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
        font-weight: 600;
    }

    button {
        cursor: pointer;
    }

    [disabled] {
        opacity: 0.6;
        cursor: not-allowed;
    }
    .react-modal-overlay {
        background: rgba(0,0,0,0.5);

        position: fixed;
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;

        display: flex;
        align-items: center;
        justify-content: center;
    }

    .react-modal-content {
        width: 100%;
        max-width: 576px;

        background: var(--background);
        position: relative;
        padding: 3rem;
        border-radius: 0.24rem;
    }

    .react-modal-close {
        position: absolute;
        right: 1.5rem;
        top: 1.5rem;
        border: 0;
        background: transparent;

        transition: filter 0.2s;

        &:hover {
            filter: brightness(0.7)
        }
    }

    .demo-notice { margin:12px auto; max-width:1120px; padding:10px 18px; font-size:.82rem; color:#363f5f; background:#dce7f2; border-left:4px solid #5429cc; line-height:1.55; }
`

