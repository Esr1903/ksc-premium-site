"use client";

import React, { useRef, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
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
  Globe2,
  HardDrive,
  Layers3,
  LockKeyhole,
  Mail,
  Network,
  Radar,
  Rocket,
  ScanLine,
  ServerCog,
  ShieldCheck,
  TerminalSquare,
  Zap,
} from "lucide-react";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28, filter: "blur(10px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.06 } },
};

const navItems = [
  { label: "Video", href: "#intro-video" },
  { label: "Problem", href: "#problem" },
  { label: "Çözüm", href: "#solution" },
  { label: "Kanıt", href: "#proof" },
  { label: "Kullanım", href: "#domains" },
  { label: "Pazar", href: "#market" },
  { label: "Roadmap", href: "#roadmap" },
];

const proofRows = [
  { label: "1. kapsül", disk: "181.841.920 bayt", delta: "referans", rate: "—" },
  { label: "5. kapsül", disk: "181.858.304 bayt", delta: "+16.384 bayt", rate: "%0,009" },
  { label: "10. kapsül", disk: "181.878.784 bayt", delta: "+36.864 bayt", rate: "%0,0203" },
];

const painPoints = [
  {
    title: "Şifreli veri yine de hedef olabilir",
    copy: "İçerik okunamasa bile dosya türü, zamanlama, başlık davranışı ve boyut paterni saldırgana değerli ipuçları verebilir.",
    icon: EyeOff,
  },
  {
    title: "Parçalı güvenlik hattı",
    copy: "Sıkıştırma, şifreleme, bütünlük ve arşivleme ayrı çalıştığında güvenlik arttıkça operasyonel maliyet de büyür.",
    icon: Layers3,
  },
  {
    title: "Tekrar korumada boyut şişmesi",
    copy: "Aynı verinin birden fazla güvenlik katmanından geçmesi depolama, aktarım ve yedekleme maliyetini sürdürülemez hale getirebilir.",
    icon: BarChart3,
  },
  {
    title: "Metadata ve format izi",
    copy: "Kapsül yapısı, uzantı, dosya organizasyonu veya çözüm parametreleri dışarıdan analiz yüzeyi oluşturabilir.",
    icon: FileLock2,
  },
];

const solutionLayers = [
  {
    title: "Veri kapsülleme çekirdeği",
    copy: "Ham veriyi tek tip, kontrollü ve yüksek belirsizlikli bir kapsül davranışına hazırlayan kapalı işlem katmanı.",
    icon: DatabaseZap,
  },
  {
    title: "Kimlik doğrulamalı koruma",
    copy: "Verinin yalnızca gizlenmesini değil, taşınırken veya saklanırken değiştirilip değiştirilmediğinin algılanmasını hedefler.",
    icon: Fingerprint,
  },
  {
    title: "Gizli temsil katmanı",
    copy: "Teknik ayrıntıları ürün çekirdeğinde tutulan özel temsil yaklaşımıyla veri davranışının dışarıdan okunmasını zorlaştırır.",
    icon: LockKeyhole,
  },
  {
    title: "Şifreli başlık ve parametre koruması",
    copy: "Kapsülün nasıl çözüleceğine ilişkin kontrol bilgileri açıkta bırakılmaz; analiz yüzeyi azaltılır.",
    icon: ShieldCheck,
  },
  {
    title: "Tek tip kapsül çıktısı",
    copy: "Kaynak dosya türünden bağımsız, dışarıdan benzer görünen ve kurumsal arşivleme süreçlerine uygun çıktı üretir.",
    icon: TerminalSquare,
  },
  {
    title: "Kurcalama durdurma mantığı",
    copy: "Bütünlük doğrulaması başarısız olduğunda sistem içeriği açmadan güvenli şekilde durmayı hedefler.",
    icon: FileLock2,
  },
];

