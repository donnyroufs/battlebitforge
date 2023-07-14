import "@bbforge/design-system/styles.css";
import { NextAuthProvider } from "@bbforge/auth";
import { Header } from "./header";

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
        <body className="text-slate-300">
          <div className="container mx-auto mb-8 px-8 md:px-4">
            <Header />
            {children}
          </div>
        </body>
      </NextAuthProvider>
    </html>
  );
}
