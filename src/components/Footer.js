export default function Footer() {
  return (
    <footer className="w-full bg-[#0e0e0e] text-white pt-32 pb-10 px-10 border-t border-white/10">
      <div className="flex flex-col md:flex-row justify-between items-start mb-20">
        <div className="max-w-xl">
          <h2 className="text-[8vw] leading-[0.85] font-bold uppercase tracking-tighter mb-10 mix-blend-difference">
            Let's <br /> Work <span className="text-gray-500">Together</span>
          </h2>
        </div>
        <div className="flex flex-col gap-5 text-right">
          <a
            href="mailto:hello@arolax.com"
            className="text-2xl hover:text-gray-400 transition-colors"
          >
            hello@arolax.com
          </a>
          <p className="text-sm opacity-50 max-w-xs ml-auto">
            We are a friendly and experienced creative agency based in
            California.
          </p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center text-xs uppercase tracking-widest opacity-40 border-t border-white/10 pt-10">
        <span>© 2024 Varixia Agency</span>
        <div className="flex gap-8 mt-5 md:mt-0">
          <span className="cursor-pointer hover:text-white transition-colors">
            Instagram
          </span>
          <span className="cursor-pointer hover:text-white transition-colors">
            LinkedIn
          </span>
          <span className="cursor-pointer hover:text-white transition-colors">
            Behance
          </span>
        </div>
      </div>
    </footer>
  );
}
