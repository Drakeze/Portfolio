import { DeferredGlobe } from "@/components/deferred-globe"
import { type GlobePoint } from "@/components/globe-realistic"
import { OrbitingName } from "@/components/orbiting-name"
import { listPublicPins } from "@/lib/domains/messages/service"

export const revalidate = 3600

async function getContactPins(): Promise<GlobePoint[]> {
  try {
    const pins = await listPublicPins()
    return pins.map((pin) => ({ ...pin, source: "contact" }))
  } catch (error) {
    console.error("Failed to load contact pins for globe:", error)
    return []
  }
}

export default async function Page() {
  const contactPins = await getContactPins()

  return (
    <main>
      <section className="relative flex min-h-[calc(100vh-4rem)] flex-col">
        <div className="flex justify-center px-6 pt-16 sm:pt-20">
          <OrbitingName name="Anthony Shead" />
        </div>

        <div className="relative mx-auto mt-auto aspect-square w-[min(95vw,80vh,1600px)] shrink-0">
          <DeferredGlobe contactPins={contactPins} />
        </div>
      </section>
    </main>
  )
}
