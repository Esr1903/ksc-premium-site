"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import {
  ArrowRight,
  BarChart3,
  Binary,
  Building2,
  CheckCircle2,
  ChevronRight,
  CloudCog,
  Cpu,
  DatabaseZap,
  EyeOff,
  FileLock2,
  Fingerprint,
  Gauge,
  HardDrive,
  Layers3,
  LockKeyhole,
  Mail,
  Radar,
  ScanLine,
  ShieldCheck,
  Sparkles,
  Target,
  Zap,
} from "lucide-react";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.68, ease: "easeOut" },
  },
};

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.08 } },
};

const navItems = [
  { label: "Problem", href: "#problem" },
  { label: "Çözüm", href: "#solution" },
  { label: "Ürün", href: "#product" },
  { label: "Kanıt", href: "#proof" },
  { label: "Kullanım", href: "#domains" },
  { label: "Pazar", href: "#market" },
  { label: "Rakip", href: "#competitor" },
  { label: "Yatırım", href: "#investment" },
];

const heroMetrics = [
  ["%10–70", "Düşük entropide küçülme hedefi"],
  ["%1–5", "Yüksek entropide sınırlı kayıp"],
  ["10–20 KB", "RAM hedefi"],
  ["TRL 4", "Deneysel kanıtlama"],
];

const proofRows = [
  { label: "1. kapsül", delta: "referans", rate: "—" },
  { label: "5. kapsül", delta: "+16.384 bayt", rate: "%0,009" },
  { label: "10. kapsül", delta: "+36.864 bayt", rate: "%0,0203" },
];

const problemCards = [
  {
    no: "01",
    title: "Boyut ve maliyet patlaması",
    copy: "Mevcut güvenlik çözümleri koruma sağlarken veri boyutunu artırabiliyor. Yüksek güvenlik, küçük dosya boyutu ve düşük işlem yükü çoğu yaklaşımda aynı anda sağlanamıyor.",
    icon: BarChart3,
  },
  {
    no: "02",
    title: "Metadata sızıntısı",
    copy: "İçerik okunamasa bile dosya türü, başlık, paket yapısı ve veri davranışı dışarıdan ipucu verebilir. KSC, yalnızca içeriği değil, veri temsilini de hedefler.",
    icon: EyeOff,
  },
  {
    no: "03",
    title: "IoT ve gömülü cihaz kısıtları",
    copy: "Milyarlarca cihaz düşük RAM, sınırlı işlem gücü ve düşük enerji bütçesiyle çalışır. Ağır güvenlik katmanları bu cihazlarda pratik olmayabilir.",
    icon: Cpu,
  },
  {
    no: "04",
    title: "Tekdüze çıktı davranışı",
    copy: "Tanıdık formatlar, sabit yapılar ve öngörülebilir çıktı davranışları desen tanıma riskini artırır. KSC, kapsül davranışını daha kontrollü hale getirir.",
    icon: Layers3,
  },
  {
    no: "05",
    title: "Dağınık güvenlik zinciri",
    copy: "Sıkıştırma, şifreleme ve kapsülleme ayrı araçlarla yapıldığında yönetim karmaşası ve operasyonel maliyet artar. KSC bu akışı tek veri katmanında toplar.",
    icon: FileLock2,
  },
];

const solutionCards = [
  {
    title: "Kontrollü kapsülleme",
    copy: "Hassas veri, tek tip ve kontrollü bir kapsül davranışına taşınır. Mekanizmanın detayları açık edilmeden değer önerisi net biçimde anlatılır.",
    icon: LockKeyhole,
  },
  {
    title: "Boyut davranışı kontrolü",
    copy: "Düşük entropili verilerde küçülme; yüksek entropili verilerde sınırlı artış hedeflenir. Güvenlik operasyonel maliyete dönüşmez.",
    icon: Gauge,
  },
  {
    title: "Başlık ve parametre koruması",
    copy: "Kapsülün çözüm bilgileri, kontrol parametreleri ve kritik yapı taşları dışarıdan okunabilir halde bırakılmaz.",
    icon: ShieldCheck,
  },
  {
    title: "Düşük kaynak uyumu",
    copy: "IoT, gömülü sistemler, uç bilişim ve kısıtlı cihazlar için yazılım tabanlı tamamlayıcı güvenlik katmanı olarak konumlanır.",
    icon: Cpu,
  },
];

const productTabs = [
  {
    id: "sdk",
    label: "API / SDK",
    title: "Yazılım kütüphanesi olarak entegrasyon",
    copy: "C, C++, Rust ve Python gibi diller için planlanan SDK yapısı sayesinde KSC; geliştiricilerin kendi ürünlerine entegre edebileceği bir güvenli kapsülleme bileşeni olarak sunulabilir.",
    badge: "Developer ecosystem · Lisanslanabilir çekirdek",
  },
  {
    id: "cli",
    label: "CLI",
    title: "Platformlar arası teknik doğrulama aracı",
    copy: "Linux, macOS ve Windows üzerinde çalışabilecek CLI aracı; geliştiriciler ve teknik ekipler için hızlı test, PoC ve entegrasyon doğrulama deneyimi sağlar.",
    badge: "PoC · Test · Teknik doğrulama",
  },
  {
    id: "gui",
    label: "GUI",
    title: "Kurumsal kullanıcı için sade masaüstü deneyimi",
    copy: "Sürükle-bırak mantığında çalışan arayüz; teknik olmayan ekiplerin dosya seçip güvenli kapsül çıktısı üretmesine olanak verir.",
    badge: "Kolay benimseme · Kurumsal kullanım",
  },
  {
    id: "oem",
    label: "OEM",
    title: "Cihaz üreticileri için entegre güvenlik katmanı",
    copy: "IoT ve gömülü cihaz üreticileri, KSC çekirdeğini ürün yazılımlarına entegre ederek cihaz başına lisans modeliyle ölçeklenebilir gelir kanalı oluşturabilir.",
    badge: "Firmware · Cihaz başı lisans · OEM",
  },
  {
    id: "saas",
    label: "SaaS / On-Prem",
    title: "Kurumsal panel ve yönetilen servis modeli",
    copy: "Büyük kurumlar için on-premise dağıtım; küçük ve orta ölçekli ekipler için SaaS paneli planlanabilir. API kullanımı, kapsül geçmişi ve erişim politikaları tek panelden yönetilebilir.",
    badge: "Enterprise · SaaS · Yönetim paneli",
  },
];

