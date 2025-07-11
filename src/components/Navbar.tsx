
import Image from "next/image";
import Link from "next/link";
import NavItems from "./NavItems";
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";


const Navbar = () => {
  return (
    <nav className="navbar">
      <Link href="/" >
        <div className="flex items-center gap-2.5 cursor-pointer">
          <Image src="/images/logo.svg" alt="logo" height={44} width={46} />
        </div>
      </Link>
      <div className="flex items-center gap-8">
        <NavItems />
        <header>
            <SignedOut>
              
                <SignInButton >
                  <button className="btn-signin">Sign In</button>
                </SignInButton>
              
              
            </SignedOut>
            <SignedIn>
              <UserButton/>
            </SignedIn>
          </header>
      </div>
    </nav>
  );
};

export default Navbar;
