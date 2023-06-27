export type EnvConfigsListParams = {
  projectId: string
}

export type EnvConfigsConfigureParams = {
  projectId: string,
  envId: string | undefined,
  envGeoId: string | undefined,
  label: string,
  value: string,
}

export type EnvConfigListResponse = {
  projectDefaults: {
    label: string,
    value: string,
  }[]
  environments:{
    id: string,
    name: string,
    environmentGeographies: {
      id: string,
      name: string,
      environmentGeographyDefaults: {
        label: string,
        value: string,
      }[]
    }[]
  }[]
}

export type EnvConfigListTransformedData = {
  envId: string
  envName: string
  envGeoID: string
  envGeoName: string
  label: string
  value: string
  defaultValue: string
}[]