const comparisonRows = [
  ["Birincil işlev", "Koruma + sıkıştırma + kapsülleme", "Disk/bölüm şifreleme", "Dosya şifreleme", "Sıkıştırma, opsiyonel şifreleme", "Donanım güvenlik çekirdeği"],
  ["Çıktı boyutu", "Düşük entropide küçülme; yüksek entropide sınırlı artış", "Container ek yükü", "Kısmi artış", "Küçülür fakat güvenlik sınırlı", "Boyut odaklı değil"],
  ["Metadata yaklaşımı", "Başlık ve parametre gizleme hedefi", "Kısmi", "Sınırlı", "Arşiv yapısı tanınabilir", "Amaç dışı"],
  ["Kaynak kısıtlı cihaz", "Yazılım tabanlı hafif çekirdek hedefi", "Masaüstü/sunucu", "Masaüstü/bulut", "Masaüstü", "Donanım gerektirir"],
  ["Dağıtım modeli", "SDK, CLI, GUI, OEM, SaaS", "Uygulama", "SaaS + istemci", "Uygulama", "Silikon/IP lisansı"],
];

const domains = [
  { title: "Savunma & Havacılık", copy: "Görev dosyaları, telemetri, aviyonik kayıtlar ve platformlar arası hassas veri aktarımı.", icon: Radar },
  { title: "FinTech & Bankacılık", copy: "Finansal işlem geçmişleri, müşteri kayıtları, kredi skorlama çıktıları ve regülasyon dosyaları.", icon: Building2 },
  { title: "IoT & Akıllı Şehir", copy: "Sensör ağları, firmware paketleri, cihaz logları ve düşük kaynaklı uç cihazlar.", icon: Cpu },
  { title: "Bulut, IT & DevOps", copy: "Kurumsal arşivler, yedekleme paketleri, CI/CD çıktıları ve konfigürasyon dosyaları.", icon: CloudCog },
  { title: "Adli Bilişim", copy: "Dijital deliller, imaj dosyaları, olay yeri kayıtları ve zincirleme muhafaza süreçleri.", icon: FileLock2 },
  { title: "Endüstri 4.0", copy: "SCADA/PLC kayıtları, üretim reçeteleri, kalite kontrol verileri ve makine çalışma logları.", icon: HardDrive },
  { title: "Sağlık & Biyomedikal", copy: "Hasta kayıtları, laboratuvar sonuçları, klinik araştırma verileri ve tıbbi görüntüleme çıktıları.", icon: DatabaseZap },
  { title: "Yapay Zekâ & Ar-Ge", copy: "Model ağırlıkları, eğitim setleri, deney sonuçları ve araştırma veri transferleri.", icon: Binary },
];

const domainDetails = [
  {
    headline: "Görev kritik veri akışlarında güvenli kapsülleme",
    pains: ["Görev dosyası, telemetri ve bakım verilerinin sızması", "Platformlar arası hassas veri aktarımında iz bırakma riski", "Operasyon sonrası analiz paketlerinin korunması"],
    gains: ["Taktik veri paketleri tek tip kapsül davranışına taşınır", "Depolama ve aktarım süreçlerinde ek gizlilik katmanı oluşur", "Bütünlük kontrolüyle kurcalama riski azaltılır"],
    examples: ["İHA/SİHA görev logları", "Aviyonik bakım kayıtları", "Yer istasyonu veri paketleri"],
  },
  {
    headline: "Finansal kayıtlar için iz azaltan güvenli paketleme",
    pains: ["Müşteri verisi ve işlem geçmişlerinin hassasiyeti", "Regülasyon ve saklama yükümlülükleri", "Kurumlar arası veri transferinde güven ihtiyacı"],
    gains: ["Finansal veri setleri güvenli kapsül formatında taşınır", "Kredi skorlama ve risk analizi çıktıları korunur", "Arşivleme ve transfer süreçlerine ek güvenlik katmanı eklenir"],
    examples: ["Banka logları", "Sigorta dosyaları", "Kredi skorlama çıktıları"],
  },
  {
    headline: "Kaynak kısıtlı cihazlarda hafif güvenlik katmanı",
    pains: ["IoT cihazlarında sınırlı işlem gücü", "Firmware ve sensör verilerinin kolay ele geçirilmesi", "Cihazlar arası veri alışverişinde bütünlük riski"],
    gains: ["Sensör verileri ve güncelleme paketleri kapsüllenebilir", "Cihaz kimliği ve veri bütünlüğü süreçleri desteklenir", "Düşük kaynaklı sistemlerde daha kontrollü veri akışı hedeflenir"],
    examples: ["Akıllı şehir sensörleri", "Firmware paketleri", "Cihaz logları"],
  },
  {
    headline: "Kurumsal arşiv ve DevOps çıktıları için kontrollü kapsülleme",
    pains: ["Yedekleme paketlerinde veri türünün anlaşılması", "Konfigürasyon ve gizli anahtar dosyalarının korunması", "CI/CD çıktılarında bütünlük ve izlenebilirlik"],
    gains: ["Arşivler yüksek belirsizlikli kapsül çıktısına taşınır", "Kapalı sistemlerde sürüm dosyaları güvenli taşınır", "Kritik yapılandırma paketleri ek koruma kazanır"],
    examples: ["CI/CD paketleri", "Kurumsal yedekler", "Konfigürasyon dosyaları"],
  },
  {
    headline: "Dijital delillerde bütünlük ve zincirleme muhafaza",
    pains: ["Delil bütünlüğünün mahkemede kanıtlanması", "İmaj ve olay yeri kayıtlarının korunması", "Yetkisiz erişim veya kontaminasyon riski"],
    gains: ["Dijital deliller kapsül içinde saklanabilir", "Kurcalama algısı ve bütünlük kontrolü desteklenir", "Analiz çıktıları güvenli arşivlenebilir"],
    examples: ["Adli bilişim imajları", "Olay yeri kayıtları", "Kriminal analiz çıktıları"],
  },
  {
    headline: "Üretim verisinin güvenli saklanması ve paylaşılması",
    pains: ["SCADA/PLC kayıtlarının yetkisiz erişime açık olması", "Üretim reçetesi ve kalite verilerinin kritikliği", "OT/IT entegrasyonunda güvenlik boşlukları"],
    gains: ["Üretim ve bakım logları güvenli kapsüllenir", "Tedarik zinciri veri paylaşımı daha kontrollü hale gelir", "Otomasyon sistemlerinde veri bütünlüğü desteklenir"],
    examples: ["PLC/SCADA kayıtları", "Üretim reçeteleri", "Makine çalışma logları"],
  },
  {
    headline: "Sağlık verileri için gizlilik ve erişilebilirlik dengesi",
    pains: ["Hasta kayıtlarının en hassas veri türlerinden olması", "Tıbbi görüntüleme ve laboratuvar çıktılarının korunması", "KVKK/GDPR/HIPAA benzeri uyum ihtiyaçları"],
    gains: ["Hasta ve klinik veri setleri güvenli kapsüllenebilir", "Paylaşım sırasında veri türü ve içerik izi azaltılır", "Uzun süreli arşivleme için ek bütünlük katmanı oluşur"],
    examples: ["E-sağlık kayıtları", "Tıbbi görüntüler", "Laboratuvar sonuçları"],
  },
  {
    headline: "Model, veri seti ve Ar-Ge çıktılarında fikri varlık koruması",
    pains: ["Model ağırlıkları ve deney sonuçlarının kopyalanması", "Araştırma veri setlerinin kurumlar arası paylaşımı", "Özel veri setlerinde izinsiz analiz riski"],
    gains: ["Model ve deney çıktıları tek tip kapsül formatına taşınır", "Ar-Ge verilerinin dışarıdan anlaşılması zorlaştırılır", "Üniversite ve araştırma merkezi transferleri desteklenir"],
    examples: ["Model ağırlıkları", "Eğitim veri setleri", "Deney sonuçları"],
  },
];