const domains = [
  { title: "Savunma & Havacılık", copy: "Görev dosyaları, telemetri, aviyonik kayıtlar, bakım logları ve platformlar arası hassas veri aktarımı.", icon: Radar },
  { title: "FinTech & Bankacılık", copy: "Finansal işlem geçmişleri, müşteri kayıtları, kredi skorlama çıktıları, sigorta ve regülasyon dosyaları.", icon: Building2 },
  { title: "IoT & Akıllı Şehir", copy: "Sensör ağları, düşük kaynaklı cihazlar, firmware paketleri, cihazlar arası güvenli veri alışverişi.", icon: Cpu },
  { title: "Bulut, IT & DevOps", copy: "Kurumsal arşivler, yedekleme paketleri, CI/CD çıktıları, konfigürasyon ve gizli anahtar dosyaları.", icon: CloudCog },
  { title: "Adli Bilişim", copy: "Dijital deliller, imaj dosyaları, olay yeri kayıtları ve zincirleme muhafaza süreçleri.", icon: FileLock2 },
  { title: "Endüstri 4.0", copy: "SCADA/PLC kayıtları, üretim reçeteleri, kalite kontrol verileri ve makine çalışma logları.", icon: HardDrive },
  { title: "Sağlık & Biyomedikal", copy: "Hasta kayıtları, laboratuvar sonuçları, klinik araştırma verileri ve tıbbi görüntüleme çıktıları.", icon: DatabaseZap },
  { title: "Yapay Zekâ & Ar-Ge", copy: "Model ağırlıkları, eğitim setleri, deney sonuçları ve kurumlar arası araştırma veri transferi.", icon: Binary },
];

const businessModels = [
  "SDK / API lisansı",
  "CLI ve masaüstü ürün",
  "On-Premise kurumsal dağıtım",
  "OEM / gömülü entegrasyon",
  "Sektörel PoC ve pilot proje",
  "Yönetilen SaaS paneli",
];

const roadmap = [
  { step: "01", tag: "TRL 3", title: "Konsept ve doğrulama", copy: "Çekirdek yaklaşım, kapsül davranışı, ölçüm verileri ve teknik fizibilite doğrulanır." },
  { step: "02", tag: "MVP", title: "Çekirdek prototip", copy: "CLI tabanlı ilk ürün, test dosyaları, kapsül üretimi ve geri çözme kontrolleri tamamlanır." },
  { step: "03", tag: "Pilot", title: "Sektörel PoC", copy: "Savunma, FinTech, IoT veya kurumsal IT senaryolarında gerçek veri tipleriyle pilot çalışma yapılır." },
  { step: "04", tag: "Scale", title: "Ticarileşme", copy: "SDK/API lisanslama, kurumsal panel, OEM entegrasyonu ve partner ağıyla ölçeklenir." },
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
          ? "group relative inline-flex overflow-hidden rounded-full bg-lime-300 px-6 py-3 text-sm font-semibold text-black shadow-[0_0_40px_rgba(190,242,100,0.26)] transition hover:scale-[1.02]"
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

function CapsuleOrb() {
  return (
    <motion.div className="relative mx-auto flex h-[360px] w-[360px] items-center justify-center md:h-[520px] md:w-[520px]" animate={{ rotate: 360 }} transition={{ duration: 58, repeat: Infinity, ease: "linear" }}>
      <div className="absolute inset-10 rounded-full border border-lime-300/20 shadow-[inset_0_0_90px_rgba(190,242,100,0.08),0_0_80px_rgba(190,242,100,0.08)]" />
      <div className="absolute inset-20 rounded-full border border-cyan-200/10" />
      <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_40%_35%,rgba(190,242,100,0.35),rgba(34,211,238,0.10)_30%,transparent_58%)] blur-2xl" />
      {[0, 1, 2].map((i) => <motion.div key={i} className="absolute h-[72%] w-[72%] rounded-full border border-white/10" style={{ rotate: i * 60 }} animate={{ scale: [1, 1.06, 1], opacity: [0.25, 0.65, 0.25] }} transition={{ duration: 3 + i, repeat: Infinity, ease: "easeInOut" }} />)}
      <motion.div className="absolute h-56 w-56 rounded-[2.5rem] border border-white/10 bg-white/[0.055] shadow-[0_40px_120px_rgba(0,0,0,0.7)] backdrop-blur-2xl md:h-72 md:w-72" animate={{ rotate: -360, y: [0, -10, 0] }} transition={{ rotate: { duration: 58, repeat: Infinity, ease: "linear" }, y: { duration: 4.6, repeat: Infinity, ease: "easeInOut" } }}>
        <div className="absolute inset-0 rounded-[2.5rem] bg-[linear-gradient(135deg,rgba(255,255,255,0.13),transparent_35%,rgba(190,242,100,0.12))]" />
        <div className="absolute left-7 top-7 flex items-center gap-2 text-xs text-lime-200/80"><LockKeyhole className="h-4 w-4" /> KSC CAPSULE</div>
        <div className="absolute bottom-8 left-7 right-7">
          <div className="mb-4 h-2 overflow-hidden rounded-full bg-white/10"><motion.div className="h-full rounded-full bg-lime-300" initial={{ width: "8%" }} animate={{ width: ["8%", "96%", "62%"] }} transition={{ duration: 4, repeat: Infinity }} /></div>
          <p className="font-mono text-[11px] leading-5 text-white/55">high entropy · hidden header · tamper aware · low overhead</p>
        </div>
      </motion.div>
    </motion.div>
  );
}

