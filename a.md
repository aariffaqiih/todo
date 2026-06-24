Diketahui:

[
192.170.20.33/27
]

Cari jumlah bit host:

[
32 - 27 = 5
]

Cari jumlah alamat tiap subnet:

[
2^5 = 32
]

Jadi kelipatan subnetnya adalah:

[
0,\ 32,\ 64,\ 96,\ 128,\ 160,\ 192,\ 224
]

Ingat, IP host tadi adalah:

[
192.170.20.33
]

Fokus ke oktet terakhir:

[
33
]

Angka 33 ada di antara kelipatan 32 berikut:

[
32 \le 33 < 64
]

Ambil yang paling kecil:

[
32
]

Jadi alamat network-nya:

[
\boxed{192.170.20.32}
]

Broadcast didapat dari kelipatan berikutnya dikurangi 1:

[
64 - 1 = 63
]

Jadi alamat broadcast-nya:

[
\boxed{192.170.20.63}
]

Host yang bisa digunakan adalah setelah network sampai sebelum broadcast:

[
32 + 1 = 33
]

[
63 - 1 = 62
]

Jadi rentang host:

[
\boxed{192.170.20.33 - 192.170.20.62}
]

Subnet mask untuk:

[
/27
]

adalah:

[
\boxed{255.255.255.224}
]

Jadi jawaban akhirnya:

[
\boxed{\text{Network Address } = 192.170.20.32}
]

[
\boxed{\text{Usable Host Range } = 192.170.20.33 - 192.170.20.62}
]

[
\boxed{\text{Broadcast Address } = 192.170.20.63}
]

[
\boxed{\text{Subnet Mask } = 255.255.255.224}
]