const marketCards = [
  { title: "Siber Güvenlik", value: "$274Md", desc: "2030 projeksiyonunda $478Md bandına ilerleyen ana pazar." },
  { title: "IoT Güvenliği", value: "$11.2Md", desc: "Yüksek CAGR ile en hızlı büyüyen alt segmentlerden biri." },
  { title: "Veri Sıkıştırma", value: "$1.5Md", desc: "Bulut, medya, analitik ve yapay zekâ veri hacmiyle büyüyen segment." },
  { title: "Gömülü Güvenlik", value: "$10Md", desc: "Uç bilişim, otonom sistemler ve tıbbi cihazlarla genişleyen alan." },
];

const tamSamSom = [
  {
    code: "TAM",
    title: "Toplam Erişilebilir Pazar",
    value: "$150Md+",
    desc: "Siber güvenlik, IoT güvenliği, veri sıkıştırma ve gömülü sistem güvenliği pazarlarının toplamı. KSC’nin teorik olarak temas edebileceği maksimum pazar alanıdır.",
  },
  {
    code: "SAM",
    title: "Hizmet Verilebilir Erişilebilir Pazar",
    value: "$40–50Md",
    desc: "KSC’nin coğrafi, teknik ve segment odağıyla gerçekten ulaşabileceği pazar dilimi. IoT güvenliği ve siber güvenlik yazılımı kesişim segmentidir.",
  },
  {
    code: "SOM",
    title: "Hizmet Verilebilir Elde Edilebilir Pazar",
    value: "$400M–$1.5Md",
    desc: "İlk 3–5 yılda %1–3 penetrasyon hedefi. Erken müşteri segmenti: fintech, savunma sanayi ve IoT OEM pazarları.",
  },
];

const competitorCards = [
  {
    tag: "Disk & Dosya Şifreleme",
    title: "VeraCrypt, AxCrypt, NordLocker",
    copy: "Güvenilir ve olgunlaşmış şifreleme araçlarıdır. Ancak çoğu veri boyutunu küçültmez, metadata sızıntısını doğrudan çözmez ve IoT/gömülü sistemlerde doğal olarak çalışacak hafif bir kapsülleme katmanı sunmaz. KSC bu ürünlere doğrudan rakip değil; onların yetmediği veri katmanında devreye giren tamamlayıcı bir sınıftır.",
  },
  {
    tag: "Dosya Sıkıştırma",
    title: "WinRAR, 7-Zip, PeaZip, WinZip",
    copy: "Milyarlarca kullanıcının güvendiği arşivleme araçlarıdır. Boyutu küçültürler fakat güvenlik ana değer önerileri değildir; arşiv başlıkları ve format yapıları tanınabilir kalabilir. KSC’nin iddiası yalnızca sıkıştırmak değil, sıkıştırırken aynı anda anlamlandırılması zor bir kapsül davranışı oluşturmaktır.",
  },
  {
    tag: "Kurumsal Veri Güvenliği",
    title: "Symantec Endpoint Security, ESET, Bitdefender GravityZone",
    copy: "Kapsamlı uç nokta güvenlik platformlarıdır. Kötü amaçlı yazılım, tehdit tespiti ve şifreleme politikalarını yönetirler; ancak veri boyutunu küçültme ve kaynak kısıtlı cihazlarda hafif kapsülleme üretme odağında değildirler. KSC, bu platformların işlemediği veri temsil katmanında konumlanır.",
  },
  {
    tag: "Donanım Tabanlı IoT Güvenliği",
    title: "Rambus CryptoManager, Infineon Optiga, NXP EdgeLock",
    copy: "Silikon seviyesinde güvenlik sağlayan donanım IP ve çip çözümleridir. Son derece güçlüdür; ancak özel donanım entegrasyonu gerektirir. KSC ise mevcut cihazlara donanım değişikliği olmadan yazılım tabanlı ek güvenlik getirmeyi hedefler.",
  },
];

const investmentUse = [
  { pct: "%35", title: "Algoritma Geliştirme & Sertifikasyon", copy: "Patent başvuruları, FIPS 140-3 sertifikası, Native C/Rust/Python SDK geliştirme ve güvenlik denetimleri." },
  { pct: "%30", title: "Pazar Girişi / Go-to-Market", copy: "ABD, AB, Körfez ve Türkiye’de satış ekibi kurulumu, pazarlama, fuarlar ve ilk pilot anlaşmalar." },
  { pct: "%20", title: "Gömülü Sistem & OEM Entegrasyonu", copy: "ARM Cortex-M, ESP32, RISC-V optimizasyonu, gömülü sistem mühendisliği ve OEM özel entegrasyonları." },
  { pct: "%15", title: "İş Geliştirme & Yönetim", copy: "Yasal, muhasebe, ofis giderleri, yönetim ekibi maaşları ve acil durum fonu." },
];

const roadmap = [
  { period: "2025–2026 H1", phase: "Mevcut durum", title: "Teorik temel ve prototip", bullets: ["Algoritmik yaklaşım doğrulandı", "CLI prototip seviyesi oluşturuldu", "İlk laboratuvar testleri tamamlandı", "TRL 4 seviyesine geçiş hedeflendi"] },
  { period: "2026 H2", phase: "MVP", title: "Çekirdek ürün ve test altyapısı", bullets: ["SDK mimarisi netleştirilir", "Daha geniş dosya tipi testleri yapılır", "Kanıt paneli ve demo akışı hazırlanır", "PoC görüşmeleri başlatılır"] },
  { period: "2027", phase: "Pilot", title: "Sektörel PoC ve kurumsal doğrulama", bullets: ["FinTech, IoT, savunma ve adli bilişim senaryoları test edilir", "On-premise kurulum ve CLI/GUI deneyimi geliştirilir", "İlk kurumsal pilotlar hedeflenir"] },
  { period: "2028+", phase: "Scale", title: "Ticarileşme ve ölçeklenme", bullets: ["OEM entegrasyonu", "Kurumsal lisans modeli", "SaaS panel", "Uluslararası partner ağı"] },
];

