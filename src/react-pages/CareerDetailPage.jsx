import React, { useState } from 'react';
import { ArrowLeft, ArrowUpRight, Check, Copy } from 'lucide-react';

export default function CareerDetailPage({ job, lang, onNavigate }) {
  const [copied, setCopied] = useState(false);

  if (!job) {
    return (
      <div className="bg-[#f6f5f1] py-28">
        <div className="wrap">
          <p className="eyebrow">
            {lang === 'id' ? 'INFORMASI LOWONGAN' : 'CAREER INFORMATION'}
          </p>
          <h2 className="text-3xl font-bold text-[#172b42] font-manrope mb-4">
            {lang === 'id' ? 'Lowongan Tidak Ditemukan' : 'Position Not Found'}
          </h2>
          <p className="text-base text-[#526374] leading-relaxed mb-8">
            {lang === 'id'
              ? 'Posisi lowongan yang Anda cari mungkin telah ditutup atau tautan tidak tersedia.'
              : 'The position you are looking for may have been closed or the link is unavailable.'}
          </p>
          <button
            type="button"
            onClick={() => onNavigate('careers')}
            className="button button-primary cursor-pointer"
          >
            <ArrowLeft size={18} />
            <span>
              {lang === 'id' ? 'Kembali ke Daftar Karir' : 'Back to Careers'}
            </span>
          </button>
        </div>
      </div>
    );
  }

  const emailToApply = job.email || 'recruitment@promind.id';
  const subjectText = `Lamaran - ${job.title} - [Nama Lengkap]`;

  const buildMailtoUrl = () => {
    const subject = encodeURIComponent(subjectText);
    const body = encodeURIComponent(
      [
        'Yth. Tim Human Resources PROMIND,',
        '',
        `Melalui email ini, saya bermaksud mengajukan lamaran pekerjaan untuk posisi ${job.title} (${job.dept}).`,
        'Bersama email ini saya lampirkan Curriculum Vitae (CV) terbaru beserta dokumen pendukung lainnya sebagai bahan pertimbangan.',
        '',
        'Nama Lengkap :',
        'No. Telepon / WhatsApp :',
        '',
        'Atas perhatian dan kesempatan yang diberikan, saya ucapkan terima kasih.',
      ].join('\n')
    );
    return `mailto:${emailToApply}?subject=${subject}&body=${body}`;
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(emailToApply);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const responsibilities = Array.isArray(job.responsibilities)
    ? job.responsibilities
    : [];
  const qualifications = Array.isArray(job.qualifications)
    ? job.qualifications
    : [];
  const benefits = Array.isArray(job.benefits) ? job.benefits : [];

  return (
    <div className="bg-[#f6f5f1]">
      {/* 1. Clean Editorial Header — Matching ServicesPage, ResearchPage & AboutPage */}
      <section className="bg-white border-b border-[#d8dfe5] py-20">
        <div className="wrap">
          <div className="career-back-row">
            <button
              type="button"
              onClick={() => onNavigate('careers')}
              className="career-back-link"
            >
              <ArrowLeft size={15} />
              <span>
                {lang === 'id' ? 'Kembali ke Karir' : 'Back to Careers'}
              </span>
            </button>
          </div>

          <div className="max-w-3xl">
            <p className="eyebrow">{job.dept}</p>
            <h1 className="text-3xl sm:text-5xl font-bold text-[#172b42] font-manrope leading-tight mb-5">
              {job.title}
            </h1>
            <p className="text-base sm:text-lg text-[#526374] leading-relaxed m-0">
              {job.desc}
            </p>
          </div>

          {/* 4-Column Specification Strip */}
          <div className="career-spec-grid">
            <div className="career-spec-col">
              <span className="career-spec-label">
                {lang === 'id' ? 'DEPARTEMEN' : 'DEPARTMENT'}
              </span>
              <strong className="career-spec-val">{job.dept}</strong>
            </div>

            <div className="career-spec-col">
              <span className="career-spec-label">
                {lang === 'id' ? 'TIPE KERJA' : 'EMPLOYMENT TYPE'}
              </span>
              <strong className="career-spec-val">
                {job.type || 'Full-Time'}
              </strong>
            </div>

            <div className="career-spec-col">
              <span className="career-spec-label">
                {lang === 'id' ? 'LOKASI PENEMPATAN' : 'LOCATION'}
              </span>
              <strong className="career-spec-val">
                {job.location || 'Jakarta'}
              </strong>
            </div>

            <div className="career-spec-col">
              <span className="career-spec-label">
                {lang === 'id' ? 'PENGALAMAN' : 'EXPERIENCE'}
              </span>
              <strong className="career-spec-val">
                {job.exp || (lang === 'id' ? 'Berpengalaman' : 'Experienced')}
              </strong>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Role Content — Clean Editorial Rows with Simple Bullet Dots */}
      <section className="section-pad">
        <div className="wrap">
          <div className="career-editorial-list">
            {/* Tanggung Jawab Utama */}
            {responsibilities.length > 0 && (
              <div className="career-editorial-row">
                <div className="career-row-lead">
                  <p className="eyebrow">
                    {lang === 'id' ? 'LINGKUP PEKERJAAN' : 'ROLE SCOPE'}
                  </p>
                  <h2>
                    {lang === 'id'
                      ? 'Tanggung Jawab Utama & Eksekusi Operasional'
                      : 'Key Responsibilities & Operational Execution'}
                  </h2>
                  <p>
                    {lang === 'id'
                      ? 'Fokus pelaksanaan tugas harian di lokasi gedung serta koordinasi manajemen untuk memastikan standar layanan properti berjalan optimal.'
                      : 'Daily on-site execution and management coordination required to maintain optimal property service standards.'}
                  </p>
                </div>

                <div className="career-row-box">
                  <ul className="career-dot-list">
                    {responsibilities.map((item, idx) => (
                      <li key={idx}>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Kualifikasi & Persyaratan */}
            {qualifications.length > 0 && (
              <div className="career-editorial-row">
                <div className="career-row-lead">
                  <p className="eyebrow">
                    {lang === 'id' ? 'KRITERIA KANDIDAT' : 'REQUIREMENTS'}
                  </p>
                  <h2>
                    {lang === 'id'
                      ? 'Kualifikasi & Persyaratan Kompetensi'
                      : 'Qualifications & Competency Requirements'}
                  </h2>
                  <p>
                    {lang === 'id'
                      ? 'Latar belakang pendidikan, rekam jejak pengalaman operasional gedung, serta sertifikasi teknis yang dibutuhkan untuk posisi ini.'
                      : 'Educational background, building operations track record, and technical certifications expected for this role.'}
                  </p>
                </div>

                <div className="career-row-box">
                  <ul className="career-dot-list">
                    {qualifications.map((item, idx) => (
                      <li key={idx}>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Benefit & Fasilitas */}
            {benefits.length > 0 && (
              <div className="career-editorial-row">
                <div className="career-row-lead">
                  <p className="eyebrow">
                    {lang === 'id' ? 'LINGKUNGAN KERJA' : 'BENEFITS'}
                  </p>
                  <h2>
                    {lang === 'id'
                      ? 'Kompensasi & Dukungan Profesional'
                      : 'Compensation & Professional Support'}
                  </h2>
                  <p>
                    {lang === 'id'
                      ? 'Dukungan kesejahteraan serta fasilitas pengembangan kompetensi bagi setiap anggota tim operasional PROMIND.'
                      : 'Welfare support and competency development facilities provided to PROMIND operational team members.'}
                  </p>
                </div>

                <div className="career-row-box">
                  <ul className="career-dot-list">
                    {benefits.map((item, idx) => (
                      <li key={idx}>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 3. Single, Clear, Authoritative Application Section */}
      <section className="career-apply-section">
        <div className="wrap career-apply-grid">
          <div className="career-apply-lead">
            <p className="eyebrow">
              {lang === 'id' ? 'PENGAJUAN LAMARAN' : 'HOW TO APPLY'}
            </p>
            <h2>
              {lang === 'id'
                ? 'Kirimkan Lamaran Anda'
                : 'Submit Your Application'}
            </h2>
            <p>
              {lang === 'id'
                ? 'Kandidat yang memenuhi kualifikasi di atas dapat mengirimkan Curriculum Vitae (CV) terbaru beserta dokumen pendukung secara langsung ke alamat email rekrutmen resmi PROMIND.'
                : 'Qualified candidates are invited to send their latest Curriculum Vitae (CV) and supporting documents directly to the official PROMIND recruitment email.'}
            </p>
          </div>

          <div className="career-apply-box">
            <div className="career-apply-table">
              <div className="career-apply-row">
                <span className="career-apply-key">
                  {lang === 'id' ? 'Email Tujuan' : 'Target Email'}
                </span>
                <div className="career-apply-val">
                  <a href={buildMailtoUrl()}>{emailToApply}</a>
                  <button
                    type="button"
                    onClick={copyEmail}
                    className="career-copy-inline"
                  >
                    {copied ? (
                      <>
                        <Check size={12} />
                        <span>{lang === 'id' ? 'Tersalin' : 'Copied'}</span>
                      </>
                    ) : (
                      <>
                        <Copy size={12} />
                        <span>{lang === 'id' ? 'Salin' : 'Copy'}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              <div className="career-apply-row">
                <span className="career-apply-key">
                  {lang === 'id' ? 'Subjek Email' : 'Email Subject'}
                </span>
                <div className="career-apply-val">
                  <span>{subjectText}</span>
                </div>
              </div>

              <div className="career-apply-row">
                <span className="career-apply-key">
                  {lang === 'id' ? 'Berkas Lampiran' : 'Attachments'}
                </span>
                <div className="career-apply-val">
                  <span>
                    {lang === 'id'
                      ? 'CV terbaru (PDF) & Sertifikat Pendukung'
                      : 'Latest CV (PDF) & Relevant Certificates'}
                  </span>
                </div>
              </div>
            </div>

            <a
              href={buildMailtoUrl()}
              className="button button-primary cursor-pointer"
            >
              <span>
                {lang === 'id'
                  ? 'Kirim Lamaran via Email'
                  : 'Apply via Email'}
              </span>
              <ArrowUpRight size={18} />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
