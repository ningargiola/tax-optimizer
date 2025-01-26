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
       <h1 className="title">TAX<span style={{ fontWeight: "bold", fontStyle: "italic" }}>AI</span>MIZER</h1>


       {/* Right-Side Placeholder */}
       <div className="placeholder"></div>
     </header>
   </>
 );
}