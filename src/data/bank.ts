export type Tier = 'mudah' | 'sedang' | 'sulit';
export type BankCode = 'A' | 'B' | 'C';

export interface Question {
  b: BankCode;
  n: number;
  q: string;
  o: string[];
  a: number;
  t: Tier;
  id: string;
  e?: string;
  custom?: boolean;
}

export const BANK: Question[] = [
  {b:'A',n:1,q:'Rukun Islam ada berapa perkara?',o:['4','5','6','7'],a:1,t:'mudah',id:'A1'},
  {b:'A',n:2,q:'Rukun Iman yang pertama adalah iman kepada...',o:['Malaikat','Kitab-kitab Allah','Allah SWT','Hari Kiamat'],a:2,t:'mudah',id:'A2'},
  {b:'A',n:3,q:'Melaksanakan ibadah haji ke Baitullah bagi yang mampu merupakan Rukun Islam yang ke-...',o:['2','3','4','5'],a:3,t:'mudah',id:'A3'},
  {b:'A',n:4,q:'Percaya kepada ketetapan baik dan buruk dari Allah SWT (Qada dan Qadar) merupakan Rukun Iman yang ke-...',o:['3','4','6','5'],a:2,t:'mudah',id:'A4'},
  {b:'A',n:5,q:'Rukun wudhu seluruhnya ada berapa perkara?',o:['4','5','6','7'],a:2,t:'mudah',id:'A5'},
  {b:'A',n:6,q:'Anggota badan yang pertama kali dibasuh setelah membaca niat dalam rukun wudhu adalah...',o:['Kedua tangan','Wajah atau muka','Sebagian kepala','Kedua kaki'],a:1,t:'mudah',id:'A6'},
  {b:'A',n:7,q:'Setelah membasuh kedua tangan sampai siku, rukun wudhu selanjutnya adalah...',o:['Mengusap sebagian kepala','Membasuh kedua kaki','Berkumur-kumur','Membasuh telinga'],a:0,t:'mudah',id:'A7'},
  {b:'A',n:8,q:'Membasuh kedua kaki dalam rukun wudhu harus sampai batas...',o:['Lutut','Betis','Mata kaki','Jari kaki'],a:2,t:'mudah',id:'A8'},
  {b:'A',n:9,q:'Ucapan takbir pertama saat memulai gerakan sholat disebut...',o:['Takbiratul Ihram','Takbir Intiqal','Tahiyatul Masjid','Tasbih'],a:0,t:'mudah',id:'A9'},
  {b:'A',n:10,q:'Surah yang wajib dibaca pada setiap rakaat sholat adalah...',o:['Surah Al-Ikhlas','Surah An-Nas','Surah Al-Fatihah','Surah Al-Kautsar'],a:2,t:'mudah',id:'A10'},
  {b:'A',n:11,q:'Diam sebentar dengan tenang pada setiap perpindahan gerakan sholat disebut...',o:["I'tidal","Tuma'ninah",'Khusyuk','Sujud'],a:1,t:'mudah',id:'A11'},
  {b:'A',n:12,q:'Gerakan terakhir yang menjadi penutup dalam rukun sholat adalah...',o:['Membaca doa qunut','Duduk di antara dua sujud','Mengucapkan salam pertama','Mengangkat kedua tangan'],a:2,t:'mudah',id:'A12'},
  {b:'A',n:13,q:'Malaikat yang bertugas menyampaikan wahyu dari Allah SWT kepada para Nabi dan Rasul adalah...',o:['Malaikat Mikail','Malaikat Jibril','Malaikat Israfil','Malaikat Izrail'],a:1,t:'mudah',id:'A13'},
  {b:'A',n:14,q:'Malaikat yang bertugas membagikan rezeki dan menurunkan hujan adalah...',o:['Malaikat Mikail','Malaikat Raqib','Malaikat Atid','Malaikat Ridwan'],a:0,t:'mudah',id:'A14'},
  {b:'A',n:15,q:'Malaikat Raqib dan Malaikat Atid memiliki tugas untuk...',o:['Menjaga pintu surga dan pintu neraka','Meniup sangkakala pada hari kiamat','Mencatat amal baik dan amal buruk manusia','Menanya manusia di dalam alam kubur'],a:2,t:'mudah',id:'A15'},
  {b:'A',n:16,q:'Malaikat yang bertugas menjaga pintu surga adalah...',o:['Malaikat Malik','Malaikat Ridwan','Malaikat Munkar','Malaikat Nakir'],a:1,t:'mudah',id:'A16'},
  {b:'A',n:17,q:'Jumlah Nabi dan Rasul yang wajib kita imani dan ketahui namanya ada...',o:['10','20','25','99'],a:2,t:'mudah',id:'A17'},
  {b:'A',n:18,q:'Nabi yang mendapat mukjizat tidak hangus dan tetap dingin saat dibakar oleh Raja Namrud adalah...',o:['Nabi Musa AS','Nabi Ibrahim AS','Nabi Nuh AS','Nabi Ismail AS'],a:1,t:'mudah',id:'A18'},
  {b:'A',n:19,q:'Atas izin Allah SWT, tongkat yang bisa berubah menjadi ular besar dan membelah Laut Merah adalah mukjizat dari...',o:['Nabi Isa AS','Nabi Sulaiman AS','Nabi Musa AS','Nabi Daud AS'],a:2,t:'mudah',id:'A19'},
  {b:'A',n:20,q:'Nabi yang membuat kapal sangat besar untuk menyelamatkan umatnya yang beriman dari banjir bandang adalah...',o:['Nabi Nuh AS','Nabi Hud AS','Nabi Luth AS','Nabi Yunus AS'],a:0,t:'mudah',id:'A20'},
  {b:'A',n:21,q:'Mukjizat terbesar yang diberikan Allah SWT kepada Nabi Muhammad SAW dan berlaku sepanjang masa adalah...',o:['Bisa berbicara dengan hewan',"Kitab suci Al-Qur'an",'Melunakkan besi dengan tangan','Menyembuhkan orang sakit'],a:1,t:'mudah',id:'A21'},
  {b:'A',n:22,q:'Bulan pertama dalam kalender tahun Hijriah adalah...',o:['Ramadhan','Syawal','Muharram','Rajab'],a:2,t:'mudah',id:'A22'},
  {b:'A',n:23,q:'Umat Islam di seluruh dunia wajib melaksanakan ibadah puasa selama satu bulan penuh pada bulan...',o:["Sya'ban",'Ramadhan','Dzulhijjah','Safar'],a:1,t:'mudah',id:'A23'},
  {b:'A',n:24,q:'Hari Raya Idul Fitri dirayakan oleh umat Islam setiap tanggal 1 bulan...',o:['Syawal','Muharram','Rabiul Awal','Dzulkaidah'],a:0,t:'mudah',id:'A24'},
  {b:'A',n:25,q:'Bulan terakhir (ke-12) dalam kalender Hijriah yang menjadi waktu pelaksanaan ibadah haji adalah...',o:['Dzulkaidah','Jumadil Akhir','Rabiul Akhir','Dzulhijjah'],a:3,t:'mudah',id:'A25'},
  {b:'A',n:26,q:"Peristiwa turunnya wahyu Al-Qur'an untuk pertama kalinya kepada Nabi Muhammad SAW disebut...",o:["Isra Mi'raj","Nuzulul Qur'an",'Fathu Makkah','Tahun Gajah'],a:1,t:'mudah',id:'A26'},
  {b:'A',n:27,q:'Perjalanan Nabi Muhammad SAW pada malam hari dari Masjidil Haram ke Masjidil Aqsa lalu naik ke Sidratul Muntaha untuk menerima perintah sholat lima waktu disebut...',o:['Hijrah','Haji Wada',"Isra Mi'raj",'Maulid Nabi'],a:2,t:'mudah',id:'A27'},
  {b:'A',n:28,q:'Nabi Muhammad SAW dilahirkan di Kota Makkah pada tahun yang dikenal dengan sebutan...',o:['Tahun Gajah','Tahun Hijriah','Tahun Unta','Tahun Kuda'],a:0,t:'mudah',id:'A28'},
  {b:'A',n:29,q:'Peristiwa perpindahan Nabi Muhammad SAW dan kaum muslimin dari Kota Makkah ke Kota Madinah disebut...',o:['Jihad','Hijrah','Dakwah','Safar'],a:1,t:'mudah',id:'A29'},
  {b:'A',n:30,q:'Jumlah putra dan putri Nabi Muhammad SAW seluruhnya ada...',o:['5 orang','6 orang','7 orang','8 orang'],a:2,t:'mudah',id:'A30'},
  {b:'A',n:31,q:'Berikut ini yang merupakan nama-nama putra Nabi Muhammad SAW adalah...',o:['Qasim, Abdullah, dan Ibrahim','Hasan, Husein, dan Ali','Umar, Utsman, dan Bilal','Zaid, Anas, dan Hamzah'],a:0,t:'mudah',id:'A31'},
  {b:'A',n:32,q:'Putri bungsu Nabi Muhammad SAW yang menikah dengan Ali bin Abi Thalib bernama...',o:['Zainab','Ruqayyah','Ummu Kultsum','Fatimah Az-Zahra'],a:3,t:'mudah',id:'A32'},
  {b:'A',n:33,q:'Semua anak Nabi Muhammad SAW lahir dari rahim ibunda Khadijah, kecuali satu putranya yang lahir dari Maria Al-Qibtiyah yaitu...',o:['Qasim','Ibrahim','Abdullah','Zainab'],a:1,t:'mudah',id:'A33'},
  {b:'A',n:34,q:'Sifat wajib bagi Allah SWT "Wujud" memiliki arti...',o:['Terdahulu','Kekal','Ada','Berkuasa'],a:2,t:'mudah',id:'A34'},
  {b:'A',n:35,q:'Lawan dari sifat wajib Allah SWT "Baqa" (Kekal) adalah sifat mustahil "Fana" yang artinya...',o:['Rusak atau binasa','Lemah','Bodoh','Terpaksa'],a:0,t:'mudah',id:'A35'},
  {b:'A',n:36,q:'Allah SWT memiliki sifat wajib "Qudrat" yang artinya Maha Kuasa. Maka mustahil Allah bersifat "\'Ajzun" yang artinya...',o:['Buta','Tuli','Lemah','Mati'],a:2,t:'mudah',id:'A36'},
  {b:'A',n:37,q:'Sifat wajib bagi Allah SWT "Sama\'" memiliki arti...',o:['Maha Melihat','Maha Mendengar','Maha Mengetahui','Maha Berbicara'],a:1,t:'mudah',id:'A37'},
  {b:'A',n:38,q:'Tingkatan surga yang paling tinggi dan paling mulia adalah...',o:['Surga Adn',"Surga Ma'wa",'Surga Firdaus','Surga Darussalam'],a:2,t:'mudah',id:'A38'},
  {b:'A',n:39,q:'Dalam Surah Al-Muddatstsir disebutkan bahwa orang-orang yang meninggalkan sholat akan masuk ke dalam...',o:['Neraka Saqar','Surga Naim','Surga Firdaus','Surga Adn'],a:0,t:'mudah',id:'A39'},
  {b:'A',n:40,q:'Berikut ini yang termasuk nama-nama surga adalah...',o:['Saqar, Hutamah, Lazha','Firdaus, Adn, Naim','Jahim, Sair, Wail','Hawiyah, Jahannam, Saqar'],a:1,t:'mudah',id:'A40'},
  {b:'A',n:41,q:'Tempat balasan di akhirat yang penuh siksaan api menyala bagi orang-orang yang ingkar dan berbuat dosa disebut...',o:['Surga','Alam Barzakh','Padang Mahsyar','Neraka'],a:3,t:'mudah',id:'A41'},
  {b:'A',n:42,q:"Surah pendek yang menceritakan tentang pasukan bergajah pimpinan Raja Abrahah yang ingin menghancurkan Ka'bah adalah...",o:['Surah Quraisy','Surah Al-Fil',"Surah Al-Ma'un",'Surah Al-Humazah'],a:1,t:'mudah',id:'A42'},
  {b:'A',n:43,q:'Ayat pertama dalam Surah Al-Kautsar berbunyi...',o:['Qul huwallahu ahad',"Inna a'tainakal kautsar","Idza ja'a nasrullahi wal fath",'Tabbat yada abi lahabiw watabb'],a:1,t:'mudah',id:'A43'},
  {b:'A',n:44,q:'"Lakum dinukum waliyadin" (Untukmu agamamu, dan untukkulah agamaku) adalah ayat terakhir dari Surah...',o:['Al-Ikhlas','Al-Kafirun','An-Nasr','Al-Lahab'],a:1,t:'mudah',id:'A44'},
  {b:'A',n:45,q:'Surah dalam Al-Qur\'an yang mengajarkan tentang keesaan Allah SWT ("Katakanlah: Dialah Allah, Yang Maha Esa") adalah...',o:['Surah Al-Falaq','Surah An-Nas','Surah Al-Ikhlas','Surah Al-Asr'],a:2,t:'mudah',id:'A45'},
  {b:'A',n:46,q:'Surah terakhir (urutan ke-114) dalam Al-Qur\'an yang memiliki arti "Manusia" adalah...',o:['Surah An-Nas','Surah Al-Falaq','Surah Al-Fatihah','Surah Al-Ikhlas'],a:0,t:'mudah',id:'A46'},
  {b:'A',n:47,q:'Surah urutan pertama (ke-1) dalam Al-Qur\'an yang berarti "Pembukaan" adalah...',o:['Al-Baqarah','Al-Fatihah','Ali Imran','An-Nisa'],a:1,t:'mudah',id:'A47'},
  {b:'A',n:48,q:'Surah urutan ke-2 dalam Al-Qur\'an yang merupakan surah terpanjang dan artinya "Sapi Betina" adalah...',o:["Al-An'am","Al-A'raf",'Al-Baqarah','Al-Maidah'],a:2,t:'mudah',id:'A48'},
  {b:'A',n:49,q:"Surah urutan ke-12 dalam Al-Qur'an yang diambil dari nama seorang nabi yang sangat tampan dan pandai menafsirkan mimpi adalah...",o:['Surah Ibrahim','Surah Yunus','Surah Hud','Surah Yusuf'],a:3,t:'mudah',id:'A49'},
  {b:'A',n:50,q:'Surah urutan ke-18 dalam Al-Qur\'an yang sangat dianjurkan untuk dibaca pada hari Jumat dan memiliki arti "Penghuni Gua" adalah...',o:['Surah Al-Kahfi','Surah Maryam','Surah Taha','Surah Al-Anbiya'],a:0,t:'mudah',id:'A50'},

  {b:'B',n:1,q:'Perbedaan mendasar antara Rukun Islam dan Rukun Iman dalam ajaran agama Islam adalah...',o:['Rukun Islam berjumlah enam, sedangkan Rukun Iman berjumlah lima','Rukun Islam hanya wajib bagi orang dewasa, sedangkan Rukun Iman untuk anak-anak','Rukun Islam berupa amalan lahiriah yang dikerjakan, sedangkan Rukun Iman berupa keyakinan di dalam hati','Rukun Islam cukup dihafalkan saja, sedangkan Rukun Iman harus dipraktikkan'],a:2,t:'sedang',id:'B1'},
  {b:'B',n:2,q:'Ahmad adalah anak yang rajin sholat dan berpuasa. Ketika hasil panen orang tuanya melimpah, ia ikut menyisihkan sebagian harta untuk diberikan kepada fakir miskin. Perbuatan tersebut merupakan pengamalan Rukun Islam yang ke-...',o:['1','2','3','4'],a:3,t:'sedang',id:'B2'},
  {b:'B',n:3,q:'Dalam urutan Rukun Iman, iman kepada Rasul-rasul Allah SWT berada tepat setelah iman kepada...',o:['Malaikat-malaikat Allah','Kitab-kitab Allah','Hari Akhir','Qada dan Qadar'],a:1,t:'sedang',id:'B3'},
  {b:'B',n:4,q:'Sebagai bagian dari Rukun Iman, kita wajib meyakini empat kitab suci yang diturunkan Allah SWT. Kitab suci yang diturunkan kepada Nabi Daud AS adalah...',o:['Taurat','Injil','Zabur',"Al-Qur'an"],a:2,t:'sedang',id:'B4'},
  {b:'B',n:5,q:'Budi berwudhu dengan cara membasuh kedua kaki terlebih dahulu sebelum membasuh wajah dan tangan. Wudhu Budi menjadi tidak sah karena meninggalkan rukun wudhu yang terakhir yaitu...',o:['Niat',"Tuma'ninah",'Muwalah','Tertib'],a:3,t:'sedang',id:'B5'},
  {b:'B',n:6,q:'Di bawah ini yang termasuk amalan sunnah wudhu dan bukan merupakan rukun wudhu adalah...',o:['Membasuh wajah','Membasuh kedua telinga','Membasuh kedua tangan sampai siku','Mengusap sebagian kepala'],a:1,t:'sedang',id:'B6'},
  {b:'B',n:7,q:'Saat membasuh wajah dalam rukun wudhu, batasan bagian wajah yang wajib terkena air secara merata adalah...',o:['Dari tempat tumbuhnya rambut kepala hingga dagu, serta dari telinga kanan ke telinga kiri','Hanya bagian pipi, hidung, dan dahi saja','Dari ujung rambut paling atas hingga ke leher bagian bawah','Cukup bagian sekitar mata dan mulut saja'],a:0,t:'sulit',id:'B7'},
  {b:'B',n:8,q:'Waktu yang paling tepat untuk mengucapkan niat wudhu di dalam hati agar wudhu menjadi sah adalah ketika...',o:['Baru berjalan menuju tempat wudhu','Selesai berkumur dan membasuh hidung','Pertama kali air menyentuh bagian wajah','Selesai membasuh kedua kaki'],a:2,t:'sulit',id:'B8'},
  {b:'B',n:9,q:'Rukun sholat terbagi menjadi rukun hati, rukun ucapan, dan rukun gerakan. Berikut ini yang termasuk rukun ucapan (qauli) dalam sholat adalah...',o:['Membaca doa iftitah','Membaca tasyahud akhir','Membaca doa qunut','Membaca surah pendek'],a:1,t:'sulit',id:'B9'},
  {b:'B',n:10,q:'Gerakan bangkit dari rukuk hingga posisi tubuh kembali berdiri tegak sebelum turun melakukan sujud disebut...',o:["I'tidal","Tuma'ninah",'Sujud sahwi','Duduk iftirasy'],a:0,t:'sedang',id:'B10'},
  {b:'B',n:11,q:'Saat melakukan gerakan sujud, Fatimah hanya menempelkan hidungnya saja ke sajadah tanpa menempelkan dahinya. Sujud Fatimah tidak sah karena anggota tubuh utama yang wajib menempel pada tempat sujud adalah...',o:['Dagu','Pipi','Jari tangan','Dahi'],a:3,t:'sedang',id:'B11'},
  {b:'B',n:12,q:'Membaca shalawat kepada Nabi Muhammad SAW merupakan salah satu rukun sholat yang dibaca pada saat...',o:['Berdiri setelah membaca Surah Al-Fatihah','Duduk di antara dua sujud','Duduk tasyahud akhir','Bangkit dari sujud pertama'],a:2,t:'sedang',id:'B12'},
  {b:'B',n:13,q:'Malaikat yang bertugas meniup sangkakala sebanyak dua kali pada hari kiamat untuk mematikan seluruh makhluk lalu membangkitkannya kembali adalah...',o:['Malaikat Izrail','Malaikat Israfil','Malaikat Mikail','Malaikat Malik'],a:1,t:'sedang',id:'B13'},
  {b:'B',n:14,q:"Nama lain dari Malaikat Jibril yang sering disebut dalam Al-Qur'an dan memiliki arti Roh yang Suci adalah...",o:['Ruhul Qudus','Ruhul Amin','Zabaniyah','Kiraman Katibin'],a:0,t:'sulit',id:'B14'},
  {b:'B',n:15,q:'Setelah manusia dimakamkan, akan datang dua malaikat yang bertugas menanyakan tentang siapa Tuhannya, siapa nabinya, dan apa agamanya. Kedua malaikat tersebut adalah...',o:['Malaikat Raqib dan Atid','Malaikat Malik dan Ridwan','Malaikat Munkar dan Nakir','Malaikat Jibril dan Mikail'],a:2,t:'sedang',id:'B15'},
  {b:'B',n:16,q:'Malaikat yang ditugaskan oleh Allah SWT untuk menjaga pintu neraka dengan sikap yang sangat tegas dan tidak pernah tersenyum adalah...',o:['Malaikat Ridwan','Malaikat Izrail','Malaikat Israfil','Malaikat Malik'],a:3,t:'sedang',id:'B16'},
  {b:'B',n:17,q:'Nabi yang dianugerahi mukjizat oleh Allah SWT berupa kemampuan mengerti bahasa hewan, menundukkan angin, dan memerintah bangsa jin adalah...',o:['Nabi Daud AS','Nabi Sulaiman AS','Nabi Yusuf AS','Nabi Isa AS'],a:1,t:'sedang',id:'B17'},
  {b:'B',n:18,q:'Atas izin Allah SWT, Nabi Isa AS diberi mukjizat dapat membuat burung dari tanah liat lalu meniupnya hingga hidup, serta menyembuhkan penyakit...',o:['Buta sejak lahir dan penyakit kusta','Demam tinggi dan sakit gigi','Lumpuh akibat kecelakaan','Batuk menahun dan sesak napas'],a:0,t:'sedang',id:'B18'},
  {b:'B',n:19,q:'Nabi yang pernah ditelan oleh ikan paus besar di tengah lautan karena meninggalkan kaumnya sebelum mendapat perintah dari Allah SWT adalah...',o:['Nabi Ilyas AS','Nabi Zulkifli AS','Nabi Yunus AS','Nabi Ayyub AS'],a:2,t:'sedang',id:'B19'},
  {b:'B',n:20,q:'Lima orang rasul pilihan yang memiliki ketabahan dan kesabaran luar biasa dalam menghadapi beratnya cobaan dakwah mendapat gelar khusus yaitu...',o:['Khatamul Anbiya','Khulafaur Rasyidin','Asbabun Nuzul','Ulul Azmi'],a:3,t:'sedang',id:'B20'},
  {b:'B',n:21,q:'Nabi yang diberi mukjizat mampu melunakkan besi dengan tangannya seperti lilin untuk membuat baju zirah perang adalah...',o:['Nabi Idris AS','Nabi Daud AS','Nabi Harun AS','Nabi Zakaria AS'],a:1,t:'sedang',id:'B21'},
  {b:'B',n:22,q:'Bulan ke-3 dalam kalender tahun Hijriah yang sangat istimewa karena menjadi bulan kelahiran Nabi Muhammad SAW adalah...',o:['Jumadil Awal','Rabiul Akhir','Rabiul Awal','Rajab'],a:2,t:'sedang',id:'B22'},
  {b:'B',n:23,q:'Urutan nama bulan Hijriah yang berada tepat setelah bulan Rajab dan sebelum bulan Ramadhan adalah...',o:["Sya'ban",'Syawal','Safar','Muharram'],a:0,t:'sedang',id:'B23'},
  {b:'B',n:24,q:'Dalam kalender Hijriah, terdapat empat bulan haram atau bulan yang dimuliakan. Tiga di antaranya berurutan yaitu Dzulkaidah, Dzulhijjah, dan Muharram, sedangkan satu bulan lainnya yang terpisah adalah...',o:['Safar',"Sya'ban",'Syawal','Rajab'],a:3,t:'sulit',id:'B24'},
  {b:'B',n:25,q:'Bulan ke-2 dalam kalender Hijriah yang datang tepat setelah bulan Muharram adalah...',o:['Rabiul Awal','Safar','Jumadil Akhir','Dzulkaidah'],a:1,t:'sedang',id:'B25'},
  {b:'B',n:26,q:"Peristiwa pembebasan Kota Makkah oleh Nabi Muhammad SAW bersama pasukan kaum muslimin tanpa pertumpahan darah serta pembersihan berhala di sekitar Ka'bah dikenal dengan sebutan...",o:['Fathu Makkah','Perang Khandaq','Perjanjian Hudaibiyah','Baiat Aqabah'],a:0,t:'sedang',id:'B26'},
  {b:'B',n:27,q:'Peperangan besar pertama dalam sejarah Islam yang terjadi pada bulan Ramadhan tahun ke-2 Hijriah antara 313 pasukan muslim melawan 1.000 pasukan Quraisy adalah...',o:['Perang Uhud','Perang Tabuk','Perang Badar','Perang Hunain'],a:2,t:'sedang',id:'B27'},
  {b:'B',n:28,q:'Ketika Nabi Muhammad SAW melakukan perjalanan hijrah dari Makkah menuju Madinah, sahabat setia yang menemani beliau bersembunyi di dalam Gua Tsur adalah...',o:['Umar bin Khattab','Abu Bakar Ash-Shiddiq','Utsman bin Affan','Ali bin Abi Thalib'],a:1,t:'sedang',id:'B28'},
  {b:'B',n:29,q:'Ibadah haji terakhir yang dilaksanakan oleh Nabi Muhammad SAW bersama puluhan ribu kaum muslimin sebelum beliau wafat dikenal dengan nama...',o:['Haji Tamattu','Haji Qiran','Haji Ifrad','Haji Wada'],a:3,t:'sedang',id:'B29'},
  {b:'B',n:30,q:'Putra pertama Nabi Muhammad SAW yang lahir di Makkah sehingga beliau mendapat gelar kunyah "Abul Qasim" adalah...',o:['Qasim','Abdullah','Ibrahim','Zaid'],a:0,t:'sulit',id:'B30'},
  {b:'B',n:31,q:'Dua putri Nabi Muhammad SAW yang secara bergantian menikah dengan sahabat Utsman bin Affan sehingga Utsman mendapat julukan Dzun Nurain (pemilik dua cahaya) adalah...',o:['Zainab dan Fatimah','Fatimah dan Ruqayyah','Ruqayyah dan Ummu Kultsum','Ummu Kultsum dan Zainab'],a:2,t:'sulit',id:'B31'},
  {b:'B',n:32,q:'Putri sulung atau anak perempuan pertama Nabi Muhammad SAW dari pernikahannya dengan Siti Khadijah bernama...',o:['Fatimah Az-Zahra','Zainab','Ruqayyah','Ummu Kultsum'],a:1,t:'sulit',id:'B32'},
  {b:'B',n:33,q:'Semua putra Nabi Muhammad SAW wafat ketika masih kecil, sedangkan salah satu putrinya yang masih hidup hingga beberapa bulan setelah Nabi wafat adalah...',o:['Zainab','Ruqayyah','Ummu Kultsum','Fatimah Az-Zahra'],a:3,t:'sulit',id:'B33'},
  {b:'B',n:34,q:'Allah SWT tidak mungkin memiliki kesamaan dengan makhluk ciptaan-Nya dalam bentuk atau sifat apa pun. Hal ini sesuai dengan sifat wajib bagi Allah SWT yaitu...',o:['Mukhalafatu lil hawaditsi','Mumatsalatu lil hawaditsi','Qiyamuhu binafsihi','Wahdaniyah'],a:0,t:'sedang',id:'B34'},
  {b:'B',n:35,q:'Lawan dari sifat wajib Allah SWT "Qiyamuhu binafsihi" (Berdiri sendiri) adalah sifat mustahil "Ihtiyaju lighairihi" yang memiliki arti...',o:['Bersifat baru','Terpaksa','Membutuhkan bantuan yang lain','Berbilang atau banyak'],a:2,t:'sulit',id:'B35'},
  {b:'B',n:36,q:'Sifat wajib bagi Allah SWT "Wahdaniyah" memiliki arti Maha Esa atau Tunggal, maka mustahil Allah bersifat "Ta\'addud" yang artinya...',o:['Bisu atau tidak berbicara','Berbilang atau lebih dari satu','Lemah dan tidak berdaya','Rusak dan binasa'],a:1,t:'sedang',id:'B36'},
  {b:'B',n:37,q:'Allah SWT menciptakan seluruh alam semesta atas kehendak-Nya sendiri tanpa ada satu pun yang dapat memaksa-Nya. Sifat wajib Allah yang memiliki arti Berkehendak adalah...',o:['Qudrat','Ilmu','Hayat','Iradah'],a:3,t:'sedang',id:'B37'},
  {b:'B',n:38,q:'Tingkatan neraka yang paling dasar dan paling berat siksaannya, yang diperuntukkan bagi orang-orang munafik adalah...',o:['Neraka Jahannam','Neraka Wail','Neraka Sair','Neraka Lazha'],a:0,t:'sulit',id:'B38'},
  {b:'B',n:39,q:"Dalam Al-Qur'an disebutkan bahwa orang-orang yang suka mengumpat, mencela orang lain, dan menumpuk-numpuk harta tanpa mau bersedekah akan dilemparkan ke dalam...",o:["Surga Ma'wa",'Surga Darussalam','Neraka Hutamah','Neraka Saqar'],a:2,t:'sulit',id:'B39'},
  {b:'B',n:40,q:'Surga yang diperuntukkan bagi orang-orang yang bertakwa dan selalu menjaga amal kebaikannya, yang memiliki arti "Surga yang penuh kenikmatan" adalah...',o:['Surga Adn',"Surga Na'im",'Surga Firdaus','Surga Khuldi'],a:1,t:'sulit',id:'B40'},
  {b:'B',n:41,q:'Di bawah ini kelompok nama yang seluruhnya merupakan nama-nama neraka adalah...',o:['Firdaus, Na\'im, Adn',"Ma'wa, Darussalam, Khuldi",'Saqar, Darul Jalal, Jahim','Hawiyah, Jahim, Lazha'],a:3,t:'sulit',id:'B41'},
  {b:'B',n:42,q:'Surah pendek yang mengingatkan manusia bahwa perbuatan bermegah-megahan dengan harta dunia sering kali melalaikan mereka hingga masuk ke dalam liang kubur adalah...',o:['Surah At-Takasur','Surah Al-Humazah',"Surah Al-Qari'ah",'Surah Az-Zalzalah'],a:0,t:'sedang',id:'B42'},
  {b:'B',n:43,q:'Dalam Surah Al-Asr, Allah SWT bersumpah demi waktu bahwa sesungguhnya semua manusia berada dalam kerugian, kecuali orang-orang yang beriman, beramal saleh, serta saling menasihati dalam...',o:['Kekayaan dan jabatan','Kekuatan dan keberanian','Kebenaran dan kesabaran','Kepandaian dan ketekunan'],a:2,t:'sedang',id:'B43'},
  {b:'B',n:44,q:'Surah pendek yang menjelaskan tentang ciri-ciri pendusta agama, seperti suka menghardik anak yatim dan enggan memberi makan orang miskin, adalah...',o:['Surah Quraisy',"Surah Al-Ma'un",'Surah Al-Kautsar','Surah An-Nasr'],a:1,t:'sedang',id:'B44'},
  {b:'B',n:45,q:'Surah Al-Falaq mengajarkan umat Islam untuk memohon perlindungan kepada Allah SWT dari berbagai kejahatan makhluk di waktu subuh. Arti dari kata "Al-Falaq" adalah...',o:['Waktu Malam','Waktu Dhuha','Waktu Ashar','Waktu Subuh'],a:3,t:'sedang',id:'B45'},
  {b:'B',n:46,q:'Dalam Surah Al-Lahab diceritakan tentang salah satu paman Nabi Muhammad SAW yang sangat memusuhi dakwah Islam hingga celaka kedua tangannya, yaitu...',o:['Abu Lahab','Abu Thalib','Hamzah','Abbas'],a:0,t:'sedang',id:'B46'},
  {b:'B',n:47,q:'Surah urutan ke-3 dalam Al-Qur\'an yang berada tepat setelah Surah Al-Baqarah dan memiliki arti "Keluarga Imran" adalah...',o:['Surah An-Nisa',"Surah Al-An'am",'Surah Ali Imran',"Surah Al-A'raf"],a:2,t:'sedang',id:'B47'},
  {b:'B',n:48,q:'Surah urutan ke-5 dalam Al-Qur\'an yang berada setelah Surah An-Nisa dan memiliki arti "Hidangan" adalah...',o:['Surah Al-Anfal','Surah Al-Maidah','Surah At-Taubah','Surah Yunus'],a:1,t:'sedang',id:'B48'},
  {b:'B',n:49,q:"Di antara surah urutan ke-1 sampai ke-30 dalam Al-Qur'an, satu-satunya surah yang menggunakan nama seorang perempuan mulia (ibunda Nabi Isa AS) adalah...",o:['Surah Khadijah','Surah Aisyah','Surah Fatimah','Surah Maryam'],a:3,t:'sedang',id:'B49'},
  {b:'B',n:50,q:'Surah urutan ke-24 dalam Al-Qur\'an yang terletak setelah Surah Al-Mu\'minun dan memiliki arti "Cahaya" adalah...',o:['Surah An-Nur','Surah Al-Furqan',"Surah Asy-Syu'ara",'Surah An-Naml'],a:0,t:'sedang',id:'B50'},

  {b:'C',n:1,q:'Dua kalimat syahadat merupakan fondasi utama dalam Rukun Islam yang pertama. Makna dari syahadat kedua (Syahadat Rasul) dalam kehidupan seorang muslim adalah...',o:['Meyakini bahwa tidak ada pencipta alam semesta selain Allah SWT','Mengaku dan meyakini bahwa Nabi Muhammad SAW adalah utusan Allah yang wajib diteladani ajarannya','Meyakini bahwa seluruh nabi memiliki kedudukan yang sama tanpa ada penutup para nabi',"Mengimani bahwa Al-Qur'an diturunkan secara sekaligus di Kota Madinah"],a:1,t:'sulit',id:'C1'},
  {b:'C',n:2,q:'Dalam konsep Rukun Iman, keimanan kepada kitab-kitab Allah SWT menuntut seorang muslim untuk memperlakukan kitab-kitab terdahulu (Taurat, Zabur, dan Injil) dengan sikap...',o:['Tetap mengamalkan seluruh hukum syariat di dalamnya dalam ibadah sehari-hari',"Mengingkari keberadaan kitab-kitab tersebut karena hanya Al-Qur'an yang sah","Mengimani bahwa kitab-kitab tersebut pernah diturunkan Allah, namun hukum syariatnya telah disempurnakan oleh Al-Qur'an",'Menganggap semua kitab suci tersebut ditulis langsung oleh para malaikat'],a:2,t:'sulit',id:'C2'},
  {b:'C',n:3,q:'Seseorang yang rajin melaksanakan sholat lima waktu dan berpuasa di bulan Ramadhan, namun di dalam hatinya masih meragukan adanya hari kebangkitan setelah kematian, maka keimanannya dianggap batal karena...',o:['Rukun Iman merupakan satu kesatuan utuh yang tidak boleh diingkari salah satunya','Rukun Islam lebih tinggi kedudukannya daripada Rukun Iman','Hari Akhir hanyalah kisah perumpamaan dan bukan kejadian nyata','Amal ibadah lahiriah sudah cukup menggantikan keyakinan di dalam hati'],a:0,t:'sulit',id:'C3'},
  {b:'C',n:4,q:'Di antara lima perkara dalam Rukun Islam, ibadah yang pelaksanaannya memiliki syarat khusus berupa kemampuan finansial (mencapai nisab dan haul) serta bertujuan membersihkan harta adalah...',o:['Sholat fardhu','Puasa Ramadhan','Ibadah Haji','Menunaikan Zakat'],a:3,t:'sedang',id:'C4'},
  {b:'C',n:5,q:'Dalam fiqih ibadah, membasuh (ghasl) berbeda dengan mengusap (mash). Pada rukun wudhu, bagian anggota tubuh yang cukup dilakukan dengan cara mengusap sebagian saja tanpa harus mengalirkan air ke seluruh permukaannya adalah...',o:['Wajah','Kedua tangan hingga siku','Sebagian kepala','Kedua kaki hingga mata kaki'],a:2,t:'sulit',id:'C5'},
  {b:'C',n:6,q:'Ketika seseorang berwudhu menggunakan jam tangan yang ketat atau cat kuku (kuteks) yang menghalangi air menembus permukaan kulit, maka wudhunya dinilai tidak sah karena...',o:['Tidak mendahulukan anggota tubuh bagian kanan','Air tidak mengenai kulit pada anggota rukun wudhu secara merata','Tidak membaca basmalah sebelum memulai wudhu','Dilakukan di tempat yang kurang terang'],a:1,t:'sulit',id:'C6'},
  {b:'C',n:7,q:'Urutan rukun wudhu yang benar setelah seseorang membasuh wajah dengan niat yang sah adalah...',o:['Mengusap sebagian kepala, membasuh kedua tangan, lalu membasuh kedua kaki','Membasuh kedua tangan hingga siku, mengusap sebagian kepala, lalu membasuh kedua kaki hingga mata kaki','Berkumur-kumur, membasuh kedua tangan, lalu membasuh kedua telinga','Membasuh kedua kaki, mengusap kepala, lalu membasuh kedua tangan'],a:1,t:'sulit',id:'C7'},
  {b:'C',n:8,q:'Jika seseorang berwudhu sambil diselingi aktivitas lain dalam waktu yang sangat lama hingga air pada anggota wudhu sebelumnya sudah mengering total sebelum lanjut ke rukun berikutnya, ia telah meninggalkan kesunnahan yang sangat dianjurkan demi menjaga ketertiban wudhu, yaitu...',o:['Istinsyaq (menghirup air ke hidung)','Tasybik (menyela-nyela jari)','Muwalah (berkesinambungan tanpa jeda lama)','Tayammun (bersuci dengan debu)'],a:2,t:'sulit',id:'C8'},
  {b:'C',n:9,q:'Dalam rukun sholat, posisi berdiri tegak merupakan kewajiban bagi orang yang mampu pada sholat fardhu. Apabila seseorang mengalami sakit parah sehingga tidak sanggup berdiri, maka keringanan (rukhsah) urutan berikutnya yang wajib ia lakukan adalah...',o:['Langsung meninggalkan sholat hingga sembuh total','Melaksanakan sholat dengan posisi duduk','Melaksanakan sholat cukup dengan mengedipkan mata','Mengganti sholatnya dengan membayar fidyah'],a:1,t:'sedang',id:'C9'},
  {b:'C',n:10,q:'Perbedaan mendasar antara duduk iftirasy dan duduk tawarruk dalam rukun sholat terletak pada waktu pelaksanaannya. Duduk tawarruk secara khusus dilakukan pada saat...',o:['Duduk di antara dua sujud','Duduk tasyahud awal','Duduk tasyahud akhir sebelum salam','Duduk istirahat sebelum berdiri ke rakaat kedua'],a:2,t:'sedang',id:'C10'},
  {b:'C',n:11,q:'Rukuk dalam sholat dianggap sah dan sempurna apabila dilakukan dengan cara membungkukkan badan hingga posisi punggung dan kepala sejajar rata, serta disertai sikap...',o:['Membaca surah pendek setelah rukuk',"Tuma'ninah (tenang sejenak sebelum bangkit)",'Mengangkat kedua tangan setinggi telinga','Menolehkan kepala ke arah kanan dan kiri'],a:1,t:'sedang',id:'C11'},
  {b:'C',n:12,q:'Niat sholat merupakan salah satu rukun hati (qalbi) yang menentukan sah tidaknya ibadah. Waktu pelaksanaan niat sholat yang tepat menurut jumhur ulama adalah...',o:['Ketika melangkah masuk ke dalam masjid','Bersamaan dengan mengucapkan Takbiratul Ihram','Setelah selesai membaca doa iftitah','Sebelum merapatkan barisan shaf'],a:1,t:'sedang',id:'C12'},
  {b:'C',n:13,q:'Keimanan kepada Malaikat Raqib dan Malaikat Atid memberikan dampak psikologis yang kuat bagi seorang muslim dalam kehidupan sehari-hari, yaitu...',o:['Merasa bebas berbuat apa saja selama tidak dilihat oleh orang lain','Selalu mawas diri dan berhati-hati dalam bertindak karena setiap ucapan dan perbuatan dicatat tanpa terlewat','Hanya berbuat kebaikan ketika berada di tempat ibadah saja','Mengandalkan amal orang lain untuk menutupi kesalahan pribadi'],a:1,t:'sulit',id:'C13'},
  {b:'C',n:14,q:'Malaikat yang bertugas mencabut nyawa seluruh makhluk bernyawa apabila ajalnya telah tiba atas perintah Allah SWT adalah...',o:['Malaikat Izrail','Malaikat Israfil','Malaikat Malik','Malaikat Nakir'],a:0,t:'mudah',id:'C14'},
  {b:'C',n:15,q:"Dalam peristiwa Isra Mi'raj, Nabi Muhammad SAW bertemu dengan malaikat penjaga pintu langit dan pimpinan para malaikat yang memiliki 600 sayap raksasa. Malaikat yang mendampingi Nabi sepanjang perjalanan tersebut adalah...",o:['Malaikat Mikail','Malaikat Ridwan','Malaikat Jibril','Malaikat Israfil'],a:2,t:'mudah',id:'C15'},
  {b:'C',n:16,q:'Selain menurunkan hujan dan membagi rezeki kepada seluruh makhluk di bumi, Malaikat Mikail juga bertugas mengatur...',o:['Tiupan sangkakala pada hari kebangkitan','Tumbuh-tumbuhan dan peredaran awan atas izin Allah SWT','Pertanyaan bagi ruh manusia di alam barzakh','Penyiksaan bagi penghuni neraka jahannam'],a:1,t:'sedang',id:'C16'},
  {b:'C',n:17,q:'Nabi yang diuji oleh Allah SWT dengan kehilangan harta benda, wafatnya seluruh anak-anaknya, serta penyakit kulit yang berat selama bertahun-tahun namun tetap sabar hingga akhirnya disembuhkan melalui air yang memancar dari hentakan kakinya adalah...',o:['Nabi Ayyub AS','Nabi Zakaria AS','Nabi Ilyasa AS',"Nabi Syu'aib AS"],a:0,t:'sedang',id:'C17'},
  {b:'C',n:18,q:'Ketika Raja Thalut dan pasukannya berhadapan dengan raksasa Jalut yang sangat ditakuti, seorang pemuda beriman tampil maju dan berhasil mengalahkan Jalut hanya dengan menggunakan ketapel batu atas izin Allah SWT. Pemuda yang kelak diangkat menjadi nabi dan raja tersebut adalah...',o:['Nabi Sulaiman AS','Nabi Daud AS','Nabi Harun AS','Nabi Luth AS'],a:1,t:'sedang',id:'C18'},
  {b:'C',n:19,q:'Nabi yang dianugerahi ketampanan luar biasa serta mukjizat mampu menafsirkan mimpi secara akurat—termasuk mimpi raja Mesir tentang tujuh tahun masa subur dan tujuh tahun masa paceklik—adalah...',o:["Nabi Ya'qub AS",'Nabi Ishaq AS','Nabi Yusuf AS','Nabi Ismail AS'],a:2,t:'sedang',id:'C19'},
  {b:'C',n:20,q:'Di tengah masyarakat Negeri Madyan yang gemar berbuat curang dengan mengurangi takaran dan timbangan dalam berdagang, Allah SWT mengutus seorang nabi untuk meluruskan moral ekonomi mereka, yaitu...',o:['Nabi Saleh AS','Nabi Hud AS',"Nabi Syu'aib AS",'Nabi Idris AS'],a:2,t:'sedang',id:'C20'},
  {b:'C',n:21,q:'Nabi Saleh AS diutus kepada kaum Tsamud yang sombong dan menantang bukti kenabiannya. Mukjizat yang diberikan Allah SWT kepada Nabi Saleh AS sebagai jawaban atas tantangan kaumnya adalah...',o:['Memancarkan air susu dari jari-jarinya','Mengeluarkan seekor unta betina besar dari celah batu karang yang terbelah','Membelah bulan menjadi dua bagian di langit malam','Mengubah tongkat kayu menjadi seekor ular raksasa'],a:1,t:'sedang',id:'C21'},
  {b:'C',n:22,q:"Peristiwa besar Isra Mi'raj yang menjadi tonggak diwajibkannya sholat lima waktu bagi umat Islam diperingati setiap tanggal 27 pada bulan...",o:['Muharram','Rajab',"Sya'ban",'Rabiul Akhir'],a:1,t:'sedang',id:'C22'},
  {b:'C',n:23,q:'Sistem penanggalan kalender Hijriah berbeda dengan kalender Masehi karena perhitungan satu bulannya didasarkan pada...',o:['Peredaran bumi mengelilingi matahari (syamsiah)','Perubahan musim panas dan musim dingin di Jazirah Arab','Peredaran bulan mengelilingi bumi (qamariah)','Pergerakan bintang-bintang di langit malam'],a:2,t:'sedang',id:'C23'},
  {b:'C',n:24,q:'Dalam urutan bulan Hijriah, dua bulan yang berada di posisi ke-5 dan ke-6 (di antara Rabiul Akhir dan Rajab) adalah...',o:['Safar dan Muharram','Jumadil Awal dan Jumadil Akhir',"Sya'ban dan Ramadhan",'Dzulkaidah dan Dzulhijjah'],a:1,t:'sedang',id:'C24'},
  {b:'C',n:25,q:'Setelah menjalankan ibadah puasa wajib selama sebulan penuh di bulan Ramadhan, umat Islam memasuki bulan Syawal yang disunnahkan untuk menyempurnakannya dengan puasa enam hari. Bulan Syawal menempati urutan bulan ke-...',o:['8','9','10','11'],a:2,t:'sedang',id:'C25'},
  {b:'C',n:26,q:'Setelah kaum muslimin hijrah ke Madinah, Nabi Muhammad SAW menyusun sebuah piagam perjanjian damai yang mengatur hak dan kewajiban antara kaum Muhajirin, kaum Anshar, dan penduduk non-muslim Madinah. Dokumen bersejarah ini dikenal sebagai...',o:['Perjanjian Hudaibiyah','Piagam Madinah','Baiat Ridwan','Deklarasi Thaif'],a:1,t:'sedang',id:'C26'},
  {b:'C',n:27,q:'Pada tahun ke-5 Hijriah, pasukan sekutu (Ahzab) mengepung Kota Madinah. Atas usulan sahabat Salman Al-Farisi, kaum muslimin menerapkan strategi pertahanan yang belum pernah dikenal bangsa Arab saat itu, yaitu menggali parit besar di utara Madinah. Peristiwa ini dikenal sebagai...',o:['Perang Khandaq',"Perang Mu'tah",'Perang Khaibar','Perang Yamamah'],a:0,t:'sedang',id:'C27'},
  {b:'C',n:28,q:'Kekalahan taktis yang dialami kaum muslimin pada Perang Uhud memberikan pelajaran berharga bagi generasi muda Islam tentang bahaya...',o:['Kurangnya jumlah persenjataan perang','Ketidaktaatan pasukan pemanah terhadap perintah pemimpin karena tergiur harta rampasan perang (ghanimah)','Cuaca gurun yang terlalu panas saat siang hari','Tidak adanya benteng pertahanan di sekitar Kota Makkah'],a:1,t:'sulit',id:'C28'},
  {b:'C',n:29,q:'Penetapan awal tahun 1 Hijriah sebagai kalender resmi umat Islam diputuskan pada masa kekhalifahan Umar bin Khattab RA dengan menjadikan peristiwa... sebagai patokan awalnya.',o:['Kelahiran Nabi Muhammad SAW','Turunnya wahyu pertama di Gua Hira','Hijrahnya Nabi Muhammad SAW dari Makkah ke Madinah','Wafatnya Nabi Muhammad SAW di Madinah'],a:2,t:'mudah',id:'C29'},
  {b:'C',n:30,q:'Dari seluruh anak Nabi Muhammad SAW, tiga di antaranya adalah laki-laki yang seluruhnya wafat pada usia balita. Nama ketiga putra beliau tersebut adalah...',o:['Qasim, Abdullah, dan Ibrahim','Hasan, Husein, dan Muhsin','Zaid, Usamah, dan Anas','Qasim, Ali, dan Utsman'],a:0,t:'mudah',id:'C30'},
  {b:'C',n:31,q:'Putri sulung Nabi Muhammad SAW yang bernama Zainab menikah dengan sepupunya yang bernama Abul Ash bin Rabi\'. Ketika Abul Ash tertawan dalam Perang Badar, Zainab sempat mengirimkan kalung peninggalan ibundanya (Siti Khadijah) sebagai...',o:['Hadiah pernikahan bagi penduduk Madinah','Tebusan untuk membebaskan suaminya dari status tawanan perang','Modal usaha dagang menuju Negeri Syam','Sumbangan pembangunan Masjid Nabawi'],a:1,t:'sulit',id:'C31'},
  {b:'C',n:32,q:'Melalui jalur pernikahan putri bungsu Nabi Muhammad SAW, Fatimah Az-Zahra, dengan sahabat Ali bin Abi Thalib, keturunan Rasulullah SAW terus berlanjut hingga kini melalui dua cucu kesayangan beliau yang bernama...',o:['Abdullah dan Ibrahim','Hasan dan Husein',"Zaid dan Ja'far","Mu'awiyah dan Yazid"],a:1,t:'mudah',id:'C32'},
  {b:'C',n:33,q:'Putra kedua Nabi Muhammad SAW dari pernikahannya dengan Siti Khadijah sering dijuluki dengan sebutan Ath-Thayyib dan Ath-Thahir (yang baik dan yang suci). Nama putra beliau tersebut adalah...',o:['Qasim','Ibrahim','Abdullah','Zaid'],a:2,t:'sulit',id:'C33'},
  {b:'C',n:34,q:'Dalam ilmu tauhid, sifat wajib bagi Allah SWT "Qidam" berarti Terdahulu (tidak ada permulaan bagi keberadaan-Nya). Maka sifat mustahil yang menjadi lawannya adalah "Huduts" yang artinya...',o:['Baru atau memiliki permulaan','Rusak atau mengalami kehancuran','Membutuhkan bantuan pihak lain','Tidak memiliki pengetahuan'],a:0,t:'sulit',id:'C34'},
  {b:'C',n:35,q:'Sifat wajib Allah SWT "Hayat" berarti Maha Hidup secara abadi dan tidak pernah mengantuk maupun tidur. Lawan dari sifat tersebut adalah sifat mustahil "Mautun" yang artinya...',o:['Bisu','Tuli','Mati','Buta'],a:2,t:'mudah',id:'C35'},
  {b:'C',n:36,q:'Segala sesuatu yang terjadi di alam semesta ini diketahui oleh Allah SWT secara detail, baik yang tampak maupun yang tersembunyi di dalam hati manusia. Hal ini membuktikan bahwa Allah memiliki sifat wajib "Ilmu" dan mustahil bersifat "Jahlun" yang artinya...',o:['Terpaksa','Bodoh atau tidak mengetahui','Lemah','Berbilang'],a:1,t:'sulit',id:'C36'},
  {b:'C',n:37,q:"Al-Qur'an merupakan kalam (firman) Allah SWT yang diturunkan sebagai pedoman hidup manusia. Keberadaan wahyu tersebut menjadi bukti bahwa Allah memiliki sifat wajib \"Kalam\" (Berfirman) dan mustahil bersifat...",o:['Bukmun (Bisu)',"'Umyun (Buta)",'Shamamun (Tuli)','Karahah (Terpaksa)'],a:0,t:'sedang',id:'C37'},
  {b:'C',n:38,q:"Dalam Al-Qur'an disebutkan bahwa salah satu nama surga yang disediakan bagi orang-orang yang bertakwa dan sabar dalam ketaatan memiliki arti \"Tempat tinggal yang kekal abadi\", yaitu...",o:['Surga Adn',"Surga Ma'wa",'Surga Firdaus','Surga Darul Muqamah'],a:0,t:'sedang',id:'C38'},
  {b:'C',n:39,q:'Surah Al-Muthaffifin mengingatkan para pelaku bisnis dan pedagang agar tidak berlaku curang dalam menakar atau menimbang barang. Ancaman keras dalam ayat pertama surah tersebut ditujukan kepada orang-orang yang curang dengan sebutan...',o:['Saqar','Wail (kecelakaan besar / lembah neraka)','Hutamah','Hawiyah'],a:1,t:'sulit',id:'C39'},
  {b:'C',n:40,q:"Dalam Surah Al-Qari'ah dijelaskan bahwa orang yang timbangan amal kebaikannya ringan pada hari kiamat akan mendapatkan tempat kembali berupa neraka yang apinya sangat panas, yang disebut...",o:['Neraka Hawiyah','Neraka Lazha',"Neraka Sa'ir",'Neraka Jahim'],a:0,t:'sulit',id:'C40'},
  {b:'C',n:41,q:'Nama surga yang secara harfiah berarti "Negeri Keselamatan" atau "Tempat yang Penuh Kedamaian" bagi orang-orang yang beriman dan beramal saleh adalah...',o:["Surga Na'im",'Surga Darussalam','Surga Khuldi',"Surga Ma'wa"],a:1,t:'sedang',id:'C41'},
  {b:'C',n:42,q:'Pesan moral utama dalam Surah Al-Humazah yang sangat relevan bagi pengguna media sosial di era modern adalah larangan keras untuk...',o:['Memamerkan ibadah di tempat umum','Mengumpat, mencela, serta merendahkan martabat orang lain demi membanggakan harta','Meninggalkan sholat berjamaah di masjid','Melakukan perjalanan jauh tanpa membawa bekal'],a:1,t:'sulit',id:'C42'},
  {b:'C',n:43,q:"Surah Quraisy mengingatkan suku Quraisy akan nikmat besar berupa keamanan dalam perjalanan dagang musim dingin dan musim panas. Sebagai bentuk syukur atas stabilitas keamanan dan ekonomi tersebut, Allah memerintahkan mereka untuk...",o:['Memperluas wilayah kekuasaan hingga ke luar Jazirah Arab',"Menyembah Allah pemilik Ka'bah yang telah memberi makan dan rasa aman",'Membangun benteng pertahanan di sekeliling Kota Makkah','Menyimpan seluruh kekayaan di dalam gudang tertutup'],a:1,t:'sulit',id:'C43'},
  {b:'C',n:44,q:'Dalam Surah An-Nasr diceritakan tentang pertolongan Allah dan kemenangan Islam (Fathu Makkah) sehingga manusia berbondong-bondong masuk agama Allah. Sikap yang diperintahkan kepada Nabi Muhammad SAW saat meraih kemenangan besar tersebut adalah...',o:['Mengadakan pesta perayaan mewah selama tujuh hari tujuh malam','Bertasbih memuji Allah dan memohon ampunan (beristighfar) kepada-Nya','Membalas dendam kepada seluruh penduduk Makkah yang dahulu memusuhinya','Berhenti berdakwah karena merasa tugasnya sudah selesai'],a:1,t:'sedang',id:'C44'},
  {b:'C',n:45,q:"Surah Al-Qari'ah menggambarkan dahsyatnya peristiwa hari kiamat di mana manusia bertebaran seperti laron yang beterbangan dan gunung-gunung hancur seperti...",o:['Air laut yang meluap ke daratan','Bulu-bulu yang dihambur-hamburkan','Pasir gurun yang tertiup badai','Batu karang yang tenggelam ke dasar bumi'],a:1,t:'sulit',id:'C45'},
  {b:'C',n:46,q:'Dalam Surah Az-Zalzalah ditegaskan bahwa pada hari kiamat bumi akan mengeluarkan seluruh beban beratnya dan manusia akan melihat balasan dari setiap perbuatannya meskipun hanya seberat...',o:['Biji kurma','Sebesar gunung Uhud','Dzarrah (biji sawi / atom terkecil)','Setetes air hujan'],a:2,t:'sedang',id:'C46'},
  {b:'C',n:47,q:"Surah urutan ke-4 dalam Al-Qur'an yang banyak membahas hukum keluarga, hak-hak perempuan, pembagian warisan, serta perlindungan terhadap anak yatim adalah...",o:['Surah Ali Imran','Surah An-Nisa','Surah Al-Maidah','Surah An-Nur'],a:1,t:'mudah',id:'C47'},
  {b:'C',n:48,q:"Surah urutan ke-9 dalam Al-Qur'an yang memiliki keunikan karena menjadi satu-satunya surah yang tidak diawali dengan bacaan Basmalah (Bismillahirrahmanirrahim) adalah...",o:['Surah Al-Anfal','Surah Yunus','Surah At-Taubah','Surah Hud'],a:2,t:'sedang',id:'C48'},
  {b:'C',n:49,q:"Surah urutan ke-17 dalam Al-Qur'an yang pada ayat pertamanya mengabadikan peristiwa perjalanan malam Nabi Muhammad SAW dari Masjidil Haram ke Masjidil Aqsa adalah...",o:['Surah An-Nahl','Surah Al-Isra','Surah Al-Kahfi','Surah Taha'],a:1,t:'mudah',id:'C49'},
  {b:'C',n:50,q:'Surah urutan ke-25 dalam Al-Qur\'an yang memiliki arti "Pembeda" (antara yang hak/benar dan yang batil/salah) adalah...',o:["Surah Al-Mu'minun",'Surah An-Nur','Surah Al-Furqan','Surah Al-Qashash'],a:2,t:'sedang',id:'C50'}
];

