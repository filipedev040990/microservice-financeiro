import { ControllerInterface } from '@/domain'
import { HttpRequest } from '@/shared/types/http.types'
import { Request, Response } from 'express'

export const expressRouterAdapter = (controller: ControllerInterface) => {
  return async (req: Request, res: Response) => {
    const input: HttpRequest = {
      body: req.body
    }

    const output = await controller.execute(input)
    const bodyResponse = output.statusCode === 500 ? { error: output.body.message } : output.body
    res.status(output.statusCode).json(bodyResponse)
  }
}
