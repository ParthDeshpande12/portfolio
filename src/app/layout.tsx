import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { GSAPProvider } from "@/lib/gsap-context";
import GlassmorphTopBar from "@/components/GlassmorphTopBar";
import MotionProvider from "@/components/MotionProvider";
import { LoaderProvider } from "@/context/LoaderContext";
import GlobalTopMenu from "@/components/GlobalTopMenu";

const inter = Inter({
    variable: "--font-inter",
    subsets: ["latin"],
    display: "swap",
    axes: ["opsz"],
});

export const metadata: Metadata = {
    title: "Modern Design Tool Landing Page",
    description: "Created with the help of Frontend Tribe",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${inter.variable} font-sans antialiased bg-neutral-950 text-white min-h-fit h-fit`}
            >
                <GSAPProvider>
                  <LoaderProvider>
                    <GlobalTopMenu />
                    <GlassmorphTopBar />
                    <MotionProvider>
                      {children}
                    </MotionProvider>
                  </LoaderProvider>
                </GSAPProvider>
            </body>
        </html>
    );
}