export const CRED = { u: 'Farhan', p: '21101011' };
export const TEACHER_PW = 'floweiko';

export const PROLOG = [
  {
    e: '🌙',
    t: 'Bismillah',
    ar: 'Dengan menyebut nama Allah Yang Maha Pengasih lagi Maha Penyayang',
    p: "Selamat datang, sahabat Qur'ani! Hari ini kita bermain sambil mencari ilmu."
  },
  {
    e: '🏙️',
    t: "Kota Qur'ani sedang terancam",
    p: 'Di tengah maraknya kejahatan di muka bumi, banyak pemuda dan pemudi Islam yang tersesat oleh pasukan kegelapan Hantu dan Iblis. Maka dengan adanya para Ustadz, kita akan melawan kegelapan dengan cahaya kebenaran.'
  },
  {
    e: '⚔️',
    t: 'Aturan main',
    p: 'Jawaban benar +100, salah −50, tidak terjawab −100. Tiap soal punya waktu. Ada Kartu Hikmah yang bisa menolongmu, dan jawab beruntun untuk menyalakan Istiqomah Frenzy.'
  },
  {
    e: '🤲',
    t: 'Luruskan niat',
    p: 'Menang atau kalah, yang terbaik adalah ilmu yang bertambah dan akhlak yang makin indah. Siap, pahlawan?'
  }
];

