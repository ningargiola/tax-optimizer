import Logo from "./logo";


export default function Header() {
 return (
   <>
     {/* Top Header Section */}
     <header>
       {/* LPL Financial Logo */}
       <div className="logo">
         <Logo />
       </div>


       {/* TAXAIMIZER Centered Text */}
       <h1 className="title">TAXAIMIZER</h1>


       {/* Right-Side Placeholder */}
       <div className="placeholder"></div>
     </header>
   </>
 );
}