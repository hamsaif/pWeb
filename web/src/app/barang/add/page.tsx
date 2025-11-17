"use client"
import { Check, CheckIcon, ChevronsUpDown, ChevronsUpDownIcon } from "lucide-react"
 
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import React, { useState } from 'react'
import styles from '../barang.module.css';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

// buat data satuan
const satuan = [
  {
    value: "Unit",
    label: "Unit",
  },
  {
    value: "Pcs",
    label: "Pcs",
  },
  {
    value: "Kg",
    label: "Kilogram (Kg)",
  }
]

export default function AddBarangPage() {
  // buat state untuk combobox satuan
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState("")
  return (
    <section className={styles.page}>
      <title>Tambah Data Barang</title>
      {/* buat artikel */}
      <article className='grid sm:grid-cols-2 grid-cols-1 gap-4'>
        {/* area kode */}
        <section>
          <Label htmlFor="txt_kode" className={styles.label}>Kode Barang</Label>
          <Input type="text" id="txt_kode" placeholder="Kode Barang" maxLength={10} />
        </section>
        {/* area nama */}
        <section>
          <Label htmlFor="txt_nama" className={styles.label}>Nama Barang</Label>
          <Input type="text" id="txt_nama" placeholder="Nama Barang" maxLength={50} />
        </section>
        {/* area harga */}
        <section>
          <Label htmlFor="txt_harga" className={styles.label}>Harga Barang</Label>
          <Input type="text" id="txt_harga" placeholder="Harga Barang" maxLength={11} />
        </section>
        {/* area satuan */}
        <section>
          <Label htmlFor="cbo_satuan" className={styles.label}>Satuan Barang</Label>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="w-full justify-between"
              >
                {value
                  ? satuan.find((framework) => framework.value === value)?.label
                  : "Select framework..."}
                <ChevronsUpDown className="opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0">
              <Command>
                <CommandInput placeholder="Search framework..." className="h-9" />
                <CommandList>
                  <CommandEmpty>No framework found.</CommandEmpty>
                  <CommandGroup>
                    {satuan.map((framework) => (
                      <CommandItem
                        key={framework.value}
                        value={framework.value}
                        onSelect={(currentValue) => {
                          setValue(currentValue === value ? "" : currentValue)
                          setOpen(false)
                        }}
                      >
                        {framework.label}
                        <Check
                          className={cn(
                            "ml-auto",
                            value === framework.value ? "opacity-100" : "opacity-0"
                          )}
                        />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </section>
        {/* area tombol */}
        <section></section>
      </article>
    </section>
  )
}