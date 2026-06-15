import { getSlaydlar } from '@/lib/cosmic'
import SlideNavigator from '@/components/SlideNavigator'

export const metadata = {
  title: 'Slaydlar | Burada yazılanlara uyğun',
}

export default async function SlaydlarPage() {
  const slides = await getSlaydlar()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10 text-center">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">Prezentasiya</h1>
        <p className="mt-3 text-slate-600 max-w-2xl mx-auto">
          Çatışmazlıqlar, görüləcək işlər və nəticələr. Naviqasiya üçün klaviaturanın ox
          düymələrindən və ya aşağıdakı düymələrdən istifadə edin.
        </p>
      </div>

      <SlideNavigator slides={slides} />
    </div>
  )
}