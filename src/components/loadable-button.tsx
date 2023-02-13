import { useState } from "react"
import { Button } from "@chakra-ui/react"

export const LoadableButton: typeof Button = ({ children, onClick, ...props }) => {
  const [isLoading, setIsLoading] = useState(false)
  return (
    <Button
      {...props}
      onClick={onClick ? event => {
        (async () => {
          try {
            setIsLoading(true)
            await (onClick(event) as PromiseLike<unknown> | unknown)
            setIsLoading(false)
          } catch (err) {
            console.error(err)
          }
        })()
      } : undefined}
      isLoading={isLoading}
    >
      {children}
    </Button>
  )
}
