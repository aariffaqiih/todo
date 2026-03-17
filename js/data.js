const IDENTITY = {
  nama: "'Aarif Faqiih",
  nim: "230401010001",
  kelas: "IF-4A",
  bio: "Mahasiswa Teknik Informatika semester 4 yang sedang mendalami data science, machine learning, dan analisis data. Blog ini adalah catatan jujur perjalanan belajarku — target, capaian, kegagalan, dan refleksi.",
  photo: "",
};
const JOURNALS = [
  {
    id: "daily-2025-07-14",
    type: "daily",
    date: "14 Juli 2025",
    dateSort: "2025-07-14",
    daily: {
      targets: [
        "Menyelesaikan implementasi bubble sort & quick sort",
        "Membaca 2 bab materi Introduction to AI",
        "Update portfolio dengan proyek FMCG analysis",
      ],
      activities: [
        {
          time: "07.00–08.30",
          activity: "Implementasi bubble sort dan quick sort di Python",
          output: "2 fungsi sorting berhasil diimplementasi & diuji",
          status: "✓",
        },
        {
          time: "09.00–10.30",
          activity: "Baca bab 3–4 Introduction to AI (search algorithms)",
          output: "Catatan ringkasan 3 halaman",
          status: "✓",
        },
        {
          time: "13.00–15.00",
          activity: "Update portfolio: menambahkan proyek FMCG analysis",
          output: "Halaman case study — selesai draft-nya",
          status: "Proses",
        },
        {
          time: "15.30–17.00",
          activity: "Latihan soal algoritma dari LeetCode",
          output: "3 soal easy berhasil diselesaikan",
          status: "✓",
        },
      ],
      results:
        "Hari ini sangat produktif. Berhasil menyelesaikan implementasi sorting algorithm dan membaca materi AI sesuai target. Update portfolio masih dalam proses karena butuh lebih banyak penulisan deskripsi proyek.",
      obstacles: {
        teknis: "Quick sort recursive sempat error karena base case yang salah",
        nonTeknis: "—",
        manajemenWaktu: "Estimasi untuk update portfolio terlalu singkat",
      },
      solutions:
        "Besok lanjutkan penulisan deskripsi portfolio. Untuk algoritma, review rekursi secara menyeluruh agar tidak terulang.",
      reflection: {
        learned:
          "Memahami perbedaan time complexity O(n²) vs O(n log n) secara praktis melalui implementasi langsung",
        improve:
          "Perlu lebih akurat mengestimasi waktu untuk task kreatif seperti menulis",
        score: 8,
      },
    },
  },
  {
    id: "daily-2025-07-10",
    type: "daily",
    date: "10 Juli 2025",
    dateSort: "2025-07-10",
    daily: {
      targets: [
        "Menyelesaikan class diagram UML untuk tugas OOP",
        "Latihan soal algoritma sorting",
        "Review materi Introduction to AI — chapter 1–2",
      ],
      activities: [
        {
          time: "08.00–09.30",
          activity: "Mengerjakan class diagram UML untuk tugas OOP",
          output: "Class diagram dengan 5 kelas selesai",
          status: "✓",
        },
        {
          time: "10.00–11.30",
          activity: "Latihan bubble sort & insertion sort",
          output: "3 latihan soal selesai",
          status: "✓",
        },
        {
          time: "13.00–14.30",
          activity: "Review slide AI — chapter 1–2 (uninformed search)",
          output: "Catatan ringkasan chapter 1 saja",
          status: "Proses",
        },
      ],
      results:
        "Class diagram OOP selesai tepat waktu. Latihan sorting berjalan lancar. Review AI belum tuntas karena kehabisan energi dan waktu di sore hari.",
      obstacles: {
        teknis: "Bingung dengan perbedaan relasi agregasi vs komposisi di UML",
        nonTeknis: "Sulit fokus setelah makan siang",
        manajemenWaktu: "Estimasi waktu review AI terlalu singkat",
      },
      solutions:
        "Besok review referensi UML dan tanya ke dosen. Jadwalkan sesi review lebih awal, sebelum makan siang.",
      reflection: {
        learned: "Perbedaan konseptual antara agregasi dan komposisi dalam OOP",
        improve: "Manajemen energi setelah makan siang perlu diperbaiki",
        score: 7,
      },
    },
  },
  {
    id: "weekly-2025-w28",
    type: "weekly",
    date: "Minggu ke-28 · 7–13 Juli 2025",
    dateSort: "2025-07-13",
    weekly: {
      weekNumber: 28,
      activities: [
        {
          day: "Senin",
          focus: "OOP — class diagram UML",
          output: "Diagram selesai",
          duration: "3.5",
        },
        {
          day: "Selasa",
          focus: "Algoritma sorting & searching",
          output: "5 soal latihan selesai",
          duration: "3",
        },
        {
          day: "Rabu",
          focus: "Review AI — uninformed search",
          output: "Catatan 4 halaman",
          duration: "2.5",
        },
        {
          day: "Kamis",
          focus: "Computer Networks — TCP/IP layer",
          output: "Ringkasan materi + mind map",
          duration: "3",
        },
        {
          day: "Jumat",
          focus: "HCI — wireframe lo-fi project",
          output: "Wireframe 5 halaman selesai",
          duration: "4",
        },
        {
          day: "Sabtu",
          focus: "Data project: FMCG analysis",
          output: "Dataset cleaned, EDA awal",
          duration: "2.5",
        },
        {
          day: "Minggu",
          focus: "Review mingguan & journaling",
          output: "Jurnal mingguan ini",
          duration: "1",
        },
      ],
      achievements: [
        "Menyelesaikan class diagram OOP yang tertunda 1 minggu",
        "Wireframe lo-fi project HCI selesai tepat deadline",
        "Memulai side project data science pertama (FMCG analysis)",
      ],
      semesterTarget: {
        target:
          "Memiliki 3 data project terdokumentasi di portfolio sebelum akhir semester",
        progress: 33,
        note: "1 project sedang berjalan (FMCG analysis), 2 lagi belum dimulai",
      },
      obstacles: {
        akademik:
          "Materi AI chapter 3 mulai kompleks — heuristic search membutuhkan pemahaman lebih dalam",
        teknis:
          "Environment conflict saat install scikit-learn versi baru di virtual env yang lama",
        pribadi:
          "Kurang tidur 2 malam menyebabkan penurunan konsentrasi yang signifikan",
      },
      evaluation: {
        bestSuccess:
          "Wireframe HCI selesai lebih cepat dari estimasi dan dapat feedback positif dari teman",
        biggestMistake:
          "Menunda review AI chapter 3 sehingga menumpuk di akhir minggu dan tidak sempat selesai",
        nextStrategy:
          "Jadwalkan 30 menit review AI setiap pagi, sebelum mulai aktivitas belajar lainnya",
      },
      nextWeekPlan: [
        "Lanjutkan FMCG analysis: eksplorasi visualisasi dan insight awal",
        "Selesaikan tugas essay Computer Networks (deadline Jumat)",
        "Mulai belajar Decision Tree untuk persiapan UTS Introduction to AI",
      ],
    },
  },
  {
    id: "daily-2025-07-07",
    type: "daily",
    date: "7 Juli 2025",
    dateSort: "2025-07-07",
    daily: {
      targets: [
        "Membaca dokumentasi pandas — groupby & pivot_table",
        "Eksplorasi dataset FMCG: memahami struktur data",
        "Setup environment Python baru untuk proyek data",
      ],
      activities: [
        {
          time: "09.00–10.30",
          activity: "Baca dokumentasi pandas groupby & pivot_table",
          output: "Ringkasan 2 halaman + contoh kode",
          status: "✓",
        },
        {
          time: "11.00–12.30",
          activity: "Eksplorasi awal dataset FMCG di Jupyter Notebook",
          output: "Laporan shape, null values, dtypes",
          status: "✓",
        },
        {
          time: "14.00–16.00",
          activity: "Setup virtual environment & install dependencies",
          output: "Environment siap, requirements.txt terbuat",
          status: "✓",
        },
      ],
      results:
        "Hari pembuka yang sangat baik untuk proyek FMCG. Berhasil memahami struktur dataset dan setup environment berjalan mulus. Siap memulai EDA proper besok.",
      obstacles: { teknis: "—", nonTeknis: "—", manajemenWaktu: "—" },
      solutions:
        "Lanjutkan EDA besok dengan fokus pada distribusi variabel dan missing value analysis.",
      reflection: {
        learned:
          "Dataset FMCG memiliki pola transaksi yang menarik — ada kolom status yang sangat informatif untuk analisis kegagalan transaksi",
        improve:
          "Dokumentasi eksplorasi awal seharusnya lebih sistematis sejak hari pertama",
        score: 9,
      },
    },
  },
];
