import "@bbforge/design-system/styles.css";
import { NextAuthProvider } from "@bbforge/auth";
import { Header } from "./header";
import { Footer } from "./footer";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <link rel="icon" href="/favicon.ico" sizes="any" />
      <title>Battlebit Forge</title>
      <meta name="robots" content="all" />
      <meta name="google" content="notranslate" key="notranslate" />
      <meta
        name="description"
        content="Forge and showcase your preferred loadouts for others to view and vote on. Effortlessly access analytics on top-performing weapons, attachments, and more."
      />
      <meta
        name="keywords"
        content="Battlebit, Battlebit Remastered, Loadouts, Share, Best Loadouts"
      />
      <meta name="author" content="Donny Roufs" />
      <NextAuthProvider>
        <body className="text-slate-300 min-h-[100vh] flex">
          <div className="container mx-auto px-8 md:px-4 flex flex-col">
            <Header />
            <div className="mb-14">{children}</div>
            <Footer />
          </div>
        </body>
      </NextAuthProvider>
    </html>
  );
}
