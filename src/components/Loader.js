import { loader } from '@/styles/components/Dashboard.module.scss'
import LoaderSVG from '@/assets/images/loader.svg'

export default function Loader({ loading }) {
  return (
    <div className={loader} data-loading={loading}>
      <LoaderSVG />
    </div>
  )
}
