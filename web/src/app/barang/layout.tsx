import React from 'react'
import styles from "./barang.module.css"
import Image from 'next/image'
export default function BarangLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (

        <div>
            {/* <div>Barang</div> */}
            {/* <header className={styles.header}>
                <Image src={"/images/SANGJUARA.png"} alt="Logo UTI" width={320} height={60} priority />
            </header> */}
            <div>{children}</div>
            {/* <footer className={styles.footer}>
                &copy; 2025 - IF 23 FX
            </footer> */}
        </div>
    )
}
