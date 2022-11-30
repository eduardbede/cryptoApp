import './Footer.css'
export default function Footer(){
    const date = new Date();
    let year = date.getFullYear();
    const an = year + " @eduardbede ";
    return(
            <footer className="footer font-poppins flex justify-center gap-2">
                <div>{an}</div>
                <a href="https://github.com/eduardbede" target="_blank"  rel="noreferrer" className="underline">Visit GitHub</a>
              </footer>
    )
}