function Hero() {
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  return (
    <section ref={ref} id="top" className="relative min-h-screen overflow-hidden px-6 pt-8 text-white">
      <motion.div style={{ y, opacity }} className="absolute inset-0 z-0">
        <div className="absolute left-[-12%] top-[-16%] h-[520px] w-[520px] rounded-full bg-lime-300/10 blur-[120px]" />
        <div className="absolute right-[-10%] top-[20%] h-[520px] w-[520px] rounded-full bg-cyan-300/10 blur-[130px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:80px_80px] [mask-image:radial-gradient(circle_at_center,black,transparent_72%)]" />
      </motion.div>

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

      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-12 py-20 md:grid-cols-[1.05fr_0.95fr] md:py-28">
        <motion.div variants={stagger} initial="hidden" animate="show">
          <motion.div variants={fadeUp} className="mb-5 inline-flex items-center gap-2 rounded-full border border-lime-300/20 bg-lime-300/10 px-4 py-2 text-xs font-medium text-lime-100 shadow-[0_0_30px_rgba(190,242,100,0.08)]"><ScanLine className="h-4 w-4" /> Secure Encapsulation · Veri güvenliği için kapalı kapsülleme katmanı</motion.div>
          <motion.h1 variants={fadeUp} className="max-w-5xl text-5xl font-semibold tracking-[-0.06em] text-white md:text-7xl lg:text-8xl">Veriyi sadece şifreleme. <span className="bg-gradient-to-r from-lime-200 via-white to-cyan-200 bg-clip-text text-transparent">Hedef olmaktan çıkaran</span> güvenli kapsüle dönüştür.</motion.h1>
          <motion.p variants={fadeUp} className="mt-7 max-w-2xl text-lg leading-8 text-white/65">KSC, hassas dosyaların yalnızca okunmasını engellemeyi değil; dosya türü, başlık, metadata ve boyut davranışı üzerinden analiz edilmesini zorlaştırmayı hedefleyen yeni nesil güvenli veri kapsülleme yaklaşımıdır.</motion.p>
          <motion.div variants={fadeUp} className="mt-9 flex flex-col gap-3 sm:flex-row"><GlowLink href="#proof">Kanıtları gör <ArrowRight className="h-4 w-4" /></GlowLink><GlowLink href="#domains" variant="ghost">Nerede kullanılır?</GlowLink></motion.div>
          <motion.div variants={fadeUp} className="mt-10 grid max-w-2xl grid-cols-3 gap-3">
            {[["~99.99%", "Entropi temsili"], ["<0.1%", "Overhead hedefi"], ["TRL 3", "Doğrulama aşaması"]].map(([num, label]) => <div key={label} className="rounded-3xl border border-white/10 bg-white/[0.045] p-4 backdrop-blur-xl"><div className="text-2xl font-semibold text-lime-200">{num}</div><div className="mt-1 text-xs text-white/45">{label}</div></div>)}
          </motion.div>
        </motion.div>
        <motion.div initial={{ opacity: 0, scale: 0.88 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, ease: "easeOut" }}><CapsuleOrb /></motion.div>
      </div>
    </section>
  );
}