function NoiseLayer() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 opacity-[0.055] mix-blend-screen"
      style={{
        backgroundImage:
          "url('data:image/svg+xml,%3Csvg viewBox=%220 0 180 180%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.75%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22 opacity=%221%22/%3E%3C/svg%3E')",
      }}
    />
  );
}

function GlowLink({ href, children, variant = "primary" }: { href: string; children: React.ReactNode; variant?: "primary" | "ghost" }) {
  return (
    <a
      href={href}
      className={
        variant === "primary"
          ? "group relative inline-flex overflow-hidden rounded-full bg-lime-300 px-6 py-3 text-sm font-semibold text-black shadow-[0_0_45px_rgba(190,242,100,0.28)] transition hover:scale-[1.02]"
          : "group relative inline-flex overflow-hidden rounded-full border border-white/10 bg-white/[0.035] px-6 py-3 text-sm font-semibold text-white/90 backdrop-blur-xl transition hover:border-lime-300/40 hover:text-lime-200"
      }
    >
      <span className="absolute inset-y-0 -left-1/2 w-1/3 skew-x-[-20deg] bg-white/45 opacity-0 blur-md transition-all duration-700 group-hover:left-[130%] group-hover:opacity-100" />
      <span className="relative flex items-center gap-2">{children}</span>
    </a>
  );
}

function SectionHeader({ eyebrow, title, copy }: { eyebrow: string; title: string; copy?: string }) {
  return (
    <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-120px" }}>
      <motion.p variants={fadeUp} className="text-sm font-semibold uppercase tracking-[0.35em] text-lime-200/80">
        {eyebrow}
      </motion.p>
      <motion.h2 variants={fadeUp} className="mt-4 max-w-5xl text-4xl font-semibold tracking-[-0.045em] text-white md:text-6xl">
        {title}
      </motion.h2>
      {copy ? <motion.p variants={fadeUp} className="mt-5 max-w-3xl text-base leading-8 text-white/55">{copy}</motion.p> : null}
    </motion.div>
  );
}

