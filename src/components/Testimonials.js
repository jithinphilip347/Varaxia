"use client";
import { useRef, useEffect } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, EffectFade } from "swiper/modules";
import gsap from "gsap";
import { Quote } from "lucide-react";

// Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

const testimonials = [
  {
    text: "When we talk about Alts, we do not mean a typical business partner, but rather a team that collaborates with us daily, always there for us when we encounter difficulties and celebrate achievements. We see in Alts our best ally for success!",
    name: "CHARRY MARON",
    role: "DEVELOPER",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop",
  },
  {
    text: "The level of creativity and technical expertise Varixia brings to the table is unmatched. They transformed our vision into a digital reality that exceeded our expectations.",
    name: "MARCUS REID",
    role: "CREATIVE DIRECTOR",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
  },
  {
    text: "Reliable, innovative, and truly dedicated to their craft. Working with Varixia has been a game-changer for our brand's online presence.",
    name: "SOPHIA LI",
    role: "MARKETING HEAD",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop",
  },
];

export default function Testimonials() {
  const containerRef = useRef(null);

  // GSAP Animation for entering element
  const onSlideChange = (swiper) => {
    const activeSlide = swiper.slides[swiper.activeIndex];
    const text = activeSlide.querySelector(".testimonial-text");
    const author = activeSlide.querySelector(".testimonial-author");

    gsap.fromTo(
      [text, author],
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", stagger: 0.1 },
    );
  };

  return (
    <section
      ref={containerRef}
      className="py-24 px-6 bg-[#0e0e0e] text-white overflow-hidden relative"
    >
      {/* Quote Icon */}
      <div className="flex justify-center mb-12">
        <div className="text-white opacity-100">
          <svg
            width="60"
            height="60"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="text-white"
          >
            <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H15.017C14.4647 8 14.017 8.44772 14.017 9V11C14.017 11.5523 13.5693 12 13.017 12H12.017V5H22.017V15C22.017 18.3137 19.3307 21 16.017 21H14.017ZM5.0166 21L5.0166 18C5.0166 16.8954 5.91203 16 7.0166 16H10.0166C10.5689 16 11.0166 15.5523 11.0166 15V9C11.0166 8.44772 10.5689 8 10.0166 8H6.0166C5.46432 8 5.0166 8.44772 5.0166 9V11C5.0166 11.5523 4.56889 12 4.0166 12H3.0166V5H13.0166V15C13.0166 18.3137 10.3303 21 7.0166 21H5.0166Z" />
          </svg>
        </div>
      </div>

      <div className="max-w-4xl mx-auto text-center">
        <Swiper
          modules={[Pagination, Autoplay, EffectFade]}
          spaceBetween={30}
          slidesPerView={1}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          speed={800} // Smooth transition speed
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
            renderBullet: function (index, className) {
              return '<span class="' + className + ' custom-bullet"></span>';
            },
          }}
          onSlideChange={onSlideChange}
          className="testimonials-swiper pb-16"
        >
          {testimonials.map((item, index) => (
            <SwiperSlide key={index}>
              {/* Reduced pb to bring dots closer */}
              <div className="flex flex-col items-center pb-6">
                {/* Content - Reduced margin bottom for cleaner look */}
                <p className="testimonial-text text-xl md:text-3xl font-medium leading-normal md:leading-relaxed mb-8 max-w-3xl mx-auto">
                  "{item.text}"
                </p>

                {/* Author Info */}
                <div className="testimonial-author flex items-center justify-center gap-5 mt-2">
                  <div className="relative w-14 h-14 md:w-20 md:h-20 rounded-full overflow-hidden border-2 border-white/10">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="text-left">
                    <h4 className="text-lg md:text-xl font-black uppercase tracking-wide leading-none mb-2">
                      {item.name}
                    </h4>
                    <div className="text-[10px] md:text-xs font-bold text-neutral-500 uppercase tracking-widest leading-none">
                      {item.role}
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <style jsx global>{`
        .testimonials-swiper .swiper-pagination {
          bottom: 0px !important;
        }
        .custom-bullet {
          width: 8px;
          height: 8px;
          display: inline-block;
          border-radius: 50%;
          background: #333;
          opacity: 1;
          margin: 0 6px !important;
          transition: all 0.3s ease;
        }
        .swiper-pagination-bullet-active {
          width: 30px;
          background: #fff;
          border-radius: 4px;
        }
      `}</style>
    </section>
  );
}
