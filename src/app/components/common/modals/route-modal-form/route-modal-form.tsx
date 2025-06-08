import { type PropsWithChildren } from "react"
import { type FieldValues, type UseFormReturn } from "react-hook-form"
import { Dialog, DialogFooter, DialogHeader } from "@/app/components/ui/dialog"
import { DialogContent, DialogDescription, DialogTitle } from "@radix-ui/react-dialog"
import { Button } from "@/app/components/ui"
import { Form } from "@/shared/form"
import { useBlocker } from "react-router"

interface RouteModalFormProps<T extends FieldValues> extends PropsWithChildren {
  form: UseFormReturn<T>
  blockSearchParams?: boolean
  onClose?: (isSubmitSuccessful: boolean) => void
}

export const RouteModalForm = <T extends FieldValues>({
  form,
  blockSearchParams: blockSearch = false,
  children,
  onClose,
}: RouteModalFormProps<T>) => {

  const {
    formState: { isDirty },
  } = form

  const blocker = useBlocker(({ currentLocation, nextLocation }) => {
    const { isSubmitSuccessful } = nextLocation.state || {}

    if (isSubmitSuccessful) {
      onClose?.(true)
      return false
    }

    const isPathChanged = currentLocation.pathname !== nextLocation.pathname
    const isSearchChanged = currentLocation.search !== nextLocation.search

    if (blockSearch) {
      const ret = isDirty && (isPathChanged || isSearchChanged)

      if (!ret) {
        onClose?.(isSubmitSuccessful)
      }

      return ret
    }

    const ret = isDirty && isPathChanged

    if (!ret) {
      onClose?.(isSubmitSuccessful)
    }

    return ret
  })

  const handleCancel = () => blocker?.reset?.()

  const handleContinue = () => {
    blocker?.proceed?.()
    onClose?.(false)
  }

  return (
    <Form methods={form} onSubmit={() => {}}>
      {children}
      <Dialog open={blocker.state === "blocked"}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Test</DialogTitle>
            <DialogDescription>
              more Test
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={handleCancel} type="button">
              Cancel
            </Button>
            <Button onClick={handleContinue} type="button">
              Guardar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Form>
  )
}  