function Hero() {
  return (
    <section id="top" className="relative min-h-screen overflow-hidden px-6 pt-8 text-white">
      <div className="absolute left-[-12%] top-[-16%] h-[520px] w-[520px] rounded-full bg-lime-300/10 blur-[120px]" />
      <div className="absolute right-[-10%] top-[20%] h-[520px] w-[520px] rounded-full bg-cyan-300/10 blur-[130px]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:80px_80px] [mask-image:radial-gradient(circle_at_center,black,transparent_72%)]" />

      <nav className="relative z-10 mx-auto flex max-w-7xl items-center justify-between rounded-full border border-white/10 bg-white/[0.035] px-4 py-3 backdrop-blur-2xl">
        <a href="#top" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-lime-300 text-black shadow-[0_0_28px_rgba(190,242,100,0.45)]"><Fingerprint className="h-5 w-5" /></div>
          <span className="text-sm font-semibold tracking-[0.28em] text-white/90">KSC</span>
        </a>
        <div className="hidden items-center gap-7 text-sm text-white/60 xl:flex">
          {navItems.map((item) => <a key={item.href} href={item.href} className="transition hover:text-lime-200">{item.label}</a>)}
        </div>
        <GlowLink href="#proof" variant="ghost">Kanıtları gör</GlowLink>
      </nav>

      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-12 py-20 md:grid-cols-[1.08fr_0.92fr] md:py-28">
        <motion.div variants={stagger} initial="hidden" animate="show">
          <motion.div variants={fadeUp} className="mb-5 inline-flex items-center gap-2 rounded-full border border-lime-300/20 bg-lime-300/10 px-4 py-2 text-xs font-medium text-lime-100 shadow-[0_0_30px_rgba(190,242,100,0.08)]"><ScanLine className="h-4 w-4" /> Secure Encapsulation · TRL 4 · Investor Ready</motion.div>
          <motion.h1 variants={fadeUp} className="max-w-5xl text-5xl font-semibold tracking-[-0.06em] text-white md:text-7xl lg:text-8xl">Veriyi <span className="bg-gradient-to-r from-lime-200 via-white to-cyan-200 bg-clip-text text-transparent">katmanlı korurken</span> boyut davranışını kontrol altında tut.</motion.h1>
          <motion.p variants={fadeUp} className="mt-7 max-w-2xl text-lg leading-8 text-white/65">KSC, geleneksel şifreleme ve kapsülleme yaklaşımlarının en kritik sorunlarından biri olan çıktı boyutu ve metadata izini hedefleyen; kontrollü sıkıştırma, entropi odaklı koruma ve güvenli kapsülleme fikrini birleştiren yazılım tabanlı bir veri güvenliği yaklaşımıdır.</motion.p>
          <motion.div variants={fadeUp} className="mt-9 flex flex-col gap-3 sm:flex-row"><GlowLink href="#investment">Yatırım detayları <ArrowRight className="h-4 w-4" /></GlowLink><GlowLink href="#product" variant="ghost">Teknolojiyi incele</GlowLink></motion.div>
          <motion.div variants={fadeUp} className="mt-10 grid max-w-3xl gap-3 sm:grid-cols-4">
            {heroMetrics.map(([num, label]) => <div key={label} className="rounded-3xl border border-white/10 bg-white/[0.045] p-4 backdrop-blur-xl transition hover:-translate-y-1 hover:border-lime-300/25"><div className="text-2xl font-semibold text-lime-200">{num}</div><div className="mt-1 text-xs text-white/45">{label}</div></div>)}
          </motion.div>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, ease: "easeOut" }} className="relative">
          <div className="absolute inset-0 rounded-full bg-lime-300/10 blur-[90px]" />
          <div className="relative rounded-[2.5rem] border border-white/10 bg-white/[0.045] p-6 shadow-[0_40px_140px_rgba(0,0,0,0.55)] backdrop-blur-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-4"><span className="font-mono text-xs text-lime-200">KSC CAPSULE</span><LockKeyhole className="h-5 w-5 text-lime-200" /></div>
            <div className="mt-8 space-y-4">
              {["Header sealed", "Tamper aware", "Low overhead", "Non-obvious output"].map((item, idx) => <div key={item} className="rounded-2xl border border-white/10 bg-black/25 p-4"><div className="mb-2 flex items-center justify-between text-sm"><span>{item}</span><span className="text-lime-200">0{idx + 1}</span></div><div className="h-2 overflow-hidden rounded-full bg-white/10"><motion.div initial={{ width: 0 }} animate={{ width: `${65 + idx * 8}%` }} transition={{ duration: 1.1, delay: 0.2 + idx * 0.12 }} className="h-full rounded-full bg-lime-300" /></div></div>)}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function IntroVideoSection() {
  return (
    <section id="intro-video" className="mx-auto max-w-7xl px-6 py-16 text-white md:py-24">
      <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} className="grid items-center gap-8 rounded-[2.5rem] border border-white/10 bg-white/[0.035] p-5 shadow-[0_35px_140px_rgba(0,0,0,0.35)] backdrop-blur-2xl md:grid-cols-[0.92fr_1.08fr] md:p-8 lg:p-10">
        <motion.div variants={fadeUp} className="max-w-xl">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-lime-200/80">Product Preview</p>
          <h2 className="mt-4 text-4xl font-semibold tracking-[-0.045em] text-white md:text-5xl lg:text-6xl">KSC’nin değerini bir dakikada görün.</h2>
          <p className="mt-5 text-base leading-8 text-white/58">Hassas verinin yalnızca korunması değil, dışarıdan anlamlandırılmasının da zorlaştırılması neden önemlidir? Kısa tanıtım videosu, problemi ve KSC’nin değer önerisini teknik detaya girmeden özetler.</p>
          <div className="mt-7 grid gap-3 sm:grid-cols-2">{["Problem ve çözüm akışı", "Kanıt odaklı ürün anlatımı", "Sektörel kullanım fikri", "Demo / PoC ön izlemesi"].map((item) => <div key={item} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/25 px-4 py-3 text-sm text-white/65"><CheckCircle2 className="h-4 w-4 shrink-0 text-lime-200" />{item}</div>)}</div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row"><GlowLink href="#proof">Kanıtları incele <ArrowRight className="h-4 w-4" /></GlowLink><GlowLink href="#domains" variant="ghost">Kullanım alanları</GlowLink></div>
        </motion.div>
        <motion.div variants={fadeUp} className="relative">
          <div className="absolute -inset-4 rounded-[2.2rem] bg-lime-300/10 blur-2xl" />
          <div className="relative overflow-hidden rounded-[2rem] border border-lime-300/20 bg-black/50 p-2 shadow-[0_28px_100px_rgba(0,0,0,0.5)]">
            <video className="aspect-video w-full rounded-[1.55rem] object-cover" src="/ksc-intro.mp4" controls autoPlay muted loop playsInline poster="/ksc-video-poster.png" />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

function ProblemSection() {
  return (
    <section id="problem" className="mx-auto max-w-7xl px-6 py-24 text-white md:py-32">
      <SectionHeader eyebrow="01 — Problem" title="Mevcut güvenlik paradigmasının kırık noktaları" copy="Güvenlik artışı çoğu zaman veri boyutu, işlem yükü ve yönetim karmaşası olarak geri döner. KSC’nin çıkış noktası, bu dengeyi yeniden kurmaya çalışan tamamlayıcı bir veri işleme katmanı oluşturmaktır." />
      <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        {problemCards.map((item) => { const Icon = item.icon; return <motion.article key={item.title} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="group rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-2xl transition hover:-translate-y-1 hover:border-lime-300/25"><div className="flex items-center justify-between"><span className="font-mono text-xs text-lime-200/70">{item.no}</span><Icon className="h-5 w-5 text-lime-200" /></div><h3 className="mt-8 text-xl font-semibold">{item.title}</h3><p className="mt-3 text-sm leading-7 text-white/55">{item.copy}</p></motion.article>; })}
      </div>
    </section>
  );
}

function SolutionSection() {
  return (
    <section id="solution" className="mx-auto max-w-7xl px-6 py-24 text-white md:py-32">
      <SectionHeader eyebrow="02 — Çözüm" title="Sıkıştırma ve korumayı ayrı süreçler olmaktan çıkaran kapalı kapsülleme yaklaşımı" copy="KSC, ürün çekirdeğinin teknik ayrıntılarını açık etmeyen; ancak güvenlik, boyut kontrolü, metadata izi ve düşük kaynak uyumu gibi değerleri net anlatan bir çözüm olarak konumlanır." />
      <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {solutionCards.map((card) => { const Icon = card.icon; return <motion.article key={card.title} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.045] p-6 backdrop-blur-2xl"><div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-lime-300/70 via-cyan-200/30 to-transparent" /><Icon className="h-8 w-8 text-lime-200" /><h3 className="mt-8 text-xl font-semibold">{card.title}</h3><p className="mt-3 text-sm leading-7 text-white/55">{card.copy}</p></motion.article>; })}
      </div>
    </section>
  );
}

function ProductSection() {
  const [tab, setTab] = useState(productTabs[0]);
  return (
    <section id="product" className="mx-auto max-w-7xl px-6 py-24 text-white md:py-32">
      <SectionHeader eyebrow="03 — Ürün & Teknoloji" title="Çok katmanlı ticari sunum modeli" copy="KSC; geliştirici kütüphanesinden kurumsal dağıtıma, komut satırı aracından OEM entegrasyonuna kadar farklı müşteri segmentlerine göre paketlenebilir." />
      <div className="mt-10 flex flex-wrap gap-3">{productTabs.map((item) => <button key={item.id} type="button" onClick={() => setTab(item)} className={`rounded-full border px-5 py-2 text-sm transition ${tab.id === item.id ? "border-lime-300 bg-lime-300 text-black" : "border-white/10 bg-white/[0.04] text-white/60 hover:border-lime-300/30 hover:text-lime-200"}`}>{item.label}</button>)}</div>
      <motion.div key={tab.id} initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }} className="mt-6 rounded-[2.5rem] border border-white/10 bg-white/[0.045] p-8 shadow-[0_30px_120px_rgba(0,0,0,0.35)] backdrop-blur-2xl">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-lime-200/70">{tab.label}</p>
        <h3 className="mt-4 text-3xl font-semibold tracking-[-0.04em] md:text-5xl">{tab.title}</h3>
        <p className="mt-5 max-w-3xl text-base leading-8 text-white/58">{tab.copy}</p>
        <div className="mt-8 inline-flex rounded-full border border-lime-300/20 bg-lime-300/10 px-4 py-2 font-mono text-xs text-lime-200">{tab.badge}</div>
      </motion.div>
    </section>
  );
}

