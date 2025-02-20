# Helm Chart EEP-Portal <!-- omit in TOC -->

- [Prerequisites](#prerequisites)
- [Deploy EEP-Portal components to your cluster](#deploy-eep-portal-components-to-your-cluster)
- [Configuration](#configuration)
- [Deploy Provisioning component to Kubernetes](#deploy-provisioning-component-to-kubernetes)
- [Deploy E2E component to Kubernetes](#deploy-e2e-component-to-kubernetes)

# Deploy EEP-Portal to Kubernetes with Helm <!-- omit in TOC -->

## Prerequisites

Make sure to have [Helm](https://github.com/helm/helm/blob/master/docs/install.md) installed on the Kubernetes cluster.

```bash
helm init
```

Clone `realChainLife/EEP-Portal` repository and go to `helm` folder.

```bash
git clone https://github.com/realChainLife/EEP-Portal.git
cd EEP-Portal/helm
```

> _Note_: If you enable PVs make sure the underlying infrastructure is supporting PV provisioning.

## Deploy EEP-Portal components to your cluster

Navigate to the cluster folder and update dependencies

```bash
cd cluster
helm dep update
```

Deploy components

```bash
helm install . --name eep-portal --namespace my-namespace --set tags.minimal=true
```

This will deploy following components:

- Ingress
- Frontend
- API Test
- API Prod
- Blockchain Test
- Blockchain Prod

Delete chart

```bash
helm delete --purge eep-portal
```

## Configuration

The following table lists the most important configurable parameters of the EEP-Portal chart and their default values. For a full list check the [values.yaml](cluster/values.yaml) file.

| Parameter                          | Description                                                                                                                  | Default                                |
| ---------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- | -------------------------------------- |
| `tags.minimal`                     | Includes blockchain-prod-1, blockchain-test1, api-prod-1, api-test1 and frontend-1 components in deployed chart              | `false`                                |
| `tags.blockchain`                  | Includes blockchain-prod-1 and blockchain-test1 components in deployed chart                                                 | `false`                                |
| `tags.api`                         | Includes api-prod-1 and api-test1 components in deployed chart                                                               | `false`                                |
| `tags.frontend`                    | Includes frontend-1 components in deployed chart                                                                             | `false`                                |
| `global.image.tag`                 | `eep-portal` image tag                                                                                                        | `master`                               |
| `global.fqdn`                      | ingress host                                                                                                                 | `my-eep-portal-url.com`                 |
| `global.fqdn`                      | ingress host                                                                                                                 | `my-eep-portal-url.com`                 |
| `global.env.ENVIRONMENT_TYPE=PROD` | if set to `PROD`, the blockchain resource will be set deployed as `statefulset`and persist its data on a PV                  | `DEV`                                  |
| `global.env.ENVIRONMENT_TYPE=TEST` | if set to `TEST`, same as `DEV`, except that blockchai nservice account will be excluded from chart                          | `DEV`                                  |
| `global.env.EXPOSE_MC`             | if set to `true`, the blockchain application will check for the external service IP before starting and use it as externalIp | `false`                                |
| `frontend.initContainer`           | use like `frontend-1.initContainer` to enable/disable provisioning container as init containers                              | `false`                                |
| `frontend.ingress.enabled`         | use like `frontend-1.ingress.enabled` to enable/disable ingress                                                              | `false`                                |
| `frontend.ingress.fqdnPrefix`      | use like `frontend-1.ingress.fqdnPrefix` to add a prefix to the `global.fqdn`                                                | `a` for frontend-1, `b` for frontend-2 |

_Tip_: Edit the default [values.yaml](cluster/values.yaml) file that specifies the values for the above parameters, before executing the helm command.

Alternatively, specify each parameter using the `--set key=value[,key=value]` argument to helm install. For example,

```bash
helm install . --name eep-portal --namespace my-namespace --set tags.minimal=true --set frontend-1.ingress.enabled=true
```

## Deploy Provisioning component to Kubernetes

To deploy the provisioning components in order to create some initial test data, check out the [provisioning helm chart](./provisioning/README.md).

## Deploy E2E component to Kubernetes

To deploy a isolated environemnt to execute E2E tests, check out the [e2e-test helm chart](./tests/README.md).
