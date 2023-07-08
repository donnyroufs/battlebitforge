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
      <NextAuthProvider>
        <body className="text-slate-200">
          <div className="container mx-auto mb-8">
            <Header />
            {children}
          </div>
        </body>
      </NextAuthProvider>
    </html>
  );
}