function ComparisonSection() {
  return (
    <section id="comparison" className="mx-auto max-w-7xl px-6 py-24 text-white md:py-32">
      <SectionHeader eyebrow="04 — Teknik Karşılaştırma" title="Rakip yaklaşımlara karşı konumlandırma" copy="KSC; klasik şifreleme, sıkıştırma ve donanım güvenlik çözümlerinin yanına eklenen tamamlayıcı bir katman olarak anlatılır. Değer önerisi, güvenlik ve boyut davranışını tek ürün deneyiminde birleştirmesidir." />
      <div className="mt-12 overflow-x-auto rounded-[2rem] border border-white/10 bg-white/[0.04] backdrop-blur-2xl">
        <table className="min-w-[1000px] w-full text-left text-sm">
          <thead className="bg-lime-300/10 text-lime-200"><tr>{["Teknik özellik", "KSC", "VeraCrypt", "AxCrypt", "WinRAR / 7-Zip", "Donanım güvenliği"].map((h) => <th key={h} className="px-5 py-4 font-semibold">{h}</th>)}</tr></thead>
          <tbody>{comparisonRows.map((row) => <tr key={row[0]} className="border-t border-white/10 text-white/58 hover:bg-white/[0.03]">{row.map((cell, idx) => <td key={idx} className={`px-5 py-4 align-top ${idx === 1 ? "font-semibold text-lime-200" : ""}`}>{cell}</td>)}</tr>)}</tbody>
        </table>
      </div>
    </section>
  );
}

