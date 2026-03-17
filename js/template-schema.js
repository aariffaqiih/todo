const TEMPLATE_SCHEMA = {
  identity: {
    label: "Identitas",
    note: "(Tulis di halaman pertama dari notes)",
    fields: [
      { label: "Nama", key: "nama" },
      { label: "NIM", key: "nim" },
    ],
  },
  daily: {
    docTitle: "TEMPLATE JOURNAL HARIAN MAHASISWA",
    requiredFields: [
      "targets",
      "activities",
      "results",
      "obstacles",
      "solutions",
      "reflection",
    ],
    sections: [
      {
        num: "1\uFE0F\u20E3",
        title: "Rencana Hari Ini",
        note: "Tuliskan target sebelum mulai aktivitas.",
        field: "targets",
        type: "list",
        itemPrefix: "Target",
      },
      {
        num: "2\uFE0F\u20E3",
        title: "Aktivitas yang Dilakukan",
        field: "activities",
        type: "table",
        columns: [
          { label: "Waktu", key: "time", printWidth: "18%", docxWidth: 1633 },
          {
            label: "Aktivitas",
            key: "activity",
            printWidth: "35%",
            docxWidth: 3175,
          },
          {
            label: "Output yang Dihasilkan",
            key: "output",
            printWidth: "35%",
            docxWidth: 3175,
          },
          {
            label: "Status (\u2713/Proses)",
            key: "status",
            printWidth: "12%",
            docxWidth: 1087,
          },
        ],
      },
      {
        num: "3\uFE0F\u20E3",
        title: "Hasil yang Dicapai Hari Ini",
        note: "Jelaskan secara ringkas (maksimal 1 paragraf).",
        field: "results",
        type: "paragraph",
      },
      {
        num: "4\uFE0F\u20E3",
        title: "Kendala yang Dihadapi",
        field: "obstacles",
        type: "subFields",
        subFields: [
          { label: "Teknis", key: "teknis" },
          { label: "Non-teknis", key: "nonTeknis" },
          {
            label: "Manajemen waktu",
            key: "manajemenWaktu",
            shortLabel: "Waktu",
          },
        ],
      },
      {
        num: "5\uFE0F\u20E3",
        title: "Solusi / Perbaikan Besok",
        field: "solutions",
        type: "paragraph",
      },
      {
        num: "6\uFE0F\u20E3",
        title: "Refleksi Pribadi",
        note: "Isi dengan menjawab:",
        field: "reflection",
        type: "reflection",
        subFields: [
          {
            label: "Apa yang saya pelajari hari ini?",
            key: "learned",
            shortLabel: "Pelajari",
          },
          {
            label: "Apa yang bisa saya tingkatkan?",
            key: "improve",
            shortLabel: "Tingkatkan",
          },
        ],
        scoreLabel: "Skor produktivitas hari ini (1\u201310)",
      },
    ],
  },
  weekly: {
    docTitle: "TEMPLATE JOURNAL MINGGUAN MAHASISWA",
    requiredFields: [
      "activities",
      "achievements",
      "semesterTarget",
      "obstacles",
      "evaluation",
      "nextWeekPlan",
    ],
    sections: [
      {
        num: "1\uFE0F\u20E3",
        title: "Ringkasan Aktivitas Mingguan",
        field: "activities",
        type: "table",
        showTotal: true,
        columns: [
          { label: "Hari", key: "day", printWidth: "14%", docxWidth: 1270 },
          {
            label: "Fokus Aktivitas",
            key: "focus",
            printWidth: "38%",
            docxWidth: 3447,
          },
          {
            label: "Output",
            key: "output",
            printWidth: "35%",
            docxWidth: 3175,
          },
          {
            label: "Durasi (jam)",
            key: "duration",
            printWidth: "13%",
            docxWidth: 1178,
          },
        ],
      },
      {
        num: "2\uFE0F\u20E3",
        title: "Capaian Minggu Ini",
        note: "Tuliskan pencapaian utama:",
        field: "achievements",
        type: "checkList",
      },
      {
        num: "3\uFE0F\u20E3",
        title: "Progress terhadap Target Semester",
        field: "semesterTarget",
        type: "semesterProgress",
        subFields: [
          { label: "Target Semester", key: "target" },
          { label: "Keterangan", key: "note" },
        ],
        progressLabel: "Progress saat ini",
      },
      {
        num: "4\uFE0F\u20E3",
        title: "Kendala Mingguan",
        field: "obstacles",
        type: "subFields",
        subFields: [
          { label: "Akademik", key: "akademik" },
          { label: "Teknis", key: "teknis" },
          { label: "Pribadi", key: "pribadi" },
        ],
      },
      {
        num: "5\uFE0F\u20E3",
        title: "Evaluasi Diri",
        note: "Jawab reflektif:",
        field: "evaluation",
        type: "subFields",
        subFields: [
          {
            label: "Apa keberhasilan terbaik minggu ini?",
            key: "bestSuccess",
            shortLabel: "Terbaik",
          },
          {
            label: "Apa kesalahan terbesar?",
            key: "biggestMistake",
            shortLabel: "Kesalahan",
          },
          {
            label: "Apa strategi minggu depan?",
            key: "nextStrategy",
            shortLabel: "Strategi",
          },
        ],
      },
      {
        num: "6\uFE0F\u20E3",
        title: "Rencana Minggu Depan",
        field: "nextWeekPlan",
        type: "list",
        itemPrefix: "Target",
      },
    ],
  },
};