export const PES_B: [string, string][] = [
  ['🐘', 'Gajah Ceria'],
  ['🦒', 'Jerapah Riang'],
  ['🐬', 'Lumba-lumba'],
  ['🦜', 'Kakatua Pintar'],
  ['🐢', 'Penyu Sabar']
];

export const UMUM_B: [string, string, Tier][] = [
  ['🌟', 'Bintang Kejora', 'mudah'],
  ['🌈', 'Pelangi Pagi', 'mudah'],
  ['🏝️', 'Pulau Cemara', 'mudah'],
  ['🦅', 'Elang Tinggi', 'sedang'],
  ['🌋', 'Gunung Api', 'sedang'],
  ['🐋', 'Paus Biru', 'sedang'],
  ['🏔️', 'Puncak Salju', 'sulit'],
  ['🚀', 'Roket Bintang', 'sulit']
];

export const UMUM_SPEC: Record<Tier, Partial<Record<Tier, number>>> = {
  mudah: { mudah: 10 },
  sedang: { sedang: 10 },
  sulit: { sulit: 6, sedang: 4 }
};

export const TIER_L: Record<Tier, string> = {
  mudah: 'Mudah',
  sedang: 'Sedang',
  sulit: 'Sulit'
};

export const BOSS_SPECS: Partial<Record<Tier, number>>[] = [
  { mudah: 1, sedang: 3, sulit: 1 },
  { sedang: 4, sulit: 1 },
  { mudah: 1, sedang: 2, sulit: 2 }
];

