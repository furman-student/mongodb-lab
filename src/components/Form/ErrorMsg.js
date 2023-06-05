import { errorMessages } from "@/utils/const"
import { errorMsg } from '@/styles/components/Form.module.scss'

export default function ErrorMsg({ error, errorType }) {
  return (<>
    {error !== undefined &&
      <div className={errorMsg}>
        {errorMessages.get(errorType ?? error?.type)}
      </div>}
  </>)
}
