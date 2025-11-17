import { PrismaClient } from "@/generated/prisma";
import { NextRequest, NextResponse } from "next/server";

// buat variabel prisma
const prisma = new PrismaClient()

// buat service delete
export const DELETE = async (request: NextRequest,
    { params }: { params: { slug: string } }) => {
    const id = params.slug

    // cek apakah data sudah ada apa belum
    const check = await prisma.tb_barang.findUnique({
        where: {
            id: Number(id)
        },
        select: {
            id: true
        }
    })

    // jika data tidak ditemukan
    if (!check) {
        return NextResponse.json({
            message: "Data barang gagal dihapus, kode barang tidak ditemukan",
            success: false
        })
    }
    // jika data ditemukan
    await prisma.tb_barang.delete({
        where: {
            id: Number(id)
        }
    })
    return NextResponse.json({
        message: "Data berhasil dihapus",
        success: true
    })

}

// buat service PUT (ubah data)
export const PUT = async (request: NextRequest,
    { params }: { params: { slug: string } }) => {
    const id = params.slug

    // deklarasi data
    const data = await request.json();
    // cek apakah data sudah ada apa belum

    const check = await prisma.tb_barang.findFirst({
        where: {
            id: {
                not: Number(id)
            },
            kode: data.kode
        },
        select: {
            id: true
        }
    })

    // jika data ditemukan
    if (check) {
        return NextResponse.json({
            message: "Data barang gagal diubah, kode barang tidak ditemukan",
            succes: false
        })
    }

    // // cek apakah kode barang sudah ada apa belum
    // const checkKode = await prisma.tb_barang.findFirst({
    //     where: {
    //         kode: data.kode
    //     },
    //     select: {
    //         id: true
    //     }
    // })
    // // jika kode barang sudah ada
    // if (checkKode) {
    //     return NextResponse.json({
    //         message: "Data barang gagal diubah, kode barang sudah ada",
    //         succes: false
    //     })
    // }
    // // jika kode ditemukan
    // if (checkKode) {
    //     return NextResponse.json({
    //         message: "Data barang gagal diubah, kode barang tidak ditemukan",
    //         succes: false
    //     })
    // }
    // // jika kode tidak di temukan


    // // jika tidak data ditemukan
    await prisma.tb_barang.update({
        where: {
            id: Number(id)
        },
        data: {
            kode: data.kode,
            nama: data.nama,
            harga: data.harga,
            satuan: data.satuan
        },
    })
    return NextResponse.json({
        message: "Data berhasil diubah",
        succes: true
    })


}