function IntroVideoSection() {
  return (
    <section id="intro-video" className="mx-auto max-w-7xl px-6 py-16 text-white md:py-24">
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        className="grid items-center gap-8 rounded-[2.5rem] border border-white/10 bg-white/[0.035] p-5 shadow-[0_35px_140px_rgba(0,0,0,0.35)] backdrop-blur-2xl md:grid-cols-[0.92fr_1.08fr] md:p-8 lg:p-10"
      >
        <motion.div variants={fadeUp} className="max-w-xl">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-lime-200/80">
            Product Preview
          </p>
          <h2 className="mt-4 text-4xl font-semibold tracking-[-0.045em] text-white md:text-5xl lg:text-6xl">
            KSC’nin değerini bir dakikada görün.
          </h2>
          <p className="mt-5 text-base leading-8 text-white/58">
            Hassas verinin yalnızca korunması değil, dışarıdan anlamlandırılmasının da zorlaştırılması neden önemlidir? Kısa tanıtım videosu, problemi ve KSC’nin değer önerisini teknik detaya girmeden özetler.
          </p>

          <div className="mt-7 grid gap-3 sm:grid-cols-2">
            {[
              "Problem ve çözüm akışı",
              "Kanıt odaklı ürün anlatımı",
              "Sektörel kullanım fikri",
              "Demo / PoC görüşmesi için ön izleme",
            ].map((item) => (
              <div key={item} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/25 px-4 py-3 text-sm text-white/65">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-lime-200" />
                {item}
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <GlowLink href="#proof">Kanıtları incele <ArrowRight className="h-4 w-4" /></GlowLink>
            <GlowLink href="#domains" variant="ghost">Kullanım alanları</GlowLink>
          </div>
        </motion.div>

        <motion.div variants={fadeUp} className="relative">
          <div className="absolute -inset-4 rounded-[2.2rem] bg-lime-300/10 blur-2xl" />
          <div className="relative overflow-hidden rounded-[2rem] border border-lime-300/20 bg-black/50 p-2 shadow-[0_28px_100px_rgba(0,0,0,0.5)]">
            <video
              className="aspect-video w-full rounded-[1.55rem] object-cover"
              src="/ksc-intro.mp4"
              controls
              autoPlay
              muted
              loop
              playsInline
              poster="/ksc-video-poster.png"
            />
          </div>
          <div className="mt-4 flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.035] px-4 py-3 text-xs text-white/50 backdrop-blur-xl">
            <span>1 dakikalık ürün ön izlemesi</span>
            <span className="text-lime-200">KSC Secure Data Systems</span>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

function ProblemSection() {
  return (
    <section id="problem" className="mx-auto max-w-7xl px-6 py-24 text-white md:py-32">
      <SectionHeader eyebrow="Problem Definition" title="Güçlü şifreleme tek başına yeterli olmayabilir; saldırgan çoğu zaman içeriği değil, izi hedefler." copy="KSC’nin çıkış noktası basit: Hassas veri saklanırken veya taşınırken yalnızca okunamaz olmak yetmez. Verinin ne olduğu, nereden geldiği, ne kadar kritik olduğu ve nasıl paketlendiği de mümkün olduğunca belirsizleşmelidir." />
      <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {painPoints.map((item) => { const Icon = item.icon; return <motion.a href="#proof" key={item.title} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="group rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-2xl transition hover:-translate-y-1 hover:border-lime-300/25"><div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-lime-300/10 text-lime-200 ring-1 ring-lime-300/20"><Icon className="h-5 w-5" /></div><h3 className="mt-8 text-xl font-semibold">{item.title}</h3><p className="mt-3 text-sm leading-7 text-white/55">{item.copy}</p></motion.a>; })}
      </div>
    </section>
  );
}

function SolutionSection() {
  return (
    <section id="solution" className="relative mx-auto max-w-7xl px-6 py-24 text-white md:py-32">
      <SectionHeader eyebrow="Solution Approach" title="KSC, detayları kapalı tutulan çok katmanlı kapsülleme mantığıyla veri güvenliğine ek bir savunma yüzeyi kazandırır." copy="Bu web sitesi ürünün iç mekanizmasını açığa çıkarmaz. Anlatılan şey; kurumların neden böyle bir katmana ihtiyaç duyduğu, KSC’nin hangi problemi çözdüğü ve ölçüm verilerinin ne gösterdiğidir." />
      <div className="mt-12 grid gap-4 lg:grid-cols-3">
        {solutionLayers.map((card) => { const Icon = card.icon; return <motion.a href="#proof" key={card.title} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }} className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.045] p-6 shadow-[0_24px_90px_rgba(0,0,0,0.28)] backdrop-blur-2xl"><div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(190,242,100,0.13),transparent_42%)] opacity-0 transition group-hover:opacity-100" /><div className="relative flex h-12 w-12 items-center justify-center rounded-2xl border border-lime-300/20 bg-lime-300/10 text-lime-200"><Icon className="h-5 w-5" /></div><h3 className="relative mt-8 text-xl font-semibold">{card.title}</h3><p className="relative mt-3 text-sm leading-7 text-white/55">{card.copy}</p><div className="relative mt-8 h-px bg-gradient-to-r from-lime-300/40 via-white/10 to-transparent" /></motion.a>; })}
      </div>
    </section>
  );
}

function ProofSection() {
  return (
    <section id="proof" className="mx-auto max-w-7xl px-6 py-24 text-white md:py-32">
      <SectionHeader
        eyebrow="Proof Layer"
        title="Kanıt: KSC kapsülü tekrar işlense bile boyut artışı çok düşük seviyede kalır."
        copy="Bu bölüm, gerçek test çıktılarından alınan görsellerle desteklenir. Kaynak .db dosyası KSC kapsülüne dönüştürülür; ardından 1., 5. ve 10. kapsülleme çıktılarında disk boyutu karşılaştırılır. Amaç, güvenliğin depolama maliyetine dönüşmediğini görsel olarak kanıtlamaktır."
      />

      <div className="mt-12 grid gap-5">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="overflow-hidden rounded-[2rem] border border-lime-300/20 bg-black/40 p-3 shadow-[0_30px_120px_rgba(0,0,0,0.5)] backdrop-blur-2xl"
        >
          <img
            src="/ksc-proof-overview.png"
            alt="KSC boyut verimliliği ve recursive kapsülleme kanıt görseli"
            className="w-full rounded-[1.5rem] border border-white/10 object-cover"
          />
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="overflow-hidden rounded-[2rem] border border-white/10 bg-black/40 p-3 shadow-[0_30px_120px_rgba(0,0,0,0.45)] backdrop-blur-2xl"
        >
          <img
            src="/ksc-proof-details.png"
            alt="1., 5. ve 10. kapsülleme dosya boyutu karşılaştırma görseli"
            className="w-full rounded-[1.5rem] border border-white/10 object-cover"
          />
        </motion.div>

        <div className="grid gap-4 lg:grid-cols-[1fr_0.9fr]">
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl">
            <h3 className="text-2xl font-semibold">Ölçüm okuması</h3>
            <p className="mt-3 text-sm leading-7 text-white/55">
              Test çıktılarında 1. kapsülleme referans alındığında 5. kapsülleme sonucunda yalnızca 16.384 bayt, 10. kapsülleme sonucunda ise 36.864 bayt ek artış görülür. Bu davranış, tekrar kapsülleme senaryolarında boyut artışının kontrollü kaldığını gösterir.
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {proofRows.map((r) => (
                <div key={r.label} className="rounded-2xl border border-white/10 bg-black/25 p-4">
                  <p className="text-xs text-white/45">{r.label}</p>
                  <p className="mt-2 text-lg font-semibold text-lime-200">{r.delta}</p>
                  <p className="mt-1 text-xs text-white/55">{r.rate}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-lime-300/15 bg-[radial-gradient(circle_at_15%_20%,rgba(190,242,100,0.16),rgba(255,255,255,0.035)_45%,rgba(0,0,0,0.25))] p-6 backdrop-blur-xl">
            <h3 className="text-2xl font-semibold">Neden güçlü kanıt?</h3>
            <div className="mt-5 space-y-3 text-sm leading-6 text-white/60">
              {[
                "Kaynak dosya .db iken çıkış tek tip .ksc kapsülü olarak görünür.",
                "1., 5. ve 10. işlem çıktıları doğrudan dosya özellikleriyle gösterilir.",
                "Boyut artışı bayt ve yüzde değerleriyle ölçülebilir hale gelir.",
                "Bu sonuç, yatırımcıya teknik yapılabilirlik; müşteriye operasyonel fayda gösterir.",
              ].map((item) => (
                <div key={item} className="flex gap-3">
                  <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-lime-200" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function DomainsSection() {
  const [active, setActive] = useState(0);
  const current = domains[active];
  const detailMap = [
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
  const detail = detailMap[active];
  const Icon = current.icon;

  return (
    <section id="domains" className="mx-auto max-w-7xl px-6 py-24 text-white md:py-32">
      <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <SectionHeader
          eyebrow="Use Cases"
          title="KSC, verinin türünün bile hassas olduğu alanlarda tamamlayıcı güvenlik katmanı olarak konumlanır."
          copy="Bir sektör seçin; sağlanan detay panelinde o alandaki müşteri problemi, KSC’nin değer önerisi ve örnek veri tipleri gösterilir."
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {domains.map((sector, index) => {
          const CardIcon = sector.icon;
          const isActive = index === active;
          return (
            <motion.button
              key={sector.title}
              type="button"
              onMouseEnter={() => setActive(index)}
              onFocus={() => setActive(index)}
              onClick={() => setActive(index)}
              className={`group relative min-h-[310px] overflow-hidden rounded-[2rem] border p-6 text-left transition ${isActive ? "border-lime-300/45 bg-lime-300/[0.09] shadow-[0_0_60px_rgba(190,242,100,0.08)]" : "border-white/10 bg-white/[0.035] hover:border-lime-300/25"}`}
              whileHover={{ y: -8 }}
            >
              <div className="absolute inset-0 bg-[linear-gradient(120deg,transparent,rgba(190,242,100,0.12),transparent)] opacity-0 transition group-hover:opacity-100" />
              <CardIcon className="relative h-9 w-9 text-lime-200" />
              <h3 className="relative mt-16 text-2xl font-semibold tracking-[-0.03em]">{sector.title}</h3>
              <p className="relative mt-4 text-sm leading-7 text-white/55">{sector.copy}</p>
              <div className="absolute bottom-5 left-6 right-6 flex items-center justify-between border-t border-white/10 pt-4 text-xs text-white/45">
                <span>{isActive ? "Detay paneli açık" : "Detayı göster"}</span>
                <ArrowRight className={`h-4 w-4 transition ${isActive ? "translate-x-1 text-lime-200" : "group-hover:translate-x-1 group-hover:text-lime-200"}`} />
              </div>
            </motion.button>
          );
        })}
      </div>

      <motion.div
        key={current.title}
        initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="mt-8 overflow-hidden rounded-[2.5rem] border border-lime-300/20 bg-[radial-gradient(circle_at_10%_10%,rgba(190,242,100,0.16),rgba(255,255,255,0.04)_42%,rgba(0,0,0,0.26))] p-6 shadow-[0_35px_140px_rgba(0,0,0,0.45)] backdrop-blur-2xl md:p-8"
      >
        <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
          <div>
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-lime-300/25 bg-lime-300/10 text-lime-200">
              <Icon className="h-7 w-7" />
            </div>
            <p className="mt-6 text-sm font-semibold uppercase tracking-[0.32em] text-lime-200/80">Selected Domain</p>
            <h3 className="mt-3 text-4xl font-semibold tracking-[-0.04em]">{current.title}</h3>
            <p className="mt-4 text-base leading-8 text-white/58">{detail.headline}</p>
            <div className="mt-7 rounded-2xl border border-white/10 bg-black/25 p-4 text-sm leading-7 text-white/55">
              Bu panel, patent dokümanındaki geniş kullanım alanları mantığını müşteri odaklı web deneyimine çevirir: önce problem, sonra değer, en sonda örnek veri tipleri.
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-[2rem] border border-white/10 bg-black/25 p-5">
              <p className="text-sm font-semibold text-red-200">Sıkıntılar</p>
              <div className="mt-4 space-y-3">
                {detail.pains.map((item) => (
                  <div key={item} className="flex gap-3 text-sm leading-6 text-white/60">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-red-300" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-[2rem] border border-white/10 bg-black/25 p-5">
              <p className="text-sm font-semibold text-lime-200">Kazanımlar</p>
              <div className="mt-4 space-y-3">
                {detail.gains.map((item) => (
                  <div key={item} className="flex gap-3 text-sm leading-6 text-white/60">
                    <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-lime-200" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-[2rem] border border-white/10 bg-black/25 p-5">
              <p className="text-sm font-semibold text-cyan-200">Örnek veri tipleri</p>
              <div className="mt-4 space-y-3">
                {detail.examples.map((item) => (
                  <div key={item} className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white/62">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

function CompetitionSection() {
  return (
    <section id="competition" className="mx-auto max-w-7xl px-6 py-24 text-white md:py-32">
      <SectionHeader eyebrow="Competitive Position" title="KSC, klasik şifreleme veya arşivleme aracı değil; onların yanına konumlanan ek güvenlik ve paketleme katmanıdır." copy="Rakiplerin anlattığı şey genellikle ‘veriyi kilitlemek’tir. KSC’nin değer önerisi ise verinin güvenli, kompakt ve dışarıdan daha az anlamlandırılabilir bir kapsül davranışına taşınmasıdır." />
      <div className="mt-12 grid gap-4 lg:grid-cols-[1fr_1.2fr]">
        <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl"><h3 className="text-2xl font-semibold">Mevcut yaklaşımların sınırı</h3><div className="mt-6 space-y-4">{["Klasik sıkıştırma: boyutu azaltır fakat güvenlik mimarisi sunmaz.", "Klasik şifreleme: içeriği gizler fakat format ve metadata davranışı ipucu bırakabilir.", "Konteyner sistemleri: erişim güvenliği sağlar fakat kapsül kamuflajı ve tekrar kapsülleme maliyeti ayrı problemdir."].map((item) => <div key={item} className="flex gap-3 rounded-2xl border border-white/10 bg-black/25 p-4 text-sm leading-6 text-white/60"><Zap className="mt-1 h-4 w-4 shrink-0 text-lime-200" />{item}</div>)}</div></div>
        <div className="rounded-[2rem] border border-lime-300/15 bg-[radial-gradient(circle_at_10%_10%,rgba(190,242,100,0.16),rgba(255,255,255,0.035)_42%,rgba(0,0,0,0.22))] p-6 backdrop-blur-xl"><h3 className="text-2xl font-semibold">KSC farkı</h3><div className="mt-6 grid gap-3 md:grid-cols-2">{["Güvenlik ve paketleme tek ürün deneyiminde birleşir.", "Başlık ve çözüm parametreleri dışarıdan okunabilir bırakılmaz.", "Tekrar kapsülleme altında boyut davranışı kontrollü tutulur.", "Kaynak dosya türü dışarıdan daha zor anlaşılır hale gelir.", "Düşük kaynaklı ve görev kritik sistemlerde PoC potansiyeli taşır.", "SDK, CLI, GUI, On-Premise ve OEM olarak ürünleşebilir."].map((item) => <div key={item} className="flex gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-sm leading-6 text-white/65"><CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-lime-200" />{item}</div>)}</div></div>
      </div>
    </section>
  );
}

function MarketSection() {
  return (
    <section id="market" className="relative mx-auto max-w-7xl px-6 py-24 text-white md:py-32">
      <div className="overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/[0.045] p-4 shadow-[0_30px_120px_rgba(0,0,0,0.42)] backdrop-blur-2xl md:p-6">
        <div className="grid gap-4 md:grid-cols-[0.78fr_1.22fr]">
          <div className="rounded-[2rem] bg-black/35 p-7"><p className="text-sm font-semibold uppercase tracking-[0.32em] text-cyan-200/75">Business Layer</p><h2 className="mt-4 text-4xl font-semibold tracking-[-0.045em]">Teknik fikirden ticarileşebilir güvenlik ürününe.</h2><p className="mt-5 text-sm leading-7 text-white/55">KSC; siber güvenlik, IoT güvenliği, veri paketleme, gömülü sistem güvenliği ve regülasyon odaklı veri saklama ihtiyaçlarının kesişiminde konumlanır.</p><div className="mt-8 grid gap-3">{businessModels.map((item) => <div key={item} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-3 text-sm text-white/65"><Gauge className="h-4 w-4 text-lime-200" />{item}</div>)}</div></div>
          <div className="grid gap-4 md:grid-cols-3">
            {[["TAM", "$150Md+", "Siber güvenlik, IoT güvenliği, veri paketleme ve gömülü güvenlik kesişimi."], ["SAM", "$40–50Md", "Ulaşılabilir yazılım güvenliği ve IoT odaklı segment."], ["SOM", "$400M–$1.5Md", "İlk 3–5 yılda hedeflenebilecek gerçekçi pazar payı bandı."]].map(([k, v, d]) => <div key={k} className="rounded-[2rem] border border-white/10 bg-black/30 p-6"><p className="text-sm text-white/45">{k}</p><h3 className="mt-3 text-3xl font-semibold text-lime-200">{v}</h3><p className="mt-3 text-sm leading-7 text-white/55">{d}</p></div>)}
            <div className="rounded-[2rem] border border-white/10 bg-black/30 p-6 md:col-span-3"><Rocket className="h-7 w-7 text-lime-200" /><h3 className="mt-8 text-2xl font-semibold">Gelir ve ticarileşme modeli</h3><div className="mt-5 grid gap-3 md:grid-cols-4">{[["Freemium", "Geliştirici farkındalığı"], ["Pro / Takım", "$49–$199/ay"], ["Kurumsal", "Özel lisans"], ["OEM", "$0.10–$1.00/cihaz"]].map(([a, b]) => <div key={a} className="rounded-2xl border border-white/10 bg-white/[0.04] p-4"><p className="text-sm font-semibold text-white/80">{a}</p><p className="mt-2 text-xs text-white/50">{b}</p></div>)}</div><p className="mt-5 text-sm leading-7 text-white/55">Finansal öngörü tarafında 5. yıl için 80M$ gelir, 40M$ net kâr ve 500M$–1B$ değerleme bandı yatırımcı senaryosu olarak modellenebilir.</p></div>
          </div>
        </div>
      </div>
    </section>
  );
}

function RoadmapSection() {
  return <section id="roadmap" className="mx-auto max-w-7xl px-6 py-24 text-white md:py-32"><SectionHeader eyebrow="Roadmap" title="Konseptten ticarileşmeye katmanlı ürün geliştirme süreci." /><div className="mt-12 grid gap-4 md:grid-cols-4">{roadmap.map((item, index) => <motion.div key={item.title} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] p-6"><div className="mb-8 flex items-center justify-between"><span className="rounded-full bg-lime-300 px-3 py-1 text-xs font-bold text-black">{item.tag}</span><span className="font-mono text-5xl font-bold text-white/[0.06]">{item.step}</span></div><h3 className="text-xl font-semibold">{item.title}</h3><p className="mt-3 text-sm leading-7 text-white/50">{item.copy}</p>{index < roadmap.length - 1 ? <div className="absolute right-5 top-7 hidden text-white/20 md:block"><ArrowRight /></div> : null}</motion.div>)}</div></section>;
}

export default function KSCPremiumLanding() {
  return (
    <main className="min-h-screen scroll-smooth overflow-hidden bg-[#050604] font-sans text-white selection:bg-lime-300 selection:text-black">
      <NoiseLayer />
      <Hero />
      <IntroVideoSection />
      <ProblemSection />
      <SolutionSection />
      <ProofSection />
      <DomainsSection />
      <CompetitionSection />
      <MarketSection />
      <RoadmapSection />
      <footer className="mx-auto max-w-7xl px-6 pb-12 text-white/45"><div className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-6 text-sm backdrop-blur-xl"><div className="flex flex-col justify-between gap-4 md:flex-row md:items-center"><a href="#top">KSC Secure Data Systems · Secure Encapsulation Architecture</a><div className="flex flex-wrap gap-5">{navItems.map((item) => <a key={item.href} href={item.href} className="hover:text-lime-200">{item.label}</a>)}</div></div></div></footer>
    </main>
  );
}
