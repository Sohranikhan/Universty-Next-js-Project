import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer/Footer";
import Provider from "../context/SessionProvider"
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "MIR CHAKAR KHAN RIND UNIVERSTY OF TECHNOLOGY Dera Ghazi Khan",
  description: "A Government Public Univerty of Punjab",
};

export default async function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className} >
        <Provider>
        <Navbar />
              <div className="w-full max-w-6xl mx-auto h-auto min-h-[40rem] pt-12 md:pt-24">
                {children}
              </div>
        <Footer />
        </Provider>
      </body>
    </html>
  );
}
