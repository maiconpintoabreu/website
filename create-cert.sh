cat <<EOF | kubectl apply -f -
apiVersion: certmanager.k8s.io/v1alpha1
kind: Certificate
metadata:
  name: maicondev-cert
  namespace: default
spec:
  secretName: maicondev-cert
  issuerRef:
    name: letsencrypt
    kind: ClusterIssuer
  commonName: "maicondev.com"
  dnsNames:
  - "maicondev.com"
  - "kupping.maicondev.com"
  acme:
    config:
    - http01:
        ingressClass: istio
      domains:
      - "maicondev.com"
      - "kupping.maicondev.com"
---
EOF