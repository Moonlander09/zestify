import { Josefin_Sans } from "next/font/google";
import "./globals.css";
import { RecipeProvider } from "./_components/FoodContext";



const josefin = Josefin_Sans({
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "Zestify - Fast Food Website",
  description: "Zestify - Your ultimate fast food recipe search app! Discover quick, delicious, and easy-to-make fast food recipes from around the world. Find your next favorite meal today!",
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={josefin.className}>
       <RecipeProvider>{children}</RecipeProvider>
      </body>
    </html>
  );
}
