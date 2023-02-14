import { useState } from "react"
import { Button } from "@chakra-ui/react"

export const LoadableButton: typeof Button = ({ children, onClick, ...props }) => {
  const [isLoading, setIsLoading] = useState(false)
  return (
    <Button
      {...props}
      onClick={onClick ? event => {
        (async () => {
          setIsLoading(true)
          try {
            await (onClick(event) as PromiseLike<unknown> | unknown)
          } catch (err) {
            console.error(err)
          }
          setIsLoading(false)
        })()
      } : undefined}
      isLoading={isLoading}
    >
      {children}
    </Button>
  )
}
