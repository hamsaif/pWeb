export function formatRupiah(value: number) {
  return value.toLocaleString("id-ID", {
    style: "currency",
    currency: "IDR",
  });
}
