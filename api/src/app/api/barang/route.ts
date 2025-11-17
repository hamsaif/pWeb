// import { PrismaClient } from "@prisma/client";
import { PrismaClient } from "@/generated/prisma";
import { NextRequest, NextResponse } from "next/server";

// buat variabel prisma (prisma client)
const prisma = new PrismaClient()

export const GET = async () => {
    // return new Response(JSON.stringify(
    //     { message: "Test" 


    //     }
    // 

    // });


    // buat variabel untuk menampilkan data barang
    const barang = await prisma.tb_barang.findMany({

        orderBy: {
            id: "asc"
        },
        //         where: {
        //     kode: "B02"
        // }

    });
    // tampilkan hasil data barang
    return NextResponse.json({
        barang: barang
    })
}

// buat service post
export const POST = async (request: NextRequest) => {
    // deklarasi data
    const data = await request.json();
    // cek apakah data sudah ada apa belum
    const check = await prisma.tb_barang.findFirst({
        where: {
            kode: data.kode
        },
        select: {
            kode: true
        }
    })

    // jika data ditemukan
    if (check) {
        return NextResponse.json({
            message: "Data barang gagal disimpan, kode barang sudah ada",
            succes: false
        })
    }
    // // jika data tidak dietemukan
    // else {
    //     // simpan data
    //     await prisma.tb_barang.create({
    //         data: {
    //             kode: data.kode,
    //             nama: data.nama,
    //             harga: data.harga,
    //             satuan: data.satuan
    //         }
    //     })
    //     return NextResponse.json({
    //         message: "Data berhasil disimpan",
    //         succes: true
    //     })
    // }

    // simpan data
    await prisma.tb_barang.create({
        data: {
            kode: data.kode,
            nama: data.nama,
            harga: data.harga,
            satuan: data.satuan
        }
    })
    return NextResponse.json({
        message: "Data berhasil disimpan",
        succes: true
    })

}