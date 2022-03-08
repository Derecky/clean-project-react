import React from "react"
import { AxiosHttpClient } from "@/infra/http/axios-http-client/axios-http-client"

export const makeApiUrl = (): string => {
  return 'http://fordevs.herokuapp.com/api/login'
} 