function ProofSection() {
  return (
    <section id="proof" className="mx-auto max-w-7xl px-6 py-24 text-white md:py-32">
      <SectionHeader eyebrow="05 — Proof Layer" title="Kanıt: KSC kapsülü tekrar işlense bile boyut artışı çok düşük seviyede kalır." copy="Gerçek test çıktılarından alınan görseller, kaynak .db dosyasının KSC kapsülüne dönüşümünü ve 1., 5. ve 10. kapsülleme sonucunda disk boyutu davranışını gösterir." />
      <div className="mt-12 grid gap-5">
        {[["/ksc-proof-overview.png", "KSC boyut verimliliği ve recursive kapsülleme kanıt görseli"], ["/ksc-proof-details.png", "1., 5. ve 10. kapsülleme dosya boyutu karşılaştırma görseli"]].map(([src, alt]) => <motion.div key={src} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="overflow-hidden rounded-[2rem] border border-lime-300/20 bg-black/40 p-3 shadow-[0_30px_120px_rgba(0,0,0,0.5)] backdrop-blur-2xl"><img src={src} alt={alt} className="w-full rounded-[1.5rem] border border-white/10 object-cover" /></motion.div>)}
        <div className="grid gap-4 lg:grid-cols-[1fr_0.9fr]">
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl"><h3 className="text-2xl font-semibold">Ölçüm okuması</h3><p className="mt-3 text-sm leading-7 text-white/55">1. kapsülleme referans alındığında 5. kapsülleme sonucunda yalnızca 16.384 bayt, 10. kapsülleme sonucunda ise 36.864 bayt ek artış görülür. Bu davranış, tekrar kapsülleme senaryolarında boyut artışının kontrollü kaldığını gösterir.</p><div className="mt-6 grid gap-3 sm:grid-cols-3">{proofRows.map((r) => <div key={r.label} className="rounded-2xl border border-white/10 bg-black/25 p-4"><p className="text-xs text-white/45">{r.label}</p><p className="mt-2 text-lg font-semibold text-lime-200">{r.delta}</p><p className="mt-1 text-xs text-white/55">{r.rate}</p></div>)}</div></div>
          <div className="rounded-[2rem] border border-lime-300/15 bg-[radial-gradient(circle_at_15%_20%,rgba(190,242,100,0.16),rgba(255,255,255,0.035)_45%,rgba(0,0,0,0.25))] p-6 backdrop-blur-xl"><h3 className="text-2xl font-semibold">Neden güçlü kanıt?</h3><div className="mt-5 space-y-3 text-sm leading-6 text-white/60">{["Kaynak dosya .db iken çıkış tek tip .ksc kapsülü olarak görünür.", "1., 5. ve 10. işlem çıktıları doğrudan dosya özellikleriyle gösterilir.", "Boyut artışı bayt ve yüzde değerleriyle ölçülebilir hale gelir.", "Bu sonuç, yatırımcıya teknik yapılabilirlik; müşteriye operasyonel fayda gösterir."].map((item) => <div key={item} className="flex gap-3"><CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-lime-200" />{item}</div>)}</div></div>
        </div>
      </div>
    </section>
  );
}

function DomainsSection() {
  const [active, setActive] = useState(0);
  const current = domains[active];
  const detail = domainDetails[active];
  const Icon = current.icon;

  return (
    <section id="domains" className="mx-auto max-w-7xl px-6 py-24 text-white md:py-32">
      <SectionHeader eyebrow="06 — Use Cases" title="Verinin türünün bile hassas olduğu alanlarda tamamlayıcı güvenlik katmanı" copy="Bir sektör seçin; detay panelinde o alandaki müşteri problemi, KSC’nin değer önerisi ve örnek veri tipleri gösterilir." />
      <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {domains.map((sector, index) => { const CardIcon = sector.icon; const isActive = index === active; return <motion.button key={sector.title} type="button" onMouseEnter={() => setActive(index)} onFocus={() => setActive(index)} onClick={() => setActive(index)} className={`group relative min-h-[310px] overflow-hidden rounded-[2rem] border p-6 text-left transition ${isActive ? "border-lime-300/45 bg-lime-300/[0.09] shadow-[0_0_60px_rgba(190,242,100,0.08)]" : "border-white/10 bg-white/[0.035] hover:border-lime-300/25"}`} whileHover={{ y: -8 }}><CardIcon className="relative h-9 w-9 text-lime-200" /><h3 className="relative mt-16 text-2xl font-semibold tracking-[-0.03em]">{sector.title}</h3><p className="relative mt-4 text-sm leading-7 text-white/55">{sector.copy}</p><div className="absolute bottom-5 left-6 right-6 flex items-center justify-between border-t border-white/10 pt-4 text-xs text-white/45"><span>{isActive ? "Detay paneli açık" : "Detayı göster"}</span><ArrowRight className={`h-4 w-4 transition ${isActive ? "translate-x-1 text-lime-200" : "group-hover:translate-x-1 group-hover:text-lime-200"}`} /></div></motion.button>; })}
      </div>
      <motion.div key={current.title} initial={{ opacity: 0, y: 24, filter: "blur(8px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} transition={{ duration: 0.45, ease: "easeOut" }} className="mt-8 overflow-hidden rounded-[2.5rem] border border-lime-300/20 bg-[radial-gradient(circle_at_10%_10%,rgba(190,242,100,0.16),rgba(255,255,255,0.04)_42%,rgba(0,0,0,0.26))] p-6 shadow-[0_35px_140px_rgba(0,0,0,0.45)] backdrop-blur-2xl md:p-8">
        <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
          <div><div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-lime-300/25 bg-lime-300/10 text-lime-200"><Icon className="h-7 w-7" /></div><p className="mt-6 text-sm font-semibold uppercase tracking-[0.32em] text-lime-200/80">Selected Domain</p><h3 className="mt-3 text-4xl font-semibold tracking-[-0.04em]">{current.title}</h3><p className="mt-4 text-base leading-8 text-white/58">{detail.headline}</p></div>
          <div className="grid gap-4 md:grid-cols-3">{[["Sıkıntılar", detail.pains, "text-red-200"], ["Kazanımlar", detail.gains, "text-lime-200"], ["Örnek veri tipleri", detail.examples, "text-cyan-200"]].map(([title, list, cls]) => <div key={title as string} className="rounded-[2rem] border border-white/10 bg-black/25 p-5"><p className={`text-sm font-semibold ${cls}`}>{title as string}</p><div className="mt-4 space-y-3">{(list as string[]).map((item) => <div key={item} className="flex gap-3 text-sm leading-6 text-white/60"><CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-lime-200" />{item}</div>)}</div></div>)}</div>
        </div>
      </motion.div>
    </section>
  );
}

function MarketSection() {
  return (
    <section id="market" className="relative mx-auto max-w-7xl px-6 py-24 text-white md:py-32">
      <div className="absolute left-[-10%] top-[20%] h-[420px] w-[420px] rounded-full bg-lime-300/10 blur-[130px]" />
      <div className="absolute right-[-10%] bottom-[10%] h-[420px] w-[420px] rounded-full bg-cyan-300/10 blur-[130px]" />
      <SectionHeader eyebrow="07 — Pazar Büyüklüğü" title="Dört büyük pazarın kesişim noktasında" copy="KSC; siber güvenlik, IoT güvenliği, veri sıkıştırma ve gömülü sistem güvenliği pazarlarının örtüştüğü segmentte konumlanır." />

      <div className="relative mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {marketCards.map((card, index) => (
          <motion.div key={card.title} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ delay: index * 0.05 }} whileHover={{ y: -8, scale: 1.015 }} className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.045] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.28)] backdrop-blur-2xl">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(190,242,100,0.16),transparent_42%)] opacity-0 transition duration-500 group-hover:opacity-100" />
            <p className="relative text-xs font-semibold uppercase tracking-[0.28em] text-lime-200/70">{card.title}</p>
            <h3 className="relative mt-4 text-4xl font-semibold tracking-[-0.04em] text-white">{card.value}</h3>
            <p className="relative mt-3 text-sm leading-7 text-white/55">{card.desc}</p>
          </motion.div>
        ))}
      </div>

      <div className="relative mt-8 overflow-hidden rounded-[2.8rem] border border-lime-300/18 bg-[radial-gradient(circle_at_20%_20%,rgba(190,242,100,0.14),rgba(255,255,255,0.045)_38%,rgba(0,0,0,0.34))] p-6 shadow-[0_45px_160px_rgba(0,0,0,0.55)] backdrop-blur-2xl md:p-10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:70px_70px] opacity-35" />
        <div className="relative grid gap-10 lg:grid-cols-[0.95fr_1.25fr] lg:items-center">
          <div className="flex justify-center">
            <div className="relative h-[330px] w-[330px] md:h-[440px] md:w-[440px]">
              <motion.div animate={{ rotate: 360 }} transition={{ duration: 38, repeat: Infinity, ease: "linear" }} className="absolute inset-0 rounded-full border border-lime-300/20" />
              <motion.div animate={{ rotate: -360 }} transition={{ duration: 46, repeat: Infinity, ease: "linear" }} className="absolute inset-[8%] rounded-full border border-cyan-200/15" />
              <motion.div animate={{ scale: [1, 1.035, 1] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} className="absolute inset-[2%] rounded-full border border-lime-300/25 bg-lime-300/[0.035] shadow-[0_0_90px_rgba(190,242,100,0.08)]" />
              <motion.div animate={{ scale: [1, 1.045, 1] }} transition={{ duration: 4.4, repeat: Infinity, ease: "easeInOut", delay: 0.3 }} className="absolute inset-[19%] rounded-full border border-lime-300/35 bg-lime-300/[0.055]" />
              <motion.div animate={{ scale: [1, 1.06, 1] }} transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut", delay: 0.6 }} className="absolute inset-[35%] rounded-full border border-lime-300/55 bg-lime-300/[0.09] shadow-[0_0_70px_rgba(190,242,100,0.15)]" />
              <div className="absolute left-1/2 top-[10%] -translate-x-1/2 text-center"><p className="font-mono text-xs tracking-[0.35em] text-lime-200/80">TAM</p><p className="mt-2 text-lg font-semibold text-lime-100">$150Md+</p></div>
              <div className="absolute left-1/2 top-[34%] -translate-x-1/2 text-center"><p className="font-mono text-xs tracking-[0.35em] text-lime-200/80">SAM</p><p className="mt-2 text-lg font-semibold text-lime-100">$40–50Md</p></div>
              <div className="absolute left-1/2 top-[53%] -translate-x-1/2 text-center"><p className="font-mono text-xs tracking-[0.35em] text-lime-200/80">SOM</p><p className="mt-2 whitespace-nowrap text-xl font-bold text-lime-200">$400M–$1.5Md</p></div>
              <motion.div animate={{ opacity: [0.35, 1, 0.35], scale: [1, 1.22, 1] }} transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }} className="absolute left-[14%] top-[18%] h-3 w-3 rounded-full bg-lime-300 shadow-[0_0_25px_rgba(190,242,100,0.9)]" />
              <motion.div animate={{ opacity: [0.25, 1, 0.25], scale: [1, 1.2, 1] }} transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut", delay: 0.6 }} className="absolute bottom-[18%] right-[17%] h-2.5 w-2.5 rounded-full bg-cyan-200 shadow-[0_0_25px_rgba(165,243,252,0.8)]" />
            </div>
          </div>

          <div className="space-y-4">
            {tamSamSom.map((item, index) => (
              <motion.div key={item.code} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ delay: index * 0.08 }} whileHover={{ x: 8 }} className={`group relative overflow-hidden rounded-[2rem] border p-6 backdrop-blur-2xl transition ${index === 2 ? "border-lime-300/35 bg-lime-300/[0.105] shadow-[0_0_70px_rgba(190,242,100,0.10)]" : "border-white/10 bg-black/25 hover:border-lime-300/25"}`}>
                <div className="absolute inset-0 bg-[linear-gradient(120deg,transparent,rgba(190,242,100,0.10),transparent)] opacity-0 transition duration-500 group-hover:opacity-100" />
                <div className="relative flex items-start gap-5">
                  <div className={`mt-1 flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border font-mono text-xs font-semibold ${index === 2 ? "border-lime-300/40 bg-lime-300 text-black" : "border-lime-300/25 bg-lime-300/10 text-lime-200"}`}>{item.code}</div>
                  <div><h3 className="text-lg font-semibold text-white">{item.code} — {item.title}</h3><p className="mt-2 text-3xl font-semibold tracking-[-0.04em] text-lime-200">{item.value}</p><p className="mt-4 text-sm leading-7 text-white/58">{item.desc}</p></div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function CompetitorSection() {
  return (
    <section id="competitor" className="mx-auto max-w-7xl px-6 py-24 text-white md:py-32">
      <SectionHeader eyebrow="08 — Rakip Analizi" title="Doğrudan rakip yok — farklı bir sınıf" copy="KSC, mevcut çözümlerin hiçbirinin sunmadığı değer önerisiyle pazara giriyor. Rakiplerini tamamlayan, onların yetersiz kaldığı noktalarda çözüm üreten bir katman olarak konumlanıyor." />
      <div className="mt-12 grid gap-5 md:grid-cols-2">
        {competitorCards.map((item) => (
          <motion.article key={item.title} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="rounded-[2rem] border border-white/10 bg-white/[0.045] p-8 shadow-[0_30px_120px_rgba(0,0,0,0.28)] backdrop-blur-2xl transition hover:-translate-y-1 hover:border-lime-300/25">
            <span className="inline-flex rounded-lg border border-lime-300/25 bg-lime-300/10 px-3 py-1 font-mono text-xs text-lime-200">{item.tag}</span>
            <h3 className="mt-6 text-xl font-semibold text-white">{item.title}</h3>
            <p className="mt-4 text-sm leading-8 text-white/58">{item.copy}</p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

function StrategicInvestmentSection() {
  return (
    <section id="investment" className="mx-auto max-w-7xl px-6 py-24 text-white md:py-32">
      <SectionHeader eyebrow="09 — Yatırım" title="Stratejik yatırım turu" copy="Yatırım hedefi; çekirdek teknolojiyi sertifikasyon, pazara giriş, gömülü sistem entegrasyonu ve kurumsal pilotlar için ölçeklenebilir hale getirmektir." />
      <div className="mt-12 rounded-[2.5rem] border border-white/10 bg-white/[0.045] p-6 shadow-[0_35px_140px_rgba(0,0,0,0.35)] backdrop-blur-2xl md:p-10">
        <div className="rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_50%_0%,rgba(190,242,100,0.16),rgba(0,0,0,0.25)_55%)] p-10 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-white/40">Talep edilen yatırım</p>
          <h3 className="mt-4 text-6xl font-semibold tracking-[-0.06em] text-lime-200 md:text-7xl">$6.5M</h3>
          <p className="mt-4 text-sm text-white/50">24–36 aylık büyüme planını hayata geçirmek için · Yatırım sonrası değerleme: $30–40M</p>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {investmentUse.map((item) => (
            <div key={item.title} className="rounded-[2rem] border border-white/10 bg-black/25 p-6 transition hover:-translate-y-1 hover:border-lime-300/25">
              <div className="flex gap-5">
                <p className="text-4xl font-light text-lime-200">{item.pct}</p>
                <div><h4 className="font-semibold text-white">{item.title}</h4><p className="mt-3 text-sm leading-7 text-white/55">{item.copy}</p></div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-4">
          {[["Yatırım sonrası değerleme", "$30–40M"], ["5. yıl net kâr", "$40M"], ["Melek yatırımcı ROI", "10–30x"], ["VC yatırımcı ROI", "5–15x"]].map(([label, value]) => (
            <div key={label} className="rounded-[2rem] border border-white/10 bg-black/25 p-6 text-center"><p className="text-xs uppercase tracking-[0.24em] text-white/35">{label}</p><p className="mt-3 text-3xl font-semibold text-lime-200">{value}</p></div>
          ))}
        </div>

        <div className="mt-6 rounded-[2rem] border border-white/10 bg-black/25 p-6">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-lime-200/80">Hedeflenen yatırımcı profili</p>
          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {["Savunma, havacılık, siber güvenlik veya derin teknoloji odaklı girişim sermayesi fonları", "IoT veya gömülü sistem alanlarında portföy şirketleri olan VC’ler", "Bulut bilişim, veri depolama veya siber güvenlik alanlarında stratejik yatırımlar yapan şirketler", "Teknoloji transfer ofisleri ve inovasyon fonları"].map((item) => <div key={item} className="flex gap-3 text-sm leading-6 text-white/58"><CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-lime-200" />{item}</div>)}
          </div>
        </div>
      </div>
    </section>
  );
}

function RoadmapSection() {
  return (
    <section id="roadmap" className="mx-auto max-w-7xl px-6 py-24 text-white md:py-32">
      <SectionHeader eyebrow="10 — Roadmap" title="Ticarileşme ve büyüme kilometre taşları" />
      <div className="mt-12 space-y-4">{roadmap.map((item) => <div key={item.period} className="grid gap-4 rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl md:grid-cols-[180px_1fr]"><div><p className="font-mono text-sm text-lime-200">{item.period}</p><p className="mt-2 inline-flex rounded-full border border-lime-300/20 bg-lime-300/10 px-3 py-1 text-xs text-lime-200">{item.phase}</p></div><div><h3 className="text-2xl font-semibold">{item.title}</h3><div className="mt-4 grid gap-2 md:grid-cols-2">{item.bullets.map((b) => <div key={b} className="flex gap-3 text-sm text-white/58"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-lime-200" />{b}</div>)}</div></div></div>)}</div>
    </section>
  );
}

export default function KSCPremiumLanding() {
  return (
    <main className="min-h-screen scroll-smooth overflow-hidden bg-[#050604] font-sans text-white selection:bg-lime-300 selection:text-black">
      <NoiseLayer />
      <Hero />
      <IntroVideoSection />
      <ProblemSection />
      <SolutionSection />
      <ProductSection />
      <ComparisonSection />
      <ProofSection />
      <DomainsSection />
      <MarketSection />
      <CompetitorSection />
      <StrategicInvestmentSection />
      <RoadmapSection />
      <footer className="mx-auto max-w-7xl px-6 pb-12 text-white/45"><div className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-6 text-sm backdrop-blur-xl"><div className="flex flex-col justify-between gap-4 md:flex-row md:items-center"><a href="#top">KSC Secure Data Systems · Kontrollü Sıkıştırma ile Entropi Artırımlı Veri Koruma</a><div className="flex flex-wrap gap-5">{navItems.map((item) => <a key={item.href} href={item.href} className="hover:text-lime-200">{item.label}</a>)}</div></div></div></footer>
    </main>
  );
}