export const ENDINGS = [
  {
    t: "Penjaga Cahaya Qur'ani",
    e: '👑',
    x: "Saat Iblis runtuh, langit kota terbelah oleh cahaya lembut. Namamu dibacakan di menara masjid sebagai penjaga cahaya Qur'ani. Anak-anak berbaris membawa mushaf kecil, dan untuk pertama kalinya kota itu hening, lalu bergemuruh doa syukur. Kamu tahu, kekuatan terbesarmu bukan jawaban yang cepat, tapi hati yang tetap belajar."
  },
  {
    t: 'Perisai Kota',
    e: '🛡️',
    x: 'Ketika Iblis mengamuk, kamulah yang berdiri paling depan. Setiap jawabanmu menjadi perisai bagi warga di belakang. Setelah badai reda, mereka membangun gerbang kota dan mengukir namamu di sana: Perisai Kota, pelindung yang sabar dan teguh.'
  },
  {
    t: 'Penjaga Gerbang Hikmah',
    e: '🗝️',
    x: 'Tanpa kamu, gerbang hikmah tak akan terbuka tepat waktu. Satu jawaban benarmu di saat genting memberi celah bagi tim untuk menang. Warga menyerahkan kunci perpustakaan kota kepadamu. Mulai hari ini, kamu penjaga ilmu bagi generasi berikutnya.'
  }
];

export const KELAS = ['TKA', 'TPA', 'Tadarrus'];

export interface ChatEntry {
  id: string;
  name: string;
  role: string;
  msg: string;
  at: number;
}

export const DEFAULT_CHAT: ChatEntry[] = [
  {
    id: 'init-1',
    name: 'Ustadz Farhan',
    role: 'Penggagas',
    msg: "Selamat datang di halaman Epilog! Silakan tulis kritik, saran, atau doa untuk pengembangan Cerdas Cermat Generasi Qur'ani.",
    at: Date.now() - 3600000
  },
  {
    id: 'init-2',
    name: 'TPA Al-Munawwarah',
    role: 'Pramuka',
    msg: "Semoga kegiatan belajar sambil bermain ini bermanfaat dan menumbuhkan cinta Al-Qur'an pada generasi muda.",
    at: Date.now() - 1800000
  }
];
