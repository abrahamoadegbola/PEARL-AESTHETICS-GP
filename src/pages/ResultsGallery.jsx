import { useState } from "react";
import PageHero from "../components/PageHero";
import FilterPills from "../components/FilterPills";
import CTABand from "../components/CTABand";
import Reveal from "../components/motion/Reveal";

// Gallery entries. `span` drives the editorial grid - the lead result runs
// wide, the rest sit in a regular rhythm beneath it.
const RESULTS = [
  {
    id: "jawline",
    category: "Jawline Contouring",
    title: "Structural Definition",
    caption: "4 weeks post-treatment · Non-surgical profile harmony",
    span: "md:col-span-8",
    aspect: "aspect-[16/10]",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBs5TJJ74GK2w_TJx3NoSUoXTtCIY0IPzYADK2cuxjKSUDeTG5BbQ-iW8lrOWJ9MfFdOcTdLnaj3FDlalqWSNkrXY0dyf1ZhVvA0irdxIT-Q3hegasDtmIbeZwGpP1wKGfkcG_G7dJG_d4v1inA4rhq-R9FbOUu1qapCmMDpJ1UjWqvAabPYk5aoIGpCU51kDE0h8nGoWevrTjr3z-j8IWv--X-aL92Sv5y38XGd0cwWJBnw-aVEByc",
  },
  {
    id: "lips",
    category: "Lip Enhancement",
    title: "Subtle Volume",
    caption: "2 weeks post-treatment",
    span: "md:col-span-4",
    aspect: "aspect-[3/4] md:aspect-auto md:h-full",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCjPxh8pJHgoiaR8LL72wPT_U3Udzh1l4es7RgDU3Oh-cK2Pai69Bf-_FtEm16wG6tszSdOt6TpK7Z-3tndiskIbVDo0DiXALjkVCF53SG7flB3CawcSNHfxce0ok1qYc5mtTuE0BgHgcdgwJaiK090KIS1VvqdvKqvXefvVohuUXyCF0F6EZXm5riSB8yTaRgW-ZASy75BHhy9RyHgp4HNf0D8J_a_1qRw96L4GPopQv0WCTjA6BMK",
  },
  {
    id: "midface",
    category: "Skin Rejuvenation",
    title: "Cheek Elevation",
    caption: "Mid-face volume restoration",
    span: "md:col-span-4",
    aspect: "aspect-square",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDk5SBbJhJ8Oc22O8jBmLjTZyyzHCs-tcivmw4O2X_S8AVZM8WNbeHiqSIuoCDQS26vqYJr1uE0yrwPLHFtiXlItes8h58fmTUTzw2d9_AW-jedlR_susx7a6_JF-Q7Gu047-GXZM8BMmuoZptpUMPsRxO4BAJKC1bgjZsEau4KUIqeCNCzh7np6VT7m5NpqT5r_M2jKHTMTwJFE7FhmxDAV7WuYrQ9zzU1xK7reoapqhKdm4-_n24k",
  },
  {
    id: "rhinoplasty",
    category: "Jawline Contouring",
    title: "Profile Refinement",
    caption: "Liquid rhinoplasty · 1 week post-treatment",
    span: "md:col-span-4",
    aspect: "aspect-square",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCMdvdutVqSpCOltW1VRHVi5lH-K7iTWZyPMloGPrF_YT7eCnCoSa4EknUTSH3_5l2F4EH7r0L5BM-pqJ-lhVBenjNIVljubka9JW4llUNqT51g7bH2F4e4nJQR39ieCpAkZp3kc81k4R0Xuu9BpMIiZZzy6EJtYpGcNuLDkffvhJzo-UNIh5zTV22zAvvbnUfTqJatSRNYqWhKTXRPGrM6mBEcv7ro1QklF4Cy3P_Ik34vFeUmzwc-",
  },
  {
    id: "texture",
    category: "Skin Rejuvenation",
    title: "Radiance Restore",
    caption: "Micro-needling course · 6 weeks",
    span: "md:col-span-4",
    aspect: "aspect-square",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBLKXMwRzhaHiF8DT0zoQXL2eCIlWuuay_N49njVkSpR16WJR9Hk4iYtbGNiougsvadVyt9urXTHFtcDy9msP32UoRb7EGFUC-UzVB0jIYBVPndQ2d14bm9rgNgX_zFbrCZ7ejecsLb9HZQIFgcdlQnReKPteIdBaZzLUYiPzm-iusCMpwqzOejnmnX1qnjpHeX9-7qyh7Dc_dMzUnzEdHeuOqKlY_L1frsv2jhdH2fFpBdO5lpM1s-",
  },
];

const FILTERS = ["All Treatments", "Jawline Contouring", "Lip Enhancement", "Skin Rejuvenation"];

export default function ResultsGallery() {
  const [filter, setFilter] = useState("All Treatments");
  const visible = filter === "All Treatments" ? RESULTS : RESULTS.filter((r) => r.category === filter);

  return (
    <>
      <PageHero
        eyebrow="Curated Portfolio"
        title="Patient results"
        lede="The transformative power of precision aesthetic treatment — a commitment to subtle, natural enhancement rather than a made-over face."
      >
        <FilterPills
          options={FILTERS}
          value={filter}
          onChange={setFilter}
          ariaLabel="Filter results by treatment"
        />
      </PageHero>

      <section className="max-w-container-max mx-auto px-gutter pb-section-padding-mobile md:pb-section-padding-desktop">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
          {visible.map((result, i) => (
            <Reveal key={result.id} delay={0.06 * (i % 3)} className={result.span} as="div">
              <article className="group relative h-full rounded-xl overflow-hidden bg-surface-container-low">
                <div className={`relative w-full ${result.aspect}`}>
                  <img
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                    alt={`${result.category} result — ${result.title}`}
                    src={result.image}
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                </div>
                <div className="absolute inset-x-0 bottom-0 p-7 text-on-primary">
                  <p className="font-label-caps text-label-caps text-secondary-container uppercase tracking-[0.25em] mb-2">
                    {result.category}
                  </p>
                  <h2 className="font-headline-sm text-headline-sm mb-1">{result.title}</h2>
                  <p className="font-body-md text-sm opacity-80">{result.caption}</p>
                </div>
              </article>
            </Reveal>
          ))}

          {visible.length === 0 && (
            <p className="col-span-full text-center text-on-surface-variant font-body-md py-16">
              No results in this category yet.
            </p>
          )}
        </div>

        {/* Results vary between patients - saying so plainly matters more on a
            medical page than a clean-looking grid does. */}
        <p className="font-body-md text-sm text-on-surface-variant mt-12 max-w-2xl">
          Individual results vary. Images are representative of typical outcomes and are shown with patient
          consent; they are not a guarantee of the result any one person will achieve.
        </p>
      </section>

      <CTABand
        eyebrow="Your Turn"
        title="Begin your journey"
        lede="Schedule a consultation with our practitioners to discuss your goals and find out what's realistically possible."
      />
    </>
  );
}
